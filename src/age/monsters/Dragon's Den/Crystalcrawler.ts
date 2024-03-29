import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { crystalShard } from '../../items/crystalShard'
import lvl_modifier from '../../../utils/lvl_modifier'
import { emoji } from '../../../lib/utils/emoji'

export class Crystalcrawler extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Crystalcrawler ran away swiftly as you were about to finish it',`The Crystalcrawler crumbled to pieces as you finished it off.`],
            withDropMessages: [`The Crystalcrawler's lifeless body lies on the ground as you kill it. You collect some of it's crystal shards.`],
        }

        await new Dropper([
            {
                item: crystalShard,
                dropRate: 0.15,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Crystalcrawler({
            name: `Crystalcrawler ${emoji.LIGHT}`,
            description:`A creature made entirely of sparkling, translucent crystals, the Crystalcrawler skitters across the cave walls with incredible agility. It attacks by launching razor-sharp crystal shards at its foes. Its drop is a Crystal Shard, a gemstone-like fragment that can be used in the creation of magical artifacts.`,
            spawnRate: 0.35,
            health: 135,
            level:7,
            mana:4,
            fileName:'crystalcrawler.jpeg',
            xp: generateXP(26,30),
            evasion: 0.05,
            attackDamage: 28,
            magicPower: 0,
            run_chance: 0.02,
            armor: 35,
            speed: 14,
            element:"light",
            magicResistance: 25,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Shard Barrage',
                    description: `shoots a barrage of crystal shards`,
                    canEvade: true,
                    type: 'physical',
                    element:"normal", 
                    damage:26,
                    mana_cost: 1,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`${attacker.name} used Shard Barrage`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*26*lvl_modifier(attacker.level))
                            .run(damage => `${defender.name} lost ${damage} HP by a barrage of sharp crystals`)
                    }
                },
               
            ],
        })
    }
}
