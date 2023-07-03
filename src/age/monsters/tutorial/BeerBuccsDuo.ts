import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import profileModel from '../../../../models/profileSchema'
import { backBreaker } from '../../items/backbreaker'


export class BeerBuccsDuo extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
    await profileModel.updateOne({userID:killer.id},{main_quest_phase:"2"})

        const messages = {
            withoutDropMessages: ['Press "/progressMainQuest" to continue'],
            withDropMessages: ['You can hear his last grunts before his death'],
        }

        await new Dropper([
            {
                item: backBreaker,
                dropRate: 0,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new BeerBuccsDuo({
            name: 'Beer Buccuneers Duo',
            description:`a duo of Beer Buccaneers`,
            spawnRate: 0.4,
            health: 30,
            evasion: 0.05,
            attackDamage: 5,
            mana:10,
            xp: generateXP(5,15),
            magicPower: 0,
            armor: 2,
            speed: 5,
            element:"wave",
            magicResistance: 1,
            run_chance: 100,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Knife stab ',
                    description: 'Basic attack',
                    canEvade: true,
                    type: 'physical',
                    element:"normal", 
                    damage:1,
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`${attacker.name} used Knife stab`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*1)
                            .run(damage => `${defender.name} lost ${damage} HP by Knife stab`)
                    }
                },
            ],
        })
    }
}
