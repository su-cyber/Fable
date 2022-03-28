import { GuildMember } from 'discord.js'
import { ClassEntity, skill } from '../classes'
import { Bleeding } from '../effects/bleeding'
import { AttackType } from '../enums'

class Warrior extends ClassEntity {
    static create(user: GuildMember) {
        return new Warrior({
            id: user.id,
            name: user.user.username,
            health: 100,
            attackDamage: 10,
            magicPower: 0,
            armor: 10,
            magicResistance: 10,
            effects: new Set(),
            skills: [
                skill({
                    name: 'Basic attack',
                    cooldown: 0,
                    description: 'Basic attack',
                    use: async (sendInfoMessage, scheduler, attacker, defender) => {
                        const damage = attacker.attackDamage
                        defender.takeDamage({ damage, attackType: AttackType.PHYSICAL })

                        await sendInfoMessage(`**${attacker.name}** used Basic attack`)
                    },
                }),
                skill({
                    name: 'Charged Attack',
                    cooldown: 0,
                    description: 'Charge a powerful attack for 1 turn',
                    use: async (sendInfoMessage, scheduler, attacker, defender) => {
                        async function run() {
                            const damage = 40
                            defender.takeDamage({ damage, attackType: AttackType.PHYSICAL })

                            await sendInfoMessage(`**${defender.name}** suffered a powerful attack`)
                        }

                        scheduler.task
                            .id('warrior__charged_attack')
                            .turns(1)
                            .check((newAttacker, newDefender) => newAttacker === attacker)
                            .skipTurn.run(run)

                        await sendInfoMessage(`**${attacker.name}** is carrying a powerful attack`)
                    },
                }),
                skill({
                    cooldown: 0,
                    name: 'Deep cut',
                    description: 'Apply bleeding for 3 turns',
                    use: async (sendInfoMessage, scheduler, attacker, defender) => {
                        defender.applyEffect(effects.bleeding)

                        async function run() {
                            const damage = effects.bleeding.use(attacker, defender)
                            await sendInfoMessage(`**${defender.name}** lost ${damage} HP due to 🩸`)
                        }

                        // prettier-ignore
                        scheduler.task
                            .id('warrior__deep_cut')
                            .all
                            .isEffect
                            .turns(3)
                            .end(() => defender.removeEffect(effects.bleeding))
                            .run(run)

                        await sendInfoMessage(`**${attacker.name}** used Deep cut`)
                        await sendInfoMessage(`**${defender.name}** is bleeding`)
                    },
                }),
            ],
        })
    }
}

const effects = {
    bleeding: new Bleeding().setUse((attacker, defender) => {
        const damage = 7
        return defender.takeDamage({ damage, attackType: AttackType.PHYSICAL })
    }),
}

function warrior(user: GuildMember) {
    return Warrior.create(user)
}

export { warrior }
