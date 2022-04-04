export function wrapText(s: string, maxSize: number, placeholder: string = '...') {
    if (s.length <= maxSize) {
        return s
    }

    return (
        s
            .split('')
            .slice(0, maxSize - placeholder.length)
            .join('')
            .trim() + placeholder
    )
}
