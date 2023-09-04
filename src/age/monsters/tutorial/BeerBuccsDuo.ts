import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import profileModel from '../../../../models/profileSchema'
import { backBreaker } from '../../items/backbreaker'
import lvl_modifier from '../../../utils/lvl_modifier'


export class BeerBuccsDuo extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
   

        const messages = {
            withoutDropMessages: ['**Press "/progressmainquest" to continue**'],
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
            health: 45,
            level:1,
            evasion: 0,
            fileName:'beerbuccsduo.jpeg',
            attackDamage: 15,
            mana:0,
            xp: 15,
            magicPower: 0,
            armor: 5,
            speed: 4,
            element:"wave",
            magicResistance: 6,
            run_chance: 100,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Dual Slash',
                    description: 'Basic attack',
                    canEvade: true,
                    type: 'physical',
                    element:"normal", 
                    damage:20,
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`${attacker.name} used Dual Slash`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*20*lvl_modifier(attacker.level))
                            .run(damage => `${defender.name} lost ${damage} HP by a Dual knife slash`)
                    }
                },
            ],
        })
    }
}
