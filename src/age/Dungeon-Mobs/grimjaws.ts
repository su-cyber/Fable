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
import { grimjawFin } from '../items/grimjawFin'




export class Grimjaws extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [
                "The Grimjaws managed to slip away into the murky depths, leaving behind only a chilling mist.",
                "As you deal the final blow to the Grimjaws, it vanishes into the dark waters, leaving you with a sense of unease.",
                "The Grimjaws writhes in pain before disappearing beneath the surface, leaving you to wonder if it will return."
            ],
            withDropMessages: [
                "With a final strike, you manage to tear the Grimjaw's fin from its mutated form.",
                "As the Grimjaws succumbs to its injuries, you pry its fin loose as a trophy of your victory.",
                "The Grimjaws lets out a haunting shriek as you claim its fin, a grim reminder of your triumph over the swamp's horrors."
            ]
        };
        
        
        
        
        
        
        
        
        

        await new Dropper([
            {
                item: grimjawFin,
                dropRate: 0.2,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Grimjaws({
            name: `Grimjaw ${emoji.WAVE}`,
            description:`A mutated mermaid-like creature with arms equipped with sharp claws and razor teeths, they can navigate the dark swamps with deadly precision and rip their prey to shreds before consuming them. They are said to emit mist that induces hallucinations.`,
            spawnRate: 0.35,
            health: 531,
            level:16,
            mana:10,
            xp: generateXP(58, 60),
            evasion: 0.075,
            attackDamage: 80,
            fileName:'grimjaws.jpeg',
            magicPower: 5,
            run_chance: 0.02,
            armor: 50,
            speed: 65,
            element:"wave",
            magicResistance: 40,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Rip Jaws',
                    description: `Rips the target into shreds with a relentless onslaught.`,
                    canEvade: true,
                    type: 'physical',
                    element:"wave", 
                    damage:35,
                    mana_cost: 3,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("wave",defender.element)
                        let stab = calculateSTAB("wave",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Rip Jaws`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*35*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${attacker.name}** showers ${defender.name} with a relentless onsalught of it's razor claws causing ${damage} damage`)
                    }
                },{
                    cooldown: 0,
                    name: 'Illusion Mist',
                    description: 'A skill that releases an illusionary mist',
                    canEvade: false,
                    type: 'buff',
                    element:"gale",
                    damage:0,
                    mana_cost: 7,
                    use: (attacker, defender) => {
                        attacker.evasion = 0.2

                        attacker.addLogMessage(
                            `${attacker.name} used Illusion Mist`,
                            `${attacker.name} releases a thick mist that induces illusions on ${defender.name} making it difficult to land attacks.`
                        )
                        
                       
                    },
                },
               
            ],
        })
    }
}
