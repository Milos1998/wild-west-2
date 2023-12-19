import { Application, Container, Ticker } from "pixi.js";
import { screenConfig, Orientation, sceneConfig, ScreenSize } from "../config/SceneConfig";
import { put } from "redux-saga/effects";
import { slotActions } from "../store/SlotSlice";
import { sagaMiddleware, store } from "../store/Store";

/**
 * Resizes canvas, holds ticker
 */
class SceneController {
    public app!: Application;

    public ticker!: Ticker;

    public scene!: Container;

    private resizeTimer: NodeJS.Timeout | undefined;

    public setupScene(app: Application) {
        (globalThis as any).__PIXI_APP__ = app;
        this.app = app;

        this.scene = new Container();
        this.app.stage.addChild(this.scene);

        this.ticker = Ticker.shared;

        this.fit();
        window.addEventListener("resize", this.setResizeTimer.bind(this));
    }

    private setResizeTimer() {
        if (this.resizeTimer !== undefined) clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
            this.fit();
            this.resizeTimer = undefined;
        }, 200);
    }

    public fit() {
        const orientation = this.getOrientation(window.innerWidth, window.innerHeight);
        const config = screenConfig.find((screen) => screen.orientation === orientation)?.config;
        if (config === undefined) throw new Error("Couldn't find layout config");

        this.resizeRenderer();

        const aspectRatio = this.findAspectRatio(this.app.screen.width, this.app.screen.height, config);        
        this.scene.scale.set(aspectRatio);
        this.app.stage.pivot.set(this.app.screen.width / 2, this.app.screen.height / 2);
        this.app.stage.position.set(this.app.screen.width / 2, this.app.screen.height / 2);
        const position = this.getNewStagePosition(config, aspectRatio);
        this.scene.position.set(position.x, position.y);

        if (store.getState().slotReducer.systemState.orientation !== orientation) {
            sagaMiddleware.run(function* () {
                yield put(slotActions.setOrientation(orientation));
            });
        }
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

    private getNewStagePosition(config: ScreenSize, scale: number): { x: number, y: number } {
        let x = -(config.maxWidth * scale - this.app.screen.width) / 2;
        let y = -(config.maxHeight * scale - this.app.screen.height) / 2;

        return { x, y };
    }

    private getOrientation(screenWidth: number, screenHeight: number) {
        if (screenWidth / screenHeight < sceneConfig.orientationRatio) return Orientation.Portrait;
        return Orientation.Landscape;
    }
}

export const sceneController = new SceneController();
