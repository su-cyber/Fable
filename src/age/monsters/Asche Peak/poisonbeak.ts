import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { calculateSTAB } from '../../../../commands/fight'
import lvl_modifier from '../../../utils/lvl_modifier'
import { emoji } from '../../../lib/utils/emoji'
import { calculateModifier } from '../../../../commands/fight'
import { primalHide } from '../../items/primalHide'
import { weightedRandom } from '../../../utils'
import { poisoning } from '../../effects/poisoning'
import { venomousPlume } from '../../items/venomousPlume'


export class Poisonbeak extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Poisonbeak corroded into a toxic mess leaving nothing behind.'],
            withDropMessages: [`You manage to dismember both of it's wings before delivering the final blow and collecting a plume from it's wings`],
        }

        await new Dropper([
            {
                item:venomousPlume ,
                dropRate: 0.1,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Poisonbeak({
            name: `Poisonbeak ${emoji.VENOM}`,
            description:`A poisonbeak is a large extremely hostile and territorial vulture-like Spyrith laced with venomous feathers. Huge clouds of toxic gas follows a trail of a venom beak and it's withering feathers are corrosive in nature. They mark their territories with their toxic feathers.`,
            spawnRate: 0.1,
            health: 551,
            level:13,
            mana:8,
            xp: generateXP(88, 95),
            evasion: 0.04,
            attackDamage: 80,
            fileName:'poisonbeak.jpeg',
            magicPower: 5,
            run_chance: 0.02,
            armor: 70,
            speed: 20,
            element:"venom",
            magicResistance: 65,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Corrosive Fury',
                    description: `A flurry of corrosive beak attacks`,
                    canEvade: true,
                    type: 'physical',
                    element:"venom", 
                    damage:25,
                    mana_cost: 2,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("venom",defender.element)
                        let stab = calculateSTAB("venom",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Corrosive Fury`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*25*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${defender.name}** lost ${damage} HP by a flurry of corrosive beak attacks`)
                    }
                },{
                    cooldown: 0,
                    name: 'Toxin Barrage',
                    description: `A barrage of toxicated feathers`,
                    canEvade: true,
                    type: 'physical',
                    element:"venom", 
                    damage:50,
                    mana_cost: 5,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("venom",defender.element)
            let stab = calculateSTAB("venom",attacker.element)

            const chance = weightedRandom([true,false],[0.3,0.7])
            
            attacker.addLogMessage(`**${attacker.name}** used Toxin Barrage`)
            defender.takeDamage
                .physical((attacker.attackDamage*50)*mod*stab*lvl_modifier(attacker.level))
                .run(damage => `**${defender.name}** lost ${damage} HP by a barrage of feathers toxicated by deadly poison`)
                if(chance){
                    const Toxic = attacker.scheduler.task
                    .turns(3)
                    .all.effect(poisoning)
                    .end(() => defender.removeEffect(poisoning))
                    .run(() =>
                        defender.takeDamage
                            .physical(attacker.attackDamage*5*mod*lvl_modifier(attacker.level))
                            .run(
                                damage =>
                                    `${defender.name} lost ${damage} HP due to ${emoji.POISON}`
                            )
                    )
    
                defender.applyEffect(Toxic)
                attacker.addLogMessage(`**${defender.name} has been poisoned!**`)
                }      
            
            }
                },
               
            ],
        })
    }
}
