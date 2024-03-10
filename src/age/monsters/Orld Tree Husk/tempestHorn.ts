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
import { spyrHorn } from '../../items/spyrHorn'



export class Tempesthorn extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [
                "The Tempesthorn bellows in defiance, its massive horn crackling with pent-up energy as it charges away into the dense foliage of the forest, leaving destruction in its wake.",
                "Despite your best efforts to subdue it, the Tempesthorn unleashes a deafening roar before vanishing into the depths of the wilderness, its formidable presence lingering in the air.",
                "As you engage the Tempesthorn in combat, it unleashes a powerful charge that sends shockwaves through the surrounding landscape, causing the earth to tremble as it retreats into the shadows of the forest.",
            ],
            withDropMessages: [
                "After a grueling battle, you emerge victorious over the Tempesthorn, its mighty horn shattering upon impact as it crashes to the ground. Among the splintered remains, you find a Spyr Horn, pulsating with latent energy.",
                "With a final, decisive blow, you bring down the Tempesthorn, its formidable horn cracking under the force of your assault. Amidst the wreckage, you discover a Spyr Horn, still resonating with the power of its former owner.",
                "In a display of strength and skill, you overcome the Tempesthorn, its massive horn snapping as it falls to the ground in defeat. Among the debris, you uncover a Spyr Horn, its surface shimmering with the stored energy of the beast.",
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
        return new Tempesthorn({
            name: `Tempesthorn ${emoji.GALE}`,
            description:`Enormous single horned creatures with a tough exoskeleton. They store spyr in their horns and are fierce territorial beasts, the size of their horn resembles the amount of spyr stored in them and the strength of the tempesthorn. A single charge from a tempesthorn can flatten multiple trees at once.`,
            spawnRate: 0.2,
            health: 439,
            level:14,
            mana:9,
            xp: generateXP(49, 51),
            evasion: 0.06,
            attackDamage: 4,
            fileName:'tempesthorn.jpeg',
            magicPower: 85,
            run_chance: 0.02,
            armor: 45,
            speed: 30,
            element:"gale",
            magicResistance: 50,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Tempest Charge',
                    description: `Charges the enemy with a massive spyr horn of gale energy`,
                    canEvade: true,
                    type: 'magical',
                    element:"gale", 
                    damage:23,
                    mana_cost: 2,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("gale",defender.element)
                        let stab = calculateSTAB("gale",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Tempest Charge`)
                        defender.takeDamage
                            .magical(attacker.magicPower*23*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${attacker.name}** condenses spyr into it's horn manifesting a massive horn made of destructive winds and crashes into ${defender.name} at full force causing ${damage} damage`)
                    }
                },{
                    cooldown: 0,
                    name: 'Exo Guard',
                    description: 'A skill that hardens the exoskeleton several folds',
                    canEvade: false,
                    type: 'buff',
                    element:"gale",
                    damage:0,
                    mana_cost: 6,
                    use: (attacker, defender) => {
                        attacker.armor = 1.25*attacker.armor
                        attacker.magicResistance = 1.25*attacker.magicResistance

                        attacker.addLogMessage(
                            `${attacker.name} used Exo Guard`,
                            `${attacker.name}'s exoskeleton hardens several folds creating an impenetrable skin increasing defenses by 25%`
                        )
                        
                       
                    },
                },
               
            ],
        })
    }
}
