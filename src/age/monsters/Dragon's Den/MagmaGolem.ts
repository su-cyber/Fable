import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { solidifiedMagma } from '../../items/solidifiedMagma'

export class MagmaGolem extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Magma Golem ran away as you were about to finish it'],
            withDropMessages: ['The Magma Golem dropped something'],
        }

        await new Dropper([
            {
                item: solidifiedMagma,
                dropRate: 0.25,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new MagmaGolem({
            name: 'Magma Golem',
            description:`A towering creature composed of molten rock and magma, the Magma Golem can unleash scorching waves of lava that engulf its adversaries. It can also deliver devastating punches with its fiery fists. Its drop is a Globs of Solidified Magma, which can be used by blacksmiths to create heat-resistant armor.`,
            spawnRate: 0.5,
            health: 50,
            mana:0,
            xp: generateXP(5,15),
            evasion: 0.05,
            attackDamage: 45,
            magicPower: 0,
            run_chance: 0.02,
            armor: 2,
            speed: 5,
            element:"flame",
            magicResistance: 2,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Magma Beam',
                    description: `Spits out a beam of Magma`,
                    canEvade: true,
                    type: 'magical',
                    element:"flame", 
                    damage:65,
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        let mod
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
                        attacker.addLogMessage(`${attacker.name} used Magma Beam`)
                        defender.takeDamage
                            .magical(attacker.magicPower*65*mod)
                            .run(damage => `${defender.name} lost ${damage} HP by burning in hot magma`)
                    }
                },
                {
                    cooldown: 0,
                    name: 'Fiery Fist',
                    description: `Punches with flaming fists`,
                    canEvade: true,
                    type: 'physical',
                    element:"normal", 
                    damage:45,
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`${attacker.name} used Fiery Fist`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*45)
                            .run(damage => `${attacker.name} covers it's arm with scorching flames and punches ${defender.name} causing ${damage} damage`)
                    }
                },
                {
                    cooldown: 0,
                    name: 'Wreaking Ball',
                    description: `attacks with burning rocks`,
                    canEvade: true,
                    type: 'physical',
                    element:"nromal", 
                    damage:25,
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`${attacker.name} used Wreaking Ball`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*25)
                            .run(damage => `${attacker.name} hurls burning rocks at ${defender.name} causing ${damage} damage`)
                    }
                },
               
            ],
        })
    }
}
