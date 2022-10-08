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
           
           attacker.applyEffect(healthPotion)
           attacker.health+=20
           attacker.addLogMessage("20 hp added")
           

            
        }
    },{
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