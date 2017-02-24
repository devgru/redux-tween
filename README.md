# Redux Tween

> Tween store state.

> Library is in pre-release.

<img src="https://raw.githubusercontent.com/devgru/redux-tween/master/counter.gif" alt="Counter Demo" width="120">

Redux Tween provides a way to change state in Redux store smoothly, interpolating states in between.

To achieve it Redux Tween wraps action creators and a reducer (i.e. whole [duck](https://github.com/erikras/ducks-modular-redux)).

## How it works

Redux Tween uses wrapped reducer to calculate next state. Instead of immediately applying new state, Redux Tween launches timer which pushes new interpolated states on every frame.

Redux Tween uses [d3-transition](https://github.com/d3/d3-transition) to start and interrupt transitions. Redux Tween allows running one transition per reducer, interrupting previous transition if necessary.

Redux Tween uses [d3-interpolate](https://github.com/d3/d3-interpolate) which allows interpolating between numbers, strings, colors, dates. Most importantly, it supports objects and arrays interpolation so you can interpolate custom nested data structures (even the store itself).

## Installing

```sh
$ yarn add redux-tween
# or
$ npm install --save redux-tween
```

## Integration and usage

- [Basic](./docs/BASIC.md), store-based integration.
- [Advanced](./docs/ADVANCED.md), per-reducer integration.


## API Reference

Is [here](./docs/API.md).

## Running examples

```sh
$ cd examples
$ yarn
$ yarn start
```

## TODO

- Wait for [d3-interpolate/34](https://github.com/d3/d3-interpolate/pull/34) PR is accepted so it is possible to tween things like Redux Router history;
- Add benchmarks;
- Add basic/advanced integrations comparison;
- More tests;
- More examples;
- Check for corner cases;
- Rewrite in TS.

## Development

Your input is highly appreciated.

This library is experimental and I'd be happy to help you integrating Redux Tween into other software.

To play with library, follow these steps:

* Install dependencies: `yarn`;
* Develop;
* Run tests: `yarn test`;
* Build `yarn build`;

## License

MIT © [Dmitriy Semyushkin](https://devg.ru)
