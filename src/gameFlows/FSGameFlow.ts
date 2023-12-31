import { assetLoader } from "../controllers/AssetLoader";
import { GeneralGameFlow } from "./GeneralGameFlow";

/**
 * Base game flow
 */
export class FSGameFlow extends GeneralGameFlow {
    /**
     * Run before removing splash screen, sets up game elements etc.
     */
    * onBeforeDisplay() {
        assetLoader.removeSplash();
    }

    /**
     * Run after pervious flow's onChangeFlow. Here you setup current flow elements and display bonus win
     */
    * onReturnToFlow() {}

    /**
     * Await for spin button/auto spin start
     */
    * onBeforeRequest() {}

    /**
     * Here request is made and game is waiting for response
     */
    * onMakeRequest() {}

    /**
     * Here reels should stop and preshow can be played
     */
    * onSuccessfulResponse() {}

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
    * onBadRequest() {}
}
