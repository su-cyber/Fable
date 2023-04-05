import { GuildMember } from 'discord.js'
import { emoji } from '../../lib/utils/emoji'
import { calculate, ClassEntity } from '../classes'
import { bleeding } from '../effects/bleeding'
import { blind } from '../effects/blind'
import { burning } from '../effects/burning'
import { stun } from '../effects/stun'

const bloom_tree=[
    {
        name: 'Splinter Burst',
        cooldown: 0,
        description: `A skill that allows the user to throw sharp wood splinters at high speed, damaging the opponent.`,
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Splinter Burst`)
            defender.takeDamage
                .physical(attacker.attackDamage+20)
                .run(damage => `**${defender.name}** lost ${damage} HP by a barrage of sharp wood splinters`)
        }
    },{
        name: 'Spore Spread',
        cooldown: 0,
        description: 'A skill that releases a cloud of poisonous spores that can burst and damage enemies.',
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Spore Spread`)
            defender.takeDamage
                .magical(attacker.magicPower+20)
                .run(damage => `**${defender.name}** lost ${damage} HP by poisonous spores`)
        }
    },{
        name: 'Lumber Smack',
        cooldown: 0,
        description: `A skill that unleashes a powerful punch imbued with thick wood, dealing massive damage.`,
        canEvade: true,
        mana_cost: 3,
        damage:45,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Lumber Smack`)
            defender.takeDamage
                .physical(attacker.attackDamage+45)
                .run(damage => `**${attacker.name}** covers their arm by thick wood and punches **${defender.name}** causing ${damage} damage`)
        }
    },{
        name: 'Sap Blast',
        cooldown: 0,
        description: 'A skill that fires a blast of sticky sap that sticks to the enemies and damages them.',
        canEvade: true,
        mana_cost: 1,
        damage:45,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Sap Blast`)
            defender.takeDamage
                .magical(attacker.magicPower+45)
                .run(damage => `**${defender.name}** lost ${damage} HP by a blast of sticky sap`)
        }
    },
    {
        cooldown: 0,
        name: 'Armor of Wood',
        description: 'A skill that creates a protective shield of wood around the user.',
        canEvade: false,
        type: 'self',
        damage:0,
        mana_cost: 6,
        use: (attacker, defender) => {
            attacker.armor = 1.5*attacker.armor
            attacker.magicResistance = 1.5*attacker.magicResistance


            attacker.addLogMessage(
                `**${attacker.name}** used Armor of Wood`,
                `A protective shield of wood appears around **${attacker.name}** and increases defenses by 1.5x`
            )
            
           
        },
    },
    {
        cooldown: 0,
        name: 'Photosynthesis',
        description: `A skill that rapidly restores the user's health by absorbing energy from the sun.`,
        canEvade: false,
        type: 'self',
        damage:0,
        mana_cost: 6,
        use: (attacker, defender) => {
            attacker.health = attacker.health+100


            attacker.addLogMessage(
                `**${attacker.name}** used Photosynthesis`,
                `**${attacker.name}** absorbs sunlight and heals by 100HP`
            )
            
           
        },
    },{
        name: 'Root Slam',
        cooldown: 0,
        description: `A skill that binds the enemy to a root and slams them into the ground.`,
        canEvade: true,
        mana_cost: 8,
        damage:65,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Root Slam`)
            defender.takeDamage
                .physical(attacker.attackDamage+65)
                .run(damage => `**${defender.name}** gets bound by roots and slammed into the ground causing ${damage} damage`)
        }
    },{
        name: 'Spiked Wooden Ball',
        cooldown: 0,
        description: 'A skill that hurls a massive spiked wooden ball at high speed, dealing damage to enemies in its path.',
        canEvade: true,
        mana_cost: 8,
        damage:65,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Spiked Wooden Ball`)
            defender.takeDamage
                .magical(attacker.magicPower+65)
                .run(damage => `**${attacker.name}** unleashes a huge spiked wooden ball at **${defender.name}** causing ${damage} damage`)
        }
    },
]

export default bloom_tree