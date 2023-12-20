import { Container } from "pixi.js";
import { layoutController } from "../controllers/layoutController/LayoutController";
import { layoutUtils } from "../utils/LayoutUtils";

/**
 * Template for all game components
 */
export abstract class BaseComponent {
    protected container: Container;

    protected name: string;

    constructor(layoutId: string) {
        this.container = layoutUtils.getLayoutItem(layoutId).container;
        this.name = layoutId;
    }

    public set visible(visible: boolean) {
        this.container.visible = visible;
    }

    public get visible() {
        return this.container.visible;
    }
}
