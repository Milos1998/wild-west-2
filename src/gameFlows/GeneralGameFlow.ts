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
    * onBeforeDisplay(): Generator<Generator<CallEffect<unknown>, void, unknown>, void, unknown> {}

    /**
     * Run after pervious flow's onChangeFlow. Here you setup current flow elements and display bonus win
     */
    * onReturnToFlow(): Generator<Generator<CallEffect<unknown>, void, unknown>, void, unknown> {}

    /**
     * Await for spin button/auto spin start
     */
    * onBeforeRequest(): Generator<Generator<CallEffect<unknown>, void, unknown>, void, unknown> {}

    /**
     * Here request is made and game is waiting for response
     */
    * onMakeRequest(): Generator<Generator<CallEffect<unknown>, void, unknown>, void, unknown> {}

    /**
     * Here reels should stop and preshow can be played
     */
    * onSuccessfulResponse(): Generator<Generator<CallEffect<unknown>, void, unknown>, void, unknown> {}

    /**
     * Here win presentation should be played
     */
    * onDisplayAward(): Generator<Generator<CallEffect<unknown>, void, unknown>, void, unknown> {}

    /**
     * setup this flow before exiting to another
     */
    * onChangeFlow(): Generator<Generator<CallEffect<unknown>, void, unknown>, void, unknown> {}

    /**
     * Run when bad request has ben sent, request timeout or insuficient funds
     */
    * onBadRequest(): Generator<Generator<CallEffect<unknown>, void, unknown>, void, unknown> {}

    /**
     * Run when state machine error occurs
     */
    * onError(): Generator<Generator<CallEffect<unknown>, void, unknown>, void, unknown> {
        alert("Something went wrong :/");
    }
}
