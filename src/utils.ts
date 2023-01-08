/**
 * Sum all the elements in the array
 * @param arr an array of numbers
 * @return the sum
 */
export const sumArray = (arr: number[]): number => {
    return arr.reduce((s, v) => s + v, 0);
};

/**
 * Sum product of arrays.
 * First multiplies elements with the same index and then sums all the results.
 * @param arr1 an array
 * @param arr2 another array
 * @returns the sum product of the arrays
 */
export const sumProduct = (arr1: number[], arr2: number[]): number => {
    if (arr1.length !== arr2.length) {
        throw new Error('Arrays should have the same length');
    }
    return sumArray(arr1.map((el, i) => el * arr2[i]));
};
