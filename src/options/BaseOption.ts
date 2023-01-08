import { normalCdf, normalPdf } from '../stats';

export abstract class BaseOption {
    callFlag: number;

    /**
     * @param vol the implied volatility
     * @param rate the interest rate
     * @param time time to expiry in years
     * @param strike the strike price
     * @param isCall whether is a call option (`true`) or put option (`false`)
     */
    constructor(
        public vol: number,
        public rate: number,
        public time: number,
        public strike: number,
        public isCall: boolean
    ) {
        this.callFlag = isCall ? 1 : -1;
    }

    protected getDs(spot: number): [number, number] {
        const sqrtT = this.vol * Math.sqrt(this.time);
        const d1 = (Math.log(spot / this.strike) + (this.rate + 0.5 * this.vol ** 2) * this.time) / sqrtT;
        const d2 = d1 - sqrtT;

        return [d1, d2];
    }

    /**
     * @param spot the current spot price
     * @returns the final payoff of the option for a given spot price
     */
    abstract getPayoff(spot: number): number;

    /**
     * @param spot the current spot price
     * @returns the price of the option
     */
    abstract getPrice(spot: number): number;

    /**
     * @param spot the current spot price
     * @returns the delta of the option, i.e. the sensitivity of the price with respect to the spot
     */
    abstract getDelta(spot: number): number;

    /**
     * @param spot the current spot price
     * @returns the gamma of the option, i.e. the sensitivity of the delta with respect to the spot
     */
    abstract getGamma(spot: number): number;

    /**
     * @param spot the current spot price
     */
    abstract getVega(spot: number): number;

    /**
     * @param spot the current spot price
     * @returns the theta of the option, i.e. the sensitivity of the price with respect to time. Note this is positive for convention
     */
    abstract getTheta(spot: number): number;

    /**
     * @param spot the current spot price
     * @returns the rho of the option, i.e. the sensitivity of the price with respect to the interest rate
     */
    abstract getRho(spot: number): number;
}
