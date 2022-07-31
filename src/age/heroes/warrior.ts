import { GuildMember } from 'discord.js'
import { emoji } from '../../lib/utils/emoji'
import { calculate, ClassEntity } from '../classes'
import { bleeding } from '../effects/bleeding'
import { burning } from '../effects/burning'

export class Warrior extends ClassEntity {
    static create(user: GuildMember) {
        return new Warrior({
            user,
            health: 1000,
            attackDamage: 100,
            mana:50,
            magicPower: 0,
            armor: 10,
            evasion: 0.1,
            magicResistance: 10,
            skills: [
                {
                    name: 'Basic attack',
                    cooldown: 0,
                    description: 'Basic attack',
                    canEvade: true,
                    mana_cost: 0,
                    type: 'physical',
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`**${attacker.name}** used Basic attack`)
                        defender.takeDamage
                            .physical(attacker.attackDamage)
                            .run(damage => `**${defender.name}** lost ${damage} HP by Basic Attack`)
                    }
                },
                {
                    name: 'Charged Attack',
                    cooldown: 0,
                    description: 'Charge a powerful attack for 1 turn',
                    canEvade: true,
                    mana_cost: 0,
                    type: 'physical',
                    use: (attacker, defender) => {
                        
                        const chargedAttack = attacker.scheduler.task
                            .turns(1)
                            .turnOf(attacker)
                            .skipTurn.run(() =>
                                defender.takeDamage
                                    .physical(40)
                                    .run(damage => `**${defender.name}** lost ${damage} HP by Charged Attack`)
                        
                            )
                        
                        attacker.applyEffect(chargedAttack)

                        attacker.addLogMessage(`**${attacker.name}** is charging...`)
                    },
                },
                {
                    cooldown: 0,
                    name: 'Deep cut',
                    description: 'Apply bleeding for 3 turns',
                    canEvade: true,
                    mana_cost: 0,
                    type: 'physical',
                    use: (attacker, defender) => {
                        const deepCut = attacker.scheduler.task
                            .turns(3)
                            .all.effect(bleeding)
                            .end(() => defender.removeEffect(bleeding))
                            .run(() =>
                                defender.takeDamage
                                    .physical(7)
                                    .run(
                                        damage =>
                                            `**${defender.name}** lost ${damage} HP due to ${emoji.BLEED}`
                                    )
                            )

                        defender.applyEffect(deepCut)

                        attacker.addLogMessage(
                            `**${attacker.name}** used Deep cut`,
                            `**${defender.name}** is bleeding`
                        )
                    },
                },
                {
                    cooldown: 0,
                    name: 'Fireball',
                    description: 'Dealing damage and burning them for 3 turns',
                    canEvade: true,
                    mana_cost: 20,
                    type: 'magical',
                    use: (attacker, defender) => {
                        const fireball = attacker.scheduler.task.all
                            .effect(burning)
                            .turns(3)
                            .end(() => defender.removeEffect(burning))
                            .run(() =>
                                defender.takeDamage
                                    .physical(5)
                                    .run(damage => `**${defender.name}** lost ${damage} HP by Burning`)
                            )
                        defender.applyEffect(fireball)

                        defender.takeDamage
                            .magical(15)
                            .run(damage => `**${defender.name}** lost ${damage} HP by Fireball`)
                    },
                }
            ],
        })
    }
}
