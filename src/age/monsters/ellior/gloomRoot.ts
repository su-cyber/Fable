import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { gloomRoot_branch } from '../../items/gloomRootBranch'

export class gloomRoot extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Gloomroot ran away as you were about to finish it'],
            withDropMessages: ['The Gloomroot dropped something'],
        }

        await new Dropper([
            {
                item: gloomRoot_branch,
                dropRate: 0.25,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new gloomRoot({
            name: 'Gloomroot',
            description:`A massive, twisted tree with gnarled branches and glowing purple flowers. The Gloomroot is said to possess ancient magic and can manipulate the forest around it. Its skill is to create tendrils of darkness that can ensnare and trap its prey. Its drop is a Gloomroot branch, which can be used in the creation of powerful magical orbes.`,
            spawnRate: 0.1,
            health: 100,
            mana:0,
            xp: generateXP(26,30),
            evasion: 0.05,
            attackDamage: 25,
            magicPower: 7,
            fileName:'gloomroot.jpeg',
            run_chance: 0.02,
            armor: 24,
            speed: 15,
            element:"bloom",
            magicResistance: 24,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Dark Tendrils',
                    description: `attacks with it's roots`,
                    canEvade: true,
                    type: 'physical',
                    element:"normal", 
                    damage:26,
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`${attacker.name} used Dark Tendrils`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*26)
                            .run(damage => `${defender.name} lost ${damage} HP by getting crushed by dark tendrils`)
                    }
                },
               
            ],
        })
    }
}
