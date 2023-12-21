import { take } from "redux-saga/effects";
import { sagaMiddleware, uiState } from "../../store/Store";
import { BaseMeterComponent } from "./baseComponents/BaseMeterComponent";
import { uiActions } from "./uiStore/UiSlice";

export class BetMeterComponent extends BaseMeterComponent {
    protected setReactions() {
        sagaMiddleware.run(this.watchBetPerLine);
        sagaMiddleware.run(this.watchSelectedLines);
    }

    * watchBetPerLine() {
        while(true) {
            yield take(uiActions.setBetPerLine);
            this.setValue();
        }
    }

    * watchSelectedLines() {
        while(true) {
            yield take(uiActions.setSelectedLines);
            this.setValue();
        }
    }

    protected setValue(): void {
        const { betPerLine } = uiState();
        const { selectedLines } = uiState();
        this.valueLabel.text = (betPerLine * selectedLines).toString();
    }
}
