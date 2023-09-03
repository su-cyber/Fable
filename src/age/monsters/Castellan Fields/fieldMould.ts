import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { dronerAcid } from '../../items/dronerAcid'
import { calculateSTAB } from '../../../../commands/fight'

export class fieldMould extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Field Mould decayed leaving nothing behind'],
            withDropMessages: ['The Droner seems to have dropped something'],
        }

        await new Dropper([
            {
                item: dronerAcid,
                dropRate: 0,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new fieldMould({
            name: 'Field Mould',
            description:`A fungus that usually grows upon dead crops and has poisonous spores. They are hostile to any living creature that approaches them, they are immobile and their spores are not fatal. Any living thing killed by their spores become a host for new molds`,
            spawnRate: 0.1,
            health: 45,
            level:1,
            mana:0,
            fileName:'fieldmold.jpeg',
            xp: 7,
            evasion: 0,
            attackDamage: 0,
            magicPower: 8,
            run_chance: 0.02,
            armor: 10,
            speed: 2,
            element:"venom",
            magicResistance: 10,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Toxic Spores',
                    description: 'the mould releases toxic spores in the air',
                    canEvade: true,
                    damage:15,
                    type: 'magical',
                    element:"venom",
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        let mod
                        defender.element = defender.element.toLowerCase()
            if(defender.element == "flame"){
                mod  = 1
            }
            else if(defender.element == "light"){
                mod  = 0.5
            }
            else if(defender.element == "volt"){
                mod  = 1
            }
            else if(defender.element == "wave"){
                mod  = 1
            }
            else if(defender.element == "frost"){
                mod  = 1
            }
            else if(defender.element == "gale"){
                mod  = 1
            }
            else if(defender.element == "bloom"){
                mod  = 2
            }
            else if(defender.element == "terra"){
                mod  = 2
            }
            else if(defender.element == "alloy"){
                mod  = 2
            }
            else if(defender.element == "venom"){
                mod  = 0.5
            }
            else if(defender.element == "draco"){
                mod  = 0.5
            }
            else if(defender.element == "ruin"){
                mod  = 1
            }
            let stab = calculateSTAB("venom",attacker.element)
                        attacker.addLogMessage(`${attacker.name} used Toxic Spores`)
                        defender.takeDamage
                            .magical(attacker.magicPower*15*stab*mod)
                            .run(damage => `${defender.name} lost ${damage} HP by beathing in some of the toxic spores.`)
                    }
                },
            ],
        })
    }
}
