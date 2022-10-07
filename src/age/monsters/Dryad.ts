import { CommandInteraction } from 'discord.js'
import { Dropper } from '../dropper'
import { DryadJewel } from '../items'
import { illusion } from '../effects/illusion'
import { emoji } from '../../lib/utils/emoji'
import { paralyzed } from '../effects/paralyze'
import sample from 'lodash.sample'
import { MonsterEntity, ClassEntity, Entity } from '../classes'
import { anti_magic } from '../effects/anti-magic'
import { percentOf, randint } from '../../utils'
import range from 'lodash.range'
import generateXP from '../../utils/generateXP'

export class Dryad extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The goblin was badly wounded, but he managed to escape'],
            withDropMessages: ['You can hear his last grunts before his death'],
        }

        new Dropper([
            {
                item: DryadJewel,
                dropRate: 0.9,
            }
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    beforeDuelStart(you: Entity, opponent: Entity) {
        
        const nature_authority = you.scheduler.task
                            .id('Dryad_nature-authority')
                            .turns(1000)
                            .end(()=> {} )
                            .run(() => {
                                const rand=Math.floor(Math.random() * 101);
                                
                                if(rand>0 && rand<=30){
                                    const magicblock = you.scheduler.task
                                    
                                    .turnOf(opponent)
                                    .all.effect(anti_magic)
                                    .turns(2)
                                    .end(()=>opponent.removeEffect(anti_magic) )
                                    .run(() => {
                                       
                                    })
                                    opponent.applyEffect(magicblock)
                                    you.addLogMessage( "Dryad has activated unique skill: **Nature's Authority**",
                                    "Magical attacks will be disabled!") 
                                }
                               
                              
                            })
                            const callofwild = you.scheduler.task
                            .id('Dryad_callofwild')
                            .turns(1000)
                            .end(()=> {} )
                            .run(() => {
                               
                                
                                if(you.health<=0.2*you.maxHealth){
                                    const currentevasion=you.evasion
                                    const wild = you.scheduler.task
                                    
                                    .turnOf(opponent)
                                    .turns(1)
                                    .end(()=>{ you.evasion=currentevasion} )
                                    .run(() => {
                                        you.evasion=1
                                        opponent.health=opponent.health-30
                                       you.addLogMessage("You lost 30 HP due to wolves' attacks!")

                                    })
                                    opponent.applyEffect(wild)
                                    you.addLogMessage( "Dryad has activated unique skill: **Call of Wild**",
                                    "3 ferocious wolves have come to aid the dryad!") 
                                }
                               
                              
                            })

        you.applyEffect(nature_authority)
        you.applyEffect(callofwild)
        
    }

    chooseSkill(defender: Entity) {
        const isParalyzed = defender.hasEffect(paralyzed)

        if (isParalyzed) {
            return sample(this.skills.filter(skill => skill.name !== 'Serpent Gaze'))
        }

        return sample(this.skills)
    }

    static create() {
        return new Dryad({
            name: 'Dryad',
            spawnRate: 0.1,
            evasion: 0.05,
            health: 350,
            mana:500,
            xp: generateXP(2500,3000),
            attackDamage: 120,
            magicPower: 100,
            armor: 50,
            magicResistance: 80,
            run_chance: 1,
            passive_skills:[],
            skills: [
                {
                    name: 'Wood Dragon',
                    cooldown: 0,
                    description: 'Basic attack',
                    canEvade: true,
                    type: 'magical',
                    mana_cost: 50,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`**${attacker.name}** used Wood Dragon`)
                        defender.takeDamage
                            .physical(300)
                            .run(damage => `**${defender.name}** lost ${damage} HP by Wood Dragon`)
                    },
                },
                {
                    cooldown: 0,
                    name: 'Devouring Roots',
                    description: 'Increases attack damage for a short time',
                    canEvade: true,
                    type: 'magical',
                    mana_cost: 40,
                    use: (attacker, defender) => {
                        const devour = attacker.scheduler.task
                            .id('Dryad__devouring-roots')
                            
                            .turnOf(defender)
                            .turns(3)
                            .end(() => defender.addLogMessage("Devouring roots have retracted!"))
                            .run(() => {
                                if(defender.mana>=30){
                                    attacker.mana = attacker.mana+30
                                    defender.mana=defender.mana-30
    
                                    defender.addLogMessage(`${defender.name} lost 30 mana! `,
                                    `${attacker.name} gained 30 mana!`)
                                }
                                else{
                                    defender.addLogMessage("No mana to devour!")
                                }
                                
                            })

                        defender.applyEffect(devour)
                        attacker.addLogMessage(
                            `**${attacker.name}** used Devouring Roots`
                            
                        )
                    },
                },
                {
                    cooldown: 0,
                    name: 'Hymn of Forest',
                    description: 'Increases attack damage for a short time',
                    canEvade: false,
                    type: 'magical',
                    mana_cost: 80,
                    use: (attacker, defender) => {
                        attacker.armor=attacker.armor+0.2*attacker.armor
                        attacker.attackDamage=attacker.attackDamage+0.2*attacker.attackDamage
                        attacker.magicPower=attacker.magicPower+0.2*attacker.magicPower
                        attacker.magicResistance=attacker.magicResistance+0.2*attacker.magicResistance
                        attacker.evasion=attacker.evasion+0.2*attacker.evasion
                       

                        
                            attacker.addLogMessage(`**${attacker.name}** used Hymn of Forest`,`**${attacker.name}** increased all stats by 20%!`)
                    },
                },
                {
                    cooldown: 0,
                    name: 'Jungle Fury',
                    description: 'Increases attack damage for a short time',
                    canEvade: true,
                    type: 'magical',
                    mana_cost: 60,
                    use: (attacker, defender) => {
                        const n = randint(2, 5)
                       

                        attacker.addLogMessage(
                         `**${attacker.name}** used Jungle Fury`
                        )

                        range(n).forEach(() =>{
                            var x= randint(30,60)
                            defender.takeDamage
                                .physical(x)
                                .run(damage => `**${defender.name}** lost ${damage} HP by Savage fury`)
                        }
                        )
                    },
                },
                {
                    cooldown: 0,
                    name: 'Floral Illusion',
                    description: 'Increases attack damage for a short time',
                    canEvade: false,
                    type: 'magical',
                    mana_cost: 30,
                    use: (attacker, defender) => {
                        const floral_illusion = attacker.scheduler.task
                            .id('chimera__floral-illusion')
                            .turnOf(defender)
                            .all.effect(illusion)
                            .turns(1)
                            .end(()=>defender.removeEffect(illusion) )
                            .run(() => {
                                
                            })

                        defender.applyEffect(floral_illusion)

                        attacker.addLogMessage(
                            `**${attacker.name}** used Floral Illusion`,
                            `${defender.name} has been put into an illusion!`
                        ) 
                }
            }
            ],
        })
    }
}
