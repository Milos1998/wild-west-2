import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { reelSetReducer } from "../components/reelSet/reelSetStore/ReelSetSlice";
import { slotReducer } from "./SlotSlice";
import { uiReducer } from "../components/ui/uiStore/UiSlice";

export const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        slotReducer,
        reelSetReducer,
        uiReducer
    },
    middleware: [sagaMiddleware],
});

export const slotState = () => store.getState().slotReducer;
export const reelSetState = () => store.getState().reelSetReducer;
export const uiState = () => store.getState().uiReducer;
