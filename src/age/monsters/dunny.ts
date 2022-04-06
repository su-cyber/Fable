import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity, Attack } from '../classes'
import { Dropper } from '../dropper'
import { teddyBear } from '../items'

export class Dunny extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The goblin was badly wounded, but he managed to escape'],
            withDropMessages: ['You can hear his last grunts before his death'],
        }

        new Dropper([
            {
                item: teddyBear,
                dropRate: 0.9,
            },
        ]).sendDeathMessage(messages, interaction, this)
    }

    onReceivedAttack(attack: Attack, ignoreAttack: () => void) {
        this.addLogMessage('**Ouch!**')
        ignoreAttack()
    }

    static create() {
        return new Dunny({
            name: 'Dunny',
            spawnRate: 0.2,
            evasion: 0,
            health: 100,
            attackDamage: 0,
            magicPower: 0,
            armor: 0,
            magicResistance: 0,
            skills: [
                {
                    cooldown: 0,
                    name: 'Nothing',
                    description: 'Basic attack',
                    use: (attacker, defender) => attacker.addLogMessage('**Nothing happened**'),
                },
            ],
        })
    }
}
