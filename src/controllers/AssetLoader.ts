import { Assets, Container, Graphics, Sprite } from "pixi.js";
import { manifest } from "../config/LayoutConfig";
import { sceneController } from "./SceneController";

/**
 * Does asset loading
 */
class AssetLoader {
    private splash!: Container;

    public async load() {
        this.makeSplash(sceneController.scene);
        await Assets.init({ manifest });
        const sprites = Assets.loadBundle("sprites");
        const sounds = Assets.loadBundle("sounds");
        return Promise.all([sprites, sounds]);
    }

    private makeSplash(container: Container) {
        this.splash = new Container();
        container.addChild(this.splash);
        this.splash.position.x = container.width / 2;
        this.splash.position.y = container.height / 2;
        //make some loading screen
    }

    public removeSplash() {
        this.splash.parent.removeChild(this.splash);
    }
}

export const assetLoader = new AssetLoader();
