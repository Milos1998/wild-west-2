import { Symbol } from "../../../store/SlotTypes";
import { PixiObjectsPool, PixiObjectsPoolEntry } from "../../pixiObjectsPool/PixiObjectsPool";

class SymbolSetComponent {
    private allSymbols: Symbol[] = ["wild", "sherif", "reward1000", "diamonds", "hearts", "spades", "clubs", "A", "K", "Q", "J", "10", "9"] as const;

    private pool: Map<string, PixiObjectsPool>;

    private blurPrefix = "_blurred";

    constructor() {
        this.pool = new Map();

        this.allSymbols.forEach((symbol) => {
            this.pool.set(symbol, new PixiObjectsPool(symbol));
            this.pool.set(symbol + this.blurPrefix, new PixiObjectsPool(symbol + this.blurPrefix));
        });
    }

    public getSymbol(symbol: Symbol, blurred: boolean = false): PixiObjectsPoolEntry {
        const poolKey = symbol + (blurred ? this.blurPrefix : "");
        const pool = this.pool.get(poolKey);
        if (pool === undefined) throw new Error(`Pool ${poolKey} does not exist`);

        return pool.getPoolObject();
    }

    public returnSymbol(symbol: Symbol, blurred: boolean = false, id: string) {
        const poolKey = symbol + (blurred ? this.blurPrefix : "");
        const pool = this.pool.get(poolKey);
        if (pool === undefined) throw new Error(`Pool ${poolKey} does not exist`);

        pool.returnObject(id);
    }
}

export const symbolSetComponent = new SymbolSetComponent();
