import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import { SlashCommandUserOption } from '@discordjs/builders'
import { SlashCommandStringOption } from '@discordjs/builders'
import allWeapons from '../src/age/weapons/allWeapons'
import shopWeapons_lvl5 from '../src/age/weapons/shopWeapons_lvl5'
import { Collector, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import shopItems_lvl5 from '../src/age/items/shopItems_lvl5'

export default new MyCommandSlashBuilder({ name: 'shop', description: 'Access the Shop' })
    .setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id;
        const guildID = interaction.guildId;

        const mappedweapons=shopWeapons_lvl5.map((weapon) => {
            return `${weapon.name} - ${weapon.cost} 🪙`
        }).join("\n")

        const mappeditems = shopItems_lvl5.map((item) => {
            return `${item.name} - ${item.cost} 🪙`
        }).join("\n")

        let homeembed= new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('SHOP')
        .setDescription('All the weapons,items and potions currently available in shop')

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



       
        await interaction.deferReply()
        await interaction.deleteReply()
       await interaction.channel.send({content: null,embeds:[homeembed],components:[btnraw]}).then(async (msg) => {
        let filter = i => i.user.id === authorId
        let collector = await msg.createMessageComponentCollector({filter: filter , time : 1000 * 120})

        collector.on('collect',async (btn) => {
            if(btn.isButton()){
                if(btn.customId === "weapons"){
                    await btn.deferUpdate().catch(e => {})
                    msg.edit({embeds: [weaponEmbed]})
                }
                else if(btn.customId === "armour"){
                    await btn.deferUpdate().catch(e => {})
                    msg.edit({embeds: [homeembed]})
                }
                else if(btn.customId === "items"){
                    await btn.deferUpdate().catch(e => {})
                    msg.edit({embeds: [itemEmbed]})
                }
            }
        })

        collector.on('end', () => {
            msg.edit({embeds: [homeembed], components: [d_btnraw]})
        })
       })
      
    })