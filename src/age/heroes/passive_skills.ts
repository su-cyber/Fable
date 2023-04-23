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
                    attacker.addLogMessage(`${attacker.name} recovered 5 HP`)
                }
                    
                )

            defender.applyEffect(Regeneration)

            attacker.addLogMessage(
                `**${attacker.name}** has passive skill Regeneration`,
                `**${attacker.name}** will recover 5HP every turn`
            )
        },
    }

]

export default passive_skills