import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../classes'
import { Dropper } from '../dropper'
import generateXP from '../../utils/generateXP'
import { calculateSTAB } from '../../../commands/fight'
import lvl_modifier from '../../utils/lvl_modifier'
import { emoji } from '../../lib/utils/emoji'
import { calculateModifier } from '../../../commands/fight'
import { Nebula } from '../flora/Dungeon Flora/nebulaFlower'
import { mosscaleTooth } from '../items/mosscale_tooth'
import { murkEssence } from '../items/murkEssence'




export class Murkwraithe extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [
                "The Murkwraithe, sensing defeat, retreats back into the murky depths of the swamp, leaving only ripples in its wake.",
                "As your final blow lands, the Murkwraithe crumbles into the muck, its essence dispersing into the swamp.",
                "With a groan, the Murkwraithe dissipates into the swamp, leaving you to ponder its mysterious origins."
            ],
            withDropMessages: [
                "With a victorious strike, you extract a vial of Murk essence from the defeated Murkwraithe, its power now yours to wield.",
                "As the Murkwraithe falls, you collect its essence, feeling the raw power of the swamp coursing through it.",
                "With a triumphant roar, you claim the Murk essence from the defeated Murkwraithe, a potent reminder of your victory over the swamp's guardian."
            ]
        };
        
        
        
        
        
        
        
        
        
        

        await new Dropper([
            {
                item: murkEssence,
                dropRate: 0.2,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Murkwraithe({
            name: `Murkwraithe ${emoji.TERRA}`,
            description:`A wraithe made out of swamp and mud manifested by the condensed spyr in the region. It is a collosal golem-like figure which lies dormant in the swamp and only awakens when a creature of high spyr enters it's zone.`,
            spawnRate: 0.35,
            health: 531,
            level:16,
            mana:10,
            xp: generateXP(58, 60),
            evasion: 0.075,
            attackDamage: 5,
            fileName:'murkwraithe.jpeg',
            magicPower: 80,
            run_chance: 0.02,
            armor: 50,
            speed: 35,
            element:"terra",
            magicResistance: 70,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Devouring Swamp',
                    description: `A skill that uses the swamp itself to devour the target`,
                    canEvade: true,
                    type: 'magical',
                    element:"terra", 
                    damage:23,
                    mana_cost: 2,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("terra",defender.element)
                        let stab = calculateSTAB("terra",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Devouring Swamp`)
                        defender.takeDamage
                            .magical(attacker.magicPower*23*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `The ground beneath ${defender.name} trembles before getting devoured by the swamp loosing ${damage} HP`)
                    }
                },{
                    cooldown: 0,
                    name: 'Mud Slide',
                    description: 'Crushes the target with a powerful torrent of mud',
                    canEvade: true,
                    type: 'magical',
                    element:"terra", 
                    damage:23,
                    mana_cost: 2,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("terra",defender.element)
                        let stab = calculateSTAB("terra",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Mud Slide`)
                        defender.takeDamage
                            .magical(attacker.magicPower*23*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${attacker.name}** summons a powerful torrent to crush ${defender.name} causing ${damage} damage`)
                    }
                }
               
            ],
        })
    }
}
