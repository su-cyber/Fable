import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { calculateSTAB } from '../../../../commands/fight'
import lvl_modifier from '../../../utils/lvl_modifier'
import { emoji } from '../../../lib/utils/emoji'
import { calculateModifier } from '../../../../commands/fight'
import { Nebula } from '../../flora/Dungeon Flora/nebulaFlower'
import { mosscaleTooth } from '../../items/mosscale_tooth'
import { murkEssence } from '../../items/murkEssence'
import { tidalgeistEssence } from '../../items/tidalgeistEssence'




export class Tidalgeist extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [
                'The misty cove churns with the Tidalgeist\'s departure, leaving behind a trail of swirling water and dissipating fog.',
                'With a haunting whisper, the Tidalgeist fades into the mist, its watery form vanishing from sight.',
                'You watch in awe as the Tidalgeist manipulates the water and fog, disappearing into the depths with eerie grace.',
                'A spectral cry echoes through the cove as the Tidalgeist retreats, leaving behind a shroud of mist and mystery.',
                'In a whirl of mist and spray, the Tidalgeist slips away, leaving only ripples in its wake.'
            ],
            withDropMessages: [
                'After a harrowing battle, you emerge victorious and collect the ethereal Tidalgeist Essence, shimmering with mystical energy.',
                'With a focused strike, you capture the elusive Tidalgeist Essence, harnessing its power for your own.',
                'In the chaos of battle, you seize the opportunity to claim the shimmering Tidalgeist Essence, a token of your triumph.',
                'As the Tidalgeist fades from existence, you harvest its essence, feeling the surge of power contained within the mystical Tidalgeist Essence.',
                'With determination, you gather the dissipating form of the Tidalgeist, capturing its essence in the radiant Tidalgeist Essence.'
            ],
        }
        
        
        
        

        

        await new Dropper([
            {
                item: tidalgeistEssence,
                dropRate: 0.2,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Tidalgeist({
            name: `Tidalgeist ${emoji.WAVE}`,
            description:`Tidalgeist is a water spirit that materializes in the misty spray of the cove. It can manipulate water and fog to its advantage.`,
            spawnRate: 0.3,
            health: 580,
            level:17,
            mana:11,
            xp: generateXP(61, 64),
            evasion: 0.085,
            attackDamage: 1,
            fileName:'tidalgeist.jpeg',
            magicPower: 120,
            run_chance: 0.02,
            armor: 12,
            speed: 65,
            element:"wave",
            magicResistance: 55,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Aqua Manipulation',
                    description: `manipulates water to do it's bidding`,
                    canEvade: true,
                    type: 'magical',
                    element:"wave", 
                    damage:35,
                    mana_cost: 3,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("wave",defender.element)
                        let stab = calculateSTAB("wave",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Aqua Manipulation`)
                        defender.takeDamage
                            .magical(attacker.magicPower*35*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `${attacker.name} manipulates the waters of the cove unleashing devastating jets of water on ${defender.name} causing ${damage} damage`)
                    }
                },{
                    cooldown: 0,
                    name: 'Misty Torrent',
                    description: `unleashes torrent of magical mist`,
                    canEvade: true,
                    type: 'magical',
                    element:"wave", 
                    damage:45,
                    mana_cost: 4,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("wave",defender.element)
                        let stab = calculateSTAB("wave",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Misty Torrent`)
                        defender.takeDamage
                            .magical(attacker.magicPower*45*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${attacker.name}** unleashes a torrent of corrsive mist at ${defender.name} causing ${damage} damage`)
                    }
                }
               
            ],
        })
    }
}
