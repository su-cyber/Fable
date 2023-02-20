import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import { goblinPouch } from '../../items'
import generateXP from '../../../utils/generateXP'

export class Goblin extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The goblin was badly wounded, but he managed to escape'],
            withDropMessages: ['You can hear his last grunts before his death'],
        }

        await new Dropper([
            {
                item: goblinPouch,
                dropRate: 0.9,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Goblin({
            name: 'Goblin',
            spawnRate: 0.4,
            health: 30,
            evasion: 0.05,
            attackDamage: 5,
            mana:10,
            xp: generateXP(5,15),
            magicPower: 0,
            armor: 2,
            speed: 5,
            magicResistance: 1,
            run_chance: 0.02,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Knife stab ',
                    description: 'Basic attack',
                    canEvade: true,
                    type: 'physical',
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`**${attacker.name}** used Knife stab`)
                        defender.takeDamage
                            .physical(attacker.attackDamage)
                            .run(damage => `**${defender.name}** lost ${damage} HP by Knife stab`)
                    }
                },
            ],
        })
    }
}
