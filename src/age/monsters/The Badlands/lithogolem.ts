import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { glowingEssence } from '../../items/glowingEssence'
import { calculateModifier } from '../../../../commands/fight'
import { calculateSTAB } from '../../../../commands/fight'
import lvl_modifier from '../../../utils/lvl_modifier'
import { emoji } from '../../../lib/utils/emoji'
import { LithoFragment } from '../../items/ltho_fragment'

export class Lithogolem extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [
                'The mighty Lithogolem crumbles into a pile of rubble, escaping your final attack.',
                'As you prepare to strike the final blow, the Lithogolem mysteriously disintegrates into dust.',
                'The ground trembles beneath the Lithogolem, causing it to scatter into countless small rocks.',
                'The Lithogolem retreats into the earth, leaving behind nothing but a cloud of dust.'
            ],
            withDropMessages: [
                'Having vanquished the Lithogolem, you discover a solid chunk of its rocky body.',
                'Among the remains of the defeated Lithogolem, you find a sizeable fragment of unyielding stone.',
                `A piece of the Lithogolem's impenetrable armor is left behind, serving as a testament to your victory.`,
                'With the Lithogolem defeated, you claim a sturdy boulder imbued with earth energy.'
            ],
        };

        await new Dropper([
            {
                item: LithoFragment,
                dropRate: 0.5,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Lithogolem({
            name: `Lithogolem ${emoji.TERRA}`,
            description: `A towering, rock-covered creature with veins of sharp cacti coursing beneath its surface. Its drop is the Litho Fragment, a chunk of cooled rock that retains life energy.`,
            spawnRate: 0.15,
            health: 279,
            level: 10,
            mana: 6,
            fileName: 'lithogolem.jpeg',
            xp: generateXP(40, 45),
            evasion: 0.02,
            attackDamage: 35,
            magicPower: 15,
            run_chance: 0.01,
            armor: 57,
            speed: 15,
            element: "terra",
            magicResistance: 40,
            passive_skills: [],
            skills: [
                {
                    cooldown: 0,
                    name: 'Needle Barrage',
                    description: `launches a barrage of sharp needles at the enemy`,
                    canEvade: true,
                    type: 'physical',
                    element: "bloom",
                    damage: 20,
                    mana_cost: 1,
                    use: (attacker, defender) => {
                        let mod = calculateModifier("bloom",defender.element)
                        let stab = calculateSTAB("bloom",attacker.element)
                        attacker.addLogMessage(`${attacker.name} used Needle Barrage`);
                        defender.takeDamage
                            .physical(attacker.attackDamage * 20 * lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `${defender.name} was struck by a barrage of sharp needles, losing ${damage} HP`);
                    }
                },
                {
                    cooldown: 0,
                    name: 'Earthsplitting Fist',
                    description: `delivers a mighty fist strike that splits the earth`,
                    canEvade: true,
                    type: 'physical',
                    element: "terra",
                    damage: 45,
                    mana_cost: 3,
                    use: (attacker, defender) => {
                        let mod = calculateModifier("terra",defender.element)
                        let stab = calculateSTAB("terra",attacker.element)
                        attacker.addLogMessage(`${attacker.name} used Earthsplitting Fist`);
                        defender.takeDamage
                            .physical(attacker.attackDamage * 45 * lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `${defender.name} was struck by a devastating fist that split the earth, losing ${damage} HP`);
                    }
                },
                // Add more skills here if needed
            ],
        });
    }
}
