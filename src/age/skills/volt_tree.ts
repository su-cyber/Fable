
import { calculateSTAB } from "../../../commands/fight"
const volt_tree=[
    {
        name: 'Surging Kick',
        cooldown: 0,
        description: `A skill that charges up the user's leg with lightning energy, allowing them to deliver a powerful electrical kick.`,
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'physical',
        element:"volt",
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 1
            }
            else if(defender.element == "light"){
                mod  = 0.5
            }
            else if(defender.element == "volt"){
                mod  = 0.5
            }
            else if(defender.element == "wave"){
                mod  = 2
            }
            else if(defender.element == "frost"){
                mod  = 1
            }
            else if(defender.element == "gale"){
                mod  = 2
            }
            else if(defender.element == "bloom"){
                mod  = 0.5
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
            let stab = calculateSTAB("volt",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Surging Kick`)
            defender.takeDamage
                .physical((attacker.attackDamage*stab*20)*mod)
                .run(damage => `${defender.name} lost ${damage} HP by a lightning charged kick`)
        }
    },{
        name: 'Thunderclap',
        cooldown: 0,
        description: 'A skill that allows the user to clap their hands together, creating a shockwave of lightning.',
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'magical',
        element:"volt",
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 1
            }
            else if(defender.element == "light"){
                mod  = 0.5
            }
            else if(defender.element == "volt"){
                mod  = 0.5
            }
            else if(defender.element == "wave"){
                mod  = 2
            }
            else if(defender.element == "frost"){
                mod  = 1
            }
            else if(defender.element == "gale"){
                mod  = 2
            }
            else if(defender.element == "bloom"){
                mod  = 0.5
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
            let stab = calculateSTAB("volt",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Thunderclap`)
            defender.takeDamage
                .magical((attacker.magicPower*stab*20)*mod)
                .run(damage => `${defender.name} lost ${damage} HP by a shockwave of lightning`)
        }
    },{
        name: 'Plasma Fist',
        cooldown: 0,
        description: `A skill that charges the user's fist with plasma energy, allowing them to deal massive damage to a single target.`,
        canEvade: true,
        mana_cost: 3,
        damage:45,
        type: 'physical',
        element:"volt",
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 1
            }
            else if(defender.element == "light"){
                mod  = 0.5
            }
            else if(defender.element == "volt"){
                mod  = 0.5
            }
            else if(defender.element == "wave"){
                mod  = 2
            }
            else if(defender.element == "frost"){
                mod  = 1
            }
            else if(defender.element == "gale"){
                mod  = 2
            }
            else if(defender.element == "bloom"){
                mod  = 0.5
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
            let stab = calculateSTAB("volt",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Plasma Fist`)
            defender.takeDamage
                .physical((attacker.attackDamage*stab*45)*mod)
                .run(damage => `${defender.name} lost ${damage} HP by the plasma charged fists of ${attacker.name}`)
        }
    },{
        name: 'Chain Lightning',
        cooldown: 0,
        description: 'A skill that enables the user to fire a burst of lightning projectiles at their enemies.',
        canEvade: true,
        mana_cost: 1,
        damage:45,
        type: 'magical',
        element:"volt",
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 1
            }
            else if(defender.element == "light"){
                mod  = 0.5
            }
            else if(defender.element == "volt"){
                mod  = 0.5
            }
            else if(defender.element == "wave"){
                mod  = 2
            }
            else if(defender.element == "frost"){
                mod  = 1
            }
            else if(defender.element == "gale"){
                mod  = 2
            }
            else if(defender.element == "bloom"){
                mod  = 0.5
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
            let stab = calculateSTAB("volt",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Chain Lightning`)
            defender.takeDamage
                .magical((attacker.magicPower*stab*45)*mod)
                .run(damage => `${defender.name} lost ${damage} HP  by a barrage of lightning projectiles`)
        }
    },
    {
        cooldown: 0,
        name: 'Armor of Lightning',
        description: 'A skill that creates a protective shield of lightning around the user.',
        canEvade: false,
        type: 'buff',
        element:"volt",
        damage:0,
        mana_cost: 6,
        use: (attacker, defender) => {
            
            attacker.armor = 1.5*attacker.armor
            attacker.magicResistance = 1.5*attacker.magicResistance


            attacker.addLogMessage(
                `${attacker.name} used Armor of Lightning`,
                `A protective shield of lightning appears around ${attacker.name} and increases defenses by 1.5x`
            )
            
           
        },
    },
    {
        cooldown: 0,
        name: 'Parabolic Recharge',
        description: 'A skill that allows the user to rapidly replenish their health by absorbing electricity from the environment.',
        canEvade: false,
        type: 'heal',
        element:"volt",
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
                `${attacker.name} used Parabolic Recharge`,
                ` ${attacker.name} absorbs statitc electricity from the surrounding and heals by 100HP`
            )
            
           
        },
    },{
        name: 'Piercing Bolt',
        cooldown: 0,
        description: `A skill that lets the user fire a bolt of lightning that pierces through enemies, dealing damage to the target.`,
        canEvade: true,
        mana_cost: 8,
        damage:65,
        type: 'physical',
        element:"volt",
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 1
            }
            else if(defender.element == "light"){
                mod  = 0.5
            }
            else if(defender.element == "volt"){
                mod  = 0.5
            }
            else if(defender.element == "wave"){
                mod  = 2
            }
            else if(defender.element == "frost"){
                mod  = 1
            }
            else if(defender.element == "gale"){
                mod  = 2
            }
            else if(defender.element == "bloom"){
                mod  = 0.5
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
            let stab = calculateSTAB("volt",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Piercing Bolt`)
            defender.takeDamage
                .physical((attacker.attackDamage*stab*65)*mod)
                .run(damage => `${attacker.name} shoots a piercing bolt of lightning on ${defender.name} causing ${damage} damage`)
        }
    },{
        name: 'Heavy Thunder',
        cooldown: 0,
        description: 'A skill that unleashes a massive bolt of lightning that strikes the ground, dealing damage to all enemies in the area.',
        canEvade: true,
        mana_cost: 8,
        damage:65,
        element:"volt",
        type: 'magical',
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 1
            }
            else if(defender.element == "light"){
                mod  = 0.5
            }
            else if(defender.element == "volt"){
                mod  = 0.5
            }
            else if(defender.element == "wave"){
                mod  = 2
            }
            else if(defender.element == "frost"){
                mod  = 1
            }
            else if(defender.element == "gale"){
                mod  = 2
            }
            else if(defender.element == "bloom"){
                mod  = 0.5
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
            let stab = calculateSTAB("volt",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Heavy Thunder`)
            defender.takeDamage
                .magical((attacker.magicPower*stab*65)*mod)
                .run(damage => `${attacker.name} unleashes a massive bolt of lightning on ${defender.name} causing ${damage} damage`)
        }
    },
]

export default volt_tree