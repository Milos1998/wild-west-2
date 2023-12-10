import { Application, Container, Sprite, Texture, Ticker } from "pixi.js";
import { layoutConfig, sceneConfig } from "../../config/SceneConfig";

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

    private scaleWidth!: Container;

    private scaleHeight!: Container;

    public setupScene(app: Application) {
        (globalThis as any).__PIXI_APP__ = app;
        this.app = app;

        this.scaleWidth = new Container();
        this.app.stage.addChild(this.scaleWidth);
        this.scaleHeight = new Container();
        this.scaleWidth.addChild(this.scaleHeight);
        this.scene = new Container();
        this.scaleHeight.addChild(this.scene);

        this.scene.position.set(0);
        this.ticker = Ticker.shared;
    
        this.fit();
        window.addEventListener("resize", this.fit.bind(this));
    }

    public fit() {
        const orientation = this.getOrientation(window.innerWidth, window.innerHeight);
        const config = layoutConfig.find((layout) => layout.orientation === orientation)?.config;
        if (config === undefined) throw new Error("Couldn't find layout config");

        this.app.renderer.resize(window.innerWidth, window.innerHeight);

        this.scaleWidth.position.set(this.app.screen.width / 2, this.app.screen.height / 2);
    }

    private getOrientation(screenWidth: number, screenHeight: number) {
        if (screenWidth / screenHeight > sceneConfig.orientationRatio) return Orientation.Landscape;
        return Orientation.Portrait;
    }
}

export const sceneController = new SceneController();
