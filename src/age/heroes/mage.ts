import {User } from 'discord.js'
import { ClassEntity } from '../classes'
import { burning } from '../effects/burning'
import { CommandInteraction } from 'discord.js'
import { removeIndentation } from '../../utils'
import { Entity } from '../classes/entity'
import passive_skills from './passive_skills'

export class Mage extends ClassEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        this.sendDeathMessage(interaction,this)
    }


    async sendDeathMessage(
        interaction: CommandInteraction,
        killed: Entity
    ) {
       
        const text = `
            **${killed.name} was killed!**
        `

        await interaction.channel.send(removeIndentation(text))
    }

    beforeDuelStart(you: Entity, opponent: Entity) {
        
        if(you.passive_skills.length !=0){
            let i
            for(i=0;i<you.passive_skills.length;i++){
                const passive_skill = passive_skills.find(skill => skill.name === you.passive_skills[i].name)
                you.useSkill(you,opponent,passive_skill)
            } 
        }
        
    }

    static create(user: User) {
        return new Mage({
            user,
            health: 100,
            attackDamage: 10,
            mana:100,
            magicPower: 0,
            armor: 0,         
            evasion: 0.8,
            speed: 10,
            magicResistance: 0,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Basic Attack',
                    description: 'Basic Attack',
                    canEvade: true,
                    mana_cost: 0,
                    damage:0,
                    type: 'physical',
                    use: (attacker, defender) =>
                        defender.takeDamage
                            .physical(attacker.attackDamage)
                            .run(damage => `**${defender.name}** lost ${damage} HP by Basic Attack`),
                },
                {
                    cooldown: 0,
                    name: 'Fireball',
                    description: 'Dealing damage and burning them for 3 turns',
                    canEvade: true,
                    mana_cost: 20,
                    type: 'magical',
                    damage:0,
                    use: (attacker, defender) => {
                        const fireball = attacker.scheduler.task.all
                            .effect(burning)
                            .turns(3)
                            .end(() => defender.removeEffect(burning))
                            .run(() =>
                                defender.takeDamage
                                    .physical(5)
                                    .run(damage => `**${defender.name}** lost ${damage} HP by Burning`)
                            )
                        defender.applyEffect(fireball)

                        defender.takeDamage
                            .magical(15)
                            .run(damage => `**${defender.name}** lost ${damage} HP by Fireball`)
                    },
                },
            ],
        })
    }
}
