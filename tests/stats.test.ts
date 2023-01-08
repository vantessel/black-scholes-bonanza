import { normalPdf, normalCdf, inverseNormalCdf } from '../src';

test('Normal PDF', () => {
    expect(normalPdf(-100)).toBeCloseTo(0, 6);
    expect(normalPdf(-2)).toBeCloseTo(0.05399097, 6);
    expect(normalPdf(-1)).toBeCloseTo(0.24197072, 6);
    expect(normalPdf(0)).toBeCloseTo(0.39894228, 6);
    expect(normalPdf(1)).toBeCloseTo(0.24197072, 6);
    expect(normalPdf(2)).toBeCloseTo(0.05399097, 6);
    expect(normalPdf(100)).toBeCloseTo(0, 6);
});

test('Normal CDF', () => {
    expect(normalCdf(-100)).toBeCloseTo(0, 6);
    expect(normalCdf(-2)).toBeCloseTo(0.02275013, 6);
    expect(normalCdf(-1)).toBeCloseTo(0.15865525, 6);
    expect(normalCdf(0)).toBeCloseTo(0.5, 6);
    expect(normalCdf(1)).toBeCloseTo(0.84134475, 6);
    expect(normalCdf(2)).toBeCloseTo(0.97724987, 6);
    expect(normalCdf(100)).toBeCloseTo(1, 6);
});

test('Inverse Normal CDF', () => {
    const lowerBound = () => inverseNormalCdf(0);
    const upperBound = () => inverseNormalCdf(1);

    expect(lowerBound).toThrow('Quantiles should be in (0, 1)');
    expect(inverseNormalCdf(0.02275013)).toBeCloseTo(-2, 6);
    expect(inverseNormalCdf(0.15865525)).toBeCloseTo(-1, 6);
    expect(inverseNormalCdf(0.5)).toBeCloseTo(0, 6);
    expect(inverseNormalCdf(0.84134475)).toBeCloseTo(1, 6);
    expect(inverseNormalCdf(0.97724987)).toBeCloseTo(2, 6);
    expect(upperBound).toThrow('Quantiles should be in (0, 1)');
});
