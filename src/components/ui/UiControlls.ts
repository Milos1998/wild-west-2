import { CallEffect } from "redux-saga/effects";
import { BaseControlls } from "../BaseControlls";
import { UiComponent, UiElementId, UiSpinButtonId } from "./UiComponent";

export class UiControlls extends BaseControlls {
    private uiComponent: UiComponent;

    constructor(uiComponent: UiComponent) {
        super();
        this.uiComponent = uiComponent;
    }

    public toggleAllButtonsAndSteppers(visible: boolean): Generator<CallEffect<unknown>, void, unknown> {
        return this.wrapInGenerator(this.uiComponent, this.uiComponent.toggleAllButtonsAndSteppers, visible)();
    };

    public displayUi(visible: boolean): Generator<CallEffect<unknown>, void, unknown> {
        return this.wrapInGenerator(this.uiComponent, this.uiComponent.displayUi, visible)();
    };

    public displayElements(elementIds: UiElementId[]): Generator<CallEffect<unknown>, void, unknown> {
        return this.wrapInGenerator(this.uiComponent, this.uiComponent.displayElements, elementIds)();
    };

    public setSpinButton(buttonId: UiSpinButtonId, enabled: boolean): Generator<CallEffect<unknown>, void, unknown> {
        return this.wrapInGenerator(this.uiComponent, this.uiComponent.setSpinButton, buttonId, enabled)();
    };
}
