import { call, put, spawn } from "redux-saga/effects";
import { layoutConfigTrees } from "./config/LayoutConfig";
import { assetLoader } from "./controllers/AssetLoader"
import { sceneController } from "./controllers/SceneController";
import { layoutController } from "./controllers/layoutController/LayoutController";
import { BGFlow } from "./gameFlows/BGFlow";
import { FSGameFlow } from "./gameFlows/FSGameFlow";
import { SideEffectsFlow } from "./gameFlows/SideEffectsFlow";
import { stateMachine } from "./stateMachine/StateMachine";
import { initSlotStore } from "./store/SlotSagas";
import { ReelSetComponent } from "./components/reelSet/ReelSetComponent";
import { ReelSetControlls } from "./components/reelSet/ReelSetControlls";
import { UiComponent } from "./components/ui/UiComponent";
import { UiControlls } from "./components/ui/UiControlls";

export type GameControlls = {
    reelSetControlls: ReelSetControlls,
    uiControlls: UiControlls,
}

export const rootSaga = function* (): Generator {
    yield call([assetLoader, assetLoader.load]);

    layoutController.fillLayoutMap(layoutConfigTrees);

    const gameCont = layoutController.layoutMap.get("game");
    if (gameCont === undefined) throw new Error("Game container is missing in layout trees");
    sceneController.scene.addChild(gameCont.container);

    yield initSlotStore();

    const controlls = initComponents();

    stateMachine.registerFlow("baseGame", new BGFlow(controlls));
    stateMachine.registerFlow("freeSpins", new FSGameFlow(controlls));
    stateMachine.addAsyncFlow(new SideEffectsFlow());

    layoutController.orientationUpdate();
    yield spawn([stateMachine, stateMachine.runGameFlow]);
    yield spawn([layoutController, layoutController.watchOrientationChange]);
}

function initComponents(): GameControlls {
    const reelSet = new ReelSetComponent("reels");
    const reelSetControlls = new ReelSetControlls();

    const ui = new UiComponent("ui");
    const uiControlls = new UiControlls(ui);

    return {
        reelSetControlls,
        uiControlls,
    }
}
