import { Application } from 'pixi.js'
import { sceneController } from './controllers/SceneController'
import { sagaMiddleware } from './store/Store';
import { rootSaga } from './RootSagas';

const canvas = document.getElementById("pixi-canvas") as HTMLCanvasElement;

const app = new Application({
    antialias: true,
    view: canvas,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true
})

sceneController.setupScene(app);

sagaMiddleware.run(rootSaga);
