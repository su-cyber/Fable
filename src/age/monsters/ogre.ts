import { CommandInteraction } from 'discord.js'
import { Dropper } from '../dropper'
import { teddyBear } from '../items'
import { percentOf, randint } from '../../utils'
import range from 'lodash.range'
import { MonsterEntity, ClassEntity } from '../classes'

export class Ogre extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The goblin was badly wounded, but he managed to escape'],
            withDropMessages: ['You can hear his last grunts before his death'],
        }

        new Dropper([
            {
                item: teddyBear,
                dropRate: 0.9,
            },
        ]).sendDeathMessage(messages, interaction, this)
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
                    canEvade: true,
                    use: (attacker, defender) =>
                        defender.takeDamage
                            .physical(30)
                            .run(damage => `**${defender.name}** lost ${damage} HP by Ogre smash`),
                },
                {
                    cooldown: 0,
                    name: 'Guard',
                    description: 'Increases attack damage for a short time',
                    canEvade: true,
                    use: (attacker, defender) => {
                        const gainedArmor = percentOf(0.1, attacker.armor)
                        attacker.armor += gainedArmor

                        defender.addLogMessage(
                            `**${attacker.name}** used Guard`,
                            `${attacker.name}'s armor increased by ${gainedArmor}`
                        )
                    },
                },
                {
                    cooldown: 0,
                    name: 'Savage fury',
                    description: 'Increases attack damage for a short time',
                    canEvade: true,
                    use: (attacker, defender) => {
                        const n = randint(2, 4)

                        attacker.addLogMessage(`**${attacker.name}** used Savage fury`)

                        range(n).forEach(() =>
                            defender.takeDamage
                                .physical(10)
                                .run(damage => `**${defender.name}** lost ${damage} HP by Savage fury`)
                        )
                    },
                },
            ],
        })
    }
}