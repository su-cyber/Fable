import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import { DuelBuilder } from '../src/age/DuelBuilder'
import { sleep } from '../src/utils'
import { getMonsters } from '../src/age/monsters'
import { MessageActionRow, MessageSelectMenu } from 'discord.js'
import { Warrior } from '../src/age/heroes/warrior'
import { MonsterEntity, Entity } from '../src/age/classes'

export default new MyCommandSlashBuilder({ name: 'explore', description: 'Explore the world' }).setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id

        const author = interaction.guild.members.cache.get(authorId)
        const attacker = Warrior.create(author)

        await interaction.reply({ components: [await monstersDropdown()] })

        bot.onComponent('select-menu__monsters', async componentInteraction => {
            componentInteraction.deferUpdate()
            const monster = (await getMonsters())
                .find(m => m.name === componentInteraction.values[0])
                .create()

            await new PvEDuel({
                interaction,
                player1: attacker,
                player2: monster,
            }).start()
        })
    }
)

async function monstersDropdown() {
    const monsters = await getMonsters()

    return new MessageActionRow().addComponents(
        new MessageSelectMenu()
            .setCustomId('select-menu__monsters')
            .setPlaceholder('Select a monster')
            .addOptions(
                monsters.map(m => ({
                    label: m.name,
                    value: m.name,
                }))
            )
    )
}

class PvEDuel extends DuelBuilder {
    player2: MonsterEntity

    async beforeDuelStart() {
        super.beforeDuelStart()

        await this.replyOrEdit({ content: `🔎 Found a ${this.player2.name}!` })
        await sleep(1.2)
    }

    async onSkillSelect(skillName: string) {
        this.attacker.useSkill(
            this.defender,
            this.attacker.skills.find(skill => skill.name === skillName)
        )
    }

    async onTurn() {
        if (this.attacker instanceof MonsterEntity) {
            await sleep(1.5)
            this.deleteInfoMessages()
            await this.sendInfoMessage(this.attacker.skills, true)

            this.attacker.useSkill(this.defender)
            await this.sendInfoMessage(this.attacker.skills)
        } else {
            await this.sendInfoMessage(this.attacker.skills)
            await this.locker.wait()
            this.locker.lock()
            await this.sendInfoMessage(this.attacker.skills)
        }
    }

    async onEnd(winner: Entity, loser: MonsterEntity) {
        await loser.onDeath(this.interaction, winner)
    }
}
