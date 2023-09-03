import { calculateSTAB } from "../../../commands/fight"

const Weaponskills = [{
    cooldown: 0,
    name: 'Wave Slash',
    description: 'wave elemental slash',
    canEvade: true,
    type: 'magical',
    damage:45,
    element:"wave",
    mana_cost: 3,
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
let stab = calculateSTAB("wave",attacker.element)
        attacker.addLogMessage(`**${attacker.name}** used Wave Slash`)
        defender.takeDamage
            .magical((attacker.magicPower*stab*45)*mod)
            .run(damage => `**${defender.name}** lost ${damage} HP by a fast water imbued slash`)
    }
},{
    name: 'Thundering Blow',
    cooldown: 0,
    description: `A lightning imbued spear thrust.`,
    canEvade: true,
    mana_cost: 2,
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
        let stab = calculateSTAB("wave",attacker.element)
        attacker.addLogMessage(`${attacker.name} used Thundering Blow`)
        defender.takeDamage
            .physical((attacker.attackDamage*stab*30)*mod)
            .run(damage => `${defender.name} lost ${damage} HP by a lightning imbued Spear Thrust`)
    }
},{
    name: 'Electro Burst',
    cooldown: 0,
    description: `A lightning burst of bolts`,
    canEvade: true,
    mana_cost: 2,
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
        let stab = calculateSTAB("wave",attacker.element)
        attacker.addLogMessage(`${attacker.name} used Electro Burst`)
        defender.takeDamage
            .magical((attacker.magicPower*stab*30)*mod)
            .run(damage => `${defender.name} lost ${damage} HP by a barrage of lightning imbued Bolts`)
    }
},{
    name: 'Mutilate',
    cooldown: 0,
    description: 'Mutilate your enemy with fast precise strikes.',
    canEvade: true,
    mana_cost: 3,
    damage:45,
    element:"normal",
    type: 'physical',
    use: (attacker, defender) =>{
        attacker.addLogMessage(`${attacker.name} used Mutilate`)
        defender.takeDamage
            .physical(attacker.attackDamage*45)
            .run(damage => `${defender.name} lost ${damage} HP by a series of critical strikes to their vitals`)
    }
},]

export default Weaponskills