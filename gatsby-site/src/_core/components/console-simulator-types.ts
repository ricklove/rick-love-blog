export type ConCommandResult = { output?: string, prompt?: string, quit?: boolean, Component?: () => JSX.Element };

export type ConSessionName = 'user' | 'admin';
export type ConSession = { machineName: string };

export type ConInput = { raw: string, lower: string, command: string, target: string };

export type ConActionQuery = { prompt: string, respond: (input: ConInput) => ConAction };
export type ConAction = void | null | undefined | {
    output?: string;
    query?: ConActionQuery;
    Component?: () => JSX.Element;
};
export type ConFile = {
    session: ConSessionName;
    path: string;
    name: string;
    content: string;
    execute?: () => ConAction;
};
export type ConState = {
    readonly parent?: ConState;
    readonly session: ConSessionName;
    readonly directory: string;
    readonly activeAction?: ConAction;
};
