import { CommandInteraction } from 'discord.js'
import { Dropper } from '../dropper'

import { teddyBear } from '../items'
import { poisoning } from '../effects/poisoning'
import { emoji } from '../../lib/utils/emoji'
import { MonsterEntity, ClassEntity, Entity } from '../classes'

export class Arachnids extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withDropMessages: ['You can hear his last grunts before his death'],
            withoutDropMessages: ['The goblin was badly wounded, but he managed to escape'],
        }

        new Dropper([
            {
                item: teddyBear,
                dropRate: 0.9,
            },
        ]).sendDeathMessage(messages, interaction, this)
    }

    static create() {
        return new Arachnids({
            name: 'Arachnids',
            spawnRate: 0.5,
            evasion: 0.5,
            health: 40,
            attackDamage: 8,
            magicPower: 6,
            armor: 2,
            magicResistance: 2,
            skills: [
                {
                    cooldown: 0,
                    name: 'Poison Sting',
                    description: 'Basic attack',
                    use: (attacker, defender) => {
                        defender.takeDamage.physical(10).run(damage => {
                            const poisonSting = attacker.scheduler.task
                                .id('arachnids__poison-sting')
                                .all.turns(3)
                                .effect(poisoning)
                                .end(() => defender.removeEffect(poisoning))
                                .run(() =>
                                    defender.takeDamage
                                        .physical(5)
                                        .run(
                                            damage =>
                                                `**${defender.name}** lost ${damage} HP due to ${emoji.POISON}`
                                        )
                                )

                            defender.applyEffect(poisonSting)

                            return `${defender.name} was poisoned by the **Poison Sting**`
                        })
                    },
                },
            ],
        })
    }
}
