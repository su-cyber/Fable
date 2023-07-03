

const venom_tree=[
    {
        name: 'Poison Claw',
        cooldown: 0,
        description: `A skill that unleashes a deadly claw infused with poisonous venom that damages the enemy.`,
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'physical',
        element:"venom",
        use: (attacker, defender) =>{
            let mod
            if(defender.element == "flame"){
                mod  = 1
            }
            else if(defender.element == "light"){
                mod  = 0.5
            }
            else if(defender.element == "volt"){
                mod  = 1
            }
            else if(defender.element == "wave"){
                mod  = 1
            }
            else if(defender.element == "frost"){
                mod  = 1
            }
            else if(defender.element == "gale"){
                mod  = 1
            }
            else if(defender.element == "bloom"){
                mod  = 2
            }
            else if(defender.element == "terra"){
                mod  = 2
            }
            else if(defender.element == "alloy"){
                mod  = 2
            }
            else if(defender.element == "venom"){
                mod  = 0.5
            }
            else if(defender.element == "draco"){
                mod  = 0.5
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            attacker.addLogMessage(`${attacker.name} used Poison Claw`)
            defender.takeDamage
                .physical((attacker.attackDamage*20)*mod)
                .run(damage => `${defender.name} lost ${damage} HP by a poisonous claw attack`)
        }
    },{
        name: 'Poison Gas',
        cooldown: 0,
        description: 'A skill that releases a toxic gas that damages enemies within a certain radius.',
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'magical',
        element:"venom",
        use: (attacker, defender) =>{
            let mod
            if(defender.element == "flame"){
                mod  = 1
            }
            else if(defender.element == "light"){
                mod  = 0.5
            }
            else if(defender.element == "volt"){
                mod  = 1
            }
            else if(defender.element == "wave"){
                mod  = 1
            }
            else if(defender.element == "frost"){
                mod  = 1
            }
            else if(defender.element == "gale"){
                mod  = 1
            }
            else if(defender.element == "bloom"){
                mod  = 2
            }
            else if(defender.element == "terra"){
                mod  = 2
            }
            else if(defender.element == "alloy"){
                mod  = 2
            }
            else if(defender.element == "venom"){
                mod  = 0.5
            }
            else if(defender.element == "draco"){
                mod  = 0.5
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            attacker.addLogMessage(`${attacker.name} used Poison Gas`)
            defender.takeDamage
                .magical((attacker.magicPower*20)*mod)
                .run(damage => `${defender.name} lost ${damage} HP by breathing in toxic gas`)
        }
    },{
        name: 'Toxic Serpent Bite',
        cooldown: 0,
        description: `A skill that summons a venomous serpent that bites the enemy with toxic fangs to deal damage.`,
        canEvade: true,
        mana_cost: 3,
        damage:45,
        type: 'physical',
        element:"venom",
        use: (attacker, defender) =>{
            let mod
            if(defender.element == "flame"){
                mod  = 1
            }
            else if(defender.element == "light"){
                mod  = 0.5
            }
            else if(defender.element == "volt"){
                mod  = 1
            }
            else if(defender.element == "wave"){
                mod  = 1
            }
            else if(defender.element == "frost"){
                mod  = 1
            }
            else if(defender.element == "gale"){
                mod  = 1
            }
            else if(defender.element == "bloom"){
                mod  = 2
            }
            else if(defender.element == "terra"){
                mod  = 2
            }
            else if(defender.element == "alloy"){
                mod  = 2
            }
            else if(defender.element == "venom"){
                mod  = 0.5
            }
            else if(defender.element == "draco"){
                mod  = 0.5
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            attacker.addLogMessage(`${attacker.name} used Toxic Serpent Bite`)
            defender.takeDamage
                .physical((attacker.attackDamage*45)*mod)
                .run(damage => `${attacker.name} uleaashes a venomous serpent upon ${defender.name} causing ${damage} damage`)
        }
    },{
        name: 'Toxic Meltdown',
        cooldown: 0,
        description: `A skill that allows the user to exhale a strong burst of corrosive gas that melts enemy's skin to deal damage.`,
        canEvade: true,
        mana_cost: 1,
        damage:45,
        type: 'magical',
        element:"venom",
        use: (attacker, defender) =>{
            let mod
            if(defender.element == "flame"){
                mod  = 1
            }
            else if(defender.element == "light"){
                mod  = 0.5
            }
            else if(defender.element == "volt"){
                mod  = 1
            }
            else if(defender.element == "wave"){
                mod  = 1
            }
            else if(defender.element == "frost"){
                mod  = 1
            }
            else if(defender.element == "gale"){
                mod  = 1
            }
            else if(defender.element == "bloom"){
                mod  = 2
            }
            else if(defender.element == "terra"){
                mod  = 2
            }
            else if(defender.element == "alloy"){
                mod  = 2
            }
            else if(defender.element == "venom"){
                mod  = 0.5
            }
            else if(defender.element == "draco"){
                mod  = 0.5
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            attacker.addLogMessage(`${attacker.name} used Toxic Meltdow`)
            defender.takeDamage
                .magical((attacker.magicPower*45)*mod)
                .run(damage => `${defender.name} lost ${damage} HP by a burst of corrosive gas`)
        }
    },
    {
        cooldown: 0,
        name: 'Armor of Toxicity',
        description: 'A skill that creates a protective shield of sludge around the user.',
        canEvade: false,
        type: 'buff',
        element:"venom",
        damage:0,
        mana_cost: 6,
        use: (attacker, defender) => {
            attacker.armor = 1.5*attacker.armor
            attacker.magicResistance = 1.5*attacker.magicResistance


            attacker.addLogMessage(
                `${attacker.name} used Armor of Toxicity`,
                `A protective shield of sludge appears around ${attacker.name} and increases defenses by 1.5x`
            )
            
           
        },
    },
    {
        cooldown: 0,
        name: 'Antidote Aura',
        description: `A skill that summons a healing toxic cloud that rapidly restores the user's health.`,
        canEvade: false,
        type: 'heal',
        element:"venom",
        damage:0,
        mana_cost: 6,
        use: (attacker, defender) => {
            if(attacker.health+100 > attacker.maxHealth){
                attacker.health = attacker.maxHealth
            }
            else{
                attacker.health = attacker.health+100
            }


            attacker.addLogMessage(
                `${attacker.name} used Antidote Aura`,
                ` ${attacker.name} absorbs sunlight and heals by 100HP`
            )
            
           
        },
    },{
        name: 'Venom Strike',
        cooldown: 0,
        description: `A skill that allows the user to envelope their fists in poison and strike the enemy.`,
        canEvade: true,
        mana_cost: 8,
        damage:65,
        type: 'physical',
        element:"venom",
        use: (attacker, defender) =>{
            let mod
            if(defender.element == "flame"){
                mod  = 1
            }
            else if(defender.element == "light"){
                mod  = 0.5
            }
            else if(defender.element == "volt"){
                mod  = 1
            }
            else if(defender.element == "wave"){
                mod  = 1
            }
            else if(defender.element == "frost"){
                mod  = 1
            }
            else if(defender.element == "gale"){
                mod  = 1
            }
            else if(defender.element == "bloom"){
                mod  = 2
            }
            else if(defender.element == "terra"){
                mod  = 2
            }
            else if(defender.element == "alloy"){
                mod  = 2
            }
            else if(defender.element == "venom"){
                mod  = 0.5
            }
            else if(defender.element == "draco"){
                mod  = 0.5
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            attacker.addLogMessage(`${attacker.name} used Venom Strike`)
            defender.takeDamage
                .physical((attacker.attackDamage*65)*mod)
                .run(damage => `${attacker.name} covers their fist in poison and punches ${defender.name} causing ${damage} damage`)
        }
    },{
        name: 'Acid Spray',
        cooldown: 0,
        description: 'A skill that sprays a potent acid that can melt through armor and inflict heavy damage.',
        canEvade: true,
        mana_cost: 8,
        damage:65,
        type: 'magical',
        element:"venom",
        use: (attacker, defender) =>{
            let mod
            if(defender.element == "flame"){
                mod  = 1
            }
            else if(defender.element == "light"){
                mod  = 0.5
            }
            else if(defender.element == "volt"){
                mod  = 1
            }
            else if(defender.element == "wave"){
                mod  = 1
            }
            else if(defender.element == "frost"){
                mod  = 1
            }
            else if(defender.element == "gale"){
                mod  = 1
            }
            else if(defender.element == "bloom"){
                mod  = 2
            }
            else if(defender.element == "terra"){
                mod  = 2
            }
            else if(defender.element == "alloy"){
                mod  = 2
            }
            else if(defender.element == "venom"){
                mod  = 0.5
            }
            else if(defender.element == "draco"){
                mod  = 0.5
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            attacker.addLogMessage(`${attacker.name} used Acid Spray`)
            defender.takeDamage
                .magical((attacker.magicPower*65)*mod)
                .run(damage => `${attacker.name} sprays a potent acid at ${defender.name} causing ${damage} damage`)
        }
    },
]

export default venom_tree