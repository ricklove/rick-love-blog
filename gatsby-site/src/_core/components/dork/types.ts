import { ConInput } from '../console-simulator-types';

export type GameInput = ConInput;
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
    execute?: (input: ConInput) => Promise<GameAction>;
};

export type GameSceneContainer = GameItem & {
    // canItemsExecute: () => boolean;
    // getContents: () => GameItem[];
};

export type GameScene = {
    introduction: string;
    // objects: GameItem[];
    // containers: GameSceneContainer[];
    execute: (input: ConInput) => Promise<GameAction>;
    getLookItems: () => (GameItemTitleAndDescription | null)[];
};
