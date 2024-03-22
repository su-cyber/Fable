import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { glowingEssence } from '../../items/glowingEssence'
import { calculateModifier } from '../../../../commands/fight'
import { calculateSTAB } from '../../../../commands/fight'
import lvl_modifier from '../../../utils/lvl_modifier'
import { emoji } from '../../../lib/utils/emoji'
import { Thornweaver_Thorns } from '../../items/thornweaver_thorns'

export class Thornweaver extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [
                `The Thornweaver's form dissipates into a flurry of thorny tendrils, eluding your finishing attack.`,
                'Before you could land the final hit, the Thornweaver dries and crumbles away.',
            ],
            withDropMessages: [
                'As the Thornweaver succumbs to your assault, it drops a handful of razor-sharp thorns.',
                'You manage to collect a cluster of thorny vines from the defeated Thornweaver.',
                'Victorious over the Thornweaver, you retrieve a bundle of poisonous thorns.',
                'Amidst the defeated Thornweaver lies a collection of venomous barbs that you claim as your prize.'
            ],
        };

        await new Dropper([
            {
                item: Thornweaver_Thorns,
                dropRate: 0.25,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Thornweaver({
            name: `Thornweaver ${emoji.BLOOM}`,
            description:`A plant-like creature with thorny tendrils and blossoms that emit hypnotic aromas. Its drop is the Thornweaver Thorns, that can be used to create potent poisons.`,
            spawnRate: 0.35,
            health: 178,
            level:9,
            mana:5,
            xp: generateXP(15,18),
            evasion: 0.001,
            attackDamage: 28,
            fileName:'thornweaver.jpeg',
            magicPower: 28,
            run_chance: 0.02,
            armor: 34,
            speed: 2,
            element:"bloom",
            magicResistance: 34,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Paralysing Spores',
                    description: `Releases a cloud of paralyzing spores, causing the opponent to become temporarily paralyzed and reducing their agility.`,
                    canEvade: true,
                    type: 'magical',
                    element:"bloom", 
                    damage:20,
                    mana_cost: 1,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("bloom",defender.element)
                        let stab = calculateSTAB("bloom",attacker.element)
                        attacker.addLogMessage(`${attacker.name} used Wisp Illusion`)
                        defender.takeDamage
                            .magical(attacker.magicPower*20*mod*stab*lvl_modifier(attacker.level))
                            .run(damage => `${defender.name} is enveloped in paralyzing spores, taking ${damage} damage and becoming temporarily paralyzed.`)
                    }
                },
                {
                    cooldown: 0,
                    name: 'Vine Smash',
                    description: "Unleashes a powerful smash with thorny vines, dealing heavy damage and reducing the opponent's armor.",
                    canEvade: false,
                    type: 'physical',
                    element: "bloom",
                    damage: 45,
                    mana_cost: 4,
                    use: (attacker, defender) => {
                        let mod = calculateModifier("bloom",defender.element)
                        let stab = calculateSTAB("bloom",attacker.element)
                        attacker.addLogMessage(`${attacker.name} used Vine Smash`);
                        defender.takeDamage
                            .physical(attacker.attackDamage * 45 * lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `${defender.name} is struck by a powerful smash of thorny vines, taking ${damage} physical damage and having their armor reduced.`);
                        defender.removeArmor(3)
                    }
                }
               
            ],
        })
    }
}
