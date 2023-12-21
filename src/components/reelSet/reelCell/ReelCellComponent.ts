import { Container, Sprite } from "pixi.js";
import { Symbol } from "../../../store/SlotTypes";
import { symbolSetComponent } from "../symbolSet/SymbolSetComponent";
import { layoutUtils } from "../../../utils/LayoutUtils";

/**
 * Holds one symbol. Destroyed when moved to the end of the reel
 */
export class ReelCellComponent {
    public container: Container;

    public width: number;

    public height: number;

    private poolObjectId!: string;

    public symbol!: Symbol;

    private blurred!: boolean;

    constructor(reelCellModel: Sprite) {
        this.container = new Container();
        this.width = reelCellModel.width;
        this.height = reelCellModel.height;
    }

    public setSymbol(symbol: Symbol, blurred: boolean = false) {
        const { object, id } = symbolSetComponent.getPooledSymbolObject(symbol, blurred);
        this.poolObjectId = id;
        this.symbol = symbol;
        this.blurred = blurred;
        this.container.addChild(object);
        layoutUtils.centerContainers(this.container, object);
    }

    public setRandomSymbol(blurred: boolean = false) {
        const symbol = symbolSetComponent.getRandomSymbol(blurred);
        this.setSymbol(symbol, blurred);
    }

    public clearCell() {
        const poolObject = this.container.getChildByName(this.poolObjectId);
        if (poolObject) this.container.removeChild(poolObject);
        symbolSetComponent.returnSymbol(this.symbol, this.blurred, this.poolObjectId);
        if (this.container.parent) this.container.parent.removeChild(this.container);

        this.container.destroy();
    }
}