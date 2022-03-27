import { GuildMember } from 'discord.js'
import { ClassEntity, effect, Skill } from '../classes'
import { AttackType } from '../enums'

class Mage extends ClassEntity {
    static create(user: GuildMember) {
        return new Mage({
            id: user.id,
            name: user.user.username,
            health: 100,
            attackDamage: 10,
            magicPower: 0,
            armor: 0,
            magicResistance: 0,
            effects: new Set(),
            skills: [
                new Skill({
                    cooldown: 0,
                    name: 'Basic Attack',
                    description: 'Basic Attack',
                    use: async (sendInfoMessage, scheduler, attacker, defender) => {
                        const damage = attacker.attackDamage
                        defender.takeDamage({ damage, attackType: AttackType.PHYSICAL })

                        await sendInfoMessage(`**${attacker.name}** used Basic Attack`)
                    },
                }),
                new Skill({
                    cooldown: 0,
                    name: 'Fireball',
                    description:
                        'Shoots a fireball at the opponent dealing damage and burning them for 3 turns',
                    use: async (sendInfoMessage, scheduler, attacker, defender) => {
                        defender.applyEffect(effects.burning)

                        async function run() {
                            const damage = 5
                            const takeDamage = defender.takeDamage({ damage, attackType: AttackType.MAGICAL })
                            await sendInfoMessage(`**${defender.name}** lost ${takeDamage} HP due to 🔥`)
                        }

                        // prettier-ignore
                        scheduler.task
                            .id('mage__fireball')
                            .all
                            .isEffect
                            .turns(3)
                            .end(() => defender.removeEffect(effects.burning))
                            .run(run)

                        const damage = 15
                        defender.takeDamage({ damage, attackType: AttackType.MAGICAL })

                        await sendInfoMessage(`**${attacker.name}** used Fireball`)
                        await sendInfoMessage(`**${defender.name}** is burning`)
                    },
                }),
            ],
        })
    }
}

const effects = {
    burning: effect({
        name: 'Burning',
        description: 'Burning',
        duration: 3,
        stacks: 1,
        emoji: '🔥',
        use: async (attacker, defender) => {
            const damage = 5
            defender.takeDamage({ damage, attackType: AttackType.MAGICAL })
        },
    }),
}

function mage(user: GuildMember) {
    return Mage.create(user)
}

export { mage }
