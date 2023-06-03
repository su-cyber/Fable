

const flame_tree=[
    {
        name: 'Flame Whip',
        cooldown: 0,
        description: 'A skill that allows the user to whip their enemies with a fiery lash.',
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'physical',
        use: (attacker, defender) =>{
            let mod
            if(defender.element == "flame"){
                mod  = 0.5
            }
            else if(defender.element == "light"){
                mod  = 0.5
            }
            else if(defender.element == "volt"){
                mod  = 1
            }
            else if(defender.element == "wave"){
                mod  = 0.5
            }
            else if(defender.element == "frost"){
                mod  = 2
            }
            else if(defender.element == "gale"){
                mod  = 2
            }
            else if(defender.element == "bloom"){
                mod  = 2
            }
            else if(defender.element == "terra"){
                mod  = 0.5
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
            attacker.addLogMessage(`${attacker.name} used Flame Whip`)
            defender.takeDamage
                .physical((attacker.attackDamage+20)*mod)
                .run(damage => `${defender.name} lost ${damage} HP by being hit with a Flaming Whip`)
        }
    },{
        name: 'Flare Breath',
        cooldown: 0,
        description: 'A skill that lets the user exhale a burst of flames at their foes.',
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'magical',
        use: (attacker, defender) =>{
            let mod
            if(defender.element == "flame"){
                mod  = 0.5
            }
            else if(defender.element == "light"){
                mod  = 0.5
            }
            else if(defender.element == "volt"){
                mod  = 1
            }
            else if(defender.element == "wave"){
                mod  = 0.5
            }
            else if(defender.element == "frost"){
                mod  = 2
            }
            else if(defender.element == "gale"){
                mod  = 2
            }
            else if(defender.element == "bloom"){
                mod  = 2
            }
            else if(defender.element == "terra"){
                mod  = 0.5
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
            console.log(mod);
            console.log(defender.element);
            
            
            attacker.addLogMessage(`${attacker.name} used Flare Breath`)
            defender.takeDamage
                .magical((attacker.magicPower+20)*mod)
                .run(damage => `${defender.name} lost ${damage} HP by a burst of flames`)
        }
    },{
        name: 'Erupting Fist',
        cooldown: 0,
        description: `A skill that empowers the user's punch with explosive flames.`,
        canEvade: true,
        mana_cost: 3,
        damage:45,
        type: 'physical',
        use: (attacker, defender) =>{
            let mod
            if(defender.element == "flame"){
                mod  = 0.5
            }
            else if(defender.element == "light"){
                mod  = 0.5
            }
            else if(defender.element == "volt"){
                mod  = 1
            }
            else if(defender.element == "wave"){
                mod  = 0.5
            }
            else if(defender.element == "frost"){
                mod  = 2
            }
            else if(defender.element == "gale"){
                mod  = 2
            }
            else if(defender.element == "bloom"){
                mod  = 2
            }
            else if(defender.element == "terra"){
                mod  = 0.5
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
            attacker.addLogMessage(`${attacker.name} used Erupting Fist`)
            defender.takeDamage
                .physical((attacker.attackDamage+45)*mod)
                .run(damage => `${defender.name} lost ${damage} HP by the explosive fists of ${attacker.name}`)
        }
    },{
        name: 'Scattering Flame Bullet',
        cooldown: 0,
        description: 'A skill that enables the user to fire a burst of flame projectiles at their enemies.',
        canEvade: true,
        mana_cost: 1,
        damage:45,
        type: 'magical',
        use: (attacker, defender) =>{
            let mod
            if(defender.element == "flame"){
                mod  = 0.5
            }
            else if(defender.element == "light"){
                mod  = 0.5
            }
            else if(defender.element == "volt"){
                mod  = 1
            }
            else if(defender.element == "wave"){
                mod  = 0.5
            }
            else if(defender.element == "frost"){
                mod  = 2
            }
            else if(defender.element == "gale"){
                mod  = 2
            }
            else if(defender.element == "bloom"){
                mod  = 2
            }
            else if(defender.element == "terra"){
                mod  = 0.5
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
            attacker.addLogMessage(`${attacker.name} used Scattering Flame Bullet`)
            defender.takeDamage
                .magical((attacker.magicPower+45)*mod)
                .run(damage => `${defender.name} lost ${damage} HP by a barrage of flame projectiles`)
        }
    },
    {
        cooldown: 0,
        name: 'Armor of Flames',
        description: 'A skill that creates a protective shield of fire around the user.',
        canEvade: false,
        type: 'buff',
        damage:0,
        mana_cost: 6,
        use: (attacker, defender) => {
            attacker.armor = 1.5*attacker.armor
            attacker.magicResistance = 1.5*attacker.magicResistance


            attacker.addLogMessage(
                `${attacker.name} used Armor of Flames`,
                `A protective shield of flames appears around ${attacker.name} and increases defenses by 1.5x`
            )
            
           
        },
    },
    {
        cooldown: 0,
        name: 'Fusion Blue Flames',
        description: 'A skill that merges two different types of flames to create a healing effect.',
        canEvade: false,
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
                `${attacker.name} used Fusion Blue Flames`,
                `Blue flames covers ${attacker.name} and heals them by 100HP`
            )
            
           
        },
    },{
        name: 'Searing Slash',
        cooldown: 0,
        description: `A skill that imbues the user's weapon with fiery energy, allowing them to deal damage.`,
        canEvade: true,
        mana_cost: 8,
        damage:65,
        type: 'physical',
        use: (attacker, defender) =>{
            let mod
            if(defender.element == "flame"){
                mod  = 0.5
            }
            else if(defender.element == "light"){
                mod  = 0.5
            }
            else if(defender.element == "volt"){
                mod  = 1
            }
            else if(defender.element == "wave"){
                mod  = 0.5
            }
            else if(defender.element == "frost"){
                mod  = 2
            }
            else if(defender.element == "gale"){
                mod  = 2
            }
            else if(defender.element == "bloom"){
                mod  = 2
            }
            else if(defender.element == "terra"){
                mod  = 0.5
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
            attacker.addLogMessage(`${attacker.name} used Searing Slash`)
            defender.takeDamage
                .physical((attacker.attackDamage+65)*mod)
                .run(damage => `${attacker.name} imbues their weapon in flames and attacks ${defender.name} causing ${damage} damage`)
        }
    },{
        name: 'Flame Tornado',
        cooldown: 0,
        description: 'A skill that summons a powerful whirlwind of flames to engulf enemies.',
        canEvade: true,
        mana_cost: 8,
        damage:65,
        type: 'magical',
        use: (attacker, defender) =>{
            let mod
            if(defender.element == "flame"){
                mod  = 0.5
            }
            else if(defender.element == "light"){
                mod  = 0.5
            }
            else if(defender.element == "volt"){
                mod  = 1
            }
            else if(defender.element == "wave"){
                mod  = 0.5
            }
            else if(defender.element == "frost"){
                mod  = 2
            }
            else if(defender.element == "gale"){
                mod  = 2
            }
            else if(defender.element == "bloom"){
                mod  = 2
            }
            else if(defender.element == "terra"){
                mod  = 0.5
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
            attacker.addLogMessage(`${attacker.name} used Flame Tornado`)
            defender.takeDamage
                .magical((attacker.magicPower+65)*mod)
                .run(damage => `${defender.name} lost ${damage} HP by a flaming tornado`)
        }
    },
]

export default flame_tree