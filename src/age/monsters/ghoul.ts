import { CommandInteraction } from 'discord.js'
import { Dropper } from '../dropper'
import { ClassEntity, MonsterEntity } from '../classes'
import { AttackType } from '../enums'
import { teddyBear } from '../items'
import { percentOf } from '../../utils/percentOf'

export class Ghoul extends MonsterEntity {
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
        return new Ghoul({
            name: 'Ghoul',
            spawnRate: 0.3,
            health: 50,
            evasion: 0.04,
            attackDamage: 10,
            magicPower: 0,
            armor: 5,
            magicResistance: 3,
            skills: [
                {
                    cooldown: 0,
                    name: 'Claw Attack',
                    description: 'Basic attack',
                    use: (attacker, defender) =>
                        defender
                            .takeDamage({ damage: 12, type: AttackType.PHYSICAL })
                            .send(`**${attacker.name}** used Claw Attack`),
                },
                {
                    cooldown: 0,
                    name: 'Hollow Screech',
                    description: 'Increases attack damage for a short time',
                    use: (attacker, defender) => {
                        const drainedArmor = percentOf(0.05, defender.armor)
                        defender.armor -= drainedArmor
                        attacker.armor += drainedArmor

                        defender
                            .takeDamage({
                                damage: percentOf(0.7, attacker.attackDamage),
                                type: AttackType.PHYSICAL,
                            })

                            .send(`**${attacker.name}** used Hollow Screech`)
                    },
                },
            ],
        })
    }
}
