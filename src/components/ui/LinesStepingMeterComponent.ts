import { put, take } from "redux-saga/effects";
import { slotActions } from "../../store/SlotSlice";
import { sagaMiddleware, slotState } from "../../store/Store";
import { BaseStepingMeterComponent } from "./baseComponents/BaseStepingMeterComponent";

export class LinesStepingMeterComponent extends BaseStepingMeterComponent {
    protected setReactions() {
        sagaMiddleware.run(this.watchBalance);
    }

    * watchBalance() {
        while(true) {
            yield take(slotActions.setBalance);
            this.setValue();
        }
    }

    protected setValue(): void {
        const { selectedLines } = slotState().gameState;
        this.valueLabel.text = selectedLines.toString();
    }

    protected increment() {
        const { selectedLines, maxSelectedLines } = slotState().gameState;

        this.decrementButton.enabled = selectedLines + 1 < maxSelectedLines;
        if (selectedLines + 1 > maxSelectedLines) return;

        sagaMiddleware.run(function* () {
            yield put(slotActions.setSelectedLines(selectedLines + 1));
        });
    }

    protected decrement() {
        const { selectedLines } = slotState().gameState;

        this.decrementButton.enabled = selectedLines - 1 > 1;
        if (selectedLines - 1 < 1) return;

        sagaMiddleware.run(function* () {
            yield put(slotActions.setSelectedLines(selectedLines - 1));
        });
    }
}
