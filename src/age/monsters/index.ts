import { readdirSync } from 'fs'
import { endsWith, notIn } from '../../utils'
import { weightedRandom } from '../../utils/weightedRandom'

async function getMonsters() {
    const monsters = []
    for (const file of readdirSync(__dirname).filter(endsWith('.ts')).filter(notIn('index.ts'))) {
        if (['slime.ts'].includes(file)) continue

        const module = await import(`${__dirname}/${file}`)

        const values = Object.values(module)

        if (values.length === 0) {
            throw new Error(`${file} is empty`)
        }

        const monster = values[0]
        monsters.push(monster)
    }

    return monsters
}

async function getRandomMonster() {
    const monsters = (await getMonsters()).map(fn => fn.create())

    return weightedRandom(
        monsters,
        monsters.map(monster => monster.spawnRate)
    )
}

export { getRandomMonster }
