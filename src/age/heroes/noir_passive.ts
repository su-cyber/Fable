
import { calculateModifier } from "../../../commands/fight"
import { weightedRandom } from "../../utils"
import { poisoning } from "../effects/poisoning"
import lvl_modifier from "../../utils/lvl_modifier"
import { emoji } from "../../lib/utils/emoji"



const noir_passive = [{
    cooldown: 0,
    name: 'Venomous Touch',
    description: 'Attacks have a 50% chance to inflicting Poison',
    canEvade: false,
    mana_cost: 0,
    damage:0,
    type: 'passive',
    element:"normal", 
    use: (attacker, defender) => {
        const venomousTouch = attacker.scheduler.task.all
            .turns(20)
            .end(() => {})
            .run(() =>{
                const chance = weightedRandom([true,false],[0.5,0.5])
                if(chance){
                    defender.takeDamage
                    .magical(attacker.magicPower*10*lvl_modifier(attacker.level)*calculateModifier("venom",defender.element))
                    .run(damage => `${defender.name} lost ${damage} HP by ${emoji.POISON}`)
                }
           
            }
                
            )

        defender.applyEffect(venomousTouch)

        attacker.addLogMessage(
            `${attacker.name} has Venomous Touch`,
            `All attacks of ${attacker.name} will have 50% chance to inflict poison damage`
        )
    }
},]
export default noir_passive