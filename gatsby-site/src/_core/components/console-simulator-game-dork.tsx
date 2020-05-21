/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { ConFile, ConActionQuery, ConAction } from './console-simulator-types';
import { randomBinary, randomItem } from './console-simulator-utils';


const CountDownTimer = (props: { time: number, messageAfterTime: string }) => {
    const [time, setTime] = useState(10);
    useEffect(() => {
        const timeStart = Date.now();
        const id = setInterval(() => {
            const timeRemaining = ((props.time * 1000) - (Date.now() - timeStart)) / 1000;
            setTime(s => timeRemaining);
            if (timeRemaining < 0) {
                clearInterval(id);
            }
        }, 10);
        return () => clearInterval(id);
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []);

    return (
        <>
            <span style={{ color: `#FF0000` }}>{time > 0 ? time : props.messageAfterTime}</span>
        </>
    );
};

const intro = `# North of House
You are standing in a large grass yard of a biege house, with a broken front door.
There is a small mailbox nearby.`;

export const dork: ConFile = {
    session: `user`, path: `/`, name: `dork`,
    content: `${randomBinary(256)}${intro}${randomBinary(512)}`,
    execute: async () => {
        type GameItem = {
            title: string;
            description: string;
            matches: string[];
            lower: string;
            contents?: GameItem[];
            // look?: () => Promise<ConAction>;
            // smell?: () => Promise<ConAction>;
            // taste?: () => Promise<ConAction>;
            // open?: () => Promise<ConAction>;
            isOpen?: boolean;
            execute?: (command: string, target: string) => Promise<ConAction>;
        };

        const inventory = [] as GameItem[];
        const createGameObject = (title: string, description: string, options: Partial<GameItem>): GameItem => { return { title, description, matches: title.toLowerCase().split(` `), lower: title.toLowerCase(), ...options }; };

        const isMatch = (item: GameItem | null | undefined, target: string) => target && (item?.lower.startsWith(target) || item?.matches.includes(target));

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

        const mailPackages: GameItem[] = [
            createGameObject(`Self Cleaning Litter Box`, `Cause 18 years is great even if you have to deal with a little crap sometimes. Keep it clean and happy!`, {}),
            createGameObject(`Set of Bathroom Towel Hooks`, `For the new house of course.`, {}),
            createGameObject(`Pink Flamingo Squishy Toy`, `It's head is tearing off. Maybe if can be sewn.`, {}),
            createGameObject(`Strand of Fairy Lights - 20ft`, `Make the room look cool. Girls only though!`, {}),
            createGameObject(`Squirrel Stuffed Animal with Nuts`, `It looks like you should be careful not to touch it's nuts!`, {
                execute: async (command) => {
                    if (command === `touch`) {
                        return {
                            Component: () => (<CountDownTimer time={10} messageAfterTime={`Don't be touchin my nutz!`} />),
                            output: `${randomItem([
                                `The squirrel goes nuts and chews off your arm.`,
                                `The squirel had more than just nuts with him.`,
                                `Despite the warnings, you decide to touch the squirrel's nuts anyway.`,
                                `Everyone told you to keep your hands to yourself.`,
                            ])} 
                        ****  You have died  ****` };
                    }
                    return null;
                },
            }),
            createGameObject(`Ticking Package`, `Ummmm... it's ticking`, {
                execute: async (command) => {
                    if (command === `open`) {
                        return {
                            output: `${randomItem([`You have Exploded!`, `You're head acksplod!`, `You no longer hear ticking...`])} 

                        ****  You have died  ****` };
                    }
                    if (command === `put`) {
                        return {
                            output: `${randomItem([`You're attempt was unsuccessful.`, `Probably should have done that earlier. It exploded in your hands!`])} 

                        ****  You have died  ****` };
                    }
                    return null;
                },
            }),
            createGameObject(`Lime & Coconut`, `It seems like I have heard about this before.`, {
                execute: async (command, target) => {
                    if (command === `put`) {
                        return {
                            output: `
                        You put the lime in the coconut, you drank 'em bot' up
                        Put the lime in the coconut, you drank 'em bot' up
                        Put the lime in the coconut, you drank 'em bot'up
                        Put the lime in the coconut, you call your doctor, woke 'I'm up
                        Said "doctor, ain't there nothing' I can take?"
                        I said, "doctor, to relieve this belly ache"
                        I said "doctor, ain't there nothin' I can take?'
                        I said, "doctor, to relieve this belly ache"

                        ****  You have died  ****` };
                    }
                    return null;
                },
            }),
        ];
        const mailbox = {
            isOpen: false,
            package: randomItem(mailPackages) as GameItem | null,
        };

        const yard = {
            snake: createGameObject(`Snake`, `It's a brown snake. Let's keep it! I have a small aquarium in my room.`, {}) as GameItem | null,
        };

        // const containers = ;

        const mainDork: ConActionQuery = {
            prompt: `>`,
            respond: async ({ command, target }): Promise<ConAction> => {
                // const haveTarget = (match: string) => target.includes(match) && inventory.find(x => x.lower.includes(target));

                // Standardize Commands
                command = command === `look` || command === `see` || command === `view` || command === `observer` ? `look` : command;
                command = command === `take` || command === `get` || command === `obtain` ? `take` : command;

                if (command === `dork`) { return { output: `Yes, you must be!`, query: mainDork }; }

                if (command === `look`) {
                    if (target.includes(`house`)) {
                        return {
                            output: `You are standing in a large grass yard of a biege house, with a broken front door. 
                            There is ${mailbox.isOpen ? `an open` : `a small`} mailbox nearby.`,
                            query: mainDork,
                        };
                    }

                    if (target.includes(`grass`) || target.includes(`yard`)) {
                        if (yard.snake) {
                            return {
                                output: `You see a snake crawling in the grass.`,
                                query: mainDork,
                            };
                        }

                        return {
                            output: `You are standing in a large grass yard.`,
                            query: mainDork,
                        };
                    }

                    if (target.includes(`mailbox`)) {
                        return {
                            output: `There is ${mailbox.isOpen ? `an open` : `a small`} mailbox nearby. ${mailbox.isOpen && mailbox.package ? `There is a ${mailbox.package.title} inside.` : ``}`,
                            query: mainDork,
                        };
                    }

                    const f = inventory.find(x => isMatch(x, target));
                    if (f) {
                        return {
                            output: f.description,
                            query: mainDork,
                        };
                    }

                    return {
                        output: randomItem([`What do you want to look at?`, `Yes, you look nice!`]),
                        query: mainDork,
                    };
                }

                if (command === `open` && target === `mailbox`) {
                    if (mailbox.isOpen) {
                        return {
                            output: `Really? It's already open!`,
                            query: mainDork,
                        };
                    }

                    mailbox.isOpen = true;
                    return {
                        output: `You find a ${mailbox.package?.title} in the mailbox.`,
                        query: mainDork,
                    };
                }

                if (mailbox.isOpen && command === `take` && mailbox.package && isMatch(mailbox.package, target)) {
                    const p = mailbox.package;
                    inventory.push(p);
                    mailbox.package = null;
                    return {
                        output: `You take the ${p.title} and put it in your backpack.`,
                        query: mainDork,
                    };
                }

                if (command === `take` && yard.snake && isMatch(yard.snake, target)) {
                    const p = yard.snake;
                    inventory.push(p);
                    yard.snake = null;
                    return {
                        output: `You take the ${p.title} and put it in your backpack.`,
                        query: mainDork,
                    };
                }

                for (const x of inventory) {
                    if (!x.execute) { continue; }

                    // eslint-disable-next-line no-await-in-loop
                    const result = await x.execute(command, target);
                    if (result) { return result; }
                }

                if (command === `inv` || command === `inventory`) {
                    return { output: inventory.map(x => x.title).join(`\n`), query: mainDork };
                }

                if (command === `quit`) {
                    return {
                        query: {
                            prompt: `Are you sure you want to quit?`,
                            respond: async (x) => x.command.startsWith(`y`) ? null : { query: mainDork },
                        },
                    };
                }

                return { output: randomItem(badCommandInsults), query: mainDork };

                // return {
                //     output: `${randomBinary(512)}
                //     ****  You have died  ****
                // ` };
            },
        };

        return {
            output: intro,
            query: mainDork,
        };
    },
};
