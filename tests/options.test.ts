import { DigitalOption, VanillaOption } from '../src';

test('Vanilla Call', () => {
    const vol = 0.8;
    const rate = 0.1;
    const time = 0.5;
    const strike = 110;
    const isCall = true;
    const spot = 100;

    const opt = new VanillaOption(vol, rate, time, strike, isCall);

    expect(opt.getPayoff(105)).toBe(0);
    expect(opt.getPayoff(115)).toBe(5);

    expect(opt.getPrice(spot)).toBeCloseTo(20.539885, 4);
    expect(opt.getDelta(spot)).toBeCloseTo(0.580333, 4);
    expect(opt.getGamma(spot)).toBeCloseTo(0.006909, 4);
    expect(opt.getVega(spot)).toBeCloseTo(27.635614, 4);
    expect(opt.getTheta(spot)).toBeCloseTo(25.857831, 4);
    expect(opt.getRho(spot)).toBeCloseTo(18.746695, 4);
});

test('Vanilla Put', () => {
    const vol = 0.8;
    const rate = 0.1;
    const time = 0.5;
    const strike = 90;
    const isCall = false;
    const spot = 100;

    const opt = new VanillaOption(vol, rate, time, strike, isCall);

    expect(opt.getPayoff(95)).toBe(0);
    expect(opt.getPayoff(85)).toBe(5);

    expect(opt.getPrice(spot)).toBeCloseTo(14.225596, 4);
    expect(opt.getDelta(spot)).toBeCloseTo(-0.288598, 4);
    expect(opt.getGamma(spot)).toBeCloseTo(0.006037, 4);
    expect(opt.getVega(spot)).toBeCloseTo(24.149506, 4);
    expect(opt.getTheta(spot)).toBeCloseTo(15.011061, 4);
    expect(opt.getRho(spot)).toBeCloseTo(-21.542718, 4);
});

test('Digital Call', () => {
    const vol = 0.8;
    const rate = 0.1;
    const time = 0.5;
    const strike = 110;
    const isCall = true;
    const spot = 100;

    const opt = new DigitalOption(vol, rate, time, strike, isCall);

    expect(opt.getPayoff(105)).toBe(0);
    expect(opt.getPayoff(115)).toBe(1);

    expect(opt.getPrice(spot)).toBeCloseTo(0.340849, 4);
    expect(opt.getDelta(spot)).toBeCloseTo(0.006281, 4);
    expect(opt.getGamma(spot)).toBeCloseTo(-0.000023, 4);
    expect(opt.getVega(spot)).toBeCloseTo(-0.090043, 4);
    expect(opt.getTheta(spot)).toBeCloseTo(-0.043311, 4);
    expect(opt.getRho(spot)).toBeCloseTo(0.143617, 4);
});

test('Digital Put', () => {
    const vol = 0.8;
    const rate = 0.1;
    const time = 0.5;
    const strike = 90;
    const isCall = false;
    const spot = 100;

    const opt = new DigitalOption(vol, rate, time, strike, isCall);

    expect(opt.getPayoff(95)).toBe(0);
    expect(opt.getPayoff(85)).toBe(1);

    expect(opt.getPrice(spot)).toBeCloseTo(0.478727, 4);
    expect(opt.getDelta(spot)).toBeCloseTo(-0.006708, 4);
    expect(opt.getGamma(spot)).toBeCloseTo(0.000066, 4);
    expect(opt.getVega(spot)).toBeCloseTo(0.264438, 4);
    expect(opt.getTheta(spot)).toBeCloseTo(0.096595, 4);
    expect(opt.getRho(spot)).toBeCloseTo(-0.574775, 4);
});
