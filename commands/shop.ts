import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import aubeTownShop from '../src/age/shops/aubeTownShop'

export default new MyCommandSlashBuilder({ name: 'shop', description: 'Access the Shop' })
    .setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id;
        const guildID = interaction.guildId;



        let btnraw

        let d_btnraw= new MessageActionRow().addComponents([
            new MessageButton().setCustomId("d_brass_shovel").setStyle("PRIMARY").setLabel("Brass Shovel").setDisabled(true),
        new MessageButton().setCustomId("d_artright_wares").setStyle("PRIMARY").setLabel("Artright’s Wares").setDisabled(true),
        new MessageButton().setCustomId("d_spring_radiance").setStyle("PRIMARY").setLabel("Spring Radiance Diary").setDisabled(true)
        ])


       
        
        profileModel.findOne({userID:authorId},async (err,foundUser) => {
if(foundUser.location == "Crofter's Market"){
    btnraw= new MessageActionRow().addComponents([
        new MessageButton().setCustomId("brass_shovel").setStyle("PRIMARY").setLabel("Brass Shovel"),
        new MessageButton().setCustomId("artright_wares").setStyle("PRIMARY").setLabel("Artright’s Wares"),
        new MessageButton().setCustomId("spring_radiance").setStyle("PRIMARY").setLabel("Spring Radiance Dairy")
    ])
    let homeembed= new MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`CROFTER'S MARKET`)
    .setDescription(`user: ${interaction.user.username}\n\nAs you step into the lively market of Aube town, you see various shops selling a wide collection of products prepared by the hardworking crofters.You look around and scan through the various shops in the crowded market and your gaze falls onto these 3 shops:-\n\n## Brass Shovel\n*A Weapon shop selling some standard quality weapons, maybe you could find something ineteresting there that can fit your fighting style*\n\n## Artright’s Wares\n*A shop selling some well designed local wearables,There is always some room for fashion!*\n\n## Spring Radiance Dairy\n*A dairy shop selling fresh dairy products prepared from healthy Radiantura milk and ofcourse fresh Radiatura's milk*\n\n**Where will you go?**`)
    await interaction.deferReply()
    await interaction.editReply({content: null,embeds:[homeembed],components:[btnraw]})

    let filter = i => i.user.id === authorId
    let collector = await interaction.channel.createMessageComponentCollector({filter: filter , time : 1000 * 120})
    const brassShovel=aubeTownShop.brassShovel.map((weapon) => {
        return `${weapon.name} - ${weapon.cost} 🪙\n__Description__: ${weapon.description}`
    }).join("\n\n")

    const artrights_Wares = aubeTownShop.artrights_Wares.map((item) => {
        return `${item.name} - ${item.cost} 🪙\n__Description__: ${item.description}`
    }).join("\n\n")

    const spring_radiance = aubeTownShop.spring_radiance.map((item) => {
        return `${item.name} - ${item.cost} 🪙\n__Description__: ${item.description}`
    }).join("\n\n")


    let brassShovelEmbed= new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('Brass Shovel')
    .setDescription(`## AVAILABLE PRODUCTS:-\n\n${brassShovel}\n\nUse /buy followed by the item's name to buy something from this shop\nSimilarly, you can also sell any item or weapon you own by using /sell followed by the name of the item to sell.`)

    let artwright_waresEmbed =  new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('Artright’s Wares')
    .setDescription(`## AVAILABLE PRODUCTS:-\n\n${artrights_Wares}\n\nUse /buy followed by the item's name to buy something from this shop\nSimilarly, you can also sell any item or weapon you own by using /sell followed by the name of the item to sell.`)

    let radianceEmbed =  new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('Spring Radiance Dairy')
    .setDescription(`## AVAILABLE PRODUCTS:-\n\n${spring_radiance}\n\nUse /buy followed by the item's name to buy something from this shop\nSimilarly, you can also sell any item or weapon you own by using /sell followed by the name of the item to sell.`)

    
    collector.on('collect',async (btn) => {
        if(btn.isButton()){
            if(btn.customId === "brass_shovel"){
                await btn.deferUpdate().catch(e => {})
                interaction.editReply({embeds: [brassShovelEmbed]})
                
                
            }
            else if(btn.customId === "artright_wares"){
                await btn.deferUpdate().catch(e => {})
                interaction.editReply({embeds: [artwright_waresEmbed]})
                
                
            }
            else if(btn.customId === "spring_radiance"){
                await btn.deferUpdate().catch(e => {})
                interaction.editReply({embeds: [radianceEmbed]})
            }
            
            
        }
    



})

collector.on('end', () => {
interaction.editReply({embeds: [homeembed], components: [d_btnraw]})
})

}

else if(foundUser.location == "some other shop"){
    let homeembed= new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('SHOP')
    .setDescription(`user: ${interaction.user.username}\n All the weapons,items and potions currently available in ${foundUser.location}`)
    await interaction.deferReply()
    await interaction.editReply({content: null,embeds:[homeembed],components:[btnraw]})

    let filter = i => i.user.id === authorId
    let collector = await interaction.channel.createMessageComponentCollector({filter: filter , time : 1000 * 120})
    


  

   collector.on('end', () => {
    interaction.editReply({embeds: [homeembed], components: [d_btnraw]})
})

}
else{
    interaction.reply({content:`you are not in a location where you can access a shop`,ephemeral:true})
}



        })
        
        

      
        
       
        
            

      
    })