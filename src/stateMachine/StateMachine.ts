import { call } from "redux-saga/effects";
import { GeneralGameFlow } from "../gameFlows/GeneralGameFlow";
import { store } from "../store/Store";

type GameFlowState = "onBeforeDisplay" | "onBeforeRequest" | "onMakeRequest" | "onBadRequest" | "onSuccessfulResponse" | "onChangeFlow" | "onReturnToFlow" | "onDisplayAward";

/**
 * Executes game flow
 */
class StateMachine {
    private flows: Map<string, GeneralGameFlow> = new Map();

    private asyncFlows: any[] = [];

    private runningFlow!: GeneralGameFlow;

    private currentState: GameFlowState = "onBeforeDisplay";

    public registerFlow(name: string, flow: GeneralGameFlow) {
        this.flows.set(name, flow);
    }

    private getNextInstruction() {
        if (this.currentState === "onBeforeDisplay") {
            this.currentState = "onBeforeDisplay";
            return this.runningFlow.onBeforeRequest;
        } else if (this.currentState === "onBeforeRequest") {
            this.currentState = "onMakeRequest";
            return this.runningFlow.onMakeRequest;
        } else if (this.currentState === "onMakeRequest") {
            const { isRequestSuccessful } = store.getState().slotReducer.systemState;
            if (isRequestSuccessful) {
                this.currentState = "onSuccessfulResponse";
                return this.runningFlow.onSuccessfulResponse;
            }
            this.currentState = "onBadRequest";
            return this.runningFlow.onBadRequest;
        } else if (this.currentState === "onSuccessfulResponse") {
            const { flow, nextFlow } = store.getState().slotReducer.gameState;
            if (flow === nextFlow) {
                this.currentState = "onDisplayAward";
                return this.runningFlow.onDisplayAward;
            }
            this.currentState = "onChangeFlow";
            return this.runningFlow.onChangeFlow;
        } else if (this.currentState === "onDisplayAward") {
            this.currentState = "onBeforeRequest";
            return this.runningFlow.onBeforeRequest;
        } else if (this.currentState === "onChangeFlow") {
            this.currentState = "onReturnToFlow";
            this.runningFlow = this.getNextFlow();
            return this.runningFlow.onReturnToFlow;
        } else if (this.currentState === "onReturnToFlow") {
            this.currentState = "onBeforeRequest";
            return this.runningFlow.onBeforeRequest;
        }

        return this.runningFlow.onError;
    }

    private getCurrentFlow(): GeneralGameFlow {
        const currentFlow = store.getState().slotReducer.gameState.flow;
        const gameFlow = this.flows.get(currentFlow);
        if (gameFlow === undefined) throw new Error(`Game flow "${currentFlow}" is not registered`);
        return gameFlow;
    }

    private getNextFlow(): GeneralGameFlow {
        const nextFlow = store.getState().slotReducer.gameState.nextFlow;
        const gameFlow = this.flows.get(nextFlow);
        if (gameFlow === undefined) throw new Error(`Game flow "${nextFlow}" is not registered`);
        return gameFlow;
    }

    * runGameFlow() {
        this.runningFlow = this.getCurrentFlow();
        let instruction = this.runningFlow.onBeforeDisplay;
        yield call(instruction)

        //remove splash here

        while (true) {
            instruction = this.getNextInstruction();
            yield call(instruction)    
        }
    }

    public addAsyncFlow(flow: any) {
        this.asyncFlows.push(flow);
    }
}

export const stateMachine = new StateMachine();
