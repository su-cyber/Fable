/**
 * Curried function that returns true if the value is not in the args array.
 * ```js
 * const items = [1, 2, 3]
 * 
 * items.filter(notIn(1)) // [2, 3]
 * ```
 */
export function notIn(...args: any[]) {
    return (value: any) => {
        if (Array.isArray(value)) {
            return !value[0].includes(value)
        }

        return !args.includes(value)
    }
}
