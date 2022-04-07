import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../classes'
import { Dropper } from '../dropper'
import { teddyBear } from '../items'

export class Orc extends MonsterEntity {
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
        return new Orc({
            name: 'Orc',
            spawnRate: 0.4,
            health: 70,
            attackDamage: 12,
            evasion: 0.01,
            magicPower: 0,
            armor: 10,
            magicResistance: 6,
            skills: [
                {
                    cooldown: 0,
                    name: 'Savage charge',
                    description: 'Basic attack',
                    canEvade: true,
                    use: (attacker, defender) => {
                        const savageCharge = attacker.scheduler.task
                            .id('orc__savage-charge')
                            .turns(1)
                            .turnOf(attacker)
                            .skipTurn.run(() =>
                                defender.takeDamage
                                    .physical(40)
                                    .run(damage => `**${defender.name}** lost ${damage} HP by Savage charge`)
                            )

                        attacker.applyEffect(savageCharge)
                        attacker.addLogMessage(`**${attacker.name}** is carrying a powerful attack`)
                    },
                },
                {
                    cooldown: 0,
                    name: 'Brute stomp',
                    description: 'Basic attack',
                    canEvade: true,
                    use: (attacker, defender) =>
                        defender.takeDamage
                            .physical(30)
                            .run(damage => `**${defender.name}** lost ${damage} HP by Brute stomp`),
                },
            ],
        })
    }
}
