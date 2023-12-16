import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { reelSetReducer } from "../components/reelSet/slice/ReelSetSlice";
import { slotReducer } from "./SlotSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        slotReducer,
        reelSetReducer,        
    },
    middleware: [sagaMiddleware],
});
