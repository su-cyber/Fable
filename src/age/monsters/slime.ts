import { CommandInteraction } from 'discord.js'
import { Dropper } from '../dropper'
import { ClassEntity, MonsterEntity } from '../classes'
import { AttackType } from '../enums'
import { slimeGoo } from '../items'

export class Slime extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const hasntDropMessages = ['The slime just exploded, take it easy next time']
        const hasDropMessages = ['The slime seems to have dropped something']

        await new Dropper([
            {
                item: slimeGoo,
                dropRate: 0.9,
            },
        ]).sendDeathMessage(hasDropMessages, hasntDropMessages, interaction, this)
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
                    name: 'Attack',
                    description: 'Basic attack',
                    use: (attacker, defender) =>
                        defender
                            .takeDamage({ damage: attacker.attackDamage, type: AttackType.PHYSICAL })
                            .send(`**${attacker.name}** used Basic attack`),
                },
            ],
        })
    }
}
