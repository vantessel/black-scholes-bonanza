import { normalCdf, normalPdf } from '../stats';
import { BaseOption } from './BaseOption';

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
