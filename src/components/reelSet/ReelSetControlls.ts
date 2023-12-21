import { CallEffect } from "redux-saga/effects";
import { BaseControlls } from "../BaseControlls";
import { ReelSetComponent } from "./ReelSetComponent";

/**
 * Reel set components controlls
 */
export class ReelSetControlls extends BaseControlls {
    private reelSet: ReelSetComponent;

    constructor(reelSet: ReelSetComponent) {
        super();
        this.reelSet = reelSet;
    }

    public startSpin(): Generator<CallEffect<unknown>, void, unknown> {
        return this.wrapInGenerator(this.reelSet, this.reelSet.startSpin)();
    };

    public stopSpin(): Generator<CallEffect<unknown>, void, unknown> {
        return this.wrapInGenerator(this.reelSet, this.reelSet.stopSpin)();
    };
}
