import { GuildMember } from 'discord.js'
import { ClassEntity } from '../classes'
import { burning } from '../effects/burning'

export class Mage extends ClassEntity {
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
                    canEvade: true,
                    use: (attacker, defender) =>
                        defender.takeDamage
                            .physical(attacker.attackDamage)
                            .run(damage => `**${defender.name}** lost ${damage} HP by Basic Attack`),
                },
                {
                    cooldown: 0,
                    name: 'Fireball',
                    description: 'Dealing damage and burning them for 3 turns',
                    canEvade: true,
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
                },
            ],
        })
    }
}
