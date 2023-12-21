import { CallEffect } from "redux-saga/effects";
import { GameControlls } from "../RootSagas";

/**
 * Contains all states one game flow needs
 */
export abstract class GeneralGameFlow {
    protected flowControlls: GameControlls;

    constructor (flowControlls: GameControlls) {
        this.flowControlls = flowControlls;
    }

    /**
     * Run before removing splash screen, sets up game elements etc.
     */
    * onBeforeDisplay(): Generator {}

    /**
     * Run after pervious flow's onChangeFlow. Here you setup current flow elements and display bonus win
     */
    * onReturnToFlow(): Generator {}

    /**
     * Await for spin button/auto spin start
     */
    * onBeforeRequest(): Generator {}

    /**
     * Here request is made and game is waiting for response
     */
    * onMakeRequest(): Generator {}

    /**
     * Here reels should stop and preshow can be played
     */
    * onSuccessfulResponse(): Generator {}

    /**
     * Here win presentation should be played
     */
    * onDisplayAward(): Generator {}

    /**
     * setup this flow before exiting to another
     */
    * onChangeFlow(): Generator {}

    /**
     * Run when bad request has ben sent, request timeout or insuficient funds
     */
    * onBadRequest(): Generator {}

    /**
     * Run when state machine error occurs
     */
    * onError(): Generator {
        alert("Something went wrong :/");
    }
}
