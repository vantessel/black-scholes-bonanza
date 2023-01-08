import { VanillaOption } from '../options';
import { Strategy } from './Strategy';

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
