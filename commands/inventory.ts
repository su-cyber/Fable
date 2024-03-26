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
    let collector = await interaction.channel.createMessageComponentCollector({filter: filter , time : 1000 * 300})
    
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

      const strongest_Weapons = findHighestDamageWeapons(playerWeapons)
     if(strongest_Weapons.melee.length == 0){
        strongest_Weapons.melee.push({name:{name:'None'}})
     }
     if(strongest_Weapons.ranged.length == 0){
        strongest_Weapons.ranged.push({name:{name:'None'}})
     }
      
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
        .setDescription(`**Strongest Melee Weapon:** ${strongest_Weapons.melee[0].name.name}\n**Strongest Ranged Weapon:** ${strongest_Weapons.ranged[0].name.name}\n\n### Available Weapons:\n\n${weapons}`)
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
      let empty = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('INVENTORY')
      .setDescription(`**YOUR ENTIRE INVENTORY IS EMPTY**`)
    let totalEmbeds = weaponEmbeds.concat(ArmourEmbeds,PotionEmbeds,ItemEmbeds)
    if(totalEmbeds.length == 0){
        totalEmbeds.push(empty)
    }
    for(let j =0;j<totalEmbeds.length;j++){
        totalEmbeds[j].setFooter({text:`Page: ${j+1}/${totalEmbeds.length}`})
    }
    await interaction.deferReply()
    await interaction.editReply({embeds:[totalEmbeds[0]],components:[btnraw]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
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
            
            await interaction.editReply({content: null,embeds:[totalEmbeds[count]],components:[btnraw]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
        }
        else if(i.customId === 'backward'){
            await i.deferUpdate().catch(e => {})
            if(count== 0){
                count=totalEmbeds.length-1
            }
            else{
                count-=1
            }
            
            await interaction.editReply({content: null,embeds:[totalEmbeds[count]],components:[btnraw]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})

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
                    await interaction.reply({content:"It seems you are not awakened yet!\n```use /awaken to begin your Fable```",ephemeral:true})
                }
            }
        })

        

      
    })


    function findHighestDamageWeapons(weaponsArray) {
        const result = {
            melee: [],
            ranged: [],
        };
    
        let highestMeleeDamage = 0;
        let highestRangedDamage = 0;
    
        // Find the highest damage for each type
        weaponsArray.forEach(weapon => {
            const { type, damage } = weapon.name;
    
            if (type === 'melee' && damage > highestMeleeDamage) {
                highestMeleeDamage = damage;
            } else if (type === 'ranged' && damage > highestRangedDamage) {
                highestRangedDamage = damage;
            }
        });
    
        // Find weapons with the highest damage for each type
        weaponsArray.forEach(weapon => {
            const { type, damage } = weapon.name;
    
            if (type === 'melee' && damage === highestMeleeDamage) {
                result.melee.push(weapon);
            } else if (type === 'ranged' && damage === highestRangedDamage) {
                result.ranged.push(weapon);
            }
        });
    
        return result;
    }
    