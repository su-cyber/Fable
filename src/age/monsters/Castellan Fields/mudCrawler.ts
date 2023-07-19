import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { silkBlob } from '../../items/silkblob'

export class mudCrawler extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Mud Crawler slipped away as you were about to finish it'],
            withDropMessages: ['The Mud Crawler seems to have dropped something'],
        }

        await new Dropper([
            {
                item: silkBlob,
                dropRate: 0.25,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new mudCrawler({
            name: 'Mud Crawler',
            description:`Worm like creatures with sharp teeths who blend in the mud and attack their prey. They often mark their hunting grounds with threads of silk produced from their salivary glands, although this silk is of low grade, it still fetches a decent price.`,
            spawnRate: 0.3,
            health: 60,
            mana:0,
            fileName:'mudcrawler.jpeg',
            xp: 9,
            evasion: 0.03,
            attackDamage: 12,
            magicPower: 0,
            run_chance: 0.02,
            armor: 7,
            speed: 12,
            element:"terra",
            magicResistance: 4,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Slip Bite',
                    description: 'A quick bite attack',
                    canEvade: true,
                    damage:20,
                    type: 'physical',
                    element:"normal", 
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`${attacker.name} used Slip Bite`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*15)
                            .run(damage => `${defender.name} lost ${damage} HP by a sharp bite`)
                    }
                },
            ],
        })
    }
}
