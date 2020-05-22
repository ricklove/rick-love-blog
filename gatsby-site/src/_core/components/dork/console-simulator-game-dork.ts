/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable no-param-reassign */
import { ConFile, ConActionQuery, ConAction, ConInput } from '../console-simulator-types';
import { randomBinary, randomItem, randomIndex } from '../console-simulator-utils';
import { triggerTimedMessage } from './components/count-down-text';
import { GameItem, GameActionQuery, GameAction } from './types';
import { createGameState } from './core';
import { createScene_01mailbox } from './scenes/01-mailbox';
import { dorkAsciiArt } from './dork-art';

export const dorkVersion = `v1.1.0`;
// ${dorkAsciiArt}
const title = `*** D.O.R.K. *** ${dorkVersion}`;

export const dork: ConFile = {
    session: `user`, path: `/`, name: `dork`,
    content: `${randomBinary(256)}${title}${randomBinary(512)}`,
    execute: async () => {

        const gameState = createGameState();
        const {
            isGameOver,
            triggerQuit,
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
        const scene = scenes[0];
        // const containers = ;

        const mainDork: GameActionQuery = {
            prompt: `>`,
            respond: async (input): Promise<GameAction> => {
                const { command: commandRaw, target, onMessage: onMessageRaw } = input;

                // Prevent Messages if game over already
                const onMessage: typeof onMessageRaw = (x) => {
                    if (isGameOver()) { return; }
                    onMessageRaw(x);
                };
                // const haveTarget = (match: string) => target.includes(match) && inventory.find(x => x.lower.includes(target));

                // Standardize Commands
                let command = commandRaw;
                command = command === `look` || command === `see` || command === `view` || command === `observer` ? `look` : command;
                command = command === `take` || command === `get` || command === `obtain` ? `take` : command;


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
                    const result = await x.execute({ ...input, command, onMessage });
                    if (result) { return result; }
                }

                // Execute Scene
                const result = await scene.execute(input);
                if (result) { return result; }

                // List Inventory
                if (command === `inv` || command === `inventory`) {
                    return { output: inventory.map(x => x.title).join(`\n`) };
                }

                // Silly Commands
                if (command === `dork`) { return { output: randomItem([`Yes, you must be!`, `I prefer the term nerd.`]) }; }
                if (command === `jump`) { return { output: randomItem([`How high?`, `Good job!`, `Maybe if you type harder!`]) }; }

                return { output: randomItem(badCommandInsults) };

                // return {
                //     output: `${randomBinary(512)}
                //     ****  You have died  ****
                // ` };
            },
        };

        const conQuery: ConActionQuery = {
            ...mainDork,
            respond: async (input) => {
                // Quit Game
                if (input.command === `quit`) {
                    return {
                        query: {
                            prompt: `Are you sure you want to quit?`,
                            respond: async (x) => x.command.startsWith(`y`) ? triggerQuit() : { output: `That was close` },
                        },
                    };
                }

                const result = await mainDork.respond(input);
                return {
                    ...result,
                    query: conQuery,
                };
            },
        };

        return {
            output: scene.introduction,
            query: conQuery,
        };
    },
};
