import { Cell, GameState, Image, Init, Line, PaytableItem, SpinResponse, Symbol, WinLine } from "./SlotTypes";

class SlotDataParser {
    public parseInitData(data: any): { init: Init, gameState: GameState} {
        const gameState = this.parseGameState(data.gameState);
        const image = this.parseImage(data.image);
        const lines: Line[] = [];
        for (let i = 0; i < data.lines.length; i++) {
            lines.push(data.lines[i]);
        }
        const paytable: PaytableItem[] = [];
        for (let i = 0; i < data.paytable.length; i++) {
            paytable.push(data.paytable[i]);
        }
    
        return {
            gameState,
            init: {
                image,
                lines,
                paytable,
            },
        }
    }

    public parseSpinData(data: any): SpinResponse {
        const gameState = this.parseGameState(data.gameState);
        const reelImage = this.parseImage(data.image);
        const highlight = this.parseHighlight(data.highlight);

        return {
            gameState,
            reelImage,
            highlight,
        }
    }

    private parseGameState(gameStateData: any) {
        const gameState = new GameState();
    
        gameState.balance = gameStateData.balance;
        gameState.betPerLine = gameStateData.betPerLine;
        gameState.flow = gameStateData.flow;
        gameState.fsLeft = gameStateData.fsLeft;
        gameState.fsWon = gameStateData.fsWon;
        gameState.selectedLines = gameStateData.selectedLines;
        gameState.maxBetPerLine = gameStateData.maxBetPerLine;
        gameState.nextFlow = gameStateData.nextFlow;
        gameState.win = gameStateData.win;
    
        return gameState;
    }
    
    private parseImage(imageData: any) {
        const image: Image = [];
    
        for (let i = 0; i < imageData.length; i++) {
            const reel: Cell[] = [];
            for (let j = 0; j < imageData[i].length; j++) {
                reel.push(this.makeCell(imageData[i][j]));
            }
            image.push(reel);
        }

        return image;
    }

    private parseHighlight(highlightData: any): WinLine[] {
        const highlight: WinLine[] = [];
    
        for (let i = 0; i < highlightData.length; i++) {
            const winCells: Cell[] = [];
            for (let j = 0; j < highlightData[i].winCells.length; j++) {
                winCells.push(this.makeCell(highlightData[i].winCells[j]));
            }
            highlight.push({
                payout: highlightData[i].payout,
                winSymbol: highlightData[i].winSymbol,
                winCells
            })
        }

        return highlight;
    }

    private makeCell(cellData: any): Cell {
        const position = { reel: cellData.position.reel, cell: cellData.position.cell };
        const symbol: Symbol = this.parseSymbol(cellData.symbol);
        return {
            position,
            symbol,
        }
    }

    private parseSymbol(symbolData: string): Symbol {
        switch (symbolData) {
            case "10":
                return "10";
            case "9":
                return "9";
            case "A":
                return "A";
            case "J":
                return "J";
            case "K":
                return "K";
            case "Q":
                return "Q";
            case "clubs":
                return "clubs";
            case "diamonds":
                return "diamonds";
            case "hearts":
                return "hearts";
            case "reward1000":
                return "reward1000";
            case "sherif":
                return "sherif";
            case "spades":
                return "spades";
            case "wild":
                return "wild";
            default:
                throw new Error(`Symbol: ${symbolData} is not recognized`);
        }
    }
}

export const slotDataParser = new SlotDataParser();
