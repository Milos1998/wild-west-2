import { Application, Container, Ticker } from "pixi.js";
import { screenConfig, Orientation, sceneConfig, ScreenSize } from "../../config/SceneConfig";

/**
 * Resizes canvas, holds ticker
 */
class SceneController {
    public app!: Application;

    public ticker!: Ticker;

    public scene!: Container;

    public setupScene(app: Application) {
        (globalThis as any).__PIXI_APP__ = app;
        this.app = app;

        this.scene = new Container();
        this.app.stage.addChild(this.scene);

        this.ticker = Ticker.shared;
    
        this.fit();
        window.addEventListener("resize", this.fit.bind(this));
    }

    public fit() {
        const orientation = this.getOrientation(window.innerWidth, window.innerHeight);
        const config = screenConfig.find((screen) => screen.orientation === orientation)?.config;
        if (config === undefined) throw new Error("Couldn't find layout config");

        this.resizeRenderer();

        const aspectRatio = this.findAspectRatio(this.app.screen.width, this.app.screen.height, config);        
        this.scene.scale.set(aspectRatio);
        this.scene.position.x = this.app.screen.width / 2;
        this.scene.position.y = this.app.screen.height / 2;
    }

    private resizeRenderer() {
        //writting this abomination because when resizing app.scene doesn't have right
        //dimensions only on portrait and only when toggling orientation
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
    }

    private findAspectRatio(screenWidth: number, screenHeight: number, config: ScreenSize): number {
        let widthAR = 1;
        let heightAR = 1;

        if (screenWidth > config.maxWidth) widthAR = screenWidth / config.maxWidth;
        if (screenHeight > config.maxHeight) heightAR = screenHeight / config.maxHeight;
        if (widthAR > 1 && widthAR > heightAR) return widthAR;
        if (heightAR > 1) return heightAR;

        if (screenWidth < config.minWidth) widthAR = screenWidth / config.minWidth;
        if (screenHeight < config.minHeight) heightAR = screenHeight / config.minHeight;
        if (widthAR < heightAR) return widthAR;
        return heightAR;
    }

    private getOrientation(screenWidth: number, screenHeight: number) {
        if (screenWidth / screenHeight > sceneConfig.orientationRatio) return Orientation.Landscape;
        return Orientation.Portrait;
    }
}

export const sceneController = new SceneController();
