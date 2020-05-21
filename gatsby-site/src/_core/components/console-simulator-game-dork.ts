/* eslint-disable no-param-reassign */
import { ConFile, ConActionQuery } from './console-simulator-types';
import { randomBinary, randomItem } from './console-simulator-utils';

export const dork: ConFile = {
    session: `user`, path: `/`, name: `dork`,
    content: `${randomBinary(256)}# North of House
You are standing in a large grass yard of a biege house, with a broken front door.
There is a small mailbox near here.${randomBinary(512)}`,
    execute: () => {

        const intro = `# North of House
        You are standing in a large grass yard of a biege house, with a broken front door.
        There is a small mailbox nearby.`;

        const badCommandInsults = [
            `What are you talking about?`,
            `That doesn't make any sense.`,
            // `Ain't never heard no nonsense like that before.`,
            `I've seen butter knives sharper than you!`,
            `You are playing the correct game!`,
            `What exactly do you think that would accomplish?`,
            `This is a family game!`,
        ];


        const mailPackages = [`Self Cleaning Litter Box`, `Set of Bathroom Towel Hooks`, `Pink Flamingo Squishy Toy`, `Strand of Fairy Lights - 20ft`, `Ticking Package`, `Lime & Coconut`];
        const mailbox = {
            isOpen: false,
            package: randomItem(mailPackages) as null | string,
        };
        const inventory = [] as string[];

        const mainDork: ConActionQuery = {
            prompt: `>`,
            respond: ({ command, target }) => {
                const haveTarget = (match: string) => target.includes(match) && inventory.find(x => x.toLowerCase().includes(target));
                command = command === `look` || command === `see` || command === `view` || command === `observer` ? `look` : command;

                if (command === `dork`) { return { output: `Yes, you must be!`, query: mainDork }; }
                // if (command === `jump`) { return { output: Math.random() < 0.5 ? `Are you enjoing yourself?` : `Very good! Now you can go to the second grade.`, query: mainDork }; }
                // if (command === `scream`) { return { output: `Aaaarrrrgggghhhh!`, query: mainDork }; }

                if (command === `look`) {
                    if (target.includes(`house`)) {
                        return {
                            output: `You are standing in a large grass yard of a biege house, with a broken front door. 
                            There is ${mailbox.isOpen ? `an open` : `a small`} mailbox nearby.`,
                            query: mainDork,
                        };
                    }

                    if (target.includes(`mailbox`)) {
                        return {
                            output: `There is ${mailbox.isOpen ? `an open` : `a small`} mailbox nearby. ${mailbox.isOpen && mailbox.package ? `There is a ${mailbox.package} inside.` : ``}`,
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
                        output: `You find a ${mailbox.package} in the mailbox.`,
                        query: mainDork,
                    };
                }

                if (mailbox.isOpen && command === `take` && mailbox.package?.toLowerCase().startsWith(target)) {
                    const p = mailbox.package;
                    inventory.push(p);
                    mailbox.package = null;
                    return {
                        output: `You take the ${p} and put it in your backpack.`,
                        query: mainDork,
                    };
                }

                if (command === `open` && haveTarget(`ticking`)) {
                    return {
                        output: `${randomItem([`You have Exploded!`, `You're head acksplod!`, `You no longer hear ticking...`])} 

                    ****  You have died  ****` };
                }

                if (command === `put` && haveTarget(`ticking`)) {
                    return {
                        output: `${randomItem([`You're attempt was unsuccessful.`, `Probably should have done that earlier. It exploded in your hands!`])} 

                    ****  You have died  ****` };
                }

                if (command === `put` && haveTarget(`lime`)) {
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

                if (command.startsWith(`inv`)) {
                    return { output: inventory.join(`\n`), query: mainDork };
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
