import { call, retry } from "redux-saga/effects"
import { slotDataParser } from "./SlotDataParser";
import { slotActions } from "./SlotSlice";

export const initSlotStore = function*() {
    //don't work, don't know why
    // const data = yield retry(5, 2000, fetchInitialData);
    const data = call(fetchInitialData);
    const initParsed = slotDataParser.parseInitData(data);
    slotActions.setInit(initParsed.init);
    slotActions.setGameState(initParsed.gameState);
}

async function fetchInitialData(): Promise<any> {
    const response = await fetch("http://localhost:8000/init", { method: "GET" });
    if (!response.ok) throw new Error(`Not able to fetch initial data, status code: ${response.status}`);

    return response.json();
}
