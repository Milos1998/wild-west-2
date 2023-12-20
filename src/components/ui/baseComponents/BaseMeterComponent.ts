import { Text } from "pixi.js";
import { BaseComponent } from "../../BaseComponent";

export class BaseMeterComponent extends BaseComponent {
    protected valueLabel: Text;

    constructor(layoutId: string) {
        super(layoutId);

        this.valueLabel = this.container.getChildByName(`${this.name}_value`) as Text;
        if (!this.valueLabel) throw new Error(`Value label ${this.name}_value does not exist on meter component`);
        this.setReactions();
    }

    protected setValue() {}

    protected setReactions() {}
}
