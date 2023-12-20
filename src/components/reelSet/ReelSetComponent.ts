import { Cell } from "../../store/SlotTypes";
import { slotState } from "../../store/Store";
import { BaseComponent } from "../BaseComponent";
import { ReelComponent } from "./reel/ReelComponent";
import { symbolSetComponent } from "./symbolSet/SymbolSetComponent";

/**
 * Reel set component
 */
export class ReelSetComponent extends BaseComponent {
    private reels: ReelComponent[] = [];

    constructor(layoutId: string) {
        super(layoutId);

        symbolSetComponent.initSymbolPools();

        const init = slotState().init.image;

        for(let i = 0; i < init.length; i++) {
            this.initReel(i, init[i]);
        }
    }

    private initReel(index: number, cells: Cell[]) {
        const reel = new ReelComponent(`reel${index}`, cells);
        this.reels.push(reel);
    }
}
