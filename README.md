# fixture-compare

Compare test fixtures with each other, with strings, and against the results of
transforms.

[![Build Status](https://travis-ci.org/reergymerej/fixture-compare.svg?branch=master)](https://travis-ci.org/reergymerej/fixture-compare)

### Specify Fixtures Directory

By default, paths to fixtures are assumed to be relative to `{cwd}/test/fixtures`.
To specify another directory...

```js
import {setFixturesDir} from 'fixture-compare';
setFixturesDir(path.join(__dirname, 'somewhere/else'));
```

### Compare a String to a Fixture

```js
import {inputMatchesFile} from 'fixture-compare';
const input = 'some string';
const fixture = 'result.txt'
inputMatchesFile(input, fixture);
```


### Run a Fixture Through a Transform

Loads a fixture, runs it through a transform, then compares the results to a
fixture with the same name, appended with `.output`.

```js
import fixtureCompare from 'fixture-compare';
const fixture = 'test-1';
const transform = (text) => text.split('').reverse();
fixtureCompare(fixture, transform);
```

### Run a Fixture Through a Transform, Specify Result Fixture

Same as the previous example, but allows you to specify a different output file.

```js
import fixtureCompare from 'fixture-compare';
const input = 'test-2';
const output = 'test-2.result';
const transform = (text) => text.split('').reverse();
fixtureCompare(input, transform, output);
```






---
kickstarted by [npm-boom][npm-boom]

[npm-boom]: https://github.com/reergymerej/npm-boom
