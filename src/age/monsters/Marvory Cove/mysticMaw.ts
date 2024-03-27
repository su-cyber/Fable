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
import { mawCrystal } from '../../items/mawCrystal'




export class Mysticmaw extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [
                'The Mysticmaw swiftly retreats into the sandy depths, leaving you with only the echoes of its menacing growls.',
                'As you approach, the Mysticmaw unleashes a burst of sand on your face, forcing you to retreat as it disappears into the darkness below.',
                'You lunge for the Mysticmaw, but it deftly slips away, leaving you grasping at empty air.'
            ],
            withDropMessages: [
                `With a fierce battle cry, you emerge victorious clutching a Crystal from it's mouth.`,
                'After a fierce struggle, you manage to overpower the Mysticmaw, wrenching its jaws open to claim the glowing Maw Crystal within.',
                `As the Mysticmaw lunges at you, you sidestep its attack and strike ripping it's jaws open and snatching the Maw Crystal from its gaping maw in one swift motion.`
            ],
        }
        
        

        

        await new Dropper([
            {
                item: mawCrystal,
                dropRate: 0.2,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Mysticmaw({
            name: `Mysticmaw ${emoji.TERRA}`,
            description:`Mysticmaw is a subterranean creature that emerges from the sandy floor of the cove. Its gaping maw is lined with magical crystals.`,
            spawnRate: 0.4,
            health: 360,
            level:16,
            mana:10,
            xp: generateXP(48, 50),
            evasion: 0.085,
            attackDamage: 60,
            fileName:'mysticmaw.jpeg',
            magicPower: 1,
            run_chance: 0.02,
            armor: 42,
            speed: 65,
            element:"terra",
            magicResistance: 42,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Crystal Bite',
                    description: `Mysticmaw bites with it's huge maw laced with sharp crystals`,
                    canEvade: true,
                    type: 'physical',
                    element:"terra", 
                    damage:35,
                    mana_cost: 3,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("terra",defender.element)
                        let stab = calculateSTAB("terra",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Crystal Bite`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*35*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `${attacker.name} bites ${defender.name} with it's huge maw laced with sharp crystals causing ${damage} damage`)
                    }
                },{
                    cooldown: 0,
                    name: 'Burrow Surge',
                    description: 'Burrows into the sand and suddenly attacks',
                    canEvade: true,
                    type: 'physical',
                    element:"terra", 
                    damage:45,
                    mana_cost: 4,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("terra",defender.element)
                        let stab = calculateSTAB("terra",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Burrow Surge`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*45*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${attacker.name}** burrows into the sand and suddenly lunges at ${defender.name} from a blind spot causing ${damage} damage`)
                    }
                }
               
            ],
        })
    }
}
