import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../classes'
import { Dropper } from '../dropper'
import generateXP from '../../utils/generateXP'
import { goldenTelescope } from '../items/goldenTelescope'
import { calculateSTAB } from '../../../commands/fight'
import lvl_modifier from '../../utils/lvl_modifier'
import { emoji } from '../../lib/utils/emoji'
import { calculateModifier } from '../../../commands/fight'
import { carapaceShard } from '../items/carapaceShard'


export class stoneCarver extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [`The Stonecarver crumbled into dust before you could claim anything`],
            withDropMessages: [`In the aftermath of the battle, you discover a fragment of the Stonecarver's hardened body.`],
        }

        await new Dropper([
            {
                item: carapaceShard,
                dropRate: 0.5,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new stoneCarver({
            name: `Hydragon ${emoji.WAVE}`,
            description:`The Stonecarver Crawler is a centipede-like creature that navigates the lakebed with its numerous legs. Its shell bears the appearance of a smooth stone when viewed from above, camouflaging it perfectly with the surroundings.`,
            spawnRate: 0.5,
            health: 355,
            level:12,
            mana:7,
            xp: generateXP(70, 80),
            evasion: 0.067,
            attackDamage: 73,
            fileName:'stonecarver.jpeg',
            magicPower: 5,
            run_chance: 0.02,
            armor: 25,
            speed: 60,
            element:"wave",
            magicResistance: 30,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Shard Slice',
                    description: `A slice from it's zazor sharp shards in the body`,
                    canEvade: true,
                    type: 'physical',
                    element:"wave", 
                    damage:23,
                    mana_cost: 2,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("wave",defender.element)
                        let stab = calculateSTAB("wave",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Shard Slice`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*23*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${defender.name}** lost ${damage} HP by a razor cut by the Stonecarver's shards`)
                    }
                },{
                    cooldown: 0,
                    name: 'Stonecarver Slash',
                    description: `Slahes the enemy with it's sharp wave imbued pincers`,
                    canEvade: true,
                    type: 'physical',
                    element:"wave", 
                    damage:55,
                    mana_cost: 4,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("wave",defender.element)
            let stab = calculateSTAB("wave",attacker.element)
            attacker.addLogMessage(`**${attacker.name}** used Stonecarver Slash`)
            defender.takeDamage
                .physical((attacker.attackDamage*55)*mod*stab*lvl_modifier(attacker.level))
                .run(damage => `**${defender.name}** lost ${damage} HP by being slashed by the wave imbued Stonecarver's pincers`)
                    }
                },
               
            ],
        })
    }
}
