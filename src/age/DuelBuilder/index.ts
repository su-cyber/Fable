import {
    CacheType,
    CommandInteraction,
    MessageActionRow,
    MessageButton,
    MessageComponentInteraction,
    MessageEmbed,
    MessageSelectMenu,
} from 'discord.js'
import chunk from 'lodash.chunk'
import { emoji } from '../../lib/utils/emoji'

import { getLocker, sleep } from '../../utils'
import { removeIndentation } from '../../utils/removeIndentation'
import { MonsterEntity, Skill } from '../classes'
import { Entity } from '../classes/entity'
import { Scheduler } from './scheduler'
import potions from '../heroes/potions'
import inventory from '../../../models/InventorySchema'
import { Potion } from '../classes/potion'
import profileModel from '../../../models/profileSchema'


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
    skill_len:number
    speed:number

    
    locker: { isLock: boolean; wait(): Promise<void>; lock(): void; unlock(): void }
    btn: MessageActionRow
    run: boolean
    useSelect: MessageActionRow
    potions: Potion[]
    messageId: string

    constructor({
        interaction,
        player1,
        player2,
        speed
    }: {
        interaction: CommandInteraction
        player1: Entity
        player2: Entity
        speed: number
    }) {
        this.turn = 0
        this.player1 = player1
        this.player2 = player2
        this.attacker = player1
        this.defender = player2
        this.scheduler = new Scheduler()
        this.logMessages = []
        this.interaction = interaction
        this.messageId = null
        this.locker = getLocker()
        this.btn = new MessageActionRow().addComponents([
            new MessageButton().setCustomId("use_btn").setStyle("SUCCESS").setLabel("POTIONS"),
        ])
        this.run = false
        this.potions = this.attacker.potions
        this.skill_len = this.attacker.skills.length
        this.speed = speed
       

      

        player1.addLogMessage = this.addLogMessage.bind(this)
        player2.addLogMessage = this.addLogMessage.bind(this)

        player1.oponent = player2
        player2.oponent = player1

        player1.scheduler = this.scheduler
        player2.scheduler = this.scheduler
    }

    createDuelComponent(skills: Skill[], disabled: boolean = false) {
        return new MessageActionRow().addComponents([
            new MessageSelectMenu()
                .setCustomId(`combat_select`)
                .setPlaceholder(`Select a skill ${this.attacker.name}`)
                .addOptions(
                    skills.map(skill => ({
                        label: skill.name,
                        description: skill.description,
                        value: skill.name,
                    }))
                )
                .setDisabled(disabled),
                
               
                ]
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
                        **${this.player1.name}**${p1Effects ? `\n${p1Effects}` : ''}
                        ${emoji.HEALTH_POTION} ${p1.health}/${p1.maxHealth} HP
                        ${emoji.MANA_POTION} 0/${p1.maxMana} AP
    
                        **${this.player2.name}**${p2Effects ? `\n${p2Effects}` : ''}
                        ${emoji.HEALTH_POTION} ${p2.health}/${p2.maxHealth} HP
                        ${emoji.MANA_POTION} ${p2.mana}/${p2.maxMana} AP
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
                        **${this.player1.name}**${p1Effects ? `\n${p1Effects}` : ''}
                        ${emoji.HEALTH_POTION} ${p1.health}/${p1.maxHealth} HP
                        ${emoji.MANA_POTION} ${p1.mana}/${p1.maxMana} AP
    
                        **${this.player2.name}**${p2Effects ? `\n${p2Effects}` : ''}
                        ${emoji.HEALTH_POTION} ${p2.health}/${p2.maxHealth} HP
                        ${emoji.MANA_POTION} 0/${p2.maxMana} AP
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
                        **${this.player1.name}**${p1Effects ? `\n${p1Effects}` : ''}
                        ${emoji.HEALTH_POTION} ${p1.health}/${p1.maxHealth} HP
                        ${emoji.MANA_POTION} 0/${p1.maxMana} AP
    
                        **${this.player2.name}**${p2Effects ? `\n${p2Effects}` : ''}
                        ${emoji.HEALTH_POTION} ${p2.health}/${p2.maxHealth} HP
                        ${emoji.MANA_POTION} 0/${p2.maxMana} AP
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
                    **${this.player1.name}**${p1Effects ? `\n${p1Effects}` : ''}
                    ${emoji.HEALTH_POTION} ${p1.health}/${p1.maxHealth} HP
                    ${emoji.MANA_POTION} ${p1.mana}/${p1.maxMana} AP

                    **${this.player2.name}**${p2Effects ? `\n${p2Effects}` : ''}
                    ${emoji.HEALTH_POTION} ${p2.health}/${p2.maxHealth} HP
                    ${emoji.MANA_POTION} ${p2.mana}/${p2.maxMana} AP
                    ${lineBreak.repeat(2)}${messages.length ? `**LOG: 📋**\n\n${messages}` : ''}
                `)
                ),
        ]
    }
    }

    addLogMessage(...text: string[]) {
        this.logMessages.push(...text)
    }

    async sendInfoMessage(skills: Skill[], disableComponent: boolean = true) {
       await this.replyOrEdit({
            content: null,
            embeds: this.duelMessageEmbeds(),
            components: [this.createDuelComponent(skills,disableComponent)],
            
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
        try {
          await this.interaction.reply({ content, embeds, components, fetchReply: true })
        } catch {
           await this.interaction.editReply({ content, embeds, components })
        }
         
         
        
    }

    deleteInfoMessages() {
        this.logMessages.length = 0
    }

    async onTurn(skipTurn: boolean,turn: number) {}

    async onSkillSelect(skillName: string) {
        this.deleteInfoMessages()

        this.attacker.useSkill(
            this.attacker,
            this.defender,
            this.attacker.skills.find(skill => skill.name === skillName)
        )
    }

    // async onPotionSelect(potionName: string) {
    //     this.deleteInfoMessages()
        
            
            
    //             this.attacker.useSkill(
    //                 this.attacker,
    //                 this.defender,
    //                 potions.find(potion => potion.name === potionName)
    //             )
            
           
      
        
    // }

    async beforeDuelStart() {
        async function onCollect(collected: MessageComponentInteraction<CacheType> & { values: string[] }) {
            collected.deferUpdate().catch(() => null)
            const skillName = collected.values[0]
            
            if(skillName == 'Run'){
                 this.addLogMessage(`${this.attacker.name} is trying to run away...`)
                 await sleep(2)
                if(this.defender instanceof MonsterEntity){
                    if(this.attacker.evasion > this.defender.run_chance){
                        this.run = true
                    }
                    else{
                        this.addLogMessage(`${this.attacker.name} couldnt run`)
                    }
                }
                else{
                    this.run = true
                }
            }
            else{
                await this.onSkillSelect(skillName)
            }
            
            
            this.locker.unlock()
        }


        const filter = (interaction: any) =>
            
        (interaction.customId === 'run_btn' || interaction.customId === 'use_btn'|| interaction.customId === `${this.interaction.id}_selectMenuSkills` || interaction.customId === 'use_menu') &&
        interaction.user.id === this.attacker.id

        
        let collector = this.interaction.channel.createMessageComponentCollector({ filter })

       
        // collector.setMaxListeners(Infinity)
        
        
        const thisThis = this

        collector.on('collect', async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
            
            collected.deferUpdate().catch(() => null)
            if(collected.customId === `${this.interaction.id}_selectMenuSkills`){
            if(collected.values[0].startsWith(this.interaction.id)){
                
                const skillName = collected.values[0].split('_')[1]

                if(skillName == 'Run'){
                     this.addLogMessage(`${this.attacker.name} is trying to run away...`)
                     sleep(2)
                    if(this.defender instanceof MonsterEntity){
                        if(this.attacker.evasion > this.defender.run_chance){
                            this.run = true
                        }
                        else{
                            this.addLogMessage(`${this.attacker.name} couldnt run`)
                        }
                    }
                    else{
                        this.run = true
                    }
                }
                else{
                    await this.onSkillSelect(skillName)
                }
                
                this.removeCollector()
                this.locker.unlock()
            }
            
            }
             else if(collected.customId === 'use_btn'){
                
                    let interaction = this.interaction
                   
                    inventory.findOne({userID:collected.user.id},async function(err,foundUser){
                        const potions = foundUser.inventory.potions
                        let potions_filtered= []
                        
                        let useSelect
                    if(foundUser.inventory.potions.length === 0){
                        useSelect = new MessageActionRow().addComponents([
                            new MessageSelectMenu()
                            .setCustomId('use_menu')
                                .setPlaceholder(`Select a potion ${collected.user.username}`)
                                .addOptions({
                                    
                                        label: 'None',
                                        description: 'you are out of potions',
                                        value: 'None',
                                }
                                )
                                .setDisabled(false),
                        ]) 
                    }
                    else{
                        
                        useSelect = new MessageActionRow().addComponents([
                            new MessageSelectMenu()
                            .setCustomId('use_menu')
                                .setPlaceholder(`Select a potion ${collected.user.username}`)
                                .addOptions(
                                    potions.map(item => ({
                                        label: item.name.name,
                                        description: item.name.description,
                                        value: item.name.name,
                                    }))
                                )
                                .setDisabled(false),
                        ])
                    }
               
               
                    interaction.editReply({components:[useSelect]})
                
               
                    
                
                
                })
    
                 
                
 
            }
            else if(collected.customId === 'use_menu'){
                collected.deferUpdate().catch(() => null)
                //insert potions code here
                inventory.findOne({userID:collected.user.id},async function(err,foundUser){
                const PotionName = collected.values[0]
                // await thisThis.onPotionSelect(PotionName)
                
                
                thisThis.locker.unlock()
                
                if(PotionName == 'None'){

                }
                else{
                    const foundPotion = foundUser.inventory.potions.find(object => object.name.name === PotionName)
                    foundPotion.quantity-=1
                    if(foundPotion.quantity===0){
                        const index = foundUser.inventory.potions.indexOf(foundPotion)
                        foundUser.inventory.potions.splice(index)
                    }
                }
                    
                    await inventory.updateOne({userID:collected.user.id},foundUser)
            })
        }
        })
       

        
        this.removeCollector = () => {
            collector.removeListener('collect',onCollect.bind(thisThis))

        }

        this.player1.beforeDuelStart(this.player1, this.player2,this.interaction)
        this.player2.beforeDuelStart(this.player2, this.player1,this.interaction)
    }

    async onEnd(winner: Entity, loser: Entity) {}
    

    async start() {
        await this.beforeDuelStart()

        while (!(this.player1.isDead() || this.player2.isDead()) && !this.run) {
            this.removeCollector()
            const skipTurn = await this.scheduler.run(this.attacker, this.defender)

            await this.onTurn(skipTurn,this.turn)
            
            const a = this.attacker
            const b = this.defender

            this.attacker = b
            this.defender = a

            this.turn += 1
        }

        this.removeCollector()
        
        
        

        const winner = this.player1.isDead() ? this.player2 : this.player1
        const loser = this.player1.isDead() ? this.player1 : this.player2
        if(this.run === true){
            this.interaction.channel.send(`**${winner.name} ran away!**`)
           await profileModel.updateOne({userID:winner.id},{encounter:[]})
        }
        else{
            this.onEnd(winner, loser)
        }
       
        
    }
}

export { DuelBuilder }