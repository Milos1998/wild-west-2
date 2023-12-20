import { take } from "redux-saga/effects";
import { sagaMiddleware, slotState } from "../../store/Store";
import { BaseMeterComponent } from "./baseComponents/BaseMeterComponent";
import { slotActions } from "../../store/SlotSlice";

export class BetMeterComponent extends BaseMeterComponent {
    protected setReactions() {
        sagaMiddleware.run(this.watchBetPerLine);
        sagaMiddleware.run(this.watchSelectedLines);
    }

    * watchBetPerLine() {
        while(true) {
            yield take(slotActions.setBetPerLine);
            this.setValue();
        }
    }

    * watchSelectedLines() {
        while(true) {
            yield take(slotActions.setSelectedLines);
            this.setValue();
        }
    }

    protected setValue(): void {
        const { betPerLine } = slotState().gameState;
        const { selectedLines } = slotState().gameState;
        this.valueLabel.text = (betPerLine * selectedLines).toString();
    }
}
