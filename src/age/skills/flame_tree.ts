import { GuildMember } from 'discord.js'
import { emoji } from '../../lib/utils/emoji'
import { calculate, ClassEntity } from '../classes'
import { bleeding } from '../effects/bleeding'
import { blind } from '../effects/blind'
import { burning } from '../effects/burning'
import { stun } from '../effects/stun'

const flame_tree=[
    {
        name: 'Flame Whip',
        cooldown: 0,
        description: 'A skill that allows the user to whip their enemies with a fiery lash.',
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'physical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Flame Whip`)
            defender.takeDamage
                .physical(attacker.attackDamage+20)
                .run(damage => `**${defender.name}** lost ${damage} HP by Flame Whip`)
        }
    },{
        name: 'Flare Breath',
        cooldown: 0,
        description: 'A skill that lets the user exhale a burst of flames at their foes.',
        canEvade: true,
        mana_cost: 1,
        damage:20,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Flare Breath`)
            defender.takeDamage
                .magical(attacker.magicPower+20)
                .run(damage => `**${defender.name}** lost ${damage} HP by Flare Breath`)
        }
    },{
        name: 'Erupting Fist',
        cooldown: 0,
        description: 'A skill that lets the user exhale a burst of flames at their foes.',
        canEvade: true,
        mana_cost: 3,
        damage:45,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Erupting Fist`)
            defender.takeDamage
                .physical(attacker.attackDamage+45)
                .run(damage => `**${defender.name}** lost ${damage} HP by Erupting Fist`)
        }
    },{
        name: 'Scattering Flame Bullet',
        cooldown: 0,
        description: 'A skill that lets the user exhale a burst of flames at their foes.',
        canEvade: true,
        mana_cost: 1,
        damage:45,
        type: 'magical',
        use: (attacker, defender) =>{
            attacker.addLogMessage(`**${attacker.name}** used Scattering Flame Bullet`)
            defender.takeDamage
                .magical(attacker.magicPower+45)
                .run(damage => `**${defender.name}** lost ${damage} HP by Scattering Flame Bullet`)
        }
    },
]

export default flame_tree