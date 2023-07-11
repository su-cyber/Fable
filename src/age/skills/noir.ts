
import { emoji } from '../../lib/utils/emoji'
import { poisoning } from '../effects/poisoning'


const noir_tree=[
    {
        name: 'Vanishing Strike',
        cooldown: 0,
        description: 'The Noir melds into the darkness, teleporting behind their target with deadly intent, leaving no trace but the echoing whispers of their vanishing strike.',
        canEvade: true,
        mana_cost: 0,
        damage:15,
        type: 'physical',
        element:"normal",
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Vanishing Strike`)
            defender.takeDamage
                .physical(attacker.attackDamage*15)
                .run(damage => `${attacker.name} mends into the darkness and suddenly ${defender.name} loses ${damage} HP by a sudden strike from the shadows`)
        }
    },{
        name: 'Smoke and Mirrors',
        cooldown: 0,
        description: 'The Noir throws a smoke bomb, creating a cloud of smoke that obscures vision and increases evasiveness.',
        canEvade: true,
        mana_cost: 3,
        damage:0,
        type: 'buff',
        element:"normal",
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Smoke and Mirrors`)
            attacker.evasion+=0.03
            attacker.addLogMessage(`${attacker.name} blends into a smoke screen increasing their ability to evade attacks.`)
        }
    },{
        name: 'Venomous Serpent',
        cooldown: 0,
        description: 'Summon a serpentine wraith of spyr energy, striking the enemy with its venomous fangs, entangling them in a debilitative poison that ravages their being.',
        canEvade: true,
        mana_cost:5,
        damage:35,
        element:"normal",
        type: 'physical',
        use: (attacker, defender) =>{
            const VenomousSerpent = attacker.scheduler.task
                .turns(3)
                .all.effect(poisoning)
                .end(() => defender.removeEffect(poisoning))
                .run(() =>
                    defender.takeDamage
                        .physical(attacker.attackDamage*5)
                        .run(
                            damage =>
                                `${defender.name} lost ${damage} HP due to ${emoji.POISON}`
                        )
                )

            defender.applyEffect(VenomousSerpent)
            attacker.addLogMessage(
                `${attacker.name} used Venomous Serpent`
            )
            defender.takeDamage
            .physical(attacker.attackDamage*35)
            .run(damage => `${attacker.name} summons a serpentine wraith of spyr energy wrapping around ${defender.name} causing ${damage} dmg by it's poisonous fangs\n${defender.name} is poisoned!`)
        }
    },{
        name: `Death Blossom`,
        cooldown: 0,
        description: 'The Noir hurls volatile seeds, each a ticking time bomb, erupting upon impact with devastating force, engulfing the enemy in a fiery tempest of destruction.',
        canEvade: true,
        mana_cost: 8,
        damage:50,
        element:"normal",
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Death Blossom`)
            defender.takeDamage
                .physical(attacker.attackDamage*50)
                .run(damage => `${defender.name} is caught in the explosion caused by a barrage of volatile seeds losing ${damage} HP`)
        }
    },{
        cooldown: 0,
        name: `Blood Moon Rising`,
        description: `The Noir draws from the wellspring of vitality, stealing health from their target to fuel their own existence, while unleashing a devastating surge of energy that leaves their enemy reeling in agony.`,
        canEvade: false,
        type: 'heal',
        element:"normal",
        damage:35,
        mana_cost: 10,
        use: (attacker, defender) => {
            attacker.health = attacker.health+500
            defender.health = defender.health-500


            attacker.addLogMessage(
                `${attacker.name} used Blood Moon Rising`,
                `${attacker.name} steals 150HP from ${defender.name}`
            )
            defender.takeDamage
                .physical(attacker.attackDamage*35)
                .run(damage => `${defender.name} lost ${damage} HP from a devastating burst of dark energy`)
        
            
           
        },
    },{
        name: `Evicerating Darkness`,
        cooldown: 0,
        description: 'The Noir channels their inner darkness, unleashing an cataclysmic blast of malevolent energy that engulfs the enemy, obliterating all in its path with devastating power.',
        canEvade: true,
        mana_cost: 12,
        damage:70,
        element:"normal",
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Evicerating Darkness`)
            defender.takeDamage
                .physical(attacker.attackDamage*70)
                .run(damage => `${defender.name} lost ${damage} HP by a cataclysmic blast of malevolent energy that engulfed them, obliterating all in its path with devastating power`)
        }
    },{
        name: `Crimson Harvest`,
        cooldown: 0,
        description: `The Noir's blades dance with deadly elegance, cutting enemies in various parts with precise strikes, inflicting lasting damage and draining their life essence with merciless resolve.`,
        canEvade: true,
        mana_cost: 15,
        damage:85,
        element:"normal",
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Crimson Harvest`)
            defender.takeDamage
                .physical(attacker.attackDamage*85)
                .run(damage => `${defender.name} lost ${damage} HP by a deadly dance of death as ${attacker.name} mutilates them with their blades.`)
        }
    },
]

export default noir_tree