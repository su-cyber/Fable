import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { dronerAcid } from '../../items/dronerAcid'
import { buzzHoney } from '../../items/buzz_honey'

export class Droner extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Droner escaped as you were about to finish it'],
            withDropMessages: ['The Droner seems to have dropped something'],
        }

        await new Dropper([
            {
                item: dronerAcid,
                dropRate: 0.25,
            },{
                item: buzzHoney,
                dropRate: 0.05,
            }
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Droner({
            name: 'Droner',
            description:`Insects about the size of an average human hand who make a loud droning sound and feed on the nectar of Rayleigh Flowers. Although not hostile, they don't hesitate to attack humans when disturbed and their sting is said to make an average human unconscious for hours.`,
            spawnRate: 0.2,
            health: 30,
            mana:0,
            xp: generateXP(5,15),
            evasion: 0.03,
            attackDamage: 10,
            fileName:'droner.jpeg',
            magicPower: 0,
            run_chance: 0.02,
            armor: 3,
            speed: 15,
            element:"venom",
            magicResistance: 2,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Acid Sting',
                    description: 'A sting attack with droner acid',
                    canEvade: true,
                    damage:1,
                    type: 'physical',
                    element:"normal", 
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`${attacker.name} used Acid Sting`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*1)
                            .run(damage => `${defender.name} lost ${damage} HP by getting stung by the Droner`)
                    }
                },
            ],
        })
    }
}
