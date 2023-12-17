import { Application } from 'pixi.js'
import { sceneController } from './controllers/SceneController'
import { sagaMiddleware } from './store/Store';
import { rootSaga } from './RootSagas';

const clickToStart = document.getElementById('click-to-start') as HTMLElement
const canvas = document.getElementById("pixi-canvas") as HTMLCanvasElement;
clickToStart.onclick = () => {
    clickToStart.style.display = "none";
    canvas.style.display = "block";
    //add something for removing splash?
}

const app = new Application({
    antialias: true,
    view: canvas,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true
})

sceneController.setupScene(app);

sagaMiddleware.run(rootSaga);
