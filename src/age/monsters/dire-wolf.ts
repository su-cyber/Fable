import { CommandInteraction, Emoji } from 'discord.js'
import { Dropper } from '../dropper'
import { direwolfClaw, direwolfHide } from '../items'
import { emoji } from '../../lib/utils/emoji'
import { bleeding } from '../effects/bleeding'
import { MonsterEntity, ClassEntity } from '../classes'
import generateXP from '../../utils/generateXP'

export class DireWolf extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The goblin was badly wounded, but he managed to escape'],
            withDropMessages: ['You can hear his last grunts before his death'],
        }

        new Dropper([
            {
                item: direwolfHide,
                dropRate: 0.5,
            },
            {
                item: direwolfClaw,
                dropRate: 0.4,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
        
    }

    static create() {
        return new DireWolf({
            name: 'Dire Wolf',
            spawnRate: 0.4,
            evasion: 0.1,
            health: 40,
            xp: generateXP(30,70),
            attackDamage: 8,
            mana:10,
            magicPower: 0,
            run_chance: 0.3,
            armor: 4,
            magicResistance: 2,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Razor Bite',
                    description: 'Basic attack',
                    canEvade: true,
                    type: 'physical',
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`**${attacker.name}** used Razor Bite`)
                        defender.takeDamage
                            .physical(20)
                            .run(damage => `**${defender.name}** lost ${damage} HP by Razor Bite`)
                    }
                },
                {
                    cooldown: 0,
                    name: 'Wild reflex',
                    description: 'Increases attack damage for a short time',
                    canEvade: false,
                    type: 'self',
                    mana_cost: 0,
                    use: (attacker, defender) => {
                        attacker.evasion += 0.1
                        attacker.addLogMessage(
                            `**${attacker.name}** used Wild reflex`,
                            `**${attacker.name}'s** speed increased by 10%`
                        )
                        
                       
                       
                    },
                },
                {
                    cooldown: 0,
                    name: 'Mutilate',
                    description: 'Increases attack damage for a short time',
                    canEvade: true,
                    type: 'physical',
                    mana_cost: 0,
                    use: (attacker, defender) => {
                        const mutilate = attacker.scheduler.task
                            .id('dire-wolf__mutilate')
                            .all.effect(bleeding)
                            .turns(3)
                            .end(() => defender.removeEffect(bleeding))
                            .run(() =>
                                defender.takeDamage
                                    .physical(5)
                                    .run(damage => `**${defender.name}** lost ${damage} HP by ${emoji.BLEED}`)
                            )

                        defender.applyEffect(mutilate)
                        attacker.addLogMessage(`**${attacker.name}** used Mutilate`)
                        defender.takeDamage
                                    .physical(20)
                                    .run(damage => `**${defender.name}** lost ${damage} HP by Mutilate`)
                        attacker.addLogMessage(`**${defender.name}** started bleeding`)
                        
                        
                                
                        
                            
                    },
                },
            ],
        })
    }
}
