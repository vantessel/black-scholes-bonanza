import { VanillaOption } from '../options';
import { Strategy } from './Strategy';

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
