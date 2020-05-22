/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable no-param-reassign */
import { ConFile, ConActionQuery } from '../console-simulator-types';
import { randomBinary } from '../console-simulator-utils';
import { createDorkGame, title } from './main';

export const dorkFile: ConFile = {
    session: `user`, path: `/`, name: `dork`,
    content: `${randomBinary(256)}${title}${randomBinary(512)}`,
    execute: async () => {

        const dorkGame = createDorkGame();

        const conQuery: ConActionQuery = {
            prompt: `>`,
            respond: async (input) => {
                // Quit Game
                if (input.command === `quit`) {
                    return {
                        query: {
                            prompt: `Are you sure you want to quit?`,
                            respond: async (x) => x.command.startsWith(`y`) ? dorkGame.onQuitGame() : { output: `That was close` },
                        },
                    };
                }

                const result = await dorkGame.execute(input);
                return {
                    ...result,
                    query: result?.isGameOver ? undefined : conQuery,
                };
            },
        };

        return {
            output: dorkGame.introduction,
            query: conQuery,
        };
    },
};