import { GuildMember } from 'discord.js'
import { emoji } from '../../lib/utils/emoji'
import { calculate, ClassEntity } from '../classes'
import { bleeding } from '../effects/bleeding'
import { blind } from '../effects/blind'
import { burning } from '../effects/burning'
import { stun } from '../effects/stun'

const light_tree=[
    {
        name: 'Vanishing Foot',
        cooldown: 0,
        description: 'A skill that allows the user to kick at light speed.',
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Vanishing Foot`)
            defender.takeDamage
                .physical(attacker.attackDamage+20)
                .run(damage => `**${defender.name}** lost ${damage} HP by a kick at light speed`)
        }
    },{
        name: 'Jewels of Light',
        cooldown: 0,
        description: 'A skill that summons a cluster of shining jewels, which then explode into radiant beams of light.',
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Jewels of Light`)
            defender.takeDamage
                .magical(attacker.magicPower+20)
                .run(damage => `**${defender.name}** lost ${damage} HP by a rain of radiant beams of light`)
        }
    },{
        name: 'Shooting Star',
        cooldown: 0,
        description: 'A skill that lets the user leap into the air and come crashing down on their enemies embued in light.',
        canEvade: true,
        mana_cost: 3,
        damage:45,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Shooting Star`)
            defender.takeDamage
                .physical(attacker.attackDamage+45)
                .run(damage => `**${attacker.name}** crashed down imbued with light on **${defender.name}** and caused ${damage} damage`)
        }
    },{
        name: 'Moonlight Chakrams',
        cooldown: 0,
        description: 'A skill that enables the user to fire light chakrams projectiles at their enemies.',
        canEvade: true,
        mana_cost: 1,
        damage:45,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Scattering Moonlight Chakrams`)
            defender.takeDamage
                .magical(attacker.magicPower+45)
                .run(damage => `**${defender.name}** lost ${damage} HP by light chakrams projectiles`)
        }
    },
    {
        cooldown: 0,
        name: 'Armor of Light',
        description: 'A skill that creates a protective shield of light around the user.',
        canEvade: false,
        type: 'self',
        damage:0,
        mana_cost: 6,
        use: (attacker, defender) => {
            attacker.armor = 1.5*attacker.armor
            attacker.magicResistance = 1.5*attacker.magicResistance


            attacker.addLogMessage(
                `**${attacker.name}** used Armor of Light`,
                `A protective shield of light appears around **${attacker.name}** and increases defenses by 1.5x`
            )
            
           
        },
    },
    {
        cooldown: 0,
        name: `Sun's Embrace`,
        description: 'A skill that lets the user bask in the healing warmth of the sun, restoring their health.',
        canEvade: false,
        type: 'self',
        damage:0,
        mana_cost: 6,
        use: (attacker, defender) => {
            attacker.health = attacker.health+100


            attacker.addLogMessage(
                `**${attacker.name}** used Sun's Embrace`,
                `Sunlight covers **${attacker.name}** and heals them by 100HP`
            )
            
           
        },
    },{
        name: 'Barrage of Light',
        cooldown: 0,
        description: `A skill that enables the user to unleash a rapid barrage of blindingly bright light punches at their enemies.`,
        canEvade: true,
        mana_cost: 8,
        damage:65,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Barrage of Light`)
            defender.takeDamage
                .physical(attacker.attackDamage+65)
                .run(damage => `**${defender.name}** lost ${damage}HP by a barrage of blinding light punches`)
        }
    },{
        name: 'Dazzling Beam',
        cooldown: 0,
        description: 'A skill that fires a concentrated beam of blinding light, dealing heavy damage to a single target.',
        canEvade: true,
        mana_cost: 8,
        damage:65,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Dazzling Beam`)
            defender.takeDamage
                .magical(attacker.magicPower+65)
                .run(damage => `**${defender.name}** lost ${damage} HP by a beam of concentrated light`)
        }
    },
]

export default light_tree