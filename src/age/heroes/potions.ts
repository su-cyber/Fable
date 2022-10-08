
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
           const potion = 20
           let hp = attacker.health + potion
           attacker.health = hp
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

export default potions