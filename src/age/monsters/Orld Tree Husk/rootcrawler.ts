import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { calculateSTAB } from '../../../../commands/fight'
import lvl_modifier from '../../../utils/lvl_modifier'
import { emoji } from '../../../lib/utils/emoji'
import { calculateModifier } from '../../../../commands/fight'
import { hydroScale } from '../../items/hydroScale'
import { staticTalon } from '../../items/staticTalon'
import { bloodStainedHide } from '../../items/bloodStained_hide'
import { rootcrawlerScale } from '../../items/rootcrawlerScale'



export class Rootcrawler extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [
                "The Rootcrawler slithers away into the tangled roots, disappearing from sight before you can catch it, leaving behind a trail of shredded foliage.",
                "Despite your best efforts, the Rootcrawler vanishes among the roots, leaving you frustrated and covered in scratches from the thorny underbrush.",
                "As you approach the Rootcrawler, it swiftly retreats into the shadows of the Orld Husk, evading your grasp and leaving you empty-handed.",
            ],
            withDropMessages: [
                "As you defeat the Rootcrawler, you deliver a fatal blow, causing it to writhe in agony before finally succumbing. You manage to retrieve a sturdy Rootcrawler's Scale from its camouflaged hide, soaked in its own viscous fluids.",
                "After a challenging battle, you find a resilient Rootcrawler's Scale amidst the tangled roots left behind by the vanquished creature, its wooden exterior stained with the creature's dark, oozing blood.",
                "With a decisive strike, you bring down the Rootcrawler, its thrashing form still for a moment before falling silent. Amidst the carnage, you spot a gleaming Rootcrawler's Scale, a trophy of your hard-won victory.",
            ],
        };
        
        
        
        

        await new Dropper([
            {
                item: rootcrawlerScale,
                dropRate: 0.2,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Rootcrawler({
            name: `Rootcrawler ${emoji.BLOOM}`,
            description:`These are serpentine creatures who have mastered the art of camouflaging by making their skin akin to wood and blending with the many roots of the Orld tree. they use their stealth to hunt their prey.`,
            spawnRate: 0.2,
            health: 439,
            level:14,
            mana:9,
            xp: generateXP(49, 51),
            evasion: 0.06,
            attackDamage: 75,
            fileName:'rootcrawler.jpeg',
            magicPower: 4,
            run_chance: 0.02,
            armor: 55,
            speed: 30,
            element:"bloom",
            magicResistance: 50,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Root Trap',
                    description: `Rootcrawler traps it's prey by coiling around it.`,
                    canEvade: true,
                    type: 'physical',
                    element:"bloom", 
                    damage:23,
                    mana_cost: 2,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("bloom",defender.element)
                        let stab = calculateSTAB("bloom",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Root Trap`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*23*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${attacker.name}** traps ${defender.name} by coiling around them causing ${damage} damage`)
                    }
                },{
                    cooldown: 0,
                    name: 'Silent Fangs',
                    description: `Blends into the roots of orld tree and suddenly strikes with it's sharp fangs`,
                    canEvade: false,
                    element:"bloom",
                    type: 'physical',
                    damage:0,
                    mana_cost: 3,
                    use: (attacker, defender) => {
                        let mod = calculateModifier("bloom",defender.element)
                        let stab = calculateSTAB("bloom",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Silent Fangs`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*23*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${attacker.name}** disappears among the roots and suddenly strikes ${defender.name} causing ${damage} damage`)
                 
                    },
    }
               
            ],
        })
    }
}
