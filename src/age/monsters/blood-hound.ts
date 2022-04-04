import { CommandInteraction } from 'discord.js'
import sample from 'lodash.sample'
import { Dropper } from '../dropper'
import { ClassEntity, Entity, MonsterEntity } from '../classes'
import { AttackType } from '../enums'
import { teddyBear } from '../items'
import { strength } from '../effects/strength'
import { percentOf } from '../../utils/percentOf'

export class BloodHound extends MonsterEntity {
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
            attackDamage: 12,
            magicPower: 0,
            armor: 3,
            magicResistance: 5,
            skills: [
                {
                    cooldown: 0,
                    name: 'Bite',
                    description: 'Basic attack',
                    use: (attacker, defender) =>
                        defender
                            .takeDamage({ damage: attacker.attackDamage, type: AttackType.PHYSICAL })
                            .send(`**${attacker.name}** used Bite`),
                },
                {
                    cooldown: 0,
                    name: 'Bloodlust',
                    description: 'Increases attack damage for a short time',
                    use: (attacker, defender) => {
                        attacker.applyEffect(strength)
                        attacker.attackDamage += percentOf(0.2, attacker.attackDamage)

                        attacker.scheduler.task
                            .id('bloodhound__bloodlust')
                            .turnOf(attacker)
                            .turns(3)
                            .end(() => attacker.removeEffect(strength))
                            .run(() => {})

                        defender
                            .takeDamage({ damage: attacker.attackDamage, type: AttackType.PHYSICAL })
                            .send(`**${attacker.name}** used Bloodlust`)
                    },
                },
            ],
        })
    }
}
