export enum Orientation {
    Landscape,
    Portrait
}

export type ScreenSize = {
    minWidth: number,
    minHeight: number,
    maxWidth: number,
    maxHeight: number,
};

export const layoutConfig: { orientation: Orientation, config: ScreenSize }[] = [
    {
        orientation: Orientation.Landscape,
        config: {
           minWidth: 800,
           minHeight: 600,
           maxWidth: 2000,
           maxHeight: 1200
       }
    } as const,
    {
        orientation: Orientation.Portrait,
        config: {
            minWidth: 600,
            minHeight: 800,
            maxWidth: 1000,
            maxHeight: 2000
        }
    } as const,
];

export const sceneConfig = {
    orientationRatio: 9/16,
} as const;
