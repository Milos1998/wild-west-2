import { put, retry } from "redux-saga/effects"
import { slotDataParser } from "./SlotDataParser";
import { slotActions } from "./SlotSlice";
import { slotState } from "./Store";
import { reelSetActions } from "../components/reelSet/reelSetStore/ReelSetSlice";

export const initSlotStore = function*(): Generator {
    const data = yield retry(5, 2000, fetchInitialData);
    const initParsed = slotDataParser.parseInitData(data);
    yield put(slotActions.setInit(initParsed.init));
    yield put(slotActions.setBalance(initParsed.gameState.balance));
    yield put(slotActions.setBetPerLine(initParsed.gameState.betPerLine));
    yield put(slotActions.setFlow(initParsed.gameState.flow));
    yield put(slotActions.setFsLeft(initParsed.gameState.fsLeft));
    yield put(slotActions.setFsWon(initParsed.gameState.fsWon));
    yield put(slotActions.setMaxBetPerLine(initParsed.gameState.maxBetPerLine));
    yield put(slotActions.setNextFlow(initParsed.gameState.nextFlow));
    yield put(slotActions.setSelectedLines(initParsed.gameState.selectedLines));
    yield put(slotActions.setWin(initParsed.gameState.win));
    yield put(slotActions.setMaxSelectedLines(initParsed.init.lines.length));
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
        yield put(slotActions.setFlow(spinResponseParsed.gameState.flow));
        yield put(slotActions.setNextFlow(spinResponseParsed.gameState.nextFlow));
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
    });
    if (!response.ok) throw new Error(`Not able to fetch spin outcome, status code: ${response.status}`);

    return response.json();
}
