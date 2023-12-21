import { spawn, take } from "redux-saga/effects";
import { uiState } from "../../store/Store";
import { BaseMeterComponent } from "./baseComponents/BaseMeterComponent";
import { uiActions } from "./uiStore/UiSlice";

export class BetMeterComponent extends BaseMeterComponent {
    * setReactions(): Generator {
        yield spawn([this, this.watchBetPerLine]);
        yield spawn([this, this.watchSelectedLines]);
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
