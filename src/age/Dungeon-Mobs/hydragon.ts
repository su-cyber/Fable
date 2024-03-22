import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../classes'
import { Dropper } from '../dropper'
import generateXP from '../../utils/generateXP'
import { goldenTelescope } from '../items/goldenTelescope'
import { calculateSTAB } from '../../../commands/fight'
import lvl_modifier from '../../utils/lvl_modifier'
import { emoji } from '../../lib/utils/emoji'
import { calculateModifier } from '../../../commands/fight'
import { hydroScale } from '../items/hydroScale'


export class Hydragon extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Hydragon slipped into the depths before you could finish it.'],
            withDropMessages: ['As you defeat the Hydragon, you manage to retrieve a scale from its fiery body.'],
        }

        await new Dropper([
            {
                item: hydroScale,
                dropRate: 0.2,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Hydragon({
            name: `Hydragon ${emoji.WAVE}`,
            description:`A serpentine creature with iridescent scales that shimmer in the dim light of the aqueducts.`,
            spawnRate: 0.5,
            health: 355,
            level:12,
            mana:7,
            xp: generateXP(70, 80),
            evasion: 0.065,
            attackDamage: 18,
            fileName:'hydragon.jpeg',
            magicPower: 60,
            run_chance: 0.02,
            armor: 35,
            speed: 45,
            element:"wave",
            magicResistance: 35,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Aqua Scale',
                    description: `A wave imbued tackle with it's hard scales`,
                    canEvade: true,
                    type: 'physical',
                    element:"wave", 
                    damage:25,
                    mana_cost: 2,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("wave",defender.element)
                        let stab = calculateSTAB("wave",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Aqua Scale`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*25*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${defender.name}** lost ${damage} HP by a deadly tackle imbued with the power of wave`)
                    }
                },{
                    cooldown: 0,
                    name: 'Torrential Whirl',
                    description: 'Bringa forth a detructive torrent of water',
                    canEvade: true,
                    type: 'magical',
                    element:"wave", 
                    damage:45,
                    mana_cost: 4,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("wave",defender.element)
            let stab = calculateSTAB("wave",attacker.element)
            attacker.addLogMessage(`**${attacker.name}** used Siren Call`)
            defender.takeDamage
                .magical((attacker.magicPower*45)*mod*stab*lvl_modifier(attacker.level))
                .run(damage => `**${defender.name}** lost ${damage} HP by a destructive torrent of water`)
                    }
                },
               
            ],
        })
    }
}
