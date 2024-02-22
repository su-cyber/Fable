import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import aubeTownShop from '../src/age/shops/aubeTownShop'
import zoryaShop from '../src/age/shops/zoryaShop'
import blackMarket_zorya from '../src/age/shops/blackMarket_zorya'

export default new MyCommandSlashBuilder({ name: 'shop', description: 'Access the Shop' })
    .setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id;
        const guildID = interaction.guildId;
        const exceptionEmbed = new MessageEmbed()
        .setColor('RED')
        .setTitle('INTERACTION TIMED OUT')
        .setDescription(`Oops! your interaction has been timed out as it has crossed the waiting limit for your action.\n\nHowever, don't worry! simply use the command again to restart.`)
        

        profileModel.exists({userID:authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
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
    await interaction.editReply({content: null,embeds:[homeembed],components:[btnraw]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})

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
                interaction.editReply({embeds: [brassShovelEmbed]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                
                
            }
            else if(btn.customId === "artright_wares"){
                await btn.deferUpdate().catch(e => {})
                interaction.editReply({embeds: [artwright_waresEmbed]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                
                
            }
            else if(btn.customId === "spring_radiance"){
                await btn.deferUpdate().catch(e => {})
                interaction.editReply({embeds: [radianceEmbed]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
            }
            
            
        }
    



})

collector.on('end', () => {
interaction.editReply({embeds: [homeembed], components: [d_btnraw]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
})

}

else if(foundUser.location == "Siewelle Port"){
    btnraw= new MessageActionRow().addComponents([
        new MessageButton().setCustomId("vulkun_pier").setStyle("PRIMARY").setLabel("Vulkun Pier"),
        new MessageButton().setCustomId("arcturus_pier").setStyle("PRIMARY").setLabel("Arcturus Pier"),
        new MessageButton().setCustomId("hexos_pier").setStyle("PRIMARY").setLabel("Hexos Pier")
    ])

    d_btnraw= new MessageActionRow().addComponents([
        new MessageButton().setCustomId("d_vulkun_pier").setStyle("PRIMARY").setLabel("Vulkun Pier").setDisabled(true),
        new MessageButton().setCustomId("d_arcturus_pier").setStyle("PRIMARY").setLabel("Arcturus Pier").setDisabled(true),
        new MessageButton().setCustomId("d_hexos_pier").setStyle("PRIMARY").setLabel("Hexos Pier").setDisabled(true)
    ])
    let homeembed= new MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`SIEWELLE PORT`)
    .setDescription(`user: ${interaction.user.username}\n\nAs you step into the famous and lively Port of Zorya, you see various merchants selling a wide collection of products in the various piers of the dock.You look around and scan through the various piers in the crowded port and your gaze falls onto these 3 piers:-\n\n## Vulkun Pier\n*A Pier where the merchants are selling some standard quality weapons and armour,you could find something ineteresting there that can appease your taste of armour and weapons*\n\n## Arcturus Pier\n*A Pier where the merchants are selling some useful items and trinkets,you should look for something that can aid you in battle!*\n\n## Hexos Pier\n*A Pier where the merchants are selling various food items, look for something that suits your appetite*\n\n**Where will you go?**`)
    await interaction.deferReply()
    await interaction.editReply({content: null,embeds:[homeembed],components:[btnraw]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})

    let filter = i => i.user.id === authorId
    let collector = await interaction.channel.createMessageComponentCollector({filter: filter , time : 1000 * 120})
    const vulkunPier=zoryaShop.vulkunPier.map((weapon) => {
        return `${weapon.name} - ${weapon.cost} 🪙\n__Description__: ${weapon.description}`
    }).join("\n\n")

    const arcturusPier = zoryaShop.arcturusPier.map((item) => {
        return `${item.name} - ${item.cost} 🪙\n__Description__: ${item.description}`
    }).join("\n\n")

    const hexosPier = zoryaShop.hexosPier.map((item) => {
        return `${item.name} - ${item.cost} 🪙\n__Description__: ${item.description}`
    }).join("\n\n")


    let vulkunEmbed= new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('Vulkun Pier')
    .setDescription(`## AVAILABLE PRODUCTS:-\n\n${vulkunPier}\n\nUse /buy followed by the item's name to buy something from this shop\nSimilarly, you can also sell any item or weapon you own by using /sell followed by the name of the item to sell.`)

    let arcturusEmbed =  new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('Arcturus Pier')
    .setDescription(`## AVAILABLE PRODUCTS:-\n\n${arcturusPier}\n\nUse /buy followed by the item's name to buy something from this shop\nSimilarly, you can also sell any item or weapon you own by using /sell followed by the name of the item to sell.`)

    let hexosEmbed =  new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('Hexos Pier')
    .setDescription(`## AVAILABLE PRODUCTS:-\n\n${hexosPier}\n\nUse /buy followed by the item's name to buy something from this shop\nSimilarly, you can also sell any item or weapon you own by using /sell followed by the name of the item to sell.`)

    
    collector.on('collect',async (btn) => {
        if(btn.isButton()){
            if(btn.customId === "vulkun_pier"){
                await btn.deferUpdate().catch(e => {})
                interaction.editReply({embeds: [vulkunEmbed]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                
                
            }
            else if(btn.customId === "arcturus_pier"){
                await btn.deferUpdate().catch(e => {})
                interaction.editReply({embeds: [arcturusEmbed]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                
                
            }
            else if(btn.customId === "hexos_pier"){
                await btn.deferUpdate().catch(e => {})
                interaction.editReply({embeds: [hexosEmbed]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
            }
            
            
        }
    



})

collector.on('end', () => {
interaction.editReply({embeds: [homeembed], components: [d_btnraw]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
})

}

else if(foundUser.location == "Black Market"){
    btnraw= new MessageActionRow().addComponents([
        new MessageButton().setCustomId("enter_market").setStyle("PRIMARY").setLabel("Enter Black Market"),
    ])

    d_btnraw= new MessageActionRow().addComponents([
        new MessageButton().setCustomId("enter_market").setStyle("PRIMARY").setLabel("Enter Black Market").setDisabled(true),
    ])
    let homeembed= new MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`BLACK MARKET`)
    .setDescription(`user: ${interaction.user.username}\n\nAs you venture into the concealed depths of the Black Market, a shroud of secrecy envelops you. Dimly lit stalls line the labyrinthine corridors, revealing a treasure trove of forbidden wonders. The air crackles with whispered negotiations and the scent of intrigue. Your heart races as you feast your eyes on rare artifacts and experimental weapons, each whispering tales of untold power and peril. In this clandestine realm, the allure of the forbidden intertwines with the thrill of the unknown, beckoning you to immerse yourself in a world where shadows hold hidden treasures and the line between legality and chaos blurs.`)
    await interaction.deferReply()
    await interaction.editReply({content: null,embeds:[homeembed],components:[btnraw]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})

    let filter = i => i.user.id === authorId
    let collector = await interaction.channel.createMessageComponentCollector({filter: filter , time : 1000 * 120})
    const blackMarket=blackMarket_zorya.blackMarket.map((weapon) => {
        return `${weapon.name} - ${weapon.cost} 🪙\n__Description__: ${weapon.description}`
    }).join("\n\n")

    


    let blackMarketEmbed= new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('Black Market')
    .setDescription(`## AVAILABLE PRODUCTS:-\n\n${blackMarket}\n\nUse /buy followed by the item's name to buy something from this shop\nSimilarly, you can also sell any item or weapon you own by using /sell followed by the name of the item to sell.`)

    
    
    collector.on('collect',async (btn) => {
        if(btn.isButton()){
            if(btn.customId === "enter_market"){
                await btn.deferUpdate().catch(e => {})
                interaction.editReply({embeds: [blackMarketEmbed]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                
                
            }
            
            
        }
    



})

collector.on('end', () => {
interaction.editReply({embeds: [homeembed], components: [d_btnraw]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
})

}
else{
    interaction.reply({content:`you are not in a location where you can access a shop`,ephemeral:true})
}



        })
                }
                else{
                    await interaction.reply({content:"It seems you are not awakened yet!\n```use /awaken to begin your Fable```",ephemeral:true})
                }
            }
        })

        
        
        

      
        
       
        
            

      
    })