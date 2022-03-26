/**
 * Formats the number to a simplified format with symbol
 * 
 * ```js
 * formatMoney(1_000_000)      // "1M"
 * formatMoney(1_000)          // "1K"
 * formatMoney(1.23)           // "1"
 * formatMoney(190_123_000, 3) // "190.123M"
 * ````
 * 
 * @param {number} decimals Number of decimal places after the dot
 */
export function formatMoney(n: number, decimals: number = 0) {
    const lookup = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'k' },
        { value: 1e6, symbol: 'M' },
        { value: 1e9, symbol: 'B' },
        { value: 1e12, symbol: 'T' },
        { value: 1e15, symbol: 'Q' },
    ]
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
    var item = lookup
        .slice()
        .reverse()
        .find(i => n >= i.value)
    return item ? (n / item.value).toFixed(decimals).replace(rx, '$1') + item.symbol : '0'
}
