import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
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
                dropRate: 0.9,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Treemick({
            name: 'Treemick',
            description:`Small stump like monsters who attack with wood splinters protruding from their bodies`,
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
                    name: 'Wood Spike',
                    description: 'attacks with a spike of wood',
                    canEvade: true,
                    damage:0,
                    type: 'physical',
                    element:"normal", 
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`${attacker.name} used Wood Spike`)
                        defender.takeDamage
                            .physical(attacker.attackDamage)
                            .run(damage => `${defender.name} lost ${damage} HP by Wood Spike`)
                    }
                },
            ],
        })
    }
}
