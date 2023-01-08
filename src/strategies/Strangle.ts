import { VanillaOption } from '../options';
import { Strategy } from './Strategy';

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
