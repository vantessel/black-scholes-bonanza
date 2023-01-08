// `number` doesn't support this many digits

const RSQRT2PI = 0.3989422804014326779399460599343818684758586311649;

// NORMAL CDF COEFFICIENTS
const NA1 = 0.31938153;
const NA2 = -0.356563782;
const NA3 = 1.781477937;
const NA4 = -1.821255978;
const NA5 = 1.330274429;

// INVERSE NORMAL CDF COEFFICIENTS
const SPLIT1 = 0.425;
const SPLIT2 = 5.0;
const CONST1 = 0.180625;
const CONST2 = 1.6;

// Coefficients for P close to 0.5
const A0 = 3.387132872796366608;
const A1 = 1.3314166789178437745e2;
const A2 = 1.9715909503065514427e3;
const A3 = 1.3731693765509461125e4;
const A4 = 4.5921953931549871457e4;
const A5 = 6.7265770927008700853e4;
const A6 = 3.3430575583588128105e4;
const A7 = 2.5090809287301226727e3;
const B1 = 4.2313330701600911252e1;
const B2 = 6.871870074920579083e2;
const B3 = 5.3941960214247511077e3;
const B4 = 2.1213794301586595867e4;
const B5 = 3.930789580009271061e4;
const B6 = 2.8729085735721942674e4;
const B7 = 5.226495278852854561e3;

// Coefficients for P not close to 0, 0.5 or 1.
const C0 = 1.42343711074968357734;
const C1 = 4.6303378461565452959;
const C2 = 5.7694972214606914055;
const C3 = 3.64784832476320460504;
const C4 = 1.27045825245236838258;
const C5 = 2.4178072517745061177e-1;
const C6 = 2.27238449892691845833e-2;
const C7 = 7.7454501427834140764e-4;
const D1 = 2.05319162663775882187;
const D2 = 1.6763848301838038494;
const D3 = 6.8976733498510000455e-1;
const D4 = 1.4810397642748007459e-1;
const D5 = 1.51986665636164571966e-2;
const D6 = 5.475938084995344946e-4;
const D7 = 1.05075007164441684324e-9;

// Coefficients for P very close to 0 or 1
const E0 = 6.6579046435011037772;
const E1 = 5.4637849111641143699;
const E2 = 1.7848265399172913358;
const E3 = 2.9656057182850489123e-1;
const E4 = 2.6532189526576123093e-2;
const E5 = 1.2426609473880784386e-3;
const E6 = 2.71155556874348757815e-5;
const E7 = 2.01033439929228813265e-7;
const F1 = 5.9983220655588793769e-1;
const F2 = 1.3692988092273580531e-1;
const F3 = 1.48753612908506148525e-2;
const F4 = 7.868691311456132591e-4;
const F5 = 1.8463183175100546818e-5;
const F6 = 1.4215117583164458887e-7;
const F7 = 2.04426310338993978564e-15;

/**
 * Computes the PDF of a standard normal distribution
 * @param x a real number
 * @returns the PDF of x
 */
export const normalPdf = (x: number): number => {
    return RSQRT2PI * Math.exp(-0.5 * x ** 2);
};

/**
 * Computes the DF of a standard normal distribution
 * @param x a real number
 * @returns the CDF of x
 */
export const normalCdf = (x: number): number => {
    const K = 1.0 / (1.0 + 0.2316419 * Math.abs(x));

    const res = RSQRT2PI * Math.exp(-0.5 * x ** 2) * (K * (NA1 + K * (NA2 + K * (NA3 + K * (NA4 + K * NA5)))));

    return x > 0 ? 1 - res : res;
};

/**
 * Computes the inverse CDF of a standard normal distribution
 * @param p the probability, between (0, 1)
 * @returns x such that CDF(x) = p
 */
export const inverseNormalCdf = (p: number): number => {
    // from "Let's be Rational" by Jaeckel

    if (p <= 0 || p >= 1) {
        throw new Error('Quantiles should be in (0, 1)');
    }
    const u = p - 0.5;
    if (Math.abs(u) <= SPLIT1) {
        const r = CONST1 - u * u;
        return (
            (u * (((((((A7 * r + A6) * r + A5) * r + A4) * r + A3) * r + A2) * r + A1) * r + A0)) /
            (((((((B7 * r + B6) * r + B5) * r + B4) * r + B3) * r + B2) * r + B1) * r + 1.0)
        );
    } else {
        let r = Math.sqrt(-Math.log(u < 0.0 ? p : 1.0 - p));
        let ret;
        if (r < SPLIT2) {
            r = r - CONST2;
            ret =
                (((((((C7 * r + C6) * r + C5) * r + C4) * r + C3) * r + C2) * r + C1) * r + C0) /
                (((((((D7 * r + D6) * r + D5) * r + D4) * r + D3) * r + D2) * r + D1) * r + 1.0);
        } else {
            r = r - SPLIT2;
            ret =
                (((((((E7 * r + E6) * r + E5) * r + E4) * r + E3) * r + E2) * r + E1) * r + E0) /
                (((((((F7 * r + F6) * r + F5) * r + F4) * r + F3) * r + F2) * r + F1) * r + 1.0);
        }
        return u < 0.0 ? -ret : ret;
    }
};
