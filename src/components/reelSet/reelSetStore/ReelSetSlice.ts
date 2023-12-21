import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReelSetStateType } from "./ReelSetTypes";
import { Cell, Image } from "../../../store/SlotTypes";

const initialState: ReelSetStateType = {
    reelImage: [],
    isReadyToStop: false,
}

const reelSetSlice = createSlice({
    name: "reelSetSlice",
    initialState,
    reducers: {
        setReelImage: (state: ReelSetStateType, { payload: reelImage }: PayloadAction<Image>) => {
            const imageCopy: Image = [];

            reelImage.forEach((reel) => {
                const reelCopy: Cell[] = [];
                for (const cell of reel) {
                    reelCopy.push({
                        position: { cell: cell.position.cell, reel: cell.position.reel },
                        symbol: cell.symbol
                    })
                }
                imageCopy.push(reelCopy);
            })
            state.reelImage = imageCopy;
        },
        setIsReadyToStop: (state: ReelSetStateType, { payload: isReadyToStop }: PayloadAction<boolean>) => {
            state.isReadyToStop = isReadyToStop;
        }
    }
});

export const reelSetReducer = reelSetSlice.reducer;
export const reelSetActions = reelSetSlice.actions;
