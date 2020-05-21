/* eslint-disable unicorn/consistent-function-scoping */
export const createConsoleCommands = (initialMachineName: string) => {

    type ConSessionName = 'user' | 'admin';
    type ConSession = { machineName: string };
    const sessions: { [session in ConSessionName]: ConSession } = {
        user: { machineName: `${initialMachineName}` },
        admin: { machineName: `admin@vm` },
    };

    type ConInput = { raw: string, lower: string, command: string, target: string };

    type ConActionQuery = { prompt: string, respond: (input: ConInput) => ConAction };
    type ConAction = void | null | undefined | {
        output?: string;
        query?: ConActionQuery;
    };
    type ConFile = {
        session: ConSessionName;
        path: string;
        name: string;
        content: string;
        execute?: () => ConAction;
    };
    type ConState = {
        readonly parent?: ConState;
        readonly session: ConSessionName;
        readonly directory: string;
        readonly activeAction?: ConAction;
    };

    let state: ConState = {
        parent: undefined,
        session: `user`,
        directory: `/`,
        activeAction: undefined,
    };

    const enterSession = (session: ConSessionName, shouldResolveAction = true) => {
        state = {
            parent: { ...state, activeAction: shouldResolveAction ? null : state.activeAction },
            session,
            directory: `/`,
            activeAction: null,
        };
    };
    const exitSession = () => {
        if (!state.parent) { return null; }
        state = state.parent;
        return state;
    };

    const randomBinary = (length: number) => String.fromCharCode(...[...new Array(length)].map(x => Math.random() * (126 - 32) + 32));

    const zork: ConFile = {
        session: `user`, path: `/`, name: `zork`,
        content: `${randomBinary(256)}West of House
You are standing in an open field west of a white house, with a boarded front door.
There is a small mailbox here.${randomBinary(512)}`,
        execute: () => {

            const mainZork: ConActionQuery = {
                prompt: `>`,
                respond: ({ command, target }) => {
                    if (command === `zork`) { return { output: `At your service`, query: mainZork }; }
                    if (command === `jump`) { return { output: Math.random() < 0.5 ? `Are you enjoing yourself?` : `Very good! Now you can go to the second grade.`, query: mainZork }; }
                    if (command === `scream`) { return { output: `Aaaarrrrgggghhhh!`, query: mainZork }; }

                    if (command === `look`) {
                        if (target === `house`) {
                            return {
                                output: `You are standing in an open field west of a white house, with a boarded front door.`,
                                query: mainZork,
                            };
                        }
                    }

                    if (command === `open`) {
                        if (target === `mailbox`) {
                            return {
                                output: `Opening the small mailbox reveals a leaflet`,
                                query: mainZork,
                            };
                        }
                    }

                    return {
                        output: `${randomBinary(512)}
                        ****  You have died  ****
                        ...bzzz...The magnetic tape drive is smoking...
                    ` };
                },
            };

            return {
                output: `West of House
            You are standing in an open field west of a white house, with a boarded front door.
            There is a small mailbox here.`,
                query: mainZork,
            };
        },
    };

    const files: ConFile[] = [
        {
            session: `user`, path: `/`, name: `Readme.md`,
            content: `
                Yes, this is cool!
                Look, I created my own blog!
                ## Hidden Stuff
                I'm going to store some things here so I don't forget.`,
        }, {
            session: `user`, path: `/`, name: `passwords.txt`,
            content: `
                test1
                password
                12345678
                asdf
                qwerty
                1234567890
                admin
                friend
                test1234
                1234567
                Aa123456.
                p@55w0rd`,
        }, {
            session: `user`, path: `/`, name: `admin.sh`,
            content: `ssh admin@192.168.0.1`,
            execute: () => ({
                output: `Please Enter Password`,
                query: {
                    prompt: `doors@durin>`,
                    respond: ({ command }) => {
                        if (command === `friend`) {
                            enterSession(`admin`);
                            return {
                                output: `Logging into ${sessions.admin.machineName}`,
                            };
                        }
                        return {
                            output: `Incorrect Password`,
                        };
                    },
                },
            }),
        }, {
            session: `admin`, path: `/`, name: `bitcoin_wallet_backup.dat`,
            content: `E9873D79C6D87DC0FB6A57786389F4453213303DA61F20BD67FC233AA33262`,
        }, {
            session: `admin`, path: `/`, name: `keepass.kdb`,
            content: `${randomBinary(1024)}`,
        },// 

        zork,
    ];

    type ConCommandResult = { output?: string, prompt?: string, quit?: boolean };
    const standardPrompt = (): ConCommandResult => {
        return { prompt: `${sessions[state.session].machineName}${state.directory.replace(/\/$/g, ``)}>` };
    };

    const processAction = (action: ConAction): ConCommandResult => {
        if (!action) {
            state = { ...state, activeAction: null };
            return standardPrompt();
        }
        if (action.query) {
            state = { ...state, activeAction: action };
            return { output: action.output, prompt: action.query.prompt };
        }

        state = { ...state, activeAction: null };
        return {
            ...standardPrompt(),
            output: action.output,
        };
    };

    const onCommand = (commandRaw: string): ConCommandResult => {
        const commandLower = commandRaw.toLowerCase().trim();
        const iSpace = commandLower.indexOf(` `);
        const command = iSpace >= 0 ? commandLower.slice(0, iSpace).trim() : commandLower.trim();
        const target = iSpace >= 0 ? commandLower.slice(iSpace).trim() : ``;
        const input: ConInput = { raw: commandRaw, lower: commandLower, command, target };

        // Process any active actions
        if (state.activeAction) {
            const a = state.activeAction;
            if (a.query) {
                const action = a.query.respond(input);
                return processAction(action);
            }
        }

        // Process OS level commands
        if (command === `exit`) {
            if (exitSession()) {
                return standardPrompt();
            }
            return { quit: true };
        }

        const dirFiles = files.filter(x => x.session === state.session && x.path === state.directory);

        if (command === `dir` || command === `ls`) {
            return { output: dirFiles.map(x => x.name).join(`\n`), ...standardPrompt() };
        }

        if (command.startsWith(`open`)
            || command.startsWith(`read`)
            || command.startsWith(`cat`)
            || command.startsWith(`echo`)
        ) {
            const file = dirFiles.find(x => x.name.toLowerCase().startsWith(target));
            if (file) {
                return {
                    output: file.content,
                };
            }

            return { output: `${command}: ${target}: No such file or directory` };
        }

        const file = dirFiles.find(x => x.name.toLowerCase().startsWith(command));
        if (file && file.execute) {
            const action = file.execute();
            return processAction(action);
        }

        return { output: `${command}: command not found` };
    };

    return {
        onCommand,
    };

};
