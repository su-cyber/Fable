
import { calculate } from "../classes"
import { anti_physical } from "../effects/anti-physical"
const magus_tree=[
    {
        name: 'Force Push',
        cooldown: 0,
        description: 'Unleash an arcane surge,a devastating force that propels adversaries backward with explosive energy.',
        canEvade: true,
        mana_cost: 0,
        damage:15,
        type: 'magical',
        element:"normal",
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Force Push`)
            defender.takeDamage
                .magical(attacker.magicPower*15)
                .run(damage => `${defender.name} lost ${damage} HP by a powerful magic thrust propelling them backwards`)
        }
    },{
        name: 'Missile Barrage',
        cooldown: 0,
        description: 'Unleash a violent barrage of magical bullets, overwhelming foes and disrupting their balance.',
        canEvade: true,
        mana_cost:5,
        damage:35,
        type: 'magical',
        element:"normal",
        use: (attacker, defender) =>{

            attacker.addLogMessage(
                `${attacker.name} used Missile Barrage`
            )
            defender.takeDamage
            .magical(attacker.magicPower*35)
            .run(damage => `${defender.name} lost ${damage} HP by a barrage of magic missiles`)
        }
    },{
        name: 'Into the Shadows',
        cooldown: 0,
        description: `Transforms the Magus into a shadowy form, rendering them immune to physical attacks for 2 turns.`,
        canEvade: true,
        mana_cost: 3,
        damage:0,
        type: 'buff',
        element:"normal",
        use: (attacker, defender) =>{
            const intoshadows = attacker.scheduler.task
                .turns(4)
                .all.effect(anti_physical)
                .end(() => defender.removeEffect(anti_physical))
                .run(() =>{

                }
                )

            defender.applyEffect(intoshadows)
            attacker.addLogMessage(`${attacker.name} used Into the Shadows`,`${attacker.name} turned into a shadowy figure and cannot be physically touched`)
            
            
        }
    },{
        name: `Mind Blast`,
        cooldown: 0,
        description: 'Unleash a jolting surge of psychic energy, stunning the minds of your adversaries and leaving them open to further assaults.',
        canEvade: true,
        mana_cost: 8,
        damage:50,
        type: 'magical',
        element:"normal",
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Mind Blast`)
            defender.takeDamage
                .magical(attacker.magicPower*50)
                .run(damage => `${defender.name} lost ${damage} HP by a jolting surge of psychic energy overwhelming them`)
        }
    },{
        cooldown: 0,
        name: `Crippling Curse`,
        description: `Places a curse on a target, causing them to take increased damage from ranged attacks for a few turns.`,
        canEvade: false,
        element:"normal",
        type: 'buff',
        damage:0,
        mana_cost: 10,
        use: (attacker, defender) => {
            const reducedarmor = defender.magicResistance-15
            const curse = attacker.scheduler.task
                            .id('sorceror_curse')
                            .all.turns(6)
                            .end(() => {
                                defender.removeEffect(curse)
                                defender.magicResistance = reducedarmor+15
                            })
                            .run(() =>
                            defender.magicResistance = reducedarmor
                            )

                        defender.applyEffect(curse)
                        attacker.addLogMessage(`${attacker.name} used Crippling Curse`,
                        `${attacker.name} placed a curse on ${defender.name} weakening them against magical attacks`
                        )
            


           
            
           
        },
    },{
        name: 'Life Siphon',
        cooldown: 0,
        description: 'Siphons the life force from the enemy, healing the Magus for a portion of the damage dealt.',
        canEvade: true,
        mana_cost: 12,
        damage:70,
        type: 'magical',
        element:"normal",
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Life Siphon`)
           let dmg = calculate.magicDamage(attacker.magicPower*70,defender.magicResistance)
           let heal = 0.7*dmg
           if(attacker.health+heal > attacker.maxHealth){
            attacker.health = attacker.maxHealth
        }
        else{
            attacker.health = attacker.health+heal
        }
            defender.takeDamage
                .magical(attacker.magicPower*70)
                .run(damage => `${defender.name} lost ${damage} HP by having their life force drained by the magus\n${attacker.name} recovers ${heal}HP!`)
        }
    },{
        name: `Eternal Oblivion`,
        cooldown: 0,
        description: 'Tap into the wellspring of ultimate arcane energy, casting your enemies into the eternal oblivion.',
        canEvade: true,
        mana_cost: 15,
        damage:85,
        type: 'magical',
        element:"normal",
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Eternal Oblivion`)
            defender.takeDamage
                .magical(attacker.magicPower*85)
                .run(damage => `You bend the dimensions with your arcane energy casting ${defender.name} into the eternal oblivion causing ${damage} dmg`)
        }
    },
]

export default magus_tree