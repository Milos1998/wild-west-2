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
        isSkipped: false,
        isSlamStopped: false,
        isSpinPressed: false,
    }
}

const slotSlice = createSlice({
    name: "slotSlice",
    initialState,
    reducers: {
        setGameState: (state: SlotStateType, { payload: gameState }: PayloadAction<GameState>) => {
            state.gameState = gameState;
        },
        setSelectedLines: (state: SlotStateType, { payload: selectedLines }: PayloadAction<number>) => {
            state.gameState.selectedLines = selectedLines;
        },
        setBetPerLine: (state: SlotStateType, { payload: betPerLine }: PayloadAction<number>) => {
            state.gameState.betPerLine = betPerLine;
        },
        setInit: (state: SlotStateType, { payload: init }: PayloadAction<Init>) => {
            state.init = init;
        },
        setSpinResponse: (state: SlotStateType, { payload: response }: PayloadAction<SpinResponse>) => {
            state.response = response;
        },
        setOrientation: (state: SlotStateType, { payload: orientation }: PayloadAction<Orientation>) => {
            state.systemState.orientation = orientation;
        },
        setIsRequestSuccessful: (state: SlotStateType, { payload: isRequestSuccessful }: PayloadAction<boolean>) => {
            state.systemState.isRequestSuccessful = isRequestSuccessful;
        },
        setIsSlamStopped: (state: SlotStateType, { payload: isSlamStopped }: PayloadAction<boolean>) => {
            state.systemState.isSlamStopped = isSlamStopped;
        },
        setIsSpinPressed: (state: SlotStateType, { payload: isSpinPressed }: PayloadAction<boolean>) => {
            state.systemState.isSpinPressed = isSpinPressed;
        },
        setIsSkipped: (state: SlotStateType, { payload: isSkipped }: PayloadAction<boolean>) => {
            state.systemState.isSkipped = isSkipped;
        },
        setOrientationChanged: (state: SlotStateType) => {
            //TODO pitaj dal ovo moze? Treba mi nesto sto druge komponente mogu da gledaju i da znaju da je zavrsena
            //promena orijentacije kada je to pozvano?
        },
    }
});

export const slotReducer = slotSlice.reducer;
export const slotActions = slotSlice.actions;
