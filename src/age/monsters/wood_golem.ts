import { CommandInteraction } from 'discord.js'
import { Dropper } from '../dropper'
import { woodGolem_core } from '../items'
import { percentOf } from '../../utils'
import { bleeding } from '../effects/bleeding'
import { emoji } from '../../lib/utils/emoji'
import { paralyzed } from '../effects/paralyze'
import sample from 'lodash.sample'
import { MonsterEntity, ClassEntity, Entity } from '../classes'
import generateXP from '../../utils/generateXP'

export class WoodGolem extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The goblin was badly wounded, but he managed to escape'],
            withDropMessages: ['You can hear his last grunts before his death'],
        }

        new Dropper([
            {
                item: woodGolem_core,
                dropRate: 0.9,
            }
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    beforeDuelStart(you: Entity, opponent: Entity) {
        
        const evergrowth = you.scheduler.task
                            .id('woodgolem_evergrowth')
                            .turns(1000)
                            .end(()=> {} )
                            .run(() => {
                               you.health=you.health+20
                               you.addLogMessage('Wood Golem has recovered 20 HP!') 
                            })
        const guardian_duty = you.scheduler.task
                            .id('woodgolem_guardianduty')
                            .turnOf(you)
                            .turns(1000)
                            .end(()=> {} )
                            .run(() => {
                                if(you.health<=0.1*this.maxHealth){
                            you.attackDamage=you.attackDamage+0.5*you.attackDamage
                             you.addLogMessage( "Wood Golem has activated unique skill: **Guardian's Duty**",
                               "Wood Golem's attack power has increased by 50%!") 
                                }
                                
                               
                            })
        you.applyEffect(evergrowth)
        you.applyEffect(guardian_duty)
        you.addLogMessage(
            "Wood Golem has activated unique skill: **Evergrowth**",
            'Wood Golem will regenerate 20HP every turn'
        )
    }

    chooseSkill(defender: Entity) {
        const isParalyzed = defender.hasEffect(paralyzed)

        if (isParalyzed) {
            return sample(this.skills.filter(skill => skill.name !== 'Deep Tangle'))
        }

        return sample(this.skills)
    }

    static create() {
        return new WoodGolem({
            name: 'Wood Golem',
            spawnRate: 0.1,
            evasion: 0.05,
            health: 500,
            attackDamage: 80,
            mana:350,
            xp: generateXP(2500,3000),
            magicPower: 40,
            armor: 80,
            magicResistance: 65,
            skills: [
                {
                    name: 'Titanic Smash',
                    cooldown: 0,
                    description: 'Basic attack',
                    canEvade: true,
                    type: 'physical',
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`**${attacker.name}** used Titanic Smash`)
                        defender.takeDamage
                            .physical(120)
                            .run(damage => `**${defender.name}** lost ${damage} HP by Titanic Smash`)
                    },
                },
                {
                    cooldown: 0,
                    name: 'Deep Tangle',
                    description: 'Increases attack damage for a short time',
                    canEvade: true,
                    type: 'magical',
                    mana_cost: 30,
                    use: (attacker, defender) => {
                        const _paralyzed = attacker.scheduler.task
                            .id('woodGolem__deep-tangle')
                            .turnOf(defender)
                            .skipTurn.effect(paralyzed)
                            .turns(3)
                            .end(() => defender.removeEffect(paralyzed))
                            .run(() => {})

                        defender.applyEffect(_paralyzed)
                        defender.addLogMessage(
                            `**${attacker.name}** used Deep Tangle`,
                            `**${defender.name}** has been paralyzed for 3 turns`
                        )
                    },
                },
                {
                    cooldown: 0,
                    name: 'Overbloom',
                    description: 'Increases attack damage for a short time',
                    canEvade: true,
                    type: 'magical',
                    mana_cost: 50,
                    use: (attacker, defender) => {
                        defender.evasion=defender.evasion-0.3*defender.evasion
                       

                        defender.takeDamage
                            .magical(60)
                            .run(
                                damage =>
                                    `**${attacker.name}** used Overbloom and ${defender.name} lost ${damage} HP`
                                
                            )
                            defender.addLogMessage(`**${defender.name}** lost 30% speed`)
                    },
                },
                {
                    cooldown: 0,
                    name: "Hell's Avarice",
                    description: 'Increases attack damage for a short time',
                    canEvade: true,
                    type: 'magical',
                    mana_cost: 80,
                    use: (attacker, defender) => {
                        defender.takeDamage.magical(200).run(damage => {
                            const avarice = attacker.scheduler.task
                                .id('woodGolem_hellavarice')
                                .all.effect(bleeding)
                                .turns(3)
                                .end(() => defender.removeEffect(bleeding))
                                .run(() =>
                                    defender.takeDamage
                                        .physical(25)
                                        .run(
                                            damage =>
                                                `**${defender.name}** lost ${damage} HP due to ${emoji.BLEED}`
                                        )
                                )

                            defender.applyEffect(avarice)

                            return `**${attacker.name}** used Hell's Avarice and ${defender.name} lost ${damage} HP`
                                        })
                    },
                },
                {
                    cooldown: 0,
                    name: 'Rock Hard',
                    description: 'Increases attack damage for a short time',
                    canEvade: false,
                    type: 'self',
                    mana_cost: 0,
                    use: (attacker, defender) => {
                        const gainedArmor = percentOf(0.5, attacker.armor)
                        attacker.armor += gainedArmor

                        attacker.addLogMessage(
                            `**${attacker.name}** used Rock Hard`,
                            `${attacker.name}'s armor increased by 50%`
                        ) 
                }
            }
            ],
        })
    }
}
