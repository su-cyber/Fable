import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { gildedScale } from '../../items/GildedScale'

export class Gildedwyvern extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Gilded Wyvern ran away as you were about to finish it'],
            withDropMessages: ['The Gilded Wyvern dropped something'],
        }

        await new Dropper([
            {
                item: gildedScale,
                dropRate: 0.05,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Gildedwyvern({
            name: 'Gilded Wyvern',
            description:`A majestic creature covered in shimmering golden scales, the Gilded Wyvern possesses a powerful breath of gilded flames that melts even the sturdiest defenses. It attacks with swift aerial maneuvers and slashes from its razor-sharp talons. Its drop is a Gilded Scale, a valuable golden scale sought after by alchemists for its transmutation properties.`,
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
            element:"flame",
            magicResistance: 2,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Gilded Flame',
                    description: `Breathes jet of flames`,
                    canEvade: true,
                    type: 'physical',
                    element:"normal",
                    damage:55,
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`${attacker.name} used Gilded Flame`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*55)
                            .run(damage => `${defender.name} lost ${damage} HP by a burst of flames`)
                    }
                },
                {
                    cooldown: 0,
                    name: 'Razor Slash',
                    description: `Slashes the enemy with it's sharp talons`,
                    canEvade: true,
                    type: 'physical',
                    element:"normal",
                    damage:35,
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`${attacker.name} used Razor Slash`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*35)
                            .run(damage => `${defender.name} lost ${damage} HP by getting slashed by the Wyvern's sharp claws`)
                    }
                },
               
            ],
        })
    }
}
