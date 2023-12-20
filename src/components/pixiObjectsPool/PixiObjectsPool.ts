import { Container } from "pixi.js";
import { layoutUtils } from "../../utils/LayoutUtils";

export type PixiObjectsPoolEntry = {
    id: string,
    object: Container,
    isUsed: boolean,
}

export class PixiObjectsPool {
    private pooledObjects: Map<string, PixiObjectsPoolEntry>;

    private assetName: string;

    constructor(assetName: string, initialSize?: number) {
        this.assetName = assetName;
        this.pooledObjects = new Map();

        const _initialSize = initialSize ? initialSize : 5;
        for (let i = 0; i < _initialSize; i++) {
            const newObject = this.makePoolObject(`${this.assetName}_${this.pooledObjects.size}`);
            this.pooledObjects.set(newObject.id, newObject);
        }
    }

    public getPoolObject(): PixiObjectsPoolEntry {
        for (const item of this.pooledObjects) {
            if (!item[1].isUsed) {
                item[1].isUsed = true;
                return item[1];
            }
        }

        const newObject = this.makePoolObject(`${this.assetName}_${this.pooledObjects.size}`);
        this.pooledObjects.set(newObject.id, newObject);
        newObject.isUsed = true;
        return newObject;
    }

    private makePoolObject(id: string): PixiObjectsPoolEntry {
        const object = layoutUtils.makeSprite(this.assetName);
        object.name = id;
        return {
            id,
            isUsed: false,
            object,
        }
    }

    public returnObject(id: string) {
        const object = this.pooledObjects.get(id);
        if (object === undefined) throw new Error(`Object with id: ${id} does not exist in pool`);

        object.isUsed = false;
    }
}
