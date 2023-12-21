import { delay, fork, put, take } from "redux-saga/effects";
import { UiElementId } from "../components/ui/UiComponent";
import { GeneralGameFlow } from "./GeneralGameFlow";
import { slotActions } from "../store/SlotSlice";
import { assetLoader } from "../controllers/AssetLoader";
import { reelSetActions } from "../components/reelSet/reelSetStore/ReelSetSlice";
import { slotState } from "../store/Store";
import { sendSpinRequest } from "../store/SlotSagas";

/**
 * Base game flow
 */
export class BGFlow extends GeneralGameFlow {
    private baseGameUi: UiElementId[] = ["AUTO_SPIN", "BALANCE", "BET_PER_LINE", "LINES", "SKIP", "SLAM_STOP", "SPIN", "TOTAL_BET", "WIN"];

    /**
     * Run before removing splash screen, sets up game elements etc.
     */
    * onBeforeDisplay() {
        yield this.flowControlls.uiControlls.displayElements(this.baseGameUi);
        yield this.flowControlls.uiControlls.toggleAllButtonsAndSteppers(true);
        assetLoader.removeSplash();
    }

    /**
     * Run after pervious flow's onChangeFlow. Here you setup current flow elements and display bonus win
     */
    * onReturnToFlow() {}

    /**
     * Await for spin button/auto spin start
     */
    * onBeforeRequest() {
        yield put(slotActions.setIsSpinPressed(false));
        yield put(slotActions.setIsSlamStopped(false));
        yield put(slotActions.setIsSkipped(false));
        yield this.flowControlls.uiControlls.setSpinButton("SPIN", true);
        yield take(slotActions.setIsSpinPressed);
        yield this.flowControlls.reelSetControlls.startSpin();
    }

    /**
     * Here request is made and game is waiting for response
     */
    * onMakeRequest() {
        yield sendSpinRequest();
    }

    /**
     * Here reels should stop and preshow can be played
     */
    * onSuccessfulResponse() {
        yield this.flowControlls.uiControlls.setSpinButton("SLAM_STOP", true);
        yield put(reelSetActions.setIsReadyToStop(true));
        yield put(reelSetActions.setReelImage(slotState().response.reelImage));
        yield this.flowControlls.reelSetControlls.stopSpin();
        yield this.flowControlls.uiControlls.setSpinButton("SPIN", false);
        yield put(reelSetActions.setIsReadyToStop(false));
    }

    /**
     * Here win presentation should be played
     */
    * onDisplayAward() {}

    /**
     * setup this flow before exiting to another
     */
    * onChangeFlow() {}

    /**
     * Run when bad request has ben sent, request timeout or insuficient funds
     */
    * onBadRequest() {
        yield put(reelSetActions.setIsReadyToStop(true));
        yield put(slotActions.setIsSlamStopped(true));
        yield this.flowControlls.reelSetControlls.stopSpin();
        yield put(reelSetActions.setIsReadyToStop(false));
        alert("Check network connection");
    }
}
