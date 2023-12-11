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

export type Layout = {
    orientation: Orientation,
    position: Position,
    scale?: Scale,
    alpha?: number,
    anchor?: Anchor,
}

export type LayoutItem = {
    alias: string,
    src: string,
    layouts: Layout[]
}

export const layoutConfig: LayoutItem[] = [
    {
        alias: "bgBackground",
        src: "./assets/sprites/background.jpg",
        layouts: [
            {
                orientation: Orientation.Landscape,
                position: { x: 0, y: 0 },
            }
        ]
    },
    {
        alias: "fsBackground",
        src: "./assets/sprites/bonus spin background.jpg",
        layouts: [
            {
                orientation: Orientation.Landscape,
                position: { x: 0, y: 0 },
            }
        ]
    },
];

export const assetConfig = layoutConfig.map((conf) => {
    return {
        alias: conf.alias,
        src: conf.src,
    }
});
