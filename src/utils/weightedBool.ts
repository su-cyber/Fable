import { weightedRandom } from './weightedRandom'

export function weightedBool(rate: number): boolean {
    if (rate < 0 || rate > 1) {
        throw new Error(`rate must be between 0 and 1, got ${rate}`)
    }

    return weightedRandom([true, false], [rate, 1 - rate])
}
