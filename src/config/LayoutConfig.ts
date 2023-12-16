import { Texture } from "pixi.js"
import { Orientation } from "./SceneConfig"

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
                    name: "fsBackground",
                    type: "sprite",
                    texture: "fsBackground",
                },
                {
                    name: "bgBackground",
                    type: "sprite",
                    texture: "bgBackground",
                    scale : { x: 1, y: 1 },
                    children: [
                        {
                            name: "Q",
                            type: "sprite",
                            texture: "Q",
                            position: { x: 1000, y: 600},
                            anchor: { x: 0.5, y: 0.5 },
                        },        
                    ],
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
]

export const manifest = {
    bundles: [
        {
            name: "sprites",
            assets: [
                {
                    src: "./assets/sprites/bonus spin background.jpg",
                    alias: "fsBackground",
                },
                {
                    src: "./assets/sprites/background.jpg",
                    alias: "bgBackground",
                },
                {
                    src: "./assets/sprites/Q.jpg",
                    alias: "Q",
                },
            ]
        }, {
            name: "sounds",
            assets: [
            ]
        }
    ]
};
