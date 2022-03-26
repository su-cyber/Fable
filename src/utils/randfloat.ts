/**
 * Gets a random float between two numbers
 * 
 * @param {number} decimals Number of decimal places after the dot
 */
export function randfloat(min: number, max: number, decimals: number) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimals))
}
