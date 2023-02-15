import { readdirSync } from 'fs'
import { dirname } from 'path'
import { endsWith, notIn } from '../../utils'
import { weightedRandom } from '../../utils/weightedRandom'

export async function getFlora(location:String) {
    const flora = []
    const path = __dirname+"/"+location
    for (const file of readdirSync(path).filter(endsWith('.ts')).filter(notIn('index.ts'))) {
        //if (['slime.ts', 'goblin.ts', 'blood-hound.ts'].includes(file)) continue
        //if (!['orc.ts'].includes(file)) continue

        const module = await import(`${path}/${file}`)

        const values = Object.values(module)

        if (values.length === 0) {
            throw new Error(`${file} is empty`)
        }

        const plant = values[0]
        flora.push(plant)
    }

    return flora
}

async function getRandomFlora(location:String) {
    const flora = (await getFlora(location)).map(fn => fn.create())

    return weightedRandom(
        flora,
        flora.map(object => object.spawnRate)
    )
}

export { getRandomFlora }
