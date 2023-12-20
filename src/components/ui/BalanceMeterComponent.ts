import { take } from "redux-saga/effects";
import { sagaMiddleware, slotState } from "../../store/Store";
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
        const { balance } = slotState().gameState;
        this.valueLabel.text = balance.toString();
    }
}
