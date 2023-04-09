import { GuildMember } from 'discord.js'
import { emoji } from '../../lib/utils/emoji'
import { calculate, ClassEntity } from '../classes'
import { bleeding } from '../effects/bleeding'
import { blind } from '../effects/blind'
import { burning } from '../effects/burning'
import { stun } from '../effects/stun'

const alloy_tree=[
    {
        name: 'Metal Bash',
        cooldown: 0,
        description: `A skill that enables the user to cover themselves in steel and bash onto enemies.`,
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Metal Bash`)
            defender.takeDamage
                .physical(attacker.attackDamage+20)
                .run(damage => `**${attacker.name}** covers themselves in metal and bashes **${defender.name}** causing ${damage} damage`)
        }
    },{
        name: 'Steel Spike',
        cooldown: 0,
        description: 'A skill that hurls sharp spikes made of steel at foes.',
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Steel Spike`)
            defender.takeDamage
                .magical(attacker.magicPower+20)
                .run(damage => `**${defender.name}** lost ${damage} HP by a barrage of steel spikes`)
        }
    },{
        name: 'Brass Knuckle',
        cooldown: 0,
        description: `A skill that enhances fists with brass knuckles, dealing heavy damage.`,
        canEvade: true,
        mana_cost: 3,
        damage:45,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Brass Knuckle`)
            defender.takeDamage
                .physical(attacker.attackDamage+45)
                .run(damage => `**${attacker.name}** enhances their fists with brass knuckles and punches **${defender.name}** causing ${damage} damage`)
        }
    },{
        name: 'Bullet Machinegun',
        cooldown: 0,
        description: 'A skill that rapidly fires a barrage of bullets made of metal.',
        canEvade: true,
        mana_cost: 1,
        damage:45,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Bullet Machinegun`)
            defender.takeDamage
                .magical(attacker.magicPower+45)
                .run(damage => `**${defender.name}** lost ${damage} HP  by a barrage of metal bullets`)
        }
    },
    {
        cooldown: 0,
        name: 'Armor of Steel',
        description: 'A skill that creates a protective shield of steel around the user.',
        canEvade: false,
        type: 'self',
        damage:0,
        mana_cost: 6,
        use: (attacker, defender) => {
            attacker.armor = 1.5*attacker.armor
            attacker.magicResistance = 1.5*attacker.magicResistance


            attacker.addLogMessage(
                `**${attacker.name}** used Armor of Sky`,
                `A protective shield of steel appears around **${attacker.name}** and increases defenses by 1.5x`
            )
            
           
        },
    },
    {
        cooldown: 0,
        name: 'Mineral Absorption',
        description: `A skill that allows the user to absorb minerals from the earth that rapidly restores the user's health.`,
        canEvade: false,
        type: 'self',
        damage:0,
        mana_cost: 6,
        use: (attacker, defender) => {
            attacker.health = attacker.health+100


            attacker.addLogMessage(
                `**${attacker.name}** used Mineral Absorption`,
                ` **${attacker.name}**absorbs minerals from the ground and heals by 100HP`
            )
            
           
        },
    },{
        name: 'Wire Slam',
        cooldown: 0,
        description: `A skill that binds the enemy using very slim metal wires and slam them into the ground.`,
        canEvade: true,
        mana_cost: 8,
        damage:65,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Wire Slam`)
            defender.takeDamage
                .physical(attacker.attackDamage+65)
                .run(damage => `**${attacker.name}** binds **${defender.name}** with metal wires and slams them causing ${damage} damage`)
        }
    },{
        name: 'Spiraling Iron Bolts',
        cooldown: 0,
        description: 'A skill that fires spiraling bolts of iron that home in on enemies.',
        canEvade: false,
        mana_cost: 8,
        damage:65,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Spiraling Iron Bolts`)
            defender.takeDamage
                .magical(attacker.magicPower+65)
                .run(damage => `**${attacker.name}** shoots spiralling bolts of iron on **${defender.name}** causing ${damage} damage`)
        }
    },
]

export default alloy_tree