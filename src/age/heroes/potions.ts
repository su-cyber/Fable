
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
           
           attacker.addHealth
           .magical(20)
            .run(damage => `**${attacker.name}** gained ${damage} HP`)
           

            
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