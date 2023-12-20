import { BaseComponent } from "../../BaseComponent";
import { ReelCellComponent } from "../reelCell/ReelCellComponent";
import { layoutUtils } from "../../../utils/LayoutUtils";
import { Cell } from "../../../store/SlotTypes";

/**
 * Reel component
 */
export class ReelComponent extends BaseComponent {
    private cells: Cell[];

    public reelCells: ReelCellComponent[] = [];

    constructor(layoutId: string, cells: Cell[]) {
        super(layoutId);

        this.cells = [...cells];
        this.setMask();
        this.initReel();
    }

    private setMask() {
        const mask = layoutUtils.makeSprite("reelBg");
        this.container.addChild(mask);
        this.container.mask = mask;
    }

    private initReel() {
        for(let i = 0; i < this.cells.length; i++) {
            const reelCell = this.makeReelCell(this.cells[i].position.cell);
            this.container.addChild(reelCell.container);
            reelCell.setSymbol(this.cells[i].symbol);
        }
    }

    private makeReelCell(cellNum: number): ReelCellComponent {
        const reelCellModel = layoutUtils.makeSprite("reelCellModel");
        return new ReelCellComponent(reelCellModel, cellNum);
    }
}