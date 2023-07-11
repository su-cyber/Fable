
import flame_tree from './flame_tree'
import light_tree from './light_tree'
import gladius_tree from './gladius_tree'
import volt_tree from './volt_tree'
import wave_tree from './wave_tree'
import frost_tree from './frost_tree'
import gale_tree from './gale_tree'
import alloy_tree from './alloy_tree'
import bloom_tree from './bloom_tree'
import terra_tree from './terra_tree'
import venom_tree from './venom_tree'
import noir_tree from './noir'
import magus_tree from './magus_tree'
import buushin_tree from './buushin_tree'
import dragoon_tree from './dragoon_tree'

const otherskills = [{
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
},]
const skills = flame_tree.concat(light_tree,gladius_tree,volt_tree,wave_tree,frost_tree,gale_tree,alloy_tree,bloom_tree,terra_tree,venom_tree,noir_tree,dragoon_tree,magus_tree,buushin_tree,otherskills)

export default skills