import { expect } from 'chai';
import fixtureCompare, {
  setFixturesDir,
  inputMatchesFile,
} from '../src';
import path from 'path';

setFixturesDir(path.join(__dirname, 'fixtures'));

describe('inputMatchesFile', () => {
  it('should throw if file is not found', () => {
    const input = 'some string';
    const expectedResult = 'does/not/exist'

    const fn = () => {
      inputMatchesFile(input, expectedResult);
    };

    expect(fn).to.throw('input file not found');
  });

  it('should return false if they do not match', () => {
    const input = 'some string';
    const expectedResult = 'foo/bar/baz'

    expect(inputMatchesFile(input, expectedResult))
      .to.equal(false);
  });

  it('should return true if they match', () => {
    const input = 'a different string\n';
    const expectedResult = 'foo/bar/baz'

    expect(inputMatchesFile(input, expectedResult))
      .to.equal(true);
  });
});

describe('input file and transform', () => {
  it('should throw if input file is not found', () => {
    const inputFilePath = 'does/not/exist';
    const transform = (text) => {
      return text.split('').reverse();
    };

    const fn = () => {
      fixtureCompare(inputFilePath, transform);
    };

    expect(fn).to.throw('input file not found');
  });

  it('should throw if output file is not found', () => {
    const inputFilePath = 'no-output';
    const transform = (text) => {
      return text.split('').reverse().join('');
    };

    const fn = () => {
      fixtureCompare(inputFilePath, transform);
    };

    expect(fn).to.throw('output file not found');
  });

  it('should return false if they do not match', () => {
    const inputFilePath = 'some/file';
    const transform = (text) => {
      return text.split('').reverse().join('');
    };

    expect(fixtureCompare(inputFilePath, transform))
      .to.equal(false);
  });

  it('should return true if they match', () => {
    const inputFilePath = 'some/file2';
    const transform = (text) => {
      return text.split('').reverse().join('');
    };

    expect(fixtureCompare(inputFilePath, transform))
      .to.equal(true);
  });
});

describe('input file, transform, and output file', () => {
  it('should throw if input file is not found', () => {
    const inputFilePath = 'does/not/exist';
    const transform = (text) => {
      return text.split('').reverse();
    };
    const outputFilePath = 'does/not/exist';

    const fn = () => {
      fixtureCompare(inputFilePath, transform, outputFilePath);
    };

    expect(fn).to.throw('input file not found');
  });

  it('should throw if output file is not found', () => {
    const inputFilePath = 'some/file';
    const transform = (text) => {
      return text.split('').reverse();
    };
    const outputFilePath = 'does/not/exist';

    const fn = () => {
      fixtureCompare(inputFilePath, transform, outputFilePath);
    };

    expect(fn).to.throw('output file not found');
  });

  it('should return false if they do not match', () => {
    const inputFilePath = 'some/file';
    const transform = (text) => text;
    const outputFilePath = 'some/file2.output';

    expect(fixtureCompare(inputFilePath, transform, outputFilePath))
      .to.equal(false);
  });

  it('should return true if they match', () => {
    const inputFilePath = 'some/file';
    const transform = (text) => {
      return text.split('').reverse().join('');
    };
    const outputFilePath = 'some/file2.output';

    expect(fixtureCompare(inputFilePath, transform, outputFilePath))
      .to.equal(true);
  });
});
