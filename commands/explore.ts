import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import { DuelBuilder } from '../src/age/DuelBuilder'
import { sleep, weightedRandom } from '../src/utils'
import { getMonsters } from '../src/age/monsters'
import { MessageActionRow, MessageSelectMenu, SelectMenuInteraction } from 'discord.js'
import { Warrior } from '../src/age/heroes/warrior'
import { MonsterEntity, Entity } from '../src/age/classes'
import { getRandomMonster } from '../src/age/monsters'
import { getRandomFlora } from '../src/age/flora'
import profileModel from '../models/profileSchema'
import allskills from '../src/age/skills/skills'
import passive_skills from '../src/age/heroes/passive_skills'
import inventory from '../models/InventorySchema'
import { SlashCommandStringOption } from '@discordjs/builders'
import specialModel from '../models/specialSchema'
import { Collector, MessageButton, MessageEmbed } from 'discord.js'


export default new MyCommandSlashBuilder({ name: 'explore', description: 'Explore the world' })

.setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id
        
        const author = await bot.users.fetch(authorId)
        const guildID = interaction.guildId;
        
        
        

        profileModel.exists({userID: authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    
        profileModel.findOne({userID:authorId},async function(err,foundUser) {
           
            const location = foundUser.location

            if(location === "ellior"){
                
                await interaction.reply({ content: `searching ${location}...`})
                
    

                const pick = weightedRandom(["flora","monster","spren"],[0.1,0.8,0.1])

                if(pick === "flora"){
                    
                    await interaction.editReply({ content: '\u200b', components: [] })
                    const flora = (await getRandomFlora(location))
                    await interaction.editReply(`you found a ${flora.fake_name}\n${flora.name} X ${flora.quantity} has been added to inventory!`)

                    inventory.findOne({userID:interaction.user.id},async function(err,foundUser){
                        if(err){
                            console.log(err);
                            
                        }
                        else{
                            const foundItem = foundUser.inventory.items.find(item => item.name === flora.name)
                            if (foundItem){
            
                                foundItem.quantity+=flora.quantity
                            }
                            else{
                                const newItem = {
                                    name:flora.name,
                                    description:flora.description,
                                    quantity:Number(flora.quantity)
                                }
                                foundUser.inventory.items.push(newItem)
                            }
                            await inventory.updateOne({userID:authorId},foundUser)
                        }
                        
                    })
                }

                else if(pick === "monster"){
                    await interaction.editReply({ components: [await monstersDropdown(location)] })
                    
                    bot.onComponent('select-menu__monsters', async componentInteraction => {
                        componentInteraction.deferUpdate()
                        await interaction.editReply({ content: '\u200b', components: [] })
                        const monster = (await getMonsters(location))
                            .find(m => m.name === componentInteraction.values[0])
                            .create()

                        
                        foundUser.encounter = []
                       
                   
                        let btnraw= new MessageActionRow().addComponents([
                            new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Fight"),
                            new MessageButton().setCustomId("btn_reject").setStyle("DANGER").setLabel("Run"),])

                            let d_btnraw = new MessageActionRow().addComponents([
                                new MessageButton().setCustomId("dbtn_accept").setStyle("PRIMARY").setLabel("Fight").setDisabled(true),
                                new MessageButton().setCustomId("dbtn_reject").setStyle("DANGER").setLabel("Run").setDisabled(true),
                            ])

                            
                        let fightEmbed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('ENCOUNTER')
                        .setDescription(`🔎 you found a ${monster.name}!`)
    
                        let acceptEmbed = new MessageEmbed()
                        .setColor('GREEN')
                        .setTitle('ACCEPTED')
                        .setDescription('You have decided to fight!\ncheck your private message')
    
                        let rejectEmbed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('RAN AWAY')
                        .setDescription('You ran away!')
                        
                    
                    await interaction.editReply({content: null,embeds:[fightEmbed],components:[btnraw]})
                    let filter = i => i.user.id === authorId
                        let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                
                        collector.on('collect',async (btn) => {
                            if(btn.isButton()){
                                if(btn.customId === "btn_accept"){
                                    await btn.deferUpdate().catch(e => {})
                                    await interaction.editReply({embeds:[acceptEmbed]})
                                    const encounter = {
                                        name: componentInteraction.values[0],
                                        time : new Date(),
                                        location:foundUser.location

                                    }
                                    
                                    foundUser.encounter.push(encounter)
                                    await profileModel.updateOne({userID:authorId},{encounter:foundUser.encounter})
                                    interaction.user.send(`Use /fight to begin encounter`)

                                    
                               
                                collector.stop()
                                    
                                }
                                else if(btn.customId === "btn_reject"){
                                    await btn.deferUpdate().catch(e => {})
                                    await interaction.editReply({embeds:[rejectEmbed]})
                                     foundUser.encounter = []
                                
                                    await profileModel.updateOne({userID:authorId},foundUser)

                                    collector.stop()
                                }

                                
                                
                            }
                              
                
                   
                   
                    })

                    collector.on('end', () => {
                        interaction.editReply({components: [d_btnraw]})
                    })

                        
                    })
                }
                else if(pick === "spren"){
                    const spren = weightedRandom(["fireSpren","windSpren","waterSpren"],[0.3,0.4,0.3])
                    specialModel.exists({Spren:spren},async function(err,res){
                        if(res){
                            specialModel.findOne({Spren:spren},async function(err,found){
                                interaction.editReply(`${spren} has already been claimed in the world\nclaimed by: ${found.owner}`)
                            })
                            
                        }
                        else{
                                specialModel.exists({userID:authorId},async function(err,res){
                                    if(res){
                                        interaction.editReply(`you already possess a spren!`)
                                    }
                                    else{
                                        interaction.editReply(`congrats! you found a ${spren}`)
                                        let special = await new specialModel({
                                            userID: authorId,
                                            serverID: guildID,
                                            Spren: spren,
                                            owner: interaction.user.username
                                            
                                        })
                                        special.save();
                                    }

                                })
                                   
                               
                          
                        }
                    })
                }
                }
                else if(location == "Castellan Fields"){
                    await interaction.reply({ content: `searching ${location}...`})
                    const pick = weightedRandom(["flora","monster"],[0,1])

                    if(pick == "flora"){
                        await interaction.editReply({ content: '\u200b', components: [] })
                        const flora = (await getRandomFlora(location))
                        await interaction.editReply(`you found a ${flora.fake_name}\n${flora.name} X ${flora.quantity} has been added to inventory!`)
    
                        inventory.findOne({userID:interaction.user.id},async function(err,foundUser){
                            if(err){
                                console.log(err);
                                
                            }
                            else{
                                const foundItem = foundUser.inventory.items.find(item => item.name === flora.name)
                                if (foundItem){
                
                                    foundItem.quantity+=flora.quantity
                                }
                                else{
                                    const newItem = {
                                        name:flora.name,
                                        description:flora.description,
                                        quantity:Number(flora.quantity)
                                    }
                                    foundUser.inventory.items.push(newItem)
                                }
                                await inventory.updateOne({userID:authorId},foundUser)
                            }
                            
                        })
                    }
                    else if(pick == "monster"){
                    
                    
                       
                            await interaction.editReply({ content: '\u200b', components: [] })
                            const monster = (await getRandomMonster(location))
                            
    
                            
                            foundUser.encounter = []
                           
                       
                            let btnraw= new MessageActionRow().addComponents([
                                new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Fight"),
                                new MessageButton().setCustomId("btn_reject").setStyle("DANGER").setLabel("Run"),])
    
                                let d_btnraw = new MessageActionRow().addComponents([
                                    new MessageButton().setCustomId("dbtn_accept").setStyle("PRIMARY").setLabel("Fight").setDisabled(true),
                                    new MessageButton().setCustomId("dbtn_reject").setStyle("DANGER").setLabel("Run").setDisabled(true),
                                ])
    
                                
                            let fightEmbed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('ENCOUNTER')
                            .setDescription(`🔎 you found a ${monster.name}!`)
        
                            let acceptEmbed = new MessageEmbed()
                            .setColor('GREEN')
                            .setTitle('ACCEPTED')
                            .setDescription('You have decided to fight!\ncheck your private message')
        
                            let rejectEmbed = new MessageEmbed()
                            .setColor('RED')
                            .setTitle('RAN AWAY')
                            .setDescription('You ran away!')
                            
                        
                        await interaction.editReply({content: null,embeds:[fightEmbed],components:[btnraw]})
                        let filter = i => i.user.id === authorId
                            let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                    
                            collector.on('collect',async (btn) => {
                                if(btn.isButton()){
                                    if(btn.customId === "btn_accept"){
                                        await btn.deferUpdate().catch(e => {})
                                        await interaction.editReply({embeds:[acceptEmbed]})
                                        const encounter = {
                                            name: monster.name,
                                            time : new Date(),
                                            location:foundUser.location
    
                                        }
                                        
                                        foundUser.encounter.push(encounter)
                                        await profileModel.updateOne({userID:authorId},{encounter:foundUser.encounter})
                                        interaction.user.send(`Use /fight to begin encounter`)
    
                                        
                                   
                                    collector.stop()
                                        
                                    }
                                    else if(btn.customId === "btn_reject"){
                                        await btn.deferUpdate().catch(e => {})
                                        await interaction.editReply({embeds:[rejectEmbed]})
                                         foundUser.encounter = []
                                    
                                        await profileModel.updateOne({userID:authorId},foundUser)
    
                                        collector.stop()
                                    }
    
                                    
                                    
                                }
                                  
                    
                       
                       
                        })
    
                        collector.on('end', () => {
                            interaction.editReply({components: [d_btnraw]})
                        })
    
                            
                       
                    }
     
                }
                else if(foundUser.location = "Abandoned Castle"){
                    let btnraw= new MessageActionRow().addComponents([
                        new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Enter"),
                        new MessageButton().setCustomId("btn_reject").setStyle("DANGER").setLabel("Cancel"),])

                        let d_btnraw = new MessageActionRow().addComponents([
                            new MessageButton().setCustomId("dbtn_accept").setStyle("PRIMARY").setLabel("Enter").setDisabled(true),
                            new MessageButton().setCustomId("dbtn_reject").setStyle("DANGER").setLabel("Cancel").setDisabled(true),
                        ])
                    let dungeonEmbed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('ENCOUNTER')
                            .setDescription(`You are about to enter a dungeon!\nDo you wish to proceed?`)
        
                            let acceptEmbed = new MessageEmbed()
                            .setColor('GREEN')
                            .setTitle('ACCEPTED')
                            .setDescription('You have decided to enter!\npress /proceeddungeon in DMs to move forward')
        
                            let rejectEmbed = new MessageEmbed()
                            .setColor('RED')
                            .setTitle('RETREAT')
                            .setDescription('You decided to retreat!')
                            
                        
                        await interaction.editReply({content: null,embeds:[dungeonEmbed],components:[btnraw]})
                        let filter = i => i.user.id === authorId
                            let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                    
                            collector.on('collect',async (btn) => {
                                if(btn.isButton()){
                                    if(btn.customId === "btn_accept"){
                                        await btn.deferUpdate().catch(e => {})
                                        await interaction.editReply({embeds:[acceptEmbed]})
                                        foundUser.dungeon.status = true
                                        foundUser.dungeon.name = "Abandoned Castle"
                                        foundUser.dungeon.step = 1 
                                        await profileModel.updateOne({userID:authorId},{dungeon:foundUser.dungeon})
                                        interaction.user.send(`You are now inside a dungeon!\npress /proceeddungeon to move forward`)
    
                                        
                                   
                                    collector.stop()
                                        
                                    }
                                    else if(btn.customId === "btn_reject"){
                                        await btn.deferUpdate().catch(e => {})
                                        await interaction.editReply({embeds:[rejectEmbed]})

                                    
    
                                        collector.stop()
                                    }
    
                                    
                                    
                                }
                                  
                    
                       
                       
                        })
    
                        collector.on('end', () => {
                            interaction.editReply({components: [d_btnraw]})
                        })
                }

                
    
            
            else{
                await interaction.deferReply()
                await interaction.editReply(`cannot access ${location}`)
            }
         
        })

        
        
            }

            else {
                    interaction.reply({content:"it seems that you are not an awakened yet!"})
                }
            }
        })
       
    }
)

async function monstersDropdown(location:String) {
    const monsters = await getMonsters(location)

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
    player1: Entity
    player2: MonsterEntity

    async beforeDuelStart() {
        super.beforeDuelStart()
        if(this.attacker instanceof MonsterEntity){
            await this.replyOrEdit({ content: `🔎 Found a ${this.player1.name}!` })
        }
        else{
            await this.replyOrEdit({ content: `🔎 Found a ${this.player2.name}!` })
        }
       
        await sleep(1.2)
        
        
    }

    async onSkillSelect(skillName: string) {
        const skill = allskills.find(skill => skill.name === skillName)

        this.attacker.useSkill(this.attacker,this.defender,skill)
    }

    
    

    async onTurn(skipTurn: boolean,turn:number) {
        const isMonsterTurn = this.attacker instanceof MonsterEntity

        if (skipTurn) {
            if (isMonsterTurn) {
                await sleep(1.5)
                this.deleteInfoMessages()
            }

            return
        }

        if (this.attacker instanceof MonsterEntity) {
            
           
            await this.sendInfoMessage(this.attacker.skills, true)

            this.attacker.useSkill(this.attacker,this.defender)
            
            
        } else {
            
            await this.sendInfoMessage(this.attacker.skills)
            await sleep(1.5)
            this.deleteInfoMessages()
            await this.locker.wait()
            this.locker.lock()
        }

        await this.sendInfoMessage(this.attacker.skills)
        
    }

    async onEnd(winner: Entity, loser: MonsterEntity) {
        await loser.onDeath(this.interaction, winner)
        
    }

    
}


class PvEDuel_Quest extends PvEDuel {
    player1: Entity
    player2: MonsterEntity

    
    async onEnd(winner: Entity, loser: MonsterEntity) {
        const authorId = this.interaction.user.id
        profileModel.findOne({userID:authorId},async function(err,foundUser){
        if(winner.name != foundUser.quest_mob){
            
            
                const finalValue = foundUser.quest_quantity - 1
                await profileModel.updateOne({userID:authorId},{quest_quantity: finalValue})
                if(finalValue === 0){
                    
                    await profileModel.updateOne({userID:authorId},{quest: false})
                }

           
            
        }
    })
        await loser.onDeath(this.interaction, winner)
        
    }

}