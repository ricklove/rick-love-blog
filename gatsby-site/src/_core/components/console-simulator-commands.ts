/* eslint-disable unicorn/consistent-function-scoping */
export const createConsoleCommands = (initialDirectory: string) => {

    const state = {
        isAdmin: false,
        isAdminLogin: false,
    };

    const onCommand = (commandRaw: string): { output: string, dir?: string } => {
        const iSpace = commandRaw.indexOf(` `);
        const command = iSpace >= 0 ? commandRaw.slice(0, iSpace).trim() : commandRaw.trim();
        const target = iSpace >= 0 ? commandRaw.slice(iSpace).trim() : ``;

        if (state.isAdminLogin) {
            if (command === `friend`) {
                state.isAdminLogin = false;
                state.isAdmin = true;
                return {
                    output: `
                    Logging into admin...
                    `,
                    dir: `admin@vm`,
                };
            }

            state.isAdminLogin = false;
            return { output: `Incorrect Password` };
        }

        if (command === `exit`) {
            if (state.isAdmin) {
                state.isAdmin = false;
                return {
                    output: `
                    Logging out...
                `,
                    dir: initialDirectory,
                };
            }

            return {
                output: `
                Readme.md
                passwords.txt
                admin.sh
                zork
            `};
        }


        if (command === `dir` || command === `ls`) {
            if (state.isAdmin) {
                return {
                    output: `
                    bitcoin_wallet_backup.dat
                    keepass.kdb
                `};
            }

            return {
                output: `
                Readme.md
                passwords.txt
                admin.sh
                zork
            `};
        }

        if (command === `admin.sh` || command === `admin`) {
            state.isAdminLogin = true;
            return {
                output: `
            Please Enter Password
            `,
                dir: `doors@durin`,
            };
        }

        if (command === `zork`) {
            return {
                output: `
            West of House
            You are standing in an open field west of a white house, with a boarded front door.
            There is a small mailbox here.
            
            ...
            `};
        }

        if (command.startsWith(`open`)
            || command.startsWith(`read`)
            || command.startsWith(`cat`)
            || command.startsWith(`echo`)
        ) {

            if (state.isAdmin) {
                if (target === `bitcoin_wallet_backup.dat` || target === `bitcoin_wallet_backup`) {
                    return {
                        output: `
                        E9873D79C6D87DC0FB6A577863_3389F4453213303DA61F20BD67FC233AA33262
                    `};
                }
            }
            else {
                if (target === `passwords.txt` || target === `passwords`) {
                    return {
                        output: `
                    test1
                    password
                    12345678
                    asdf
                    qwerty
                    1234567890
                    test1234
                    1234567
                    Aa123456.
                    p@55w0rd
                    admin
                    friend
                `};
                }

                if (target === `readme.md` || target === `readme`) {
                    return {
                        output: `
                    Yes, this is cool!

                    Look, I created my own blog!

                    ## Hidden Stuff

                    I'm going to store some things here so I don't forget it.
                `};
                }
            }

            return { output: `${command}: ${target}: No such file or directory` };
        }

        return { output: `${command}: command not found` };
    };

    return {
        onCommand,
    };

};
