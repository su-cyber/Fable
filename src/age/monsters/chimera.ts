import { CommandInteraction } from 'discord.js'
import { Dropper } from '../dropper'
import { ClassEntity, Entity, MonsterEntity } from '../classes'
import { AttackType } from '../enums'
import { teddyBear } from '../items'
import { poisoning } from '../effects/poisoning'
import { emoji } from '../../lib/utils/emoji'
import { burning } from '../effects/burning'

export class Chimera extends MonsterEntity {
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
                    use: (attacker, defender) => {
                        defender.applyEffect(burning)

                        // prettier-ignore
                        attacker.scheduler.task
                            .id('chimera__fire-breath')
                            .all
                            .isEffect
                            .turns(3)
                            .end(() => defender.removeEffect(poisoning))
                            .run(() => 
                                defender
                                    .takeDamage({ damage: 10, type: AttackType.PHYSICAL, canEvade: false })
                                    .send(damage => `**${attacker.name}** lost ${damage} HP due to ${emoji.FIRE}`))

                        defender
                            .takeDamage({ damage: 50, type: AttackType.MAGICAL })
                            .send(`**${attacker.name}** used Fire breath`)
                    },
                },
                {
                    cooldown: 0,
                    name: 'Venom splash',
                    description: 'Increases attack damage for a short time',
                    use: (attacker, defender) => {
                        defender.applyEffect(burning)

                        // prettier-ignore
                        attacker.scheduler.task
                            .id('chimera__venom-splash')
                            .all
                            .isEffect
                            .turns(3)
                            .end(() => defender.removeEffect(poisoning))
                            .run(() => 
                                defender
                                    .takeDamage({ damage: 10, type: AttackType.PHYSICAL, canEvade: false })
                                    .send(damage => `**${attacker.name}** lost ${damage} HP due to ${emoji.POISON}`))

                        defender
                            .takeDamage({ damage: 50, type: AttackType.PHYSICAL })
                            .send(`**${attacker.name}** used Venom splash`)
                    },
                },
                {
                    cooldown: 0,
                    name: 'Aerial Combat',
                    description: 'Increases attack damage for a short time',
                    use: (attacker, defender) => {
                        // prettier-ignore
                        attacker.scheduler.task
                            .id('chimera__aerial-combat')
                            .turnOf(defender)
                            .skipTurn
                            .turns(2)
                            .run(() => {})

                        attacker.evasion *= 2
                        defender.addLogMessage(`**${attacker.name}** used Aerial Combat`)
                    },
                },
                {
                    cooldown: 0,
                    name: 'Mad Ram',
                    description: 'Increases attack damage for a short time',
                    use: (attacker, defender) => {
                        // prettier-ignore
                        attacker.scheduler.task
                            .id('chimera__mad-ram')
                            .all
                            .isEffect
                            .turns(3)
                            .end(() => 
                                defender
                                    .takeDamage({ damage: 100, type: AttackType.PHYSICAL })
                                    .send(damage => `**${defender.name}** suffered ${damage} HP`))
                            .run(() => {})

                        attacker.addLogMessage(`**${attacker.name}** used Mad Ram`)
                    },
                },
            ],
        })
    }
}
