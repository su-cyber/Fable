
import { emoji } from '../../lib/utils/emoji'
import { bleeding } from '../effects/bleeding'
import lvl_modifier from '../../utils/lvl_modifier'

const gladius_tree=[
    {
        name: 'Flashing Strike',
        cooldown: 0,
        description: 'Unleash a swift strike, catching your opponent off guard with lightning-fast precision.',
        canEvade: true,
        mana_cost: 0,
        damage:15,
        element:"normal",
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Flashing Strike`)
            defender.takeDamage
                .physical(attacker.attackDamage*15*lvl_modifier(attacker.level))
                .run(damage => `${defender.name} lost ${damage} HP by a lightning fast strike!`)
        }
    },{
        name: 'Bloodletting',
        cooldown: 0,
        description: `Pierce through your enemy's defenses, leaving them bleeding and weakened. Skills gains more power if used in succession.`,
        canEvade: true,
        mana_cost:5,
        damage:35,
        element:"normal",
        type: 'physical',
        use: (attacker, defender) =>{
            const Bloodletting = attacker.scheduler.task
                .turns(3)
                .all.effect(bleeding)
                .end(() => defender.removeEffect(bleeding))
                .run(() =>
                    defender.takeDamage
                        .physical(attacker.attackDamage*5)
                        .run(
                            damage =>
                                `${defender.name} lost ${damage} HP due to ${emoji.BLEED}`
                        )
                )

            defender.applyEffect(Bloodletting)
            attacker.addLogMessage(
                `${attacker.name} used Bloodletting`
            )
            defender.takeDamage
            .physical(attacker.attackDamage*35*lvl_modifier(attacker.level))
            .run(damage => `${defender.name} lost ${damage} HP by a deadly strike breaking through defences.\n${defender.name} is bleeding!`)
        }
    },{
        name: 'Feasting in Agony',
        cooldown: 0,
        description: 'A lightning-fast sword strike that deals low damage to the opponent',
        canEvade: true,
        mana_cost: 2,
        damage:25,
        type: 'physical',
        element:"normal",
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Feasting in Agony`)
            defender.takeDamage
                .physical(attacker.attackDamage*25*lvl_modifier(attacker.level))
                .run(damage => `${defender.name} lost ${damage} HP by a swift sword strike`)
        }
    },{
        name: 'Master at Work',
        cooldown: 0,
        description: `Pierce your enemy's vital points with surgical precision, dealing critical damage if they are bleeding.`,
        canEvade: true,
        mana_cost: 8,
        damage:50,
        element:"normal",
        type: 'physical',
        use: (attacker, defender) =>{
            let mod=1
            if(defender.hasEffect(bleeding)){
                mod=1.5
            }
            attacker.addLogMessage(`${attacker.name} used Master at Work`)
            defender.takeDamage
                .physical(attacker.attackDamage*50*mod*lvl_modifier(attacker.level))
                .run(damage => `${defender.name} lost ${damage} HP by getting pierced at various vital points as you deal critical damage with surgical precision!`)
        }
    },{
        cooldown: 0,
        name: `Moxibustion`,
        description: `Ignite the ember of healing within, harnessing the power of fire to cauterize wounds and promote accelerated healing.`,
        canEvade: false,
        type: 'heal',
        element:"normal",
        damage:0,
        mana_cost: 10,
        use: (attacker, defender) => {
            if(attacker.health+1000 > attacker.maxHealth){
                attacker.health = attacker.maxHealth
            }
            else{
                attacker.health = attacker.health+1000
            }


            attacker.addLogMessage(
                `${attacker.name} used Moxibustion`,
                `${attacker.name} uses fire to mend their wounds and heal themselves recovering 1000 HP`
            )
            
           
        },
    },{
        name: 'Blood Fountain',
        cooldown: 0,
        description: `Pierce through your enemy's defenses, leaving them bleeding and weakened. Skills gains more power if used in succession.`,
        canEvade: true,
        mana_cost:12,
        damage:70,
        element:"normal",
        type: 'physical',
        use: (attacker, defender) =>{
            const BloodFountain = attacker.scheduler.task
                .turns(3)
                .all.effect(bleeding)
                .end(() => defender.removeEffect(bleeding))
                .run(() =>
                    defender.takeDamage
                        .physical(attacker.attackDamage*10*lvl_modifier(attacker.level))
                        .run(
                            damage =>
                                `${defender.name} lost ${damage} HP due to ${emoji.BLEED}`
                        )
                )

            defender.applyEffect(BloodFountain)
            attacker.addLogMessage(
                `${attacker.name} used Blood Fountain`
            )
            defender.takeDamage
            .physical(attacker.attackDamage*70*lvl_modifier(attacker.level))
            .run(damage => `You perfectly parry ${defender.name}'s moves and land a perfect blow causing ${damage} dmg causing severe bleeding\n${defender.name} is bleeding!`)
        }
    },{
        name: `Death's Embrace`,
        cooldown: 0,
        description: 'An unyielding strike to your enemy with a blow that brings them to the precipice of their own demise.',
        canEvade: true,
        mana_cost: 15,
        damage:85,
        element:"normal",
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Death's Embrace`)
            defender.takeDamage
                .physical(attacker.attackDamage*85*lvl_modifier(attacker.level))
                .run(damage => `You Become the harbinger of death, channeling its unyielding power to strike your enemy with a precise blow that brings them closer to death casing ${defender.name} to lose ${damage} HP`)
        }
    }
]

export default gladius_tree