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
            new MessageButton().setCustomId("d_armour").setStyle("PRIMARY").setLabel("ARMOUR").setDisabled(true),
            new MessageButton().setCustomId("d_weapons").setStyle("PRIMARY").setLabel("WEAPONS").setDisabled(true),
            new MessageButton().setCustomId("d_items").setStyle("PRIMARY").setLabel("ITEMS").setDisabled(true),
            new MessageButton().setCustomId("d_potions").setStyle("PRIMARY").setLabel("POTIONS").setDisabled(true)
        ])


       
        
        profileModel.findOne({userID:authorId},async (err,foundUser) => {
if(foundUser.location == "Crofter's Market"){
    btnraw= new MessageActionRow().addComponents([
        new MessageButton().setCustomId("armour").setStyle("PRIMARY").setLabel("ARMOUR"),
        new MessageButton().setCustomId("weapons").setStyle("PRIMARY").setLabel("WEAPONS"),
        new MessageButton().setCustomId("items").setStyle("PRIMARY").setLabel("ITEMS"),
        new MessageButton().setCustomId("potions").setStyle("PRIMARY").setLabel("POTIONS")
    ])
    let homeembed= new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('SHOP')
    .setDescription(`user: ${interaction.user.username}\n All the weapons,items and potions currently available in ${foundUser.location}`)
    await interaction.deferReply()
    await interaction.editReply({content: null,embeds:[homeembed],components:[btnraw]})

    let filter = i => i.user.id === authorId
    let collector = await interaction.channel.createMessageComponentCollector({filter: filter , time : 1000 * 120})
    const mappedweapons=aubeTownShop.weapons.map((weapon) => {
        return `${weapon.name} - ${weapon.cost} 🪙`
    }).join("\n")

    const mappeditems = aubeTownShop.items.map((item) => {
        return `${item.name} - ${item.cost} 🪙`
    }).join("\n")

    const mappedarmour = aubeTownShop.armour.map((item) => {
        return `${item.name} - ${item.cost} 🪙`
    }).join("\n")

    const mappedpotions = aubeTownShop.potions.map((item) => {
        return `${item.name} - ${item.cost} 🪙`
    }).join("\n")

    let weaponEmbed= new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('WEAPONS')
    .setDescription(`${mappedweapons}`)

    let itemEmbed =  new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('ITEMS')
    .setDescription(`${mappeditems}`)

    let armourEmbed =  new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('ARMOUR')
    .setDescription(`${mappedarmour}`)

    let potionEmbed = new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('POTIONS')
    .setDescription(`${mappedpotions}`)

    
    collector.on('collect',async (btn) => {
        if(btn.isButton()){
            if(btn.customId === "weapons"){
                await btn.deferUpdate().catch(e => {})
                interaction.editReply({embeds: [weaponEmbed]})
                
                
            }
            else if(btn.customId === "armour"){
                await btn.deferUpdate().catch(e => {})
                interaction.editReply({embeds: [armourEmbed]})
                
                
            }
            else if(btn.customId === "items"){
                await btn.deferUpdate().catch(e => {})
                interaction.editReply({embeds: [itemEmbed]})
            }
            else if(btn.customId === "potions"){
                await btn.deferUpdate().catch(e => {})
                interaction.editReply({embeds: [potionEmbed]})
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
    const mappedweapons=aubeTownShop.weapons.map((weapon) => {
        return `${weapon.name} - ${weapon.cost} 🪙`
    }).join("\n")

    const mappeditems = aubeTownShop.items.map((item) => {
        return `${item.name} - ${item.cost} 🪙`
    }).join("\n")

    const mappedarmour = aubeTownShop.armour.map((item) => {
        return `${item.name} - ${item.cost} 🪙`
    }).join("\n")

    const mappedpotions = aubeTownShop.potions.map((item) => {
        return `${item.name} - ${item.cost} 🪙`
    }).join("\n")


    let weaponEmbed= new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('WEAPONS')
        .setDescription(`${mappedweapons}`)

        let itemEmbed =  new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('ITEMS')
        .setDescription(`${mappeditems}`)

        let armourEmbed =  new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('ARMOUR')
        .setDescription(`${mappedarmour}`)

        let potionEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('POTIONS')
        .setDescription(`${mappedpotions}`)

            
        collector.on('collect',async (btn) => {
            if(btn.isButton()){
                if(btn.customId === "weapons"){
                    await btn.deferUpdate().catch(e => {})
                    interaction.editReply({embeds: [weaponEmbed]})
                }
                else if(btn.customId === "armour"){
                    await btn.deferUpdate().catch(e => {})
                    interaction.editReply({embeds: [armourEmbed]})
                }
                else if(btn.customId === "items"){
                    await btn.deferUpdate().catch(e => {})
                    interaction.editReply({embeds: [itemEmbed]})
                }
                else if(btn.customId === "potions"){
                    await btn.deferUpdate().catch(e => {})
                    interaction.editReply({embeds: [potionEmbed]})
                }
                
            }
        

   
   
   })

   collector.on('end', () => {
    interaction.editReply({embeds: [homeembed], components: [d_btnraw]})
})

}
else{
    interaction.reply({content:`you are not in a location where you can access a shop`,ephemeral:true})
}



        })
        
        

      
        
       
        
            

      
    })