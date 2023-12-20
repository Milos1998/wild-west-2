import { Sprite } from "pixi.js";
import { BaseComponent } from "../BaseComponent";

export class Button extends BaseComponent {
    protected spriteEnabled: Sprite | null;

    protected spriteOver: Sprite | null;

    protected spriteDisabled: Sprite | null;

    private _enabled: boolean = false;

    private onAction: any;

    constructor(layoutId: string) {
        super(layoutId);

        this.container.interactive = false;

        this.spriteEnabled = this.container.getChildByName(`${this.name}_enabled`) as Sprite;
        this.spriteOver = this.container.getChildByName(`${this.name}_over`) as Sprite;
        this.spriteDisabled = this.container.getChildByName(`${this.name}_disabled`) as Sprite;

        this.container.on("pointerenter", this.onOver, this);
        this.container.on("pointerdown", this.onClick, this);
        this.container.on("pointerleave", this.onLeave, this);
    }

    protected onOver() {
        if (this._enabled) {
            this.setActiveSprite(this.spriteOver);
        }
    }

    protected onLeave() {
        if (this._enabled) {
            this.setActiveSprite(this.spriteEnabled);
        }
    }

    protected onClick() {
        if (this._enabled) {
            this.onAction();
        }
    }

    public set enabled(enabled: boolean) {
        this._enabled = enabled;
        this.container.interactive = enabled;
        this.setActiveSprite(this.spriteDisabled);
    }

    public get enabled () {
        return this._enabled;
    }

    private setActiveSprite(sprite: Sprite | null) {
        if (sprite === null) return;
        if (this.spriteOver) this.spriteOver.visible = this.spriteOver.name === sprite.name;
        if (this.spriteEnabled) this.spriteEnabled.visible = this.spriteEnabled.name === sprite.name;
        if (this.spriteDisabled) this.spriteDisabled.visible = this.spriteDisabled.name === sprite.name;
    }

    public setOnAction(action: any) {
        this.onAction = action;
    }
}
