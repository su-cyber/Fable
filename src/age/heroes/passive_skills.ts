

const passive_skills = [
    {
        cooldown: 0,
        name: 'Regeneration',
        description: '+5HP every turn',
        canEvade: false,
        mana_cost: 0,
        damage:0,
        type: 'passive',
        use: (attacker, defender) => {
            const Regeneration = attacker.scheduler.task.all
                .turns(1000)
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
                `**${attacker.name}** has passive skill Regeneration`,
                `**${attacker.name}** will recover 5HP every turn`
            )
        },
    },
    {
        cooldown: 0,
        name: 'Flame Resistance',
        description: 'protection against flame element.',
        canEvade: false,
        type: 'buff',
        damage:0,
        mana_cost: 0,
        use: (attacker, defender) => {
            if(defender.element == "flame"){
                attacker.armor = 1.5*attacker.armor
                attacker.magicResistance = 1.5*attacker.magicResistance

                attacker.addLogMessage(
                    `**${attacker.name}** Has Fire Resistance`,
                    `Flame type enemies will have 50% less effect`
                )
            }
            


           
            
           
        },
    },

]

export default passive_skills