import { take } from "redux-saga/effects";
import { sagaMiddleware, slotState, uiState } from "../../store/Store";
import { BaseMeterComponent } from "./baseComponents/BaseMeterComponent";
import { slotActions } from "../../store/SlotSlice";
import { uiActions } from "./uiStore/UiSlice";

export class BalanceMeterComponent extends BaseMeterComponent {
    protected setReactions() {
        sagaMiddleware.run(this.watchBalance);
    }

    * watchBalance() {
        while(true) {
            yield take(uiActions.setBalance);
            this.setValue();
        }
    }

    protected setValue(): void {
        const { balance } = uiState();
        this.valueLabel.text = balance.toString();
    }
}
