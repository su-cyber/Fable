import { CommandInteraction, Interaction } from 'discord.js'
import { Dropper } from '../../dropper'
import { basiliskScale, basiliskVenom } from '../../items'
import { percentOf } from '../../../utils'
import { poisoning } from '../../effects/poisoning'
import { emoji } from '../../../lib/utils/emoji'
import { paralyzed } from '../../effects/paralyze'
import sample from 'lodash.sample'
import { MonsterEntity, ClassEntity, Entity } from '../../classes'
import generateXP from '../../../utils/generateXP'
import { DuelBuilder } from '../../DuelBuilder'

export class Basilisk extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The goblin was badly wounded, but he managed to escape'],
            withDropMessages: ['You can hear his last grunts before his death'],
        }

        new Dropper([
            {
                item: basiliskScale,
                dropRate: 0.5,
            },
            {
                item: basiliskVenom,
                dropRate: 0.4,
            }
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    beforeDuelStart(you: Entity, opponent: Entity, interaction: CommandInteraction) {
        opponent.evasion /= 2

        you.addLogMessage(
            "Basilisk has activated unique skill: **Basilisk's domain**",
            'evasion has been halved and you cannot run anymore'
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
            xp: generateXP(1000,1500),
            attackDamage: 30,
            mana:100,
            magicPower: 20,
            armor: 20,
            speed: 5,
            run_chance: Infinity,
            magicResistance: 25,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Poison breath',
                    description: 'Basic attack',
                    canEvade: true,
                    type: 'physical',
                    mana_cost: 0,
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
                    canEvade: true,
                    type: 'magical',
                    mana_cost: 20,
                    use: (attacker, defender) => {
                        const _paralyzed = attacker.scheduler.task
                            .id('basilisk__serpent-gaze')
                            .turnOf(defender)
                            .skipTurn.effect(paralyzed)
                            .turns(2)
                            .end(() => defender.removeEffect(paralyzed))
                            .run(() => {})

                        defender.applyEffect(_paralyzed)
                        defender.addLogMessage(
                            `**${attacker.name}** used Serpent Gaze`,
                            `**${defender.name}** has been paralyzed for 2 turns`
                        )
                    },
                },
                {
                    cooldown: 0,
                    name: 'Suffocate',
                    description: 'Increases attack damage for a short time',
                    canEvade: true,
                    type: 'physical',
                    mana_cost: 0,
                    use: (attacker, defender) => {
                        const lostedArmor = percentOf(0.15, defender.armor)

                        defender.removeArmor(lostedArmor)
                        defender.addLogMessage(`**${defender.name}** lost ${lostedArmor.toFixed(1)} armor`)

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
                    canEvade: true,
                    type: 'physical',
                    mana_cost: 0,
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
