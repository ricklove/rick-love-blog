/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { GameScene, GameItem, GameAction, GameInput } from '../types';
import { GameState } from '../core';
import { triggerTimedMessage } from '../components/count-down-text';
import { randomItem, randomIndex, getValuesAsItems } from '../../console-simulator-utils';

export const createScene_01mailbox = (gameState: GameState) => {
    const {
        triggerGameOver,
        inventory,
        removeFromInventory,
        createGameObject,
        createGameObjectTitle,
        isMatch,
    } = gameState;

    // These don't indicate state, just creation containers
    const mailObjects = {
        litterBox: createGameObject(`Self Cleaning Litter Box`, `Cause 18 years is great even if you have to deal with a little crap sometimes. Keep it clean and happy!`, {}),
        towelHooks: createGameObject(`Set of Bathroom Towel Hooks`, `For the new house of course.`, {}),
        squishyToy: createGameObject(`Pink Flamingo Squishy Toy`, `It's head is tearing off. Maybe if can be sewn.`, {}),
        strangLights: createGameObject(`Strand of Fairy Lights - 20ft`, `Make the room look cool. Girls only though!`, {}),
        squirrel: createGameObject(`Squirrel Stuffed Animal with Nuts`, `It looks like you should be careful not to touch it's nuts!`, {
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
        tickingPackage: createGameObject(`Ticking Package`, `Ummmm... it's ticking`, {
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
        limeCoconut: createGameObject(`Lime & Coconut`, `It seems like I have heard about this before.`, {
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
    };

    // These don't indicate state, just creation containers for self reference
    const yardObjects = {
        snake: createGameObject(`Snake`, `It's a brown snake. Let's keep it! I have a small aquarium in my room.`, {
            execute: async ({ command, target }) => {
                if (command === `put` && target.includes(`mailbox`)) {
                    if (!mailbox.isOpen) {
                        return {
                            output: `The mailbox is not open.`,
                        };
                    }
                    if (mailbox.package) {
                        return {
                            output: `The mailbox has something in it already.`,
                        };
                    }

                    removeFromInventory(yardObjects.snake);
                    mailbox.package = yardObjects.snake;
                    return {
                        output: `You put the snake in the mailbox. He looks at you with his sad little snake eyes...`,
                    };
                }
                return null;
            },
        }),
    };

    const yard = {
        ...createGameObjectTitle(`Grass Yard`),
        description: () => {
            if (yard.contents.includes(yardObjects.snake)) {
                return `The is a large yard. 
                The center is mowed. A snake is sunning itself on a rock in the grass.`;
            }
            return `The is a large yard. 
            Only the center of the yard is mowed and it looks like it might be in the shape of a heart.`;
        },
        contents: getValuesAsItems(yardObjects),
    };

    const mailTruck = {
        ...createGameObjectTitle(`Crashed Mail Truck`),
        description: `The crashed mail truck is smoking. The front end looks like it is hugging that tree. Clearly it is not familiar with social distancing.`,
        hasCrashed: false,
        contents: getValuesAsItems(mailObjects),
    };

    const mailbox = {
        ...createGameObjectTitle(`Mailbox`),
        description: () => `There is ${mailbox.isOpen ? `an open` : `a small`} mailbox nearby. 
            ${mailbox.isOpen && mailbox.package ? `There is a ${mailbox.package.title} inside.` : ``}`,
        isOpen: false,
        isDelivering: false,
        package: null as GameItem | null,
    };

    const placeRandomItemInMailbox = () => {
        const i = randomIndex(mailTruck.contents.length);
        const p = mailTruck.contents[i];
        mailTruck.contents.splice(i, 1);
        mailbox.package = p;
        mailbox.isOpen = false;
    };

    // Testing
    // inventory.push(...mailPackages);

    // Setup Scene
    placeRandomItemInMailbox();

    const { snake } = yardObjects;

    const deliverMail = (): GameAction => {
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
            mailTruck.contents.push(item);
            placeRandomItemInMailbox();
            mailbox.isOpen = true;

            return {
                output: `
                You see ${randomItem([`a UPS truck`, `an Amazon truck`, `an ambulance`, `a cop car`, `the van from down by the river`, `the ice cream truck`])} drive up.
                When he opens the mailbox, he looks suprised.

                He looks around suspiciously... and then puts the ${item.title} under his trenchcoat as he slips the new package into the mailbox.

                He nervously looks around again, then rushes back and quickly drives off.
                `,
            };
        }

        placeRandomItemInMailbox();
        return {
            output: `
            You see ${randomItem([`a UPS truck`, `an Amazon truck`, `an ambulance`, `a cop car`, `the van from down by the river`, `the ice cream truck`])} drive up, and the driver puts a package in the mailbox.
            He is wearing a ${randomItem([`football helmet`, `Santa hat`, `bow tie`, `hazmat suit`, `clown uniform`, `bearskin rug`])}.
            As he drives away, he shouts, "${randomItem([`Watch out for the monkeys!`, `Merry Christmas!`, `Ducks... ducks... ducks everywhere...`, `That squirrel is nuts!`])}"`,
        };
    };

    const closeMailbox = async (input: GameInput): Promise<GameAction> => {
        if (mailbox.package === snake) {
            return triggerTimedMessage(input.onMessage, {
                output: `
                You close the mailbox with your little friend inside...
                Deep down, you feel like you are making bad life choices...
                We'll give you some time to think about it...`,
            }, 20, `warning`, deliverMail);
        }

        if (mailTruck.contents.length <= 0 || mailbox.package) {
            return {
                output: `You close the mailbox. ${mailbox.package ? `There is still something inside it though.` : `Thanks!`}`,
            };
        }

        return triggerTimedMessage(input.onMessage, { output: `You close the mailbox.` }, 10, `normal`, deliverMail);
    };

    const execute = async (input: GameInput): Promise<GameAction> => {
        const { command, target } = input;

        if (command === `open` && target === `mailbox`) {
            if (mailbox.isOpen) {
                return {
                    output: `Really? The mailbox is already open!`,
                };
            }

            mailbox.isOpen = true;
            return {
                output: mailbox.package ? `You see a ${mailbox.package.title} in the mailbox.` : `There is nothing in the mailbox.`,
            };
        }

        if (command === `close` && target === `mailbox`) {
            if (!mailbox.isOpen) {
                return {
                    output: `It's already closed.`,
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
            };
        }

        if (command === `take` && yard.contents.includes(snake) && isMatch(snake, target)) {
            const p = snake;
            inventory.push(p);
            yard.contents = yard.contents.filter(x => x !== snake);
            return {
                output: `You take the ${p.title} and put it in your backpack.`,
            };
        }

        if (command === `put`) {
            if (target.includes(`mailbox`)) {
                if (!mailbox.isOpen) {
                    return {
                        output: `The mailbox is not open.`,
                    };
                }
                if (mailbox.package) {
                    return {
                        output: `There is already something in the mailbox.`,
                    };
                }

                const f = inventory.find(x => isMatch(x, target));
                if (f) {
                    removeFromInventory(f);
                    mailbox.package = f;
                    const wasOpen = mailbox.isOpen;
                    mailbox.isOpen = false;
                    return {
                        output: `${!wasOpen ? `You open the mailbox and` : `You`} put the ${f.title} in the mailbox ${!wasOpen ? `and close it again.` : `and close it.`}`,
                    };
                }
            }
        }

        return null;
    };

    // const look = async (input: GameInput): Promise<GameAction> => {
    //     // if (target.includes(`house`)) {
    //     //     return {
    //     //         output: `You are standing in a large grass yard of a biege house, with a broken front door.
    //     //         There is ${mailbox.isOpen ? `an open` : `a small`} mailbox nearby.`,
    //     //     };
    //     // }

    //     // if (target.includes(`grass`) || target.includes(`yard`)) {
    //     //     if (yard.snake) {
    //     //         return {
    //     //             output: `You see a snake crawling in the grass.`,
    //     //         };
    //     //     }

    //     //     return {
    //     //         output: `You are standing in a large grass yard.`,
    //     //     };
    //     // }

    //     // if (target.includes(`mailbox`)) {
    //     //     return {
    //     //         output: `There is ${mailbox.isOpen ? `an open` : `a small`} mailbox nearby. ${mailbox.isOpen && mailbox.package ? `There is a ${mailbox.package.title} inside.` : ``}`,
    //     //     };
    //     // }

    //     const lookItems = [
    //         mailbox,
    //         yard,
    //         mailTruck.hasCrashed ? mailTruck : null,
    //     ];
    // };

    const gameScene: GameScene = {
        execute,
        getLookItems: () => [
            mailbox,
            yard,
            mailTruck.hasCrashed ? mailTruck : null,
        ],
    };

    // Type Check
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //    const _gameScene: GameScene = gameScene;
    return gameScene;
};

export type Scene01Mailbox = ReturnType<typeof createScene_01mailbox>;
