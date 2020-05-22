/* eslint-disable unicorn/consistent-function-scoping */
import { GameItem, GameAction, GameItemTitle } from './types';
import { randomItem, randomIndex, getValuesAsItems, moveItem } from '../console-simulator-utils';
import { triggerTimedMessage, CountDownTimer } from './components/count-down-timer';

export const createGameState = () => {

    let gameOver = false;
    const triggerGameOver = (lastMessage?: string): GameAction => {
        gameOver = true;
        return {
            isGameOver: true,
            output: `${lastMessage}
        ****  You have died  ****` };
    };
    const triggerQuit = (): GameAction => {
        gameOver = true;
        return { output: `****  You can't quit you're fired!  ****`, isGameOver: true };
    };

    const inventory = [] as GameItem[];
    const allGameObjectTitles = [] as GameItemTitle[];
    const allWords = [] as string[];
    const commonWords = `the a an at in of by`.split(` `).filter(x => x);
    const ignoreWords = [...commonWords] as string[];

    const removeFromInventory = (item: GameItem) => {
        const i = inventory.indexOf(item);
        if (i < 0) { return false; }
        inventory.splice(i, 1);
        return true;
    };

    const getTitleWithA = (title: string): string => {
        const l = title.toLowerCase()[0];
        if (l === `a`
            || l === `e`
            || l === `i`
            || l === `o`
            || l === `u`
        ) { return `an ${title}`; }

        return `a ${title}`;
    };

    const createGameObject = (title: string, description: string, options: Partial<GameItem>): GameItem => {
        const g = { title, titleWithA: getTitleWithA(title), description, matches: title.toLowerCase().split(` `), lower: title.toLowerCase(), ...options };
        allGameObjectTitles.push(g);

        // Ignore duplicate words
        ignoreWords.push(...g.matches.filter(x => allWords.includes(x)));
        allWords.push(...g.matches);

        return g;
    };

    const createGameObjectTitle = (title: string): GameItemTitle => {
        const g = { title, titleWithA: getTitleWithA(title), matches: title.toLowerCase().split(` `), lower: title.toLowerCase() };
        allGameObjectTitles.push(g);

        // Ignore duplicate words
        ignoreWords.push(...g.matches.filter(x => allWords.includes(x)));
        allWords.push(...g.matches);

        return g;
    };


    const isMatch = (item: GameItemTitle | null | undefined, target: string) => {
        if (!target) { return false; }
        const t = target.split(` `).map(x => x.trim()).filter(x => x).filter(x => !ignoreWords.includes(x));
        return !!t.find(x => item?.matches.includes(x));
    };

    const utils = { randomItem, randomIndex, getValuesAsItems, moveItem };
    const components = { triggerTimedMessage, CountDownTimer };

    const gameState = {
        isGameOver: () => gameOver,
        triggerGameOver,
        triggerQuit,
        inventory,
        allGameObjects: allGameObjectTitles,
        allWords,
        commonWords,
        ignoreWords,
        removeFromInventory,
        createGameObject,
        createGameObjectTitle,
        isMatch,
        utils,
        components,
    };

    return gameState;
};

export type GameState = ReturnType<typeof createGameState>;
