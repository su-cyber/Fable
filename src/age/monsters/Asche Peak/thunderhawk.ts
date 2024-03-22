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



export class Thunderhawk extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Thunderhawk managed to escape before you could finish it.'],
            withDropMessages: ['As you defeat the Thunderhawk, you manage to retrieve a Talon from its electrified body.'],
        }

        await new Dropper([
            {
                item: staticTalon,
                dropRate: 0.2,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Thunderhawk({
            name: `Thunderhawk ${emoji.VOLT}`,
            description:`ThunderHawks are enormous raptors with huge wings, sharp talons and beak. Each flap of their electrifying wings cracks with thunder and a group of ThunderHawks can bring about a thunderstorm in their wake.`,
            spawnRate: 0.25,
            health: 355,
            level:12,
            mana:7,
            xp: generateXP(70, 80),
            evasion: 0.065,
            attackDamage: 30,
            fileName:'thunderhawk.jpeg',
            magicPower: 53,
            run_chance: 0.02,
            armor: 35,
            speed: 40,
            element:"volt",
            magicResistance: 35,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Volt Dive',
                    description: `A dive ariel attack covered in electricity`,
                    canEvade: true,
                    type: 'physical',
                    element:"volt", 
                    damage:25,
                    mana_cost: 2,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("volt",defender.element)
                        let stab = calculateSTAB("volt",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Volt Dive`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*25*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${attacker.name}** covers itself in electricity and crashes into ${defender.name} causing them to lose ${damage} HP`)
                    }
                },{
                    cooldown: 0,
                    name: 'Charged Rupture',
                    description: 'Blasts deadly electrical waves into the air',
                    canEvade: true,
                    type: 'magical',
                    element:"volt", 
                    damage:45,
                    mana_cost: 4,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("volt",defender.element)
            let stab = calculateSTAB("volt",attacker.element)
            attacker.addLogMessage(`**${attacker.name}** used Charged Rupture`)
            defender.takeDamage
                .magical((attacker.magicPower*45)*mod*stab*lvl_modifier(attacker.level))
                .run(damage => `**${defender.name}** lost ${damage} HP by destructive electrical blasts screeching through the air`)
                    }
                },
               
            ],
        })
    }
}
