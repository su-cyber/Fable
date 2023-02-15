import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import { SlashCommandIntegerOption, SlashCommandUserOption } from '@discordjs/builders'
import { SlashCommandStringOption } from '@discordjs/builders'
import { Channel, Collector, Message, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } from 'discord.js'
import shopItems_lvl5 from '../src/age/items/shopItems_lvl5'
import shopArmour_lvl5 from '../src/age/armour/shopArmour_lvl5'
import shopPotions_lvl5 from '../src/age/potions/shopPotions_lvl5'
import aubeTownShop from '../src/age/shops/aubeTownShop'


export default new MyCommandSlashBuilder({ name: 'buy', description: 'buy any weapon,armour or item' })
.addStringOption((option: SlashCommandStringOption) =>
        option.setName('type').setDescription('weapon,armour or item').setRequired(true)
    )
.addStringOption((option: SlashCommandStringOption) =>
        option.setName('object').setDescription('name of the weapon,armour or item').setRequired(true)
    )
.addIntegerOption((option: SlashCommandIntegerOption) => 
            option.setName('quantity').setDescription('quantity to buy').setRequired(true)
)
    .setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id;
        const guildID = interaction.guildId;
        const userType = interaction.options.getString('type').toLowerCase()
        const userobject = interaction.options.getString('object').toLowerCase()
        const userQuantity = interaction.options.getInteger('quantity')


        profileModel.exists({userID:authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    profileModel.findOne({userID:authorId},async function(err,profile){
                        const location = profile.location
                    
                    if(location == "Crofter's Market"){
                        if(userType === "weapon"){
                            const foundObject = aubeTownShop.weapons.find(object => object.name.toLowerCase() === userobject)
                            if(foundObject){
                                profileModel.findOne({userID:authorId},async function(err,userProfile){
                                    if(err){
                                        console.log(err);
                                        
                                    }
                                    else{
                                        if(userProfile.coins<foundObject.cost*userQuantity){
                                            interaction.reply("you dont have enough coins!")
                                        }
                                        else{
                                            userProfile.coins-=foundObject.cost*userQuantity
                                            inventory.exists({userID:authorId},async function(err,res){
                                                if(err){
                                                    console.log(err);
                                                    
                                                }
                                                else{
                                                    if(res){
                                                        inventory.findOne({userID:authorId},async function(err,foundProfile){
                                                            if(err){
                                                                console.log(err);
                                                                
                                                            }
                                                            else{
                                                                const foundInventory=foundProfile.inventory.weapons.find(object => object.name.name.toLowerCase() === userobject)
                                                                if(foundInventory){
                                                                    foundInventory.quantity+=userQuantity
                                                                }
                                                                else{
                                                                    
                                                                    const newItem = {
                                                                        name:foundObject,
                                                                        quantity:Number(userQuantity)
                                                                    }
                                                                    foundProfile.inventory.weapons.push(newItem)
                                                                }
                                                                
                                                            await inventory.updateOne({userID:authorId},foundProfile)
                
                                                            
                                                            }
                                                            
                                                        })
                                                        await interaction.reply({content:`${userQuantity} ${userobject}(s) has been bought successfully!`})
                                                    }
                                                    else{
                                                       
                                                    }
                            
                                                }
                                            })
                                        }
                                        await profileModel.updateOne({userID:authorId},userProfile)
                                    }})
                                    
                                
                            }
                            else{
                                await interaction.reply(`no object called ${userobject} was found in the shop`)
                            }
                        }
                        else if(userType === "item"){
                            const foundObject = aubeTownShop.items.find(object => object.name.toLowerCase() === userobject)
                            if(foundObject){
                                profileModel.findOne({userID:authorId},async function(err,userProfile){
                                    if(err){
                                        console.log(err);
                                        
                                    }
                                    else{
                                        if(userProfile.coins<foundObject.cost*userQuantity){
                                            interaction.reply("you dont have enough coins!")
                                        }
                                        else{
                                            userProfile.coins-=foundObject.cost*userQuantity
                                            inventory.exists({userID:authorId},async function(err,res){
                                                if(err){
                                                    console.log(err);
                                                    
                                                }
                                                else{
                                                    if(res){
                                                        inventory.findOne({userID:authorId},async function(err,foundProfile){
                                                            if(err){
                                                                console.log(err);
                                                                
                                                            }
                                                            else{
                                                                const foundInventory=foundProfile.inventory.items.find(object => object.name === foundObject.name)
                                                                if(foundInventory){
                                                                    foundInventory.quantity+=userQuantity
                                                                }
                                                                else{
                                                                    
                                                                    const newItem = {
                                                                        name:foundObject.name,
                                                                        quantity:Number(userQuantity)
                                                                    }
                                                                    foundProfile.inventory.items.push(newItem)
                                                                }
                                                                
                                                            await inventory.updateOne({userID:authorId},foundProfile)
                
                                                            
                                                            }
                                                            
                                                        })
                                                        await interaction.reply({content:`${userQuantity} ${userobject}(s) has been bought successfully!`})
                                                    }
                                                    else{
                                                       
                                                    }
                            
                                                }
                                            })
                                        }
                                        await profileModel.updateOne({userID:authorId},userProfile)
                                    }})
                                    
                                
                            }
                            else{
                                await interaction.reply(`no object called ${userobject} was found in the shop`)
                            }
                        }
                        else if(userType === "armour") {
                            const foundObject = aubeTownShop.armour.find(object => object.name.toLowerCase() === userobject)
                            if(foundObject){
                                profileModel.findOne({userID:authorId},async function(err,userProfile){
                                    if(err){
                                        console.log(err);
                                        
                                    }
                                    else{
                                        if(userProfile.coins<foundObject.cost*userQuantity){
                                            interaction.reply("you dont have enough coins!")
                                        }
                                        else{
                                            userProfile.coins-=foundObject.cost*userQuantity
                                            inventory.exists({userID:authorId},async function(err,res){
                                                if(err){
                                                    console.log(err);
                                                    
                                                }
                                                else{
                                                    if(res){
                                                        inventory.findOne({userID:authorId},async function(err,foundProfile){
                                                            if(err){
                                                                console.log(err);
                                                                
                                                            }
                                                            else{
                                                                const foundInventory=foundProfile.inventory.armour.find(object => object.name.name.toLowerCase() === userobject)
                                                                if(foundInventory){
                                                                    foundInventory.quantity+=userQuantity
                                                                }
                                                                else{
                                                                    
                                                                    const newItem = {
                                                                        name:foundObject,
                                                                        quantity:Number(userQuantity)
                                                                    }
                                                                    foundProfile.inventory.armour.push(newItem)
                                                                }
                                                                
                                                            await inventory.updateOne({userID:authorId},foundProfile)
                
                                                            
                                                            }
                                                            
                                                        })
                                                        await interaction.reply({content:`${userQuantity} ${userobject}(s) has been bought successfully!`})
                                                    }
                                                    else{
                                                       
                                                    }
                            
                                                }
                                            })
                                        }
                                        await profileModel.updateOne({userID:authorId},userProfile)
                                    }})
                                    
                                
                            }
                            else{
                                await interaction.reply(`no object called ${userobject} was found in the shop`)
                            }
                        }
    
                        else if(userType === "potion"){
                            const foundObject = aubeTownShop.potions.find(object => object.name.toLowerCase() === userobject)
                            if(foundObject){
                                profileModel.findOne({userID:authorId},async function(err,userProfile){
                                    if(err){
                                        console.log(err);
                                        
                                    }
                                    else{
                                        if(userProfile.coins<foundObject.cost*userQuantity){
                                            interaction.reply("you dont have enough coins!")
                                        }
                                        else{
                                            userProfile.coins-=foundObject.cost*userQuantity
                                            inventory.exists({userID:authorId},async function(err,res){
                                                if(err){
                                                    console.log(err);
                                                    
                                                }
                                                else{
                                                    if(res){
                                                        inventory.findOne({userID:authorId},async function(err,foundProfile){
                                                            if(err){
                                                                console.log(err);
                                                                
                                                            }
                                                            else{
                                                                const foundInventory=foundProfile.inventory.potions.find(object => object.name.name.toLowerCase() === userobject)
                                                                if(foundInventory){
                                                                    foundInventory.quantity+=userQuantity
                                                                }
                                                                else{
                                                                    
                                                                    const newItem = {
                                                                        name:foundObject,
                                                                        quantity:Number(userQuantity)
                                                                    }
                                                                    foundProfile.inventory.potions.push(newItem)
                                                                }
                                                                
                                                            await inventory.updateOne({userID:authorId},foundProfile)
                
                                                            
                                                            }
                                                            
                                                        })
                                                        await interaction.reply({content:`${userQuantity} ${userobject}(s) has been bought successfully!`})
                                                    }
                                                    else{
                                                       
                                                    }
                            
                                                }
                                            })
                                        }
                                        await profileModel.updateOne({userID:authorId},userProfile)
                                    }})
                                    
                                
                            }
                            else{
                                await interaction.reply(`no object called ${userobject} was found in the shop`)
                            }
                        }
                    }
                
                    else{
                        interaction.reply(`You are not in a shop!`)
                    }
                })
  
                }
                else{
                    await interaction.reply("it seems you are not an awakened yet")
                }
            }
        })
        
       




    })