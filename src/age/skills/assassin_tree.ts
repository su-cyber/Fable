
import { emoji } from '../../lib/utils/emoji'
import { poisoning } from '../effects/poisoning'


const assassin_tree=[
    {
        name: 'Vanishing Strike',
        cooldown: 0,
        description: 'The assassin disappears and reappears behind their target, dealing low damage.',
        canEvade: true,
        mana_cost: 0,
        damage:15,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Vanishing Strike`)
            defender.takeDamage
                .physical(attacker.attackDamage+15)
                .run(damage => `**${defender.name}** lost ${damage} HP by a sudden strike from behind`)
        }
    },{
        name: 'Chain of Shadows',
        cooldown: 0,
        description: 'The assassin strikes with their chain, dealing low damage and briefly stunning their target.',
        canEvade: true,
        mana_cost: 2,
        damage:25,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Chain of Shadows`)
            defender.takeDamage
                .physical(attacker.attackDamage+25)
                .run(damage => `**${defender.name}** is striked with chains and looses ${damage} HP`)
        }
    },{
        name: 'Venomous Serpent',
        cooldown: 0,
        description: 'The assassin throws a dart coated in poison, dealing low damage and inflicting a debilitating poison effect.',
        canEvade: true,
        mana_cost:3,
        damage:40,
        type: 'physical',
        use: (attacker, defender) =>{
            const VenomousSerpent = attacker.scheduler.task
                .turns(3)
                .all.effect(poisoning)
                .end(() => defender.removeEffect(poisoning))
                .run(() =>
                    defender.takeDamage
                        .physical(10)
                        .run(
                            damage =>
                                `**${defender.name}** lost ${damage} HP due to ${emoji.POISON}`
                        )
                )

            defender.applyEffect(VenomousSerpent)
            attacker.addLogMessage(
                `**${attacker.name}** used Venomous Serpent`
            )
            defender.takeDamage
            .physical(attacker.attackDamage+40)
            .run(damage => `**${defender.name}** lost ${damage} HP by a deadly poison dart\n**${defender.name}** is poisoned!`)
        }
    },{
        name: `Whirling Tempest`,
        cooldown: 0,
        description: 'The assassin spins their chain around them, hitting the enemy for moderate damage.',
        canEvade: true,
        mana_cost: 6,
        damage:65,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Whirling Tempest`)
            defender.takeDamage
                .physical(attacker.attackDamage+65)
                .run(damage => `**${defender.name}** is striked and woundup in chains and looses ${damage} HP`)
        }
    },{
        cooldown: 0,
        name: `Blood Moon Rising`,
        description: `The assassin drains health from their target and restores their own health by a small amount, while unleashing a burst of energy that damages the enemy.`,
        canEvade: false,
        type: 'self',
        damage:25,
        mana_cost: 6,
        use: (attacker, defender) => {
            attacker.health = attacker.health+50
            defender.health = defender.health-50


            attacker.addLogMessage(
                `**${attacker.name}** used Blood Moon Rising`,
                `**${attacker.name}** steals 50HP from **${defender.name}**`
            )
            defender.takeDamage
                .physical(attacker.attackDamage+25)
                .run(damage => `**${defender.name}** lost ${damage} HP from the burst of energy`)
        
            
           
        },
    },
]

export default assassin_tree