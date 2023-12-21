import { take } from "redux-saga/effects";
import { sagaMiddleware, uiState } from "../../store/Store";
import { BaseMeterComponent } from "./baseComponents/BaseMeterComponent";
import { uiActions } from "./uiStore/UiSlice";

export class FreeSpinsMeterComponent extends BaseMeterComponent {
    protected setReactions() {
        sagaMiddleware.run(this.watchFsLeft);
        sagaMiddleware.run(this.watchFsWon);
    }

    * watchFsLeft() {
        while(true) {
            yield take(uiActions.setFsLeft);
            this.setValue();
        }
    }

    * watchFsWon() {
        while(true) {
            yield take(uiActions.setFsWon);
            this.setValue();
        }
    }

    protected setValue(): void {
        const { fsLeft } = uiState();
        const { fsWon } = uiState();
        this.valueLabel.text = `${fsWon - fsLeft} / ${fsWon}`;
    }
}
