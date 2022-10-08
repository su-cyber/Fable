import { Entity } from "../classes"

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
           
           attacker.health = addHealth(20,attacker,defender)
           attacker.addLogMessage(`20 hp gained`)
           

            
        }
    },{
        name: 'None',
        cooldown: 0,
        description: 'You are out of potions',
        canEvade: false,
        mana_cost: 0,
        type: 'self',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`You are out of potions!`)
        }
    },
]


async function addHealth(n:number,attacker:Entity,defender:Entity){
const hp = attacker.health +=n
return hp
}

export default potions