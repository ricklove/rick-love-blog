export const artMan = {
    art: `
|---------------------------------------|
|                       @@@@@@@         |
|                     @@@@@@@@@@@@      |
|                   @@@@@@@@@@@@@@@     |
|------,-|           |C>   @@ )@@@@@    |
|    ,','|          /    @@ ,'@@@@@@    |
|--,','##|         (,    @@   @@@@@     |
|  ||####|          O'  @@@@@@@'''|     |
|  ||####|           @@@@@@@     _|     |
|  ||####|______      @@@@@|____/ |     |
|  ||####|     ,|         _/_____/ |    |
|  ||##,'    ,' |        /          |   |
|  ||,'    ,'   |       |         |  |  |
|__|/    ,'  *  |      /           | |  |
|______,'  *   ,',_____|      |    | |  |
|      | *   ,',' FFF--|      |    | |  |
|      |   ,','    ____|_____/    /  |  |
|      | ,','  __/ |             /   |  |
|______|','   FFF_/-------------/    ;  |
|       |===========,'  '=||=====||=/   |
|---------------------------------------|
`, autoAnimate: {
        fps: 5,
        replacements: [
            // Screen
            ...`,.;:'"[]{}()<>!@~&|`.split(``).map(x => ({ find: `#`, replace: x, ratio: 0.01 })),
            { find: `#`, replace: ` `, ratio: 1 },
            // Activity Lights
            { find: `\\*`, replace: `.`, ratio: 0.5 },
            { find: `\\*`, replace: ` `, ratio: 1 },
            // Fingers
            { find: `F`, replace: `|`, ratio: 0.3 },
            { find: `F`, replace: `/`, ratio: 1 },

            // Eyes
            { find: `C`, replace: `-`, ratio: 0.2 },
            // Mouth
            { find: `O`, replace: `>`, ratio: 0.2 },
            { find: `O`, replace: `}`, ratio: 1 },

            // Hair
            // { find: `@`, replace: `/`, ratio: 0.01 },
            // { find: `@`, replace: `|`, ratio: 1 },
        ],
    },
};


export const artMap = `
|---------------------------------------|
|       ,_  . ._ _                      |
|     , -|,'|~~       ;-'  _-'   ;_  ~  |
| /-|'~'-'|~~|',  ,  /  /~|_|_~/   -~~-_|
| ~'~     '-,|'| ' ,|/'~         /  _ / |
|.~  |      ''|~|  _|    ,_ ,       /   |
|    '|      /~    |_~||,,~ |      ,    |
|      |  _-|        _ ~|| |_     /     |
| .     | , ~_    '/      |_' | /|~     |
|       ~_'       |       -,  |'/       |
|        '|_,'|    | ,    /'     ~ ,.   |
|          /  |_    ~|   /       , ~| ' |
|         |    ,      | |'|/     |   |  |
|         ,   ,/      | /         --/   |
|          | ,'        '                |
|          /,'                          |
|          '| ~                         |
|           ~'                          |
|---------------------------------------|
`;

export const artYouDead = {
    art: `
|---------------------------------------|
|^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^|
|^^^^^^^^.----------------.^^^^^^^^^^^^^|
|^^^^^^^^|  You have died |^^^^^^^^^^^^^|
|^^^^^^^^'----------------'^^^^^^^^^^^^^|
|^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^|
|^^^^^^^^^^^^^..----..^^^^^^^^^^^^^^^^^^|
|^^^^^^^^^.--''******''--.^^^^^^^^^^^^^^|
|^^^^^^^^|****************|^^^^^^^^^^^^^|
|^^^^^^^^|****************|^^^^^_---_^^^|
|^^^^^^^^|****  DORK  ****|^^^^'^^|{)'^^|
|^^^^^^^^|****************|^^^^^^^|/|^^^|
|^^^^^^^^|****************|^^^^^^^^^|^^^|
|........|****************|---------|---|
|........|****************|......../|...|
|........|****************|.............|
|........|****************|.............|
|........|----------------|.............|
|.......................................|
|.......................................|
|---------------------------------------|
`, autoAnimate: {
        fps: 5,
        replacements: [
            { find: `\\^`, replace: `'`, ratio: 0.1 },
            { find: `\\^`, replace: ` `, ratio: 1 },
        ],
    },
};
