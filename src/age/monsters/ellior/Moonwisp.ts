import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { glowingEssence } from '../../items/glowingEssence'
import { calculateModifier } from '../../../../commands/fight'

export class Moonwisp extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Moonwisp disappeared into mist as you were about to finish it',`The moonwisp faded into a warm burst of light before you could finish it`],
            withDropMessages: [`After finishing off the Moonwisp, you collect some of it's glowing essense`],
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
            spawnRate: 0.35,
            health: 120,
            mana:0,
            xp: generateXP(15,18),
            evasion: 0.05,
            attackDamage: 5,
            fileName:'moonwisp.jpeg',
            magicPower: 30,
            run_chance: 0.02,
            armor: 11,
            speed: 22,
            element:"light",
            magicResistance: 20,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Wisp Illusion',
                    description: `puts the opponent in a state of illusion`,
                    canEvade: true,
                    type: 'magical',
                    element:"light", 
                    damage:22,
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("light",defender.element)
                        attacker.addLogMessage(`${attacker.name} used Wisp Illusion`)
                        defender.takeDamage
                            .magical(attacker.magicPower*22*mod)
                            .run(damage => `${defender.name} lost ${damage} HP by mental trauma caused by illusion`)
                    }
                },
               
            ],
        })
    }
}
