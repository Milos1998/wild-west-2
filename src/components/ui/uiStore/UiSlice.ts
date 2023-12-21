import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UiStateType } from "./UiTypes";

const initialState: UiStateType = {
    balance: 0,
    betPerLine: 0,
    fsLeft: 0,
    fsWon: 0,
    maxBetPerLine: 0,
    maxSelectedLines: 0,
    selectedLines: 0,
    win: 0
}

const uiSlice = createSlice({
    name: "uiSlice",
    initialState,
    reducers: {
        setBalance: (state: UiStateType, { payload: balance }: PayloadAction<number>) => {
            state.balance = balance;
        },
        setWin: (state: UiStateType, { payload: win }: PayloadAction<number>) => {
            state.win = win;
        },
        setBetPerLine: (state: UiStateType, { payload: betPerLine }: PayloadAction<number>) => {
            state.betPerLine = betPerLine;
        },
        setFsLeft: (state: UiStateType, { payload: fsLeft }: PayloadAction<number>) => {
            state.fsLeft = fsLeft;
        },
        setFsWon: (state: UiStateType, { payload: fsWon }: PayloadAction<number>) => {
            state.fsWon = fsWon;
        },
        setSelectedLines: (state: UiStateType, { payload: selectedLines }: PayloadAction<number>) => {
            state.selectedLines = selectedLines;
        },
        setMaxBetPerLine: (state: UiStateType, { payload: maxBetPerLine }: PayloadAction<number>) => {
            state.maxBetPerLine = maxBetPerLine;
        },
        setMaxSelectedLines: (state: UiStateType, { payload: maxSelectedLines }: PayloadAction<number>) => {
            state.maxSelectedLines = maxSelectedLines;
        },
    }
});

export const uiReducer = uiSlice.reducer;
export const uiActions = uiSlice.actions;
