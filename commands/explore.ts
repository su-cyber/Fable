import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import { DuelBuilder } from '../src/age/DuelBuilder'
import { warrior } from '../src/age/classes/warrior'
import { emoji } from '../src/lib/utils/emoji'
import { locker, sleep } from '../src/utils'
import { getRandomMonster } from '../src/age/monsters'
import { Entity, MonsterEntity } from '../src/age/classes'
import { removeIndentation } from '../src/utils/removeIndentation'
import { randint } from '../src/utils/randint'

export default new MyCommandSlashBuilder({ name: 'explore', description: 'Explore the world' }).setDo(
    async interaction => {
        const authorId = interaction.user.id

        const author = interaction.guild.members.cache.get(authorId)
        const attacker = warrior(author)
        const monster = await getRandomMonster()

        await new PvEDuel({
            interaction,
            player1: attacker,
            player2: monster,
        }).start()
    }
)

class PvEDuel extends DuelBuilder {
    player2: MonsterEntity

    async beforeDuelStart() {
        super.beforeDuelStart()

        await this.replyOrEdit(`🔎 Found a ${this.player2.name}!`)
        await sleep(1.5)
    }

    async onSkillSelect(skillName: string) {
        await this.deleteInfoMessages()

        this.attacker.useSkill(
            async (text: string) => await this.addMessage(text),
            this.scheduler,
            this.defender,
            this.attacker.skills.find(skill => skill.name === skillName)
        )
    }

    async onTurn() {
        const p1 = this.player1
        const p2 = this.player2

        const p1EmojiEffects = [...p1.effects.values()].map(effect => effect.emoji).join(' ')
        const p2EmojiEffects = [...p2.effects.values()].map(effect => effect.emoji).join(' ')

        const content = removeIndentation(`
            Turn: **${this.turn + 1}**

            **${p1.name}**: ${p1EmojiEffects}
            ${emoji.HEALTH_POTION} ${p1.health}/${p1.maxHealth} HP
            ${emoji.MANA_POTION} 100/100 MP

            **${p2.name}**: ${p2EmojiEffects}
            ${emoji.HEALTH_POTION} ${p2.health}/${p2.maxHealth} HP
            ${emoji.MANA_POTION} 100/100 MP

            **Attacker**: ${this.attacker.name}
        `)

        if (this.attacker instanceof MonsterEntity) {
            await sleep(2)
            await this.deleteInfoMessages()
            await this.replyOrEdit(content)
            await sleep(randint(1, 3))

            this.attacker.useSkill(
                async (text: string) => await this.addMessage(text),
                this.scheduler,
                this.defender
            )
        } else {
            await this.replyOrEdit(content, this.createDuelComponent(this.attacker.skills))
            await locker.wait()
            locker.lock()
        }
    }

    async onEnd(winner: Entity, loser: MonsterEntity) {
        await loser.onDeath(this.interaction, winner)
    }
}
