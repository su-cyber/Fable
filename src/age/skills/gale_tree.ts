
import { calculateSTAB } from "../../../commands/fight"
import lvl_modifier from "../../utils/lvl_modifier"
const gale_tree=[
    {
        name: 'Razor Kick',
        cooldown: 0,
        description: `A swift and powerful kick that unleashes a slash of wind to strike the enemy.`,
        canEvade: true,
        mana_cost: 1,
        damage:20,
        element:"gale",
        type: 'physical',
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 0.5
            }
            else if(defender.element == "light"){
                mod  = 1
            }
            else if(defender.element == "volt"){
                mod  = 0.5
            }
            else if(defender.element == "wave"){
                mod  = 1
            }
            else if(defender.element == "frost"){
                mod  = 0.5
            }
            else if(defender.element == "gale"){
                mod  = 0.5
            }
            else if(defender.element == "bloom"){
                mod  = 2
            }
            else if(defender.element == "terra"){
                mod  = 1
            }
            else if(defender.element == "alloy"){
                mod  = 0.5
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
            let stab = calculateSTAB("gale",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Razor Kick`)
            defender.takeDamage
                .physical((attacker.attackDamage*stab*lvl_modifier(attacker.level)+20)*mod)
                .run(damage => `${defender.name} lost ${damage} HP by a sharp wind slash`)
        }
    },{
        name: 'Mighty Breath',
        cooldown: 0,
        description: 'A skill that allows the user to exhale a strong burst of wind to deal damage to the enemy.',
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'magical',
        element:"gale",
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 0.5
            }
            else if(defender.element == "light"){
                mod  = 1
            }
            else if(defender.element == "volt"){
                mod  = 0.5
            }
            else if(defender.element == "wave"){
                mod  = 1
            }
            else if(defender.element == "frost"){
                mod  = 0.5
            }
            else if(defender.element == "gale"){
                mod  = 0.5
            }
            else if(defender.element == "bloom"){
                mod  = 2
            }
            else if(defender.element == "terra"){
                mod  = 1
            }
            else if(defender.element == "alloy"){
                mod  = 0.5
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
            let stab = calculateSTAB("gale",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Mighty Breath`)
            defender.takeDamage
                .magical((attacker.magicPower*stab*lvl_modifier(attacker.level)*20)*mod)
                .run(damage => `${defender.name} lost ${damage} HP by a strong burst of wind`)
        }
    },{
        name: 'Tempest Fist',
        cooldown: 0,
        description: `A punch that creates a sharp whirlwind around the user's arm, dealing damage to enemies.`,
        canEvade: true,
        mana_cost: 4,
        damage:45,
        type: 'physical',
        element:"gale",
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 0.5
            }
            else if(defender.element == "light"){
                mod  = 1
            }
            else if(defender.element == "volt"){
                mod  = 0.5
            }
            else if(defender.element == "wave"){
                mod  = 1
            }
            else if(defender.element == "frost"){
                mod  = 0.5
            }
            else if(defender.element == "gale"){
                mod  = 0.5
            }
            else if(defender.element == "bloom"){
                mod  = 2
            }
            else if(defender.element == "terra"){
                mod  = 1
            }
            else if(defender.element == "alloy"){
                mod  = 0.5
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
            let stab = calculateSTAB("gale",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Tempest Fist`)
            defender.takeDamage
                .physical((attacker.attackDamage*stab*lvl_modifier(attacker.level)+45)*mod)
                .run(damage => `${attacker.name} covers their arm by a sharp whirlwind and punches ${defender.name} causing ${damage} damage`)
        }
    },{
        name: 'Wind Palm',
        cooldown: 0,
        description: 'A hand strike that releases a gust of wind, sending enemies flying backwards.',
        canEvade: true,
        mana_cost: 4,
        damage:45,
        type: 'magical',
        element:"gale",
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 0.5
            }
            else if(defender.element == "light"){
                mod  = 1
            }
            else if(defender.element == "volt"){
                mod  = 0.5
            }
            else if(defender.element == "wave"){
                mod  = 1
            }
            else if(defender.element == "frost"){
                mod  = 0.5
            }
            else if(defender.element == "gale"){
                mod  = 0.5
            }
            else if(defender.element == "bloom"){
                mod  = 2
            }
            else if(defender.element == "terra"){
                mod  = 1
            }
            else if(defender.element == "alloy"){
                mod  = 0.5
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
            let stab = calculateSTAB("gale",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Wind Palm`)
            defender.takeDamage
                .magical((attacker.magicPower*stab*lvl_modifier(attacker.level)*45)*mod)
                .run(damage => `${defender.name} lost ${damage} HP  by a strong gust of wind`)
        }
    },
    {
        cooldown: 0,
        name: 'Armor of Sky',
        description: 'A skill that creates a protective shield of wind around the user.',
        canEvade: false,
        type: 'buff',
        element:"gale",
        damage:0,
        mana_cost: 6,
        use: (attacker, defender) => {
            
            attacker.armor = 1.5*attacker.armor
            attacker.magicResistance = 1.5*attacker.magicResistance


            attacker.addLogMessage(
                `${attacker.name} used Armor of Sky`,
                `A protective shield of wind appears around ${attacker.name} and increases defenses by 1.5x`
            )
            
           
        },
    },
    {
        cooldown: 0,
        name: 'Breath of Life',
        description: `A skill that summons a healing wind that rapidly restores the user's health.`,
        canEvade: false,
        type: 'heal',
        damage:0,
        element:"gale",
        mana_cost: 6,
        use: (attacker, defender) => {
            if(attacker.health+100 > attacker.maxHealth){
                attacker.health = attacker.maxHealth
            }
            else{
                attacker.health = attacker.health+100
            }


            attacker.addLogMessage(
                `${attacker.name} used Breath of Life`,
                ` ${attacker.name} summons a healing wind and heals by 100HP`
            )
            
           
        },
    },{
        name: 'Windwalk Strike',
        cooldown: 0,
        description: `A skill that allows the user to run in the sky and deliver a swift strike to the enemy.`,
        canEvade: true,
        mana_cost: 8,
        element:"gale",
        damage:65,
        type: 'physical',
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 0.5
            }
            else if(defender.element == "light"){
                mod  = 1
            }
            else if(defender.element == "volt"){
                mod  = 0.5
            }
            else if(defender.element == "wave"){
                mod  = 1
            }
            else if(defender.element == "frost"){
                mod  = 0.5
            }
            else if(defender.element == "gale"){
                mod  = 0.5
            }
            else if(defender.element == "bloom"){
                mod  = 2
            }
            else if(defender.element == "terra"){
                mod  = 1
            }
            else if(defender.element == "alloy"){
                mod  = 0.5
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
            let stab = calculateSTAB("gale",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Windwalk Strike`)
            defender.takeDamage
                .physical((attacker.attackDamage*stab*lvl_modifier(attacker.level)+65)*mod)
                .run(damage => `${attacker.name} runs towards the sky and strikes ${defender.name} from above causing ${damage} damage`)
        }
    },{
        name: 'Sonic Scythe',
        cooldown: 0,
        description: 'A sharp blade of wind that slashes through enemies with incredible speed.',
        canEvade: true,
        mana_cost: 8,
        damage:65,
        element:"gale",
        type: 'magical',
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 0.5
            }
            else if(defender.element == "light"){
                mod  = 1
            }
            else if(defender.element == "volt"){
                mod  = 0.5
            }
            else if(defender.element == "wave"){
                mod  = 1
            }
            else if(defender.element == "frost"){
                mod  = 0.5
            }
            else if(defender.element == "gale"){
                mod  = 0.5
            }
            else if(defender.element == "bloom"){
                mod  = 2
            }
            else if(defender.element == "terra"){
                mod  = 1
            }
            else if(defender.element == "alloy"){
                mod  = 0.5
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
            let stab = calculateSTAB("gale",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Sonic Scythe`)
            defender.takeDamage
                .magical((attacker.magicPower*stab*lvl_modifier(attacker.level)*65)*mod)
                .run(damage => `${attacker.name} unleashes a sharp blade of wind on ${defender.name} causing ${damage} damage`)
        }
    },
]

export default gale_tree