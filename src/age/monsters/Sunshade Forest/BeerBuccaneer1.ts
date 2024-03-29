import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { backBreaker } from '../../items/backbreaker'
import lvl_modifier from '../../../utils/lvl_modifier'
import { emoji } from '../../../lib/utils/emoji'

export class BeerBuccaneer1 extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [`You look down on the weakling as he grovels before you begging you to spare him.`,`You finished off the pirate but couldn't find anything useful on him`],
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
        return new BeerBuccaneer1({
            name: `BeerBuccaneer [Lvl 1] ${emoji.WAVE}`,
            description:`Local pirates who are engaged in the theivery of Backbreaker around Aube Town`,
            spawnRate: 0.25,
            fileName:'beerbuccaneer1.jpeg',
            health: 45,
            level:1,
            mana:0,
            xp: 7,
            evasion: 0.03,
            attackDamage: 12,
            magicPower: 0,
            run_chance: 0.02,
            armor: 10,
            speed: 4,
            element:"wave",
            magicResistance: 4,
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
                            .physical(attacker.attackDamage*15*lvl_modifier(attacker.level))
                            .run(damage => `${defender.name} lost ${damage} HP by Knife Stab`)
                    }
                },
               
            ],
        })
    }
}
