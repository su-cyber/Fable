import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, MessageAttachment, MessageComponentInteraction,CacheType } from 'discord.js'
import allSpyralinks from '../src/age/spyralinks/allspyralinks'


export default new MyCommandSlashBuilder({ name: 'equip_spyralink', description: 'Equip a Spyralink to summon' })
    .setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id;
        const guildID = interaction.guildId;
        const exceptionEmbed = new MessageEmbed()
        .setColor('RED')
        .setTitle('INTERACTION TIMED OUT')
        .setDescription(`Oops! your interaction has been timed out as it has crossed the waiting limit for your action.\n\nHowever, don't worry! simply use the command again to restart.`)
        

        profileModel.exists({userID: authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    
        profileModel.findOne({userID:authorId},async (err,foundUser) => {

            let btnraw= new MessageActionRow().addComponents([
                new MessageButton().setCustomId("backward").setStyle("PRIMARY").setLabel("⏪"),
                new MessageButton().setCustomId("stop").setStyle("DANGER").setLabel("Cancel"),
                new MessageButton().setCustomId("forward").setStyle("PRIMARY").setLabel("⏩"),
                
            ])
            const playerSpyralinks = foundUser.all_mounts
            const totalEmbeds = []
            const allAttachments = []
            let select_spyralink 

            if(playerSpyralinks.length == 0){
                select_spyralink = new MessageActionRow().addComponents([
                    new MessageSelectMenu()
                    .setCustomId('select_spyralink')
                        .setPlaceholder(`Select a Spyralink ${interaction.user.username}`)
                        .addOptions(
                            {
                                label: 'None',
                                description: ``,
                                value: 'None',
                            }
                        )
                        .setDisabled(true),
                ])
            }
            else{
                select_spyralink = new MessageActionRow().addComponents([
                    new MessageSelectMenu()
                    .setCustomId('select_spyralink')
                        .setPlaceholder(`Select a Spyralink ${interaction.user.username}`)
                        .addOptions(
                            playerSpyralinks.map(spyralink => ({
                                label: spyralink.name,
                                description: ``,
                                value: spyralink.name,
                            }))
                        )
                        .setDisabled(false),
                ])

                playerSpyralinks.map((data) => {
                    const attachment = new MessageAttachment(`assets/Spyralinks/${data.image}`)
                    const newEmbed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('SPYRALINKS')
                    .setImage(`attachment://${data.image}`)
                    .setDescription(`## ${data.name}\n\n### Description:\n${data.description}\n\n### Skill:\n**Name:**${data.skills[0].name}\n**Description:**${data.skills[0].description}`)
                    totalEmbeds.push(newEmbed)
                    allAttachments.push(attachment)
                  })
            }


    let filter = i => i.user.id === authorId
    let collector = await interaction.channel.createMessageComponentCollector({filter: filter , time : 1000 * 300})
    
    

      let empty = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('SPYRALINKS')
      .setDescription(`**YOU DO NOT OWN ANY SPYRALINK!**`)

      
    for(let j =0;j<totalEmbeds.length;j++){
        totalEmbeds[j].setFooter({text:`Page: ${j+1}/${totalEmbeds.length}`})
    }
    await interaction.deferReply()
    if(totalEmbeds.length == 0){
        totalEmbeds.push(empty)
        await interaction.editReply({embeds:[totalEmbeds[0]],components:[],files:[]})
    }
    else{
        await interaction.editReply({embeds:[totalEmbeds[0]],components:[btnraw,select_spyralink],files:[allAttachments[0]]})

        let count = 0
        collector.on('collect', async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
            if(collected.customId === 'forward'){
                await collected.deferUpdate().catch(e => {})
                if(count== totalEmbeds.length-1){
                    count=0
                }
                else{
                    count +=1
                }
                
                await interaction.editReply({content: null,embeds:[totalEmbeds[count]],components:[btnraw,select_spyralink],files:[allAttachments[count]]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
            }
            else if(collected.customId === 'backward'){
                await collected.deferUpdate().catch(e => {})
                if(count== 0){
                    count=totalEmbeds.length-1
                }
                else{
                    count-=1
                }
                
                await interaction.editReply({content: null,embeds:[totalEmbeds[count]],components:[btnraw,select_spyralink],files:[allAttachments[count]]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
    
            }
            else if(collected.customId === 'stop'){
                collector.stop()
                
            }
            else if(collected.customId === 'select_spyralink'){
                const value = collected.values[0]
                const spyralink = await allSpyralinks.find(object => object.name === value)
                const spyralinkSkill = (spyralink as any).skills[0]
                const finalAttachment = new MessageAttachment(`assets/Spyralinks/${spyralink.image}`)
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('SPYRALINK SELECTED')
                .setImage(`attachment://${spyralink.image}`)
                .setDescription(`## ${spyralink.name}\n\n### Description:\n${spyralink.description}\n\n### Skill:\n**Name:**${spyralinkSkill.name}\n**Description:**${spyralinkSkill.description}`)
    
                await profileModel.updateOne({userID:authorId},{mount:spyralink})
                await interaction.editReply({content: null,embeds:[successembed],components:[],files:[finalAttachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
            }
            else{
    
            }
    
      
        
        })
    
    collector.on('end', () => {
    interaction.deleteReply()
    })
    
    }
    
   

        })
    }
}
        })
    })
        