import {
    CacheType,
    CommandInteraction,
    InteractionCollector,
    MappedInteractionTypes,
    MessageActionRow,
    MessageComponentInteraction,
    MessageEmbed,
    MessageSelectMenu,
} from 'discord.js'
import chunk from 'lodash.chunk'
import { emoji } from '../../lib/utils/emoji'

import { getLocker } from '../../utils'
import { removeIndentation } from '../../utils/removeIndentation'
import { wrapText } from '../../utils/wrapText'
import { Skill } from '../classes'
import { Entity } from '../classes/entity'
import { Scheduler } from './scheduler'

const lineBreak = '\n\u200b'

class DuelBuilder {
    removeCollector: () => void
    turn: number
    attacker: Entity
    defender: Entity
    scheduler: Scheduler
    logMessages: string[]
    interaction: CommandInteraction
    player1: Entity
    player2: Entity

    collector: InteractionCollector<MappedInteractionTypes['ACTION_ROW']>
    locker: { isLock: boolean; wait(): Promise<void>; lock(): void; unlock(): void }

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
        this.logMessages = []
        this.interaction = interaction
        this.locker = getLocker()

        player1.addLogMessage = this.addLogMessage.bind(this)
        player2.addLogMessage = this.addLogMessage.bind(this)

        player1.oponent = player2
        player2.oponent = player1

        player1.scheduler = this.scheduler
        player2.scheduler = this.scheduler
    }

    createDuelComponent(skills: Skill[], disabled: boolean = false) {
        return new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('select-menu__skills')
                .setPlaceholder(`Select a skill ${this.attacker.name}`)
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

    duelMessageEmbeds() {
        const messages = this.logMessages.join('\n')

        const p1 = this.player1
        const p2 = this.player2

        const p1Effects = chunk(
            [...p1.effects.values()].map(effect => effect.emoji),
            5
        )
            .map(i => i.join(''))
            .join('\n')

        const p2Effects = chunk(
            [...p2.effects.values()].map(effect => effect.emoji),
            5
        )
            .map(i => i.join(''))
            .join('\n')
        if(p1.mana <=0){
            return [
                new MessageEmbed()
                    .setColor('#2f3136')
                    .setTitle(`~ Turn ${this.turn + 1}`)
                    .setDescription(
                        removeIndentation(`
                        ${lineBreak.repeat(1)}
                        **${wrapText(this.player1.name, 20)}**${p1Effects ? `\n${p1Effects}` : ''}
                        ${emoji.HEALTH_POTION} ${p1.health}/${p1.maxHealth} HP
                        ${emoji.MANA_POTION} 0/${p1.maxMana} MP
    
                        **${wrapText(this.player2.name, 20)}**${p2Effects ? `\n${p2Effects}` : ''}
                        ${emoji.HEALTH_POTION} ${p2.health}/${p2.maxHealth} HP
                        ${emoji.MANA_POTION} ${p2.mana}/${p2.maxMana} MP
                        ${lineBreak.repeat(2)}${messages.length ? `**LOG: 📋**\n\n${messages}` : ''}
                    `)
                    ),
            ]
        }
        else if(p2.mana<=0){
            return [
                new MessageEmbed()
                    .setColor('#2f3136')
                    .setTitle(`~ Turn ${this.turn + 1}`)
                    .setDescription(
                        removeIndentation(`
                        ${lineBreak.repeat(1)}
                        **${wrapText(this.player1.name, 20)}**${p1Effects ? `\n${p1Effects}` : ''}
                        ${emoji.HEALTH_POTION} ${p1.health}/${p1.maxHealth} HP
                        ${emoji.MANA_POTION} ${p1.mana}/${p1.maxMana} MP
    
                        **${wrapText(this.player2.name, 20)}**${p2Effects ? `\n${p2Effects}` : ''}
                        ${emoji.HEALTH_POTION} ${p2.health}/${p2.maxHealth} HP
                        ${emoji.MANA_POTION} 0/${p2.maxMana} MP
                        ${lineBreak.repeat(2)}${messages.length ? `**LOG: 📋**\n\n${messages}` : ''}
                    `)
                    ),
            ]
        }
        else if(p1.mana<=0 && p2.mana<=0){
            return [
                new MessageEmbed()
                    .setColor('#2f3136')
                    .setTitle(`~ Turn ${this.turn + 1}`)
                    .setDescription(
                        removeIndentation(`
                        ${lineBreak.repeat(1)}
                        **${wrapText(this.player1.name, 20)}**${p1Effects ? `\n${p1Effects}` : ''}
                        ${emoji.HEALTH_POTION} ${p1.health}/${p1.maxHealth} HP
                        ${emoji.MANA_POTION} 0/${p1.maxMana} MP
    
                        **${wrapText(this.player2.name, 20)}**${p2Effects ? `\n${p2Effects}` : ''}
                        ${emoji.HEALTH_POTION} ${p2.health}/${p2.maxHealth} HP
                        ${emoji.MANA_POTION} 0/${p2.maxMana} MP
                        ${lineBreak.repeat(2)}${messages.length ? `**LOG: 📋**\n\n${messages}` : ''}
                    `)
                    ),
            ]
        }
        else{
        return [
            new MessageEmbed()
                .setColor('#2f3136')
                .setTitle(`~ Turn ${this.turn + 1}`)
                .setDescription(
                    removeIndentation(`
                    ${lineBreak.repeat(1)}
                    **${wrapText(this.player1.name, 20)}**${p1Effects ? `\n${p1Effects}` : ''}
                    ${emoji.HEALTH_POTION} ${p1.health}/${p1.maxHealth} HP
                    ${emoji.MANA_POTION} ${p1.mana}/${p1.maxMana} MP

                    **${wrapText(this.player2.name, 20)}**${p2Effects ? `\n${p2Effects}` : ''}
                    ${emoji.HEALTH_POTION} ${p2.health}/${p2.maxHealth} HP
                    ${emoji.MANA_POTION} ${p2.mana}/${p2.maxMana} MP
                    ${lineBreak.repeat(2)}${messages.length ? `**LOG: 📋**\n\n${messages}` : ''}
                `)
                ),
        ]
    }
    }

    addLogMessage(...text: string[]) {
        this.logMessages.push(...text)
    }

    async sendInfoMessage(skills: Skill[], disableComponent: boolean = false) {
        await this.replyOrEdit({
            content: null,
            embeds: this.duelMessageEmbeds(),
            components: [this.createDuelComponent(skills, disableComponent)],
        })
    }

    async replyOrEdit({
        content,
        embeds,
        components,
    }: {
        content?: string
        embeds?: MessageEmbed[]
        components?: any
    }) {
        
             this.interaction.reply({ content, embeds, components }).catch(() => {
                this.interaction.editReply({ content, embeds, components }).catch(() => null)
            })
         
         
        
    }

    deleteInfoMessages() {
        this.logMessages.length = 0
    }

    async onTurn(skipTurn: boolean) {}

    async onSkillSelect(skillName: string) {
        this.deleteInfoMessages()

        this.attacker.useSkill(
            this.attacker,
            this.defender,
            this.attacker.skills.find(skill => skill.name === skillName)
        )
    }

    async beforeDuelStart() {
        async function onCollect(collected: MessageComponentInteraction<CacheType> & { values: string[] }) {
            collected.deferUpdate().catch(() => null)
            const skillName = collected.values[0]

            await this.onSkillSelect(skillName)

            this.locker.unlock()
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

        this.player1.beforeDuelStart(this.player1, this.player2)
        this.player2.beforeDuelStart(this.player2, this.player1)
    }

    async onEnd(winner: Entity, loser: Entity) {}
    

    async start() {
        await this.beforeDuelStart()

        while (!(this.player1.isDead() || this.player2.isDead())) {
            const skipTurn = await this.scheduler.run(this.attacker, this.defender)

            await this.onTurn(skipTurn)

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
