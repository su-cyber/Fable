import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { calculateSTAB } from '../../../../commands/fight'
import lvl_modifier from '../../../utils/lvl_modifier'
import { emoji } from '../../../lib/utils/emoji'
import { calculateModifier } from '../../../../commands/fight'
import { tidalgeistEssence } from '../../items/tidalgeistEssence'
import { ghorghonNecklace } from '../../items/ghorghonNecklace'




export class Ghorgon extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [
                "The Ghorgon, bloodied and wounded, manages to slip away into the shadows, leaving behind a trail of carnage.",
                "With a final, desperate roar, the Ghorgon retreats into the darkness, its once-mighty form now diminished and broken.",
                "You watch the Ghorgon, its body battered and broken, it seems the Ghorghon is a weak one which doesn't possess a necklace for you to claim.",
            ],
            withDropMessages: [
                "In a brutal battle that leaves the ground soaked in blood, you emerge victorious over the Ghorgon, claiming its necklace of mud balls as a symbol of your dominance.",
                "With each strike, you chip away at the Ghorgon's strength until it lies defeated before you, its necklace of mud balls now yours to claim as a trophy of your ferocity.",
                "Amidst the chaos of battle, you stand triumphant over the fallen Ghorgon, its necklace of mud balls a testament to your prowess as a warrior.",
            ],
        };
        
        
        
        
        
        
        

        

        await new Dropper([
            {
                item: ghorghonNecklace,
                dropRate: 0.2,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Ghorgon({
            name: `Ghorgon ${emoji.TERRA}`,
            description:`Ghorgon are large, agile creatures that are swift and silent. They crave to wrestle, putting up their lives just for a good fight. Although Gorgons don't exst in large numbers, they gather sometimes to test their power against those of the same species, and then scatter if lost, on their way to train, and return once again seeking their lost honor. The strength of a Ghorgon is determined by the number of mud balls around their necks, adorned like a necklace of beads tied together by their long hair. These mud balls represent their victories. Ghorgon that have lost, are seen with no necklaces.`,
            spawnRate: 0.1,
            health: 950,
            level:19,
            mana:12,
            xp: generateXP(115, 120),
            evasion: 0.09,
            attackDamage: 75,
            fileName:'Ghorgon.jpeg',
            magicPower: 75,
            run_chance: 0.02,
            armor: 45,
            speed: 90,
            element:"terra",
            magicResistance: 45,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Giga Tackle',
                    description: `A supersonic tackle attack`,
                    canEvade: true,
                    type: 'physical',
                    element:"terra", 
                    damage:35,
                    mana_cost: 3,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("terra",defender.element)
                        let stab = calculateSTAB("terra",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Giga Tackle`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*35*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `${attacker.name} tackles ${defender.name} with supersonic speed causing ${damage} damage.`)
                    }
                },{
                    cooldown: 0,
                    name: 'Dark Screech',
                    description: `An ominous screech`,
                    canEvade: true,
                    type: 'magical',
                    element:"terra", 
                    damage:65,
                    mana_cost: 8,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("terra",defender.element)
                        let stab = calculateSTAB("terra",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Dark Screech`)
                        defender.takeDamage
                            .magical(attacker.magicPower*65*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${attacker.name}** lets out a deafening screech that bursts ${defender.name}'s ears causing ${damage} damage`)
                    }
                }
               
            ],
        })
    }
}
