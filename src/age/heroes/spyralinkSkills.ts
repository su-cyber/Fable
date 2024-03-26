import { weightedRandom } from "../../utils"
import lvl_modifier from "../../utils/lvl_modifier"
const spyralinkSkills = [{
        cooldown: 0,
        name: 'Shadow Prowl',
        description: 'The Umbraline mends into the shadows and prowls on the enemy when they are vulnerable.',
        canEvade: false,
        mana_cost: 0,
        damage:0,
        type: 'passive',
        element:"normal",
        use: (attacker, defender) => {
            const shadowProwl = attacker.scheduler.task.all
                .turns(20)
                .end(() => {})
                .run(() =>{
                    const chance = weightedRandom([true,false],[0.4,0.6])
                    if(chance){
                        let power
                        if (attacker.level < 10) {
                            power = 10; // Power is 0 for levels below 10
                        } else if (attacker.level >= 10 && attacker.level <= 100) {
                            // Linear interpolation to increase power gradually from 10 to 30
                            power = 10 + (attacker.level - 10) * (30 - 10) / (100 - 10);
                        } else {
                            power = 30; // Power is 30 for levels above 100
                        }

                    defender.takeDamage
                    .physical(attacker.attackDamage*power*lvl_modifier(attacker.level))
                    .run(damage => `The Umbraline catches ${defender.name} offguard and suddenly prowls on them from the shadows causing ${damage} Damage`)
                    }
                
                }
                    
                )

            defender.applyEffect(shadowProwl)

            attacker.addLogMessage(
                `${attacker.name} calls out their Spyralink`,
                `An Umbraline manifests and blends into the shadows of the battlefield`
            )
        },
    },]

    export default spyralinkSkills