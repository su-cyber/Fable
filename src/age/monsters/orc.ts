import { CommandInteraction } from 'discord.js'
import { Dropper } from '../dropper'
import { ClassEntity, MonsterEntity } from '../classes'
import { AttackType } from '../enums'
import { teddyBear } from '../items'

export class Orc extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const withoutDropMessages = ['The goblin was badly wounded, but he managed to escape']
        const withDropMessages = ['You can hear his last grunts before his death']

        new Dropper([
            {
                item: teddyBear,
                dropRate: 0.9,
            },
        ]).sendDeathMessage(withDropMessages, withoutDropMessages, interaction, this)
    }

    static create() {
        return new Orc({
            name: 'Orc',
            spawnRate: 0.4,
            health: 70,
            attackDamage: 12,
            evasion: 0.01,
            magicPower: 0,
            armor: 10,
            magicResistance: 6,
            skills: [
                {
                    cooldown: 0,
                    name: 'Savage charge',
                    description: 'Basic attack',
                    use: (attacker, defender) => {
                        // prettier-ignore
                        attacker.scheduler.task
                            .id('orc__savage-charge')
                            .turns(1)
                            .turnOf(attacker)
                            .skipTurn
                            .run(() => 
                                defender.takeDamage({ damage: 40, type: AttackType.PHYSICAL })
                                    .send(`**${defender.name}** suffered a powerful attack`)
                            )

                        attacker.addLogMessage(`**${attacker.name}** is carrying a powerful attack`)
                    },
                },
                {
                    cooldown: 0,
                    name: 'Brute stomp',
                    description: 'Basic attack',
                    use: (attacker, defender) =>
                        defender
                            .takeDamage({ damage: 20, type: AttackType.PHYSICAL })
                            .send(`**${attacker.name}** used **Brute stomp**`),
                },
            ],
        })
    }
}
