export type GameAction = null | undefined | {
    isGameOver?: true;

    output: string;
    addDivider?: boolean;
    Component?: () => JSX.Element;
};
export type GameInput = { raw: string, lower: string, command: string, target: string, onMessage: (message: GameAction) => void };
export type GameExecute = (inputRaw: GameInput) => Promise<GameAction>;
export type Game = {
    introduction: string;
    execute: GameExecute;
    onQuit: () => void;
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
    execute?: GameExecute;
};

export type GameSceneContainer = GameItem & {
    // canItemsExecute: () => boolean;
    // getContents: () => GameItem[];
};

export type GameScene = {
    introduction: string;
    // objects: GameItem[];
    // containers: GameSceneContainer[];
    execute: GameExecute;
    getLookItems: () => (GameItemTitleAndDescription | null)[];
};
