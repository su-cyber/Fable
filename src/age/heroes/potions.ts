import { Entity } from "../classes"
import { healthPotion } from "../effects/healthPotion"

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
            .attacker.effect(healthPotion)
            .end(() => attacker.removeEffect(healthPotion))
            .run(() =>{
                attacker.health+=20
            }
                
            )

        defender.applyEffect(hp)

        attacker.addLogMessage(
            `**${attacker.name}** health potion`,
            `**${defender.name}** gained 20 hp`
        )
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