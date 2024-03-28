import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { calculateSTAB } from '../../../../commands/fight'
import lvl_modifier from '../../../utils/lvl_modifier'
import { emoji } from '../../../lib/utils/emoji'
import { calculateModifier } from '../../../../commands/fight'
import { tidalgeistEssence } from '../../items/tidalgeistEssence'
import { thistleBruteThorn } from '../../items/thistleBruteThorn'




export class Thistlebrute extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [
                "The Thistlebrute manages to break free from your grasp, its thorny tendrils flailing wildly as it disappears into the undergrowth.",
                "You watch helplessly as the Thistlebrute retreats into the dense foliage, its thorny limbs disappearing from sight.",
                "Despite your efforts, the Thistlebrute escapes your clutches, vanishing into the shadows of the forest.",
            ],
            withDropMessages: [
                "After a fierce struggle, you successfully subdue the Thistlebrute, ripping a sharp thorn from its body as a trophy of your victory.",
                "With a well-aimed strike, you sever a thorny tendril from the Thistlebrute's body, leaving it writhing in pain as you claim your prize.",
                "In a display of strength, you overpower the Thistlebrute, tearing a jagged thorn from its limb as it writhes in agony on the forest floor.",
            ],
        };
        
        
        
        
        
        

        

        await new Dropper([
            {
                item: thistleBruteThorn,
                dropRate: 0.2,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Thistlebrute({
            name: `Thistlebrute ${emoji.BLOOM}`,
            description:`A large, plant-based creature with thistle-covered limbs. The Thistlebrute can entangle and immobilize foes with its sharp thorny tendrils.`,
            spawnRate: 0.25,
            health: 631,
            level:18,
            mana:11,
            xp: generateXP(65, 68),
            evasion: 0.005,
            attackDamage: 65,
            fileName:'thistlebrute.jpeg',
            magicPower: 66,
            run_chance: 0.02,
            armor: 65,
            speed: 5,
            element:"bloom",
            magicResistance: 65,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Thorny Grasp',
                    description: `Grapples with it's thorny limbs skewering the enemy`,
                    canEvade: true,
                    type: 'physical',
                    element:"bloom", 
                    damage:35,
                    mana_cost: 3,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("bloom",defender.element)
                        let stab = calculateSTAB("bloom",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Thorny Grasp`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*35*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `${attacker.name} holds ${defender.name} in it's thorny grip skewering them causing ${damage} damage.`)
                    }
                },{
                    cooldown: 0,
                    name: 'Pollen Burst',
                    description: `Bursts a barrage of thurny pollen`,
                    canEvade: true,
                    type: 'magical',
                    element:"bloom", 
                    damage:65,
                    mana_cost: 8,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("bloom",defender.element)
                        let stab = calculateSTAB("bloom",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Pollen Burst`)
                        defender.takeDamage
                            .magical(attacker.magicPower*65*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${attacker.name}** unleashes a burst of thorny pollen towards ${defender.name} causing ${damage} damage`)
                    }
                }
               
            ],
        })
    }
}
