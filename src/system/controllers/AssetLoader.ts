import { Assets, Sprite } from "pixi.js";
import { sceneController } from "./SceneController";

/**
 * Does asset loading
 */
class AssetLoader {
    public async load() {
        const bg = await Assets.load("./assets/sprites/Q.jpg");
        const sprite = new Sprite(bg);
        // sprite.anchor.set(0.5);
        // sprite.position.set(0);
        sceneController.scene.addChild(sprite);
    }
}

export const assetLoader = new AssetLoader();
