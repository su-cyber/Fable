import range from 'lodash.range'

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
export function weightedRandom(items: any[], weights: number[]) {
    const r = range(weights.length)

    r.forEach(i => {
        weights[i] += weights[i - 1] || 0
    })

    const random = Math.random() * weights[weights.length - 1]

    for (const i of r) {
        if (weights[i] > random) {
            return items[i]
        }
    }
}
