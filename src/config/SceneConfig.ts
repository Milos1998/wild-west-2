import { Orientation } from "../controllers/SceneController"

export const layoutConfig = [
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
] as const;

export const sceneConfig = {
    backgroundColor: 0x000000,
    orientationRatio: 9/16,
} as const;
