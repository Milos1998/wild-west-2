/**
 * Contains all states one game flow needs
 */
export abstract class GeneralGameFlow {
    /**
     * Run before removing splash screen, sets up game elements etc.
     */
    * onBeforeDisplay() {}

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

    /**
     * Run when state machine error occurs
     */
    * onError() {}
}
