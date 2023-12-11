import { Assets, Container, Graphics, Sprite } from "pixi.js";
import { assetConfig } from "../../config/LayoutConfig";
import { sceneController } from "./SceneController";

/**
 * Does asset loading
 */
class AssetLoader {
    private progressBar!: Graphics;

    private progress!: Graphics;

    private splash!: Graphics;

    public async load() {
        this.makeSplash(sceneController.scene);
        const manifest = {
            bundles: [
                {
                    name: "all",
                    assets: assetConfig
                }
            ]
        }
        await Assets.init({ manifest });
        await Assets.loadBundle("all", this.onProgressUpdate.bind(this));
        // Assets.get(""); //koristi ovo za dohvatanje kesiranih tekstura
        //loading done
    }

    private onProgressUpdate(progress: number) {
        this.progress.scale.x = progress;
    }

    private makeSplash(container: Container) {
        const progBarWidth = 500;
        const progBarHeight = 50;

        this.splash = new Graphics();
        this.splash.beginFill(0x12345);
        this.splash.drawRect(0, 0, 1000, 1000);
        this.splash.endFill();
        container.addChild(this.splash);

        this.progress = new Graphics();
        container.addChild(this.progress)
        this.progress.beginFill(0x110b7a);
        this.progress.drawRect(0, 0, progBarWidth, progBarHeight);
        this.progress.endFill();
        this.progress.scale.x = 0;

        this.progressBar = new Graphics();
        container.addChild(this.progressBar);
        this.progressBar.beginFill(0x0);
        this.progressBar.lineStyle(5, 0x0);
        this.progressBar.drawRect(0, 0, progBarWidth, progBarHeight);
        this.progressBar.endFill();
    }
}

export const assetLoader = new AssetLoader();
