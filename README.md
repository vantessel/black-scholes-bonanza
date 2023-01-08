# black-scholes-bonanza

A library to deal with options and option strategies

## Install

```bash
npm i black-scholes-bonanza
```

## Features

Useful payoff calculations and pricing including [greeks](<https://en.wikipedia.org/wiki/Greeks_(finance)>), all computed using the [Black-Scholes](https://en.wikipedia.org/wiki/Black%E2%80%93Scholes_model) model.

### Options

-   Vanilla options
-   Digital options

### Strategies

-   Straddle
-   Strangle
-   Spreads
-   Risk Reversal
-   Butterfly

## Example

```js
const vol = 0.8; // implied volatility
const rate = 0.1; // interest rate
const time = 0.5; // time to expiry
const strike = 90; // strike price
const isCall = true; // call or put option
const spot = 100; // current spot price

const opt = new VanillaOption(vol, rate, time, strike, isCall);

opt.getPayoff(spot); // 10

opt.getPrice(spot); // 28.61

opt.getDelta(spot); // 0.71
opt.getGamma(spot); // 0.01
opt.getVega(spot); // 24.15
opt.getTheta(spot); // 23.57
opt.getRho(spot); // 21.26
```
