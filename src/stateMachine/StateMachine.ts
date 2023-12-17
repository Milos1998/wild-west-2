import { GeneralGameFlow } from "../gameFlows/GeneralGameFlow";

/**
 * Executes game flow
 */
class StateMachine {
    private flows: Map<string, GeneralGameFlow> = new Map();

    private queue: {flow: GeneralGameFlow, state: string}[] = [];

    private asyncFlows: any[] = [];

    public registerFlow(name: string, flow: GeneralGameFlow) {
        this.flows.set(name, flow);
    }

    private getNextInstruction() {

    }

    * runGameFlow() {
        //init queue
        while (true) {

        }
    }

    public addAsyncFlow(flow: any) {
        this.asyncFlows.push(flow);
    }
}

export const stateMachine = new StateMachine();
