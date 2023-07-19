import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../classes'
import { Dropper } from '../dropper'
import generateXP from '../../utils/generateXP'
import { goldenTelescope } from '../items/goldenTelescope'

export class captainCrook extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Beer Buccaneer ran away as you were about to finish it'],
            withDropMessages: ['The Beer Buccaneer dropped something'],
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
            name: 'Captain Crook',
            description:`the leader of Beer Buccaneers`,
            spawnRate: 0.5,
            health: 120,
            mana:4,
            xp: generateXP(25,30),
            evasion: 0.05,
            attackDamage: 20,
            fileName:'captaincrook.jpeg',
            magicPower: 20,
            run_chance: 0.02,
            armor: 15,
            speed: 15,
            element:"wave",
            magicResistance: 15,
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
                            .physical(attacker.attackDamage*24)
                            .run(damage => `**${defender.name}** lost ${damage} HP by a swift slash`)
                    }
                },{
                    cooldown: 0,
                    name: 'Wave Slash',
                    description: 'wave elemental slash',
                    canEvade: true,
                    type: 'magical',
                    element:"wave", 
                    damage:35,
                    mana_cost: 2,
                    use: (attacker, defender) =>{
                        let mod
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
            attacker.addLogMessage(`**${attacker.name}** used Wave Slash`)
            defender.takeDamage
                .magical((attacker.attackDamage*35)*mod)
                .run(damage => `**${defender.name}** lost ${damage} HP by a fast water imbued slash`)
                    }
                },
               
            ],
        })
    }
}
