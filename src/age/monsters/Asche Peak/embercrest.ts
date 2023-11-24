import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { calculateSTAB } from '../../../../commands/fight'
import lvl_modifier from '../../../utils/lvl_modifier'
import { emoji } from '../../../lib/utils/emoji'
import { calculateModifier } from '../../../../commands/fight'
import { hydroScale } from '../../items/hydroScale'
import { embercrestAsh } from '../../items/embercrestAsh'



export class Embercrest extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Embercrest burst into flames before you could finish it'],
            withDropMessages: [`As you defeat the Embercrest, you retrieve some ash from it's remains`],
        }

        await new Dropper([
            {
                item: embercrestAsh,
                dropRate: 0.2,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Embercrest({
            name: `Embercrest ${emoji.FLAME}`,
            description:`The Embercrest is a magnificent and fierce eagle-like creature, known for its fiery plumage and commanding presence in the skies. Its feathers blaze with the colors of the hottest flames, transitioning from vibrant reds and oranges at the tips to molten yellows and whites near the body. Its eyes are like two burning orbs, radiating an intense, inner fire.`,
            spawnRate: 0.25,
            health: 355,
            level:12,
            mana:7,
            xp: generateXP(70, 80),
            evasion: 0.065,
            attackDamage: 43,
            fileName:'embercrest.jpeg',
            magicPower: 35,
            run_chance: 0.02,
            armor: 40,
            speed: 40,
            element:"flame",
            magicResistance: 35,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Heatwave',
                    description: `radiate intense scorching heatwave across the battlefield`,
                    canEvade: true,
                    type: 'magical',
                    element:"flame", 
                    damage:23,
                    mana_cost: 2,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("flame",defender.element)
                        let stab = calculateSTAB("flame",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Heatwave`)
                        defender.takeDamage
                            .magical(attacker.magicPower*23*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${attacker.name}** radiates a scorching heatwave causing ${defender.name} to lose ${damage} HP`)
                    }
                },{
                    cooldown: 0,
                    name: 'Infernal Soar',
                    description: 'Carries the enemy to the air and erupts into deadly flames',
                    canEvade: true,
                    type: 'physical',
                    element:"flame", 
                    damage:55,
                    mana_cost: 4,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("flame",defender.element)
            let stab = calculateSTAB("flame",attacker.element)
            attacker.addLogMessage(`**${attacker.name}** used Infernal Soar`)
            defender.takeDamage
                .physical((attacker.attackDamage*55)*mod*stab*lvl_modifier(attacker.level))
                .run(damage => `**${attacker.name}** carries ${defender.name} to the sky before errupting into deadly flames causing ${damage} Dmg`)
                    }
                },
               
            ],
        })
    }
}
