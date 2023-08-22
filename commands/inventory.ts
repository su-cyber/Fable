import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import aubeTownShop from '../src/age/shops/aubeTownShop'
import inventory from '../models/InventorySchema'
import allWeapons from '../src/age/weapons/allWeapons'
export default new MyCommandSlashBuilder({ name: 'inventory', description: 'Access your inventory' })
    .setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id;
        const guildID = interaction.guildId;


        profileModel.exists({userID: authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    let btnraw
        profileModel.findOne({userID:authorId},async (err,foundUser) => {

    btnraw= new MessageActionRow().addComponents([
        new MessageButton().setCustomId("weapons").setStyle("PRIMARY").setLabel("WEAPONS"),
        new MessageButton().setCustomId("armour").setStyle("PRIMARY").setLabel("ARMOUR"),
        new MessageButton().setCustomId("items").setStyle("PRIMARY").setLabel("ITEMS"),
        new MessageButton().setCustomId("potions").setStyle("PRIMARY").setLabel("POTIONS")
    ])
    
    inventory.findOne({userID:authorId},async function(err,foundInventory){
        let playerWeapons = foundInventory.inventory.weapons
        let playerArmour = foundInventory.inventory.armour
        let playerItems = foundInventory.inventory.items
        let playerPotions = foundInventory.inventory.potions

       

    let filter = i => i.user.id === authorId
    let collector = await interaction.channel.createMessageComponentCollector({filter: filter , time : 1000 * 120})
    const weapons=playerWeapons.map((weapon) => {
        return `__Name__:**${weapon.name.name}**\n__Description__: ${weapon.name.description}\n__Quantity__: ${weapon.quantity}`
    }).join("\n\n")

    const armour=playerArmour.map((weapon) => {
        return `__Name__:**${weapon.name.name}**\n__Description__: ${weapon.name.description}\n__Quantity__: ${weapon.quantity}`
    }).join("\n\n")

    const items=playerItems.map((weapon) => {
        return `__Name__:**${weapon.name.name}**\n__Description__: ${weapon.name.description}\n__Quantity__: ${weapon.quantity}`
    }).join("\n\n")

    const potions=playerPotions.map((weapon) => {
        return `__Name__:**${weapon.name.name}**\n__Description__: ${weapon.name.description}\n__Quantity__: ${weapon.quantity}`
    }).join("\n\n")

    let WeaponEmbed
    let ArmourEmbed
    let ItemsEmbed
    let PotionsEmbed
    if(playerWeapons.length != 0){
        WeaponEmbed= new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('WEAPONS')
        .setDescription(`## AVAILABLE WEAPONS:-\n\n${weapons}\n\nUse **/equip** followed by the weapon's name to equip a weapon from the inventory`)
    
    }
    else{
        WeaponEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('WEAPONS')
        .setDescription(`## AVAILABLE WEAPONS:-\n\n### NONE\n\n`)
    
    }
    if(playerArmour.length != 0){
    ArmourEmbed =  new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('ARMOUR')
    .setDescription(`## AVAILABLE ARMOUR:-\n\n${armour}\n\nUse **/equip** followed by the armour's name to equip an armour from the inventory`)

    }
    else{
        ArmourEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('ARMOUR')
        .setDescription(`## AVAILABLE ARMOUR:-\n\n### NONE\n\n`)
    
    }
    if(playerItems.length !=0){
    ItemsEmbed =  new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('ITEMS')
    .setDescription(`## AVAILABLE ITEMS:-\n\n${items}\n\nUse **/use** followed by the item's name to use the item\nSimilarly, you can also equip any trinkets you own by using **/equip** followed by the name of the item to equip.`)

     }
     else{
        ItemsEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('ITEMS')
        .setDescription(`## AVAILABLE ITEMS:-\n\n### NONE\n\n`)
     }
     if(playerPotions.length != 0){
        PotionsEmbed =  new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('ITEMS')
        .setDescription(`## AVAILABLE ITEMS:-\n\n${potions}\n\nUse **/use** followed by the potion's name to use the potion`)
    
     }
     else{
        PotionsEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('POTIONS')
        .setDescription(`## AVAILABLE POTIONS:-\n\n### NONE\n\n`)
     }
    
    await interaction.reply({embeds:[WeaponEmbed],components:[btnraw]})
    collector.on('collect',async (btn) => {
        if(btn.isButton()){
            if(btn.customId === "weapons"){
                await btn.deferUpdate().catch(e => {})
                interaction.editReply({embeds: [WeaponEmbed]})
                
                
            }
            else if(btn.customId === "armour"){
                await btn.deferUpdate().catch(e => {})
                interaction.editReply({embeds: [ArmourEmbed]})
                
                
            }
            else if(btn.customId === "items"){
                await btn.deferUpdate().catch(e => {})
                interaction.editReply({embeds: [ItemsEmbed]})
            }
            else if(btn.customId === "potions"){
                await btn.deferUpdate().catch(e => {})
                interaction.editReply({embeds: [PotionsEmbed]})
            }
            
            
        }
    



})

collector.on('end', () => {
interaction.deleteReply()
})

    })




    






        })
        
        

      
        
       
        
            
                }
                else{
                    interaction.reply({content:`It seems you have not awakened yet!`,ephemeral:true})
                }
            }
        })

        

      
    })