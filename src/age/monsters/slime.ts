import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../classes'
import { Dropper } from '../dropper'
import { slimeGoo } from '../items'

export class Slime extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The slime just exploded, take it easy next time'],
            withDropMessages: ['The slime seems to have dropped something'],
        }

        await new Dropper([
            {
                item: slimeGoo,
                dropRate: 0.9,
            },
        ]).sendDeathMessage(messages, interaction, this)
    }

    static create() {
        return new Slime({
            name: 'Slime',
            spawnRate: 0.5,
            health: 20,
            evasion: 0.01,
            attackDamage: 3,
            magicPower: 0,
            armor: 0,
            magicResistance: 0,
            skills: [
                {
                    cooldown: 0,
                    name: 'Dissolve',
                    description: 'Basic attack',
                    canEvade: true,
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
