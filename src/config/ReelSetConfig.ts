export type ReelConfig = {
    startDelayMs: number,
    stopDelayMs: number,
    speed: number,
}

export const reelConfigs: ReelConfig[] = [
    {
        speed: 1,
        startDelayMs: 0,
        stopDelayMs: 3000,
    },
    {
        speed: 1,
        startDelayMs: 300,
        stopDelayMs: 3300,
    },
    {
        speed: 1,
        startDelayMs: 600,
        stopDelayMs: 3600,
    },
    {
        speed: 1,
        startDelayMs: 900,
        stopDelayMs: 3900,
    },
    {
        speed: 1,
        startDelayMs: 1200,
        stopDelayMs: 4200,
    },
]
