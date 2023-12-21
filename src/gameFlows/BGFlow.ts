import { delay, take } from "redux-saga/effects";
import { UiElementId } from "../components/ui/UiComponent";
import { GeneralGameFlow } from "./GeneralGameFlow";
import { slotActions } from "../store/SlotSlice";
import { assetLoader } from "../controllers/AssetLoader";

/**
 * Base game flow
 */
export class BGFlow extends GeneralGameFlow {
    private baseGameUi: UiElementId[] = ["AUTO_SPIN", "BALANCE", "BET_PER_LINE", "LINES", "SKIP", "SLAM_STOP", "SPIN", "TOTAL_BET", "WIN"];

    /**
     * Run before removing splash screen, sets up game elements etc.
     */
    * onBeforeDisplay() {
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
        yield delay(1000);
        yield this.flowControlls.reelSetControlls.startSpin();
    }

    /**
     * Here request is made and game is waiting for response
     */
    * onMakeRequest() {
        yield take(slotActions.setSpinResponse);
    }

    /**
     * Here reels should stop and preshow can be played
     */
    * onSuccessfulResponse() {
        // yield put(reelSetActions.setReelImage(slotState().response.reelImage));
        yield this.flowControlls.reelSetControlls.stopSpin();
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
        yield this.flowControlls.reelSetControlls.stopSpin();
    }
}
