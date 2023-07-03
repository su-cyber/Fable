import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { starHound_tooth } from '../../items/starHound_tooth'

export class starHound extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Starhound ran away as you were about to finish it'],
            withDropMessages: ['The Starhound dropped something'],
        }

        await new Dropper([
            {
                item: starHound_tooth,
                dropRate: 0.05,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new starHound({
            name: 'Starhound',
            description:`A sleek, wolf-like creature with shimmering silver fur and bright, glowing eyes. The Starhound is fast and agile, able to run at incredible speeds through the forest. Its skill is to emit a bright, blinding light that can disorient its prey. Its drop is a Starhound tooth, which is highly valued for its ability to enhance magical spells.`,
            spawnRate: 0.5,
            health: 50,
            mana:0,
            xp: generateXP(5,15),
            evasion: 0.05,
            attackDamage: 5,
            magicPower: 0,
            run_chance: 0.02,
            armor: 2,
            speed: 5,
            element:"light",
            magicResistance: 2,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Blinding Light',
                    description: `Blinds and damages the enemy with an intense light`,
                    canEvade: true,
                    type: 'magical',
                    element:"normal", 
                    damage:15,
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`${attacker.name} used Blinding Light`)
                        defender.takeDamage
                            .magical(attacker.attackDamage*15)
                            .run(damage => `${defender.name} lost ${damage} HP by Blinding Light`)
                    }
                },
               
            ],
        })
    }
}
