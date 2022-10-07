
let num = 0
const potions = [
    {
        name: 'Health Potion',
        cooldown: 0,
        description: 'Recovers 20 HP instantly',
        canEvade: false,
        mana_cost: 0,
        type: 'self',
        use: (attacker, defender) =>{
           
            const healthPotion = attacker.scheduler.task
            .turns(1)
            
            .end(() => {})
            .run(() =>
                attacker.addHealth
                    .physical(20)
                    .run(
                        health =>
                            `**${attacker.name}** gained ${health} HP`
                    )
            )

        defender.applyEffect(healthPotion)

            
        }
    },{
        name: 'None',
        cooldown: 0,
        description: 'You are out of potions',
        canEvade: false,
        mana_cost: 0,
        type: 'self',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`You are out of potions!`)
        }
    },
]

export default potions