import { put, spawn, take } from "redux-saga/effects";
import { slotActions } from "../../store/SlotSlice";
import { sagaMiddleware, uiState } from "../../store/Store";
import { BaseStepingMeterComponent } from "./baseComponents/BaseStepingMeterComponent";
import { uiActions } from "./uiStore/UiSlice";

/**
 * Bet per line stepper
 */
export class BPLStepingMeterComponent extends BaseStepingMeterComponent {
    * setReactions(): Generator {
        yield spawn([this, this.watchBetPerLine]);
    }

    * watchBetPerLine() {
        while(true) {
            yield take(uiActions.setBetPerLine);
            this.setValue();
        }
    }

    protected setValue(): void {
        const { betPerLine } = uiState();
        this.valueLabel.text = betPerLine.toString();
    }

    protected increment() {
        const { betPerLine, maxBetPerLine } = uiState();

        this.incrementButton.enabled = betPerLine + 1 < maxBetPerLine;
        this.wasIncrementEnabled = this.incrementButton.enabled;
        this.decrementButton.enabled = true;
        this.wasDecrementEnabled = true;
        if (betPerLine + 1 > maxBetPerLine) return;

        sagaMiddleware.run(function* () {
            yield put(slotActions.setBetPerLine(betPerLine + 1));
            yield put(uiActions.setBetPerLine(betPerLine + 1));
        });
    }

    protected decrement() {
        const { betPerLine } = uiState();

        this.decrementButton.enabled = betPerLine - 1 > 1;
        this.wasDecrementEnabled = this.decrementButton.enabled;
        this.incrementButton.enabled = true;
        this.wasIncrementEnabled = true;
        if (betPerLine - 1 < 1) return;

        sagaMiddleware.run(function* () {
            yield put(slotActions.setBetPerLine(betPerLine - 1));
            yield put(uiActions.setBetPerLine(betPerLine - 1));
        });
    }
}
