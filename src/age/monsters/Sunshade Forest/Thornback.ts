import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { treemickBranch } from '../../items/treemickBranch'
import { thornbackShell } from '../../items/thornback_shell'
import lvl_modifier from '../../../utils/lvl_modifier'

export class Thornback extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The ThornBack ran away as you were about to finish it'],
            withDropMessages: [`You finish off the Thornback and remove it's shell to take with you`],
        }

        await new Dropper([
            {
                item: thornbackShell,
                dropRate: 0.15,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Thornback({
            name: 'Thornback',
            spawnRate: 0.1,
            description:`A large, armored reptile covered in sharp thorns. The Thornback is slow-moving but extremely powerful. Its attack is a charge with its heavy, spiked tail. Its drop is a Thornback shell, which can be crafted into sturdy armor.`,
            health: 100,
            level:3,
            mana:0,
            xp: 12,
            evasion: 0.03,
            attackDamage: 23,
            fileName:'thornback.jpeg',
            magicPower: 1,
            run_chance: 0.02,
            armor: 19,
            speed: 13,
            element:"bloom",
            magicResistance: 15,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Spiked Charge',
                    description: `charges with the spikes on it's back`,
                    canEvade: true,
                    damage:24,
                    type: 'physical',
                    element:"normal",
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`${attacker.name} used Spiked Charge`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*24*lvl_modifier(attacker.level))
                            .run(damage => `${defender.name} lost ${damage} HP by Spiked Charge`)
                    }
                },
            ],
        })
    }
}
