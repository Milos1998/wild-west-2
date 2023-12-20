import { CallEffect, call } from "redux-saga/effects"
import { BaseComponent } from "./BaseComponent";

/**
 * Template for component's controlls. These controlls can be called from game flows.
 */
export abstract class BaseControlls {

    /**
     * wraping functions with generator to enable calling race(...) or all(...) from game flows
     */
    protected wrapInGenerator(context: BaseComponent, method: any, ...args: any): () => Generator<CallEffect<unknown>, void, unknown> {
        return function* () {
            yield call([context, method], ...args);
        }
    }
}
