import { calculateSTAB } from "../../../commands/fight"
import lvl_modifier from "../../utils/lvl_modifier"
const bloom_tree=[
    {
        name: 'Splinter Burst',
        cooldown: 0,
        description: `A skill that allows the user to throw sharp wood splinters at high speed, damaging the opponent.`,
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'physical',
        element:"bloom",
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 0.5
            }
            else if(defender.element == "light"){
                mod  = 1
            }
            else if(defender.element == "volt"){
                mod  = 1
            }
            else if(defender.element == "wave"){
                mod  = 2
            }
            else if(defender.element == "frost"){
                mod  = 0.5
            }
            else if(defender.element == "gale"){
                mod  = 0.5
            }
            else if(defender.element == "bloom"){
                mod  = 0.5
            }
            else if(defender.element == "terra"){
                mod  = 2
            }
            else if(defender.element == "alloy"){
                mod  = 0.5
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
            let stab = calculateSTAB("bloom",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Splinter Burst`)
            defender.takeDamage
                .physical((attacker.attackDamage*stab*lvl_modifier(attacker.level)*20)*mod)
                .run(damage => `${defender.name} lost ${damage} HP by a barrage of sharp wood splinters`)
        }
    },{
        name: 'Spore Spread',
        cooldown: 0,
        description: 'A skill that releases a cloud of poisonous spores that can burst and damage enemies.',
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'magical',
        element:"bloom",
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 0.5
            }
            else if(defender.element == "light"){
                mod  = 1
            }
            else if(defender.element == "volt"){
                mod  = 1
            }
            else if(defender.element == "wave"){
                mod  = 2
            }
            else if(defender.element == "frost"){
                mod  = 0.5
            }
            else if(defender.element == "gale"){
                mod  = 0.5
            }
            else if(defender.element == "bloom"){
                mod  = 0.5
            }
            else if(defender.element == "terra"){
                mod  = 2
            }
            else if(defender.element == "alloy"){
                mod  = 0.5
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
            let stab = calculateSTAB("bloom",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Spore Spread`)
            defender.takeDamage
                .magical((attacker.magicPower*stab*lvl_modifier(attacker.level)*20)*mod)
                .run(damage => `${defender.name} lost ${damage} HP by poisonous spores`)
        }
    },{
        name: 'Lumber Smack',
        cooldown: 0,
        description: `A skill that unleashes a powerful punch imbued with thick wood, dealing massive damage.`,
        canEvade: true,
        mana_cost: 4,
        damage:45,
        type: 'physical',
        element:"bloom",
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 0.5
            }
            else if(defender.element == "light"){
                mod  = 1
            }
            else if(defender.element == "volt"){
                mod  = 1
            }
            else if(defender.element == "wave"){
                mod  = 2
            }
            else if(defender.element == "frost"){
                mod  = 0.5
            }
            else if(defender.element == "gale"){
                mod  = 0.5
            }
            else if(defender.element == "bloom"){
                mod  = 0.5
            }
            else if(defender.element == "terra"){
                mod  = 2
            }
            else if(defender.element == "alloy"){
                mod  = 0.5
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
            let stab = calculateSTAB("bloom",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Lumber Smack`)
            defender.takeDamage
                .physical((attacker.attackDamage*stab*lvl_modifier(attacker.level)*45)*mod)
                .run(damage => `${attacker.name} covers their arm by thick wood and punches ${defender.name} causing ${damage} damage`)
        }
    },{
        name: 'Sap Blast',
        cooldown: 0,
        description: 'A skill that fires a blast of sticky sap that sticks to the enemies and damages them.',
        canEvade: true,
        mana_cost: 4,
        damage:45,
        type: 'magical',
        element:"bloom",
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 0.5
            }
            else if(defender.element == "light"){
                mod  = 1
            }
            else if(defender.element == "volt"){
                mod  = 1
            }
            else if(defender.element == "wave"){
                mod  = 2
            }
            else if(defender.element == "frost"){
                mod  = 0.5
            }
            else if(defender.element == "gale"){
                mod  = 0.5
            }
            else if(defender.element == "bloom"){
                mod  = 0.5
            }
            else if(defender.element == "terra"){
                mod  = 2
            }
            else if(defender.element == "alloy"){
                mod  = 0.5
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
            let stab = calculateSTAB("bloom",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Sap Blast`)
            defender.takeDamage
                .magical((attacker.magicPower*stab*lvl_modifier(attacker.level)*45)*mod)
                .run(damage => `${defender.name} lost ${damage} HP by a blast of sticky sap`)
        }
    },
    {
        cooldown: 0,
        name: 'Armor of Wood',
        description: 'A skill that creates a protective shield of wood around the user.',
        canEvade: false,
        type: 'buff',
        damage:0,
        mana_cost: 6,
        element:"bloom",
        use: (attacker, defender) => {
            attacker.armor = 1.5*attacker.armor
            attacker.magicResistance = 1.5*attacker.magicResistance


            attacker.addLogMessage(
                `${attacker.name} used Armor of Wood`,
                `A protective shield of wood appears around ${attacker.name} and increases defenses by 1.5x`
            )
            
           
        },
    },
    {
        cooldown: 0,
        name: 'Photosynthesis',
        description: `A skill that rapidly restores the user's health by absorbing energy from the sun.`,
        canEvade: false,
        type: 'heal',
        damage:0,
        mana_cost: 6,
        element:"bloom",
        use: (attacker, defender) => {
            if(attacker.health+100 > attacker.maxHealth){
                attacker.health = attacker.maxHealth
            }
            else{
                attacker.health = attacker.health+100
            }


            attacker.addLogMessage(
                `${attacker.name} used Photosynthesis`,
                `${attacker.name} absorbs sunlight and heals by 100HP`
            )
            
           
        },
    },{
        name: 'Root Slam',
        cooldown: 0,
        description: `A skill that binds the enemy to a root and slams them into the ground.`,
        canEvade: true,
        mana_cost: 8,
        damage:65,
        type: 'physical',
        element:"bloom",
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 0.5
            }
            else if(defender.element == "light"){
                mod  = 1
            }
            else if(defender.element == "volt"){
                mod  = 1
            }
            else if(defender.element == "wave"){
                mod  = 2
            }
            else if(defender.element == "frost"){
                mod  = 0.5
            }
            else if(defender.element == "gale"){
                mod  = 0.5
            }
            else if(defender.element == "bloom"){
                mod  = 0.5
            }
            else if(defender.element == "terra"){
                mod  = 2
            }
            else if(defender.element == "alloy"){
                mod  = 0.5
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
            let stab = calculateSTAB("bloom",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Root Slam`)
            defender.takeDamage
                .physical((attacker.attackDamage*stab*lvl_modifier(attacker.level)*65)*mod)
                .run(damage => `${defender.name} gets bound by roots and slammed into the ground causing ${damage} damage`)
        }
    },{
        name: 'Spiked Wooden Ball',
        cooldown: 0,
        description: 'A skill that hurls a massive spiked wooden ball at high speed, dealing damage to enemies in its path.',
        canEvade: true,
        mana_cost: 8,
        damage:65,
        type: 'magical',
        element:"bloom",
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 0.5
            }
            else if(defender.element == "light"){
                mod  = 1
            }
            else if(defender.element == "volt"){
                mod  = 1
            }
            else if(defender.element == "wave"){
                mod  = 2
            }
            else if(defender.element == "frost"){
                mod  = 0.5
            }
            else if(defender.element == "gale"){
                mod  = 0.5
            }
            else if(defender.element == "bloom"){
                mod  = 0.5
            }
            else if(defender.element == "terra"){
                mod  = 2
            }
            else if(defender.element == "alloy"){
                mod  = 0.5
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
            let stab = calculateSTAB("bloom",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Spiked Wooden Ball`)
            defender.takeDamage
                .magical((attacker.magicPower*stab*lvl_modifier(attacker.level)*65)*mod)
                .run(damage => `${attacker.name} unleashes a huge spiked wooden ball at ${defender.name} causing ${damage} damage`)
        }
    },
]

export default bloom_tree