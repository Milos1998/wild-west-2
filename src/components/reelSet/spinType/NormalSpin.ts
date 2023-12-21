import { sceneController } from "../../../controllers/SceneController";
import { reelSetState, slotState } from "../../../store/Store";
import { ReelSetComponent } from "../ReelSetComponent";
import { ReelComponent } from "../reel/ReelComponent";
import { ReelCellComponent } from "../reelCell/ReelCellComponent";

export class NormalSpin {
    private reelSet: ReelSetComponent;

    private startedCount: number = 0;

    private spinningCount: number = 0;

    private stoppingCount: number = 0;

    private stoppedCount: number = 0;

    private spinDurationMs: number = 0;

    private resolveSpin: any;

    constructor(reelSet: ReelSetComponent) {
        this.reelSet = reelSet;
        this.stoppedCount = this.reelSet.reels.length;
        this.setPaddingCells();
    }

    public async spinReels(): Promise<void> {
        this.spinDurationMs = 0;
        this.stoppedCount = this.reelSet.reels.length;

        sceneController.ticker.add(this.spinTick, this);

        await new Promise((resolve) => {
            this.resolveSpin = resolve;
        });

        const reelImage = reelSetState().reelImage;
        sceneController.ticker.remove(this.spinTick, this);

        return Promise.resolve();
    }

    private setPaddingCells() {
        this.reelSet.reels.forEach((reel) => {
            const padding = reel.makeReelCell();
            padding.setRandomSymbol();
            padding.container.position.set(0, -padding.height);
        })
    }

    private spinTick() {
        this.spinDurationMs += sceneController.ticker.deltaMS;

        if (this.stoppedCount > 0) this.updateStoppedReels();
        if (this.startedCount > 0) this.updateStartedReels(sceneController.ticker.deltaMS);
        if (this.spinningCount > 0) this.updateSpinningReels(sceneController.ticker.deltaMS);
        if (this.stoppingCount > 0) this.updateStoppingReels(sceneController.ticker.deltaMS);
    }

    private updateStoppedReels() {
        for (let i = 0; i < this.reelSet.reels.length; i++) {
            const reel = this.reelSet.reels[i];
            if (reel.spinState !== "STOPPED") continue;

            if (this.spinDurationMs > reel.config.startDelayMs) {
                this.startedCount++;
                this.stoppedCount--;
                reel.spinState = "STARTED";

                reel.outcomeCells.length = 0;
                reel.acceleration = this.getAcceleration(0, reel.config.speed, reel.height);
                reel.currentSpeed = 0;
            }
        }
    }

    private updateStartedReels(deltaMs: number) {
        for (let i = 0; i < this.reelSet.reels.length; i++) {
            const reel = this.reelSet.reels[i];
            if (reel.spinState !== "STARTED") continue;

            reel.currentSpeed += reel.acceleration * deltaMs;

            this.moveReelCells(deltaMs, i);
            if (reel.currentSpeed >= reel.config.speed) {
                this.startedCount--;
                this.spinningCount++;
                reel.spinState = "SPINNING";
            }
        }
    }

    private updateSpinningReels(deltaMs: number) {
        for (let i = 0; i < this.reelSet.reels.length; i++) {
            const reel = this.reelSet.reels[i];
            if (reel.spinState !== "SPINNING") continue;
            this.moveReelCells(deltaMs, i);
            if (reelSetState().isReadyToStop && (this.spinDurationMs > reel.config.stopDelayMs || slotState().systemState.isSlamStopped)) {
                this.stoppingCount++;
                this.spinningCount--;
                reel.spinState = "STOPPING";

                const topCell = this.getTopMostReelCell(reel);
                const distToStop = reel.height - topCell.container.position.y;
                reel.acceleration = this.getAcceleration(reel.currentSpeed, 0, distToStop);
            }
        }
    }

    private updateStoppingReels(deltaMs: number) {
        for (let i = 0; i < this.reelSet.reels.length; i++) {
            const reel = this.reelSet.reels[i];
            if (reel.spinState !== "STOPPING") continue;

            reel.currentSpeed += reel.acceleration * deltaMs;

            this.moveReelCells(deltaMs, i, true);
            if (reel.currentSpeed <= 0) {
                this.stoppingCount--;
                reel.spinState = "STOPPED";

                if (this.stoppingCount === 0) this.resolveSpin();
                this.snapToEndPosition(reel);
            }
        }
    }

    private moveReelCells(deltaMs: number, index: number, isStopping: boolean = false) {
        const reel = this.reelSet.reels[index]
        const distance = reel.currentSpeed * deltaMs;

        for(let i = 0; i < reel.reelCells.length; i++) {
            const reelCell = reel.reelCells[i];

            reelCell.container.position.y += distance;
            if (reelCell.container.position.y > reel.height) {
                this.replaceReelCell(index, i, isStopping);
            }
        }
    }

    private replaceReelCell(index: number, rcIndex: number, isStopping: boolean = false) {
        const reel = this.reelSet.reels[index];
        reel.reelCells[rcIndex].clearCell();
        reel.reelCells.splice(rcIndex, 1);

        let topCell = this.getTopMostReelCell(reel);

        const newReelCell = reel.makeReelCell();
        newReelCell.container.position.y = topCell.container.position.y - newReelCell.height;
        this.setReelCellSymbol(index, newReelCell, isStopping);
        if (isStopping) reel.outcomeCells.push(newReelCell);
    }

    private getTopMostReelCell(reel: ReelComponent): ReelCellComponent {
        let topCell = reel.reelCells[0];
        for(let i = 1; i < reel.reelCells.length; i++) {
            if (reel.reelCells[i].container.position.y < topCell.container.position.y) {
                topCell = reel.reelCells[i];
            }
        }
        return topCell;
    }

    private setReelCellSymbol(index: number, reelCell: ReelCellComponent, isStopping: boolean = false) {
        if (isStopping) {
            const reel = this.reelSet.reels[index];
            const reelImage = reelSetState().reelImage;
            const cells = reelImage[index];
            const outcomeCell = cells.find((cell) => cell.position.cell === cells.length - reel.outcomeCells.length - 1);

            if (outcomeCell === undefined) throw new Error("Could not fing outcome cell");
            reelCell.setSymbol(outcomeCell.symbol);
        } else {
            reelCell.setRandomSymbol();
        }
    }

    private getAcceleration(Vstart: number, Vend: number, dist: number) {
        return (Vend * Vend - Vstart * Vstart) / (2 * dist);
    }

    private snapToEndPosition(reel: ReelComponent) {
        //TODO
    }
}
