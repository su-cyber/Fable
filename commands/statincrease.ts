
import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import {MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, MessageComponentInteraction,CacheType} from 'discord.js'
import getHealth from '../src/utils/getHealth'

export default new MyCommandSlashBuilder({ name: 'statinvest', description: 'invest stat points' }).setDo(
    async (bot, interaction) => {
        
        
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
                    .setDescription(`invest stat points`)
                
                    let btnraw= new MessageActionRow().addComponents([
                        new MessageButton().setCustomId("attack_power").setStyle("PRIMARY").setLabel("VIGOUR"),
                        new MessageButton().setCustomId("magic_power").setStyle("PRIMARY").setLabel("ARCANA"),
                        new MessageButton().setCustomId("vitality").setStyle("PRIMARY").setLabel("FAITH"),
                        new MessageButton().setCustomId("durability").setStyle("PRIMARY").setLabel("ENDURANCE"),
                        new MessageButton().setCustomId("speed").setStyle("PRIMARY").setLabel("AGILITY"),
                        new MessageButton().setCustomId("magic_resistance").setStyle("PRIMARY").setLabel("INTELLIGENCE"),
                    ])
                
                    let btn_cancel = new MessageActionRow().addComponents([
                        new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),])
                
                    let select =  new MessageActionRow().addComponents([
                            new MessageSelectMenu()
                            .setCustomId('select')
                                .setPlaceholder(`Select number of skill points ${interaction.user.username}`)
                                .addOptions({
                                    
                                        label: '1',
                                        description: 'invest 1 stat point',
                                        value: '1',
                                },{
                                    label: '2',
                                    description: 'invest 2 stat point',
                                    value: '2',
                                },{
                                    label: '3',
                                    description: 'invest 3 stat point',
                                    value: '3',
                                },{
                                    label: '4',
                                    description: 'invest 4 stat point',
                                    value: '4',
                                },{
                                    label: '5',
                                    description: 'invest 5 stat point',
                                    value: '5',
                                }
                                )
                                .setDisabled(false),
                        ]) 
                
                    await interaction.deferReply()
                    await interaction.editReply({content: null,embeds:[embed],components:[btnraw]})
                
                    let filter_btn = (interaction : any) => interaction.user.id === authorId && interaction.isButton()
                    let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
                    let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"
                    let collector_btn =  interaction.channel.createMessageComponentCollector({ filter:filter_btn })
                    let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select })
                    let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel })
                
                    
                
                    collector_btn.on('collect', async i => {
                        i.deferUpdate().catch(() => null)
                        profileModel.findOne({userID:authorId}, async (err,foundUser) => {
                            if(i.customId === 'attack_power'){
                                await interaction.editReply({content: null,embeds:[embed],components:[select,btn_cancel]})
                                collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                                    collected.deferUpdate().catch(() => null)
                                    const num = collected.values[0]
                
                                    if(num>foundUser.skill_points){
                                        interaction.editReply(`not enough skill points to invest!`)
                                    }
                                    else{
                                        foundUser.attackDamage += 5*Number(num)
                                        foundUser.skill_points -= Number(num)
                                    
                                        let successembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('STAT INVEST')
                                        .setDescription(`Your attack damage has been increased to ${foundUser.attackDamage}`)
                                    await profileModel.updateOne({userID:authorId},{attackDamage:foundUser.attackDamage,skill_points:foundUser.skill_points})
                                    await interaction.editReply({embeds:[successembed],components:[]})
                                    collector_select.stop()
                                    collector_btn.stop()
                                    collector_cancel.stop()
                                    }
                                    
                                   
                                    
                                    
                                })
                                collector_cancel.on('collect', async j => {
                                    j.deferUpdate().catch(() => null)
                
                                    let delembed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('STAT INVEST')
                                    .setDescription(`stat investment cancelled!`)
                                    
                                    await interaction.editReply({embeds:[delembed],components:[]})
                                    collector_select.stop()
                                    collector_btn.stop()
                                    collector_cancel.stop()
                                })
                            } 
                
                            else if(i.customId === 'magic_power'){
                                await interaction.editReply({content: null,embeds:[embed],components:[select,btn_cancel]})
                                collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                                    collected.deferUpdate().catch(() => null)
                                    const num = collected.values[0]
                                    if(num>foundUser.skill_points){
                                        interaction.editReply(`not enough skill points to invest!`)
                                    }
                                    else{
                                        foundUser.magicPower += 5*Number(num)
                                        foundUser.skill_points -= Number(num)
                                    
                                        let successembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('STAT INVEST')
                                        .setDescription(`Your magic damage has been increased to ${foundUser.magicPower}`)
                                    await profileModel.updateOne({userID:authorId},{magicPower:foundUser.magicPower,skill_points:foundUser.skill_points,mana:foundUser.mana})
                                    await interaction.editReply({embeds:[successembed],components:[]})
                                    
                                    collector_select.stop()
                                    collector_btn.stop()
                                    collector_cancel.stop()
                                        
                                    }
                                   
                                })
                                collector_cancel.on('collect', async j => {
                                    j.deferUpdate().catch(() => null)
                
                                    let delembed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('STAT INVEST')
                                    .setDescription(`stat investment cancelled!`)
                                    
                                    await interaction.editReply({embeds:[delembed],components:[]})
                                    collector_select.stop()
                                    collector_btn.stop()
                                    collector_cancel.stop()
                                    
                                })
                            } 
                
                            else if(i.customId === 'vitality'){
                                await interaction.editReply({content: null,embeds:[embed],components:[select,btn_cancel]})
                                collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                                    collected.deferUpdate().catch(() => null)
                                    const num = collected.values[0]
                                    if(num>foundUser.skill_points){
                                        interaction.editReply(`not enough skill points to invest!`)
                                    }
                                    else{
                                        foundUser.vitality += Number(num)
                                        foundUser.health = getHealth(foundUser.level,foundUser.vitality)
                                        foundUser.skill_points -= Number(num)
                                    
                                        let successembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('STAT INVEST')
                                        .setDescription(`Your health has been increased to ${foundUser.health}`)
                                    await profileModel.updateOne({userID:authorId},{vitality:foundUser.vitality,skill_points:foundUser.skill_points,health:foundUser.health})
                                    await interaction.editReply({embeds:[successembed],components:[]})
                                    
                                    collector_select.stop()
                                    collector_btn.stop()
                                    collector_cancel.stop()
                                    }
                                    
                                    
                                })
                                collector_cancel.on('collect', async j => {
                                    j.deferUpdate().catch(() => null)
                
                                    let delembed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('STAT INVEST')
                                    .setDescription(`stat investment cancelled!`)
                                    
                                    await interaction.editReply({embeds:[delembed],components:[]})
                                    collector_select.stop()
                                    collector_btn.stop()
                                    collector_cancel.stop()
                                })
                            } 
                
                            else if(i.customId === 'durability'){
                                await interaction.editReply({content: null,embeds:[embed],components:[select,btn_cancel]})
                                collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                                    collected.deferUpdate().catch(() => null)
                                    const num = collected.values[0]
                                    if(num>foundUser.skill_points){
                                        interaction.editReply(`not enough skill points to invest!`)
                                    }
                                    else{
                                        foundUser.armour += 5*Number(num)
                                    foundUser.skill_points -= Number(num)
                                
                                    let successembed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('STAT INVEST')
                                    .setDescription(`Your Durability has been increased to ${foundUser.armour},You are now more resistant to physical attacks`)
                                await profileModel.updateOne({userID:authorId},{armour:foundUser.armour,skill_points:foundUser.skill_points})
                                await interaction.editReply({embeds:[successembed],components:[]})
                                
                                collector_select.stop()
                                collector_btn.stop()
                                collector_cancel.stop()
                                    }
                                    
                                })
                                collector_cancel.on('collect', async j => {
                                    j.deferUpdate().catch(() => null)
                
                                    let delembed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('STAT INVEST')
                                    .setDescription(`stat investment cancelled!`)
                                    
                                    await interaction.editReply({embeds:[delembed],components:[]})
                                    collector_select.stop()
                                    collector_btn.stop()
                                    collector_cancel.stop()
                                })
                            } 
                            else if(i.customId === 'magic_resistance'){
                                await interaction.editReply({content: null,embeds:[embed],components:[select,btn_cancel]})
                                collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                                    collected.deferUpdate().catch(() => null)
                                    const num = collected.values[0]
                                    if(num>foundUser.skill_points){
                                        interaction.editReply(`not enough skill points to invest!`)
                                    }
                                    else{
                                        foundUser.armour += 5*Number(num)
                                    foundUser.skill_points -= Number(num)
                                
                                    let successembed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('STAT INVEST')
                                    .setDescription(`Your Intelligence has been increased to ${foundUser.magicResistance},You are now more resistant to magical attacks`)
                                await profileModel.updateOne({userID:authorId},{magicResistance:foundUser.magicResistance,skill_points:foundUser.skill_points})
                                await interaction.editReply({embeds:[successembed],components:[]})
                                
                                collector_select.stop()
                                collector_btn.stop()
                                collector_cancel.stop()
                                    }
                                    
                                })
                                collector_cancel.on('collect', async j => {
                                    j.deferUpdate().catch(() => null)
                
                                    let delembed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('STAT INVEST')
                                    .setDescription(`stat investment cancelled!`)
                                    
                                    await interaction.editReply({embeds:[delembed],components:[]})
                                    collector_select.stop()
                                    collector_btn.stop()
                                    collector_cancel.stop()
                                })
                            } 
                
                            else if(i.customId === 'speed'){
                                await interaction.editReply({content: null,embeds:[embed],components:[select,btn_cancel]})
                                collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                                    collected.deferUpdate().catch(() => null)
                                    const num = collected.values[0]
                                    if(num>foundUser.skill_points){
                                        interaction.editReply(`not enough skill points to invest!`)
                                    }
                                    else{
                                        foundUser.evasion += 0.001*Number(num)
                                        foundUser.speed += 5*Number(num)
                                        
                                        foundUser.skill_points -= Number(num)
                                    
                                        let successembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('STAT INVEST')
                                        .setDescription(`Your agility has been increased to ${foundUser.speed}!\nyou now have more chance of evading an attack`)
                                    await profileModel.updateOne({userID:authorId},{evasion:foundUser.evasion,skill_points:foundUser.skill_points,speed:foundUser.speed})
                                    await interaction.editReply({embeds:[successembed],components:[]})
                                    
                                    collector_select.stop()
                                    collector_btn.stop()
                                    collector_cancel.stop()
                                        
                                    }
                                   
                                    
                                })
                                collector_cancel.on('collect', async j => {
                                    j.deferUpdate().catch(() => null)
                
                                    let delembed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('STAT INVEST')
                                    .setDescription(`stat investment cancelled!`)
                                    
                                    await interaction.editReply({embeds:[delembed],components:[]})
                                    collector_select.stop()
                                    collector_btn.stop()
                                    collector_cancel.stop()
                                })
                            }
                            
                        })
                       
                    })
                }
                else{
                    await interaction.reply({content:`it seems you have not awakened yet!`,ephemeral:true})
                }
            }
        })
 
    

    })