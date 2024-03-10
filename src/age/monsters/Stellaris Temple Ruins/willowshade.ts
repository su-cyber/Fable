import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { calculateSTAB } from '../../../../commands/fight'
import lvl_modifier from '../../../utils/lvl_modifier'
import { emoji } from '../../../lib/utils/emoji'
import { calculateModifier } from '../../../../commands/fight'
import { spyrHorn } from '../../items/spyrHorn'
import { stun } from '../../effects/stun'



export class Willowshade extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [
                "The willowshade starts weeping tears of blood as it decays into nothingness.",
                "You watch as the many eyes of the willowshade close down as all it's leaves and bark wither away."
                ],
                withDropMessages: [
                    "After a harrowing battle against the Willowshade, you emerge victorious, breaking free from its paralyzing gaze. Amidst the tangled branches and weeping leaves, you find a piece of Willow Bark, its mystical properties evident even in your trembling hands.",
                    "With great effort, you overcome the Willowshade's despair-inducing gaze, pressing forward in your quest. Among the gnarled roots and tear-streaked branches, you discover a shard of Willow Bark, pulsating with otherworldly energy.",
                    "In a battle of wills, you resist the Willowshade's paralyzing gaze, striking it down with determination. Amidst the sorrowful cries and weeping branches, you uncover a fragment of Willow Bark, its potent essence promising newfound strength.",
                ],
        };
        
        
        
        
        

        await new Dropper([
            {
                item: spyrHorn,
                dropRate: 0.2,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Willowshade({
            name: `Willowshade ${emoji.BLOOM}`,
            description:`The Willowshade resembles a weeping willow tree growing on the swamp surface. it has multiple eyes in various parts of it's branches and bark all weeping tears of agony. The Willowshade's gaze is said to invoke extreme grief and despair causing temporary paralysis.`,
            spawnRate: 0.2,
            health: 439,
            level:14,
            mana:9,
            xp: generateXP(49, 51),
            evasion: 0.02,
            attackDamage: 75,
            fileName:'willowshade.jpeg',
            magicPower: 4,
            run_chance: 0.02,
            armor: 60,
            speed: 15,
            element:"bloom",
            magicResistance: 60,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Root Rush',
                    description: `Attacks with a barrage of roots`,
                    canEvade: true,
                    type: 'physical',
                    element:"bloom", 
                    damage:23,
                    mana_cost: 2,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("bloom",defender.element)
                        let stab = calculateSTAB("bloom",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Root Rush`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*23*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${attacker.name}** attacks ${defender.name} with a barrage of roots with deadly precision causing ${damage} damage`)
                    }
                },{
                    cooldown: 0,
                    name: 'Weeping Gaze',
                    description: 'A Gaze that stuns the enemy with grief and sorrow',
                    canEvade: false,
                    type: 'debuff',
                    element:"gale",
                    damage:0,
                    mana_cost: 6,
                    use: (attacker, defender) => {
                        const weepingGaze = attacker.scheduler.task
                        .id('willowShade_stun')
                        .all.effect(stun)
                        .turns(4)
                        .end(() => {
                            defender.removeEffect(stun)

                        })
                        .run(() =>
                        {}
                        )
                    
                    
                    
                    defender.applyEffect(weepingGaze)
                        attacker.addLogMessage(
                            `${attacker.name} used Weeping Gaze`,
                            `${attacker.name}'s multiple weeping eyes stare at ${defender.name} inducing extreme grief and sorrow temporarily.`
                        )
                        
                       
                    },
                },
               
            ],
        })
    }
}
