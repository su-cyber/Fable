import { CommandInteraction } from 'discord.js'
import { Dropper } from '../dropper'
import { ClassEntity, Entity, MonsterEntity, Skill } from '../classes'
import { AttackType } from '../enums'
import { teddyBear } from '../items'
import { percentOf } from '../../utils'
import { poisoning } from '../effects/poisoning'
import { emoji } from '../../lib/utils/emoji'
import { paralyzed } from '../effects/paralyze'
import sample from 'lodash.sample'

export class Basilisk extends MonsterEntity {
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
                        defender.applyEffect(poisoning)

                        // prettier-ignore
                        attacker.scheduler.task
                            .id('basilisk__poison')
                            .all
                            .isEffect
                            .turns(4)
                            .end(() => defender.removeEffect(poisoning))
                            .run(() => 
                                defender
                                    .takeDamage({ damage: 10, type: AttackType.PHYSICAL, canEvade: false })
                                    .send(damage => `**${defender.name}** lost ${damage} HP due to ${emoji.POISON}`))

                        attacker.addLogMessage(`**${attacker.name}** used Poison breath`)
                    },
                },
                {
                    cooldown: 0,
                    name: 'Serpent Gaze',
                    description: 'Increases attack damage for a short time',
                    use: (attacker, defender) => {
                        defender.applyEffect(paralyzed)

                        // prettier-ignore
                        attacker.scheduler.task
                            .id('basilisk__serpent-gaze')
                            .turnOf(defender)
                            .skipTurn
                            .isEffect
                            .turns(2)
                            .end(() => defender.removeEffect(paralyzed))
                            .run(() => {})

                        defender.addLogMessage(`**${attacker.name}** used Serpent Gaze`)
                    },
                },
                {
                    cooldown: 0,
                    name: 'Suffocate',
                    description: 'Increases attack damage for a short time',
                    use: (attacker, defender) => {
                        defender
                            .takeDamage({ damage: 60, type: AttackType.PHYSICAL })
                            .send(`**${attacker.name}** used Suffocate`)
                        defender.armor -= percentOf(0.15, defender.armor)
                    },
                },
                {
                    cooldown: 0,
                    name: 'Venom bite',
                    description: 'Increases attack damage for a short time',
                    use: (attacker, defender) => {
                        defender.applyEffect(poisoning)

                        // prettier-ignore
                        attacker.scheduler.task
                            .id('basilisk__poison')
                            .all
                            .isEffect
                            .turns(3)
                            .end(() => defender.removeEffect(poisoning))
                            .run(() => 
                                defender
                                    .takeDamage({ damage: 15, type: AttackType.PHYSICAL, canEvade: false })
                                    .send(damage => `**${defender.name}** lost ${damage} HP due to ${emoji.POISON}`)
                            )

                        defender
                            .takeDamage({ damage: 30, type: AttackType.PHYSICAL })
                            .send(`**${attacker.name}** used Venom bite`)
                    },
                },
            ],
        })
    }
}
