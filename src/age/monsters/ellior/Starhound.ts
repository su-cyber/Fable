import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { starHound_tooth } from '../../items/starHound_tooth'
import { calculateModifier } from '../../../../commands/fight'
import { calculateSTAB } from '../../../../commands/fight'
import lvl_modifier from '../../../utils/lvl_modifier'

export class starHound extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Starhound ran away as you were about to finish it',`The Starhound blinds you with a sudden flash before escaping from your clutches`],
            withDropMessages: [`You finish off the beast before taking one of it's tooth with you`],
        }

        await new Dropper([
            {
                item: starHound_tooth,
                dropRate: 0.05,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new starHound({
            name: 'Starhound',
            description:`A sleek, wolf-like creature with shimmering silver fur and bright, glowing eyes. The Starhound is fast and agile, able to run at incredible speeds through the forest. Its skill is to emit a bright, blinding light that can disorient its prey. Its drop is a Starhound tooth, which is highly valued for its ability to enhance magical spells.`,
            spawnRate: 0.1,
            health: 180,
            level:7,
            mana:0,
            xp: generateXP(20,23),
            evasion: 0.05,
            attackDamage: 7,
            fileName:'starhound.jpeg',
            magicPower: 34,
            run_chance: 0.02,
            armor: 26,
            speed: 30,
            element:"light",
            magicResistance: 26,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Blinding Light',
                    description: `Blinds and damages the enemy with an intense light`,
                    canEvade: true,
                    type: 'magical',
                    element:"light", 
                    damage:26,
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("light",defender.element)
                        let stab = calculateSTAB("light",attacker.element)
                        attacker.addLogMessage(`${attacker.name} used Blinding Light`)
                        defender.takeDamage
                            .magical(attacker.attackDamage*26*mod*stab*lvl_modifier(attacker.level))
                            .run(damage => `${defender.name} lost ${damage} HP by Blinding Light`)
                    }
                },
               
            ],
        })
    }
}
