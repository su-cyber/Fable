import { Entity } from "../classes"
import { healthPotion } from "../effects/healthPotion"
import { manaPotion } from "../effects/manaPotion"

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
           
            const hp = attacker.scheduler.task
            .turns(1000)
            .all.effect(healthPotion)
            .end(() => attacker.removeEffect(healthPotion))
            .run(() =>{
                
            }
                
            )
            attacker.addLogMessage(
                `**${attacker.name}** health potion`,
                `**${attacker.name}** gained 20 hp`
            )
        attacker.applyEffect(hp)
        attacker.health+=20
        
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
               
                const mana = attacker.scheduler.task
                .turns(1000)
                .all.effect(manaPotion)
                .end(() => attacker.removeEffect(manaPotion))
                .run(() =>{
                    
                }
                    
                )
                attacker.addLogMessage(
                    `**${attacker.name}** used mana potion`,
                    `**${attacker.name}** gained 50 mana`
                )
            attacker.applyEffect(mana)
            attacker.mana+=50
           
        },
    
                
            }
    ,{
        name: 'same',
        cooldown: 0,
        description: 'same type of potion',
        canEvade: false,
        mana_cost: 0,
        type: 'self',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`You have already used a similar type of potion!`)
        }
    },
]




export default potions