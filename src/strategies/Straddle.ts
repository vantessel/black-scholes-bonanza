import { VanillaOption } from '../options';
import { Strategy } from './Strategy';

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
