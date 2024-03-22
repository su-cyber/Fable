import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { calculateSTAB } from '../../../../commands/fight'
import lvl_modifier from '../../../utils/lvl_modifier'
import { emoji } from '../../../lib/utils/emoji'
import { calculateModifier } from '../../../../commands/fight'
import { spyrHorn } from '../../items/spyrHorn'
import { bogSecretion } from '../../items/bogSecretion'



export class Bogslither extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [
                "The Bogslither disappears into the murky depths of the swamp before you can land a decisive blow, leaving you to wonder if it was ever truly there.",
                "In a blur of movement, the Bogslither vanishes amidst the dense foliage of the swamp, leaving you standing alone amidst the muck and mire.",
                "As you move in to strike, the Bogslither melts away into the shadows of the swamp, leaving behind nothing but the faint echo of its sinister hiss.",
            ],
            withDropMessages: [
                "After a grueling battle, you emerge victorious over the Bogslither, its slimy form writhing in agony as it succumbs to your relentless assault. Amidst the mud and moss, you find a viscous Bog Secretion, its pungent aroma filling the air.",
                "With a final, decisive blow, you defeat the Bogslither, its slimy body collapsing into a heap of muck and mud. Among the wreckage, you discover a sticky Bog Secretion, pulsating with latent energy.",
                "In a fierce struggle, you overcome the Bogslither, its writhing form finally stilling as it meets its demise. Among the tangled roots and murky waters, you uncover a Bog Secretion, its murky surface swirling with hidden secrets.",
            ],
        };
        
        
        
        
        
        

        await new Dropper([
            {
                item: bogSecretion,
                dropRate: 0.2,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Bogslither({
            name: `Bogslither ${emoji.VENOM}`,
            description:`The Bogslither is a large slug covered entirely with mud and moss which helps it to easily camouflage into the swampy lands and hunt it's prey by catching it by sudden surprise.`,
            spawnRate: 0.45,
            health: 484,
            level:15,
            mana:9,
            xp: generateXP(54, 56),
            evasion: 0.06,
            attackDamage: 2,
            fileName:'bogslither.jpeg',
            magicPower: 90,
            run_chance: 0.02,
            armor: 45,
            speed: 30,
            element:"venom",
            magicResistance: 60,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Slug Toxin',
                    description: `Poisons the target with a toxic sludge`,
                    canEvade: true,
                    type: 'magical',
                    element:"venom", 
                    damage:35,
                    mana_cost: 2,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("venom",defender.element)
                        let stab = calculateSTAB("venom",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Slug Toxin`)
                        defender.takeDamage
                            .magical(attacker.magicPower*35*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${attacker.name}** throws toxic sludge into ${defender.name} causing ${damage} damage`)
                    }
                },{
                    cooldown: 0,
                    name: 'Swamp Blend',
                    description: 'Blends into the swamp and disappears',
                    canEvade: false,
                    type: 'buff',
                    element:"venom",
                    damage:0,
                    mana_cost: 7,
                    use: (attacker, defender) => {
                        attacker.evasion = 0.15

                        attacker.addLogMessage(
                            `${attacker.name} used Swamp Blend`,
                            `${attacker.name} blends into the swamp making it harder to detect increasing the Boglither's evasion`
                        )
                        
                       
                    },
                },
               
            ],
        })
    }
}
