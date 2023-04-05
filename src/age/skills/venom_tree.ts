import { GuildMember } from 'discord.js'
import { emoji } from '../../lib/utils/emoji'
import { calculate, ClassEntity } from '../classes'
import { bleeding } from '../effects/bleeding'
import { blind } from '../effects/blind'
import { burning } from '../effects/burning'
import { stun } from '../effects/stun'

const venom_tree=[
    {
        name: 'Poison Claw',
        cooldown: 0,
        description: `A skill that unleashes a deadly claw infused with poisonous venom that damages the enemy.`,
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Poison Claw`)
            defender.takeDamage
                .physical(attacker.attackDamage+20)
                .run(damage => `**${defender.name}** lost ${damage} HP by a poisonous claw attack`)
        }
    },{
        name: 'Poison Gas',
        cooldown: 0,
        description: 'A skill that releases a toxic gas that damages enemies within a certain radius.',
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Poison Gas`)
            defender.takeDamage
                .magical(attacker.magicPower+20)
                .run(damage => `**${defender.name}** lost ${damage} HP by breathing in toxic gas`)
        }
    },{
        name: 'Toxic Serpent Bite',
        cooldown: 0,
        description: `A skill that summons a venomous serpent that bites the enemy with toxic fangs to deal damage.`,
        canEvade: true,
        mana_cost: 3,
        damage:45,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Toxic Serpent Bite`)
            defender.takeDamage
                .physical(attacker.attackDamage+45)
                .run(damage => `**${attacker.name}** uleaashes a venomous serpent upon **${defender.name}** causing ${damage} damage`)
        }
    },{
        name: 'Toxic Meltdown',
        cooldown: 0,
        description: `A skill that allows the user to exhale a strong burst of corrosive gas that melts enemy's skin to deal damage.`,
        canEvade: true,
        mana_cost: 1,
        damage:45,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Toxic Meltdow`)
            defender.takeDamage
                .magical(attacker.magicPower+45)
                .run(damage => `**${defender.name}** lost ${damage} HP by a burst of corrosive gas`)
        }
    },
    {
        cooldown: 0,
        name: 'Armor of Toxicity',
        description: 'A skill that creates a protective shield of sludge around the user.',
        canEvade: false,
        type: 'self',
        damage:0,
        mana_cost: 6,
        use: (attacker, defender) => {
            attacker.armor = 1.5*attacker.armor
            attacker.magicResistance = 1.5*attacker.magicResistance


            attacker.addLogMessage(
                `**${attacker.name}** used Armor of Toxicity`,
                `A protective shield of sludge appears around **${attacker.name}** and increases defenses by 1.5x`
            )
            
           
        },
    },
    {
        cooldown: 0,
        name: 'Antidote Aura',
        description: `A skill that summons a healing toxic cloud that rapidly restores the user's health.`,
        canEvade: false,
        type: 'self',
        damage:0,
        mana_cost: 6,
        use: (attacker, defender) => {
            attacker.health = attacker.health+100


            attacker.addLogMessage(
                `**${attacker.name}** used Antidote Aura`,
                ` **${attacker.name}** absorbs sunlight and heals by 100HP`
            )
            
           
        },
    },{
        name: 'Venom Strike',
        cooldown: 0,
        description: `A skill that allows the user to envelope their fists in poison and strike the enemy.`,
        canEvade: true,
        mana_cost: 8,
        damage:65,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Venom Strike`)
            defender.takeDamage
                .physical(attacker.attackDamage+65)
                .run(damage => `**${attacker.name}** covers their fist in poison and punches **${defender.name}** causing ${damage} damage`)
        }
    },{
        name: 'Acid Spray',
        cooldown: 0,
        description: 'A skill that sprays a potent acid that can melt through armor and inflict heavy damage.',
        canEvade: true,
        mana_cost: 8,
        damage:65,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Acid Spray`)
            defender.takeDamage
                .magical(attacker.magicPower+65)
                .run(damage => `**${attacker.name}** sprays a potent acid at **${defender.name}** causing ${damage} damage`)
        }
    },
]

export default venom_tree