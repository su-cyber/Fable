import {  User } from 'discord.js'
import { emoji } from '../../lib/utils/emoji'
import { ClassEntity } from '../classes'
import { bleeding } from '../effects/bleeding'
import { burning } from '../effects/burning'
import { CommandInteraction } from 'discord.js'
import { removeIndentation } from '../../utils'
import { Entity } from '../classes/entity'


export class Warrior extends ClassEntity {

    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        this.sendDeathMessage(interaction,this)
    }


    async sendDeathMessage(
        interaction: CommandInteraction,
        killed: Entity
    ) {
       
        const text = `
            **${killed.name} Barely escapes from the jaws of death and wakes up in a safe spot with critical health.**
        `

        await interaction.channel.send(removeIndentation(text))
    }
    
    
    static create(user: User) {
        return new Warrior({
            user,
            health: 1000,
            level:1,
            attackDamage: 100,
            mana:50,
            magicPower: 0,
            armor: 10,
            evasion: 0.05,
            speed: 10,
            magicResistance: 10,
            passive_skills:[],
            skills: [
                {
                    name: 'Basic attack',
                    cooldown: 0,
                    description: 'Basic attack',
                    canEvade: true,
                    mana_cost: 0,
                    damage:0,
                    type: 'physical',
                    element:"normal",
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
                    damage:0,
                    element:"normal",
                    type: 'physical',
                    use: (attacker, defender) => {
                        
                        const chargedAttack = attacker.scheduler.task
                            .turns(1)
                            .turnOf(attacker)
                            .skipTurn.run(() =>
                                defender.takeDamage
                                    .physical(attacker.attackDamage*2)
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
                    damage:0,
                    element:"normal",
                    type: 'physical',
                    use: (attacker, defender) => {
                        const deepCut = attacker.scheduler.task
                            .turns(3)
                            .all.effect(bleeding)
                            .end(() => defender.removeEffect(bleeding))
                            .run(() =>
                                defender.takeDamage
                                    .physical(attacker.attackDamage*0.5)
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
                    damage:0,
                    mana_cost: 20,
                    type: 'magical',
                    element:"normal",
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
                            .magical(attacker.magicPower)
                            .run(damage => `**${defender.name}** lost ${damage} HP by Fireball`)
                    },
                }
            ],
        })
    }
}
