import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import { Interaction, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import aubeTownShop from '../src/age/shops/aubeTownShop'
import inventory from '../models/InventorySchema'
import allWeapons from '../src/age/weapons/allWeapons'
import { PaginatedEmbed } from 'embed-paginator/dist'
import { Item } from '../src/age/item'
import { TextChannel } from 'discord.js'

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

    
    
    inventory.findOne({userID:authorId},async function(err,foundInventory){
        let playerWeapons = foundInventory.inventory.weapons
        let playerArmour = foundInventory.inventory.armour
        let playerItems = foundInventory.inventory.items
        let playerPotions = foundInventory.inventory.potions

        let combined = playerWeapons.concat(playerArmour,playerItems,playerPotions)
       const embed = new PaginatedEmbed({
            itemsPerPage: 5,
            paginationType:'description',
            showFirstLastBtns: false
        })
        .setDescriptions(combined.map((item) => `${item.name.name}`))

        await embed.send({options:{interaction:interaction}})

    
    })




    






        })
        
        

      
        
       
        
            
                }
                else{
                    interaction.reply({content:`It seems you have not awakened yet!`,ephemeral:true})
                }
            }
        })

        

      
    })