import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { glowingEssence } from '../../items/glowingEssence'
import { calculateModifier } from '../../../../commands/fight'
import { calculateSTAB } from '../../../../commands/fight'
import lvl_modifier from '../../../utils/lvl_modifier'
import { emoji } from '../../../lib/utils/emoji'
import { QuakecoreCrystal } from '../../items/quakecore_crystal'

export class Quakebringer extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [
                'The Quakebringer dissipates in a burst of fiery energy, evading your final strike.',
                'As you prepare to deliver the finishing blow, the Quakebringer transforms into a swirling inferno and vanishes.',
                `Before you can land the final hit, the Quakebringer's form disperses into cascading flames.`,
                `The Quakebringer skillfully dodges your attack and fades away, leaving you empty-handed.`
            ],
            withDropMessages: [
                'Having defeated the Quakebringer, you collect a Crystal Shard, pulsating with siesmic power.',
                'Among the remnants of the defeated Quakebringer, you find a crystal fragment infused with earthly spyr.',
            ],
        };

        await new Dropper([
            {
                item: QuakecoreCrystal,
                dropRate: 0.25,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Quakebringer({
            name: `Quakebringer ${emoji.TERRA}`,
            description: `A massive, armored insect with iridescent carapace that traverses the Badlands, causing sandstorms and tremors with each step. Its drop is the Quakecore Crystal, a crystal infused with the power of earth.`,
            spawnRate: 0.2,
            health: 316,
            level: 11,
            mana: 7,
            fileName: 'quakebringer.jpeg',
            xp: generateXP(50, 62),
            evasion: 0.005,
            attackDamage: 35,
            magicPower: 0,
            run_chance: 0.02,
            armor: 42,
            speed: 5,
            element: "terra",
            magicResistance: 55,
            passive_skills: [],
            skills: [
                {
                    cooldown: 0,
                    name: 'Sand Torrent',
                    description: `unleashes a torrent of sand at the enemy`,
                    canEvade: true,
                    type: 'magical',
                    element: "terra",
                    damage: 25,
                    mana_cost: 2,
                    use: (attacker, defender) => {
                        let mod = calculateModifier("terra",defender.element)
                        let stab = calculateSTAB("terra",attacker.element)
                        attacker.addLogMessage(`${attacker.name} used Sand Torrent`);
                        defender.takeDamage
                            .magical(attacker.attackDamage * 25 * lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `${defender.name} was hit by a powerful torrent of sand, losing ${damage} HP`);
                    }
                },
                {
                    cooldown: 0,
                    name: 'Seismic Slam',
                    description: `delivers a powerful ground-shaking slam`,
                    canEvade: true,
                    type: 'physical',
                    element: "terra",
                    damage: 45,
                    mana_cost: 4,
                    use: (attacker, defender) => {
                        let mod = calculateModifier("terra",defender.element)
                        let stab = calculateSTAB("terra",attacker.element)
                        attacker.addLogMessage(`${attacker.name} used Seismic Slam`);
                        defender.takeDamage
                            .physical(attacker.attackDamage * 45 * lvl_modifier(attacker.level)*stab*mod)
                            .run(damage => `${defender.name} was slammed with immense force, losing ${damage} HP`);
                    }
                },
                // Add more skills here if needed
            ],
        });
    }
}
