/**
 * Removes the indentation spaces from a string
 */
export function removeIndentation(s: string) {
    return s.replace(/ {2,}/g, '').trim()
}
