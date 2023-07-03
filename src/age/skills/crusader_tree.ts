

const crusader_tree=[
    {
        name: 'Sprint Bash',
        cooldown: 0,
        description: 'The Crusader sprints into the enemy, pushing them to the ground.',
        canEvade: true,
        mana_cost: 0,
        damage:15,
        element:"normal",
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Sprint Bash`)
            defender.takeDamage
                .physical(attacker.attackDamage*15)
                .run(damage => `${defender.name} lost ${damage} HP by a powerful tackle`)
        }
    },{
        name: 'Skullcrusher',
        cooldown: 0,
        description: 'A basic attack that smashes an enemy with the Hammer, dealing low damage.',
        canEvade: true,
        mana_cost: 2,
        damage:25,
        element:"normal",
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Skullcrusher`)
            defender.takeDamage
                .physical(attacker.attackDamage*25)
                .run(damage => `${defender.name} lost ${damage} HP by being smashed by a hammer strike`)
        }
    },{
        name: 'Axe of the North',
        cooldown: 0,
        description: 'A basic attack that swings the Axe with great power, cleaving through the enemy, dealing low damage.',
        canEvade: true,
        mana_cost:3,
        damage:40,
        element:"normal",
        type: 'physical',
        use: (attacker, defender) =>{

            attacker.addLogMessage(
                `${attacker.name} used Axe of the North`
            )
            defender.takeDamage
            .physical(attacker.attackDamage*40)
            .run(damage => `${defender.name} lost ${damage} HP by gettig stuck an Axe attack`)
        }
    },{
        name: `Crushing Blow`,
        cooldown: 0,
        description: 'A powerful attack that deals moderate damage to a single enemy with the Hammer using crushing force.',
        canEvade: true,
        mana_cost: 6,
        damage:65,
        element:"normal",
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Crushing Blow`)
            defender.takeDamage
                .physical(attacker.attackDamage*65)
                .run(damage => `${defender.name} lost ${damage} HP by a powerful blow from a hammer`)
        }
    },{
        cooldown: 0,
        name: `Blood Ale`,
        description: `You drink the blood of your opponent healing yourself and dropping your opponent's morale`,
        canEvade: false,
        type: 'self',
        damage:0,
        element:"normal",
        mana_cost: 6,
        use: (attacker, defender) => {
            attacker.health = attacker.health+100
            defender.attackDamage = defender.attackDamage-10
                        attacker.addLogMessage(`${attacker.name} used Blood Ale`,
                        `${attacker.name} drinks their enemy's blood and heals by 100HP as well as lowering his opponent's vigour`
                        )
                       
           
        },
    },
]

export default crusader_tree