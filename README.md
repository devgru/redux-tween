# Redux Tween

> Tween store state.
>
> Library is experimental and may not meet your expectations.
>
> If you need a simple way to animate several parameters in React-based elements try [Jeremy Stucki's approach](https://bl.ocks.org/herrstucki/27dc76b6f8411b4725bb) using well-known [React Motion](https://github.com/chenglou/react-motion) library.

<img src="https://raw.githubusercontent.com/devgru/redux-tween/master/counter.gif" alt="Counter Demo" width="120">

Redux Tween provides a way to change state in Redux store smoothly, interpolating states in between.

To achieve this Redux Tween either enhances store or wraps some of action creators and reducers (i.e. some of your [ducks](https://github.com/erikras/ducks-modular-redux)).

## How it works

Redux Tween uses wrapped reducer to calculate next state. Instead of immediately applying new state, Redux Tween launches transition to push interpolated states on every frame.

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
$ cd examples/store
$ # or
$ cd examples/action-and-reducer
$ yarn
$ yarn start
```

## TODO

- Add basic/advanced integrations comparison;
- More tests;
- Better examples;
- Improve examples and dependencies organization (300 MiB is too much);
- Check for corner cases;
- Rewrite in TS.

## Development

Your input is highly appreciated.

This library is experimental, bug reports and PRs are welcome. I'd be happy to help you integrating Redux Tween into other software.

To modify library, follow these steps:

* Install dependencies: `yarn`;
* Develop;
* Run tests: `yarn test`;
* Build `yarn build`.

## License

MIT © [Dmitriy Semyushkin](https://devg.ru)
