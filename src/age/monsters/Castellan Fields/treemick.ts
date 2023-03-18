import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import { slimeBlob} from '../../items'
import generateXP from '../../../utils/generateXP'
import { treemickBranch } from '../../items/treemickBranch'

export class Treemick extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Treemick ran away as you were about to finish it'],
            withDropMessages: ['The Treemick dropped something'],
        }

        await new Dropper([
            {
                item: treemickBranch,
                dropRate: 0.8,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Treemick({
            name: 'Treemick',
            spawnRate: 0.5,
            health: 30,
            mana:10,
            xp: generateXP(5,15),
            evasion: 0.05,
            attackDamage: 3,
            magicPower: 0,
            run_chance: 0.02,
            armor: 0,
            speed: 5,
            magicResistance: 0,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Wood Spike',
                    description: 'attacks with a spike of wood',
                    canEvade: true,
                    damage:0,
                    type: 'physical',
                    mana_cost: 5,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`**${attacker.name}** used Wood Spike`)
                        defender.takeDamage
                            .physical(attacker.attackDamage)
                            .run(damage => `**${defender.name}** lost ${damage} HP by Wood Spike`)
                    }
                },
            ],
        })
    }
}
