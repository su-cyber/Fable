import { Entity } from "../classes"

import { potionEffect } from "../effects/potionEffect"

let num = 0
const potions = [
    {
        name: 'Health Potion',
        cooldown: 0,
        description: 'Recovers 20 HP instantly',
        canEvade: false,
        mana_cost: 0,
        type: 'self',
        use: (attacker, defender) =>{
            attacker.health+=20
            const hp = attacker.scheduler.task
            .turns(1000)
            .all.effect(potionEffect)
            .end(() => attacker.removeEffect(potionEffect))
            .run(() =>{
                
            }
                
            )
            attacker.addLogMessage(
                `**${attacker.name}** health potion`,
                `**${attacker.name}** gained 20 hp`
            )
        attacker.applyEffect(hp)
        
        
    },

            
        },
        {
            name: 'Mana Potion',
            cooldown: 0,
            description: 'Recovers 50 mana instantly',
            canEvade: false,
            mana_cost: 0,
            type: 'self',
            use: (attacker, defender) =>{
                attacker.mana+=50
                const mana = attacker.scheduler.task
                .turns(1000)
                .all.effect(potionEffect)
                .end(() => attacker.removeEffect(potionEffect))
                .run(() =>{
                    
                }
                    
                )
                attacker.addLogMessage(
                    `**${attacker.name}** used mana potion`,
                    `**${attacker.name}** gained 50 mana`
                )
            attacker.applyEffect(mana)
            
           
        },
    
                
            }
    ,{
        name: 'None',
        cooldown: 0,
        description: 'no potions',
        canEvade: false,
        mana_cost: 0,
        type: 'self',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`You are out of potions!`)
        }
    },
]




export default potions