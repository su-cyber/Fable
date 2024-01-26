
import { calculateModifier } from "../../../commands/fight"
import { weightedRandom } from "../../utils"
import { poisoning } from "../effects/poisoning"
import lvl_modifier from "../../utils/lvl_modifier"
import { emoji } from "../../lib/utils/emoji"


const gladius_passive = [{
    cooldown: 0,
    name: 'Berserk',
    description: 'Raises Vigour and Arcana by 1 Stage every turn as long as health is below 50%',
    canEvade: false,
    mana_cost: 0,
    damage:0,
    type: 'passive',
    element:"normal", 
    use: (attacker, defender) => {
        const berserk = attacker.scheduler.task.attacker
        .turns(20)
        .end(() => {})
        .run(() =>{
            if(attacker.health < 0.5*attacker.maxHealth){
                attacker.attackDamage += Math.round(0.1*attacker.attackDamage)
                attacker.magicPower += Math.round(0.1*attacker.magicPower)
            attacker.addLogMessage(`${attacker.name} raised their attacking stats due to the effect of **Berserk**`)
            }
            
        }
            
        )

    attacker.applyEffect(berserk)

    attacker.addLogMessage(
        `${attacker.name} has Berserk`,
        `${attacker.name}'s attack power will keep increasing when their health is below 50%`
    )
    },
},]
export default gladius_passive