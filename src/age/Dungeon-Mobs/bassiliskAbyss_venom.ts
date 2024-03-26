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
import { stun } from '../effects/stun'
import { bassiliskScale } from '../items/bassiliskScale'




export class BassiliskVenom extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [
                "The Bassilisk of the Abyss, sensing its imminent defeat, slithers back into the depths of the swamp, leaving only a sense of dread in its wake.",
                "As your final blow lands, the Bassilisk of the Abyss recoils in pain before retreating into the shadows, its menacing presence lingering in the air.",
                "With a menacing hiss, the Bassilisk of the Abyss retreats into the murky depths, its hypnotic gaze haunting your thoughts long after it's gone."
            ],
            withDropMessages: [
                "With a triumphant strike, you manage to collect a scale from the defeated Bassilisk of the Abyss, a testament to your victory over the swamp's most feared predator.",
                "As the Bassilisk of the Abyss falls, you seize the opportunity to claim one of its scales, imbued with the creature's deadly essence.",
                "With a sense of relief, you retrieve a scale from the defeated Bassilisk of the Abyss, knowing that you have overcome the terror that once held sway over the swamp."
            ]
        };
        
        
        
        
        
        
        
        
        
        

        await new Dropper([
            {
                item: bassiliskScale,
                dropRate: 0.3,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new BassiliskVenom({
            name: `Bassilisk of Abyss ${emoji.VENOM}`,
            description:`A collosal prehistoric snake-like Spyrith that rules the swamp and is feared by the lizardmen. It's scales are as hard as the toughest of steel and carries deadly toxic breath. it's eyes have the ability to paralyse it's prey through a mere look. The creature is so fearsome that whoever faces it, looses their will to fight.`,
            spawnRate: 0.35,
            health: 805,
            level:17,
            mana:11,
            xp: generateXP(102, 105),
            evasion: 0.075,
            attackDamage: 75,
            fileName:'bassilisk_venom.jpeg',
            magicPower: 85,
            run_chance: 0.02,
            armor: 75,
            speed: 5,
            element:"venom",
            magicResistance: 60,
            passive_skills:[
                {
                    cooldown: 0,
                    name: 'Intimidation',
                    description: 'Intimidates the target',
                    canEvade: false,
                    type: 'passive',
                    element:"normal", 
                    damage:0,
                    mana_cost: 0,
                    use: (attacker, defender) => {
                        
                            defender.attackDamage -= 0.1*defender.attackDamage
                            defender.magicPower -= 0.1*defender.magicPower
            
                            attacker.addLogMessage(
                                `${attacker.name} has Intimidation`,
                                `${defender.name} is intimidated by the presence of the King of Abyss losing their will to fight.`
                            )
                        
                        
                       
                    },
                }
            ],
            skills: [
                {
                    cooldown: 0,
                    name: 'Venom Breath',
                    description: `Releases a gust of toxic breath`,
                    canEvade: true,
                    type: 'magical',
                    element:"venom", 
                    damage:35,
                    mana_cost: 3,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("venom",defender.element)
                        let stab = calculateSTAB("venom",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Venom Breath`)
                        defender.takeDamage
                            .magical(attacker.magicPower*35*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${attacker.name}** sprays a gust of toxic breath on ${defender.name} causing ${damage} damage`)
                    }
                },{
                    cooldown: 0,
                    name: 'Serpent Gaze',
                    description: 'A gaze that stuns the enemy.',
                    canEvade: false,
                    type: 'debuff',
                    element:"venom",
                    damage:0,
                    mana_cost: 7,
                    use: (attacker, defender) => {
                        const serpentGaze = attacker.scheduler.task
                        .id('bassilisk_stun')
                        .all.effect(stun)
                        .turns(4)
                        .end(() => {
                            defender.removeEffect(stun)

                        })
                        .run(() =>
                        {}
                        )
                    
                    
                    
                    defender.applyEffect(serpentGaze)
                        attacker.addLogMessage(
                            `${attacker.name} used Serpent Gaze`,
                            `${attacker.name}'s deadly reptilian eye stares at ${defender.name} paralyzing them temporarily.`
                        )
                        
                       
                    },
                },{
                    cooldown: 0,
                    name: 'Suffocate',
                    description: `Wraps the target and suffocates them and breaks their armour`,
                    canEvade: true,
                    type: 'physical',
                    element:"normal", 
                    damage:25,
                    mana_cost: 5,
                    use: (attacker, defender) =>{
                        defender.armor -= 16
                        attacker.addLogMessage(`**${attacker.name}** used Suffocate`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*25*lvl_modifier(attacker.level))
                            .run(damage => `**${attacker.name}** coils around ${defender.name} suffocating them and breaking their armour causing ${damage} damage and reducing endurance by 30%`)
                    }
                }
               
            ],
        })
    }
}
