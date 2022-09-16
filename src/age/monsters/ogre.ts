import { CommandInteraction } from 'discord.js'
import { Dropper } from '../dropper'
import { woodClub } from '../items'
import { percentOf, randint } from '../../utils'
import range from 'lodash.range'
import { MonsterEntity, ClassEntity } from '../classes'
import generateXP from '../../utils/generateXP'

export class Ogre extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The goblin was badly wounded, but he managed to escape'],
            withDropMessages: ['You can hear his last grunts before his death'],
        }

        new Dropper([
            {
                item: woodClub,
                dropRate: 0.9,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Ogre({
            name: 'Ogre',
            spawnRate: 0.3,
            evasion: 0.01,
            health: 70,
            attackDamage: 15,
            mana:10,
            xp: generateXP(30,70),
            magicPower: 0,
            armor: 12,
            magicResistance: 4,
            skills: [
                {
                    cooldown: 0,
                    name: 'Ogre smash',
                    description: 'Basic attack',
                    canEvade: true,
                    type: 'physical',
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        defender.addLogMessage(`**${attacker.name}** used Ogre smash`)
                        defender.takeDamage
                            .physical(30)
                            .run(damage => `**${defender.name}** lost ${damage} HP by Ogre smash`)
                    }
                },
                {
                    cooldown: 0,
                    name: 'Guard',
                    description: 'Increases attack damage for a short time',
                    canEvade: false,
                    type: 'self',
                    mana_cost: 0,
                    use: (attacker, defender) => {
                        const gainedArmor = percentOf(0.1, attacker.armor)
                        attacker.armor += gainedArmor

                        attacker.addLogMessage(
                            `**${attacker.name}** used Guard`,
                            `${attacker.name}'s armor increased by 10%`
                        )
                    },
                },
                {
                    cooldown: 0,
                    name: 'Savage fury',
                    description: 'Increases attack damage for a short time',
                    canEvade: true,
                    type: 'physical',
                    mana_cost: 0,
                    use: (attacker, defender) => {
                        const n = randint(2, 4)

                        attacker.addLogMessage(
                         `**${attacker.name}** used Savage fury`
                        )

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
