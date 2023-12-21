import { Assets } from "pixi.js";
import { manifest } from "../config/LayoutConfig";

/**
 * Does asset loading
 */
class AssetLoader {
    public async load() {
        await Assets.init({ manifest });
        const sprites = Assets.loadBundle("sprites");
        const sounds = Assets.loadBundle("sounds");
        return Promise.all([sprites, sounds]);
    }

    public removeSplash() {
        const clickToStart = document.getElementById('click-to-start') as HTMLElement
        const canvas = document.getElementById("pixi-canvas") as HTMLCanvasElement;
        clickToStart.style.display = "none";
        canvas.style.display = "block";
    }
}

export const assetLoader = new AssetLoader();
