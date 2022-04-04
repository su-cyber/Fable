import { GuildMember } from 'discord.js'
import { emoji } from '../../lib/utils/emoji'
import { ClassEntity } from '../classes'
import { burning } from '../effects/burning'
import { AttackType } from '../enums'

class Mage extends ClassEntity {
    static create(user: GuildMember) {
        return new Mage({
            user,
            health: 100,
            attackDamage: 10,
            magicPower: 0,
            armor: 0,
            evasion: 0.8,
            magicResistance: 0,
            skills: [
                {
                    cooldown: 0,
                    name: 'Basic Attack',
                    description: 'Basic Attack',
                    use: (attacker, defender) =>
                        defender
                            .takeDamage({ damage: attacker.attackDamage, type: AttackType.PHYSICAL })
                            .send(`**${attacker.name}** used Basic Attack`),
                },
                {
                    cooldown: 0,
                    name: 'Fireball',
                    description: 'Dealing damage and burning them for 3 turns',
                    use: (attacker, defender) => {
                        defender.applyEffect(burning)

                        // prettier-ignore
                        attacker.scheduler.task
                            .all
                            .isEffect
                            .turns(3)
                            .end(() => defender.removeEffect(burning))
                            .run(() => 
                                defender
                                    .takeDamage({ damage: 5, type: AttackType.MAGICAL, canEvade: false })
                                    .send(damage => `**${defender.name}** lost ${damage} HP due to ${emoji.FIRE}`))

                        defender
                            .takeDamage({ damage: 15, type: AttackType.MAGICAL })
                            .send(`**${attacker.name}** used Fireball`, `**${defender.name}** is burning`)
                    },
                },
            ],
        })
    }
}

function mage(user: GuildMember) {
    return Mage.create(user)
}

export { mage }
