export const randomBinary = (length: number) => String.fromCharCode(...[...new Array(length)].map(x => Math.random() * (126 - 32) + 32));

export const randomIndex = (length: number) => { const x = Math.floor(length * Math.random()); return x >= length ? length - 1 : x; };
export const randomItem = <T>(items: T[]) => items[randomIndex(items.length)];

export const getValuesAsItems = <T>(obj: T) => {
    return Object.keys(obj).map(k => k as keyof typeof obj).map(k => obj[k]).filter(x => x);
};
