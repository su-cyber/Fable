import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { calculateSTAB } from '../../../../commands/fight'
import lvl_modifier from '../../../utils/lvl_modifier'
import { emoji } from '../../../lib/utils/emoji'
import { calculateModifier } from '../../../../commands/fight'
import { spyrHorn } from '../../items/spyrHorn'
import { mosscaleTooth } from '../../items/mosscale_tooth'



export class Mosscale extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [
                "As you confront the towering Mosscale in the murky swamp, its menacing presence fills you with dread. With a sudden burst of speed, you deliver a devastating blow, causing it to barely escape into the shadows, leaving behind a trail of blood and mud.",
                "In the heart of the swamp, you come face to face with the formidable Mosscale, its hard scales glistening with mud and moss. With swift and precise strikes, you overpower the beast, but it manages to flee into the murky waters, wounded and defeated.",
                "As you engage the imposing Mosscale in battle, its powerful jaws and tail prove to be formidable weapons. Despite its ferocious attacks, you emerge victorious, leaving the creature badly injured as it slinks away into the depths of the swamp.",
            ],
            withDropMessages: [
                "After a fierce struggle with the mighty Mosscale, you emerge victorious, its hardened scales no match for your determination. Amidst the mud and moss, you discover a sharp Mosscale Tooth, a tangible token of your hard-won victory.",
                "Despite the Mosscale's ferocious attacks, you stand your ground and triumph over the formidable creature. Among the tangled roots of the swamp, you find a gleaming Mosscale Tooth, a valuable prize amidst the muck and mud.",
                "With courage and skill, you defeat the imposing Mosscale, its powerful jaws no match for your resolve. Among the shadows of the swamp, you uncover a pristine Mosscale Tooth, a tangible reward for your bravery in the face of danger.",
            ],
        };
        
        
        
        
        
        
        
        

        await new Dropper([
            {
                item: mosscaleTooth,
                dropRate: 0.2,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Mosscale({
            name: `Mosscale ${emoji.TERRA}`,
            description:`Mutated creatures that thrive in mud often believed to be less evolved versions of lizardmen. They are hostile with hard scales always covered in mud and moss, their jaws and tail are very powerful capable of navigating through the swamp.`,
            spawnRate: 0.45,
            health: 484,
            level:15,
            mana:9,
            xp: generateXP(54, 56),
            evasion: 0.06,
            attackDamage: 75,
            fileName:'mosscale.jpeg',
            magicPower: 2,
            run_chance: 0.02,
            armor: 65,
            speed: 25,
            element:"terra",
            magicResistance: 60,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Swamp Crush',
                    description: `crushes the enemy with the power of earth`,
                    canEvade: true,
                    type: 'physical',
                    element:"terra", 
                    damage:23,
                    mana_cost: 2,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("terra",defender.element)
                        let stab = calculateSTAB("terra",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Swamp Crush`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*23*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${attacker.name}** crushes ${defender.name} with huge fists covered with hardened mud causing ${damage} damage`)
                    }
                },{
                    cooldown: 0,
                    name: 'Upscale',
                    description: 'A skill that hardens the hard scales several folds',
                    canEvade: false,
                    type: 'buff',
                    element:"gale",
                    damage:0,
                    mana_cost: 6,
                    use: (attacker, defender) => {
                        attacker.armor = 1.25*attacker.armor
                        attacker.magicResistance = 1.25*attacker.magicResistance

                        attacker.addLogMessage(
                            `${attacker.name} used Upscale`,
                            `${attacker.name}'s scales hardens several folds creating an impenetrable skin increasing defenses by 25%`
                        )
                        
                       
                    },
                },
               
            ],
        })
    }
}
