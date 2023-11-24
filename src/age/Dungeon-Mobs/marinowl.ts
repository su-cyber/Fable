import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../classes'
import { Dropper } from '../dropper'
import generateXP from '../../utils/generateXP'
import { goldenTelescope } from '../items/goldenTelescope'
import { calculateSTAB } from '../../../commands/fight'
import lvl_modifier from '../../utils/lvl_modifier'
import { emoji } from '../../lib/utils/emoji'
import { calculateModifier } from '../../../commands/fight'
import { marineFeather } from '../items/marineFeather'


export class Marinowl extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [`You couldn't catch up to the Marinowl as it vanished into the darkness.`],
            withDropMessages: ['After a fierce battle with the Marinowl, you find a feather from its majestic wings.'],
        }

        await new Dropper([
            {
                item: marineFeather,
                dropRate: 0.2,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Marinowl({
            name: `Marinowl ${emoji.GALE}`,
            description:`An owl-like creature with waterproof feathers that allow it to glide silently over water.`,
            spawnRate: 0.5,
            health: 316,
            level:11,
            mana:7,
            xp: generateXP(50, 62),
            evasion: 0.065,
            attackDamage: 45,
            fileName:'marinowl.jpeg',
            magicPower: 43,
            run_chance: 0.02,
            armor: 26,
            speed: 40,
            element:"gale",
            magicResistance: 26,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Aqua Talon',
                    description: `attacks with it's talons imbued with wave`,
                    canEvade: true,
                    type: 'physical',
                    element:"wave", 
                    damage:23,
                    mana_cost: 2,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("wave",defender.element)
                        let stab = calculateSTAB("wave",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Aqua Talon`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*23*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${defender.name}** lost ${damage} HP by a deadly arial attack from the water imbued talons of the Marinowl`)
                    }
                },{
                    cooldown: 0,
                    name: 'Siren Call',
                    description: 'Loud damaging screech that vibrates everything around.',
                    canEvade: true,
                    type: 'magical',
                    element:"gale", 
                    damage:55,
                    mana_cost: 4,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("gale",defender.element)
            let stab = calculateSTAB("gale",attacker.element)
            attacker.addLogMessage(`**${attacker.name}** used Siren Call`)
            defender.takeDamage
                .magical((attacker.magicPower*55)*mod*stab*lvl_modifier(attacker.level))
                .run(damage => `**${defender.name}** lost ${damage} HP by an insanely loud screech vibrating the very space around you`)
                    }
                },
               
            ],
        })
    }
}
