const Weaponskills = [{
    cooldown: 0,
    name: 'Wave Slash',
    description: 'wave elemental slash',
    canEvade: true,
    type: 'physical',
    damage:45,
    element:"normal",
    mana_cost: 3,
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
        attacker.addLogMessage(`**${attacker.name}** used Wave Slash`)
        defender.takeDamage
            .physical((attacker.attackDamage*45)*mod)
            .run(damage => `**${defender.name}** lost ${damage} HP by a fast water imbued slash`)
    }
},{
    name: 'Thundering Blow',
    cooldown: 0,
    description: `A lightning imbued spear thrust.`,
    canEvade: true,
    mana_cost: 2,
    damage:30,
    type: 'physical',
    element:"volt",
    use: (attacker, defender) =>{
        let mod
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
        attacker.addLogMessage(`${attacker.name} used Thundering Blow`)
        defender.takeDamage
            .physical((attacker.attackDamage*30)*mod)
            .run(damage => `${defender.name} lost ${damage} HP by a lightning imbued Spear Thrust`)
    }
},{
    name: 'Electro Burst',
    cooldown: 0,
    description: `A lightning burst of bolts`,
    canEvade: true,
    mana_cost: 2,
    damage:30,
    type: 'magical',
    element:"volt",
    use: (attacker, defender) =>{
        let mod
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
        attacker.addLogMessage(`${attacker.name} used Thundering Blow`)
        defender.takeDamage
            .magical((attacker.attackDamage*30)*mod)
            .run(damage => `${defender.name} lost ${damage} HP by a barrage of lightning imbued Bolts`)
    }
}]

export default Weaponskills