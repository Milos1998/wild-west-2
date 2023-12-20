import { Container } from "pixi.js";
import { layoutController } from "../controllers/layoutController/LayoutController";

/**
 * Template for all game components
 */
export abstract class BaseComponent {
    protected container: Container;

    protected name: string;

    constructor(layoutId: string) {
        const layoutEntry = layoutController.layoutMap.get(layoutId);
        if (layoutEntry === undefined) throw new Error(`Container with name ${layoutId} does not exist on any of the layouts`);
        this.container = layoutEntry.container;
        this.name = layoutId;
    }

    public set visible(visible: boolean) {
        this.container.visible = visible;
    }

    public get visible() {
        return this.container.visible;
    }
}
