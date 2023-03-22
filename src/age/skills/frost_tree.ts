import { GuildMember } from 'discord.js'
import { emoji } from '../../lib/utils/emoji'
import { calculate, ClassEntity } from '../classes'
import { bleeding } from '../effects/bleeding'
import { blind } from '../effects/blind'
import { burning } from '../effects/burning'
import { stun } from '../effects/stun'

const frost_tree=[
    {
        name: 'Frost Touch',
        cooldown: 0,
        description: `A skill that freezes enemies with a touch, dealing damage to the enemy.`,
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Frost Touch`)
            defender.takeDamage
                .physical(attacker.attackDamage+20)
                .run(damage => `**${defender.name}** froze in place and lost ${damage} HP`)
    }
},{
        name: 'Iced Shards',
        cooldown: 0,
        description: 'A skill that fires sharp, icy projectiles that damage and freeze enemies on impact.',
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Iced Shards`)
            defender.takeDamage
                .magical(attacker.magicPower+20)
                .run(damage => `**${defender.name}** lost ${damage} HP by a barrage of icy projectiles`)
        }
    },{
        name: 'Frost Bite',
        cooldown: 0,
        description: `A skill that bites enemies with a freezing cold, dealing damage and slowing them down.`,
        canEvade: true,
        mana_cost: 3,
        damage:45,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Frost Bite`)
            defender.takeDamage
                .physical(attacker.attackDamage+45)
                .run(damage => `**${defender.name}** lost ${damage} HP by a freezing cold attack`)
        }
    },{
        name: 'Chilling Wind',
        cooldown: 0,
        description: 'A skill that creates a blast of icy wind that damages and freezes enemies.',
        canEvade: true,
        mana_cost: 1,
        damage:45,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Chilling Wind`)
            defender.takeDamage
                .magical(attacker.magicPower+45)
                .run(damage => `**${defender.name}** lost ${damage} HP  by a blast of icy wind`)
        }
    },
    {
        cooldown: 0,
        name: 'Armor of Ice',
        description: 'A skill that creates a protective shield of ice around the user.',
        canEvade: false,
        type: 'self',
        damage:0,
        mana_cost: 6,
        use: (attacker, defender) => {
            attacker.armor = 1.5*attacker.armor
            attacker.magicResistance = 1.5*attacker.magicResistance


            attacker.addLogMessage(
                `**${attacker.name}** used Armor of Lightning`,
                `A protective shield of ice appears around **${attacker.name}** and increases defenses by 1.5x`
            )
            
           
        },
    },
    {
        cooldown: 0,
        name: `Winter's Embrace`,
        description: `A skill that summons a healing snowfall that rapidly restores the user's health.`,
        canEvade: false,
        type: 'self',
        damage:0,
        mana_cost: 6,
        use: (attacker, defender) => {
            attacker.health = attacker.health+100


            attacker.addLogMessage(
                `**${attacker.name}** used Winter's Embrace`,
                `**${attacker.name}** summons a healing snowfall and heals by 100HP`
            )
            
           
        },
    },{
        name: 'Glacial Lance',
        cooldown: 0,
        description: `A skill that summons a massive ice spear that impales and damages enemies.`,
        canEvade: true,
        mana_cost: 8,
        damage:65,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Glacial Lance`)
            defender.takeDamage
                .physical(attacker.attackDamage+65)
                .run(damage => `**${attacker.name}** unleashes a massive ice spear on **${defender.name}** causing ${damage} damage`)
        }
    },{
        name: 'Ice Scatter Shot',
        cooldown: 0,
        description: 'A skill that fires a spread of icy projectiles that damage the enemies.',
        canEvade: true,
        mana_cost: 8,
        damage:65,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Ice Scatter Shot`)
            defender.takeDamage
                .magical(attacker.magicPower+65)
                .run(damage => `**${attacker.name}** shoots a barrage of icy projectiles on **${defender.name}** causing ${damage} damage`)
        }
    },
]

export default frost_tree