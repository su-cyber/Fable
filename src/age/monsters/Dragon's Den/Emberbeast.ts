import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { emberScale } from '../../items/Emberscale'
import { calculateModifier } from '../../../../commands/fight'
import { calculateSTAB } from '../../../../commands/fight'
import lvl_modifier from '../../../utils/lvl_modifier'
import { emoji } from '../../../lib/utils/emoji'


export class Emberbeast extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Emberbeast ran away as you were about to finish it',`The Emberbeast burnt to ashes as you cleave it in halve leaving nothing behind`],
            withDropMessages: [`You finish off The Emberbeast and collect some of it's burning scales`],
        }

        await new Dropper([
            {
                item: emberScale,
                dropRate: 0.15,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Emberbeast({
            name: `Emberbeast ${emoji.FLAME}`,
            description:`A fearsome creature with smoldering red scales and flaming spines, the Emberbeast breathes jets of searing flames that engulf its foes. It charges with scorching speed, leaving trails of fire in its wake. Its drop is an Ember Scale, a fire-imbued scale renowned for its use in forging powerful flame-based weapons.`,
            spawnRate: 0.35,
            health: 135,
            level:7,
            mana:4,
            fileName:'emberbeast.jpeg',
            xp: generateXP(26,30),
            evasion: 0.05,
            attackDamage: 32,
            magicPower: 6,
            run_chance: 0.02,
            armor: 20,
            speed: 28,
            element:"flame",
            magicResistance: 16,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Jet Flame',
                    description: `Breathes jet of flames`,
                    canEvade: true,
                    type: 'physical',
                    element:"flame", 
                    damage:26,
                    mana_cost: 1,
                    use: (attacker, defender) =>{
                        defender.element = defender.element.toLowerCase()
                        let mod = calculateModifier("flame",defender.element)
                        let stab = calculateSTAB("flame",attacker.element)
                        attacker.addLogMessage(`${attacker.name} used Jet Flame`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*26*mod*stab*lvl_modifier(attacker.level))
                            .run(damage => `${defender.name} lost ${damage} HP by a jet of scorching flames`)
                    }
                },
               
            ],
        })
    }
}
