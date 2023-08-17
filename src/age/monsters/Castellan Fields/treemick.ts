import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { treemickBranch } from '../../items/treemickBranch'
import { calculateModifier } from '../../../../commands/fight'

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
            spawnRate: 0.8,
            health: 60,
            mana:0,
            xp: 7,
            evasion: 0.05,
            attackDamage: 12,
            magicPower: 0,
            fileName:'treemick.jpeg',
            run_chance: 0.02,
            armor: 8,
            speed: 14,
            element:"bloom",
            magicResistance: 8,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Wood Spike',
                    description: 'attacks with a spike of wood',
                    canEvade: true,
                    damage:20,
                    type: 'physical',
                    element:"bloom", 
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("bloom",defender.element.toLowerCase())
                        attacker.addLogMessage(`${attacker.name} used Wood Spike`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*20*mod)
                            .run(damage => `${defender.name} lost ${damage} HP by Wood Spikes`)
                    }
                },
            ],
        })
    }
}
