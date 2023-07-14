import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { emberScale } from '../../items/Emberscale'

export class Emberbeast extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Emberbeast ran away as you were about to finish it'],
            withDropMessages: ['The Emberbeast dropped something'],
        }

        await new Dropper([
            {
                item: emberScale,
                dropRate: 0.15,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Emberbeast({
            name: 'Emberbeast',
            description:`A fearsome creature with smoldering red scales and flaming spines, the Emberbeast breathes jets of searing flames that engulf its foes. It charges with scorching speed, leaving trails of fire in its wake. Its drop is an Ember Scale, a fire-imbued scale renowned for its use in forging powerful flame-based weapons.`,
            spawnRate: 0.35,
            health: 100,
            mana:0,
            fileName:'emberbeast.jpeg',
            xp: generateXP(5,15),
            evasion: 0.05,
            attackDamage: 35,
            magicPower: 10,
            run_chance: 0.02,
            armor: 15,
            speed: 25,
            element:"flame",
            magicResistance: 10,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Jet Flame',
                    description: `Breathes jet of flames`,
                    canEvade: true,
                    type: 'physical',
                    element:"normal", 
                    damage:26,
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`${attacker.name} used Jet Flame`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*26)
                            .run(damage => `${defender.name} lost ${damage} HP by a jet of scorching flames`)
                    }
                },
               
            ],
        })
    }
}
