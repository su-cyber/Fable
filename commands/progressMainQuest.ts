import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import { Sword } from '../src/age/weapons/sword'
import { steelArmour } from '../src/age/armour/steel_armour'
import { healthPotion } from '../src/age/potions/healthPotion'
import { DiscordAPIError, MessageActionRow, MessageSelectMenu, SelectMenuInteraction } from 'discord.js'
import { Collector, MessageButton, MessageEmbed } from 'discord.js'
import { BeerBuccsDuo } from '../src/age/monsters/tutorial/BeerBuccsDuo'
import { MessageAttachment } from 'discord.js'
import { PvEDuel } from './fight'


export default new MyCommandSlashBuilder({ name: 'progressmainquest', description: 'progress your main quest progress' }).setDo(
    async (bot, interaction) => {
        
        
        const authorId = interaction.user.id;
        const guildID = interaction.guildId;

        profileModel.exists({userID: authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){

                    profileModel.findOne({userID:authorId}, async function(err,foundUser) {

                        if(foundUser.main_quest == "Tutorial"){
                            if(foundUser.main_quest_phase == "1"){
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
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**press "fight" to fight them off when you are ready.**`
                                    }
                                ])
                                .setDescription(`You see a Duo of Beer Buccaneers approaching your way!\n\nEquip your sword by using the command "/equip" and entering "weapon" in **type** field and "sword" in **object** field.`)
            
                                let acceptEmbed = new MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('New Beginnings')
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Fight the Beer Buccaneers**`
                                    }
                                ])
                                .setDescription('You have decided to fight!check your private message.\nRemember,each encounter only lasts for 2 mins!fight them before 2 minutes are over')
            
                                let rejectEmbed = new MessageEmbed()
                                .setColor('RED')
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .setTitle('ERROR')
                                .setDescription('You cannot run away! Retry by pressing "/ProgressMainQuest"')
                                
                            
                            await interaction.reply({content: null,embeds:[fightEmbed],components:[btnraw]})
                            let filter = i => i.user.id === authorId
                                let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                        
                                collector.on('collect',async (btn) => {
                                    if(btn.isButton()){
                                        if(btn.customId === "btn_accept"){
                                            await btn.deferUpdate().catch(e => {})
                                            await interaction.editReply({embeds:[acceptEmbed]})
                                            const encounter = {
                                                name: 'BeerBuccsDuo',
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

                            else if(foundUser.main_quest_phase == "2"){

                                let btnraw= new MessageActionRow().addComponents([
                                    new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Fight"),
                                    new MessageButton().setCustomId("btn_reject").setStyle("DANGER").setLabel("Run"),])
        
                                    let d_btnraw = new MessageActionRow().addComponents([
                                        new MessageButton().setCustomId("dbtn_accept").setStyle("PRIMARY").setLabel("Fight").setDisabled(true),
                                        new MessageButton().setCustomId("dbtn_reject").setStyle("DANGER").setLabel("Run").setDisabled(true),
                                    ])
        
                                const attachment = new MessageAttachment('assets/AubeTown/Ghorgon.jpeg')
                                let fightEmbed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('ENCOUNTER')
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .setImage('attachment://Ghorgon.jpeg')
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Fight the Gorghon**`
                                    }
                                ])
                                .setDescription(` Just as you finish off the two Beer Buccaneers, you notice that the other conscripts were having a very bad time. Some were well off, and yet many were already in the mud. You too are surrounded, but then a giant Ghorgon swoops in from the Castellan Fields, and flings the Beer Buccaneers in the air. It rushes towards you. You will have to fight this beast. `)
            
                                let acceptEmbed = new MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('New Beginnings')
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .setThumbnail('attachment://Ghorgon.jpeg')
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Press "/progressmainquest" to continue**`
                                    }
                                ])
                                .setDescription(' You wake up in the tiny guild outpost within Aube Town. You were told that the Ghorgon had escaped from a nearby Fragment, but it was killed by the Vice-Master of {x} Guild. He is also the one who saved your life.\n The Vice Master further said that he was impressed by you, and wants to give you a letter of recommendation to receive the “Guild Hunter License”. Usually you would need to pay a big fee to even register as a Guild Ranger (Guild member not belonging to any prominent guild who’s only involved in Defense or Research). One needs to have the Guild Hunter License to secure higher tiers of quests that involve fighting within fragments, explorations and other high-profile quests. All year, people from around the world complete low-tier quests to raise their merit in order to receive a letter of recommendation. With enough merit and a letter of recommendation, the aspiring ranger can take part in the Guild Carnival and join a guild!')
            
                                let rejectEmbed = new MessageEmbed()
                                .setColor('RED')
                                .setTitle('ERROR')
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .setThumbnail('attachment://Ghorgon.jpeg')
                                .setDescription('You cannot run away! Retry by pressing "/ProgressMainQuest"')
                                
                            
                            await interaction.reply({content: null,embeds:[fightEmbed],components:[btnraw],files:[attachment]})
                            let filter = i => i.user.id === authorId
                                let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                        
                                collector.on('collect',async (btn) => {
                                    if(btn.isButton()){
                                        if(btn.customId === "btn_accept"){
                                            await btn.deferUpdate().catch(e => {})
                                            await interaction.editReply({embeds:[acceptEmbed],files:[attachment]})
                            
                                            
                                            await profileModel.updateOne({userID:interaction.user.id},{main_quest_phase:"3"})
                                            
                                       
                                        collector.stop()
                                            
                                        }
                                        else if(btn.customId === "btn_reject"){
                                            await btn.deferUpdate().catch(e => {})
                                            await interaction.editReply({embeds:[rejectEmbed],files:[attachment]})
                                            
        
                                            collector.stop()
                                        }
        
                                        
                                        
                                    }
                                      
                        
                           
                           
                            })
        
                            collector.on('end', () => {
                                interaction.editReply({components: [d_btnraw]})
                            })



                            }

                        else if(foundUser.main_quest_phase == "3"){
                            await profileModel.updateOne({userID:authorId},{location:"The Guild Outpost"})
                            let fightEmbed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('New Beginnings')
                            .setAuthor({
                                iconURL:interaction.user.displayAvatarURL(),
                                name:interaction.user.tag
                            })
                            .addFields([
                                {
                                    name: `Current Objective:`,
                                    value:`**Use "/explore" command to explore Aube town and complete all the quests.**`
                                }
                            ])
                            
                            
                            .setDescription(`finish all of the quests within Aube Town and meet this “Vice-Master” back in the Guild Outpost.`)
        
                            await interaction.reply({content: null,embeds:[fightEmbed]})

                        }
                        }

                       
                        else{
                            interaction.reply("you currently have no ongoing main quest")
                        }

                    })


                }
                else{
                    interaction.reply(`you have not awakened yet!`)
                }
            }
        })


    })
    class PvEDuel_MQuest extends PvEDuel {
        player1: any
        player2: any
    
        
        async onEnd(winner: any, loser: any) {
            await this.sendInfoMessage(this.attacker.skills,true)
            const authorID = this.interaction.user.id
            
             profileModel.findOne({userID:authorID},async function(err,foundUser) {
                 
                 if(err){
                     console.log(err);
                     
                 }
                 else{
                     foundUser.encounter = []
                     foundUser.energy-=1
                     await profileModel.updateOne({userID:authorID},{encounter:foundUser.encounter,energy:foundUser.energy})
                     if(winner.id == authorID){
                         await profileModel.updateOne({userID:authorID},{health:winner.health})
                         if(foundUser.quest_mob == loser.name && foundUser.quest_quantity>0){
                             foundUser.quest_quantity -=1
                             
                             await profileModel.updateOne({userID:authorID},{quest_quantity:foundUser.quest_quantity})
                         }
                     }
                     else{
                         foundUser.location = "None"
                         foundUser.dungeon.status = false
                         foundUser.dungeon.name = ""
                         foundUser.dungeon.step = 0

                         
                         await profileModel.updateOne({userID:authorID},{health:loser.maxHealth,location:foundUser.location,dungeon:foundUser.dungeon,main_quest_phase:foundUser.main_quest_phase-1})
                     
                     }
                     
                         
     
                 }
             })
             await loser.onDeath(this.interaction, winner)
            
        }
    
    }