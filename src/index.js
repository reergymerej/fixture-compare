import fs from 'fs';
import path from 'path';
import * as compareWithFile from 'compare-with-file';

let fixturesDir = path.join(process.cwd(), 'test/fixtures');

function getAbsolutePath(relativePath) {
  return path.join(fixturesDir, relativePath);
}

function readInputFile(input) {
  const inputAbsolutePath = getAbsolutePath(input);
  try {
    return fs.readFileSync(inputAbsolutePath, 'utf8');
  } catch (e) {
    if (e.code === 'ENOENT') {
      throw new Error('input file not found');
    }
  }
}

export function setFixturesDir(dir) {
  fixturesDir = dir;
}

export function setLogging(on) {
  compareWithFile.setLogging(on);
}

/**
* Compare string to contents of file.
* @param {String} input
* @param {String} file - path of file to compare against
* @return {Boolean}
*/
export function inputMatchesFile(input, file) {
  try {
    return compareWithFile.fileMatches(getAbsolutePath(file), input);
  } catch (e) {
    if (e.code === 'ENOENT') {
      throw new Error('input file not found');
    }
  }
}

export default function compare(inputFilePath, transform, outputFilePath) {
  const input = readInputFile(inputFilePath);
  const inputAbsolutePath = getAbsolutePath(inputFilePath);
  const outputAbsolutePath = outputFilePath
    ? getAbsolutePath(outputFilePath)
    : `${inputAbsolutePath}.output`;

  try {
    return compareWithFile.fileMatches(outputAbsolutePath, transform(input));
  } catch (e) {
    if (e.code === 'ENOENT') {
      throw new Error('output file not found');
    }
  }
}
