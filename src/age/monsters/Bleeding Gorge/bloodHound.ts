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



export class bloodHound extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [
                'The Bloodhound evades your grasp, its crimson form blending seamlessly with the shadows.',
                'With a menacing snarl, the Bloodhound vanishes into the depths of the gorge, leaving only the echo of its growl.',
                'As you move to strike, the Bloodhound leaps away with unnatural speed, disappearing like a fleeting nightmare.'
            ],
            withDropMessages: [
                `Amidst the carnage, you seize it's bloodstained hide from the fallen Bloodhound, a trophy of your victory.`,
                'With a victorious roar, you claim the bloodstained hide from the defeated Bloodhound, its crimson coat now a testament to your triumph.',
                `Overcoming the fierce predator, you wrench it's bloodstained hide from its body, a token of your dominance over the savage beast.`
            ],
        };
        
        
        

        await new Dropper([
            {
                item: bloodStainedHide,
                dropRate: 0.2,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new bloodHound({
            name: `Bloodhound ${emoji.WAVE}`,
            description:`The Bloodhound is a large predator, with sleek, muscular features and a bloody deep crimson coat. Its eyes glow with an intense red light, and its senses are finely attuned to the scent and presence of blood. The Bloodhound is a relentless tracker and a feared predator of the Bleeding Gorge.`,
            spawnRate: 0.2,
            health: 439,
            level:14,
            mana:9,
            xp: generateXP(49, 51),
            evasion: 0.075,
            attackDamage: 70,
            fileName:'bloodhound.jpeg',
            magicPower: 5,
            run_chance: 0.02,
            armor: 45,
            speed: 50,
            element:"wave",
            magicResistance: 44,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Carnage Assault',
                    description: `The Hound mutilates the enemy with fast feral attacks laced with toxic blood`,
                    canEvade: true,
                    type: 'physical',
                    element:"wave", 
                    damage:35,
                    mana_cost: 3,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("wave",defender.element)
                        let stab = calculateSTAB("wave",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Carnage Assault`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*23*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${attacker.name}** assaults ${defender.name} with it's powerful claws and fangs laced with toxic blood causing ${damage} damage`)
                    }
                },{
                    cooldown: 0,
                    name: 'Blood Lust',
                    description: `boosts attack lowers enemy defense`,
                    canEvade: false,
                    element:"wave",
                    type: 'buff',
                    damage:0,
                    mana_cost: 6,
                    use: (attacker, defender) => {
                        attacker.attackDamage += 13
                        attacker.addLogMessage(
                            `${attacker.name} used Blood Lust`,
                            `${attacker.name} radiates it's bloodlust boosting it's attack power and striking fear into it's prey`
                        )
                    },
    }
               
            ],
        })
    }
}
