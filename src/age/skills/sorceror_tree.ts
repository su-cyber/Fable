

const sorceror_tree=[
    {
        name: 'Force Push',
        cooldown: 0,
        description: 'Pushes the enemy away from the Sorcerer, dealing low damage.',
        canEvade: true,
        mana_cost: 0,
        damage:15,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Force Push`)
            defender.takeDamage
                .magical(attacker.magicPower+15)
                .run(damage => `${defender.name} lost ${damage} HP by a magic thrust`)
        }
    },{
        name: 'Arcane Shot',
        cooldown: 0,
        description: `Empowers the Sorcerer's pistol, causing their shot to deal extra magical damage.`,
        canEvade: true,
        mana_cost: 2,
        damage:25,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Arcane Shot`)
            defender.takeDamage
                .magical(attacker.magicPower+25)
                .run(damage => `${defender.name} lost ${damage} HP by being hit by a strong magical shot`)
        }
    },{
        name: 'Spyr Missile Barrage',
        cooldown: 0,
        description: 'A classic magical attack that deals low damage to a single target',
        canEvade: true,
        mana_cost:3,
        damage:40,
        type: 'magical',
        use: (attacker, defender) =>{

            attacker.addLogMessage(
                `${attacker.name} used Spyr Missile Barrage`
            )
            defender.takeDamage
            .magical(attacker.magicPower+40)
            .run(damage => `${defender.name} lost ${damage} HP by a barrage of magic missiles`)
        }
    },{
        name: `Shadow Magenum`,
        cooldown: 0,
        description: 'Teleports the Sorcerer a short distance away from their current position, flanking the enemy for moderate damage.',
        canEvade: true,
        mana_cost: 6,
        damage:65,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Shadow Magenum`)
            defender.takeDamage
                .magical(attacker.magicPower+65)
                .run(damage => `${defender.name} lost ${damage} HP by a sudden magical attack`)
        }
    },{
        cooldown: 0,
        name: `Crippling Curse`,
        description: `Channel your life energy to restore stamina and spyr.`,
        canEvade: false,
        type: 'self',
        damage:0,
        mana_cost: 6,
        use: (attacker, defender) => {
            const reducedarmor = defender.armor-5
            const curse = attacker.scheduler.task
                            .id('sorceror_curse')
                            .turns(3)
                            .end(() => defender.removeEffect(curse))
                            .run(() =>
                            defender.armor = reducedarmor
                            )

                        defender.applyEffect(curse)
                        attacker.addLogMessage(`${attacker.name} used Crippling Curse`,
                        `${attacker.name} placed a curse on ${defender.name} weakening them`
                        )
            


           
            
           
        },
    },
]

export default sorceror_tree