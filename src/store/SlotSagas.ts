import { put, retry } from "redux-saga/effects"
import { slotDataParser } from "./SlotDataParser";
import { slotActions } from "./SlotSlice";

export const initSlotStore = function*(): Generator {
    const data = yield retry(5, 2000, fetchInitialData);
    const initParsed = slotDataParser.parseInitData(data);
    yield put(slotActions.setInit(initParsed.init));
    yield put(slotActions.setGameState(initParsed.gameState));
}

async function fetchInitialData() {
    const response = await fetch("http://localhost:8000/init", { method: "GET" });
    if (!response.ok) throw new Error(`Not able to fetch initial data, status code: ${response.status}`);

    return response.json();
}
