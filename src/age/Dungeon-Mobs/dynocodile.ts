import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../classes'
import { Dropper } from '../dropper'
import generateXP from '../../utils/generateXP'
import { goldenTelescope } from '../items/goldenTelescope'
import { calculateSTAB } from '../../../commands/fight'
import lvl_modifier from '../../utils/lvl_modifier'
import { emoji } from '../../lib/utils/emoji'
import { calculateModifier } from '../../../commands/fight'
import { primalHide } from '../items/primalHide'


export class Dinocodile extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Dynocodile slipped away into the murky waters, leaving you with an empty-handed defeat.'],
            withDropMessages: [`Despite the Dynocodile's powerful onslaught, you managed to retrieve a tooth from its powerful jaws.`],
        }

        await new Dropper([
            {
                item:primalHide ,
                dropRate: 0.1,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Dinocodile({
            name: `Dinocodile ${emoji.WAVE}`,
            description:`The Dinocodile is a colossal crocodile of colossal proportions that lurks beneath the dark waters. Its body is covered in ancient, hardened scales that offer protection against its aquatic environment and potential adversaries.`,
            spawnRate: 0.5,
            health: 551,
            level:13,
            mana:8,
            xp: generateXP(88, 95),
            evasion: 0.04,
            attackDamage: 80,
            fileName:'dynocodile.jpeg',
            magicPower: 5,
            run_chance: 0.02,
            armor: 75,
            speed: 20,
            element:"wave",
            magicResistance: 60,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Abyss Jaw',
                    description: `A powerful wave imbued bite`,
                    canEvade: true,
                    type: 'physical',
                    element:"wave", 
                    damage:35,
                    mana_cost: 2,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("wave",defender.element)
                        let stab = calculateSTAB("wave",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Abyss Jaw`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*35*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${defender.name}** lost ${damage} HP by being bitten by the collosal jaws of the Dynocodile`)
                    }
                },{
                    cooldown: 0,
                    name: 'Torrential Maw',
                    description: `maws down it's enemies with a torrent of wave from it's collosal tail`,
                    canEvade: true,
                    type: 'physical',
                    element:"wave", 
                    damage:50,
                    mana_cost: 4,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("wave",defender.element)
            let stab = calculateSTAB("wave",attacker.element)
            attacker.addLogMessage(`**${attacker.name}** used Torrential Maw`)
            defender.takeDamage
                .physical((attacker.attackDamage*50)*mod*stab*lvl_modifier(attacker.level))
                .run(damage => `**${defender.name}** lost ${damage} HP by being crushed by the collosal torrent imbued tail of Dynocodile`)
                    }
                },
               
            ],
        })
    }
}
