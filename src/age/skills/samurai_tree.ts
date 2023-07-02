
import { emoji } from '../../lib/utils/emoji'
import { bleeding } from '../effects/bleeding'


const samurai_tree=[
    {
        name: 'Shattering Kick',
        cooldown: 0,
        description: 'A powerful kick that deals low damage to the opponent',
        canEvade: true,
        mana_cost: 0,
        damage:15,
        element:"normal",
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Shattering Kick`)
            defender.takeDamage
                .physical(attacker.attackDamage+15)
                .run(damage => `${defender.name} lost ${damage} HP by a powerful kick`)
        }
    },{
        name: 'Flashing Blade',
        cooldown: 0,
        description: 'A lightning-fast sword strike that deals low damage to the opponent',
        canEvade: true,
        mana_cost: 2,
        damage:25,
        type: 'physical',
        element:"normal",
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Flashing Blade`)
            defender.takeDamage
                .physical(attacker.attackDamage+25)
                .run(damage => `${defender.name} lost ${damage} HP by a swift sword strike`)
        }
    },{
        name: 'Predator Shot',
        cooldown: 0,
        description: 'A precise arrow shot that deals moderate damage to the opponent and causes bleeding',
        canEvade: true,
        mana_cost:3,
        damage:40,
        element:"normal",
        type: 'physical',
        use: (attacker, defender) =>{
            const predatorShot = attacker.scheduler.task
                .turns(3)
                .all.effect(bleeding)
                .end(() => defender.removeEffect(bleeding))
                .run(() =>
                    defender.takeDamage
                        .physical(10)
                        .run(
                            damage =>
                                `${defender.name} lost ${damage} HP due to ${emoji.BLEED}`
                        )
                )

            defender.applyEffect(predatorShot)
            attacker.addLogMessage(
                `${attacker.name} used Predator Shot`
            )
            defender.takeDamage
            .physical(attacker.attackDamage+40)
            .run(damage => `${defender.name} lost ${damage} HP by a deadly arrow shot to the vitals\n${defender.name} is bleeding!`)
        }
    },{
        name: 'Cyclone Slash',
        cooldown: 0,
        description: 'A spinning sword attack that hits the opponent for moderate damage.',
        canEvade: true,
        mana_cost: 6,
        damage:65,
        element:"normal",
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`${attacker.name} used Cyclone Slash`)
            defender.takeDamage
                .physical(attacker.attackDamage+65)
                .run(damage => `${defender.name} lost ${damage} HP by a spinning sword strike`)
        }
    },{
        cooldown: 0,
        name: `Ki Restoration`,
        description: `Channel your life energy to restore stamina and spyr.`,
        canEvade: false,
        type: 'self',
        element:"normal",
        damage:0,
        mana_cost: 6,
        use: (attacker, defender) => {
            attacker.mana = attacker.mana+10


            attacker.addLogMessage(
                `${attacker.name} used Ki Restoration`,
                `${attacker.name} channels their life energy and restores 10 AP`
            )
            
           
        },
    },
]

export default samurai_tree