import range from 'lodash.range'

function accumulate(arr) {
    const n = arr.length
    const out = new Array(n)
    out[0] = arr[0]
    for (let i = 1; i < n; i++) {
        out[i] = out[i - 1] + arr[i]
    }
    return out
}

function bisect_right(a, x, lo, hi) {
    while (lo < hi) {
        var mid = Math.floor((lo + hi) / 2)
        if (a[mid] < x) {
            lo = mid + 1
        } else {
            hi = mid
        }
    }
    return lo
}

/**
 * Choose a random item with probability
 *
 * You can exceed the weight to more than 100%, it will work
 *
 * ```js
 * const items   = [  1, 'a',   3]
 * const weights = [0.1, 0.2, 0.7]
 * //               10%  20%  70%
 *
 * weightedRandom(item, weights)
 * ````
 */
export function weightedRandom(values, weights, k = 1) {
    const n = values.length
    const cum = accumulate(weights)
    const hi = n - 1

    if (k === 1) {
        const r = Math.random() * cum[hi]
        const j = bisect_right(cum, r, 0, hi)
        return values[j]
    }

    return range(k).map(i => {
        const r = Math.random() * cum[hi]
        const j = bisect_right(cum, r, 0, hi)
        return values[j]
    })
}
