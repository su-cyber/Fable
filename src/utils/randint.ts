/**
 * Gets a random integer between two numbers
 */
export function randint(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
