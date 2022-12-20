import { CommandInteraction } from 'discord.js'
import { Dropper } from '../dropper'
import { chimeraFeather, chimeraHorn } from '../items'
import { poisoning } from '../effects/poisoning'
import { emoji } from '../../lib/utils/emoji'
import { burning } from '../effects/burning'
import { MonsterEntity, ClassEntity, Entity } from '../classes'
import { anti_physical } from '../effects/anti-physical'
import generateXP from '../../utils/generateXP'


export class Chimera extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The goblin was badly wounded, but he managed to escape'],
            withDropMessages: ['You can hear his last grunts before his death'],
        }

        new Dropper([
            {
                item: chimeraFeather,
                dropRate: 0.5,
            },
            {
                item: chimeraHorn,
                dropRate: 0.4,
            }
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    beforeDuelStart(you: Entity, opponent: Entity) {
        you.evasion = you.evasion+0.5*you.evasion
        you.addLogMessage(
            "Chimera has activated unique skill: **Triple Vision**",
            "Chimera's vision and evasiveness has increased!"
            
        )
    }

    static create() {
        return new Chimera({
            name: 'Chimera',
            spawnRate: 0.2,
            evasion: 0.3,
            health: 80,
            attackDamage: 30,
            mana:100,
            xp: generateXP(1000,1500),
            magicPower: 20,
            armor: 20,
            speed: 5,
            run_chance: 0.5,
            magicResistance: 30,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Fire breath',
                    description: 'Basic attack',
                    canEvade: true,
                    type: 'magical',
                    mana_cost: 30,
                    use: (attacker, defender) => {
                        const fireBreath = attacker.scheduler.task
                            .id('chimera__fire-breath')
                            .all.effect(burning)
                            .turns(3)
                            .end(() => defender.removeEffect(burning))
                            .run(() =>
                                defender.takeDamage
                                    .physical(10)
                                    .run(
                                        damage =>
                                            `**${defender.name}** lost ${damage} HP due to ${emoji.FIRE}`
                                    )
                            )

                        defender.applyEffect(fireBreath)
                        attacker.addLogMessage(`**${attacker.name}** used Fire breath`)
                        defender.takeDamage
                            .magical(50)
                            .run(damage => `**${defender.name}** lost ${damage} HP by Fire breath`)
                    },
                },
                {
                    cooldown: 0,
                    name: 'Venom splash',
                    description: 'Increases attack damage for a short time',
                    canEvade: true,
                    type: 'physical',
                    mana_cost: 0,
                    use: (attacker, defender) => {
                        const venomSplash = attacker.scheduler.task
                            .id('chimera__venom-splash')
                            .all.effect(poisoning)
                            .turns(3)
                            .end(() => defender.removeEffect(poisoning))
                            .run(() =>
                                defender.takeDamage
                                    .physical(10)
                                    .run(
                                        damage =>
                                            `**${defender.name}** lost ${damage} HP due to ${emoji.POISON}`
                                    )
                            )

                        defender.applyEffect(venomSplash)
                        attacker.addLogMessage(`**${attacker.name}** used Venom splash`)
                        defender.takeDamage
                            .physical(50)
                            .run(damage => `**${defender.name}** lost ${damage} HP by Venom splash`)
                        attacker.addLogMessage(`**${defender.name}** has been poisoned!`)
                    },
                },
                {
                    cooldown: 0,
                    name: 'Aerial Combat',
                    type: 'anti-physical',
                    description: 'attacker is unable to use physical attacks for 2 turns',
                    canEvade: false,
                    mana_cost: 0,
                    use: (attacker, defender) => {
                        
                        const aerialCombat = attacker.scheduler.task
                            .id('chimera__aerial-combat')
                            .turnOf(defender)
                            .all.effect(anti_physical)
                            .turns(4)
                            .end(()=>defender.removeEffect(anti_physical) )
                            .run(() => {
                                
                            })

                        defender.applyEffect(aerialCombat)
                        defender.addLogMessage(`**${attacker.name}** used Aerial Combat`)
                        defender.addLogMessage(`**${attacker.name}** is now flying! physical attacks will have no effect.`)
                    },
                },
                {
                    cooldown: 0,
                    name: 'Mad Ram',
                    description: 'Increases attack damage for a short time',
                    canEvade: true,
                    type: 'physical',
                    mana_cost: 0,
                    use: (attacker, defender) => {
                        const madRam = attacker.scheduler.task
                            .id('chimera__mad-ram')
                            .all.turns(3)
                            .end(() =>
                                defender.takeDamage
                                    .physical(100)
                                    .run(damage => `**${defender.name}** lost ${damage} HP due to Mad Ram`)
                            )
                            .run(() => {})

                        defender.applyEffect(madRam)

                        attacker.addLogMessage(`**${attacker.name}** used Mad Ram`)
                    },
                },
            ],
        })
    }
}
