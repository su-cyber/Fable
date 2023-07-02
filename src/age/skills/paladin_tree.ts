

const paladin_tree=[
    {
        name: 'Authority Thrust',
        cooldown: 0,
        description: 'The Paladin thrusts their spear forward, dealing low damage to the enemy.',
        canEvade: true,
        mana_cost: 0,
        damage:15,
        element:"normal",
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Authority Thrust`)
            defender.takeDamage
                .physical(attacker.attackDamage+15)
                .run(damage => `${defender.name} lost ${damage} HP by a spear thrust`)
        }
    },{
        name: 'Rampaging Charge',
        cooldown: 0,
        description: 'The Paladin charges into the enemy, dealing low damage.',
        canEvade: true,
        element:"normal",
        mana_cost: 2,
        damage:25,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Rampaging Charge`)
            defender.takeDamage
                .physical(attacker.attackDamage+25)
                .run(damage => `${defender.name} lost ${damage} HP by being hit by a strong charged tackle`)
        }
    },{
        name: 'Solar Cleave',
        cooldown: 0,
        description: 'The Paladin swings their lance in a wide arc, dealing low damage to the enemy.',
        canEvade: true,
        mana_cost:3,
        damage:40,
        element:"normal",
        type: 'physical',
        use: (attacker, defender) =>{

            attacker.addLogMessage(
                `${attacker.name} used Solar Cleave`
            )
            defender.takeDamage
            .physical(attacker.attackDamage+40)
            .run(damage => `${defender.name} lost ${damage} HP by a deadly lance attack`)
        }
    },{
        name: `Lion's Impale`,
        cooldown: 0,
        description: 'The Paladin stabs the enemy with their spear, dealing moderate damage and temporarily stunning them.',
        canEvade: true,
        mana_cost: 6,
        element:"normal",
        damage:65,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Lion's Impale`)
            defender.takeDamage
                .physical(attacker.attackDamage+65)
                .run(damage => `${defender.name} lost ${damage} HP by being impaled by spear`)
        }
    },{
        cooldown: 0,
        name: `Divine Foundation`,
        description: `Channel your life energy to restore stamina and spyr.`,
        canEvade: false,
        type: 'self',
        damage:0,
        mana_cost: 6,
        element:"normal",
        use: (attacker, defender) => {
            defender.attackDamage = defender.attackDamage-10


            attacker.addLogMessage(
                `${attacker.name} used Divine Foundation`,
                `${attacker.name} reduced the vigour of ${defender.name}`
            )
            
           
        },
    },
]

export default paladin_tree