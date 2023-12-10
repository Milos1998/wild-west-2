import { Application, Container, Ticker } from 'pixi.js'
import { sceneConfig } from './config/SceneConfig'
import { assetLoader } from './system/controllers/AssetLoader'
import { sceneController } from './system/controllers/SceneController'

const clickToStart = document.getElementById('click-to-start') as HTMLElement

clickToStart.onclick = () => {
    const app = new Application({
        antialias: true,
        backgroundColor: sceneConfig.backgroundColor,
        view: document.getElementById('pixi-canvas') as HTMLCanvasElement,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true
    })


    sceneController.setupScene(app);

    clickToStart.style.display = 'none'

    assetLoader.load();
}
