import { CommandInteraction } from 'discord.js'
import { Dropper } from '../dropper'
import { teddyBear } from '../items'
import { poisoning } from '../effects/poisoning'
import { emoji } from '../../lib/utils/emoji'
import { burning } from '../effects/burning'
import { MonsterEntity, ClassEntity, Entity } from '../classes'

export class Chimera extends MonsterEntity {
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

    beforeDuelStart(you: Entity, opponent: Entity) {
        opponent.evasion /= 2
    }

    static create() {
        return new Chimera({
            name: 'Chimera',
            spawnRate: 0.2,
            evasion: 0.05,
            health: 80,
            attackDamage: 30,
            magicPower: 20,
            armor: 20,
            magicResistance: 30,
            skills: [
                {
                    cooldown: 0,
                    name: 'Fire breath',
                    description: 'Basic attack',
                    canEvade: true,
                    use: (attacker, defender) => {
                        const fireBreath = attacker.scheduler.task
                            .id('chimera__fire-breath')
                            .all.effect(burning)
                            .turns(3)
                            .end(() => defender.removeEffect(burning))
                            .run(() =>
                                defender.takeDamage
                                    .physical(10)
                                    .run(
                                        damage =>
                                            `**${defender.name}** lost ${damage} HP due to ${emoji.FIRE}`
                                    )
                            )

                        defender.applyEffect(fireBreath)
                        attacker.addLogMessage(`**${attacker.name}** used Fire breath`)
                        defender.takeDamage
                            .physical(50)
                            .run(damage => `**${defender.name}** lost ${damage} HP by Fire breath`)
                    },
                },
                {
                    cooldown: 0,
                    name: 'Venom splash',
                    description: 'Increases attack damage for a short time',
                    canEvade: true,
                    use: (attacker, defender) => {
                        const venomSplash = attacker.scheduler.task
                            .id('chimera__venom-splash')
                            .all.effect(poisoning)
                            .turns(3)
                            .end(() => defender.removeEffect(poisoning))
                            .run(() =>
                                defender.takeDamage
                                    .physical(10)
                                    .run(
                                        damage =>
                                            `**${defender.name}** lost ${damage} HP due to ${emoji.POISON}`
                                    )
                            )

                        defender.applyEffect(venomSplash)
                        attacker.addLogMessage(`**${attacker.name}** used Venom splash`)
                        defender.takeDamage
                            .physical(50)
                            .run(damage => `**${defender.name}** lost ${damage} HP by Venom splash`)
                        attacker.addLogMessage(`**${defender.name}** has been poisoned!`)
                    },
                },
                {
                    cooldown: 0,
                    name: 'Aerial Combat',
                    description: 'Increases attack damage for a short time',
                    canEvade: false,
                    use: (attacker, defender) => {
                        const aerialCombat = attacker.scheduler.task
                            .id('chimera__aerial-combat')
                            .turnOf(defender)
                            .skipTurn.turns(2)
                            .run(() => {})

                        defender.applyEffect(aerialCombat)
                        defender.addLogMessage(`**${attacker.name}** used Aerial Combat`)
                    },
                },
                {
                    cooldown: 0,
                    name: 'Mad Ram',
                    description: 'Increases attack damage for a short time',
                    canEvade: true,
                    use: (attacker, defender) => {
                        const madRam = attacker.scheduler.task
                            .id('chimera__mad-ram')
                            .all.turns(3)
                            .end(() =>
                                defender.takeDamage
                                    .physical(100)
                                    .run(damage => `**${defender.name}** lost ${damage} HP due to Mad Ram`)
                            )
                            .run(() => {})

                        defender.applyEffect(madRam)

                        attacker.addLogMessage(`**${attacker.name}** used Mad Ram`)
                    },
                },
            ],
        })
    }
}
