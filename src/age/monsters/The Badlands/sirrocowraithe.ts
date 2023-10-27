import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { glowingEssence } from '../../items/glowingEssence'
import { calculateModifier } from '../../../../commands/fight'
import { calculateSTAB } from '../../../../commands/fight'
import lvl_modifier from '../../../utils/lvl_modifier'
import { emoji } from '../../../lib/utils/emoji'
import { Siroccowraith_essence } from '../../items/sirroco_essence'

export class Siroccowraith extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [
                'The Siroccowraith dissipates into a gust of wind, eluding your final strike.',
                'As you prepare to deliver the finishing blow, the Siroccowraith vanishes into a swirling sandstorm.',
                'Before you can land the final hit, the Siroccowraith retreats into the howling winds.',
            ],
            withDropMessages: [
                'As the Siroccowraith succumbs to your assault, it leaves behind a whirlwind-infused sand grain.',
                `You collect a shimmering sand particle imbued with the wind's power from the defeated Siroccowraith.`,
                `Victorious over the Siroccowraith, you retrieve a mystical sand grain resonating with elemental energy.`,
            ],
        };

        await new Dropper([
            {
                item: Siroccowraith_essence,
                dropRate: 0.5,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Siroccowraith({
            name: `Siroccowraith ${emoji.GALE}`,
            description: `A spectral creature made of swirling sands and ephemeral winds. Its drop is the Essence of Siroccowraith, a sand-infused crystal used in wind related enchantments.`,
            spawnRate: 0.25,
            health: 178,
            level: 9,
            mana: 5,
            fileName: 'siroccowraith.jpeg',
            xp: generateXP(30, 35),
            evasion: 0.06,
            attackDamage: 2,
            magicPower: 45,
            run_chance: 0.03,
            armor: 22,
            speed: 35,
            element: "gale",
            magicResistance: 22,
            passive_skills: [],
            skills: [
                {
                    cooldown: 0,
                    name: 'Sand Blast',
                    description: `unleashes a powerful blast of sand at the enemy`,
                    canEvade: true,
                    type: 'magical',
                    element: "gale",
                    damage: 20,
                    mana_cost: 1,
                    use: (attacker, defender) => {
                        let mod = calculateModifier("gale",defender.element)
                        let stab = calculateSTAB("gale",attacker.element)
                        attacker.addLogMessage(`${attacker.name} used Sand Blast`);
                        defender.takeDamage
                            .magical(attacker.attackDamage * 20 * lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `${defender.name} was hit by a blast of sand, losing ${damage} HP`);
                    }
                },
                {
                    cooldown: 0,
                    name: 'Scorching Sandstorm',
                    description: `conjures a scorching sandstorm that engulfs the enemy`,
                    canEvade: true,
                    type: 'magical',
                    element: "terra",
                    damage: 45,
                    mana_cost: 3,
                    use: (attacker, defender) => {
                        let mod = calculateModifier("terra",defender.element)
                        let stab = calculateSTAB("terra",attacker.element)
                        attacker.addLogMessage(`${attacker.name} used Scorching Sandstorm`);
                        defender.takeDamage
                            .magical(attacker.attackDamage * 45 * lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `${defender.name} was engulfed in a scorching sandstorm, losing ${damage} HP`);
                    }
                },
                // Add more skills here if needed
            ],
        });
    }
}
