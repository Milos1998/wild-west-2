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
    }

    public async spinReels(): Promise<void> {
        this.setPaddingCells();
        this.spinDurationMs = 0;
        this.stoppedCount = this.reelSet.reels.length;

        sceneController.ticker.add(this.spinTick, this);

        await new Promise((resolve) => {
            this.resolveSpin = resolve;
        });

        sceneController.ticker.remove(this.spinTick, this);

        return Promise.resolve();
    }

    private setPaddingCells() {
        this.reelSet.reels.forEach((reel) => {
            reel.topPaddingCell = reel.makeReelCell();
            reel.topPaddingCell.setRandomSymbol();
            reel.topPaddingCell.container.position.set(0, -reel.topPaddingCell.height);

            reel.bottomPaddingCell = reel.makeReelCell();
            reel.bottomPaddingCell.setRandomSymbol();
            reel.bottomPaddingCell.container.position.set(0, reel.height);
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

            this.moveReelCells(deltaMs, reel);
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
            this.moveReelCells(deltaMs, reel);
            if (this.spinDurationMs > reel.config.stopDelayMs && reelSetState().isReadyToStop) {
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

            this.moveReelCells(deltaMs, reel, true);
            if (reel.currentSpeed <= 0) {
                this.stoppingCount--;
                reel.spinState = "STOPPED";

                if (this.stoppingCount === 0) this.resolveSpin();
                this.snapToEndPosition(reel);
            }
        }
    }

    private moveReelCells(deltaMs: number, reel: ReelComponent, isStopping: boolean = false) {
        const distance = reel.currentSpeed * deltaMs;

        for(let i = 0; i < reel.reelCells.length; i++) {
            const reelCell = reel.reelCells[i];

            reelCell.container.position.y += distance;
            if (reelCell.container.position.y > reel.height) {
                this.replaceReelCell(reel, i, isStopping);
            }
        }
    }

    private replaceReelCell(reel: ReelComponent, index: number, isStopping: boolean = false) {
        reel.reelCells[index].clearCell();
        reel.reelCells.splice(index, 1);

        let topCell = this.getTopMostReelCell(reel);

        const newReelCell = reel.makeReelCell();
        newReelCell.container.position.y = topCell.container.position.y - newReelCell.height;
        this.setReelCellSymbol(newReelCell, isStopping);
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

    private setReelCellSymbol(reelCell: ReelCellComponent, isStopping: boolean = false) {
        if (isStopping) {
            //TODO from outcome
            reelCell.setRandomSymbol();
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
