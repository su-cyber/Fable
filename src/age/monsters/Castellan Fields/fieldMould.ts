import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { dronerAcid } from '../../items/dronerAcid'

export class fieldMould extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Field Mould decayed leaving nothing behind'],
            withDropMessages: ['The Droner seems to have dropped something'],
        }

        await new Dropper([
            {
                item: dronerAcid,
                dropRate: 0,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new fieldMould({
            name: 'Field Mould',
            description:`A fungus that usually grows upon dead crops and has poisonous spores. They are hostile to any living creature that approaches them, they are immobile and their spores are not fatal. Any living thing killed by their spores become a host for new molds`,
            spawnRate: 0.2,
            health: 50,
            mana:0,
            fileName:'fieldmold.jpeg',
            xp: generateXP(5,15),
            evasion: 0.03,
            attackDamage: 0,
            magicPower: 4,
            run_chance: 0.02,
            armor: 7,
            speed: 1,
            element:"venom",
            magicResistance: 8,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Toxic Spores',
                    description: 'the mould releases toxic spores in the air',
                    canEvade: true,
                    damage:15,
                    type: 'magical',
                    element:"normal", 
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`${attacker.name} used Toxic Spores`)
                        defender.takeDamage
                            .magical(attacker.magicPower*15)
                            .run(damage => `${defender.name} lost ${damage} HP by beathing in some of the toxic spores.`)
                    }
                },
            ],
        })
    }
}
