import { Container, Sprite, Ticker } from "pixi.js";
import { Position } from "../../../config/LayoutConfig";
import { Symbol } from "../../../store/SlotTypes";
import { symbolSetComponent } from "../symbolSet/SymbolSetComponent";
import { layoutUtils } from "../../../utils/LayoutUtils";

/**
 * Holds one symbol. Destroyed when moved to the end of the reel
 */
export class ReelCellComponent {
    public container: Container;

    private width: number;

    private height: number;

    private poolObjectId!: string;

    public symbol!: Symbol;

    private blurred!: boolean;

    constructor(reelCellModel: Sprite, cellNum: number) {
        this.container = new Container();
        this.width = reelCellModel.width;
        this.height = reelCellModel.height;
        this.container.position.set(0, cellNum * this.height);
    }

    public setSymbol(symbol: Symbol, blurred: boolean = false) {
        const { object, id } = symbolSetComponent.getSymbol(symbol, blurred);
        this.poolObjectId = id;
        this.symbol = symbol;
        this.blurred = blurred;
        this.container.addChild(object);
        layoutUtils.centerContainers(this.container, object);
    }

    public clearCell() {
        const poolObject = this.container.getChildByName(this.poolObjectId);
        if (poolObject) this.container.removeChild(poolObject);
        symbolSetComponent.returnSymbol(this.symbol, this.blurred, this.poolObjectId);

        this.container.destroy();
    }
}