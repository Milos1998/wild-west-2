import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReelSetStateType } from "./ReelSetTypes";
import { Image } from "../../../store/SlotTypes";

const initialState: ReelSetStateType = {
    perviousReelImage: [],
    isReadyToStop: true,
}

const reelSetSlice = createSlice({
    name: "reelSetSlice",
    initialState,
    reducers: {
        setInitialState: (state: ReelSetStateType, { payload: reelImage }: PayloadAction<Image>) => {
            state.perviousReelImage = reelImage;
        },
        setIsReadyToStop: (state: ReelSetStateType, { payload: isReadyToStop }: PayloadAction<boolean>) => {
            state.isReadyToStop = isReadyToStop;
        }
    }
});

export const reelSetReducer = reelSetSlice.reducer;
export const reelSetActions = reelSetSlice.actions;
