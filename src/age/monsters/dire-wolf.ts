import { CommandInteraction } from 'discord.js'
import { Dropper } from '../dropper'
import { ClassEntity, MonsterEntity } from '../classes'
import { AttackType } from '../enums'
import { teddyBear } from '../items'
import { bleeding } from '../effects/bleeding'
import { emoji } from '../../lib/utils/emoji'

export class DireWold extends MonsterEntity {
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
        return new DireWold({
            name: 'Dire Wolf',
            spawnRate: 0.4,
            evasion: 0.1,
            health: 40,
            attackDamage: 8,
            magicPower: 0,
            armor: 4,
            magicResistance: 2,
            skills: [
                {
                    cooldown: 0,
                    name: 'Razor Bite',
                    description: 'Basic attack',
                    use: (attacker, defender) =>
                        defender
                            .takeDamage({ damage: 20, type: AttackType.PHYSICAL })
                            .send(`**${attacker.name}** used Razor Bite`),
                },
                {
                    cooldown: 0,
                    name: 'Wild reflex',
                    description: 'Increases attack damage for a short time',
                    use: (attacker, defender) => {
                        attacker.evasion += 0.1

                        defender.addLogMessage(`**${attacker.name}** used Wild reflex`)
                    },
                },
                {
                    cooldown: 0,
                    name: 'Mutilate ',
                    description: 'Increases attack damage for a short time',
                    use: (attacker, defender) => {
                        defender.applyEffect(bleeding)

                        // prettier-ignore
                        attacker.scheduler.task
                            .id('dire-wolf__mutilate')
                            .all
                            .isEffect
                            .turns(3)
                            .end(() => defender.removeEffect(bleeding))
                            .run(() => 
                                defender
                                    .takeDamage({ damage: 5, type: AttackType.PHYSICAL, canEvade: false })
                                    .send(damage => `**${defender.name}** lost ${damage} HP due to ${emoji.BLEED}`))

                        defender.addLogMessage(`**${attacker.name}** used Wild reflex`)
                    },
                },
            ],
        })
    }
}
