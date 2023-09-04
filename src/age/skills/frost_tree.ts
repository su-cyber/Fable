
import { stun } from '../effects/stun'
import { calculateSTAB } from '../../../commands/fight'
import lvl_modifier from '../../utils/lvl_modifier'

const frost_tree=[
    {
        name: 'Frost Touch',
        cooldown: 0,
        description: `A skill that freezes enemies with a touch, dealing damage to the enemy.`,
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'physical',
        element:"frost",
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
                mod  = 2
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
                mod  = 2
            }
            else if(defender.element == "draco"){
                mod  = 2
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            let stab = calculateSTAB("frost",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Frost Touch`)
            defender.takeDamage
                .physical((attacker.attackDamage*stab*lvl_modifier(attacker.level)*20)*mod)
                .run(damage => `${defender.name} froze in place and lost ${damage} HP`)
    }
},{
        name: 'Iced Shards',
        cooldown: 0,
        description: 'A skill that fires sharp, icy projectiles that damage and freeze enemies on impact.',
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'magical',
        element:"frost",
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
                mod  = 2
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
                mod  = 2
            }
            else if(defender.element == "draco"){
                mod  = 2
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            let stab = calculateSTAB("frost",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Iced Shards`)
            defender.takeDamage
                .magical((attacker.magicPower*stab*lvl_modifier(attacker.level)*20)*mod)
                .run(damage => `${defender.name} lost ${damage} HP by a barrage of icy projectiles`)
        }
    },{
        name: 'Frost Bite',
        cooldown: 0,
        description: `A skill that bites enemies with a freezing cold, dealing damage and slowing them down.`,
        canEvade: true,
        mana_cost: 3,
        damage:45,
        type: 'physical',
        element:"frost",
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
                mod  = 2
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
                mod  = 2
            }
            else if(defender.element == "draco"){
                mod  = 2
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            let stab = calculateSTAB("frost",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Frost Bite`)
            defender.takeDamage
                .physical((attacker.attackDamage*stab*lvl_modifier(attacker.level)*45)*mod)
                .run(damage => `${defender.name} lost ${damage} HP by a freezing cold attack`)
        }
    },{
        name: 'Chilling Wind',
        cooldown: 0,
        description: 'A skill that creates a blast of icy wind that damages and freezes enemies.',
        canEvade: true,
        mana_cost: 1,
        damage:45,
        type: 'magical',
        element:"frost",
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
                mod  = 2
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
                mod  = 2
            }
            else if(defender.element == "draco"){
                mod  = 2
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            let stab = calculateSTAB("frost",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Chilling Wind`)
            defender.takeDamage
                .magical((attacker.magicPower*stab*lvl_modifier(attacker.level)*45)*mod)
                .run(damage => `${defender.name} lost ${damage} HP  by a blast of icy wind`)
        }
    },
    {
        cooldown: 0,
        name: 'Armor of Ice',
        description: 'A skill that creates a protective shield of ice around the user.',
        canEvade: false,
        type: 'buff',
        element:"frost",
        damage:0,
        mana_cost: 6,
        use: (attacker, defender) => {
            attacker.armor = 1.5*attacker.armor
            attacker.magicResistance = 1.5*attacker.magicResistance


            attacker.addLogMessage(
                `${attacker.name} used Armor of Lightning`,
                `A protective shield of ice appears around ${attacker.name} and increases defenses by 1.5x`
            )
            
           
        },
    },
    {
        cooldown: 0,
        name: `Winter's Embrace`,
        description: `A skill that summons a healing snowfall that rapidly restores the user's health.`,
        canEvade: false,
        type: 'heal',
        damage:0,
        element:"frost",
        mana_cost: 6,
        use: (attacker, defender) => {
            if(attacker.health+100 > attacker.maxHealth){
                attacker.health = attacker.maxHealth
            }
            else{
                attacker.health = attacker.health+100
            }


            attacker.addLogMessage(
                `${attacker.name} used Winter's Embrace`,
                `${attacker.name} summons a healing snowfall and heals by 100HP`
            )
            
           
        },
    },{
        name: 'Glacial Lance',
        cooldown: 0,
        description: `A skill that summons a massive ice spear that impales and damages enemies.`,
        canEvade: true,
        mana_cost: 8,
        damage:65,
        type: 'physical',
        element:"frost",
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
                mod  = 2
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
                mod  = 2
            }
            else if(defender.element == "draco"){
                mod  = 2
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            let stab = calculateSTAB("frost",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Glacial Lance`)
            defender.takeDamage
                .physical(attacker.attackDamage*stab*lvl_modifier(attacker.level)*65*mod)
                .run(damage => `${attacker.name} unleashes a massive ice spear on ${defender.name} causing ${damage} damage`)
        }
    },{
        name: 'Ice Scatter Shot',
        cooldown: 0,
        description: 'A skill that fires a spread of icy projectiles that damage the enemies.',
        canEvade: true,
        mana_cost: 8,
        damage:65,
        type: 'magical',
        element:"frost",
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
                mod  = 2
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
                mod  = 2
            }
            else if(defender.element == "draco"){
                mod  = 2
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            let stab = calculateSTAB("frost",attacker.element)
            attacker.addLogMessage(`${attacker.name} used Ice Scatter Shot`)
            defender.takeDamage
                .magical((attacker.magicPower*stab*lvl_modifier(attacker.level)*65)*mod)
                .run(damage => `${attacker.name} shoots a barrage of icy projectiles on ${defender.name} causing ${damage} damage`)
        }
    },
]

export default frost_tree