/**
 * Curried function that returns true if the string ends with value
 * ```js
 * const items = ['a.js', 'b.js', 'c.ts']
 * 
 * items.filter(endsWith('.ts')) // ['c.ts']
 * ```
 */
export function endsWith(...args: any[]) {
    return (value: any) => {
        if (Array.isArray(value)) {
            return !value[0].endsWith(value)
        }

        return value.endsWith(args)
    }
}