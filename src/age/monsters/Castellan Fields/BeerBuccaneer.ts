import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import { slimeBlob} from '../../items'
import generateXP from '../../../utils/generateXP'

export class BeerBuccaneer extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Beer Buccaneer ran away as you were about to finish it'],
            withDropMessages: ['The Beer Buccaneer dropped something'],
        }

        await new Dropper([
            {
                item: slimeBlob,
                dropRate: 0.9,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new BeerBuccaneer({
            name: 'BeerBuccaneer',
            spawnRate: 0.5,
            health: 30,
            mana:10,
            xp: generateXP(5,15),
            evasion: 0.05,
            attackDamage: 3,
            magicPower: 0,
            run_chance: 0.02,
            armor: 0,
            speed: 5,
            magicResistance: 0,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Knife Stab',
                    description: 'attacks with a knife',
                    canEvade: true,
                    type: 'physical',
                    damage:0,
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`**${attacker.name}** used Knife Stab`)
                        defender.takeDamage
                            .physical(attacker.attackDamage)
                            .run(damage => `**${defender.name}** lost ${damage} HP by Knife Stab`)
                    }
                },
               
            ],
        })
    }
}
