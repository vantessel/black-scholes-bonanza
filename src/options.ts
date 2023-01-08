import { normalCdf, normalPdf } from './stats';

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

/**
 * Vanilla call or put option
 * At expiry, a call pays `max(0, spot - strike)` while a put pays `max(0, strike - spot)`
 */
export class VanillaOption extends BaseOption {
    getPayoff(spot: number): number {
        return Math.max(0, (spot - this.strike) * this.callFlag);
    }

    getPrice(spot: number): number {
        const [d1, d2] = this.getDs(spot);
        return (
            this.callFlag *
            (spot * normalCdf(this.callFlag * d1) -
                Math.exp(-this.rate * this.time) * this.strike * normalCdf(this.callFlag * d2))
        );
    }

    getDelta(spot: number): number {
        const [d1] = this.getDs(spot);
        return this.isCall ? normalCdf(d1) : normalCdf(d1) - 1;
    }

    getGamma(spot: number): number {
        const [d1] = this.getDs(spot);
        return normalPdf(d1) / (spot * this.vol * Math.sqrt(this.time));
    }

    getVega(spot: number): number {
        const [d1] = this.getDs(spot);
        return spot * normalPdf(d1) * Math.sqrt(this.time);
    }

    getTheta(spot: number): number {
        const [d1, d2] = this.getDs(spot);
        return -(
            (-spot * normalPdf(d1) * this.vol) / (2 * Math.sqrt(this.time)) -
            this.callFlag * this.rate * this.strike * Math.exp(-this.rate * this.time) * normalCdf(this.callFlag * d2)
        );
    }

    getRho(spot: number): number {
        const [, d2] = this.getDs(spot);
        return (
            this.callFlag * this.strike * this.time * Math.exp(-this.rate * this.time) * normalCdf(this.callFlag * d2)
        );
    }
}

/**
 * Digital call or put option, also known as Binary option or Cash-or-Nothing option.
 * At expiry, a digital call pays `spot >= strike ? 1 : 0` while a digital put pays `spot <  strike ? 1 : 0`
 * For convention, the `=` is paid only for the call
 */
export class DigitalOption extends BaseOption {
    getPayoff(spot: number): number {
        return (this.isCall ? spot >= this.strike : spot < this.strike) ? 1 : 0;
    }

    getPrice(spot: number): number {
        const [, d2] = this.getDs(spot);
        return Math.exp(-this.rate * this.time) * normalCdf(this.callFlag * d2);
    }

    getDelta(spot: number): number {
        const [, d2] = this.getDs(spot);
        return (
            ((this.callFlag * Math.exp(-this.rate * this.time)) / (spot * this.vol * Math.sqrt(this.time))) *
            normalPdf(d2)
        );
    }

    getGamma(spot: number): number {
        const [d1, d2] = this.getDs(spot);
        return (
            ((-this.callFlag * Math.exp(-this.rate * this.time)) / ((spot * this.vol) ** 2 * this.time)) *
            d1 *
            normalPdf(d2)
        );
    }

    getVega(spot: number): number {
        const [d1, d2] = this.getDs(spot);
        return ((-this.callFlag * Math.exp(-this.rate * this.time)) / this.vol) * d1 * normalPdf(d2);
    }

    getTheta(spot: number): number {
        const [, d2] = this.getDs(spot);
        return (
            -Math.exp(-this.rate * this.time) *
            ((this.callFlag *
                normalPdf(d2) *
                (Math.log(spot / this.strike) - (this.rate - this.vol ** 2 / 2) * this.time)) /
                (2 * this.vol * this.time * Math.sqrt(this.time)) +
                this.rate * normalCdf(this.callFlag * d2))
        );
    }

    getRho(spot: number): number {
        const [, d2] = this.getDs(spot);
        return (
            Math.exp(-this.rate * this.time) *
            (((this.callFlag * Math.sqrt(this.time)) / this.vol) * normalPdf(d2) -
                this.time * normalCdf(this.callFlag * d2))
        );
    }
}
