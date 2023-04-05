import { GuildMember } from 'discord.js'
import { emoji } from '../../lib/utils/emoji'
import { calculate, ClassEntity } from '../classes'
import { bleeding } from '../effects/bleeding'
import { blind } from '../effects/blind'
import { burning } from '../effects/burning'
import { stun } from '../effects/stun'

const wanderer_tree=[
    {
        name: 'Scissor Kick',
        cooldown: 0,
        description: 'The Wanderer kicks the target with a powerful scissor kick, dealing low damage.',
        canEvade: true,
        mana_cost: 0,
        damage:15,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Scissor Kick`)
            defender.takeDamage
                .physical(attacker.attackDamage+15)
                .run(damage => `**${defender.name}** lost ${damage} HP by a scissor kick`)
        }
    },{
        name: 'Venomous Strike',
        cooldown: 0,
        description: 'The Wanderer imbues their Katar with venom, delivering a swift strike that deals low damage and poisons the enemy.',
        canEvade: true,
        mana_cost: 2,
        damage:25,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Venomous Strike`)
            defender.takeDamage
                .physical(attacker.attackDamage+25)
                .run(damage => `**${defender.name}** lost ${damage} HP by being hit by a Katar laced with venom`)
        }
    },{
        name: 'Beast Trap Takedown',
        cooldown: 0,
        description: 'The Wanderer sets a beast trap that deals low damage and stuns the enemy for a short time.',
        canEvade: true,
        mana_cost:3,
        damage:40,
        type: 'physical',
        use: (attacker, defender) =>{

            attacker.addLogMessage(
                `**${attacker.name}** used Beast Trap Takedown`
            )
            defender.takeDamage
            .physical(attacker.attackDamage+40)
            .run(damage => `**${defender.name}** lost ${damage} HP by gettig stuck in a beast trap`)
        }
    },{
        name: `Fist of the Alpha`,
        cooldown: 0,
        description: 'The Wanderer channels their inner strength, delivering a powerful punch with their Gauntlet that deals moderate damage.',
        canEvade: true,
        mana_cost: 6,
        damage:65,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Fist of the Alpha`)
            defender.takeDamage
                .physical(attacker.attackDamage+65)
                .run(damage => `**${defender.name}** lost ${damage} HP by a powerful punch`)
        }
    },{
        cooldown: 0,
        name: `Chameleon Cloak`,
        description: `The Wanderer changes the color of their armor to blend in with their surroundings, becoming invisible to enemies for 2 turns`,
        canEvade: false,
        type: 'self',
        damage:0,
        mana_cost: 6,
        use: (attacker, defender) => {
            const evasion = defender.evasion
            const invisible = attacker.scheduler.task
                            .id('sorceror_curse')
                            .turnOf(defender)
                            .turns(2)
                            .end(() => {
                                defender.removeEffect(invisible)
                                defender.evasion = evasion
                            })
                            .run(() =>
                            attacker.evasion = 1
                            )

                        defender.applyEffect(invisible)
                        attacker.addLogMessage(`**${attacker.name}** used Chameleon Cloak`,
                        `**${attacker.name}** turned invisible!`
                        )
           
        },
    },
]

export default wanderer_tree