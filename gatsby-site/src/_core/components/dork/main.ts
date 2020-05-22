import { createGameState } from './core';
import { createScene_01mailbox } from './scenes/01-mailbox';
import { GameAction, GameInput, GameExecute, Game, GameScene } from './types';
import { randomItem } from '../console-simulator-utils';
import { artMap, artMan } from './dork-art';
import { delay } from '../../utils/async';


export const dorkVersion = `v1.1.2`;
export const title = `*** D.O.R.K. *** ${dorkVersion}

${artMan}

`;

export const createDorkGame = (): Game => {
    const gameState = createGameState();
    const {
        isGameOver,
        inventory,
        isMatch,
    } = gameState;


    const badCommandInsults = [
        `What are you talking about?`,
        `That doesn't make any sense.`,
        // Saved for Redneck Game
        // `Ain't never heard no nonsense like that before.`,
        `I've seen butter knives sharper than you!`,
        `You are playing the correct game!`,
        `What exactly do you think that would accomplish?`,
        `This is a family game!`,
    ];


    const scenes = [
        createScene_01mailbox(gameState),
    ];
    let scene = null as null | GameScene;

    const loadScene = async (value: GameScene): Promise<GameAction> => {
        scene = value;
        return { output: scene.introduction };
    };
    // const containers = ;

    const execute: GameExecute = async (inputRaw: GameInput): Promise<GameAction> => {
        const { command: commandRaw, target, onMessage: onMessageRaw } = inputRaw;

        // Prevent Messages if game over already
        const onMessage: typeof onMessageRaw = (x) => {
            // Ensure Game Over Interrupts Execute
            if (isGameOver()) { return; }
            onMessageRaw(x);
        };
        // const haveTarget = (match: string) => target.includes(match) && inventory.find(x => x.lower.includes(target));

        // Standardize Commands
        let command = commandRaw;
        command = command === `look` || command === `see` || command === `view` || command === `observer` ? `look` : command;
        command = command === `take` || command === `get` || command === `obtain` ? `take` : command;

        const input = { ...inputRaw, command, onMessage };

        // Ensure Game Over Interrupts Execute
        if (gameState.isGameOver()) {
            return { output: ``, isGameOver: true };
        }

        if (!scene) {
            throw new Error(`Scene not loaded - Start Game First`);
        }

        if (command === `look`) {

            // Look Inventory
            const f = inventory.find(x => isMatch(x, target));
            if (f) {
                return {
                    output: typeof f.description === `function` ? f.description() : f.description,
                };
            }

            // Look Scene
            const sceneItems = scene.getLookItems();
            const s = sceneItems.find(x => x && isMatch(x, target));
            if (s) {
                return {
                    output: typeof s.description === `function` ? s.description() : s.description,
                };
            }
            // const result = await scene.look(input);
            // if (result) { return result; }

            // return {
            //     output: randomItem([`What do you want to look at?`, `Yes, you look nice!`]),
            // };

            return {
                output: `You see ${sceneItems.filter(x => x).map(x => x?.titleWithA).join(`, `)}, and ${randomItem([
                    `a dork... oh that's you.`,
                    `... your reflection off of the screen.`,
                    `a heard of zombies... Wait nevermind.`,
                    `... so many ducks.`,
                    `... a tech support scammer.`,
                ])}`,
            };
        }


        // Execute Inventory
        for (const x of inventory) {
            if (!x.execute) { continue; }
            if (!isMatch(x, target)) { continue; }

            // eslint-disable-next-line no-await-in-loop
            const result = await x.execute(input);
            if (result) { return result; }
        }

        // Execute Scene
        const result = await scene.execute(input);
        if (result) { return result; }

        // List Inventory
        if (command === `inv` || command === `inventory` || command === `bag` || command === `backpack` || command === `pack`) {
            return { output: inventory.map(x => x.title).join(`\n`) };
        }

        // Help
        if (command === `help`) {
            return {
                output: `
                    Example Commands: 
                    look at mirror
                    take frog
                    open box
                    close trunk
                    put cat in submarine
                    go to house
                    throw snake at lady
                    send gif to grandma
                    post status on dorkbook
                    wear mask
                    ` };
        }

        // Map
        if (command === `map`) {
            return { output: artMap };
        }

        // Silly Commands
        if (command === `dork`) { return { output: randomItem([`Yes, you must be!`, `I prefer the term nerd.`]) }; }
        if (command === `jump`) { return { output: randomItem([`How high?`, `Good job!`, `Maybe if you type harder!`]) }; }

        return { output: randomItem(badCommandInsults) };

        // return {
        //     output: `${randomBinary(512)}
        //     ****  You have died  ****
        // ` };
    };

    const start = async (onMessage: (message: GameAction) => void): Promise<void> => {
        // Load First Scene
        onMessage({ output: `Reading Floppy Disk...` });
        await delay(3000);
        onMessage({ output: title });
        await delay(3000);
        onMessage(await loadScene(scenes[0]));
        gameState.achievements.addAchievement(`⌨ I can type!`);
    };

    const game: Game = {
        title,
        start,
        execute,
        onQuit: () => gameState.triggerQuit(),
        onQuitNot: () => {
            gameState.achievements.addAchievement(`😸 Hang in There!`);
            return { output: `That was close` };
        },
        achievements: {
            setValue: (achievements: string[]) => { gameState.achievements.loadAchievements(achievements); },
            getValue: () => { return gameState.achievements.getAchievements(); },
        },
    };

    return game;
};
