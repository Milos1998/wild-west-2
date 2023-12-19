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

export const screenConfig: { orientation: Orientation, config: ScreenSize }[] = [
    {
        orientation: Orientation.Landscape,
        config: {
           minWidth: 1000,
           minHeight: 550,
           maxWidth: 2000,
           maxHeight: 1400
       }
    } as const,
    {
        orientation: Orientation.Portrait,
        config: {
            minWidth: 630,
            minHeight: 860,
            maxWidth: 1400,
            maxHeight: 2000
        }
    } as const,
];

export const sceneConfig = {
    orientationRatio: 4/5,
} as const;
