import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../classes'
import { Dropper } from '../dropper'
import generateXP from '../../utils/generateXP'
import { shadowCat_tuft } from '../items/shadowCat_tuft'

export class  Spectraling extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['You finish off the SPectraling and watch it fade away to nothingness\n\n**(press /progressmainquest to continue)**'],
            withDropMessages: [`The Shadow Cat lies dead on the ground as you finish it off and take some tuft from it's body`],
        }

        await new Dropper([
            {
                item: shadowCat_tuft,
                dropRate: 0,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Spectraling({
            name: 'Spectraling',
            description:`The Opponent in Guild Draft`,
            spawnRate: 0.35,
            health: 80,
            mana:0,
            xp: generateXP(15,18),
            evasion: 0.05,
            attackDamage: 15,
            fileName:'spectraling.jpeg',
            magicPower: 5,
            run_chance: 0.02,
            armor: 5,
            speed: 20,
            element:"normal",
            magicResistance: 20,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Phantom Hold',
                    description: `attacks with it's spectral tendrils`,
                    canEvade: true,
                    type: 'physical',
                    element:"normal", 
                    damage:22,
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`${attacker.name} used Phantom Hold`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*22)
                            .run(damage => `${defender.name} lost ${damage} HP by being crushed by the spectral grip`)
                    }
                },
               
            ],
        })
    }
}
