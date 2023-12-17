import { Orientation } from "../config/SceneConfig";

export type SlotStateType = {
    gameState: GameState,
    response: SpinResponse,
    init: Init,
    systemState: SystemState
}

type SystemState = {
    initializationStep: InitializationStepType,
    orientation: Orientation,
    orientationChangeStep: OrientationChangeStepType;
}

export type InitializationStepType = "splash" | "asset loading" | "layout building" | "component init" | "finished";

export type OrientationChangeStepType = "pre change" | "changing" | "finished";

export class GameState {
    balance: number = 1000;
    win: number = 0;
    flow: string = "";
    nextFlow: string = "";
    betPerLine: number = 1;
    maxBetPerLine: number = 10;
    lines: number = 0;
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
    gameState: GameState,
    lines: Line[],
    paytable: PaytableItem[]
}

type PaytableItem = {
    symbol: Symbol,
    payoutPerMatch: number[],
}

type Line = {
    lineGroup: number,
    winPositions: number[];
}

type Image = Cell[][];

type Cell = {
    position: {
        reel: number;
        cell: number;
    },
    symbol: Symbol;
}

type WinLine = {
    winSymbol: Symbol;
    winCells: Cell[];
    payout: number;
}
