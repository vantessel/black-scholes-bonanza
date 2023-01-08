import { sumArray, sumProduct } from '../src/utils';

test('sum empty array', () => {
    expect(sumArray([])).toBe(0);
});

test('sum array', () => {
    expect(sumArray([-1, 0, 5, 10])).toBe(14);
});

test('sum product', () => {
    const differentLength = () => sumProduct([1], [2, 3]);

    expect(sumProduct([-1, 0, 5, 10], [-2, 3, 4, 8])).toBe(102);
    expect(differentLength).toThrow('Arrays should have the same length');
});
