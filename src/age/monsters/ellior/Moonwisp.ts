import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { glowingEssence } from '../../items/glowingEssence'

export class Moonwisp extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Moonwisp ran away as you were about to finish it'],
            withDropMessages: ['The Moonwisp dropped something'],
        }

        await new Dropper([
            {
                item: glowingEssence,
                dropRate: 0.25,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Moonwisp({
            name: 'Moonwisp',
            description:`A small, glowing creature that floats through the forest on a trail of mist. The Moonwisp can be mischievous and lead travelers astray. Its skill is to create illusions that can confuse and disorient its prey. Its drop is a vial of its glowing essence, which can be used in healing potions.`,
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
                    name: 'Wisp Illusion',
                    description: `puts the opponent in a state of illusion`,
                    canEvade: true,
                    type: 'magical',
                    damage:15,
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`**${attacker.name}** used Wisp Illusion`)
                        defender.takeDamage
                            .magical(attacker.attackDamage+15)
                            .run(damage => `**${defender.name}** lost ${damage} HP by Wisp Illusion`)
                    }
                },
               
            ],
        })
    }
}
