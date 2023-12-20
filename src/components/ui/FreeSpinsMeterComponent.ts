import { take } from "redux-saga/effects";
import { sagaMiddleware, store } from "../../store/Store";
import { BaseMeterComponent } from "./baseComponents/BaseMeterComponent";
import { slotActions } from "../../store/SlotSlice";

export class FreeSpinsMeterComponent extends BaseMeterComponent {
    protected setReactions() {
        sagaMiddleware.run(this.watchFsLeft);
        sagaMiddleware.run(this.watchFsWon);
    }

    * watchFsLeft() {
        while(true) {
            yield take(slotActions.setFsLeft);
            this.setValue();
        }
    }

    * watchFsWon() {
        while(true) {
            yield take(slotActions.setFsWon);
            this.setValue();
        }
    }

    protected setValue(): void {
        const { fsLeft } = store.getState().slotReducer.gameState;
        const { fsWon } = store.getState().slotReducer.gameState;
        this.valueLabel.text = `${fsWon - fsLeft} / ${fsWon}`;
    }
}
