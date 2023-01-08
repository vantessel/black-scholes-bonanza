import { normalCdf, normalPdf } from '../stats';
import { BaseOption } from './BaseOption';

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
