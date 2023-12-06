import { Application, Container, Ticker } from "pixi.js";
import { layoutConfig, sceneConfig } from "../config/SceneConfig";

export enum Orientation {
    Landscape,
    Portrait
}

/**
 * Resizes canvas, holds ticker
 */
class SceneController {
    public app!: Application;

    public ticker!: Ticker;

    public scene!: Container;

    private canvas!: HTMLElement;

    public setupScene(app: Application) {
        this.canvas = document.getElementById("pixi-canvas") as HTMLElement;
        (globalThis as any).__PIXI_APP__ = app;
        this.app = app;

        this.scene = new Container();

        this.app.stage.addChild(this.scene);
        this.scene.position.set(0);
        this.ticker = Ticker.shared;
    
        this.fit();
        window.addEventListener("resize", this.fit.bind(this));
    }

    public fit() {
        const orientation = this.getOrientation(window.innerWidth, window.innerHeight);
        const config = layoutConfig.find((layout) => layout.orientation === orientation)?.config;
        if (config === undefined) throw new Error("Couldn't find layout config");

        let sceneWidth = window.innerWidth;
        let sceneHeight = window.innerHeight;

        if (sceneWidth > config.maxWidth) sceneWidth = config.maxWidth;
        else if (sceneWidth < config.minWidth) sceneWidth = config.minWidth;
        if (sceneHeight > config.maxHeight) sceneHeight = config.maxHeight;
        else if (sceneHeight < config.minHeight) sceneHeight = config.minHeight;

        this.canvas.style!.width = `${sceneWidth}px`;
        this.canvas.style!.height = `${sceneHeight}px`;
        this.app.resizeTo = this.canvas;

        this.app.stage.pivot.set(this.app.screen.width / 2, this.app.screen.height / 2);
        this.app.stage.position.set(this.app.screen.width, this.app.screen.height)
        // this.scene.pivot.set(this.scene.width / 2, this.scene.height / 2);
    }

    private getOrientation(screenWidth: number, screenHeight: number) {
        if (screenWidth / screenHeight > sceneConfig.orientationRatio) return Orientation.Landscape;
        return Orientation.Portrait;
    }
}

const sceneController = new SceneController();
export default sceneController
