import { CommandInteraction } from 'discord.js'
import { Dropper } from '../dropper'
import { teddyBear } from '../items'
import { bleeding } from '../effects/bleeding'
import { MonsterEntity, ClassEntity } from '../classes'

export class DireWold extends MonsterEntity {
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
                        defender.takeDamage
                            .physical(20)
                            .run(damage => `**${defender.name}** lost ${damage} HP by Razor Bite`),
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
                        const mutilate = attacker.scheduler.task
                            .id('dire-wolf__mutilate')
                            .all.effect(bleeding)
                            .turns(3)
                            .end(() => defender.removeEffect(bleeding))
                            .run(() =>
                                defender.takeDamage
                                    .physical(5)
                                    .run(damage => `**${defender.name}** lost ${damage} HP by Mutilate`)
                            )

                        defender.applyEffect(mutilate)

                        defender.addLogMessage(`**${attacker.name}** used Wild reflex`)
                    },
                },
            ],
        })
    }
}
