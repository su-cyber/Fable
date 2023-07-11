

const buushin_tree=[
    {
        name: 'Shattering Kick',
        cooldown: 0,
        description: `Unleash a resonating kick that reverberates through your opponent's defenses, creating a shattering impact.`,
        canEvade: true,
        mana_cost: 0,
        damage:15,
        element:"normal",
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Shattering Kick`)
            defender.takeDamage
                .physical(attacker.attackDamage*15)
                .run(damage => `${defender.name} lost ${damage} HP by a powerful kick with deadly impact`)
        }
    },{
        name: 'Inner Focus',
        cooldown: 0,
        description: 'Tap into the depths of your inner strength, igniting a fierce fire within that fuels your attacks with unstoppable power.',
        canEvade: true,
        mana_cost: 3,
        damage:0,
        element:"normal",
        type: 'buff',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Inner Focus`)
            attacker.attackDamage+=15
            attacker.addLogMessage(`${attacker.name} tapped into the depths of your inner strength, igniting a fierce fire within that fuels your attacks with unstoppable power.`)
        }
    },{
        name: 'Guard Burst',
        cooldown: 0,
        description: 'Unleash a devastating blow that shatters the very foundation of defense, leaving your foes vulnerable and defenseless.',
        canEvade: true,
        mana_cost:5,
        damage:35,
        element:"normal",
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(
                `${attacker.name} used Guard Burst`
            )
            defender.takeDamage
            .physical(attacker.attackDamage*35)
            .run(damage => `${defender.name} lost ${damage} HP by a devastating blow that shattered the very foundation of defense, leaving them vulnerable to physical attacks.`)
            defender.armor=defender.armor*0.8
        }
    },{
        name: `Phantom Shower`,
        cooldown: 0,
        description: 'Manifest four giant arms forged from spyr energy,rending through flesh as you shower the enemy with an unending barrage.',
        canEvade: true,
        mana_cost: 8,
        damage:50,
        element:"normal",
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Phantom Shower`)
            defender.takeDamage
                .physical(attacker.attackDamage*50)
                .run(damage => `${defender.name} lost ${damage} HP by a barrage of ethereal punches rending through their flesh.`)
        }
    },{
        cooldown: 0,
        name: `Evasion Dance`,
        description: `Embrace the art of evasion, your movements flowing like water as you evade attacks with breathtaking finesse.`,
        canEvade: false,
        type: 'buff',
        damage:0,
        element:"normal",
        mana_cost: 10,
        use: (attacker, defender) => {
            attacker.evasion = attacker.evasion+0.05
                        attacker.addLogMessage(`${attacker.name} used Evasion Dance`,
                        `${attacker.name} taps into their innate hyper reflexes making them more agile and evassive.`
                        )
                       
           
        },
    },{
        name: `Defiance of Limit`,
        cooldown: 0,
        description: 'Remove mortal limitations as your strikes become unstoppable breaking the sturdiest of defenses.',
        canEvade: true,
        mana_cost: 12,
        damage:70,
        element:"normal",
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Defiance of Limit`)
            defender.armour=0.8*defender.armor
            defender.takeDamage
                .physical(attacker.attackDamage*70)
                .run(damage => `${defender.name} lost ${damage} HP by a series of unstoppable strikes rendering their defense useless!`)
        }
    },{
        name: `Unseen Fist`,
        cooldown: 0,
        description: 'Fade from sight, your presence erased from the battlefield, only to reappear in a flash of blinding speed, delivering a strike that defies comprehension and decimates your enemies.',
        canEvade: true,
        mana_cost: 15,
        damage:85,
        element:"normal",
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Unseen Fist`)
            defender.takeDamage
                .physical(attacker.attackDamage*85)
                .run(damage => `${attacker.name} disappears from sight and suddenly ${defender.name} loses ${damage} HP by an unstoppable strike at blinding speed caught completely by surprise.`)
        }
    },
]

export default buushin_tree