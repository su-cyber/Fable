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
import { rockmaulerShard } from '../../items/rockmaulerShard'



export class Rockmauler extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [
                "The Rockmauler manages to evade your attacks with surprising agility, disappearing into the dense foliage before you can deliver the final blow.",
                "As you attempt to subdue the Rockmauler, it lets out a primal roar before darting away with incredible speed, leaving you standing amidst the wreckage of your surroundings.",
                "In a swift and unexpected maneuver, the Rockmauler slips past your defenses and vanishes into the shadows, leaving only the echoes of its menacing growls echoing through the forest.",
            ],
            withDropMessages: [
                "After a fierce battle, you emerge victorious over the Rockmauler, its crystalline knuckles shattering into shards as it collapses to the ground, blood and rock dust mingling on the forest floor. Among the wreckage, you find a Rockmauler's Shard, glinting with the light of the fallen beast.",
                "With a final, brutal blow, you bring down the Rockmauler, its rocky exterior cracking and splintering as it crashes to the ground in a cloud of dust and debris. Amidst the carnage, you uncover a Rockmauler's Shard, still pulsating with latent energy.",
                "In a savage display of strength, you overcome the Rockmauler, its crystalline knuckles breaking apart with a sickening crunch as it falls lifeless to the ground, its blood mixing with shards of rock. Among the rubble, you find a Rockmauler's Shard, its surface shimmering with the power of the fallen beast.",
            ],
        };
        
        
        
        
        
        

        await new Dropper([
            {
                item: rockmaulerShard,
                dropRate: 0.2,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Rockmauler({
            name: `Rockmauler ${emoji.TERRA}`,
            description:`Huge Gorilla-like creatures made of rock-hard skin and spyr infused crystalline knucles and have crystals protruding from their backs. They are great climbers and acrobats who reside in different parts of the huge Husk majorly divided into tribes, each tribe has a different color of crystals in their knuckles and backs.`,
            spawnRate: 0.2,
            health: 737,
            level:16,
            mana:9,
            xp: generateXP(89, 92),
            evasion: 0.06,
            attackDamage: 115,
            fileName:'rockmauler_red.jpeg',
            magicPower: 5,
            run_chance: 0.02,
            armor: 70,
            speed: 30,
            element:"terra",
            magicResistance: 65,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Giga Thrust',
                    description: `A strong thrust with it's spyr imbued knuckles that shatters even the ground below`,
                    canEvade: true,
                    type: 'physical',
                    element:"terra", 
                    damage:23,
                    mana_cost: 2,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("terra",defender.element)
                        let stab = calculateSTAB("terra",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Giga Thrust`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*23*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${attacker.name}** condenses spyr into it's crystalline knuckles and thrusts them into ${defender.name} in a fury causing ${damage} damage`)
                    }
                },{
                    cooldown: 0,
                    name: 'Kong Beat',
                    description: `rockmauler lets out a wild roar in a fit of rage boosting it's power and defense`,
                    canEvade: false,
                    type: 'buff',
                    element:"terra",
                    damage:0,
                    mana_cost: 6,
                    use: (attacker, defender) => {
                        attacker.attackDamage = 1.25*attacker.attackDamage
                        attacker.armor = 1.25*attacker.armor

                        attacker.addLogMessage(
                            `${attacker.name} used Kong Beat`,
                            `${attacker.name} lets out a roar in a fit of rage increasing it's attackpower and endurance by 25%`
                        )
                        
                       
                    },
                },
               
            ],
        })
    }
}
