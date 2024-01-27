
import lvl_modifier from "../../utils/lvl_modifier"
const other_passive_skills = [
    {
        cooldown: 0,
        name: 'Regeneration',
        description: '+5HP every turn',
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
                    attacker.health += 5
                    if(attacker.health > attacker.maxHealth){
                        attacker.health = attacker.maxHealth
                    }
                    attacker.addLogMessage(`${attacker.name} recovered 5 HP`)
                }
                    
                )

            defender.applyEffect(Regeneration)

            attacker.addLogMessage(
                `${attacker.name} has passive skill Regeneration`,
                `${attacker.name} will recover 5HP every turn`
            )
        },
    },
    {
        cooldown: 0,
        name: 'Flame Resistance',
        description: 'protection against flame element.',
        canEvade: false,
        type: 'passive',
        element:"normal", 
        damage:0,
        mana_cost: 0,
        use: (attacker, defender) => {
            if(defender.element == "flame"){
                attacker.armor = attacker.armor+5
                attacker.magicResistance = attacker.magicResistance+5

                attacker.addLogMessage(
                    `${attacker.name} Has Fire Resistance`,
                    `Flame type enemies will have less effect on you`
                )
            }
            


           
            
           
        },
    },{
        cooldown: 0,
        name: 'Goblin Summon',
        description: 'every turn, goblin gang does some damage',
        canEvade: false,
        mana_cost: 0,
        damage:0,
        type: 'passive',
        element:"normal", 
        use: (attacker, defender) => {
            const goblinSummon = attacker.scheduler.task.all
                .turns(20)
                .end(() => {})
                .run(() =>{
                defender.takeDamage
                .physical(400*lvl_modifier(attacker.level))
                .run(damage => `${defender.name} lost ${damage} HP by the attacks of the Goblins`)
                }
                    
                )

            defender.applyEffect(goblinSummon)

            attacker.addLogMessage(
                `${attacker.name} blew the Goblin Whistle`,
                `A group of goblins were summoned to do ${attacker.name}'s bidding`
            )
        },
    },{
        cooldown: 0,
        name: `Nature's Authority`,
        description: '10% attack boost against Bloom type enemies',
        canEvade: false,
        type: 'passive',
        element:"normal", 
        damage:0,
        mana_cost: 0,
        use: (attacker, defender) => {
            if(defender.element == "bloom"){
                attacker.attackDamage = 1.15*attacker.attackDamage
                attacker.magicPower = 1.15*attacker.magicPower

                attacker.addLogMessage(
                    `${attacker.name} Has Nature's Authority`,
                    `Bloom type enemies will be weakened in your presence`
                )
            }
            


           
            
           
        },
    },

]

export default other_passive_skills