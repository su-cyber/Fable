import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { gloomRoot_branch } from '../../items/gloomRootBranch'
import { calculateModifier } from '../../../../commands/fight'

export class gloomRoot extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Gloomroot decayed and withered away before you could finish it'],
            withDropMessages: [`The Gloomroot stops moving as you finish it and rip off one of it's branches`],
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
            spawnRate: 0.2,
            health: 120,
            mana:0,
            xp: generateXP(26,30),
            evasion: 0.05,
            attackDamage: 30,
            magicPower: 2,
            fileName:'gloomroot.jpeg',
            run_chance: 0.02,
            armor: 24,
            speed: 10,
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
                    element:"bloom", 
                    damage:26,
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("bloom",defender.element.toLowerCase())
                        attacker.addLogMessage(`${attacker.name} used Dark Tendrils`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*26*mod)
                            .run(damage => `${defender.name} lost ${damage} HP by getting crushed by dark tendrils`)
                    }
                },
               
            ],
        })
    }
}
