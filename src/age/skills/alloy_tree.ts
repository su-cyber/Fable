import { calculateSTAB } from "../../../commands/fight"
import lvl_modifier from "../../utils/lvl_modifier"

const alloy_tree=[
    {
        name: 'Metal Bash',
        cooldown: 0,
        description: `A skill that enables the user to cover themselves in steel and bash onto enemies.`,
        canEvade: true,
        mana_cost: 1,
        element:"alloy",
        damage:20,
        type: 'physical',
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 0.5
            }
            else if(defender.element == "light"){
                mod  = 2
            }
            else if(defender.element == "volt"){
                mod  = 0.5
            }
            else if(defender.element == "wave"){
                mod  = 0.5
            }
            else if(defender.element == "frost"){
                mod  = 2
            }
            else if(defender.element == "gale"){
                mod  = 1
            }
            else if(defender.element == "bloom"){
                mod  = 1
            }
            else if(defender.element == "terra"){
                mod  = 2
            }
            else if(defender.element == "alloy"){
                mod  = 0.5
            }
            else if(defender.element == "venom"){
                mod  = 1
            }
            else if(defender.element == "draco"){
                mod  = 1
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            let stab = calculateSTAB("alloy",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Metal Bash`)
            defender.takeDamage
                .physical((attacker.attackDamage*stab*lvl_modifier(attacker.level)*20)*mod)
                .run(damage => `${attacker.name} covers themselves in metal and bashes ${defender.name} causing ${damage} damage`)
        }
    },{
        name: 'Steel Spike',
        cooldown: 0,
        description: 'A skill that hurls sharp spikes made of steel at foes.',
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'magical',
        element:"alloy",
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 0.5
            }
            else if(defender.element == "light"){
                mod  = 2
            }
            else if(defender.element == "volt"){
                mod  = 0.5
            }
            else if(defender.element == "wave"){
                mod  = 0.5
            }
            else if(defender.element == "frost"){
                mod  = 2
            }
            else if(defender.element == "gale"){
                mod  = 1
            }
            else if(defender.element == "bloom"){
                mod  = 1
            }
            else if(defender.element == "terra"){
                mod  = 2
            }
            else if(defender.element == "alloy"){
                mod  = 0.5
            }
            else if(defender.element == "venom"){
                mod  = 1
            }
            else if(defender.element == "draco"){
                mod  = 1
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            let stab = calculateSTAB("alloy",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Steel Spike`)
            defender.takeDamage
                .magical((attacker.magicPower*stab*lvl_modifier(attacker.level)*20)*mod)
                .run(damage => `${defender.name} lost ${damage} HP by a barrage of steel spikes`)
        }
    },{
        name: 'Brass Knuckle',
        cooldown: 0,
        description: `A skill that enhances fists with brass knuckles, dealing heavy damage.`,
        canEvade: true,
        mana_cost: 3,
        damage:45,
        type: 'physical',
        element:"alloy",
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 0.5
            }
            else if(defender.element == "light"){
                mod  = 2
            }
            else if(defender.element == "volt"){
                mod  = 0.5
            }
            else if(defender.element == "wave"){
                mod  = 0.5
            }
            else if(defender.element == "frost"){
                mod  = 2
            }
            else if(defender.element == "gale"){
                mod  = 1
            }
            else if(defender.element == "bloom"){
                mod  = 1
            }
            else if(defender.element == "terra"){
                mod  = 2
            }
            else if(defender.element == "alloy"){
                mod  = 0.5
            }
            else if(defender.element == "venom"){
                mod  = 1
            }
            else if(defender.element == "draco"){
                mod  = 1
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            let stab = calculateSTAB("alloy",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Brass Knuckle`)
            defender.takeDamage
                .physical((attacker.attackDamage*stab*lvl_modifier(attacker.level)*45)*mod)
                .run(damage => `${attacker.name} enhances their fists with brass knuckles and punches ${defender.name} causing ${damage} damage`)
        }
    },{
        name: 'Bullet Machinegun',
        cooldown: 0,
        description: 'A skill that rapidly fires a barrage of bullets made of metal.',
        canEvade: true,
        mana_cost: 1,
        damage:45,
        type: 'magical',
        element:"alloy",
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 0.5
            }
            else if(defender.element == "light"){
                mod  = 2
            }
            else if(defender.element == "volt"){
                mod  = 0.5
            }
            else if(defender.element == "wave"){
                mod  = 0.5
            }
            else if(defender.element == "frost"){
                mod  = 2
            }
            else if(defender.element == "gale"){
                mod  = 1
            }
            else if(defender.element == "bloom"){
                mod  = 1
            }
            else if(defender.element == "terra"){
                mod  = 2
            }
            else if(defender.element == "alloy"){
                mod  = 0.5
            }
            else if(defender.element == "venom"){
                mod  = 1
            }
            else if(defender.element == "draco"){
                mod  = 1
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            let stab = calculateSTAB("alloy",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Bullet Machinegun`)
            defender.takeDamage
                .magical((attacker.magicPower*stab*lvl_modifier(attacker.level)*45)*mod)
                .run(damage => `${defender.name} lost ${damage} HP  by a barrage of metal bullets`)
        }
    },
    {
        cooldown: 0,
        name: 'Armor of Steel',
        description: 'A skill that creates a protective shield of steel around the user.',
        canEvade: false,
        type: 'buff',
        damage:0,
        mana_cost: 6,
        element:"alloy",
        use: (attacker, defender) => {
            attacker.armor = 1.5*attacker.armor
            attacker.magicResistance = 1.5*attacker.magicResistance


            attacker.addLogMessage(
                `${attacker.name} used Armor of Sky`,
                `A protective shield of steel appears around ${attacker.name} and increases defenses by 1.5x`
            )
            
           
        },
    },
    {
        cooldown: 0,
        name: 'Mineral Absorption',
        description: `A skill that allows the user to absorb minerals from the earth that rapidly restores the user's health.`,
        canEvade: false,
        type: 'heal',
        damage:0,
        element:"alloy",
        mana_cost: 6,
        use: (attacker, defender) => {
            if(attacker.health+100 > attacker.maxHealth){
                attacker.health = attacker.maxHealth
            }
            else{
                attacker.health = attacker.health+100
            }
            


            attacker.addLogMessage(
                `${attacker.name} used Mineral Absorption`,
                ` ${attacker.name}absorbs minerals from the ground and heals by 100HP`
            )
            
           
        },
    },{
        name: 'Wire Slam',
        cooldown: 0,
        description: `A skill that binds the enemy using very slim metal wires and slam them into the ground.`,
        canEvade: true,
        mana_cost: 8,
        damage:65,
        element:"alloy",
        type: 'physical',
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 0.5
            }
            else if(defender.element == "light"){
                mod  = 2
            }
            else if(defender.element == "volt"){
                mod  = 0.5
            }
            else if(defender.element == "wave"){
                mod  = 0.5
            }
            else if(defender.element == "frost"){
                mod  = 2
            }
            else if(defender.element == "gale"){
                mod  = 1
            }
            else if(defender.element == "bloom"){
                mod  = 1
            }
            else if(defender.element == "terra"){
                mod  = 2
            }
            else if(defender.element == "alloy"){
                mod  = 0.5
            }
            else if(defender.element == "venom"){
                mod  = 1
            }
            else if(defender.element == "draco"){
                mod  = 1
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            let stab = calculateSTAB("alloy",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Wire Slam`)
            defender.takeDamage
                .physical((attacker.attackDamage*stab*lvl_modifier(attacker.level)*65)*mod)
                .run(damage => `${attacker.name} binds ${defender.name} with metal wires and slams them causing ${damage} damage`)
        }
    },{
        name: 'Spiraling Iron Bolts',
        cooldown: 0,
        description: 'A skill that fires spiraling bolts of iron that home in on enemies.',
        canEvade: false,
        mana_cost: 8,
        damage:65,
        type: 'magical',
        element:"alloy",
        use: (attacker, defender) =>{
            let mod = 1
            if(defender.element == "flame"){
                mod  = 0.5
            }
            else if(defender.element == "light"){
                mod  = 2
            }
            else if(defender.element == "volt"){
                mod  = 0.5
            }
            else if(defender.element == "wave"){
                mod  = 0.5
            }
            else if(defender.element == "frost"){
                mod  = 2
            }
            else if(defender.element == "gale"){
                mod  = 1
            }
            else if(defender.element == "bloom"){
                mod  = 1
            }
            else if(defender.element == "terra"){
                mod  = 2
            }
            else if(defender.element == "alloy"){
                mod  = 0.5
            }
            else if(defender.element == "venom"){
                mod  = 1
            }
            else if(defender.element == "draco"){
                mod  = 1
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            let stab = calculateSTAB("alloy",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Spiraling Iron Bolts`)
            defender.takeDamage
                .magical((attacker.magicPower*stab*lvl_modifier(attacker.level)*65)*mod)
                .run(damage => `${attacker.name} shoots spiralling bolts of iron on ${defender.name} causing ${damage} damage`)
        }
    },
]

export default alloy_tree