import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { backBreaker } from '../../items/backbreaker'

export class BeerBuccaneer1 extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Beer Buccaneer ran away as you were about to finish it'],
            withDropMessages: ['The Beer Buccaneer dropped something'],
        }

        await new Dropper([
            {
                item: backBreaker,
                dropRate: 0.3,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new BeerBuccaneer1({
            name: 'BeerBuccaneer [Lvl 1]',
            description:`Local pirates who are engaged in the theivery of Backbreaker around Aube Town`,
            spawnRate: 0.5,
            fileName:'beerbuccaneer1.jpeg',
            health: 25,
            mana:0,
            xp: generateXP(5,15),
            evasion: 0.05,
            attackDamage: 5,
            magicPower: 0,
            run_chance: 0.02,
            armor: 2,
            speed: 5,
            element:"wave",
            magicResistance: 2,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Knife Stab',
                    description: 'attacks with a knife',
                    canEvade: true,
                    type: 'physical',
                    element:"normal", 
                    damage:15,
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`${attacker.name} used Knife Stab`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*15)
                            .run(damage => `${defender.name} lost ${damage} HP by Knife Stab`)
                    }
                },
               
            ],
        })
    }
}
