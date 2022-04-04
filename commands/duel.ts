import { SlashCommandUserOption } from '@discordjs/builders'
import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import { DuelBuilder } from '../src/age/DuelBuilder'
import { emoji } from '../src/lib/utils/emoji'
import { warrior } from '../src/age/classes/warrior'
import { mage } from '../src/age/classes/mage'
import { Entity } from '../src/age/classes'

export default new MyCommandSlashBuilder({ name: 'duel', description: 'Duel with a player' })
    .addUserOption((option: SlashCommandUserOption) =>
        option.setName('user').setDescription('Player to duel with').setRequired(true)
    )
    .setDo(async (bot, interaction) => {
        const authorId = interaction.user.id
        const opponentId = interaction.options.getUser('user').id

        const author = interaction.guild.members.cache.get(authorId)
        const opponent = interaction.guild.members.cache.get(opponentId)

        const attacker = warrior(author)
        const defender = mage(opponent)

        await new PvPDuel({
            interaction,
            player1: attacker,
            player2: defender,
        }).start()
    })

class PvPDuel extends DuelBuilder {
    async onTurn() {
        const p1 = this.player1
        const p2 = this.player2

        const p1EmojiEffects = [...p1.effects.values()].map(effect => effect.emoji).join(' ')
        const p2EmojiEffects = [...p2.effects.values()].map(effect => effect.emoji).join(' ')

        const content = `
            Turn: **${this.turn + 1}**

            **${p1.name}**: ${p1EmojiEffects}
            ${emoji.HEALTH_POTION} ${p1.health}/${p1.maxHealth} HP
            ${emoji.MANA_POTION} 100/100 MP

            **${p2.name}**: ${p2EmojiEffects}
            ${emoji.HEALTH_POTION} ${p2.health}/${p2.maxHealth} HP
            ${emoji.MANA_POTION} 100/100 MP

            **Attacker**: ${this.attacker.name}
        `

        //await this.replyOrEdit(removeIndentation(content), this.createDuelComponent(this.attacker.skills))

        await this.locker.wait()
        this.locker.lock()
    }

    async onEnd(winner: Entity, loser: Entity) {
        await this.interaction.channel.send(`🏆 **${winner.name}** won!`)
    }
}
