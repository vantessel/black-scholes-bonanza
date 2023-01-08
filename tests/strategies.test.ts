import { Butterfly, RiskReversal, Spread, Straddle, Strangle, VanillaOption } from '../src';

test('Straddle', () => {
    const vol = 0.8;
    const rate = 0.1;
    const time = 0.5;
    const strike = 100;
    const spot = 100;

    const strat = new Straddle(vol, rate, time, strike);
    const put = new VanillaOption(vol, rate, time, strike, false);
    const call = new VanillaOption(vol, rate, time, strike, true);

    expect(strat.getPayoff(80)).toBe(put.getPayoff(80) + call.getPayoff(80));
    expect(strat.getPayoff(120)).toBe(put.getPayoff(120) + call.getPayoff(120));

    expect(strat.getPrice(spot)).toBeCloseTo(put.getPrice(spot) + call.getPrice(spot), 4);
    expect(strat.getDelta(spot)).toBeCloseTo(put.getDelta(spot) + call.getDelta(spot), 4);
    expect(strat.getGamma(spot)).toBeCloseTo(put.getGamma(spot) + call.getGamma(spot), 4);
    expect(strat.getVega(spot)).toBeCloseTo(put.getVega(spot) + call.getVega(spot), 4);
    expect(strat.getTheta(spot)).toBeCloseTo(put.getTheta(spot) + call.getTheta(spot), 4);
    expect(strat.getRho(spot)).toBeCloseTo(put.getRho(spot) + call.getRho(spot), 4);
});

test('Strangle', () => {
    const vols = [0.8, 0.9];
    const rate = 0.1;
    const time = 0.5;
    const strikes = [90, 110];
    const spot = 100;

    const strat = new Strangle(vols, rate, time, strikes);
    const put = new VanillaOption(vols[0], rate, time, strikes[0], false);
    const call = new VanillaOption(vols[1], rate, time, strikes[1], true);

    expect(strat.getPayoff(80)).toBe(put.getPayoff(80) + call.getPayoff(80));
    expect(strat.getPayoff(120)).toBe(put.getPayoff(120) + call.getPayoff(120));

    expect(strat.getPrice(spot)).toBeCloseTo(put.getPrice(spot) + call.getPrice(spot), 4);
    expect(strat.getDelta(spot)).toBeCloseTo(put.getDelta(spot) + call.getDelta(spot), 4);
    expect(strat.getGamma(spot)).toBeCloseTo(put.getGamma(spot) + call.getGamma(spot), 4);
    expect(strat.getVega(spot)).toBeCloseTo(put.getVega(spot) + call.getVega(spot), 4);
    expect(strat.getTheta(spot)).toBeCloseTo(put.getTheta(spot) + call.getTheta(spot), 4);
    expect(strat.getRho(spot)).toBeCloseTo(put.getRho(spot) + call.getRho(spot), 4);
});

test('Bull Call Spread', () => {
    const vols = [0.8, 0.9];
    const rate = 0.1;
    const time = 0.5;
    const strikes = [90, 110];
    const spot = 100;
    const isCall = true;
    const isBullish = true;

    const strat = new Spread(vols, rate, time, strikes, isCall, isBullish);
    const opt1 = new VanillaOption(vols[0], rate, time, strikes[0], isCall);
    const opt2 = new VanillaOption(vols[1], rate, time, strikes[1], isCall);

    expect(strat.getPayoff(80)).toBe(opt1.getPayoff(80) - opt2.getPayoff(80));
    expect(strat.getPayoff(120)).toBe(opt1.getPayoff(120) - opt2.getPayoff(120));

    expect(strat.getPrice(spot)).toBeCloseTo(opt1.getPrice(spot) - opt2.getPrice(spot), 4);
    expect(strat.getDelta(spot)).toBeCloseTo(opt1.getDelta(spot) - opt2.getDelta(spot), 4);
    expect(strat.getGamma(spot)).toBeCloseTo(opt1.getGamma(spot) - opt2.getGamma(spot), 4);
    expect(strat.getVega(spot)).toBeCloseTo(opt1.getVega(spot) - opt2.getVega(spot), 4);
    expect(strat.getTheta(spot)).toBeCloseTo(opt1.getTheta(spot) - opt2.getTheta(spot), 4);
    expect(strat.getRho(spot)).toBeCloseTo(opt1.getRho(spot) - opt2.getRho(spot), 4);
});

test('Bear Call Spread', () => {
    const vols = [0.8, 0.9];
    const rate = 0.1;
    const time = 0.5;
    const strikes = [90, 110];
    const spot = 100;
    const isCall = true;
    const isBullish = false;

    const strat = new Spread(vols, rate, time, strikes, isCall, isBullish);
    const opt1 = new VanillaOption(vols[0], rate, time, strikes[0], isCall);
    const opt2 = new VanillaOption(vols[1], rate, time, strikes[1], isCall);

    expect(strat.getPayoff(80)).toBe(-opt1.getPayoff(80) + opt2.getPayoff(80));
    expect(strat.getPayoff(120)).toBe(-opt1.getPayoff(120) + opt2.getPayoff(120));

    expect(strat.getPrice(spot)).toBeCloseTo(-opt1.getPrice(spot) + opt2.getPrice(spot), 4);
    expect(strat.getDelta(spot)).toBeCloseTo(-opt1.getDelta(spot) + opt2.getDelta(spot), 4);
    expect(strat.getGamma(spot)).toBeCloseTo(-opt1.getGamma(spot) + opt2.getGamma(spot), 4);
    expect(strat.getVega(spot)).toBeCloseTo(-opt1.getVega(spot) + opt2.getVega(spot), 4);
    expect(strat.getTheta(spot)).toBeCloseTo(-opt1.getTheta(spot) + opt2.getTheta(spot), 4);
    expect(strat.getRho(spot)).toBeCloseTo(-opt1.getRho(spot) + opt2.getRho(spot), 4);
});

test('Bull Put Spread', () => {
    const vols = [0.8, 0.9];
    const rate = 0.1;
    const time = 0.5;
    const strikes = [90, 110];
    const spot = 100;
    const isCall = false;
    const isBullish = true;

    const strat = new Spread(vols, rate, time, strikes, isCall, isBullish);
    const opt1 = new VanillaOption(vols[0], rate, time, strikes[0], isCall);
    const opt2 = new VanillaOption(vols[1], rate, time, strikes[1], isCall);

    expect(strat.getPayoff(80)).toBe(opt1.getPayoff(80) - opt2.getPayoff(80));
    expect(strat.getPayoff(120)).toBe(opt1.getPayoff(120) - opt2.getPayoff(120));

    expect(strat.getPrice(spot)).toBeCloseTo(opt1.getPrice(spot) - opt2.getPrice(spot), 4);
    expect(strat.getDelta(spot)).toBeCloseTo(opt1.getDelta(spot) - opt2.getDelta(spot), 4);
    expect(strat.getGamma(spot)).toBeCloseTo(opt1.getGamma(spot) - opt2.getGamma(spot), 4);
    expect(strat.getVega(spot)).toBeCloseTo(opt1.getVega(spot) - opt2.getVega(spot), 4);
    expect(strat.getTheta(spot)).toBeCloseTo(opt1.getTheta(spot) - opt2.getTheta(spot), 4);
    expect(strat.getRho(spot)).toBeCloseTo(opt1.getRho(spot) - opt2.getRho(spot), 4);
});

test('Bear Put Spread', () => {
    const vols = [0.8, 0.9];
    const rate = 0.1;
    const time = 0.5;
    const strikes = [90, 110];
    const spot = 100;
    const isCall = false;
    const isBullish = false;

    const strat = new Spread(vols, rate, time, strikes, isCall, isBullish);
    const opt1 = new VanillaOption(vols[0], rate, time, strikes[0], isCall);
    const opt2 = new VanillaOption(vols[1], rate, time, strikes[1], isCall);

    expect(strat.getPayoff(80)).toBe(-opt1.getPayoff(80) + opt2.getPayoff(80));
    expect(strat.getPayoff(120)).toBe(-opt1.getPayoff(120) + opt2.getPayoff(120));

    expect(strat.getPrice(spot)).toBeCloseTo(-opt1.getPrice(spot) + opt2.getPrice(spot), 4);
    expect(strat.getDelta(spot)).toBeCloseTo(-opt1.getDelta(spot) + opt2.getDelta(spot), 4);
    expect(strat.getGamma(spot)).toBeCloseTo(-opt1.getGamma(spot) + opt2.getGamma(spot), 4);
    expect(strat.getVega(spot)).toBeCloseTo(-opt1.getVega(spot) + opt2.getVega(spot), 4);
    expect(strat.getTheta(spot)).toBeCloseTo(-opt1.getTheta(spot) + opt2.getTheta(spot), 4);
    expect(strat.getRho(spot)).toBeCloseTo(-opt1.getRho(spot) + opt2.getRho(spot), 4);
});

test('Bull Risk Reversal', () => {
    const vols = [0.8, 0.9];
    const rate = 0.1;
    const time = 0.5;
    const strikes = [90, 110];
    const spot = 100;
    const isBullish = true;

    const strat = new RiskReversal(vols, rate, time, strikes, isBullish);
    const opt1 = new VanillaOption(vols[0], rate, time, strikes[0], false);
    const opt2 = new VanillaOption(vols[1], rate, time, strikes[1], true);

    expect(strat.getPayoff(80)).toBe(-opt1.getPayoff(80) + opt2.getPayoff(80));
    expect(strat.getPayoff(120)).toBe(-opt1.getPayoff(120) + opt2.getPayoff(120));

    expect(strat.getPrice(spot)).toBeCloseTo(-opt1.getPrice(spot) + opt2.getPrice(spot), 4);
    expect(strat.getDelta(spot)).toBeCloseTo(-opt1.getDelta(spot) + opt2.getDelta(spot), 4);
    expect(strat.getGamma(spot)).toBeCloseTo(-opt1.getGamma(spot) + opt2.getGamma(spot), 4);
    expect(strat.getVega(spot)).toBeCloseTo(-opt1.getVega(spot) + opt2.getVega(spot), 4);
    expect(strat.getTheta(spot)).toBeCloseTo(-opt1.getTheta(spot) + opt2.getTheta(spot), 4);
    expect(strat.getRho(spot)).toBeCloseTo(-opt1.getRho(spot) + opt2.getRho(spot), 4);
});

test('Bear Risk Reversal', () => {
    const vols = [0.8, 0.9];
    const rate = 0.1;
    const time = 0.5;
    const strikes = [90, 110];
    const spot = 100;
    const isBullish = false;

    const strat = new RiskReversal(vols, rate, time, strikes, isBullish);
    const opt1 = new VanillaOption(vols[0], rate, time, strikes[0], false);
    const opt2 = new VanillaOption(vols[1], rate, time, strikes[1], true);

    expect(strat.getPayoff(80)).toBe(opt1.getPayoff(80) - opt2.getPayoff(80));
    expect(strat.getPayoff(120)).toBe(opt1.getPayoff(120) - opt2.getPayoff(120));

    expect(strat.getPrice(spot)).toBeCloseTo(opt1.getPrice(spot) - opt2.getPrice(spot), 4);
    expect(strat.getDelta(spot)).toBeCloseTo(opt1.getDelta(spot) - opt2.getDelta(spot), 4);
    expect(strat.getGamma(spot)).toBeCloseTo(opt1.getGamma(spot) - opt2.getGamma(spot), 4);
    expect(strat.getVega(spot)).toBeCloseTo(opt1.getVega(spot) - opt2.getVega(spot), 4);
    expect(strat.getTheta(spot)).toBeCloseTo(opt1.getTheta(spot) - opt2.getTheta(spot), 4);
    expect(strat.getRho(spot)).toBeCloseTo(opt1.getRho(spot) - opt2.getRho(spot), 4);
});

test('Call Butterfly', () => {
    const vols = [0.8, 0.9, 1];
    const rate = 0.1;
    const time = 0.5;
    const strikes = [90, 100, 110];
    const spot = 100;
    const isCall = true;

    const strat = new Butterfly(vols, rate, time, strikes, isCall);
    const opt1 = new VanillaOption(vols[0], rate, time, strikes[0], isCall);
    const opt2 = new VanillaOption(vols[1], rate, time, strikes[1], isCall);
    const opt3 = new VanillaOption(vols[2], rate, time, strikes[2], isCall);

    expect(strat.getPayoff(80)).toBe(opt1.getPayoff(80) - 2 * opt2.getPayoff(80) + opt3.getPayoff(80));
    expect(strat.getPayoff(120)).toBe(opt1.getPayoff(120) - 2 * opt2.getPayoff(120) + opt3.getPayoff(120));

    expect(strat.getPrice(spot)).toBeCloseTo(opt1.getPrice(spot) - 2 * opt2.getPrice(spot) + opt3.getPrice(spot), 4);
    expect(strat.getDelta(spot)).toBeCloseTo(opt1.getDelta(spot) - 2 * opt2.getDelta(spot) + opt3.getDelta(spot), 4);
    expect(strat.getGamma(spot)).toBeCloseTo(opt1.getGamma(spot) - 2 * opt2.getGamma(spot) + opt3.getGamma(spot), 4);
    expect(strat.getVega(spot)).toBeCloseTo(opt1.getVega(spot) - 2 * opt2.getVega(spot) + opt3.getVega(spot), 4);
    expect(strat.getTheta(spot)).toBeCloseTo(opt1.getTheta(spot) - 2 * opt2.getTheta(spot) + opt3.getTheta(spot), 4);
    expect(strat.getRho(spot)).toBeCloseTo(opt1.getRho(spot) - 2 * opt2.getRho(spot) + opt3.getRho(spot), 4);
});

test('Put Butterfly', () => {
    const vols = [0.8, 0.9, 1];
    const rate = 0.1;
    const time = 0.5;
    const strikes = [90, 100, 110];
    const spot = 100;
    const isCall = false;

    const strat = new Butterfly(vols, rate, time, strikes, isCall);
    const opt1 = new VanillaOption(vols[0], rate, time, strikes[0], isCall);
    const opt2 = new VanillaOption(vols[1], rate, time, strikes[1], isCall);
    const opt3 = new VanillaOption(vols[2], rate, time, strikes[2], isCall);

    expect(strat.getPayoff(80)).toBe(opt1.getPayoff(80) - 2 * opt2.getPayoff(80) + opt3.getPayoff(80));
    expect(strat.getPayoff(120)).toBe(opt1.getPayoff(120) - 2 * opt2.getPayoff(120) + opt3.getPayoff(120));

    expect(strat.getPrice(spot)).toBeCloseTo(opt1.getPrice(spot) - 2 * opt2.getPrice(spot) + opt3.getPrice(spot), 4);
    expect(strat.getDelta(spot)).toBeCloseTo(opt1.getDelta(spot) - 2 * opt2.getDelta(spot) + opt3.getDelta(spot), 4);
    expect(strat.getGamma(spot)).toBeCloseTo(opt1.getGamma(spot) - 2 * opt2.getGamma(spot) + opt3.getGamma(spot), 4);
    expect(strat.getVega(spot)).toBeCloseTo(opt1.getVega(spot) - 2 * opt2.getVega(spot) + opt3.getVega(spot), 4);
    expect(strat.getTheta(spot)).toBeCloseTo(opt1.getTheta(spot) - 2 * opt2.getTheta(spot) + opt3.getTheta(spot), 4);
    expect(strat.getRho(spot)).toBeCloseTo(opt1.getRho(spot) - 2 * opt2.getRho(spot) + opt3.getRho(spot), 4);
});
