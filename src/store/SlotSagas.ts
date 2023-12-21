import { put, retry } from "redux-saga/effects"
import { slotDataParser } from "./SlotDataParser";
import { slotActions } from "./SlotSlice";
import { slotState } from "./Store";
import { uiActions } from "../components/ui/uiStore/UiSlice";

export const initStoreData = function*(): Generator {
    const data = yield retry(5, 2000, fetchInitialData);
    const initParsed = slotDataParser.parseInitData(data);
    yield put(slotActions.setInit(initParsed.init));
    yield put(slotActions.setGameState(initParsed.gameState));
    yield put(uiActions.setBalance(initParsed.gameState.balance));
    yield put(uiActions.setBetPerLine(initParsed.gameState.betPerLine));
    yield put(uiActions.setFsLeft(initParsed.gameState.fsLeft));
    yield put(uiActions.setFsWon(initParsed.gameState.fsWon));
    yield put(uiActions.setMaxBetPerLine(initParsed.gameState.maxBetPerLine));
    yield put(uiActions.setMaxSelectedLines(initParsed.gameState.maxSelectedLines));
    yield put(uiActions.setSelectedLines(initParsed.gameState.selectedLines));
    yield put(uiActions.setWin(initParsed.gameState.win));
}

async function fetchInitialData() {
    const response = await fetch("http://localhost:8000/init", { method: "GET" });
    if (!response.ok) throw new Error(`Not able to fetch initial data, status code: ${response.status}`);

    return response.json();
}

export const sendSpinRequest = function*(): Generator {
    try {
        const data = yield retry(5, 2000, fetchSpinOutcome);
        const spinResponseParsed = slotDataParser.parseSpinData(data);
        yield put(slotActions.setSpinResponse(spinResponseParsed));
        yield put(slotActions.setGameState(spinResponseParsed.gameState));
        yield put(slotActions.setIsRequestSuccessful(true));
    } catch {
        yield put(slotActions.setIsRequestSuccessful(false));
    }
}

async function fetchSpinOutcome() {
    const response = await fetch("http://localhost:8000/spin", {
        method: "POST",
        body: JSON.stringify({
            betPerLine: slotState().gameState.betPerLine,
            lines: slotState().gameState.selectedLines,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) throw new Error(`Not able to fetch spin outcome, status code: ${response.status}`);

    return response.json();
}
