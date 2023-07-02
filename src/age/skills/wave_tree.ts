

const wave_tree=[
    {
        name: 'Jet Punch',
        cooldown: 0,
        description: `A skill that propels the user forward with a burst of water, delivering a powerful punch that damages enemies.`,
        canEvade: true,
        mana_cost: 1,
        damage:20,
        element:"wave",
        type: 'physical',
        use: (attacker, defender) =>{
            let mod
            if(defender.element == "flame"){
                mod  = 2
            }
            else if(defender.element == "light"){
                mod  = 1
            }
            else if(defender.element == "volt"){
                mod  = 1
            }
            else if(defender.element == "wave"){
                mod  = 0.5
            }
            else if(defender.element == "frost"){
                mod  = 0.5
            }
            else if(defender.element == "gale"){
                mod  = 1
            }
            else if(defender.element == "bloom"){
                mod  = 0.5
            }
            else if(defender.element == "terra"){
                mod  = 2
            }
            else if(defender.element == "alloy"){
                mod  = 2
            }
            else if(defender.element == "venom"){
                mod  = 1
            }
            else if(defender.element == "draco"){
                mod  = 0.5
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            attacker.addLogMessage(`${attacker.name} used Jet Punch`)
            defender.takeDamage
                .physical((attacker.attackDamage+20)*mod)
                .run(damage => `${defender.name} lost ${damage} HP by a hydro propelled punch`)
        }
    },{
        name: 'Aqua Bullets',
        cooldown: 0,
        description: 'A skill that fires a rapid stream of water bullets that pelt and damage enemies.',
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'magical',
        element:"wave",
        use: (attacker, defender) =>{
            let mod
            if(defender.element == "flame"){
                mod  = 2
            }
            else if(defender.element == "light"){
                mod  = 1
            }
            else if(defender.element == "volt"){
                mod  = 1
            }
            else if(defender.element == "wave"){
                mod  = 0.5
            }
            else if(defender.element == "frost"){
                mod  = 0.5
            }
            else if(defender.element == "gale"){
                mod  = 1
            }
            else if(defender.element == "bloom"){
                mod  = 0.5
            }
            else if(defender.element == "terra"){
                mod  = 2
            }
            else if(defender.element == "alloy"){
                mod  = 2
            }
            else if(defender.element == "venom"){
                mod  = 1
            }
            else if(defender.element == "draco"){
                mod  = 0.5
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            attacker.addLogMessage(`${attacker.name} used Aqua Bullets`)
            defender.takeDamage
                .magical((attacker.magicPower+20)*mod)
                .run(damage => `${defender.name} lost ${damage} HP by a stream of water bullets`)
        }
    },{
        name: 'Dive Bomb',
        cooldown: 0,
        description: `A skill that lets the user dive from the sky and crash onto the enemies, creating a wave of water that damages the enemy.`,
        canEvade: true,
        mana_cost: 3,
        damage:45,
        type: 'physical',
        element:"wave",
        use: (attacker, defender) =>{
            let mod
            if(defender.element == "flame"){
                mod  = 2
            }
            else if(defender.element == "light"){
                mod  = 1
            }
            else if(defender.element == "volt"){
                mod  = 1
            }
            else if(defender.element == "wave"){
                mod  = 0.5
            }
            else if(defender.element == "frost"){
                mod  = 0.5
            }
            else if(defender.element == "gale"){
                mod  = 1
            }
            else if(defender.element == "bloom"){
                mod  = 0.5
            }
            else if(defender.element == "terra"){
                mod  = 2
            }
            else if(defender.element == "alloy"){
                mod  = 2
            }
            else if(defender.element == "venom"){
                mod  = 1
            }
            else if(defender.element == "draco"){
                mod  = 0.5
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            attacker.addLogMessage(`${attacker.name} used Dive Bomb`)
            defender.takeDamage
                .physical((attacker.attackDamage+45)*mod)
                .run(damage => `${attacker.name} crashes down on the ground unleasing a wave on ${defender.name} and causing ${damage} damage`)
        }
    },{
        name: 'Water Blast',
        cooldown: 0,
        description: 'A skill that unleashes a powerful blast of water that deals area-of-effect damage to enemies.',
        canEvade: true,
        mana_cost: 1,
        damage:45,
        type: 'magical',
        element:"wave",
        use: (attacker, defender) =>{
            let mod
            if(defender.element == "flame"){
                mod  = 2
            }
            else if(defender.element == "light"){
                mod  = 1
            }
            else if(defender.element == "volt"){
                mod  = 1
            }
            else if(defender.element == "wave"){
                mod  = 0.5
            }
            else if(defender.element == "frost"){
                mod  = 0.5
            }
            else if(defender.element == "gale"){
                mod  = 1
            }
            else if(defender.element == "bloom"){
                mod  = 0.5
            }
            else if(defender.element == "terra"){
                mod  = 2
            }
            else if(defender.element == "alloy"){
                mod  = 2
            }
            else if(defender.element == "venom"){
                mod  = 1
            }
            else if(defender.element == "draco"){
                mod  = 0.5
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            attacker.addLogMessage(`${attacker.name} used Water Blast`)
            defender.takeDamage
                .magical((attacker.magicPower+45)*mod)
                .run(damage => `${defender.name} lost ${damage} HP  by a powerful blast of water`)
        }
    },
    {
        cooldown: 0,
        name: 'Armor of Waves',
        description: 'A skill that creates a protective shield of waves around the user.',
        canEvade: false,
        type: 'buff',
        element:"wave",
        damage:0,
        mana_cost: 6,
        use: (attacker, defender) => {
            attacker.armor = 1.5*attacker.armor
            attacker.magicResistance = 1.5*attacker.magicResistance


            attacker.addLogMessage(
                `${attacker.name} used Armor of Lightning`,
                `A protective shield of waves appears around ${attacker.name} and increases defenses by 1.5x`
            )
            
           
        },
    },
    {
        cooldown: 0,
        name: 'Sanative Rain',
        description: `A skill that summons a healing rain that rapidly restores the user's health.`,
        canEvade: false,
        element:"wave",
        type: 'heal',
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
                `${attacker.name} used Sanative Rain`,
                ` ${attacker.name} summons a healing rain and heals by 100HP`
            )
            
           
        },
    },{
        name: 'Surging Strikes',
        cooldown: 0,
        description: `A skill that lets the user strike with lightning-fast water-based attacks, hitting enemies with a flurry of blows.`,
        canEvade: true,
        mana_cost: 8,
        damage:65,
        type: 'physical',
        element:"wave",
        use: (attacker, defender) =>{
            let mod
            if(defender.element == "flame"){
                mod  = 2
            }
            else if(defender.element == "light"){
                mod  = 1
            }
            else if(defender.element == "volt"){
                mod  = 1
            }
            else if(defender.element == "wave"){
                mod  = 0.5
            }
            else if(defender.element == "frost"){
                mod  = 0.5
            }
            else if(defender.element == "gale"){
                mod  = 1
            }
            else if(defender.element == "bloom"){
                mod  = 0.5
            }
            else if(defender.element == "terra"){
                mod  = 2
            }
            else if(defender.element == "alloy"){
                mod  = 2
            }
            else if(defender.element == "venom"){
                mod  = 1
            }
            else if(defender.element == "draco"){
                mod  = 0.5
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            attacker.addLogMessage(`${attacker.name} used Surging Strikes`)
            defender.takeDamage
                .physical((attacker.attackDamage+65)*mod)
                .run(damage => `${attacker.name} strikes ${defender.name} with a flurry of water strikes causing ${damage} damage`)
        }
    },{
        name: 'Whirlpool Envelope',
        cooldown: 0,
        description: 'A skill that creates a massive whirlpool that damages and traps enemies within its watery depths.',
        canEvade: true,
        mana_cost: 8,
        damage:65,
        type: 'magical',
        element:"wave",
        use: (attacker, defender) =>{
            let mod
            if(defender.element == "flame"){
                mod  = 2
            }
            else if(defender.element == "light"){
                mod  = 1
            }
            else if(defender.element == "volt"){
                mod  = 1
            }
            else if(defender.element == "wave"){
                mod  = 0.5
            }
            else if(defender.element == "frost"){
                mod  = 0.5
            }
            else if(defender.element == "gale"){
                mod  = 1
            }
            else if(defender.element == "bloom"){
                mod  = 0.5
            }
            else if(defender.element == "terra"){
                mod  = 2
            }
            else if(defender.element == "alloy"){
                mod  = 2
            }
            else if(defender.element == "venom"){
                mod  = 1
            }
            else if(defender.element == "draco"){
                mod  = 0.5
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            attacker.addLogMessage(`${attacker.name} used Whirlpool Envelope`)
            defender.takeDamage
                .magical((attacker.magicPower+65)*mod)
                .run(damage => `${attacker.name} unleashes a massive whirlpool on ${defender.name} causing ${damage} damage`)
        }
    },
]

export default wave_tree