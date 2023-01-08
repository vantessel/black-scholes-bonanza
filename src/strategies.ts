import { BaseOption, VanillaOption } from './options';
import { sumProduct } from './utils';

/**
 * A strategy is a linear combination of options
 */
abstract class Strategy {
    protected abstract options: BaseOption[];
    protected abstract weights: number[];

    getPayoff(spot: number): number {
        return sumProduct(
            this.options.map((opt) => opt.getPayoff(spot)),
            this.weights
        );
    }

    getPrice(spot: number): number {
        return sumProduct(
            this.options.map((opt) => opt.getPrice(spot)),
            this.weights
        );
    }

    getDelta(spot: number): number {
        return sumProduct(
            this.options.map((opt) => opt.getDelta(spot)),
            this.weights
        );
    }

    getGamma(spot: number): number {
        return sumProduct(
            this.options.map((opt) => opt.getGamma(spot)),
            this.weights
        );
    }

    getVega(spot: number): number {
        return sumProduct(
            this.options.map((opt) => opt.getVega(spot)),
            this.weights
        );
    }

    getTheta(spot: number): number {
        return sumProduct(
            this.options.map((opt) => opt.getTheta(spot)),
            this.weights
        );
    }

    getRho(spot: number): number {
        return sumProduct(
            this.options.map((opt) => opt.getRho(spot)),
            this.weights
        );
    }
}

export class Straddle extends Strategy {
    options: [VanillaOption, VanillaOption];
    weights: [number, number];

    /**
     * A straddle is a strategy which combines a call and a put option with the same strike
     * @param vol the implied volatility
     * @param rate the interest rate
     * @param time time to expiry in years
     * @param strike the strike price
     */
    constructor(vol: number, rate: number, time: number, strike: number) {
        super();

        this.options = [
            new VanillaOption(vol, rate, time, strike, true),
            new VanillaOption(vol, rate, time, strike, false),
        ];
        this.weights = [1, 1];
    }
}

export class Strangle extends Strategy {
    options: [VanillaOption, VanillaOption];
    weights: [number, number];

    /**
     * A strangle is a strategy which combines a call and a put option with different strikes, with strike (put) < strike (call)
     * @param vols an array with two volatilities
     * @param rate the interest rate
     * @param time time to expiry in years
     * @param strikes an array with two strikes
     */
    constructor(vols: number[], rate: number, time: number, strikes: number[]) {
        super();

        this.options = [
            new VanillaOption(vols[0], rate, time, strikes[0], false),
            new VanillaOption(vols[1], rate, time, strikes[1], true),
        ];
        this.weights = [1, 1];
    }
}

export class Spread extends Strategy {
    options: [VanillaOption, VanillaOption];
    weights: [number, number];

    /**
     * A spread is a strategy which combines two calls or two puts with different strikes.
     * It can be either bullish (profit when spot goes up) or bearish (profit when spot goes down)
     * @param vols an array with two volatilities
     * @param rate the interest rate
     * @param time time to expiry in years
     * @param strikes an array with two strikes
     * @param isCall whether is a call spread (`true`) or put spread (`false`)
     * @param isBullish whether is a bullish spread (`true`) or bearish spread (`false`)
     */
    constructor(vols: number[], rate: number, time: number, strikes: number[], isCall: boolean, isBullish: boolean) {
        super();

        this.options = [
            new VanillaOption(vols[0], rate, time, strikes[0], isCall),
            new VanillaOption(vols[1], rate, time, strikes[1], isCall),
        ];
        this.weights = isBullish ? [1, -1] : [-1, 1];
    }
}

export class RiskReversal extends Strategy {
    options: [VanillaOption, VanillaOption];
    weights: [number, number];

    /**
     * A risk reversal (or RR) is a strategy which combines a long call and short put or a long put and short call and has similar payoff as holding the spot
     * It can be either bullish (profit when spot goes up) or bearish (profit when spot goes down)
     * @param vols an array with two volatilities
     * @param rate the interest rate
     * @param time time to expiry in years
     * @param strikes an array with two strikes
     * @param isBullish whether is a bullish spread (`true`) or bearish spread (`false`)
     */
    constructor(vols: number[], rate: number, time: number, strikes: number[], isBullish: boolean) {
        super();

        this.options = [
            new VanillaOption(vols[0], rate, time, strikes[0], false),
            new VanillaOption(vols[1], rate, time, strikes[1], true),
        ];
        this.weights = isBullish ? [-1, 1] : [1, -1];
    }
}

export class Butterfly extends Strategy {
    options: [VanillaOption, VanillaOption, VanillaOption];
    weights: [number, number, number];

    /**
     * A butterfly (or "fly") is a strategy which combines two long positions at the tails and a 2x short position in the middle
     * @param vols an array with three volatilies
     * @param rate the interest rate
     * @param time time to expiry in years
     * @param strikes an array with three strikes
     * @param isCall whether is a call fly (`true`) or put fly (`false`)
     */
    constructor(vols: number[], rate: number, time: number, strikes: number[], isCall: boolean) {
        super();

        this.options = [
            new VanillaOption(vols[0], rate, time, strikes[0], isCall),
            new VanillaOption(vols[1], rate, time, strikes[1], isCall),
            new VanillaOption(vols[2], rate, time, strikes[2], isCall),
        ];
        this.weights = [1, -2, 1];
    }
}
