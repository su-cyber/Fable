
import { calculateModifier } from "../../../commands/fight"
import { weightedRandom } from "../../utils"
import { poisoning } from "../effects/poisoning"
import lvl_modifier from "../../utils/lvl_modifier"
import { emoji } from "../../lib/utils/emoji"


const magus_passive = [{
    cooldown: 0,
    name: 'Prodigy',
    description: 'User gains +3% Knowledge each turn.',
    canEvade: false,
    mana_cost: 0,
    damage:0,
    type: 'passive',
    element:"normal", 
    use: (attacker, defender) => {
        const prodigy = attacker.scheduler.task.attacker
        .turns(20)
        .end(() => {})
        .run(() =>{
            
                attacker.magicResistance += Math.round(0.03*attacker.magicResistance)
            attacker.addLogMessage(`${attacker.name} raised their attacking stats due to the effect of **Berserk**`)
            
            
        }
            
        )

    attacker.applyEffect(prodigy)

    attacker.addLogMessage(
        `${attacker.name} has ability **Prodigy**`,
        `${attacker.name}'s knowledge will keep increasing every turn`
    )
    },
},]
export default magus_passive