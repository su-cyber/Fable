import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { backBreaker } from '../../items/backbreaker'

export class BeerBuccaneer2 extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [`You finished off the pirate but couldn't find anything useful on him`,`You look down on the weakling as he grovels before you begging you to spare him.`],
            withDropMessages: ['The pirate falls motionless on the ground as you finish him off before taking a bottle of brackbreaker that was with him.'],
        }

        await new Dropper([
            {
                item: backBreaker,
                dropRate: 0.3,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new BeerBuccaneer2({
            name: 'BeerBuccaneer [Lvl 2]',
            description:`Local pirates who are engaged in the theivery of Backbreaker around Aube Town`,
            spawnRate: 0.25,
            fileName:'beerbuccaneer2.jpeg',
            health: 80,
            mana:0,
            xp: 9,
            evasion: 0.03,
            attackDamage: 24,
            magicPower: 0,
            run_chance: 0.02,
            armor: 12,
            speed: 8,
            element:"wave",
            magicResistance: 8,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Knife Stab',
                    description: 'attacks with a knife',
                    canEvade: true,
                    type: 'physical',
                    damage:15,
                    element:"normal", 
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
