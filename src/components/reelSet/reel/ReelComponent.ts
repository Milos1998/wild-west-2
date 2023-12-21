import { BaseComponent } from "../../BaseComponent";
import { ReelCellComponent } from "../reelCell/ReelCellComponent";
import { layoutUtils } from "../../../utils/LayoutUtils";
import { Cell } from "../../../store/SlotTypes";
import { ReelConfig } from "../../../config/ReelSetConfig";

export type ReelSpinState = "STOPPED" | "STARTED" | "SPINNING" | "STOPPING";

/**
 * Reel component
 */
export class ReelComponent extends BaseComponent {
    private cells: Cell[];

    public reelCells: ReelCellComponent[] = [];

    public config: ReelConfig;

    public spinState: ReelSpinState = "STOPPED";

    public height: number;

    public outcomeCells: ReelCellComponent[] = [];

    public topPaddingCell!: ReelCellComponent;

    public bottomPaddingCell!: ReelCellComponent;

    public acceleration: number = 0;

    public currentSpeed: number = 0;

    constructor(layoutId: string, cells: Cell[], config: ReelConfig) {
        super(layoutId);

        this.config = config;
        this.cells = [...cells];
        this.setMask();
        this.initReel();
        this.height = this.container.height;
    }

    private setMask() {
        const mask = layoutUtils.makeSprite("reelBg");
        this.container.addChild(mask);
        this.container.mask = mask;
    }

    private initReel() {
        for(let i = 0; i < this.cells.length; i++) {
            const reelCell = this.makeReelCell();
            reelCell.setSymbol(this.cells[i].symbol);
            reelCell.container.position.set(0, i * reelCell.container.height);
            this.outcomeCells.push(reelCell);
        }
    }

    public makeReelCell(): ReelCellComponent {
        const reelCellModel = layoutUtils.makeSprite("reelCellModel");
        const reelCell = new ReelCellComponent(reelCellModel);
        this.container.addChild(reelCell.container);
        this.reelCells.push(reelCell);
        return reelCell;
    }
}