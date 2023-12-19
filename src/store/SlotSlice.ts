import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GameState, Init, SlotStateType, SpinResponse } from "./SlotTypes";
import { Orientation } from "../config/SceneConfig";

const initialState: SlotStateType = {
    gameState: new GameState(),
    init: {
        image: [],
        lines: [],
        paytable: [],
    },
    response: {
        gameState: new GameState(),
        highlight: [],
        reelImage: [],
    }, systemState: {
        orientation: Orientation.Landscape,
        isRequestSuccessful: true,
    }
}

const slotSlice = createSlice({
    name: "slotSlice",
    initialState,
    reducers: {
        setBalance: (state: SlotStateType, { payload: balance }: PayloadAction<number>) => {
            state.gameState.balance = balance;
        },
        setWin: (state: SlotStateType, { payload: win }: PayloadAction<number>) => {
            state.gameState.win = win;
        },
        setBetPerLine: (state: SlotStateType, { payload: betPerLine }: PayloadAction<number>) => {
            state.gameState.betPerLine = betPerLine;
        },
        setFlow: (state: SlotStateType, { payload: flow }: PayloadAction<string>) => {
            state.gameState.flow = flow;
        },
        setNextFlow: (state: SlotStateType, { payload: nextFlow }: PayloadAction<string>) => {
            state.gameState.nextFlow = nextFlow;
        },
        setFsLeft: (state: SlotStateType, { payload: fsLeft }: PayloadAction<number>) => {
            state.gameState.fsLeft = fsLeft;
        },
        setFsWon: (state: SlotStateType, { payload: fsWon }: PayloadAction<number>) => {
            state.gameState.fsWon = fsWon;
        },
        setLines: (state: SlotStateType, { payload: selectedLines }: PayloadAction<number>) => {
            state.gameState.selectedLines = selectedLines;
        },
        setMaxBetPerLine: (state: SlotStateType, { payload: maxBetPerLine }: PayloadAction<number>) => {
            state.gameState.maxBetPerLine = maxBetPerLine;
        },
        setInit: (state: SlotStateType, { payload: init }: PayloadAction<Init>) => {
            state.init = init;
        },
        setGameState: (state: SlotStateType, { payload: newState }: PayloadAction<GameState>) => {
            state.gameState = {... newState};
        },
        setSpinResponse: (state: SlotStateType, { payload: response }: PayloadAction<SpinResponse>) => {
            state.response = response;
        },
        setOrientation: (state: SlotStateType, { payload: orientation }: PayloadAction<Orientation>) => {
            state.systemState.orientation = orientation;
        },
        setOrientationChanged: (state: SlotStateType) => {
            //TODO pitaj dal ovo moze? Treba mi nesto sto druge komponente mogu da gledaju i da znaju da je zavrsena
            //promena orijentacije kada je to pozvano?
        },
    }
});

export const slotReducer = slotSlice.reducer;
export const slotActions = slotSlice.actions;
