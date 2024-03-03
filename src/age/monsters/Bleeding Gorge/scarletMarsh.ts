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



export class scarletMarsh extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [
                'The Scarlet Marsh remains rooted in place, its defenses proving too formidable for you to extract anything.',
                'You observe the Scarlet Marsh from a distance as it decays into a mass of rotten wood'
            ],
            withDropMessages: [
                'After defeating the Scarlet Marsh, you extract a sample of bloodwood resin from its intricate network of roots.',
                'You carefully collect bloodwood resin from the roots of the defeated Scarlet Marsh, its immobility aiding in the process.',
                'As the Scarlet Marsh succumbs to your attacks, you gather bloodwood resin from its stationary form, taking advantage of its rooted position.'
            ],
        };
        
        

        await new Dropper([
            {
                item: staticTalon,
                dropRate: 0.2,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new scarletMarsh({
            name: `Scarlet Marsh ${emoji.BLOOM}`,
            description:`The Scarlet Marsh are carnivorous mangroves that can be found in the majority of bleeding gorge, their long roots trap their prey and slowly suck away the blood overtime.`,
            spawnRate: 0.4,
            health: 396,
            level:13,
            mana:8,
            xp: generateXP(46, 48),
            evasion: 0.015,
            attackDamage: 60,
            fileName:'scarletmarsh.jpeg',
            magicPower: 50,
            run_chance: 0.02,
            armor: 45,
            speed: 10,
            element:"bloom",
            magicResistance: 36,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Root Grip',
                    description: `Scarlet Marsh Grips the enemy with it's strong roots and crushes them`,
                    canEvade: true,
                    type: 'physical',
                    element:"bloom", 
                    damage:23,
                    mana_cost: 2,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("bloom",defender.element)
                        let stab = calculateSTAB("bloom",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Root Grip`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*23*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${attacker.name}** binds ${defender.name} with it's strong roots crushing them causing ${damage} damage`)
                    }
                },{
                    cooldown: 0,
                    name: 'Blood Mist',
                    description: `Releases a toxic mist into the air`,
                    canEvade: false,
                    element:"wave",
                    type: 'magical',
                    damage:0,
                    mana_cost: 3,
                    use: (attacker, defender) => {
                        let mod = calculateModifier("wave",defender.element)
                        let stab = calculateSTAB("wave",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Blood Mist`)
                        defender.takeDamage
                            .magical(attacker.attackDamage*23*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${attacker.name}** sprays a deadly crimson mist into the air intoxicating ${defender.name} causing ${damage} damage`)
                   
                    },
    }
               
            ],
        })
    }
}
