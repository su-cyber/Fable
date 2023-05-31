import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { solidifiedMagma } from '../../items/solidifiedMagma'

export class MagmaGolem extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Magma Golem ran away as you were about to finish it'],
            withDropMessages: ['The Magma Golem dropped something'],
        }

        await new Dropper([
            {
                item: solidifiedMagma,
                dropRate: 0.25,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new MagmaGolem({
            name: 'Magma Golem',
            description:`A towering creature composed of molten rock and magma, the Magma Golem can unleash scorching waves of lava that engulf its adversaries. It can also deliver devastating punches with its fiery fists. Its drop is a Globs of Solidified Magma, which can be used by blacksmiths to create heat-resistant armor.`,
            spawnRate: 0.5,
            health: 50,
            mana:0,
            xp: generateXP(5,15),
            evasion: 0.05,
            attackDamage: 45,
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
                    name: 'Magma Beam',
                    description: `Spits out a beam of Magma`,
                    canEvade: true,
                    type: 'magical',
                    damage:65,
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`**${attacker.name}** used Magma Beam`)
                        defender.takeDamage
                            .magical(attacker.attackDamage+65)
                            .run(damage => `**${defender.name}** lost ${damage} HP by burning in hot magma`)
                    }
                },
                {
                    cooldown: 0,
                    name: 'Fiery Fist',
                    description: `Punches with flaming fists`,
                    canEvade: true,
                    type: 'physical',
                    damage:45,
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`**${attacker.name}** used Fiery Fist`)
                        defender.takeDamage
                            .physical(attacker.attackDamage+45)
                            .run(damage => `**${attacker.name}** covers it's arm with scorching flames and punches **${defender.name}** causing ${damage} damage`)
                    }
                },
                {
                    cooldown: 0,
                    name: 'Wreaking Ball',
                    description: `attacks with burning rocks`,
                    canEvade: true,
                    type: 'physical',
                    damage:25,
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`**${attacker.name}** used Wreaking Ball`)
                        defender.takeDamage
                            .physical(attacker.attackDamage+25)
                            .run(damage => `**${attacker.name}** hurls burning rocks at **${defender.name}** causing ${damage} damage`)
                    }
                },
               
            ],
        })
    }
}
