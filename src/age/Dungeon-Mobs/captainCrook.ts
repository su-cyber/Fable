import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../classes'
import { Dropper } from '../dropper'
import generateXP from '../../utils/generateXP'
import { goldenTelescope } from '../items/goldenTelescope'
import { calculateSTAB } from '../../../commands/fight'
import lvl_modifier from '../../utils/lvl_modifier'
import { emoji } from '../../lib/utils/emoji'


export class captainCrook extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The struggling pirate falls on his knees coughing blood as you look down on him with a triumphant look aiming your weapon at his neck.'],
            withDropMessages: ['The struggling pirate falls on his knees coughing blood as you look down on him with a triumphant look aiming your weapon at  his neck.'],
        }

        await new Dropper([
            {
                item: goldenTelescope,
                dropRate: 1,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new captainCrook({
            name: `Captain Crook ${emoji.WAVE}`,
            description:`the leader of Beer Buccaneers`,
            spawnRate: 0.5,
            health: 120,
            level:4,
            mana:4,
            xp: generateXP(25,30),
            evasion: 0.05,
            attackDamage: 18,
            fileName:'captaincrook.jpeg',
            magicPower: 18,
            run_chance: 0.02,
            armor: 14,
            speed: 20,
            element:"wave",
            magicResistance: 14,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Swift Cleave',
                    description: 'attacks with his cutlass',
                    canEvade: true,
                    type: 'physical',
                    element:"normal", 
                    damage:24,
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`**${attacker.name}** used Swift Cleave`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*24*lvl_modifier(attacker.level))
                            .run(damage => `**${defender.name}** lost ${damage} HP by a swift slash`)
                    }
                },{
                    cooldown: 0,
                    name: 'Wave Slash',
                    description: 'wave elemental slash',
                    canEvade: true,
                    type: 'physical',
                    element:"wave", 
                    damage:35,
                    mana_cost: 2,
                    use: (attacker, defender) =>{
                        let mod
                        defender.element = defender.element.toLowerCase()
            if(defender.element == "flame"){
                mod  = 2
            }
            else if(defender.element == "light"){
                mod  = 1
            }
            else if(defender.element == "volt"){
                mod  = 1
            }
            else if(defender.element == "wave"){
                mod  = 0.5
            }
            else if(defender.element == "frost"){
                mod  = 0.5
            }
            else if(defender.element == "gale"){
                mod  = 1
            }
            else if(defender.element == "bloom"){
                mod  = 0.5
            }
            else if(defender.element == "terra"){
                mod  = 2
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
            let stab = calculateSTAB("wave",attacker.element)
            attacker.addLogMessage(`**${attacker.name}** used Wave Slash`)
            defender.takeDamage
                .physical((attacker.attackDamage*35)*mod*stab*lvl_modifier(attacker.level))
                .run(damage => `**${defender.name}** lost ${damage} HP by a fast water imbued slash`)
                    }
                },
               
            ],
        })
    }
}
