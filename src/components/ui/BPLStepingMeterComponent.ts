import { put, take } from "redux-saga/effects";
import { slotActions } from "../../store/SlotSlice";
import { sagaMiddleware, store } from "../../store/Store";
import { BaseStepingMeterComponent } from "./baseComponents/BaseStepingMeterComponent";

/**
 * Bet per line stepper
 */
export class BPLStepingMeterComponent extends BaseStepingMeterComponent {
    protected setReactions() {
        sagaMiddleware.run(this.watchBetPerLine);
    }

    * watchBetPerLine() {
        while(true) {
            yield take(slotActions.setBetPerLine);
            this.setValue();
        }
    }

    protected setValue(): void {
        const { betPerLine } = store.getState().slotReducer.gameState;
        this.valueLabel.text = betPerLine.toString();
    }

    protected increment() {
        const { betPerLine, maxBetPerLine } = store.getState().slotReducer.gameState;

        this.decrementButton.enabled = betPerLine + 1 < maxBetPerLine;
        if (betPerLine + 1 > maxBetPerLine) return;

        sagaMiddleware.run(function* () {
            yield put(slotActions.setSelectedLines(betPerLine + 1));
        });
    }

    protected decrement() {
        const { betPerLine } = store.getState().slotReducer.gameState;

        this.decrementButton.enabled = betPerLine - 1 > 1;
        this.wasDecrementEnabled = this.decrementButton.enabled;
        if (betPerLine - 1 < 1) return;

        sagaMiddleware.run(function* () {
            yield put(slotActions.setSelectedLines(betPerLine - 1));
        });
    }
}
