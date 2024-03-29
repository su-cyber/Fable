import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../classes'
import { Dropper } from '../dropper'
import generateXP from '../../utils/generateXP'
import { shadowCat_tuft } from '../items/shadowCat_tuft'
import { calculateSTAB } from '../../../commands/fight'
import lvl_modifier from '../../utils/lvl_modifier'
import { emoji } from '../../lib/utils/emoji'

export class  Fiskille extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['You defeat Fiskille and raise your hands in a trumphant pose\n\n**(press /progressmainquest to continue)**',`Fiskille lies defeated on the ground as you land the finishing blow\n\n**(press /progressmainquest to continue)**`],
            withDropMessages: [`The Shadow Cat lies dead on the ground as you finish it off and take some tuft from it's body`],
        }

        await new Dropper([
            {
                item: shadowCat_tuft,
                dropRate: 0,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Fiskille({
            name: `Fiskille ${emoji.VOLT}`,
            description:`The Opponent in Guild Draft`,
            spawnRate: 0.35,
            health: 120,
            level:4,
            mana:2,
            xp: generateXP(15,18),
            evasion: 0.05,
            attackDamage: 24,
            fileName:'npcdave.jpeg',
            magicPower: 5,
            run_chance: 0.02,
            armor: 18,
            speed: 22,
            element:"volt",
            magicResistance: 20,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Zap Cut',
                    description: `attacks with it's deadly claws`,
                    canEvade: true,
                    type: 'physical',
                    element:"volt",
                    damage:26,
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        let mod = 1
                        if(defender.element == "flame"){
                            mod  = 1
                        }
                        else if(defender.element == "light"){
                            mod  = 0.5
                        }
                        else if(defender.element == "volt"){
                            mod  = 0.5
                        }
                        else if(defender.element == "wave"){
                            mod  = 2
                        }
                        else if(defender.element == "frost"){
                            mod  = 1
                        }
                        else if(defender.element == "gale"){
                            mod  = 2
                        }
                        else if(defender.element == "bloom"){
                            mod  = 0.5
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
                        let stab = calculateSTAB("volt",attacker.element)
                        attacker.addLogMessage(`${attacker.name} used Zap Cut`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*26*mod*stab*lvl_modifier(attacker.level))
                            .run(damage => `${defender.name} lost ${damage} HP by a lightning imbued slash`)
                    }
                },
               
            ],
        })
    }
}
