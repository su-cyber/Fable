import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import { Collector, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import { Arachnids } from '../src/age/monsters/arachnids'

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
                    interaction.reply('You already have an ongoing quest!')
                }
                else{
                    let btnraw= new MessageActionRow().addComponents([
                        new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Accept"),
                        new MessageButton().setCustomId("btn_reject").setStyle("DANGER").setLabel("Reject"),
                    ])

                    let sceneOptions = ['mob attack','item exploration']
                    const scene = sceneOptions[Math.floor(Math.random() * ((sceneOptions.length-1) - 0 + 1)) + 0]
                    let questEmbed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('QUEST')
                    .setDescription('initial')


                    if(scene === 'mob attack'){
                        let locationOptions = ['Hagard','Hage','Pacifia','Feltis']
                        let mobOptions = ['Arachnid','Goblin','Orcs','Ogres']
                        let quantity = Math.floor(Math.random() * (10 - 2 + 1)) + 2
                        let mob = mobOptions[Math.floor(Math.random() * ((mobOptions.length-1) - 0 + 1)) + 0]
                        let location = locationOptions[Math.floor(Math.random() * ((locationOptions.length-1) - 0 + 1)) + 0]
                
                        foundUser.quest_location = location
                        foundUser.quest_mob = mob
                        foundUser.quest_quantity = quantity
                
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
                        let collector = await interaction.channel.createMessageComponentCollector({filter: filter , time : 1000 * 120})
                
                        collector.on('collect',async (btn) => {
                            if(btn.isButton()){
                                if(btn.customId === "btn_accept"){
                                    await btn.deferUpdate().catch(e => {})
                                    interaction.deleteReply()
                                    interaction.channel.send(`${interaction.user.username} accepted the quest!`)

                                    
                                    foundUser.quest = true
                                        
                                    
                                }
                                else if(btn.customId === "btn_reject"){
                                    await btn.deferUpdate().catch(e => {})
                                    interaction.deleteReply()
                                    interaction.channel.send(`${interaction.user.username} rejected the quest!`)

                                    foundUser.quest_location='',
                                    foundUser.quest_mob='',
                                    foundUser.quest_quantity=0,
                                    foundUser.quest_item =''
                                }
                               
                                
                            }
                        
                
                   
                   
                    })

                    collector.on('end', () => {
                        interaction.editReply('quest expired!')
                   })

                   
                profileModel.findOneAndUpdate({userID:authorId},foundUser)   
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





