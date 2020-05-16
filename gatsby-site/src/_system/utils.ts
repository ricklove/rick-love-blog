/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { dirname, resolve as resolvePath } from 'path';
import { promisify } from 'util';

export { resolvePath };

const _mkdir = promisify(fs.mkdir);
const _readFile = promisify(fs.readFile);
const _writeFile = promisify(fs.writeFile);

export const readFile = async (path: string) => _readFile(path, { encoding: `utf-8` });
export const writeFile = async (path: string, data: string | Buffer) => {
    await _mkdir(dirname(path), { recursive: true });
    await _writeFile(path, data, { encoding: `utf-8` });
};

export const watchForFileChanges = async (pathRoot: string, processFiles: (changedFiles: string[]) => Promise<void>) => {

    const state = {
        isRunning: false,
        changedFiles: {} as { [path: string]: boolean },
        gitIgnoreFileGroups: [] as { sourcePath: string, destintionFilePaths: string[] }[],
    };

    fs.watch(pathRoot, { recursive: true, persistent: true }, async (event, filename) => {
        // Ignore file changes while running
        if (state.isRunning) { return; }

        // Debounce and collect files changes (if not running yet)
        state.changedFiles[filename] = true;
        await delay(250);

        if (state.isRunning) { return; }
        state.isRunning = true;

        const { changedFiles } = state;
        state.changedFiles = {};
        await processFiles(Object.keys(changedFiles));
        state.isRunning = false;
    });

};

export async function delay(timeout: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}
