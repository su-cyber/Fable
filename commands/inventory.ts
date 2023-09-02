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
                    
        profileModel.findOne({userID:authorId},async (err,foundUser) => {

            let btnraw= new MessageActionRow().addComponents([
                new MessageButton().setCustomId("backward").setStyle("PRIMARY").setLabel("⏪"),
                new MessageButton().setCustomId("stop").setStyle("DANGER").setLabel("stop"),
                new MessageButton().setCustomId("forward").setStyle("PRIMARY").setLabel("⏩"),
                
            ])
    
    inventory.findOne({userID:authorId},async function(err,foundInventory){
        let playerWeapons = foundInventory.inventory.weapons
        let playerArmour = foundInventory.inventory.armour
        let playerItems = foundInventory.inventory.items
        let playerPotions = foundInventory.inventory.potions

       let totalInventoy = playerWeapons.concat(playerArmour,playerPotions,playerItems)

    let filter = i => i.user.id === authorId
    let collector = await interaction.channel.createMessageComponentCollector({filter: filter , time : 1000 * 120})
    
    function chunkArray(array, chunkSize) {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += chunkSize) {
          chunkedArray.push(array.slice(i, i + chunkSize));
        }
        return chunkedArray;
      }
      const chunkedWeapons = chunkArray(playerWeapons,5);
      const chunkedArmour = chunkArray(playerArmour,5);
      const chunkedItems = chunkArray(playerItems,5);
      const chunkedPotions = chunkArray(playerPotions,5);

      let weaponEmbeds = []
      let ArmourEmbeds = []
      let ItemEmbeds = []
      let PotionEmbeds = []

      chunkedWeapons.map((data) => {
        const weapons=data.map((weapon) => {
            return `__Name__:**${weapon.name.name}**\n__Description__: ${weapon.name.description}\n__Quantity__: ${weapon.quantity}`
        }).join("\n\n")
        const newEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('WEAPONS')
        .setDescription(`${weapons}`)
        weaponEmbeds.push(newEmbed)
         
      })
      chunkedArmour.map((data) => {
        const armour=data.map((weapon) => {
            return `__Name__:**${weapon.name.name}**\n__Description__: ${weapon.name.description}\n__Quantity__: ${weapon.quantity}`
        }).join("\n\n")
        const newEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('ARMOUR')
        .setDescription(`${armour}`)
        ArmourEmbeds.push(newEmbed)
         
      })
      chunkedPotions.map((data) => {
        const potions=data.map((weapon) => {
            return `__Name__:**${weapon.name.name}**\n__Description__: ${weapon.name.description}\n__Quantity__: ${weapon.quantity}`
        }).join("\n\n")
        const newEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('POTIONS')
        .setDescription(`${potions}`)
        PotionEmbeds.push(newEmbed)
         
      })
      chunkedItems.map((data) => {
        const items=data.map((weapon) => {
            return `__Name__:**${weapon.name.name}**\n__Description__: ${weapon.name.description}\n__Quantity__: ${weapon.quantity}`
        }).join("\n\n")
        const newEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('ITEMS')
        .setDescription(`${items}`)
        ItemEmbeds.push(newEmbed)
         
      })
    let totalEmbeds = weaponEmbeds.concat(ArmourEmbeds,PotionEmbeds,ItemEmbeds)
    for(let j =0;j<totalEmbeds.length;j++){
        totalEmbeds[j].setFooter({text:`${j+1}/${totalEmbeds.length}`})
    }
    await interaction.deferReply()
    await interaction.editReply({embeds:[totalEmbeds[0]],components:[btnraw]})
    let count = 0
    collector.on('collect', async i => {
        if(i.customId === 'forward'){
            await i.deferUpdate().catch(e => {})
            if(count== totalEmbeds.length-1){
                count=0
            }
            else{
                count +=1
            }
            
            await interaction.editReply({content: null,embeds:[totalEmbeds[count]],components:[btnraw]})
        }
        else if(i.customId === 'backward'){
            await i.deferUpdate().catch(e => {})
            if(count== 0){
                count=totalEmbeds.length-1
            }
            else{
                count-=1
            }
            
            await interaction.editReply({content: null,embeds:[totalEmbeds[count]],components:[btnraw]})

        }
        else if(i.customId === 'stop'){
            collector.stop()
            
        }
        else{

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