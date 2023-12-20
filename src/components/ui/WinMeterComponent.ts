import { take } from "redux-saga/effects";
import { sagaMiddleware, slotState } from "../../store/Store";
import { BaseMeterComponent } from "./baseComponents/BaseMeterComponent";
import { slotActions } from "../../store/SlotSlice";

export class WinMeterComponent extends BaseMeterComponent {
    protected setReactions() {
        sagaMiddleware.run(this.watchWin);
    }

    * watchWin() {
        while(true) {
            yield take(slotActions.setWin);
            this.setValue();
        }
    }

    protected setValue(): void {
        const { win } = slotState().gameState;
        this.valueLabel.text = win.toString();
    }
}
