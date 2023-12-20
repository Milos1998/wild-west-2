import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { reelSetReducer } from "../components/reelSet/reelSetStore/ReelSetSlice";
import { slotReducer } from "./SlotSlice";

export const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        slotReducer,
        reelSetReducer,        
    },
    middleware: [sagaMiddleware],
});

export const slotState = () => store.getState().slotReducer;
