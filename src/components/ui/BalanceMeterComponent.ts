import { take } from "redux-saga/effects";
import { sagaMiddleware, store } from "../../store/Store";
import { BaseMeterComponent } from "./baseComponents/BaseMeterComponent";
import { slotActions } from "../../store/SlotSlice";

export class BalanceMeterComponent extends BaseMeterComponent {
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
        const { balance } = store.getState().slotReducer.gameState;
        this.valueLabel.text = balance.toString();
    }
}
