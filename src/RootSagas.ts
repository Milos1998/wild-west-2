import { call, spawn } from "redux-saga/effects";
import { layoutConfigTrees } from "./config/LayoutConfig";
import { assetLoader } from "./controllers/AssetLoader"
import { sceneController } from "./controllers/SceneController";
import { layoutController } from "./controllers/layoutController/LayoutController";
import { BGFlow } from "./gameFlows/BGFlow";
import { FSGameFlow } from "./gameFlows/FSGameFlow";
import { SideEffectsFlow } from "./gameFlows/SideEffectsFlow";
import { stateMachine } from "./stateMachine/StateMachine";
import { initSlotStore } from "./store/SlotSagas";

export const rootSaga = function* () {
    yield call([assetLoader, assetLoader.load]);

    layoutController.fillLayoutMap(layoutConfigTrees);

    const gameCont = layoutController.layoutMap.get("game");
    if (gameCont === undefined) throw new Error("Game container is missing in layout trees");
    sceneController.scene.addChild(gameCont.container);

    yield initSlotStore();

    yield initComponents();

    stateMachine.registerFlow("baseGame", new BGFlow());
    stateMachine.registerFlow("freeSpins", new FSGameFlow());
    stateMachine.addAsyncFlow(new SideEffectsFlow());

    yield spawn([stateMachine, stateMachine.runGameFlow]);
}

function* initComponents() {
    //
}
