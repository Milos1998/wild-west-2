import { Application } from 'pixi.js'
import { assetLoader } from './controllers/AssetLoader'
import { sceneController } from './controllers/SceneController'
import { layoutController } from './controllers/layoutController/LayoutController';
import { layoutConfigTrees } from './config/LayoutConfig';

const clickToStart = document.getElementById('click-to-start') as HTMLElement
const canvas = document.getElementById("pixi-canvas") as HTMLCanvasElement;
clickToStart.onclick = () => {
    clickToStart.style.display = "none";
    canvas.style.display = "block";
}

const app = new Application({
    antialias: true,
    view: canvas,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true
})

sceneController.setupScene(app);
assetLoader.load();
setTimeout(() => {
    layoutController.fillLayoutMap(layoutConfigTrees);
    const cont = layoutController.layoutMap.get("game");
    if (cont) sceneController.scene.addChild(cont.container);
}, 3000);
