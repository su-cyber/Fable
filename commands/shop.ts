import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import { SlashCommandUserOption } from '@discordjs/builders'
import { SlashCommandStringOption } from '@discordjs/builders'
import allWeapons from '../src/age/weapons/allWeapons'
import shopWeapons_lvl5 from '../src/age/weapons/shopWeapons_lvl5'
import { Collector, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import shopItems_lvl5 from '../src/age/items/shopItems_lvl5'
import shopArmour_lvl5 from '../src/age/armour/shopArmour_lvl5'
import shopPotions_lvl5 from '../src/age/potions/shopPotions_lvl5'
import shopWeapons_lvl10 from '../src/age/weapons/shopWeapons_lvl10'

export default new MyCommandSlashBuilder({ name: 'shop', description: 'Access the Shop' })
    .setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id;
        const guildID = interaction.guildId;

        let mappedweapons
    
        let mappeditems
    
        let mappedarmour
    
        let mappedpotions 
        profileModel.findOne({userID:authorId},async (err,foundUser) => {
if(foundUser.level > 5 && foundUser.level<10){
     mappedweapons=shopWeapons_lvl10.map((weapon) => {
        return `${weapon.name} - ${weapon.cost} 🪙`
    }).join("\n")

     mappeditems = shopItems_lvl5.map((item) => {
        return `${item.name} - ${item.cost} 🪙`
    }).join("\n")

     mappedarmour = shopArmour_lvl5.map((item) => {
        return `${item.name} - ${item.cost} 🪙`
    }).join("\n")

     mappedpotions = shopPotions_lvl5.map((item) => {
        return `${item.name} - ${item.cost} 🪙`
    }).join("\n")

}

if(foundUser.level < 5){
     mappedweapons=shopWeapons_lvl5.map((weapon) => {
        return `${weapon.name} - ${weapon.cost} 🪙`
    }).join("\n")

     mappeditems = shopItems_lvl5.map((item) => {
        return `${item.name} - ${item.cost} 🪙`
    }).join("\n")

     mappedarmour = shopArmour_lvl5.map((item) => {
        return `${item.name} - ${item.cost} 🪙`
    }).join("\n")

     mappedpotions = shopPotions_lvl5.map((item) => {
        return `${item.name} - ${item.cost} 🪙`
    }).join("\n")

}
        })
        
        

        let homeembed= new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('SHOP')
        .setDescription(`user: ${interaction.user.username}\n All the weapons,items and potions currently available in shop`)

        let btnraw= new MessageActionRow().addComponents([
            new MessageButton().setCustomId("armour").setStyle("PRIMARY").setLabel("ARMOUR"),
            new MessageButton().setCustomId("weapons").setStyle("PRIMARY").setLabel("WEAPONS"),
            new MessageButton().setCustomId("items").setStyle("PRIMARY").setLabel("ITEMS"),
            new MessageButton().setCustomId("potions").setStyle("PRIMARY").setLabel("POTIONS")
        ])

        let d_btnraw= new MessageActionRow().addComponents([
            new MessageButton().setCustomId("d_armour").setStyle("PRIMARY").setLabel("ARMOUR").setDisabled(true),
            new MessageButton().setCustomId("d_weapons").setStyle("PRIMARY").setLabel("WEAPONS").setDisabled(true),
            new MessageButton().setCustomId("d_items").setStyle("PRIMARY").setLabel("ITEMS").setDisabled(true),
            new MessageButton().setCustomId("d_potions").setStyle("PRIMARY").setLabel("POTIONS").setDisabled(true)
        ])

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


       
        await interaction.deferReply()
        await interaction.editReply({content: null,embeds:[homeembed],components:[btnraw]})
            let filter = i => i.user.id === authorId
            let collector = await interaction.channel.createMessageComponentCollector({filter: filter , time : 1000 * 120})
    
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
      
    })