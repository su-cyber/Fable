import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { calculateSTAB } from '../../../../commands/fight'
import lvl_modifier from '../../../utils/lvl_modifier'
import { emoji } from '../../../lib/utils/emoji'
import { calculateModifier } from '../../../../commands/fight'
import { tidalgeistEssence } from '../../items/tidalgeistEssence'
import { whiperScale } from '../../items/whiperScale'




export class Whiper extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [
                "As you engage in combat with the Whiper, it suddenly slithers away into the White Lilacs, leaving behind a trail of blood and broken foliage.",
                "The Whiper recoils from your attack and swiftly retreats into the foliage, its venomous fangs bared in defiance.",
                "Despite your best efforts, the Whiper manages to evade capture, disappearing into the shadows of the White Lilacs.",
            ],
            withDropMessages: [
                "With a decisive blow, you sever the Whiper's head, its lifeless body collapsing to the ground as you claim its glittering scale as a trophy.",
                "In a fierce battle, you overpower the Whiper, its blood staining the White Lilacs as you tear a scale from its writhing form.",
                "With a final, brutal strike, you crush the Whiper's skull, its body convulsing in its death throes as you extract a pristine scale from its limp corpse.",
            ],
        };
        
        
        
        
        

        

        await new Dropper([
            {
                item: whiperScale,
                dropRate: 0.2,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Whiper({
            name: `Whiper ${emoji.VENOM}`,
            description:`A venomous serpent that camouflages itself by taking on the appearance of the White Lilacs that grow on Spezia Cliffs. They tuck away their tails into the earth to avoid suspicion and launch themselves towards unsuspecting travellers.`,
            spawnRate: 0.4,
            health: 580,
            level:17,
            mana:11,
            xp: generateXP(61, 64),
            evasion: 0.075,
            attackDamage: 1,
            fileName:'whiper.jpeg',
            magicPower: 75,
            run_chance: 0.02,
            armor: 40,
            speed: 75,
            element:"venom",
            magicResistance: 62,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Refreshing Scent',
                    description: `Emits a fresh sweet scent which is toxic`,
                    canEvade: true,
                    type: 'magical',
                    element:"venom", 
                    damage:35,
                    mana_cost: 3,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("venom",defender.element)
                        let stab = calculateSTAB("venom",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Refreshing Scent`)
                        defender.takeDamage
                            .magical(attacker.magicPower*35*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `${attacker.name} emits a sweet and refreshing but highly toxic scent into the air breathing which causes ${damage} damage to ${defender.name}`)
                    }
                },{
                    cooldown: 0,
                    name: 'Toxic Volley',
                    description: `Spits a volley of highly corrosive venom`,
                    canEvade: true,
                    type: 'magical',
                    element:"venom", 
                    damage:45,
                    mana_cost: 4,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("venom",defender.element)
                        let stab = calculateSTAB("venom",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Toxic Volley`)
                        defender.takeDamage
                            .magical(attacker.magicPower*45*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${attacker.name}** unleashes a volley of highly corrosive venom at ${defender.name} causing ${damage} damage`)
                    }
                }
               
            ],
        })
    }
}
