import { CommandInteraction } from 'discord.js'
import { Dropper } from '../dropper'
import { ClassEntity, MonsterEntity } from '../classes'
import { AttackType } from '../enums'
import { teddyBear } from '../items'
import { poisoning } from '../effects/poisoning'
import { emoji } from '../../lib/utils/emoji'

export class Arachnids extends MonsterEntity {
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
                        defender.applyEffect(poisoning)
                        defender.takeDamage({ damage: 10, type: AttackType.PHYSICAL })

                        // prettier-ignore
                        attacker.scheduler.task
                            .id('arachnids__poison-sting')
                            .isEffect
                            .all
                            .turns(3)
                            .end(() => defender.removeEffect(poisoning))
                            .run(() => 
                                defender
                                    .takeDamage({ damage: 5, type: AttackType.PHYSICAL, canEvade: false })
                                    .send(damage => `**${defender.name}** lost ${damage} HP due to ${emoji.POISON}`))

                        attacker.addLogMessage(`**${attacker.name}** used Poison Sting`)
                    },
                },
            ],
        })
    }
}
