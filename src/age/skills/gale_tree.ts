import { GuildMember } from 'discord.js'
import { emoji } from '../../lib/utils/emoji'
import { calculate, ClassEntity } from '../classes'
import { bleeding } from '../effects/bleeding'
import { blind } from '../effects/blind'
import { burning } from '../effects/burning'
import { stun } from '../effects/stun'

const gale_tree=[
    {
        name: 'Razor Kick',
        cooldown: 0,
        description: `A swift and powerful kick that unleashes a slash of wind to strike the enemy.`,
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Razor Kick`)
            defender.takeDamage
                .physical(attacker.attackDamage+20)
                .run(damage => `**${defender.name}** lost ${damage} HP by a sharp wind slash`)
        }
    },{
        name: 'Mighty Breath',
        cooldown: 0,
        description: 'A skill that allows the user to exhale a strong burst of wind to deal damage to the enemy.',
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Mighty Breath`)
            defender.takeDamage
                .magical(attacker.magicPower+20)
                .run(damage => `**${defender.name}** lost ${damage} HP by a strong burst of wind`)
        }
    },{
        name: 'Tempest Fist',
        cooldown: 0,
        description: `A punch that creates a sharp whirlwind around the user's arm, dealing damage to enemies.`,
        canEvade: true,
        mana_cost: 3,
        damage:45,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Tempest Fist`)
            defender.takeDamage
                .physical(attacker.attackDamage+45)
                .run(damage => `**${attacker.name}** covers their arm by a sharp whirlwind and punches **${defender.name}** causing ${damage} damage`)
        }
    },{
        name: 'Wind Palm',
        cooldown: 0,
        description: 'A hand strike that releases a gust of wind, sending enemies flying backwards.',
        canEvade: true,
        mana_cost: 1,
        damage:45,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Wind Palm`)
            defender.takeDamage
                .magical(attacker.magicPower+45)
                .run(damage => `**${defender.name}** lost ${damage} HP  by a strong gust of wind`)
        }
    },
    {
        cooldown: 0,
        name: 'Armor of Sky',
        description: 'A skill that creates a protective shield of wind around the user.',
        canEvade: false,
        type: 'self',
        damage:0,
        mana_cost: 6,
        use: (attacker, defender) => {
            attacker.armor = 1.5*attacker.armor
            attacker.magicResistance = 1.5*attacker.magicResistance


            attacker.addLogMessage(
                `**${attacker.name}** used Armor of Sky`,
                `A protective shield of wind appears around **${attacker.name}** and increases defenses by 1.5x`
            )
            
           
        },
    },
    {
        cooldown: 0,
        name: 'Breath of Life',
        description: `A skill that summons a healing wind that rapidly restores the user's health.`,
        canEvade: false,
        type: 'self',
        damage:0,
        mana_cost: 6,
        use: (attacker, defender) => {
            attacker.health = attacker.health+100


            attacker.addLogMessage(
                `**${attacker.name}** used Breath of Life`,
                ` **${attacker.name}** summons a healing wind and heals by 100HP`
            )
            
           
        },
    },{
        name: 'Windwalk Strike',
        cooldown: 0,
        description: `A skill that allows the user to run in the sky and deliver a swift strike to the enemy.`,
        canEvade: true,
        mana_cost: 8,
        damage:65,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Windwalk Strike`)
            defender.takeDamage
                .physical(attacker.attackDamage+65)
                .run(damage => `**${attacker.name}** runs towards the sky and strikes **${defender.name}** from above causing ${damage} damage`)
        }
    },{
        name: 'Sonic Scythe',
        cooldown: 0,
        description: 'A sharp blade of wind that slashes through enemies with incredible speed.',
        canEvade: true,
        mana_cost: 8,
        damage:65,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Sonic Scythe`)
            defender.takeDamage
                .magical(attacker.magicPower+65)
                .run(damage => `**${attacker.name}** unleashes a sharp blade of wind on **${defender.name}** causing ${damage} damage`)
        }
    },
]

export default gale_tree