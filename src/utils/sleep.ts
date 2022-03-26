/**
 * For the execution of the function for n seconds
 */
export function sleep(s: number) {
    return new Promise(resolve => setTimeout(resolve, s * 1000))
}
