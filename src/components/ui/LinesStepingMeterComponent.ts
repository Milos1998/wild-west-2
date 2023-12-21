import { put, take } from "redux-saga/effects";
import { slotActions } from "../../store/SlotSlice";
import { sagaMiddleware, slotState, uiState } from "../../store/Store";
import { BaseStepingMeterComponent } from "./baseComponents/BaseStepingMeterComponent";
import { uiActions } from "./uiStore/UiSlice";

export class LinesStepingMeterComponent extends BaseStepingMeterComponent {
    protected setReactions() {
        sagaMiddleware.run(this.watchBalance);
    }

    * watchBalance() {
        while(true) {
            yield take(uiActions.setSelectedLines);
            this.setValue();
        }
    }

    protected setValue(): void {
        const selectedLines = uiState().selectedLines;
        this.valueLabel.text = selectedLines.toString();
    }

    protected increment() {
        const { selectedLines, maxSelectedLines } = uiState();

        this.incrementButton.enabled = selectedLines + 1 < maxSelectedLines;
        this.wasIncrementEnabled = this.incrementButton.enabled;
        this.decrementButton.enabled = true;
        this.wasDecrementEnabled = true;
        if (selectedLines + 1 > maxSelectedLines) return;

        sagaMiddleware.run(function* () {
            yield put(slotActions.setSelectedLines(selectedLines + 1));
            yield put(uiActions.setSelectedLines(selectedLines + 1));
        });
    }

    protected decrement() {
        const { selectedLines } = slotState().gameState;

        this.decrementButton.enabled = selectedLines - 1 > 1;
        this.wasDecrementEnabled = this.decrementButton.enabled;
        this.incrementButton.enabled = true;
        this.wasIncrementEnabled = true;
        if (selectedLines - 1 < 1) return;

        sagaMiddleware.run(function* () {
            yield put(slotActions.setSelectedLines(selectedLines - 1));
            yield put(uiActions.setSelectedLines(selectedLines - 1));
        });
    }
}
