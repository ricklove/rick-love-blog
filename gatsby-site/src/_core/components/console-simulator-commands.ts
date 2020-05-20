/* eslint-disable unicorn/consistent-function-scoping */
export const createConsoleCommands = () => {

    const onCommand = (commandRaw: string): string => {
        const iSpace = commandRaw.indexOf(` `);
        const command = iSpace >= 0 ? commandRaw.slice(0, iSpace).trim() : commandRaw.trim();
        const target = iSpace >= 0 ? commandRaw.slice(iSpace).trim() : ``;

        if (command === `dir` || command === `ls`) {
            return `
                Readme.md
                passwords.txt
                admin.sh
                zork
            `;
        }

        if (command === `zork`) {
            return `
            West of House
            You are standing in an open field west of a white house, with a boarded front door.
            There is a small mailbox here.
            
            ...
            `;
        }

        if (command.startsWith(`open`)
            || command.startsWith(`read`)
            || command.startsWith(`cat`)
            || command.startsWith(`echo`)
        ) {

            if (target === `passwords.txt` || target === `passwords`) {
                return `
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
                `;
            }

            if (target === `readme.md` || target === `readme`) {
                return `
                    Yes, this is cool!

                    Look, I created my own blog!

                    ## Hidden Stuff

                    I'm going to store some things here so I don't forget it.
                `;
            }

            return `${command}: ${target}: No such file or directory`;
        }

        return `${command}: command not found`;
    };

    return {
        onCommand,
    };

};
