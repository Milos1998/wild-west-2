import { Orientation } from "../config/SceneConfig";

export type SlotStateType = {
    gameState: GameState,
    response: SpinResponse,
    init: Init,
    systemState: SystemState
}

type SystemState = {
    orientation: Orientation,
    isRequestSuccessful: boolean;
    isSlamStopped: boolean;
    isSpinPressed: boolean;
    isSkipped: boolean;
}

export class GameState {
    balance: number = 1000;
    win: number = 0;
    flow: string = "";
    nextFlow: string = "";
    betPerLine: number = 1;
    maxBetPerLine: number = 10;
    selectedLines: number = 0;
    maxSelectedLines: number = 0;
    fsWon: number = 0;
    fsLeft: number = 0;
}

export type SpinResponse = {
    reelImage: Image,
    highlight: WinLine[],
    gameState: GameState,
}

export type Init = {
    image: Image,
    lines: Line[],
    paytable: PaytableItem[]
}

export type PaytableItem = {
    symbol: Symbol,
    payoutPerMatch: number[],
}

export type Line = {
    lineGroup: number,
    winPositions: number[];
}

export type Image = Cell[][];

export type Cell = {
    position: {
        reel: number;
        cell: number;
    },
    symbol: Symbol;
}

export type WinLine = {
    winSymbol: Symbol;
    winCells: Cell[];
    payout: number;
}

export type Symbol = "wild" | "sherif" | "reward1000" | "diamonds" | "hearts" | "spades" | "clubs" | "A" | "K" | "Q" | "J" | "10" | "9";
