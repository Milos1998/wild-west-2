import { spawn, take } from "redux-saga/effects";
import { uiState } from "../../store/Store";
import { BaseMeterComponent } from "./baseComponents/BaseMeterComponent";
import { uiActions } from "./uiStore/UiSlice";

export class BalanceMeterComponent extends BaseMeterComponent {
    * setReactions(): Generator {
        yield spawn([this, this.watchBalance]);
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
