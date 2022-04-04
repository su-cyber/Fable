import { CommandInteraction } from 'discord.js'
import { Dropper } from '../dropper'
import { ClassEntity, MonsterEntity } from '../classes'
import { AttackType } from '../enums'
import { teddyBear } from '../items'
import { percentOf, randint } from '../../utils'
import range from 'lodash.range'

export class Ogre extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const withoutDropMessages = ['The goblin was badly wounded, but he managed to escape']
        const withDropMessages = ['You can hear his last grunts before his death']

        new Dropper([
            {
                item: teddyBear,
                dropRate: 0.9,
            },
        ]).sendDeathMessage(withDropMessages, withoutDropMessages, interaction, this)
    }

    static create() {
        return new Ogre({
            name: 'Ogre',
            spawnRate: 0.3,
            evasion: 0.01,
            health: 70,
            attackDamage: 15,
            magicPower: 0,
            armor: 12,
            magicResistance: 4,
            skills: [
                {
                    cooldown: 0,
                    name: 'Ogre smash',
                    description: 'Basic attack',
                    use: (attacker, defender) =>
                        defender
                            .takeDamage({ damage: 30, type: AttackType.PHYSICAL })
                            .send(`**${attacker.name}** used Ogre smash`),
                },
                {
                    cooldown: 0,
                    name: 'Guard',
                    description: 'Increases attack damage for a short time',
                    use: (attacker, defender) => {
                        attacker.armor += percentOf(0.1, attacker.armor)

                        defender.addLogMessage(`**${attacker.name}** used Guard`)
                    },
                },
                {
                    cooldown: 0,
                    name: 'Savage fury',
                    description: 'Increases attack damage for a short time',
                    use: (attacker, defender) => {
                        const n = randint(2, 4)

                        range(n).forEach(() => defender.takeDamage({ damage: 10, type: AttackType.PHYSICAL }))

                        defender.addLogMessage(
                            `**${attacker.name}** used Savage fury`,
                            `**${attacker.name}** attacked ${n} times`
                        )
                    },
                },
            ],
        })
    }
}
