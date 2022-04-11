import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../classes'
import { Dropper } from '../dropper'
import { teddyBear } from '../items'

export class Goblin extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The goblin was badly wounded, but he managed to escape'],
            withDropMessages: ['You can hear his last grunts before his death'],
        }

        await new Dropper([
            {
                item: teddyBear,
                dropRate: 0.9,
            },
        ]).sendDeathMessage(messages, interaction, this)
    }

    static create() {
        return new Goblin({
            name: 'Goblin',
            spawnRate: 0.4,
            health: 30,
            evasion: 0.05,
            attackDamage: 5,
            magicPower: 0,
            armor: 2,
            magicResistance: 1,
            skills: [
                {
                    cooldown: 0,
                    name: 'Knife stab ',
                    description: 'Basic attack',
                    canEvade: true,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`**${attacker.name}** used Knife stab`)
                        defender.takeDamage
                            .physical(attacker.attackDamage)
                            .run(damage => `**${defender.name}** lost ${damage} HP by Knife stab`)
                    }
                },
            ],
        })
    }
}
