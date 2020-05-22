export type GameExecuteResult = { output?: string, addDivider?: boolean, prompt?: string, Component?: () => JSX.Element };
export type GameInput = { raw: string, lower: string, command: string, target: string, onMessage: (message: GameExecuteResult) => void };

export type GameAction = null | undefined | {
    output: string;
    isGameOver?: true;
    addDivider?: boolean;
    Component?: () => JSX.Element;
};

export type GameItemTitle = {
    title: string;
    titleWithA: string;
    matches: string[];
    lower: string;
};
export type GameItemTitleAndDescription = GameItemTitle & {
    description: string | (() => string);
};

export type GameItem = GameItemTitleAndDescription & {
    execute?: (input: GameInput) => Promise<GameAction>;
};

export type GameSceneContainer = GameItem & {
    // canItemsExecute: () => boolean;
    // getContents: () => GameItem[];
};

export type GameScene = {
    introduction: string;
    // objects: GameItem[];
    // containers: GameSceneContainer[];
    execute: (input: GameInput) => Promise<GameAction>;
    getLookItems: () => (GameItemTitleAndDescription | null)[];
};
