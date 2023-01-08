import { BaseOption } from '../options';
import { sumProduct } from '../utils';

/**
 * A strategy is a linear combination of options
 */
export abstract class Strategy {
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
