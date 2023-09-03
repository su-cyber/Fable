import { CommandInteraction } from 'discord.js'
import { MonsterEntity, ClassEntity } from '../../classes'
import { Dropper } from '../../dropper'
import generateXP from '../../../utils/generateXP'
import { shadowCat_tuft } from '../../items/shadowCat_tuft'

export class shadowCat extends MonsterEntity {
    async onDeath(interaction: CommandInteraction, killer: ClassEntity) {
        const messages = {
            withoutDropMessages: ['The Shadow Cat ran away before you could finish it',`The Shadow Cat blends into the shadows and disappears as you approached to finish it off.`],
            withDropMessages: [`The Shadow Cat lies dead on the ground as you finish it off and take some tuft from it's body`],
        }

        await new Dropper([
            {
                item: shadowCat_tuft,
                dropRate: 0.1,
            },
        ]).sendDeathMessage(messages, interaction, this,killer)
    }

    static create() {
        return new shadowCat({
            name: 'Shadow Cat',
            description:`A large, black feline with eyes that glow an eerie green. The Shadowcat is known for its stealth and ability to disappear into the shadows. Its attack is a powerful swipe with its razor-sharp claws. Its drop is a tuft of its fur, which is highly sought after for use in invisibility potions.`,
            spawnRate: 0.35,
            health: 120,
            level:6,
            mana:0,
            xp: generateXP(15,18),
            evasion: 0.05,
            attackDamage: 28,
            fileName:'shadowcat.jpeg',
            magicPower: 2,
            run_chance: 0.02,
            armor: 6,
            speed: 30,
            element:"bloom",
            magicResistance: 24,
            passive_skills:[],
            skills: [
                {
                    cooldown: 0,
                    name: 'Shredding Swipe',
                    description: `attacks with it's deadly claws`,
                    canEvade: true,
                    type: 'physical',
                    element:"normal", 
                    damage:22,
                    mana_cost: 0,
                    use: (attacker, defender) =>{
                        attacker.addLogMessage(`${attacker.name} used Shredding Swipe`)
                        defender.takeDamage
                            .physical(attacker.attackDamage*22)
                            .run(damage => `${defender.name} lost ${damage} HP by Shredding Swipe`)
                    }
                },
               
            ],
        })
    }
}
