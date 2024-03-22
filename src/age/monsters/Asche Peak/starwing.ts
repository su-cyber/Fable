import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { goldenTelescope } from '../../items/goldenTelescope'
import { calculateSTAB } from '../../../../commands/fight'
import lvl_modifier from '../../../utils/lvl_modifier'
import { emoji } from '../../../lib/utils/emoji'
import { calculateModifier } from '../../../../commands/fight'
import { marineFeather } from '../../items/marineFeather'
import { cosmoFeather } from '../../items/cosmicFeather'


export class Starwing extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: [`The Starwing vanished into the nightsky never to be seen again.`],
            withDropMessages: ['After a brief battle with the Starwing, you collect a feather from its majestic wings.'],
        }

        await new Dropper([
            {
                item: cosmoFeather,
                dropRate: 0.2,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new Starwing({
            name: `Starwing ${emoji.LIGHT}`,
            description:`Starwings are Huge nocturnal Ravens who hunt at night. Their wings have intricate star-like pattern which camouflages into a clear night sky which masks their presence making it easier for them to hunt.`,
            spawnRate: 0.4,
            health: 316,
            level:11,
            mana:7,
            xp: generateXP(50, 62),
            evasion: 0.066,
            attackDamage: 45,
            fileName:'starwing.jpeg',
            magicPower: 27,
            run_chance: 0.02,
            armor: 31,
            speed: 45,
            element:"light",
            magicResistance: 32,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Twilight Strike',
                    description: `A vanishing strike in the moonlight`,
                    canEvade: true,
                    type: 'physical',
                    element:"light", 
                    damage:25,
                    mana_cost: 2,
                    use: (attacker, defender) =>{
                        let mod = calculateModifier("light",defender.element)
                        let stab = calculateSTAB("light",attacker.element)
                        attacker.addLogMessage(`**${attacker.name}** used Twilight Strike`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*25*lvl_modifier(attacker.level)*mod*stab)
                            .run(damage => `**${defender.name}** lost ${damage} HP by a deadly strike shrouded in darkness`)
                    }
                },{
                    cooldown: 0,
                    name: 'Cosmic Gaze',
                    description: 'An ethreal gaze that causes the enemies to lose strength',
                    canEvade: true,
                    type: 'debuff',
                    element:"light", 
                    damage:0,
                    mana_cost: 6,
                    use: (attacker, defender) =>{
                        defender.attackDamage -=13
                        defender.armor -=13
                        attacker.addLogMessage(`${attacker.name} used Cosmic Gaze`,
                        `${attacker.name} stares at you with it's ethereal gaze as you feel your body lose strength and endurance`
                        )
                    }
                },
               
            ],
        })
    }
}
