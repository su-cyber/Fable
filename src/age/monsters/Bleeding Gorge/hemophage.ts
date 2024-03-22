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
import { bloodGlobule } from '../../items/bloodGlobule'



export class Haemophage extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [
                'The Haemophage slips away into the crimson waters, leaving you empty-handed.',
                'As you struggle to subdue the Haemophage, it wriggles free and escapes your grasp.',
                'You swing your weapon at the Haemophage, but it evades your attack and disappears beneath the surface of the crimson waters.'
            ],
            withDropMessages: [
                'Defeating the Haemophage, you extract a Blood Globule from its bloated body.',
                'With a final blow, you bring down the Haemophage and collect a Blood Globule from its remains.',
                'As the Haemophage collapses to the ground, a Blood Globule oozes from its ruptured body.'
            ],
        };
        

        await new Dropper([
            {
                item: bloodGlobule,
                dropRate: 0.2,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Haemophage({
            name: `Haemophage ${emoji.WAVE}`,
            description:`The Haemophage is a grotesque, bloodsucking creature that thrives in the crimson waters of the Bleeding Gorge. It has a bloated body, rows of razor-sharp teeth, and elongated tendrils that extend from its mouth.`,
            spawnRate: 0.4,
            health: 355,
            level:12,
            mana:7,
            xp: generateXP(41, 43),
            evasion: 0.065,
            attackDamage: 70,
            fileName:'hemophage.jpeg',
            magicPower: 8,
            run_chance: 0.02,
            armor: 35,
            speed: 45,
            element:"wave",
            magicResistance: 30,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Drain Bite',
                    description: `A deadly bite that drains blood`,
                    canEvade: true,
                    type: 'physical',
                    element:"wave", 
                    damage:25,
                    mana_cost: 2,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("wave",defender.element)
                        let stab = calculateSTAB("wave",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Drain Bite`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*25*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${attacker.name}**'s razor sharp teeths bite into ${defender.name} causing them to lose ${damage} HP`)
                    }
                },{
                    cooldown: 0,
                    name: 'Blood Clot',
                    description: `Clots it's wounds healing itself`,
                    canEvade: false,
                    element:"wave",
                    type: 'heal',
                    damage:0,
                    mana_cost: 7,
                    use: (attacker, defender) => {
                        if(attacker.health+150 > attacker.maxHealth){
                            attacker.health = attacker.maxHealth
                        }
                        else{
                            attacker.health = attacker.health+150
                        }


                        attacker.addLogMessage(
                            `${attacker.name} used Blood Clot`,
                            ` ${attacker.name} clots it's wounds healing 100HP`
                        )
                        
                    
                    },
    }
               
            ],
        })
    }
}
