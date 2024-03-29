import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { gildedScale } from '../../items/GildedScale'
import { calculateSTAB } from '../../../../commands/fight'
import lvl_modifier from '../../../utils/lvl_modifier'
import { emoji } from '../../../lib/utils/emoji'

export class Gildedwyvern extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Gilded Wyvern escaped as you were about to land the finishing blow.',],
            withDropMessages: [`The Guilded Wyvern lies dead on the ground as you collect some of it's scales`],
        }

        await new Dropper([
            {
                item: gildedScale,
                dropRate: 0.05,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Gildedwyvern({
            name: `Gilded Wyvern ${emoji.FLAME}`,
            description:`A majestic creature covered in shimmering golden scales, the Gilded Wyvern possesses a powerful breath of gilded flames that melts even the sturdiest defenses. It attacks with swift aerial maneuvers and slashes from its razor-sharp talons. Its drop is a Gilded Scale, a valuable golden scale sought after by alchemists for its transmutation properties.`,
            spawnRate: 0.2,
            health: 200,
            level:8,
            mana:5,
            xp: generateXP(32,35),
            evasion: 0.05,
            fileName:'guildedwyvern.jpeg',
            attackDamage: 40,
            magicPower: 36,
            run_chance: 0.02,
            armor: 10,
            speed: 35,
            element:"flame",
            magicResistance: 15,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Gilded Flame',
                    description: `Breathes jet of flames`,
                    canEvade: true,
                    type: 'magical',
                    element:"flame",
                    damage:28,
                    mana_cost: 1,
                    use: (attacker, defender) =>{
                        let mod
                        defender.element = defender.element.toLowerCase()
            if(defender.element == "flame"){
                mod  = 0.5
            }
            else if(defender.element == "light"){
                mod  = 0.5
            }
            else if(defender.element == "volt"){
                mod  = 1
            }
            else if(defender.element == "wave"){
                mod  = 0.5
            }
            else if(defender.element == "frost"){
                mod  = 2
            }
            else if(defender.element == "gale"){
                mod  = 2
            }
            else if(defender.element == "bloom"){
                mod  = 2
            }
            else if(defender.element == "terra"){
                mod  = 0.5
            }
            else if(defender.element == "alloy"){
                mod  = 2
            }
            else if(defender.element == "venom"){
                mod  = 1
            }
            else if(defender.element == "draco"){
                mod  = 0.5
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            let stab = calculateSTAB("flame",attacker.element)
                        attacker.addLogMessage(`${attacker.name} used Gilded Flame`)
                        defender.takeDamage
                            .magical(attacker.magicPower*28*mod*stab*lvl_modifier(attacker.level))
                            .run(damage => `${defender.name} lost ${damage} HP by a burst of flames`)
                    }
                },
                {
                    cooldown: 0,
                    name: 'Razor Slash',
                    description: `Slashes the enemy with it's sharp talons`,
                    canEvade: true,
                    type: 'physical',
                    element:"normal",
                    damage:30,
                    mana_cost: 2,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`${attacker.name} used Razor Slash`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*30*lvl_modifier(attacker.level))
                            .run(damage => `${defender.name} lost ${damage} HP by getting slashed by the Wyvern's sharp claws`)
                    }
                },
               
            ],
        })
    }
}
