
import { calculateSTAB } from "../../../commands/fight"
import lvl_modifier from "../../utils/lvl_modifier"
const light_tree=[
    {
        name: 'Vanishing Foot',
        cooldown: 0,
        description: 'A skill that allows the user to kick at light speed.',
        canEvade: true,
        mana_cost: 1,
        damage:20,
        element:"light",
        type: 'physical',
        use: (attacker, defender) =>{
            let mod = 1
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
                mod  = 1
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
                mod  = 0.5
            }
            else if(defender.element == "venom"){
                mod  = 2
            }
            else if(defender.element == "draco"){
                mod  = 2
            }
            else if(defender.element == "ruin"){
                mod  = 2
            }
            let stab = calculateSTAB("light",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Vanishing Foot`)
            defender.takeDamage
                .physical((attacker.attackDamage*stab*lvl_modifier(attacker.level)*20)*mod)
                .run(damage => `${defender.name} lost ${damage} HP by a kick at light speed`)
        }
    },{
        name: 'Jewels of Light',
        cooldown: 0,
        description: 'A skill that summons a cluster of shining jewels, which then explode into radiant beams of light.',
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'magical',
        element:"light",
        use: (attacker, defender) =>{
            let mod = 1
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
                mod  = 1
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
                mod  = 0.5
            }
            else if(defender.element == "venom"){
                mod  = 2
            }
            else if(defender.element == "draco"){
                mod  = 2
            }
            else if(defender.element == "ruin"){
                mod  = 2
            }
            let stab = calculateSTAB("light",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Jewels of Light`)
            defender.takeDamage
                .magical((attacker.magicPower*stab*lvl_modifier(attacker.level)*20)*mod)
                .run(damage => `${defender.name} lost ${damage} HP by a rain of radiant beams of light`)
        }
    },{
        name: 'Shooting Star',
        cooldown: 0,
        description: 'A skill that lets the user leap into the air and come crashing down on their enemies embued in light.',
        canEvade: true,
        mana_cost: 4,
        damage:45,
        type: 'physical',
        element:"light",
        use: (attacker, defender) =>{
            let mod = 1
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
                mod  = 1
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
                mod  = 0.5
            }
            else if(defender.element == "venom"){
                mod  = 2
            }
            else if(defender.element == "draco"){
                mod  = 2
            }
            else if(defender.element == "ruin"){
                mod  = 2
            }
            let stab = calculateSTAB("light",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Shooting Star`)
            defender.takeDamage
                .physical((attacker.attackDamage*stab*lvl_modifier(attacker.level)*45)*mod)
                .run(damage => `${attacker.name} crashed down imbued with light on ${defender.name} and caused ${damage} damage`)
        }
    },{
        name: 'Moonlight Chakrams',
        cooldown: 0,
        description: 'A skill that enables the user to fire light chakrams projectiles at their enemies.',
        canEvade: true,
        mana_cost: 4,
        damage:45,
        type: 'magical',
        element:"light",
        use: (attacker, defender) =>{
            let mod = 1
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
                mod  = 1
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
                mod  = 0.5
            }
            else if(defender.element == "venom"){
                mod  = 2
            }
            else if(defender.element == "draco"){
                mod  = 2
            }
            else if(defender.element == "ruin"){
                mod  = 2
            }
            let stab = calculateSTAB("light",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Scattering Moonlight Chakrams`)
            defender.takeDamage
                .magical((attacker.magicPower*stab*lvl_modifier(attacker.level)*45)*mod)
                .run(damage => `${defender.name} lost ${damage} HP by light chakrams projectiles`)
        }
    },
    {
        cooldown: 0,
        name: 'Armor of Light',
        description: 'A skill that creates a protective shield of light around the user.',
        canEvade: false,
        type: 'buff',
        element:"light",
        damage:0,
        mana_cost: 6,
        use: (attacker, defender) => {
            attacker.armor = 1.5*attacker.armor
            attacker.magicResistance = 1.5*attacker.magicResistance


            attacker.addLogMessage(
                `${attacker.name} used Armor of Light`,
                `A protective shield of light appears around ${attacker.name} and increases defenses by 1.5x`
            )
            
           
        },
    },
    {
        cooldown: 0,
        name: `Sun's Embrace`,
        description: 'A skill that lets the user bask in the healing warmth of the sun, restoring their health.',
        canEvade: false,
        type: 'heal',
        damage:0,
        element:"light",
        mana_cost: 6,
        use: (attacker, defender) => {
            if(attacker.health+100 > attacker.maxHealth){
                attacker.health = attacker.maxHealth
            }
            else{
                attacker.health = attacker.health+100
            }

            attacker.addLogMessage(
                `${attacker.name} used Sun's Embrace`,
                `Sunlight covers ${attacker.name} and heals them by 100HP`
            )
            
           
        },
    },{
        name: 'Barrage of Light',
        cooldown: 0,
        description: `A skill that enables the user to unleash a rapid barrage of blindingly bright light punches at their enemies.`,
        canEvade: true,
        mana_cost: 8,
        damage:65,
        type: 'physical',
        element:"light",
        use: (attacker, defender) =>{
            let mod = 1
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
                mod  = 1
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
                mod  = 0.5
            }
            else if(defender.element == "venom"){
                mod  = 2
            }
            else if(defender.element == "draco"){
                mod  = 2
            }
            else if(defender.element == "ruin"){
                mod  = 2
            }
            let stab = calculateSTAB("light",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Barrage of Light`)
            defender.takeDamage
                .physical((attacker.attackDamage*stab*lvl_modifier(attacker.level)*65)*mod)
                .run(damage => `${defender.name} lost ${damage}HP by a barrage of blinding light punches`)
        }
    },{
        name: 'Dazzling Beam',
        cooldown: 0,
        description: 'A skill that fires a concentrated beam of blinding light, dealing heavy damage to a single target.',
        canEvade: true,
        mana_cost: 8,
        damage:65,
        type: 'magical',
        element:"light",
        use: (attacker, defender) =>{
            let mod = 1
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
                mod  = 1
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
                mod  = 0.5
            }
            else if(defender.element == "venom"){
                mod  = 2
            }
            else if(defender.element == "draco"){
                mod  = 2
            }
            else if(defender.element == "ruin"){
                mod  = 2
            }
            let stab = calculateSTAB("light",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Dazzling Beam`)
            defender.takeDamage
                .magical((attacker.magicPower*stab*lvl_modifier(attacker.level)*65)*mod)
                .run(damage => `${defender.name} lost ${damage} HP by a beam of concentrated light`)
        }
    },
]

export default light_tree