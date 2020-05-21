/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { ConFile, ConActionQuery, ConAction, ConInput, ConCommandResult } from './console-simulator-types';
import { randomBinary, randomItem, randomIndex } from './console-simulator-utils';


const CountDownTimer = (props: { time: number, color?: string, messageAfterTime?: string, onTime: () => void }) => {
    const [time, setTime] = useState(10);
    useEffect(() => {
        const timeStart = Date.now();
        const id = setInterval(() => {
            const timeRemaining = ((props.time * 1000) - (Date.now() - timeStart)) / 1000;
            setTime(s => timeRemaining);
            if (timeRemaining < 0) {
                clearInterval(id);
                props.onTime();
            }
        }, 10);
        return () => clearInterval(id);
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []);

    return (
        <>
            <span style={{ color: props.color ?? `#FF0000` }}>{time > 0 ? time : props.messageAfterTime ?? `0.000`}</span>
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
            execute?: (input: ConInput) => Promise<ConAction>;
        };

        let gameOver = false;
        const triggerGameOver = (lastMessage?: string): ConAction => {
            gameOver = true;
            return {
                output: `${lastMessage}
            ****  You have died  ****` };
        };
        const triggerQuit = () => {
            gameOver = true;
            return null;
        };
        const inventory = [] as GameItem[];
        const allGameObjects = [] as GameItem[];
        const allWords = [] as string[];
        const commonWords = `the a an at in of by`.split(` `).filter(x => x);
        const ignoreWords = [...commonWords] as string[];

        const removeFromInventory = (item: GameItem) => {
            const i = inventory.indexOf(item);
            if (i < 0) { return false; }
            inventory.splice(i, 1);
            return true;
        };

        const createGameObject = (title: string, description: string, options: Partial<GameItem>): GameItem => {
            const g = { title, description, matches: title.toLowerCase().split(` `), lower: title.toLowerCase(), ...options };
            allGameObjects.push(g);

            // Ignore duplicate words
            ignoreWords.push(...g.matches.filter(x => allWords.includes(x)));
            allWords.push(...g.matches);

            return g;
        };


        const isMatch = (item: GameItem | null | undefined, target: string) => {
            if (!target) { return false; }
            const t = target.split(` `).map(x => x.trim()).filter(x => x).filter(x => !ignoreWords.includes(x));
            return !!t.find(x => item?.matches.includes(x));
        };
        // const isMatch = (item: GameItem | null | undefined, target: string) => target && (item?.lower.startsWith(target) || item?.matches.includes(target));

        const triggerTimedMessage = async (
            onMessage: (message: ConCommandResult) => void,
            immediateResult: ConCommandResult,
            time: number, color: 'danger' | 'warning' | 'normal',
            getResultAfterTime: () => ConAction,
        ): Promise<ConCommandResult> => {

            const colorActual = color === `danger` ? `#FF0000`
                : (color === `warning` ? `#FFFF00`
                    : `#7777FF`);

            return new Promise(resolve => {
                const Component = () => (<CountDownTimer time={time} color={colorActual} onTime={() => {
                    resolve({ ...getResultAfterTime(), addDivider: true });
                }} />);
                onMessage({
                    ...immediateResult,
                    Component,
                });
            });
        };

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
                execute: async ({ command, target, onMessage }) => {
                    if (command === `touch`) {
                        return triggerTimedMessage(onMessage, {
                            output: randomItem([
                                `The squirrel goes nuts and begins to chew off your arm.`,
                                `The squirel had more than just nuts with him.`,
                                `Despite the warnings, you decide to touch the squirrel's nuts anyway.`,
                                `Everyone told you to keep your hands to yourself.`,
                            ]),
                        }, 5, `danger`, () => triggerGameOver(`Don't be touchin my nutz!`));
                    }
                    return null;
                },
            }),
            createGameObject(`Ticking Package`, `Ummmm... it's ticking`, {
                execute: async ({ command }) => {
                    if (command === `open`) {
                        return triggerGameOver(randomItem([`You have Exploded!`, `You're head acksplod!`, `You no longer hear ticking...`]));
                    }
                    if (command === `put`) {
                        return triggerGameOver(randomItem([`You're attempt was unsuccessful.`, `Probably should have done that earlier. It exploded in your hands!`]));
                    }
                    return null;
                },
            }),
            createGameObject(`Lime & Coconut`, `It seems like I have heard about this before.`, {
                execute: async ({ command }) => {
                    if (command === `put`) {
                        return triggerGameOver(`
                        You put the lime in the coconut, you drank 'em bot' up
                        Put the lime in the coconut, you drank 'em bot' up
                        Put the lime in the coconut, you drank 'em bot'up
                        Put the lime in the coconut, you call your doctor, woke 'I'm up
                        Said "doctor, ain't there nothing' I can take?"
                        I said, "doctor, to relieve this belly ache"
                        I said "doctor, ain't there nothin' I can take?'
                        I said, "doctor, to relieve this belly ache"`);
                    }
                    return null;
                },
            }),
        ];

        const snake = createGameObject(`Snake`, `It's a brown snake. Let's keep it! I have a small aquarium in my room.`, {
            execute: async ({ command, target }) => {
                console.log(`snake.execute`, { command, target });
                if (command === `put` && target.includes(`mailbox`)) {
                    if (!mailbox.isOpen) {
                        return {
                            output: `The mailbox is not open.`,
                            query: mainDork,
                        };
                    }
                    if (mailbox.package) {
                        return {
                            output: `The mailbox has something in it already.`,
                            query: mainDork,
                        };
                    }

                    removeFromInventory(snake);
                    mailbox.package = snake;
                    return {
                        output: `You put the snake in the mailbox. He looks at you with his sad little snake eyes...`,
                        query: mainDork,
                    };
                }
                return null;
            },
        });

        const yard = {
            snake: snake as GameItem | null,
        };

        const mailbox = {
            isOpen: false,
            isDelivering: false,
            package: null as GameItem | null,
        };
        const placeRandomItemInMailbox = () => {
            const i = randomIndex(mailPackages.length);
            const p = mailPackages[i];
            mailPackages.splice(i, 1);
            mailbox.package = p;
            mailbox.isOpen = false;
        };

        // Testing
        // inventory.push(...mailPackages);

        // Setup Scene
        placeRandomItemInMailbox();

        const deliverMail = (): ConAction => {
            if (mailbox.package === snake) {
                return triggerGameOver(`
                    You see ${randomItem([`a UPS truck`, `an Amazon truck`, `an ambulance`, `a cop car`, `the van from down by the river`, `the ice cream truck`])} drive up.
                    The driver waves at you while carrying a package to the mailbox.

                    As he opens the mailbox, your little pal jumps out and bits him in the face.
                    At first you think this is funny, but then the driver rips the snake off and throws him into the trees.

                    The driver looks up and sees you laughing.
                    You see a look of rage in his eyes as he gets back in, revs the engine, and speeds towards you...
                    `);
            }

            if (mailbox.package) {
                const item = mailbox.package;
                mailPackages.push(item);
                placeRandomItemInMailbox();
                mailbox.isOpen = true;

                return {
                    output: `
                    You see ${randomItem([`a UPS truck`, `an Amazon truck`, `an ambulance`, `a cop car`, `the van from down by the river`, `the ice cream truck`])} drive up.
                    When he opens the mailbox, he looks suprised.

                    He looks around suspiciously... and then puts the ${item.title} under his trenchcoat as he slips the new package into the mailbox.

                    He nervously looks around again, then rushes back and quickly drives off.
                    `,
                    query: mainDork,
                };
            }

            placeRandomItemInMailbox();
            return {
                output: `
                You see ${randomItem([`a UPS truck`, `an Amazon truck`, `an ambulance`, `a cop car`, `the van from down by the river`, `the ice cream truck`])} drive up, and the driver puts a package in the mailbox.
                He is wearing a ${randomItem([`football helmet`, `Santa hat`, `bow tie`, `hazmat suit`, `clown uniform`, `bearskin rug`])}.
                As he drives away, he shouts, "${randomItem([`Watch out for the monkeys!`, `Merry Christmas!`, `Ducks... ducks... ducks everywhere...`, `That squirrel is nuts!`])}"`,
                query: mainDork,
            };
        };

        const closeMailbox = async (input: ConInput): Promise<ConAction> => {
            if (mailbox.package === snake) {
                return triggerTimedMessage(input.onMessage, {
                    output: `
                    You close the mailbox with your little friend inside...
                    Deep down, you feel like you are making bad life choices...
                    We'll give you some time to think about it...`,
                }, 20, `warning`, deliverMail);
            }


            if (mailPackages.length <= 0 || mailbox.package) {
                return {
                    output: `You close the mailbox. ${mailbox.package ? `There is still something inside it though.` : `Thanks!`}`,
                    query: mainDork,
                };
            }

            return triggerTimedMessage(input.onMessage, { output: `You close the mailbox.` }, 10, `normal`, deliverMail);
        };


        // const containers = ;

        const mainDork: ConActionQuery = {
            prompt: `>`,
            respond: async (input): Promise<ConAction> => {
                const { command: commandRaw, target, onMessage: onMessageRaw } = input;

                // Prevent Messages if game over already
                const onMessage: typeof onMessageRaw = (x) => {
                    if (gameOver) { return; }
                    onMessageRaw(x);
                };
                // const haveTarget = (match: string) => target.includes(match) && inventory.find(x => x.lower.includes(target));

                // Standardize Commands
                let command = commandRaw;
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
                        output: mailbox.package ? `You find a ${mailbox.package.title} in the mailbox.` : `There is nothing in the mailbox.`,
                        query: mainDork,
                    };
                }

                if (command === `close` && target === `mailbox`) {
                    if (!mailbox.isOpen) {
                        return {
                            output: `Really? It's already closed!`,
                            query: mainDork,
                        };
                    }

                    mailbox.isOpen = false;
                    return closeMailbox(input);
                }

                if (command === `take` && mailbox.package && isMatch(mailbox.package, target)) {
                    const p = mailbox.package;
                    inventory.push(p);
                    mailbox.package = null;
                    const wasOpen = mailbox.isOpen;
                    mailbox.isOpen = true;
                    return {
                        output: `${!wasOpen ? `You open the mailbox and` : `You`} take the ${p.title} and put it in your backpack.`,
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
                    if (!isMatch(x, target)) { continue; }

                    // eslint-disable-next-line no-await-in-loop
                    const result = await x.execute({ ...input, command, onMessage });
                    if (result) { return result; }
                }

                // Special environment action
                if (command === `put`) {
                    if (target.includes(`mailbox`) && !mailbox.package) {
                        const f = inventory.find(x => isMatch(x, target));
                        if (f) {
                            removeFromInventory(f);
                            mailbox.package = f;
                            const wasOpen = mailbox.isOpen;
                            mailbox.isOpen = false;
                            return {
                                output: `${!wasOpen ? `You open the mailbox and` : `You`} put the ${f.title} in the mailbox ${!wasOpen ? `and close it again.` : `and close it.`}`,
                                query: mainDork,
                            };
                        }
                    }
                }

                if (command === `inv` || command === `inventory`) {
                    return { output: inventory.map(x => x.title).join(`\n`), query: mainDork };
                }

                if (command === `quit`) {
                    return {
                        query: {
                            prompt: `Are you sure you want to quit?`,
                            respond: async (x) => x.command.startsWith(`y`) ? triggerQuit() : { query: mainDork },
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
