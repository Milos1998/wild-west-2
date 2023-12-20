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
        //TODO update to work with multiple masks or pull mask from layout
        this.container.mask = layoutUtils.makeSprite(layoutId);

        for(let i = 0; i < this.cells.length; i++) {
            const reelCell = this.makeReelCell(this.cells[i].position.cell);
            reelCell.setSymbol(this.cells[i].symbol);
        }
    }

    private makeReelCell(cellNum: number): ReelCellComponent {
        const reelCellModel = layoutUtils.makeSprite("reelCellModel");
        return new ReelCellComponent(reelCellModel, cellNum);
    }
}