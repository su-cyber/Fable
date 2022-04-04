import { GuildMember } from 'discord.js'
import { emoji } from '../../lib/utils/emoji'
import { ClassEntity } from '../classes'
import { bleeding } from '../effects/bleeding'
import { AttackType } from '../enums'

class Warrior extends ClassEntity {
    static create(user: GuildMember) {
        return new Warrior({
            user,
            health: 1000,
            attackDamage: 10,
            magicPower: 0,
            armor: 10,
            evasion: 0.1,
            magicResistance: 10,
            skills: [
                {
                    name: 'Basic attack',
                    cooldown: 0,
                    description: 'Basic attack',
                    use: (attacker, defender) =>
                        defender
                            .takeDamage({
                                damage: attacker.attackDamage,
                                type: AttackType.PHYSICAL,
                            })
                            .send(`**${attacker.name}** used Basic Attack`),
                },
                {
                    name: 'Charged Attack',
                    cooldown: 0,
                    description: 'Charge a powerful attack for 1 turn',
                    use: (attacker, defender) => {
                        // prettier-ignore
                        attacker.scheduler.task
                            .turns(1)
                            .turnOf(attacker)
                            .skipTurn
                            .run(() =>
                                defender
                                    .takeDamage({ damage: 40, type: AttackType.PHYSICAL })
                                    .send(`**${defender.name}** suffered a powerful attack`)
                            )

                        attacker.addLogMessage(`**${attacker.name}** is carrying a powerful attack`)
                    },
                },
                {
                    cooldown: 0,
                    name: 'Deep cut',
                    description: 'Apply bleeding for 3 turns',
                    use: (attacker, defender) => {
                        defender.applyEffect(bleeding)

                        // prettier-ignore
                        attacker.scheduler.task
                            .all
                            .isEffect
                            .turns(3)
                            .end(() => defender.removeEffect(bleeding))
                            .run(() => 
                                defender
                                    .takeDamage({ damage: 7, type: AttackType.PHYSICAL, canEvade: false })
                                    .send(damage => `**${defender.name}** lost ${damage} HP due to ${emoji.BLEED}`))

                        attacker.addLogMessage(
                            `**${attacker.name}** used Deep cut`,
                            `**${defender.name}** is bleeding`
                        )
                    },
                },
            ],
        })
    }
}

function warrior(user: GuildMember) {
    return Warrior.create(user)
}

export { warrior }
