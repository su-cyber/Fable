import { readdirSync } from 'fs'
import { endsWith, notIn } from '../../utils'
import { weightedRandom } from '../../utils/weightedRandom'

export async function getFlora() {
    const flora = []
    for (const file of readdirSync(__dirname).filter(endsWith('.ts')).filter(notIn('index.ts'))) {
        //if (['slime.ts', 'goblin.ts', 'blood-hound.ts'].includes(file)) continue
        //if (!['orc.ts'].includes(file)) continue

        const module = await import(`${__dirname}/${file}`)

        const values = Object.values(module)

        if (values.length === 0) {
            throw new Error(`${file} is empty`)
        }

        const plant = values[0]
        flora.push(plant)
    }

    return flora
}

async function getRandomFlora() {
    const flora = (await getFlora()).map(fn => fn.create())

    return weightedRandom(
        flora,
        flora.map(object => object.spawnRate)
    )
}

export { getRandomFlora }
