
import { calculateModifier } from "../../../commands/fight"
import { weightedRandom } from "../../utils"
import { poisoning } from "../effects/poisoning"
import lvl_modifier from "../../utils/lvl_modifier"
import { emoji } from "../../lib/utils/emoji"



const dragoon_passive = [{
    cooldown: 0,
    name: 'Sniper Vision',
    description: 'Every turn 30% chance of hitting a vital organ causing additional critical damage',
    canEvade: false,
    mana_cost: 0,
    damage:0,
    type: 'passive',
    element:"normal", 
    use: (attacker, defender) => {
        const sniper = attacker.scheduler.task.all
            .turns(20)
            .end(() => {})
            .run(() =>{
                const chance = weightedRandom([true,false],[0.3,0.7])
                if(chance){
                    defender.takeDamage
                    .magical(attacker.magicPower*Math.round(attacker.magicPower/8)*lvl_modifier(attacker.level))
                    .run(damage => `${defender.name} lost ${damage} HP by a critical hit to their vitals`)
                }
           
            }
                
            )

        defender.applyEffect(sniper)

        attacker.addLogMessage(
            `${attacker.name} has Sniper Vision`,
            `All attacks of ${attacker.name} will have 30% chance to inflict critical damage`
        )
    },
},]
export default dragoon_passive