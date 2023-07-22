import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { treemickBranch } from '../../items/treemickBranch'

export class Treemick extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Treemick ran away as you were about to finish it',`The Treemick withered away to splinters of wood before you could finish it`],
            withDropMessages: [`You finish off The Treemick and cut off one of it's branches`],
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
            health: 50,
            mana:0,
            xp: 7,
            evasion: 0.05,
            attackDamage: 15,
            magicPower: 0,
            fileName:'treemick.jpeg',
            run_chance: 0.02,
            armor: 5,
            speed: 12,
            element:"bloom",
            magicResistance: 3,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Wood Spike',
                    description: 'attacks with a spike of wood',
                    canEvade: true,
                    damage:20,
                    type: 'physical',
                    element:"normal", 
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`${attacker.name} used Wood Spike`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*20)
                            .run(damage => `${defender.name} lost ${damage} HP by Wood Spike`)
                    }
                },
            ],
        })
    }
}
