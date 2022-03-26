import { CommandInteraction } from 'discord.js'
import sample from 'lodash.sample'
import { nanoid } from 'nanoid'
import { Dropper } from '../dropper'
import { ClassEntity, MonsterEntity, Skill } from '../classes'
import { AttackType } from '../enums'
import { slimeGoo } from '../items'
import { formatMoney } from '../../utils/formatMoney'
import { randfloat } from '../../utils/randfloat'
import { randint } from '../../utils/randint'
import { removeIndentation } from '../../utils/removeIndentation'

export class Slime extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const withoutDropMessages = ['The slime just exploded, take it easy next time']
        const withDropMessages = ['The slime seems to have dropped something']

        const coins = formatMoney(randfloat(1, 1e8, 3), 3)
        const drop = this.drops.drop()
        const text = `
            **Slime was successfully killed!**

            ${drop ? sample(withDropMessages) : sample(withoutDropMessages)}

            🪙 ${coins}
            ${drop ? `${drop.emoji} ${randint(1, 2)}x` : ''}
        `

        await interaction.channel.send(removeIndentation(text))
    }

    static create() {
        return new Slime({
            id: nanoid(),
            name: 'Slime',
            spawnRate: 0.8,
            drops: new Dropper([
                {
                    item: slimeGoo,
                    dropRate: 0.9,
                },
            ]),
            health: 20,
            attackDamage: 10,
            magicPower: 0,
            armor: 0,
            magicResistance: 0,
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
