import { Application, Container, Ticker } from 'pixi.js'
import { assetLoader } from './system/controllers/AssetLoader'
import { sceneController } from './system/controllers/SceneController'

const clickToStart = document.getElementById('click-to-start') as HTMLElement
const canvas = document.getElementById("pixi-canvas") as HTMLCanvasElement;
clickToStart.onclick = () => {
    clickToStart.style.display = "none";
    canvas.style.display = "block";
    assetLoader.load();
}

const app = new Application({
    antialias: true,
    view: canvas,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true
})

sceneController.setupScene(app);

