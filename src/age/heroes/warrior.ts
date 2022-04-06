import { GuildMember } from 'discord.js'
import { ClassEntity } from '../classes'
import { bleeding } from '../effects/bleeding'

export class Warrior extends ClassEntity {
    static create(user: GuildMember) {
        return new Warrior({
            user,
            health: 1000,
            attackDamage: 10,
            magicPower: 0,
            armor: 10,
            evasion: 0.7,
            magicResistance: 10,
            skills: [
                {
                    name: 'Basic attack',
                    cooldown: 0,
                    description: 'Basic attack',
                    use: (attacker, defender) =>
                        defender.takeDamage
                            .physical(attacker.attackDamage)
                            .run(damage => `**${defender.name}** lost ${damage} HP by Basic Attack`),
                },
                {
                    name: 'Charged Attack',
                    cooldown: 0,
                    description: 'Charge a powerful attack for 1 turn',
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

                        attacker.addLogMessage(`**${attacker.name}** is carrying a powerful attack`)
                    },
                },
                {
                    cooldown: 0,
                    name: 'Deep cut',
                    description: 'Apply bleeding for 3 turns',
                    use: (attacker, defender) => {
                        const deepCut = attacker.scheduler.task
                            .turns(1)
                            .turnOf(attacker)
                            .effect(bleeding)
                            .skipTurn.run(() =>
                                defender.takeDamage
                                    .physical(7)
                                    .run(damage => `**${defender.name}** lost ${damage} HP by Charged Attack`)
                            )

                        defender.applyEffect(deepCut)

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
