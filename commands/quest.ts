import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import { Collector, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import { Arachnids } from '../src/age/monsters/arachnid'

export default new MyCommandSlashBuilder({ name: 'quest', description: 'get a quest' }).setDo(
    async (bot, interaction) => {
        
        
        const authorId = interaction.user.id;
        const guildID = interaction.guildId;

        profileModel.exists({userID: authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                   
        profileModel.findOne({userID:authorId},async function(err,foundUser) {
            if(err){
                console.log(err);
                
            }
            else{
                if(foundUser.quest){
                    let questEmbed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('QUEST')
                    .setDescription(`You already have an ongoing quest!\n\nmob: ${foundUser.quest_mob}\nquantity: ${foundUser.quest_quantity}\nlocation: ${foundUser.quest_location}\nitem: ${foundUser.quest_item}`)
                    interaction.reply({embeds:[questEmbed]})
                }
                else{
                    let btnraw= new MessageActionRow().addComponents([
                        new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Accept"),
                        new MessageButton().setCustomId("btn_reject").setStyle("DANGER").setLabel("Reject"),
                    ])

                    let d_btnraw = new MessageActionRow().addComponents([
                        new MessageButton().setCustomId("dbtn_accept").setStyle("PRIMARY").setLabel("Accept").setDisabled(true),
                        new MessageButton().setCustomId("dbtn_reject").setStyle("DANGER").setLabel("Reject").setDisabled(true),
                    ])

                    let sceneOptions = ['mob attack','item exploration']
                    const scene = sceneOptions[Math.floor(Math.random() * ((sceneOptions.length-1) - 0 + 1)) + 0]
                    let questEmbed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('QUEST')
                    .setDescription('initial')

                    let acceptEmbed = new MessageEmbed()
                    .setColor('GREEN')
                    .setTitle('ACCEPTED')
                    .setDescription('You have accepted the quest!')

                    let rejectEmbed = new MessageEmbed()
                    .setColor('RED')
                    .setTitle('REJECTED')
                    .setDescription('You have rejected! the quest!')

                    if(scene === 'mob attack'){
                        let locationOptions = ['Hagard','Hage','Pacifia','Feltis']
                        let mobOptions = ['Blood Hound','Goblin','Orc','Ogre']
                        let quantity = Math.floor(Math.random() * (10 - 2 + 1)) + 2
                        let mob = mobOptions[Math.floor(Math.random() * ((mobOptions.length-1) - 0 + 1)) + 0]
                        let location = locationOptions[Math.floor(Math.random() * ((locationOptions.length-1) - 0 + 1)) + 0]
                
                        foundUser.quest_location = location
                        foundUser.quest_mob = mob
                        foundUser.quest_quantity = quantity
                        foundUser.quest_item = ""
                        foundUser.quest = true
                       questEmbed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('QUEST')
                        .setDescription(`A group of ${mob}s are attacking the town of ${location}!\n you are tasked with helping in subduing the ${mob}s\n\n Task: **kill ${quantity} ${mob}s in ${location}**`)
                
                    }
                    else if(scene === 'item exploration'){
                        let itemOptions = ["Ghoul's Skull","Goblin's Pouch","Direwolf Claw"]
                        let item = itemOptions[Math.floor(Math.random() * ((itemOptions.length-1) - 0 + 1)) + 0]
                        let quantity = Math.floor(Math.random() * (10 - 2 + 1)) + 2
                
                        foundUser.quest_item = item
                        foundUser.quest_quantity = quantity
                        foundUser.quest = true
                        foundUser.quest_location = ""
                        foundUser.quest_mob=""
                        questEmbed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('QUEST')
                        .setDescription(`A merchant has requested a fresh stock of items that can only be obtained from monsters\n\nTask: **Obtain ${quantity} ${item}**`)
                    }
                
                    else{
                        questEmbed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('QUEST')
                        .setDescription('No Quest Available')
                    }
                
                    await interaction.deferReply()
                    await interaction.editReply({content: null,embeds:[questEmbed],components:[btnraw]})
                        let filter = i => i.user.id === authorId
                        let collector = await interaction.channel.createMessageComponentCollector({filter: filter})
                
                        collector.on('collect',async (btn) => {
                            if(btn.isButton()){
                                if(btn.customId === "btn_accept"){
                                    await btn.deferUpdate().catch(e => {})
                                    await interaction.editReply({embeds:[acceptEmbed]})
                                    

                                    
                                await profileModel.findOneAndUpdate({userID:authorId},foundUser)
                                collector.stop()
                                    
                                }
                                else if(btn.customId === "btn_reject"){
                                    await btn.deferUpdate().catch(e => {})
                                    await interaction.editReply({embeds:[rejectEmbed]})
                                    foundUser.quest_location='',
                                    foundUser.quest_mob='',
                                    foundUser.quest_quantity=0,
                                    foundUser.quest_item =''
                                    foundUser.quest = false
                                
                                    await profileModel.findOneAndUpdate({userID:authorId},foundUser)

                                    collector.stop()
                                }

                                
                                
                            }
                              
                
                   
                   
                    })

                    collector.on('end', () => {
                        interaction.editReply({components: [d_btnraw]})
                    })

                   

                   
                
                }
            
               

            }
        })
    }
    else{
        interaction.reply('it seems you are not awakened yet!')
    }
}
    })


})





