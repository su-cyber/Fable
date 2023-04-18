import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import { slimeBlob} from '../../items'
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
                dropRate: 0.8,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new mudCrawler({
            name: 'Mud Crawler',
            spawnRate: 0.3,
            health: 30,
            mana:0,
            xp: generateXP(5,15),
            evasion: 0.03,
            attackDamage: 10,
            magicPower: 0,
            run_chance: 0.02,
            armor: 1,
            speed: 5,
            element:"wave",
            magicResistance: 2,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Slip Bite',
                    description: 'A quick bite attack',
                    canEvade: true,
                    damage:0,
                    type: 'physical',
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`**${attacker.name}** used Slip Bite`)
                        defender.takeDamage
                            .physical(attacker.attackDamage)
                            .run(damage => `**${defender.name}** lost ${damage} HP by a sharp bite`)
                    }
                },
            ],
        })
    }
}
