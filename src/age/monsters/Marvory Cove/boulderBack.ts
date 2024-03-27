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
import { boulderbackShell } from '../../items/boulderbackShell'




export class Boulderback extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [
                'The ground trembles as the Boulderback retreats into the depths, leaving behind a trail of destruction in its wake.',
                'With a powerful heave, the Boulderback disappears into the shadows, its formidable shell vanishing from sight.',
                'You watch in awe as the Boulderback effortlessly plows through the obstacles in its path, disappearing into the darkness.',
                'The Boulderback unleashes a deafening roar before crashing back into the depths, its massive shell crushing everything in its path.',
                `In a frenzy of rage, the Boulderback smashes through the cove's walls, sending debris flying in all directions before vanishing beneath the waves.`
            ],
            withDropMessages: [
                'After a grueling battle, you manage to pry off a piece of the Boulderback\'s enchanted shell, claiming the prized Boulderback Shell Fragment as your own.',
                'With a final, decisive blow, you shatter the Boulderback\'s shell, revealing the precious Boulderback Shell Fragment hidden within.',
                'As the Boulderback recoils from your assault, you seize the opportunity to snatch a gleaming Boulderback Shell Fragment from its shattered shell.',
                'Blood and gore spatter the sand as you deliver the killing blow, tearing into the Boulderback\'s shell to claim the coveted Boulderback Shell Fragment.',
                'With a mighty roar of triumph, you plunge your weapon into the Boulderback\'s shell, rending it asunder and retrieving the coveted Boulderback Shell Fragment.'
            ],
        }
        
        
        

        

        await new Dropper([
            {
                item: boulderbackShell,
                dropRate: 0.2,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Boulderback({
            name: `Boulderback ${emoji.TERRA}`,
            description:`Boulderback is a massive, turtle-like creature with a shell made of enchanted rocks. It lumbers along the cove's floor, crushing obstacles in its path.`,
            spawnRate: 0.3,
            health: 580,
            level:17,
            mana:11,
            xp: generateXP(61, 64),
            evasion: 0.025,
            attackDamage: 82,
            fileName:'boulderback.jpeg',
            magicPower: 1,
            run_chance: 0.02,
            armor: 75,
            speed: 20,
            element:"terra",
            magicResistance: 75,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Rock Disc',
                    description: `Hurls enchanted rocks at the enemy`,
                    canEvade: true,
                    type: 'physical',
                    element:"terra", 
                    damage:35,
                    mana_cost: 3,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("terra",defender.element)
                        let stab = calculateSTAB("terra",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Rock Disc`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*35*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `${attacker.name} hurls enchanted rocks from it's back towards ${defender.name} causing ${damage} damage`)
                    }
                },{
                    cooldown: 0,
                    name: 'Rolling Rampage',
                    description: `Rolls and Rampages everything in it's path`,
                    canEvade: true,
                    type: 'physical',
                    element:"terra", 
                    damage:45,
                    mana_cost: 4,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("terra",defender.element)
                        let stab = calculateSTAB("terra",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Rolling Rampage`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*45*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${attacker.name}** coils into a huge spiky rock and charges at ${defender.name} causing ${damage} damage`)
                    }
                }
               
            ],
        })
    }
}
