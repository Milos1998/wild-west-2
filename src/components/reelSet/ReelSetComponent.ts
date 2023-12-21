import { reelConfigs } from "../../config/ReelSetConfig";
import { sceneController } from "../../controllers/SceneController";
import { Cell } from "../../store/SlotTypes";
import { slotState } from "../../store/Store";
import { BaseComponent } from "../BaseComponent";
import { ReelComponent } from "./reel/ReelComponent";
import { NormalSpin } from "./spinType/NormalSpin";
import { symbolSetComponent } from "./symbolSet/SymbolSetComponent";

/**
 * Reel set component
 */
export class ReelSetComponent extends BaseComponent {
    public reels: ReelComponent[] = [];

    //TODO generalize
    private spinType: NormalSpin;

    private spinPromise: Promise<void> | undefined;

    constructor(layoutId: string) {
        super(layoutId);

        symbolSetComponent.initSymbolPools();

        const init = slotState().init.image;

        for(let i = 0; i < init.length; i++) {
            this.initReel(i, init[i]);
        }

        this.spinType = new NormalSpin(this);
    }

    private initReel(index: number, cells: Cell[]) {
        const reel = new ReelComponent(`reel${index}`, cells, reelConfigs[index]);
        this.reels.push(reel);
    }

    public startSpin() {
        this.spinPromise = this.spinType.spinReels();
    }

    public async stopSpin(): Promise<void> {
        if (this.spinPromise) return this.spinPromise;
        return Promise.resolve();
    }
}
