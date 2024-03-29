import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { dronerAcid } from '../../items/dronerAcid'
import { buzzHoney } from '../../items/buzz_honey'
import { calculateSTAB } from '../../../../commands/fight'
import lvl_modifier from '../../../utils/lvl_modifier'
import { emoji } from '../../../lib/utils/emoji'

export class Droner extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Droner Flew away before you could finish it'],
            withDropMessages: [`You kill the Droner and decide to extract whatever you can from it's corpse`],
        }

        await new Dropper([
            {
                item: dronerAcid,
                dropRate: 0.25,
            },{
                item: buzzHoney,
                dropRate: 0.05,
            }
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Droner({
            name: `Droner ${emoji.VENOM}`,
            description:`Insects about the size of an average human hand who make a loud droning sound and feed on the nectar of Rayleigh Flowers. Although not hostile, they don't hesitate to attack humans when disturbed and their sting is said to make an average human unconscious for hours.`,
            spawnRate: 0.5,
            health: 60,
            level:2,
            mana:1,
            xp: 9,
            evasion: 0.03,
            attackDamage: 0,
            fileName:'droner.jpeg',
            magicPower: 14,
            run_chance: 0.02,
            armor: 8,
            speed: 14,
            element:"venom",
            magicResistance: 6,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Acid Sting',
                    description: 'A sting attack with droner acid',
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
                        attacker.addLogMessage(`${attacker.name} used Acid Sting`)
                        defender.takeDamage
                            .magical(attacker.magicPower*15*mod*stab*lvl_modifier(attacker.level))
                            .run(damage => `${defender.name} lost ${damage} HP by getting stung by the Droner`)
                    }
                },
            ],
        })
    }
}
