import { GuildMember } from 'discord.js'
import { emoji } from '../../lib/utils/emoji'
import { calculate, ClassEntity } from '../classes'
import { bleeding } from '../effects/bleeding'
import { blind } from '../effects/blind'
import { burning } from '../effects/burning'
import { stun } from '../effects/stun'

const flame_tree=[
    {
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
                .run(damage => `**${defender.name}** lost ${damage} HP by being hit with a Flaming Whip`)
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
                .run(damage => `**${defender.name}** lost ${damage} HP by a burst of flames`)
        }
    },{
        name: 'Erupting Fist',
        cooldown: 0,
        description: `A skill that empowers the user's punch with explosive flames.`,
        canEvade: true,
        mana_cost: 3,
        damage:45,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Erupting Fist`)
            defender.takeDamage
                .physical(attacker.attackDamage+45)
                .run(damage => `**${defender.name}** lost ${damage} HP by the explosive fists of **${attacker.name}**`)
        }
    },{
        name: 'Scattering Flame Bullet',
        cooldown: 0,
        description: 'A skill that enables the user to fire a burst of flame projectiles at their enemies.',
        canEvade: true,
        mana_cost: 1,
        damage:45,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Scattering Flame Bullet`)
            defender.takeDamage
                .magical(attacker.magicPower+45)
                .run(damage => `**${defender.name}** lost ${damage} HP by a barrage of flame projectiles`)
        }
    },
    {
        cooldown: 0,
        name: 'Armor of Flames',
        description: 'A skill that creates a protective shield of fire around the user.',
        canEvade: false,
        type: 'self',
        damage:0,
        mana_cost: 6,
        use: (attacker, defender) => {
            attacker.armor = 1.5*attacker.armor
            attacker.magicResistance = 1.5*attacker.magicResistance


            attacker.addLogMessage(
                `**${attacker.name}** used Armor of Flames`,
                `A protective shield of flames appears around **${attacker.name}** and increases defenses by 1.5x`
            )
            
           
        },
    },
    {
        cooldown: 0,
        name: 'Fusion Blue Flames',
        description: 'A skill that merges two different types of flames to create a healing effect.',
        canEvade: false,
        type: 'self',
        damage:0,
        mana_cost: 6,
        use: (attacker, defender) => {
            attacker.health = attacker.health+100


            attacker.addLogMessage(
                `**${attacker.name}** used Fusion Blue Flames`,
                `Blue flames covers **${attacker.name}** and heals them by 100HP`
            )
            
           
        },
    },{
        name: 'Searing Slash',
        cooldown: 0,
        description: `A skill that imbues the user's weapon with fiery energy, allowing them to deal damage.`,
        canEvade: true,
        mana_cost: 8,
        damage:65,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Searing Slash`)
            defender.takeDamage
                .physical(attacker.attackDamage+65)
                .run(damage => `**${attacker.name}** imbues their weapon in flames and attacks **${defender.name}** causing ${damage} damage`)
        }
    },{
        name: 'Flame Tornado',
        cooldown: 0,
        description: 'A skill that summons a powerful whirlwind of flames to engulf enemies.',
        canEvade: true,
        mana_cost: 8,
        damage:65,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Flame Tornado`)
            defender.takeDamage
                .magical(attacker.magicPower+65)
                .run(damage => `**${defender.name}** lost ${damage} HP by a flaming tornado`)
        }
    },
]

export default flame_tree