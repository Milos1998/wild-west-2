import { put, spawn } from "redux-saga/effects";
import { sagaMiddleware } from "../../store/Store";
import { BaseComponent } from "../BaseComponent";
import { Button } from "../button/Button";
import { BPLStepingMeterComponent } from "./BPLStepingMeterComponent";
import { BalanceMeterComponent } from "./BalanceMeterComponent";
import { BetMeterComponent } from "./BetMeterComponent";
import { FreeSpinsMeterComponent } from "./FreeSpinsMeterComponent";
import { LinesStepingMeterComponent } from "./LinesStepingMeterComponent";
import { WinMeterComponent } from "./WinMeterComponent";
import { BaseStepingMeterComponent } from "./baseComponents/BaseStepingMeterComponent";
import { slotActions } from "../../store/SlotSlice";
import { BaseMeterComponent } from "./baseComponents/BaseMeterComponent";

export type UiSpinButtonId =  "SPIN" | "SKIP" | "SLAM_STOP";

type UiStepperId = "LINES" | "BET_PER_LINE";

type UiMeters = "WIN" | "BALANCE" | "TOTAL_BET" | "FREE_SPINS";

export type UiElementId = UiSpinButtonId | UiMeters | UiStepperId  | "AUTO_SPIN";

export class UiComponent extends BaseComponent {
    private allButtons: Map<UiSpinButtonId, Button>;

    private allSteppers: Map<UiStepperId, BaseStepingMeterComponent>;

    private allElements: Map<UiElementId, BaseComponent>;

    constructor(layoutId: string) {
        super(layoutId);

        this.allButtons = new Map();
        this.allElements = new Map();
        this.allSteppers = new Map();

        const spinButton = new Button("spinButton");
        this.allButtons.set("SPIN", spinButton);
        this.allElements.set("SPIN", spinButton);

        const skipButton = new Button("skipButton");
        this.allButtons.set("SKIP", skipButton);
        this.allElements.set("SKIP", skipButton);

        const slamStopButton = new Button("slamStopButton");
        this.allButtons.set("SLAM_STOP", slamStopButton);
        this.allElements.set("SLAM_STOP", slamStopButton);

        const autoSpinButton = new Button("autoSpinButton")
        this.allElements.set("AUTO_SPIN", autoSpinButton);

        const linesMeter = new LinesStepingMeterComponent("linesMeter")
        this.allSteppers.set("LINES", linesMeter);
        this.allElements.set("LINES", linesMeter);

        const betPerLineMeter = new BPLStepingMeterComponent("betPerLineMeter")
        this.allSteppers.set("BET_PER_LINE", betPerLineMeter);
        this.allElements.set("BET_PER_LINE", betPerLineMeter);

        const winMeter = new WinMeterComponent("winMeter");
        this.allElements.set("WIN", winMeter);

        const balanceMeter = new BalanceMeterComponent("balanceMeter");
        this.allElements.set("BALANCE", balanceMeter);

        const totalBetMeter = new BetMeterComponent("totalBetMeter");
        this.allElements.set("TOTAL_BET", totalBetMeter);

        const freeSpinsMeter = new FreeSpinsMeterComponent("freeSpinsMeter");
        this.allElements.set("FREE_SPINS", freeSpinsMeter);

        this.setSpinButtonsActions();
        this.setMetersReactions();
    }

    public toggleAllButtonsAndSteppers(enabled: boolean) {
        this.allButtons.forEach((button) => {
            button.enabled = enabled && button.visible;
        });
        this.allSteppers.forEach((stepper) => {
            stepper.setEnabled(enabled && stepper.visible);
        });
    }

    public setSpinButton(buttonId: UiSpinButtonId, enabled: boolean) {
        this.allButtons.forEach((button, id) => {
            if (id === buttonId) {
                button.enabled = enabled;
                button.visible = true
            } else {
                button.enabled = false;
                button.visible = false;
            }
        });
    }

    public displayElements(elementIds: UiElementId[]) {
        this.allElements.forEach((uiElement, elementId) => {
            uiElement.visible = elementIds.includes(elementId);
        });
    }

    public displayUi(display: boolean) {
        this.container.visible = display;
    }

    private setSpinButtonsActions() {
        const spinButton = this.allButtons.get("SPIN");
        if (spinButton) {
            spinButton.setOnAction(() => {
                sagaMiddleware.run(function* () {
                    yield put(slotActions.setIsSpinPressed(true));
                    spinButton.enabled = false;
                });
            })
        }

        const slamStopButton = this.allButtons.get("SLAM_STOP");
        if (slamStopButton) {
            slamStopButton.setOnAction(() => {
                sagaMiddleware.run(function* () {
                    yield put(slotActions.setIsSlamStopped(true));
                    slamStopButton.enabled = false;
                });
            })
        }

        const skipButton = this.allButtons.get("SKIP");
        if (skipButton) {
            skipButton.setOnAction(() => {
                sagaMiddleware.run(function* () {
                    yield put(slotActions.setIsSkipped(true));
                    skipButton.enabled = false;
                });
            })
        }
    }

    private setMetersReactions() {
        this.allElements.forEach((element) => {
            if (element instanceof BaseMeterComponent) {
                sagaMiddleware.run(function* () {
                    yield spawn([element, element.setReactions]);
                });
            }
        })
    }
}
