import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { crystalShard } from '../../items/crystalShard'

export class Crystalcrawler extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Crystalcrawler ran away as you were about to finish it'],
            withDropMessages: ['The Crystalcrawler dropped something'],
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
            name: 'Crystalcrawler',
            description:`A creature made entirely of sparkling, translucent crystals, the Crystalcrawler skitters across the cave walls with incredible agility. It attacks by launching razor-sharp crystal shards at its foes. Its drop is a Crystal Shard, a gemstone-like fragment that can be used in the creation of magical artifacts.`,
            spawnRate: 0.5,
            health: 50,
            mana:0,
            xp: generateXP(5,15),
            evasion: 0.05,
            attackDamage: 5,
            magicPower: 0,
            run_chance: 0.02,
            armor: 2,
            speed: 5,
            element:"light",
            magicResistance: 2,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Shard Barrage',
                    description: `shoots a barrage of crystal shards`,
                    canEvade: true,
                    type: 'physical',
                    element:"normal", 
                    damage:15,
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`${attacker.name} used Shard Barrage`)
                        defender.takeDamage
                            .physical(attacker.attackDamage+15)
                            .run(damage => `${defender.name} lost ${damage} HP by a barrage of sharp crystals`)
                    }
                },
               
            ],
        })
    }
}
