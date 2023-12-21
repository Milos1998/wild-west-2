import { spawn, take } from "redux-saga/effects";
import { uiState } from "../../store/Store";
import { BaseMeterComponent } from "./baseComponents/BaseMeterComponent";
import { uiActions } from "./uiStore/UiSlice";

export class WinMeterComponent extends BaseMeterComponent {
    * setReactions(): Generator {
        yield spawn([this, this.watchWin]);
    }

    * watchWin() {
        while(true) {
            yield take(uiActions.setWin);
            this.setValue();
        }
    }

    protected setValue(): void {
        const { win } = uiState();
        this.valueLabel.text = win.toString();
    }
}
