import { Cell, GameState, Image, Init, Line, PaytableItem } from "./SlotTypes";

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
                paytable
            },
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
                reel.push(imageData[i][j]);
            }
            image.push(reel);
        }
    
        return image;
    }    
}

export const slotDataParser = new SlotDataParser();
