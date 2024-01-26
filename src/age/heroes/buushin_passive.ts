
import { calculateModifier } from "../../../commands/fight"
import { weightedRandom } from "../../utils"
import { poisoning } from "../effects/poisoning"
import lvl_modifier from "../../utils/lvl_modifier"
import { emoji } from "../../lib/utils/emoji"


const buushin_passive = [{
    cooldown: 0,
    name: 'Natural Cure',
    description: 'Your natural healing factor restores 1/16th health Every Turn',
    canEvade: false,
    mana_cost: 0,
    damage:0,
    type: 'passive',
    element:"normal", 
    use: (attacker, defender) => {
        const Regeneration = attacker.scheduler.task.all
        .turns(20)
        .end(() => {})
        .run(() =>{
            attacker.health += Math.round(attacker.maxHealth/16)
            if(attacker.health > attacker.maxHealth){
                attacker.health = attacker.maxHealth
            }
            attacker.addLogMessage(`${attacker.name} recovered ${Math.round(attacker.maxHealth/16)} HP`)
        }
            
        )

    attacker.applyEffect(Regeneration)

    attacker.addLogMessage(
        `${attacker.name} has Natural Cure`,
        `${attacker.name} will recover some HP every turn due to their healing factor`
    )
    },
},]
export default buushin_passive