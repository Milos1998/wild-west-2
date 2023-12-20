import { Button } from "../../button/Button";
import { BaseMeterComponent } from "./BaseMeterComponent";

export class BaseStepingMeterComponent extends BaseMeterComponent {
    protected incrementButton: Button;

    protected wasIncrementEnabled: boolean = false;

    protected decrementButton: Button;

    protected wasDecrementEnabled: boolean = false;

    protected enabled: boolean = false;

    constructor(layoutId: string) {
        super(layoutId);

        this.incrementButton = new Button(`${this.name}_increment`);
        this.incrementButton.setOnAction = this.increment.bind(this);
        this.decrementButton = new Button(`${this.name}_decrement`);
        this.decrementButton.setOnAction = this.decrement.bind(this);
    }

    protected increment() {}

    protected decrement() {}

    public setEnabled(enabled: boolean) {
        if (enabled) {
            this.incrementButton.enabled = this.wasIncrementEnabled;
            this.decrementButton.enabled = this.wasDecrementEnabled;
        } else {
            this.incrementButton.enabled = false;
            this.decrementButton.enabled = false;
        }
    }
}
