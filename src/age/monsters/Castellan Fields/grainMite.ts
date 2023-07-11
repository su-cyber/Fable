import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { grainmiteTooth } from '../../items/grainmiteTeeth'

export class grainMite extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Grain Mite ran away as you were about to finish it'],
            withDropMessages: ['The Grain Mite seems to have dropped something'],
        }

        await new Dropper([
            {
                item: grainmiteTooth,
                dropRate: 0.8,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new grainMite({
            name: 'Grain Mite',
            description:`Common rodents in crop fields known for destroying crops and lay waste on godowns in swarms. They have sharp claws and teeths strong enough to crack the hardest grains and nuts.`,
            spawnRate: 0.3,
            fileName:'grainmite.jpeg',
            health: 30,
            mana:0,
            xp: generateXP(5,15),
            evasion: 0.03,
            attackDamage: 15,
            magicPower: 0,
            run_chance: 0.02,
            armor: 1,
            speed: 8,
            element:"wild",
            magicResistance: 2,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Cracker Bite',
                    description: 'A powerful bite attack',
                    canEvade: true,
                    damage:1,
                    type: 'physical',
                    element:"normal", 
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`${attacker.name} used Cracker Bite`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*1)
                            .run(damage => `${defender.name} lost ${damage} HP by a deadly bite`)
                    }
                },
            ],
        })
    }
}
