import { Assets, Texture } from "pixi.js"
import { Orientation } from "./SceneConfig"
import { messages } from "./MessageConfig"

export type Position = {
    x: number,
    y: number,
}

export type Scale = {
    x: number,
    y: number,
}

export type Anchor = {
    x: number,
    y: number,
}

export abstract class LayoutNode {
    name: string = "";
    position: Position = { x: 0, y: 0 };
    scale: Scale = { x: 1, y: 1 };
    alpha: number = 1;
    visible: boolean = true;
    orientation: Orientation = Orientation.Landscape;
    children: string[] = [];
}

export class ContainerNode extends LayoutNode {}

export class SpriteNode extends LayoutNode {
    anchor: Anchor = { x: 0, y: 0 };
    texture: Texture = Texture.WHITE;
}

export class TextNode extends LayoutNode {
    anchor: Anchor = { x: 0, y: 0 };
    text: string = "";
    fontSize: number = 16;
}

export interface LayoutConfigNode {
    type: "sprite" | "text" | "container",
    name: string,
    parent?: LayoutConfigNode | undefined,
    children?: LayoutConfigNode[],
    position?: Position,
    scale?: Scale,
    alpha?: number,
    anchor?: Anchor,
    text?: string,
    fontSize?: number,
    texture?: string,
    visible?: boolean,
}

const landscapeConfigTree: LayoutConfigNode = {
    name: "game",
    type: "container",
    children: [
        {
            name: "backgroundContainer",
            type: "container",
            children: [
                {
                    name: "baseBgLand",
                    type: "sprite",
                    texture: "baseBgLand",
                },
                {
                    name: "bonusBgLand",
                    type: "sprite",
                    texture: "bonusBgLand",
                    visible: false,
                },
            ],
        }, {
            name: "reels",
            type: "container",
            position: { x: 700, y: 500 },
            scale: { x: 1, y: 1 },
            children: [
                {
                    name: "reel0",
                    type: "sprite",
                    texture: "reelBg",
                    position: { x: 0, y: 0 },
                },
                {
                    name: "reel1",
                    type: "sprite",
                    texture: "reelBg",
                    position: { x: 117, y: 0 },
                },
                {
                    name: "reel2",
                    type: "sprite",
                    texture: "reelBg",
                    position: { x: 234, y: 0 },
                },
                {
                    name: "reel3",
                    type: "sprite",
                    texture: "reelBg",
                    position: { x: 351, y: 0 },
                },
                {
                    name: "reel4",
                    type: "sprite",
                    texture: "reelBg",
                    position: { x: 468, y: 0 },
                },
            ],
        }, {
            name: "ui",
            type: "container",
            position: { x: 1000, y: 700 },
            children: [
                {
                    name: "spinButton",
                    type: "container",
                    children: [
                        {
                            name: "spinButton_enabled",
                            type: "sprite",
                            anchor: { x: 0.5, y: 0.5 },
                            position: { x: 70, y: 70 },
                        },
                        {
                            name: "spinButton_over",
                            type: "sprite",
                            anchor: { x: 0.5, y: 0.5 },
                            position: { x: 70, y: 70 },
                        },
                        {
                            name: "spinButton_disabled",
                            type: "sprite",
                            anchor: { x: 0.5, y: 0.5 },
                            position: { x: 70, y: 70 },
                        },
                    ]
                },
                {
                    name: "skipButton",
                    type: "container",
                    children: [
                        {
                            name: "skipButton_enabled",
                            type: "sprite",
                            anchor: { x: 0.5, y: 0.5 },
                            position: { x: 70, y: 70 },
                        },
                        {
                            name: "skipButton_over",
                            type: "sprite",
                            anchor: { x: 0.5, y: 0.5 },
                            position: { x: 70, y: 70 },
                        },
                        {
                            name: "skipButton_disabled",
                            type: "sprite",
                            anchor: { x: 0.5, y: 0.5 },
                            position: { x: 70, y: 70 },
                        },
                    ]
                },
                {
                    name: "slamStopButton",
                    type: "container",
                    children: [
                        {
                            name: "slamStopButton_enabled",
                            type: "sprite",
                            anchor: { x: 0.5, y: 0.5 },
                            position: { x: 70, y: 70 },
                        },
                        {
                            name: "slamStopButton_over",
                            type: "sprite",
                            anchor: { x: 0.5, y: 0.5 },
                            position: { x: 70, y: 70 },
                        },
                        {
                            name: "slamStopButton_disabled",
                            type: "sprite",
                            anchor: { x: 0.5, y: 0.5 },
                            position: { x: 70, y: 70 },
                        },
                    ]
                },
                {
                    name: "autoSpinButton",
                    type: "container",
                    children: [
                        {
                            name: "autoSpinButton_enabled",
                            type: "sprite",
                            anchor: { x: 0.5, y: 0.5 },
                            position: { x: 70, y: 70 },
                        },
                        {
                            name: "autoSpinButton_over",
                            type: "sprite",
                            anchor: { x: 0.5, y: 0.5 },
                            position: { x: 70, y: 70 },
                        },
                        {
                            name: "autoSpinButton_disabled",
                            type: "sprite",
                            anchor: { x: 0.5, y: 0.5 },
                            position: { x: 70, y: 70 },
                        },
                    ]
                },
                {
                    name: "linesMeter",
                    type: "sprite",
                    texture: "uiBg",
                    children: [
                        {
                            name: "linesMeter_label",
                            type: "text",
                            anchor: { x: 0.5, y: 0.5 },
                            fontSize: 20,
                            position: { x: 125, y: 80 },
                            text: messages.linesMeter_label,
                        },
                        {
                            name: "linesMeter_value",
                            type: "text",
                            anchor: { x: 0.5, y: 0.5 },
                            fontSize: 30,
                            position: { x: 125, y: 40 },
                            text: "value text",
                        },
                        {
                            name: "linesMeter_increment",
                            type: "container",
                            children: [
                                {
                                    name: "linesMeter_increment_enabled",
                                    type: "sprite",
                                    anchor: { x: 1, y: 0.5 },
                                    position: { x: 245, y: 50 },
                                    texture: "increment_enabled",    
                                },
                                {
                                    name: "linesMeter_increment_disabled",
                                    type: "sprite",
                                    anchor: { x: 1, y: 0.5 },
                                    position: { x: 245, y: 50 },
                                    texture: "increment_disabled",    
                                },
                            ],
                        },
                        {
                            name: "linesMeter_decrement",
                            type: "container",
                            children: [
                                {
                                    name: "linesMeter_decrement_enabled",
                                    type: "sprite",
                                    anchor: { x: 0, y: 0.5 },
                                    position: { x: 5, y: 50 },
                                    texture: "increment_enabled",    
                                },
                                {
                                    name: "linesMeter_decrement_disabled",
                                    type: "sprite",
                                    anchor: { x: 0, y: 0.5 },
                                    position: { x: 5, y: 50 },
                                    texture: "increment_disabled",    
                                },
                            ],
                        },
                    ]
                },
                {
                    name: "betPerLineMeter",
                    type: "sprite",
                    texture: "uiBg",
                    children: [
                        {
                            name: "betPerLineMeter_label",
                            type: "text",
                            anchor: { x: 0.5, y: 0.5 },
                            fontSize: 20,
                            position: { x: 125, y: 80 },
                            text: messages.betPerLineMeter_label,
                        },
                        {
                            name: "betPerLineMeter_value",
                            type: "text",
                            anchor: { x: 0.5, y: 0.5 },
                            fontSize: 30,
                            position: { x: 125, y: 40 },
                            text: "value text",
                        },
                        {
                            name: "betPerLineMeter_increment",
                            type: "container",
                            children: [
                                {
                                    name: "betPerLineMeter_increment_enabled",
                                    type: "sprite",
                                    anchor: { x: 1, y: 0.5 },
                                    position: { x: 245, y: 50 },
                                    texture: "increment_enabled",    
                                },
                                {
                                    name: "betPerLineMeter_increment_disabled",
                                    type: "sprite",
                                    anchor: { x: 1, y: 0.5 },
                                    position: { x: 245, y: 50 },
                                    texture: "increment_disabled",    
                                },
                            ],
                        },
                        {
                            name: "betPerLineMeter_decrement",
                            type: "container",
                            children: [
                                {
                                    name: "betPerLineMeter_decrement_enabled",
                                    type: "sprite",
                                    anchor: { x: 0, y: 0.5 },
                                    position: { x: 5, y: 50 },
                                    texture: "increment_enabled",    
                                },
                                {
                                    name: "betPerLineMeter_decrement_disabled",
                                    type: "sprite",
                                    anchor: { x: 0, y: 0.5 },
                                    position: { x: 5, y: 50 },
                                    texture: "increment_disabled",    
                                },
                            ],
                        },
                    ]
                },
                {
                    name: "winMeter",
                    type: "sprite",
                    texture: "uiBg",
                    children: [
                        {
                            name: "winMeter_label",
                            type: "text",
                            anchor: { x: 0.5, y: 0.5 },
                            fontSize: 20,
                            position: { x: 125, y: 80 },
                            text: messages.winMeter_label,
                        },
                        {
                            name: "winMeter_value",
                            type: "text",
                            anchor: { x: 0.5, y: 0.5 },
                            fontSize: 30,
                            position: { x: 125, y: 40 },
                            text: "value text",
                        },
                    ]
                },
                {
                    name: "balanceMeter",
                    type: "sprite",
                    texture: "uiBg",
                    children: [
                        {
                            name: "balanceMeter_label",
                            type: "text",
                            anchor: { x: 0.5, y: 0.5 },
                            fontSize: 20,
                            position: { x: 125, y: 80 },
                            text: messages.balanceMeter_label,
                        },
                        {
                            name: "balanceMeter_value",
                            type: "text",
                            anchor: { x: 0.5, y: 0.5 },
                            fontSize: 30,
                            position: { x: 125, y: 40 },
                            text: "value text",
                        },
                    ]
                },
                {
                    name: "totalBetMeter",
                    type: "sprite",
                    texture: "uiBg",
                    children: [
                        {
                            name: "totalBetMeter_label",
                            type: "text",
                            anchor: { x: 0.5, y: 0.5 },
                            fontSize: 20,
                            position: { x: 125, y: 80 },
                            text: messages.totalBetMeter_label,
                        },
                        {
                            name: "totalBetMeter_value",
                            type: "text",
                            anchor: { x: 0.5, y: 0.5 },
                            fontSize: 30,
                            position: { x: 125, y: 40 },
                            text: "value text",
                        },
                    ]
                },
                {
                    name: "freeSpinsMeter",
                    type: "sprite",
                    texture: "uiBg",
                    children: [
                        {
                            name: "freeSpinsMeter_label",
                            type: "text",
                            anchor: { x: 0.5, y: 0.5 },
                            fontSize: 20,
                            position: { x: 125, y: 80 },
                            text: messages.freeSpinsMeter_label,
                        },
                        {
                            name: "freeSpinsMeter_value",
                            type: "text",
                            anchor: { x: 0.5, y: 0.5 },
                            fontSize: 30,
                            position: { x: 125, y: 40 },
                            text: "value text",
                        },
                    ]
                },
            ]
        },
    ],
}

const portraitConfigTree: LayoutConfigNode = {
    name: "game",
    type: "container",
    children: [
        {
            name: "backgroundContainer",
            type: "container",
            children: [
                {
                    name: "baseBgLand",
                    type: "sprite",
                    texture: "baseBgPort",
                },
                {
                    name: "bonusBgLand",
                    type: "sprite",
                    texture: "baseBgPort",
                },
            ],
        }, {
            name: "reels",
            type: "container",
            children: [
            ],
        }
    ],
}

export const layoutConfigTrees = [
    {
        orientation: Orientation.Landscape,
        tree: landscapeConfigTree,
    },
    {
        orientation: Orientation.Portrait,
        tree: portraitConfigTree,
    },
]

export const manifest = {
    bundles: [
        {
            name: "sprites",
            assets: [
                {
                    src: "./assets/sprites/baseBgLand.jpg",
                    alias: "baseBgLand",
                },
                {
                    src: "./assets/sprites/bonusBgLand.jpg",
                    alias: "bonusBgLand",
                },
                {
                    src: "./assets/sprites/bonusBgPort.jpg",
                    alias: "bonusBgPort",
                },
                {
                    src: "./assets/sprites/baseBgPort.jpg",
                    alias: "baseBgPort",
                },
                {
                    src: "./assets/sprites/spinButton_enabled.png",
                    alias: "spinButton_enabled",
                },
                {
                    src: "./assets/sprites/spinButton_over.png",
                    alias: "spinButton_over",
                },
                {
                    src: "./assets/sprites/spinButton_disabled.png",
                    alias: "spinButton_disabled",
                },
                {
                    src: "./assets/sprites/skipButton_enabled.png",
                    alias: "skipButton_enabled",
                },
                {
                    src: "./assets/sprites/skipButton_over.png",
                    alias: "skipButton_over",
                },
                {
                    src: "./assets/sprites/skipButton_disabled.png",
                    alias: "skipButton_disabled",
                },
                {
                    src: "./assets/sprites/slamStopButton_enabled.png",
                    alias: "slamStopButton_enabled",
                },
                {
                    src: "./assets/sprites/slamStopButton_over.png",
                    alias: "slamStopButton_over",
                },
                {
                    src: "./assets/sprites/slamStopButton_disabled.png",
                    alias: "slamStopButton_disabled",
                },
                {
                    src: "./assets/sprites/autoSpinButton_enabled.png",
                    alias: "autoSpinButton_enabled",
                },
                {
                    src: "./assets/sprites/autoSpinButton_over.png",
                    alias: "autoSpinButton_over",
                },
                {
                    src: "./assets/sprites/autoSpinButton_disabled.png",
                    alias: "autoSpinButton_disabled",
                },
                {
                    src: "./assets/sprites/uiBg.png",
                    alias: "uiBg",
                },
                {
                    src: "./assets/sprites/plusButton_enabled.png",
                    alias: "increment_enabled",
                },
                {
                    src: "./assets/sprites/plusButton_disabled.png",
                    alias: "increment_disabled",
                },
                {
                    src: "./assets/sprites/minusButton_enabled.png",
                    alias: "decrement_enabled",
                },
                {
                    src: "./assets/sprites/minusButton_disabled.png",
                    alias: "decrement_disabled",
                },
                {
                    src: "./assets/sprites/reelBg.png",
                    alias: "reelBg",
                },
                {
                    src: "./assets/sprites/reelCellModel.png",
                    alias: "reelCellModel",
                },
                {
                    src: "./assets/sprites/9.jpg",
                    alias: "9",
                },
                {
                    src: "./assets/sprites/10.jpg",
                    alias: "10",
                },
                {
                    src: "./assets/sprites/A.jpg",
                    alias: "A",
                },
                {
                    src: "./assets/sprites/J.jpg",
                    alias: "J",
                },
                {
                    src: "./assets/sprites/K.jpg",
                    alias: "K",
                },
                {
                    src: "./assets/sprites/clubs.jpg",
                    alias: "clubs",
                },
                {
                    src: "./assets/sprites/hearts.jpg",
                    alias: "hearts",
                },
                {
                    src: "./assets/sprites/diamonds.jpg",
                    alias: "diamonds",
                },
                {
                    src: "./assets/sprites/spades.jpg",
                    alias: "spades",
                },
                {
                    src: "./assets/sprites/Q.jpg",
                    alias: "Q",
                },
                {
                    src: "./assets/sprites/sherif.png",
                    alias: "sherif",
                },
                {
                    src: "./assets/sprites/wild.png",
                    alias: "wild",
                },
                {
                    src: "./assets/sprites/reward1000.png",
                    alias: "reward1000",
                },
            ]
        }, {
            name: "sounds",
            assets: [
            ]
        }
    ]
};
