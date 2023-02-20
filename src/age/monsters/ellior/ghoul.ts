import { CommandInteraction } from 'discord.js'
import { Dropper } from '../../dropper'
import { ghoulSkull } from '../../items'
import { percentOf } from '../../../utils/percentOf'
import { MonsterEntity, ClassEntity } from '../../classes'
import generateXP from '../../../utils/generateXP'

export class Ghoul extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The goblin was badly wounded, but he managed to escape'],
            withDropMessages: ['You can hear his last grunts before his death'],
        }

        new Dropper([
            {
                item: ghoulSkull,
                dropRate: 0.9,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Ghoul({
            name: 'Ghoul',
            spawnRate: 0.3,
            health: 50,
            evasion: 0.04,
            attackDamage: 10,
            mana:10,
            xp: generateXP(5,15),
            magicPower: 0,
            armor: 5,
            speed: 5,
            magicResistance: 3,
            run_chance: 0.03,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Claw Attack',
                    description: 'Basic attack',
                    canEvade: true,
                    type: 'physical',
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`**${attacker.name}** used Claw attack`)
                        defender.takeDamage
                            .physical(12)
                            .run(damage => `**${defender.name}** lost ${damage} HP by Claw Attack`)
                    }
                },
                {
                    cooldown: 0,
                    name: 'Hollow Screech',
                    description: 'Increases attack damage for a short time',
                    canEvade: false,
                    type: 'physical',
                    mana_cost: 0,
                    use: (attacker, defender) => {
                        const drainedArmor = percentOf(0.05, defender.armor)
                        defender.armor -= drainedArmor
        

                        attacker.addLogMessage(
                            `**${attacker.name}** used Hollow Screech`,
                            `**${defender.name}** lost 5% armor due to Hollow Screech`
                        )
                        
                       
                    },
                },
            ],
        })
    }
}
