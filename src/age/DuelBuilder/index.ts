import {
    CacheType,
    CommandInteraction,
    InteractionCollector,
    MappedInteractionTypes,
    Message,
    MessageActionRow,
    MessageComponentInteraction,
    MessageSelectMenu,
} from 'discord.js'

import { sleep, locker } from '../../utils'
import { Entity, Skill } from '../classes'
import { Scheduler } from './scheduler'

class DuelBuilder {
    removeCollector: () => void
    turn: number
    attacker: Entity
    defender: Entity
    scheduler: Scheduler
    infoMessage: Message[]
    messageQueue: string[]
    interaction: CommandInteraction
    player1: Entity
    player2: Entity

    collector: InteractionCollector<MappedInteractionTypes['ACTION_ROW']>

    constructor({
        interaction,
        player1,
        player2,
    }: {
        interaction: CommandInteraction
        player1: Entity
        player2: Entity
    }) {
        this.turn = 0
        this.player1 = player1
        this.player2 = player2
        this.attacker = player1
        this.defender = player2
        this.scheduler = new Scheduler()
        this.infoMessage = []
        this.messageQueue = []
        this.interaction = interaction
    }

    createDuelComponent(skills: Skill[], disabled: boolean = false) {
        return new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('select-menu__skills')
                .setPlaceholder('Select a skill')
                .addOptions(
                    skills.map(skill => ({
                        label: skill.name,
                        description: skill.description,
                        value: skill.name,
                    }))
                )
                .setDisabled(disabled)
        )
    }

    async addMessage(text: string) {
        this.messageQueue.push(text)
    }

    async sendInfoMessage() {
        if (this.messageQueue.length > 0) {
            const messages = '**LOG:** 📋\n‎\n\n' + this.messageQueue.join('\n')
            this.infoMessage.push(await this.interaction.channel.send(messages))
        }
    }

    async deleteInfoMessages() {
        for (const message of this.infoMessage) {
            await message.delete()
            await sleep(0.1)
        }

        this.infoMessage.length = 0
        this.messageQueue.length = 0
    }

    async onTurn() {}

    async onSkillSelect(skillName: string) {
        this.attacker.useSkill(
            async (text: string) => await this.addMessage(text),
            this.scheduler,
            this.defender,
            this.attacker.skills.find(skill => skill.name === skillName)
        )
    }

    async beforeDuelStart() {
        async function onCollect(collected: MessageComponentInteraction<CacheType> & { values: string[] }) {
            collected.deferUpdate()
            const skillName = collected.values[0]

            await this.onSkillSelect(skillName)

            locker.unlock()
        }

        const filter = (interaction: any) =>
            interaction.isSelectMenu() &&
            interaction.customId === 'select-menu__skills' &&
            interaction.user.id === this.attacker.id

        this.collector = this.interaction.channel.createMessageComponentCollector({ filter })
        this.collector.setMaxListeners(Infinity)
        const thisThis = this

        this.collector.on('collect', onCollect.bind(thisThis))

        this.removeCollector = () => {
            this.collector.removeListener('collect', onCollect.bind(thisThis))
        }
    }

    async onEnd(winner: Entity, loser: Entity) {}

    async replyOrEdit(content: string, ...components: any) {
        try {
            await this.interaction.reply({ content, components })
        } catch {
            await this.interaction.editReply({ content, components })
        }
    }

    async start() {
        await this.beforeDuelStart()

        while (!(this.player1.isDead() || this.player2.isDead())) {
            if (!(await this.scheduler.run(this.attacker, this.defender))) {
                await this.sendInfoMessage()
                await this.onTurn()
            }

            const a = this.attacker
            const b = this.defender

            this.attacker = b
            this.defender = a

            this.turn += 1
        }

        this.removeCollector()
        await this.interaction.deleteReply()

        const winner = this.player1.isDead() ? this.player2 : this.player1
        const loser = this.player1.isDead() ? this.player1 : this.player2

        this.onEnd(winner, loser)
    }
}

export { DuelBuilder }
