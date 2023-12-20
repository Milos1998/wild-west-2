import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReelSetStateType } from "./ReelSetTypes";
import { Image } from "../../../store/SlotTypes";

const initialState: ReelSetStateType = {
    perviousReelImage: [],
}

const reelSetSlice = createSlice({
    name: "reelSetSlice",
    initialState,
    reducers: {
        setInitialState: (state: ReelSetStateType, { payload: reelImage }: PayloadAction<Image>) => {
            state.perviousReelImage = reelImage;
        },
    }
});

export const reelSetReducer = reelSetSlice.reducer;
export const reelSetActions = reelSetSlice.actions;
