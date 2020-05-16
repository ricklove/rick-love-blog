/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { dirname } from 'path';
import { promisify } from 'util';

const _mkdir = promisify(fs.mkdir);
const _readFile = promisify(fs.readFile);
const _writeFile = promisify(fs.writeFile);

export const readFile = async (path: string) => _readFile(path, { encoding: `utf-8` });
export const writeFile = async (path: string, data: string | Buffer) => {
    await _mkdir(dirname(path), { recursive: true });
    await _writeFile(path, data, { encoding: `utf-8` });
};
