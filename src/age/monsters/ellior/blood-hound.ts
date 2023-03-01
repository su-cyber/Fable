import { CommandInteraction } from 'discord.js'
import sample from 'lodash.sample'
import { Dropper } from '../../dropper'
import { bloodhoundTooth } from '../../items'
import { strength } from '../../effects/strength'
import { percentOf } from '../../../utils/percentOf'
import { MonsterEntity, ClassEntity, Entity } from '../../classes'
import generateXP from '../../../utils/generateXP'

export class BloodHound extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The goblin was badly wounded, but he managed to escape'],
            withDropMessages: ['You can hear his last grunts before his death'],
        }

        new Dropper([
            {
                item: bloodhoundTooth,
                dropRate: 0.9,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    chooseSkill(defender: Entity) {
        const hasBloodlust = this.hasEffect(strength)

        if (hasBloodlust) {
            return sample(this.skills.filter(skill => skill.name !== 'Bloodlust'))
        }

        return sample(this.skills)
    }

    static create() {
        return new BloodHound({
            name: 'Blood Hound',
            spawnRate: 0.4,
            evasion: 0.02,
            health: 50,
            xp: generateXP(5,20),
            attackDamage: 12,
            mana:10,
            magicPower: 0,
            speed: 5,
            run_chance: 0.07,
            armor: 3,
            magicResistance: 5,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Bite',
                    description: 'Basic attack',
                    canEvade: true,
                    type: 'physical',
                    mana_cost: 0,
                    damage:0,
                    use: (attacker, defender) =>
                        defender.takeDamage
                            .physical(attacker.attackDamage)
                            .run(
                                damage => `**${attacker.name}** used **Bite** and dealt **${damage}** damage`
                            ),
                },
                {
                    cooldown: 0,
                    name: 'Bloodlust',
                    description: 'Increases attack damage for a short time',
                    canEvade: false,
                    type: 'self',
                    damage:0,
                    mana_cost: 0,
                    use: (attacker, defender) => {
                        const bloodlust = attacker.scheduler.task
                            .id('bloodhound__bloodlust')
                            .turnOf(attacker)
                            .effect(strength)
                            .turns(3)
                            .end(() => attacker.removeEffect(strength))
                            .run(() => {})

                        attacker.applyEffect(bloodlust)
                        attacker.attackDamage += percentOf(0.2, attacker.attackDamage)

                        defender.takeDamage
                            .physical(attacker.attackDamage)
                            .run(damage => `**${attacker.name}** used Bloodlust`)
                        attacker.addLogMessage(`**${attacker.name}'s** damage has increased`)
                    },
                },
            ],
        })
    }
}
