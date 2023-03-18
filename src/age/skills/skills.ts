import { GuildMember } from 'discord.js'
import { emoji } from '../../lib/utils/emoji'
import { calculate, ClassEntity } from '../classes'
import { bleeding } from '../effects/bleeding'
import { blind } from '../effects/blind'
import { burning } from '../effects/burning'
import { stun } from '../effects/stun'

const skills = [
    {
        name: 'Basic attack',
        cooldown: 0,
        description: 'Basic attack',
        canEvade: true,
        mana_cost: 0,
        damage:0,
        type: 'physical',
        use: (attacker, defender) =>{
            const basic = attacker.scheduler.task.all
            .effect(stun)
            .turns(4)
            .end(() => defender.removeEffect(stun))
            .run(() =>
            {}
            )
        if(defender.effects.length == 0){
            defender.applyEffect(basic)
        }
        
            attacker.addLogMessage(`**${attacker.name}** used Basic attack`)
            defender.takeDamage
                .physical(attacker.attackDamage+20)
                .run(damage => `**${defender.name}** lost ${damage} HP by Basic Attack`)
        }
    },
    {
        name: 'Charged Attack',
        cooldown: 0,
        description: 'Charge a powerful attack for 1 turn',
        canEvade: true,
        mana_cost: 0,
        damage:40,
        type: 'physical',
        use: (attacker, defender) => {
            
            const chargedAttack = attacker.scheduler.task
                .turns(1)
                .turnOf(attacker)
                .skipTurn.run(() =>
                    defender.takeDamage
                        .physical(attacker.attackDamage+40)
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
        damage:20,
        use: (attacker, defender) => {
            const deepCut = attacker.scheduler.task
                .turns(3)
                .all.effect(bleeding)
                .end(() => defender.removeEffect(bleeding))
                .run(() =>
                    defender.takeDamage
                        .physical(attacker.attackDamage+20)
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
        damage:100,
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
    }, {
        name: 'Shattering Kick',
        cooldown: 0,
        description: 'A powerful kick that deals low damage to the opponent',
        canEvade: true,
        mana_cost: 0,
        damage:15,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Shattering Kick`)
            defender.takeDamage
                .physical(attacker.attackDamage+15)
                .run(damage => `**${defender.name}** lost ${damage} HP by Shattering Kick`)
        }
    },{
        name: 'Flashing Blade',
        cooldown: 0,
        description: 'A lightning-fast sword strike that deals low damage to the opponent',
        canEvade: true,
        mana_cost: 2,
        damage:25,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Flashing Blade`)
            defender.takeDamage
                .physical(attacker.attackDamage+25)
                .run(damage => `**${defender.name}** lost ${damage} HP by Flashing Blade`)
        }
    },{
        name: 'Predator Shot',
        cooldown: 0,
        description: 'A precise arrow shot that deals moderate damage to the opponent and causes bleeding',
        canEvade: true,
        mana_cost:3,
        damage:40,
        type: 'physical',
        use: (attacker, defender) =>{
            const predatorShot = attacker.scheduler.task
                .turns(3)
                .all.effect(bleeding)
                .end(() => defender.removeEffect(bleeding))
                .run(() =>
                    defender.takeDamage
                        .physical(10)
                        .run(
                            damage =>
                                `**${defender.name}** lost ${damage} HP due to ${emoji.BLEED}`
                        )
                )

            defender.applyEffect(predatorShot)
            
            defender.takeDamage
            .physical(attacker.attackDamage+40)
            .run(damage => `**${defender.name}** lost ${damage} HP by Predator Shot\n**${defender.name}** is bleeding!`)
        }
    },{
        name: 'Flame Whip',
        cooldown: 0,
        description: 'A skill that allows the user to whip their enemies with a fiery lash.',
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Flame Whip`)
            defender.takeDamage
                .physical(attacker.attackDamage+20)
                .run(damage => `**${defender.name}** lost ${damage} HP by Flame Whip`)
        }
    },{
        name: 'Flare Breath',
        cooldown: 0,
        description: 'A skill that lets the user exhale a burst of flames at their foes.',
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Flare Breath`)
            defender.takeDamage
                .magical(attacker.magicPower+20)
                .run(damage => `**${defender.name}** lost ${damage} HP by Flare Breath`)
        }
    },{
        name: 'Erupting Fist',
        cooldown: 0,
        description: 'A skill that lets the user exhale a burst of flames at their foes.',
        canEvade: true,
        mana_cost: 3,
        damage:45,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Erupting Fist`)
            defender.takeDamage
                .physical(attacker.attackDamage+45)
                .run(damage => `**${defender.name}** lost ${damage} HP by Erupting Fist`)
        }
    },{
        name: 'Scattering Flame Bullet',
        cooldown: 0,
        description: 'A skill that lets the user exhale a burst of flames at their foes.',
        canEvade: true,
        mana_cost: 1,
        damage:45,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Scattering Flame Bullet`)
            defender.takeDamage
                .magical(attacker.magicPower+45)
                .run(damage => `**${defender.name}** lost ${damage} HP by Scattering Flame Bullet`)
        }
    },
]

export default skills