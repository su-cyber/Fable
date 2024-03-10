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
import { bloodGlobule } from '../../items/bloodGlobule'
import { luminarayNeedle } from '../../items/luminarayNeedle'



export class Luminaray extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [
                "The Luminaray effortlessly glides away, its radiant form disappearing into the depths of the Orld Husk, leaving you in awe of its elusive nature.",
                "You watch in frustration as the Luminaray evades your attacks with graceful maneuvers, disappearing into the darkness of the Orld Husk, leaving only a trail of shimmering light in its wake.",
                "Despite your efforts to capture it, the Luminaray swiftly disappears into the shadows of the Orld Husk, its luminous presence fading into the gloom, leaving you empty-handed.",
            ],
            withDropMessages: [
                "With a well-aimed strike, you defeat the Luminaray, causing its glowing form to falter before sinking lifelessly into the depths. Among the radiant remains, you find a sharp Luminaray Needle, still pulsating with residual energy.",
                "In a fierce battle, you emerge victorious over the Luminaray, its once-glowing body now lying motionless amidst the shadows. Among the remnants of its luminous aura, you discover a Luminaray Needle, a testament to your triumph over this elusive creature.",
                "After a relentless pursuit, you manage to vanquish the Luminaray, its luminous glow dimming as it succumbs to defeat. Amidst the fading light, you uncover a Luminaray Needle, gleaming with a faint, ethereal glow.",
            ],
        };
        
        
        

        await new Dropper([
            {
                item: luminarayNeedle,
                dropRate: 0.2,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Luminaray({
            name: `Luminaray ${emoji.LIGHT}`,
            description: "luminarays are large luminous sting rays that glide along the shades of the Orld Husk, they use their luminiscence to mark their territory and hunt with their glowing needle in the tail.",
            spawnRate: 0.4,
            health: 276,
            level:13,
            mana:8,
            xp: generateXP(44, 46),
            evasion: 0.075,
            attackDamage: 2,
            fileName:'luminaray.jpeg',
            magicPower: 55,
            run_chance: 0.02,
            armor: 32,
            speed: 50,
            element:"light",
            magicResistance: 35,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Bright Sting',
                    description: `A deadly attack with it's spyr infused sting`,
                    canEvade: true,
                    type: 'magical',
                    element:"light", 
                    damage:23,
                    mana_cost: 2,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("light",defender.element)
                        let stab = calculateSTAB("light",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Bright Sting`)
                        defender.takeDamage
                            .magical(attacker.magicPower*23*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${attacker.name}**'s spyr infused sting penetrates deep into ${defender.name} causing them to lose ${damage} HP`)
                    }
                },{
                    cooldown: 0,
                    name: 'Aurora Guard',
                    description: 'A skill that creates a protective shield of light around the user.',
                    canEvade: false,
                    type: 'buff',
                    element:"light",
                    damage:0,
                    mana_cost: 6,
                    use: (attacker, defender) => {
                        attacker.armor = 1.15*attacker.armor
                        attacker.magicResistance = 1.15*attacker.magicResistance
            
            
                        attacker.addLogMessage(
                            `${attacker.name} used Aurora Guard`,
                            `A protective shield of light appears around ${attacker.name} and increases defenses by 15%`
                        )
                        
                       
                    },
                },
               
            ],
        })
    }
}
