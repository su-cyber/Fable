import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { calculateSTAB } from '../../../../commands/fight'
import lvl_modifier from '../../../utils/lvl_modifier'
import { emoji } from '../../../lib/utils/emoji'
import { calculateModifier } from '../../../../commands/fight'
import { tidalgeistEssence } from '../../items/tidalgeistEssence'
import { ibexionHorn } from '../../items/ibexionHorn'




export class Ibewky extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [
                "The Ibexion leaps away, its furious snarls echoing through the mountains as it evades your grasp.",
                "You watch in frustration as the Ibexion bounds effortlessly over the cliffs, its orange fur disappearing into the distance.",
                "Despite your best efforts, the Ibexion manages to flee, its powerful hind legs propelling it to safety.",
            ],
            withDropMessages: [
                "With a swift strike, you manage to incapacitate the Ibexion, wrenching one of its long horns as a trophy of your victory.",
                "After a tense battle, you overpower the Ibexion, tearing a large horn from its head as it roars in pain.",
                "With a mighty leap, you bring down the Ibexion, claiming one of its horns as a token of your triumph.",
            ],
        };
        
        
        
        
        
        
        

        

        await new Dropper([
            {
                item: ibexionHorn,
                dropRate: 0.2,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Ibewky({
            name: `Ibewkey ${emoji.TERRA}`,
            description:`A large and hairy brute with orange hair, long horns and large hind legs. It is often enraged easily. It is very nimble, and able to jump to incredible heights. They reside in the mountainous hills atop Spezia Cliffs are often seen chasing after Rangers over the most trivial of matters.`,
            spawnRate: 0.25,
            health: 631,
            level:18,
            mana:11,
            xp: generateXP(65, 68),
            evasion: 0.055,
            attackDamage: 80,
            fileName:'ibewkey.jpeg',
            magicPower: 1,
            run_chance: 0.02,
            armor: 75,
            speed: 55,
            element:"terra",
            magicResistance: 55,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Enraged Pounce',
                    description: `Pounces over the enemy.`,
                    canEvade: true,
                    type: 'physical',
                    element:"terra", 
                    damage:35,
                    mana_cost: 3,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("terra",defender.element)
                        let stab = calculateSTAB("terra",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Enraged Pounce`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*35*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `${attacker.name} pounces on ${defender.name} with it's strong legs crushing them causing ${damage} damage.`)
                    }
                },{
                    cooldown: 0,
                    name: 'Great Impalement',
                    description: `Charges and impales the enemy`,
                    canEvade: true,
                    type: 'physical',
                    element:"terra", 
                    damage:65,
                    mana_cost: 8,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("terra",defender.element)
                        let stab = calculateSTAB("terra",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Great Impalement`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*65*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${attacker.name}** charges towards ${defender.name} and impales them with it's horns causing ${damage} damage`)
                    }
                }
               
            ],
        })
    }
}
