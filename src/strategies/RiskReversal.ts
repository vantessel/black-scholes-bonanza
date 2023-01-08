import { VanillaOption } from '../options';
import { Strategy } from './Strategy';

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
