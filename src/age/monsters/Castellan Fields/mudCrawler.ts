import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { silkBlob } from '../../items/silkblob'

export class mudCrawler extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Mud Crawler slipped away into the muddy fields as you were about to finish it',`You split the worm-like creature in two but failed to obtain anything usefull.`],
            withDropMessages: [`The Mud Crawler stops moving as it floats dead in the mud puddle. You extract some silk from it's mouth`],
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
            spawnRate: 0.05,
            health: 60,
            mana:0,
            fileName:'mudcrawler.jpeg',
            xp: 9,
            evasion: 0.03,
            attackDamage: 10,
            magicPower: 0,
            run_chance: 0.02,
            armor: 8,
            speed: 16,
            element:"terra",
            magicResistance: 8,
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
