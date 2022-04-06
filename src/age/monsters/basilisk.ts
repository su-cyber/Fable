import { CommandInteraction } from 'discord.js'
import { Dropper } from '../dropper'
import { teddyBear } from '../items'
import { percentOf } from '../../utils'
import { poisoning } from '../effects/poisoning'
import { emoji } from '../../lib/utils/emoji'
import { paralyzed } from '../effects/paralyze'
import sample from 'lodash.sample'
import { MonsterEntity, ClassEntity, Entity } from '../classes'

export class Basilisk extends MonsterEntity {
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

    beforeDuelStart(you: Entity, opponent: Entity) {
        opponent.evasion /= 2

        you.addLogMessage(
            "Basilisk has activated unique skill: **Basilisk's domain**",
            'Agility halved and you cannot run anymore'
        )
    }

    chooseSkill(defender: Entity) {
        const isParalyzed = defender.hasEffect(paralyzed)

        if (isParalyzed) {
            return sample(this.skills.filter(skill => skill.name !== 'Serpent Gaze'))
        }

        return sample(this.skills)
    }

    static create() {
        return new Basilisk({
            name: 'Basilisk',
            spawnRate: 0.2,
            evasion: 0.05,
            health: 100,
            attackDamage: 30,
            magicPower: 20,
            armor: 20,
            magicResistance: 25,
            skills: [
                {
                    cooldown: 0,
                    name: 'Poison breath',
                    description: 'Basic attack',
                    use: (attacker, defender) => {
                        const poisonBreath = attacker.scheduler.task
                            .id('basilisk__poison')
                            .all.effect(poisoning)
                            .turns(4)
                            .end(() => defender.removeEffect(poisoning))
                            .run(() =>
                                defender.takeDamage
                                    .physical(10)
                                    .run(
                                        damage =>
                                            `**${defender.name}** lost ${damage} HP due to ${emoji.POISON}`
                                    )
                            )

                        defender.applyEffect(poisonBreath)

                        return `**${attacker.name}** used Poison breath`
                    },
                },
                {
                    cooldown: 0,
                    name: 'Serpent Gaze',
                    description: 'Increases attack damage for a short time',
                    use: (attacker, defender) => {
                        const _paralyzed = attacker.scheduler.task
                            .id('basilisk__serpent-gaze')
                            .turnOf(defender)
                            .skipTurn.effect(paralyzed)
                            .turns(2)
                            .end(() => defender.removeEffect(paralyzed))
                            .run(() => {})

                        defender.applyEffect(_paralyzed)
                        defender.addLogMessage(`**${attacker.name}** used Serpent Gaze`)
                    },
                },
                {
                    cooldown: 0,
                    name: 'Suffocate',
                    description: 'Increases attack damage for a short time',
                    use: (attacker, defender) => {
                        const lostedArmor = percentOf(0.15, defender.armor)

                        defender.removeArmor(lostedArmor)
                        defender.addLogMessage(`**${defender.name}** lost ${lostedArmor} armor`)

                        defender.takeDamage
                            .physical(60)
                            .run(
                                damage =>
                                    `**${attacker.name}** used Suffocate and ${defender.name} lost ${damage} HP`
                            )
                    },
                },
                {
                    cooldown: 0,
                    name: 'Venom bite',
                    description: 'Increases attack damage for a short time',
                    use: (attacker, defender) => {
                        defender.takeDamage.physical(30).run(damage => {
                            const venomBite = attacker.scheduler.task
                                .id('basilisk__poison')
                                .all.effect(poisoning)
                                .turns(3)
                                .end(() => defender.removeEffect(poisoning))
                                .run(() =>
                                    defender.takeDamage
                                        .physical(15)
                                        .run(
                                            damage =>
                                                `**${defender.name}** lost ${damage} HP due to ${emoji.POISON}`
                                        )
                                )

                            defender.applyEffect(venomBite)

                            return `**${attacker.name}** used Venom bite and ${defender.name} lost ${damage} HP`
                        })
                    },
                },
            ],
        })
    }
}
