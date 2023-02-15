import { readdirSync } from 'fs'
import { endsWith, notIn } from '../../utils'
import { weightedRandom } from '../../utils/weightedRandom'

export async function getMonsters(location:String) {
    const monsters = []
    const path = __dirname+"/"+location
    for (const file of readdirSync(path).filter(endsWith('.ts')).filter(notIn('index.ts'))) {
        //if (['slime.ts', 'goblin.ts', 'blood-hound.ts'].includes(file)) continue
        //if (!['orc.ts'].includes(file)) continue

        const module = await import(`${path}/${file}`)

        const values = Object.values(module)

        if (values.length === 0) {
            throw new Error(`${file} is empty`)
        }

        const monster = values[0]
        monsters.push(monster)
    }

    return monsters
}

async function getRandomMonster(location:String) {
    const monsters = (await getMonsters(location)).map(fn => fn.create())

    return weightedRandom(
        monsters,
        monsters.map(monster => monster.spawnRate)
    )
}

export { getRandomMonster }
