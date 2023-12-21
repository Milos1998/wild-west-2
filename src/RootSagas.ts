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
import { layoutUtils } from "./utils/LayoutUtils";
import { reelSetActions } from "./components/reelSet/reelSetStore/ReelSetSlice";
import { slotState } from "./store/Store";

export type GameControlls = {
    reelSetControlls: ReelSetControlls,
    uiControlls: UiControlls,
}

export const rootSaga = function* (): Generator {
    yield call([assetLoader, assetLoader.load]);

    layoutController.fillLayoutMap(layoutConfigTrees);
    layoutController.orientationUpdate();

    sceneController.scene.addChild(layoutUtils.getLayoutItem("game").container);

    yield initSlotStore();
    yield put(reelSetActions.setReelImage([...slotState().init.image]));

    const controlls = initComponents();

    stateMachine.registerFlow("baseGame", new BGFlow(controlls));
    stateMachine.registerFlow("freeSpins", new FSGameFlow(controlls));
    stateMachine.addAsyncFlow(new SideEffectsFlow());

    yield spawn([stateMachine, stateMachine.runGameFlow]);
    yield spawn([layoutController, layoutController.watchOrientationChange]);
}

function initComponents(): GameControlls {
    const reelSet = new ReelSetComponent("reels");
    const reelSetControlls = new ReelSetControlls(reelSet);

    const ui = new UiComponent("ui");
    const uiControlls = new UiControlls(ui);

    return {
        reelSetControlls,
        uiControlls,
    }
}
