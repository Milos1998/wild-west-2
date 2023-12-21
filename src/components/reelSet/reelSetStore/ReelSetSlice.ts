import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReelSetStateType } from "./ReelSetTypes";
import { Image } from "../../../store/SlotTypes";

const initialState: ReelSetStateType = {
    reelImage: [],
    isReadyToStop: true,
}

const reelSetSlice = createSlice({
    name: "reelSetSlice",
    initialState,
    reducers: {
        setReelImage: (state: ReelSetStateType, { payload: reelImage }: PayloadAction<Image>) => {
            state.reelImage = reelImage;
        },
        setIsReadyToStop: (state: ReelSetStateType, { payload: isReadyToStop }: PayloadAction<boolean>) => {
            state.isReadyToStop = isReadyToStop;
        }
    }
});

export const reelSetReducer = reelSetSlice.reducer;
export const reelSetActions = reelSetSlice.actions;
