import { Container } from "pixi.js";
import { layoutController } from "../controllers/layoutController/LayoutController";
import { BaseComponentControlls } from "./BaseComponentControlls";

/**
 * Template for all game components
 */
export abstract class BaseGameComponent {
    private container: Container;

    private controlls!: BaseComponentControlls;

    constructor(layoutId: string) {
        const layoutEntry = layoutController.layoutMap.get(layoutId);
        if (layoutEntry === undefined) throw new Error(`Container with name ${layoutId} does not exist on any of the layouts`);
        this.container = layoutEntry.container;
    }

    public setControlls(controlls: BaseComponentControlls) {
        this.controlls = controlls;
    }
}
