import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../classes'
import { Dropper } from '../dropper'
import { slimeBlob} from '../items'
import generateXP from '../../utils/generateXP'

export class Slime extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The slime just exploded, take it easy next time'],
            withDropMessages: ['The slime seems to have dropped something'],
        }

        await new Dropper([
            {
                item: slimeBlob,
                dropRate: 0.9,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Slime({
            name: 'Slime',
            spawnRate: 0.5,
            health: 20,
            mana:10,
            xp: generateXP(5,15),
            evasion: 0.05,
            attackDamage: 3,
            magicPower: 0,
            run_chance: 0.02,
            armor: 0,
            magicResistance: 0,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Dissolve',
                    description: 'Basic attack',
                    canEvade: true,
                    type: 'physical',
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`**${attacker.name}** used Dissolve`)
                        defender.takeDamage
                            .physical(attacker.attackDamage)
                            .run(damage => `**${defender.name}** lost ${damage} HP by Dissolve`)
                    }
                },
            ],
        })
    }
}
