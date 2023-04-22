import { GuildMember } from 'discord.js'
import { emoji } from '../../lib/utils/emoji'
import { calculate, ClassEntity } from '../classes'
import { bleeding } from '../effects/bleeding'
import { blind } from '../effects/blind'
import { burning } from '../effects/burning'
import { stun } from '../effects/stun'
import flame_tree from './flame_tree'
import light_tree from './light_tree'
import samurai_tree from './samurai_tree'
import volt_tree from './volt_tree'
import wave_tree from './wave_tree'
import frost_tree from './frost_tree'
import gale_tree from './gale_tree'
import alloy_tree from './alloy_tree'
import bloom_tree from './bloom_tree'
import terra_tree from './terra_tree'
import venom_tree from './venom_tree'
import assassin_tree from './assassin_tree'
import paladin_tree from './paladin_tree'
import sorceror_tree from './sorceror_tree'
import crusader_tree from './crusader_tree'
import wanderer_tree from './wanderer_tree'

const otherskills = [{
    cooldown: 0,
    name: 'Wave Slash',
    description: 'wave elemental slash',
    canEvade: true,
    type: 'physical',
    damage:45,
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
            .physical((attacker.attackDamage+45)*mod)
            .run(damage => `**${defender.name}** lost ${damage} HP by a fast water imbued slash`)
    }
},]
const skills = flame_tree.concat(light_tree,samurai_tree,volt_tree,wave_tree,frost_tree,gale_tree,alloy_tree,bloom_tree,terra_tree,venom_tree,assassin_tree,wanderer_tree,sorceror_tree,paladin_tree,crusader_tree,otherskills)

export default skills