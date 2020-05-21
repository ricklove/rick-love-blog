export const randomBinary = (length: number) => String.fromCharCode(...[...new Array(length)].map(x => Math.random() * (126 - 32) + 32));
export const randomItem = <T>(items: T[]) => items[Math.floor(items.length * Math.random())];
