import { CommandInteraction } from 'discord.js'
import sample from 'lodash.sample'
import { nanoid } from 'nanoid'
import { removeIndentation } from '../../utils/removeIndentation'
import { formatMoney } from '../../utils/formatMoney'
import { randfloat } from '../../utils/randfloat'
import { randint } from '../../utils/randint'
import { Dropper } from '../dropper'
import { ClassEntity, MonsterEntity, Skill } from '../classes'
import { AttackType } from '../enums'
import { teddyBear } from '../items'

export class Goblin extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const withoutDropMessages = ['The goblin was badly wounded, but he managed to escape']
        const withDropMessages = ['You can hear his last grunts before his death']

        const coins = formatMoney(randfloat(1, 1e8, 3), 3)
        const drop = this.drops.drop()
        const text = `
            **Goblin was successfully killed!**

            ${drop ? sample(withDropMessages) : sample(withoutDropMessages)}

            🪙 ${coins}
            ${drop ? `${drop.emoji} ${randint(1, 2)}x` : ''}
        `

        await interaction.channel.send(removeIndentation(text))
    }

    static create() {
        return new Goblin({
            id: nanoid(),
            name: 'Goblin',
            spawnRate: 0.8,
            drops: new Dropper([
                {
                    item: teddyBear,
                    dropRate: 0.9,
                },
            ]),
            health: 40,
            attackDamage: 10,
            magicPower: 0,
            armor: 5,
            magicResistance: 5,
            effects: new Set(),
            skills: [
                new Skill({
                    cooldown: 0,
                    name: 'Attack',
                    description: 'Basic attack',
                    use: async (sendInfoMessage, scheduler, attacker, defender) => {
                        const damage = attacker.attackDamage
                        defender.takeDamage({ damage, attackType: AttackType.PHYSICAL })

                        await sendInfoMessage(`**${attacker.name}** used Basic attack`)
                    },
                }),
            ],
        })
    }
}
