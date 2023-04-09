import { CommandInteraction } from 'discord.js'
import { Dropper } from '../../dropper'

import { arachnidVenom } from '../../items'
import { poisoning } from '../../effects/poisoning'
import { emoji } from '../../../lib/utils/emoji'
import { MonsterEntity, ClassEntity } from '../../classes'
import generateXP from '../../../utils/generateXP'

export class Arachnids extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withDropMessages: ['You can hear his last grunts before his death'],
            withoutDropMessages: ['The goblin was badly wounded, but he managed to escape'],
        }

        new Dropper([
            {
                item: arachnidVenom,
                dropRate: 0.9,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Arachnids({
            name: 'Arachnid',
            spawnRate: 0.5,
            evasion: 0.05,
            health: 40,
            xp: generateXP(20,50),
            attackDamage: 8,
            mana:10,
            magicPower: 6,
            armor: 2,
            speed: 5,
            element:"venom",
            run_chance: 0.05,
            magicResistance: 2,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Poison Sting',
                    description: 'Basic attack',
                    damage:0,
                    canEvade: true,
                    mana_cost: 0,
                    type: 'physical',
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
