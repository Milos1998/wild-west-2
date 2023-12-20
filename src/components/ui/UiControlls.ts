import { CallEffect } from "redux-saga/effects";
import { BaseControlls } from "../BaseControlls";
import { UiComponent } from "./UiComponent";

export class UiControlls extends BaseControlls {
    private uiComponent: UiComponent;
    constructor(uiComponent: UiComponent) {
        super();
        this.uiComponent = uiComponent;
    }

    public toggleAllButtonsAndSteppers(visible: boolean): Generator<CallEffect<unknown>, void, unknown> {
        return this.wrapInGenerator(this.uiComponent, this.uiComponent.toggleAllButtonsAndSteppers, visible)();
    };
}
