
import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import {MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, MessageComponentInteraction,CacheType} from 'discord.js'
import getHealth from '../src/utils/getHealth'

export default new MyCommandSlashBuilder({ name: 'statinvest', description: 'invest stat points' }).setDo(
    async (bot, interaction) => {
        
        const exceptionEmbed = new MessageEmbed()
        .setColor('RED')
        .setTitle('INTERACTION TIMED OUT')
        .setDescription(`Oops! your interaction has been timed out as it has crossed the waiting limit for your action.\n\nHowever, don't worry! simply use the command again to restart.`)
        
        const authorId = interaction.user.id;
        profileModel.exists({userID:authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    let embed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('STAT INVEST')
                    .setDescription(`How have the newly unlocked Spyr Cores affected your body?`)
                
                    let btnraw= new MessageActionRow().addComponents([
                        new MessageButton().setCustomId("attack_power").setStyle("PRIMARY").setLabel("VIGOUR"),
                        new MessageButton().setCustomId("magic_power").setStyle("PRIMARY").setLabel("ARCANA"),
                        new MessageButton().setCustomId("durability").setStyle("PRIMARY").setLabel("ENDURANCE"),
                        new MessageButton().setCustomId("speed").setStyle("PRIMARY").setLabel("AGILITY"),
                        new MessageButton().setCustomId("magic_resistance").setStyle("PRIMARY").setLabel("KNOWLEDGE"),
                    ])
                
                    let btn_cancel = new MessageActionRow().addComponents([
                        new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),])
                
                    // let select =  new MessageActionRow().addComponents([
                    //         new MessageSelectMenu()
                    //         .setCustomId('select')
                    //             .setPlaceholder(`Select number of skill points ${interaction.user.username}`)
                    //             .addOptions({
                                    
                    //                     label: '1',
                    //                     description: 'invest 1 stat point',
                    //                     value: '1',
                    //             },{
                    //                 label: '2',
                    //                 description: 'invest 2 stat point',
                    //                 value: '2',
                    //             },{
                    //                 label: '3',
                    //                 description: 'invest 3 stat point',
                    //                 value: '3',
                    //             },{
                    //                 label: '4',
                    //                 description: 'invest 4 stat point',
                    //                 value: '4',
                    //             },{
                    //                 label: '5',
                    //                 description: 'invest 5 stat point',
                    //                 value: '5',
                    //             }
                    //             )
                    //             .setDisabled(false),
                    //     ]) 
                
                    await interaction.deferReply()
                    await interaction.editReply({content: null,embeds:[embed],components:[btnraw]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                
                    let filter_btn = (interaction : any) => interaction.user.id === authorId && interaction.isButton()
                    // let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
                    // let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"
                    let collector_btn =  interaction.channel.createMessageComponentCollector({ filter:filter_btn,time:1000*300 })
                    // let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select })
                    // let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel })
                
                    
                
                    collector_btn.on('collect', async i => {
                        i.deferUpdate().catch(() => null)
                        profileModel.findOne({userID:authorId}, async (err,foundUser) => {
                            if(i.customId === 'attack_power'){
                                    const num = 1
                
                                    if(num>foundUser.skill_points){
                                        interaction.editReply({content:`not enough skill points to invest!`,components:[],embeds:[]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                    }
                                    else{
                                        foundUser.attackDamage += 5*Number(num)
                                        foundUser.skill_points -= Number(num)
                                    
                                        let successembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('STAT INVEST')
                                        .setDescription(`Your Vigour has been increased! Your body feels more powerful as strength courses through you.`)
                                    await profileModel.updateOne({userID:authorId},{attackDamage:foundUser.attackDamage,skill_points:foundUser.skill_points})
                                    await interaction.editReply({embeds:[successembed],components:[]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                    
                                    collector_btn.stop()
                                    
                                    }
                            
                            } 
                
                            else if(i.customId === 'magic_power'){
                                const num = 1
                
                                    if(num>foundUser.skill_points){
                                        interaction.editReply({content:`not enough skill points to invest!`,components:[],embeds:[]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                    }
                                    else{
                                        foundUser.magicPower += 5*Number(num)
                                        foundUser.skill_points -= Number(num)
                                    
                                        let successembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('STAT INVEST')
                                        .setDescription(`Your Arcana has been increased! You can feel your arcane powers increase as more spyr flows through your spyr circuits.`)
                                    await profileModel.updateOne({userID:authorId},{magicPower:foundUser.magicPower,skill_points:foundUser.skill_points})
                                    await interaction.editReply({embeds:[successembed],components:[]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                    
                                    collector_btn.stop()
                                    
                                    }
                            } 
             
                
                            else if(i.customId === 'durability'){
                                const num = 1
                
                                if(num>foundUser.skill_points){
                                    interaction.editReply({content:`not enough skill points to invest!`,components:[],embeds:[]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                }
                                else{
                                    foundUser.armour += 5*Number(num)
                                    foundUser.skill_points -= Number(num)
                                
                                    let successembed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('STAT INVEST')
                                    .setDescription(`Your Durability has been increased! You can feel your body get sturdy and more resistant to physical attacks`)
                                await profileModel.updateOne({userID:authorId},{armour:foundUser.armour,skill_points:foundUser.skill_points})
                                await interaction.editReply({embeds:[successembed],components:[]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                
                                collector_btn.stop()
                                
                                }
                            } 
                            else if(i.customId === 'magic_resistance'){
                                const num = 1
                
                                    if(num>foundUser.skill_points){
                                        interaction.editReply({content:`not enough skill points to invest!`,components:[],embeds:[]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                    }
                                    else{
                                        foundUser.magicResistance += 5*Number(num)
                                        foundUser.skill_points -= Number(num)
                                    
                                        let successembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('STAT INVEST')
                                        .setDescription(`Your Knowledge has been increased! You are now more resistant to attacks conjured with spyr`)
                                    await profileModel.updateOne({userID:authorId},{magicResistance:foundUser.magicResistance,skill_points:foundUser.skill_points})
                                    await interaction.editReply({embeds:[successembed],components:[]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                    
                                    collector_btn.stop()
                                    
                                    }
                            } 
                
                            else if(i.customId === 'speed'){
                                const num = 1
                
                                    if(num>foundUser.skill_points){
                                        interaction.editReply({content:`not enough skill points to invest!`,components:[],embeds:[]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                    }
                                    else{
                                        foundUser.speed += 5*Number(num)
                                        foundUser.evasion +=0.001
                                        foundUser.skill_points -= Number(num)
                                    
                                        let successembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('STAT INVEST')
                                        .setDescription(`Your Agility has been increased! You can feel that your body is more light and your reflexes have been increased`)
                                    await profileModel.updateOne({userID:authorId},{speed:foundUser.speed,evasion:foundUser.evasion,skill_points:foundUser.skill_points})
                                    await interaction.editReply({embeds:[successembed],components:[]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                    
                                    collector_btn.stop()
                                    
                                    }
                            }
                            
                        })
                       
                    })
                }
                else{
                    await interaction.reply({content:"It seems you are not awakened yet!\n```use /awaken to begin your Fable```",ephemeral:true})
                }
            }
        })
 
    

    })