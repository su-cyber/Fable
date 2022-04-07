import { CommandInteraction } from 'discord.js'
import { Dropper } from '../dropper'
import { teddyBear } from '../items'
import { percentOf } from '../../utils/percentOf'
import { MonsterEntity, ClassEntity } from '../classes'

export class Ghoul extends MonsterEntity {
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
        return new Ghoul({
            name: 'Ghoul',
            spawnRate: 0.3,
            health: 50,
            evasion: 0.04,
            attackDamage: 10,
            magicPower: 0,
            armor: 5,
            magicResistance: 3,
            skills: [
                {
                    cooldown: 0,
                    name: 'Claw Attack',
                    description: 'Basic attack',
                    canEvade: true,
                    use: (attacker, defender) =>
                        defender.takeDamage
                            .physical(12)
                            .run(damage => `**${defender.name}** lost ${damage} HP by Claw Attack`),
                },
                {
                    cooldown: 0,
                    name: 'Hollow Screech',
                    description: 'Increases attack damage for a short time',
                    canEvade: true,
                    use: (attacker, defender) => {
                        const drainedArmor = percentOf(0.05, defender.armor)
                        defender.armor -= drainedArmor
                        attacker.armor += drainedArmor

                        defender.addLogMessage(
                            `**${defender.name}** lost ${drainedArmor.toFixed(1)} armor by Hollow Screech`
                        )
                        
                        defender.takeDamage
                            .physical(percentOf(0.7, attacker.attackDamage))
                            .run(damage => `**${defender.name}** lost ${damage} HP by Hollow Screech`)
                    },
                },
            ],
        })
    }
}