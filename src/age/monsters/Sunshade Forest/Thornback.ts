import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import { slimeBlob} from '../../items'
import generateXP from '../../../utils/generateXP'
import { treemickBranch } from '../../items/treemickBranch'
import { thornbackShell } from '../../items/thornback_shell'

export class Thornback extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Treemick ran away as you were about to finish it'],
            withDropMessages: ['The Treemick dropped something'],
        }

        await new Dropper([
            {
                item: thornbackShell,
                dropRate: 0.15,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Thornback({
            name: 'Thornback',
            spawnRate: 0.5,
            health: 30,
            mana:0,
            xp: generateXP(5,15),
            evasion: 0.05,
            attackDamage: 3,
            magicPower: 0,
            run_chance: 0.02,
            armor: 1,
            speed: 5,
            element:"bloom",
            magicResistance: 1,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Spiked Charge',
                    description: `charges with the spikes on it's back`,
                    canEvade: true,
                    damage:0,
                    type: 'physical',
                    mana_cost: 15,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`**${attacker.name}** used Spiked Charge`)
                        defender.takeDamage
                            .physical(attacker.attackDamage + 15)
                            .run(damage => `**${defender.name}** lost ${damage} HP by Spiked Charge`)
                    }
                },
            ],
        })
    }
}
