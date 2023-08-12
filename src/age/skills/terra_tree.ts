

const terra_tree=[
    {
        name: 'Stone Fist',
        cooldown: 0,
        description: `A skill the delivers a powerful punch with a rock-hard fist.`,
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'physical',
        element:"terra",
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 2
            }
            else if(defender.element == "light"){
                mod  = 1
            }
            else if(defender.element == "volt"){
                mod  = 0.5
            }
            else if(defender.element == "wave"){
                mod  = 0.5
            }
            else if(defender.element == "frost"){
                mod  = 1
            }
            else if(defender.element == "gale"){
                mod  = 1
            }
            else if(defender.element == "bloom"){
                mod  = 0.5
            }
            else if(defender.element == "terra"){
                mod  = 1
            }
            else if(defender.element == "alloy"){
                mod  = 2
            }
            else if(defender.element == "venom"){
                mod  = 2
            }
            else if(defender.element == "draco"){
                mod  = 1
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            attacker.addLogMessage(`${attacker.name} used Stone Fist`)
            defender.takeDamage
                .physical((attacker.attackDamage*20)*mod)
                .run(damage => `${attacker.name} covers their arm with rocks and punches ${defender.name} causing ${damage} damage`)
        }
    },{
        name: 'Mud Shower',
        cooldown: 0,
        description: 'A skill that creates a torrent of mud that blinds and slows enemies.',
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'magical',
        element:"terra",
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 2
            }
            else if(defender.element == "light"){
                mod  = 1
            }
            else if(defender.element == "volt"){
                mod  = 0.5
            }
            else if(defender.element == "wave"){
                mod  = 0.5
            }
            else if(defender.element == "frost"){
                mod  = 1
            }
            else if(defender.element == "gale"){
                mod  = 1
            }
            else if(defender.element == "bloom"){
                mod  = 0.5
            }
            else if(defender.element == "terra"){
                mod  = 1
            }
            else if(defender.element == "alloy"){
                mod  = 2
            }
            else if(defender.element == "venom"){
                mod  = 2
            }
            else if(defender.element == "draco"){
                mod  = 1
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            attacker.addLogMessage(`${attacker.name} used Mud Shower`)
            defender.takeDamage
                .magical((attacker.magicPower*20)*mod)
                .run(damage => `${defender.name} lost ${damage} HP by a torrent of mud`)
        }
    },{
        name: 'Tremor Kick',
        cooldown: 0,
        description: `A skill that unleashes a quake upon impact of a kick, damaging nearby foes.`,
        canEvade: true,
        mana_cost: 3,
        damage:45,
        type: 'physical',
        element:"terra",
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 2
            }
            else if(defender.element == "light"){
                mod  = 1
            }
            else if(defender.element == "volt"){
                mod  = 0.5
            }
            else if(defender.element == "wave"){
                mod  = 0.5
            }
            else if(defender.element == "frost"){
                mod  = 1
            }
            else if(defender.element == "gale"){
                mod  = 1
            }
            else if(defender.element == "bloom"){
                mod  = 0.5
            }
            else if(defender.element == "terra"){
                mod  = 1
            }
            else if(defender.element == "alloy"){
                mod  = 2
            }
            else if(defender.element == "venom"){
                mod  = 2
            }
            else if(defender.element == "draco"){
                mod  = 1
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            attacker.addLogMessage(`${attacker.name} used Tremor Kick`)
            defender.takeDamage
                .physical((attacker.attackDamage*45)*mod)
                .run(damage => `${attacker.name} kicks the ground causing a tremor doing ${damage} damage`)
        }
    },{
        name: 'Scorching Sands',
        cooldown: 0,
        description: 'A skill that creates a scorching wave of sand that damages the enemy.',
        canEvade: true,
        mana_cost: 1,
        damage:45,
        type: 'magical',
        element:"terra",
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 2
            }
            else if(defender.element == "light"){
                mod  = 1
            }
            else if(defender.element == "volt"){
                mod  = 0.5
            }
            else if(defender.element == "wave"){
                mod  = 0.5
            }
            else if(defender.element == "frost"){
                mod  = 1
            }
            else if(defender.element == "gale"){
                mod  = 1
            }
            else if(defender.element == "bloom"){
                mod  = 0.5
            }
            else if(defender.element == "terra"){
                mod  = 1
            }
            else if(defender.element == "alloy"){
                mod  = 2
            }
            else if(defender.element == "venom"){
                mod  = 2
            }
            else if(defender.element == "draco"){
                mod  = 1
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            attacker.addLogMessage(`${attacker.name} used Scorching Sands`)
            defender.takeDamage
                .magical((attacker.magicPower*45)*mod)
                .run(damage => `${defender.name} lost ${damage} HP by a scorching wave of sand`)
        }
    },
    {
        cooldown: 0,
        name: 'Armor of Rock',
        description: 'A skill that creates a protective shield of rocks around the user.',
        canEvade: false,
        type: 'buff',
        element:"terra",
        damage:0,
        mana_cost: 6,
        use: (attacker, defender) => {
            attacker.armor = 1.5*attacker.armor
            attacker.magicResistance = 1.5*attacker.magicResistance


            attacker.addLogMessage(
                `${attacker.name} used Armor of Rock`,
                `A protective shield made of rocks appear around ${attacker.name} and increases defenses by 1.5x`
            )
            
           
        },
    },
    {
        cooldown: 0,
        name: 'Parching Skin',
        description: `A skill that covers the user in sand skin that rapidly restores the user's health.`,
        canEvade: false,
        type: 'heal',
        element:"terra",
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
                `${attacker.name} used Parching Skin`,
                ` ${attacker.name} covers themselves with sand and heals by 100HP`
            )
            
           
        },
    },{
        name: 'Mudslide Tackle',
        cooldown: 0,
        description: `A skill that knocks enemies off their feet and causes them to take damage from the impact.`,
        canEvade: true,
        mana_cost: 8,
        damage:65,
        type: 'physical',
        element:"terra",
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 2
            }
            else if(defender.element == "light"){
                mod  = 1
            }
            else if(defender.element == "volt"){
                mod  = 0.5
            }
            else if(defender.element == "wave"){
                mod  = 0.5
            }
            else if(defender.element == "frost"){
                mod  = 1
            }
            else if(defender.element == "gale"){
                mod  = 1
            }
            else if(defender.element == "bloom"){
                mod  = 0.5
            }
            else if(defender.element == "terra"){
                mod  = 1
            }
            else if(defender.element == "alloy"){
                mod  = 2
            }
            else if(defender.element == "venom"){
                mod  = 2
            }
            else if(defender.element == "draco"){
                mod  = 1
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            attacker.addLogMessage(`${attacker.name} used Mudslide Tackle`)
            defender.takeDamage
                .physical((attacker.attackDamage*65)*mod)
                .run(damage => `${defender.name} gets knocked down by a powerful tackle causing ${damage} damage`)
        }
    },{
        name: 'Stalactite Rush',
        cooldown: 0,
        description: 'A skill that launches a series of sharp rock spikes at enemies, piercing and damaging them.',
        canEvade: true,
        mana_cost: 8,
        damage:65,
        type: 'magical',
        element:"terra",
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 2
            }
            else if(defender.element == "light"){
                mod  = 1
            }
            else if(defender.element == "volt"){
                mod  = 0.5
            }
            else if(defender.element == "wave"){
                mod  = 0.5
            }
            else if(defender.element == "frost"){
                mod  = 1
            }
            else if(defender.element == "gale"){
                mod  = 1
            }
            else if(defender.element == "bloom"){
                mod  = 0.5
            }
            else if(defender.element == "terra"){
                mod  = 1
            }
            else if(defender.element == "alloy"){
                mod  = 2
            }
            else if(defender.element == "venom"){
                mod  = 2
            }
            else if(defender.element == "draco"){
                mod  = 1
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            attacker.addLogMessage(`${attacker.name} used Gem Barrage`)
            defender.takeDamage
                .magical((attacker.magicPower*65)*mod)
                .run(damage => `${attacker.name} unleashes a barrage of sharp rock spikes at ${defender.name} causing ${damage} damage`)
        }
    },
]

export default terra_tree