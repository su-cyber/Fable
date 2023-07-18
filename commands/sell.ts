import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import { SlashCommandIntegerOption, SlashCommandUserOption } from '@discordjs/builders'
import { SlashCommandStringOption } from '@discordjs/builders'
import allItems from '../src/age/items/allItems'


export default new MyCommandSlashBuilder({ name: 'sell', description: 'sell any weapon,armour or item' })
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
                    profileModel.findOne({userID:authorId},async function(err,foundUser){
                        const location = foundUser.location
                        if(location == "Crofter's Market"){
                            if(userType === "weapon"){
                        
                                inventory.findOne({userID:authorId},async function(err,userProfile){
                                    if(err){
                                        console.log(err);
                                        
                                    }
                                    else{
                                        const foundObject=userProfile.inventory.weapons.find(object => object.name.name.toLowerCase() === userobject)
                                        if(foundObject){
                                            if(foundObject.quantity>=userQuantity){
                                                foundObject.quantity-=userQuantity
                                                if(foundObject.quantity===0){
                                                    const index = userProfile.inventory.weapons.indexOf(foundObject)
                                                    userProfile.inventory.weapons.splice(index,1)
                                                    console.log(index);
                                                    
                                                }
                                                const selling_price=foundObject.name.cost*0.6
                                                profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                                    if(err){
                                                        console.log(err);
                                                        
                                                    }
                                                    else{
                                                        foundProfile.coins+=selling_price*userQuantity
    
                                                    }
                                                    await profileModel.updateOne({userID:authorId},foundProfile)
    
                                                })
                                                await interaction.reply({content:`${userQuantity} ${userobject}(s) has been sold for ${selling_price*userQuantity}🪙 successfully!`})
                                                
                                            }
                                            else{
                                                interaction.reply({content:`you dont have ${userQuantity} ${userobject}(s) to sell`,ephemeral:true})
                                            }
                                           
                                            await inventory.updateOne({userID:authorId},userProfile)
                                        }
    
                                    }})
                                
                            }
    
                            else if(userType === "item"){
                            
                                inventory.findOne({userID:authorId},async function(err,userProfile){
                                    if(err){
                                        console.log(err);
                                        
                                    }
                                    else{
                                        const foundObject=userProfile.inventory.items.find(object => object.name.name.toLowerCase() === userobject)
                                        if(foundObject){
                                            if(foundObject.quantity>=userQuantity){
                                                foundObject.quantity-=userQuantity
                                                if(foundObject.quantity===0){
                                                    const index = userProfile.inventory.items.indexOf(foundObject)
                                                    userProfile.inventory.items.splice(index,1)
                                                }
                                                const found = allItems.find(object => object.name.toLowerCase() === userobject)
                                                const selling_price=found.cost*0.6
                                                profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                                    if(err){
                                                        console.log(err);
                                                        
                                                    }
                                                    else{
                                                        foundProfile.coins+=selling_price*userQuantity
    
                                                    }
                                                    await profileModel.updateOne({userID:authorId},foundProfile)
    
                                                })
                                                await interaction.reply({content:`${userQuantity} ${found.name}(s) has been sold for ${selling_price*userQuantity}🪙 successfully!`})
                                                
                                            }
                                            else{
                                                interaction.reply({content:`you dont have ${userQuantity} ${userobject}(s) to sell`,ephemeral:true})
                                            }
                                           
                                            await inventory.updateOne({userID:authorId},userProfile)
                                        }
    
                                    }
                                
                                
                                })
                                
                            }
                            else if(userType === "armour"){
                                inventory.findOne({userID:authorId},async function(err,userProfile){
                                    if(err){
                                        console.log(err);
                                        
                                    }
                                    else{
                                        const foundObject=userProfile.inventory.armour.find(object => object.name.name.toLowerCase() === userobject)
                                        if(foundObject){
                                            if(foundObject.quantity>=userQuantity){
                                                foundObject.quantity-=userQuantity
                                                if(foundObject.quantity===0){
                                                    const index = userProfile.inventory.armour.indexOf(foundObject)
                                                    userProfile.inventory.armour.splice(index,1)
                                                }
                                                const selling_price=foundObject.name.cost*0.6
                                                profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                                    if(err){
                                                        console.log(err);
                                                        
                                                    }
                                                    else{
                                                        foundProfile.coins+=selling_price*userQuantity
    
                                                    }
                                                    await profileModel.updateOne({userID:authorId},foundProfile)
    
                                                })
                                                await interaction.reply({content:`${userQuantity} ${userobject}(s) has been sold for ${selling_price*userQuantity}🪙 successfully!`})
                                                
                                            }
                                            else{
                                                interaction.reply({content:`you dont have ${userQuantity} ${userobject}(s) to sell`,ephemeral:true})
                                            }
                                           
                                            await inventory.updateOne({userID:authorId},userProfile)
                                        }
    
                                    }})
                            }
    
                            else if(userType === "potion"){
                            
                                inventory.findOne({userID:authorId},async function(err,userProfile){
                                    if(err){
                                        console.log(err);
                                        
                                    }
                                    else{
                                        const foundObject=userProfile.inventory.potions.find(object => object.name.name.toLowerCase() === userobject)
                                        if(foundObject){
                                            if(foundObject.quantity>=userQuantity){
                                                foundObject.quantity-=userQuantity
                                                if(foundObject.quantity===0){
                                                    const index = userProfile.inventory.potions.indexOf(foundObject)
                                                    userProfile.inventory.potions.splice(index,1)
                                                }
                                                const selling_price=foundObject.name.cost*0.6
                                                profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                                    if(err){
                                                        console.log(err);
                                                        
                                                    }
                                                    else{
                                                        foundProfile.coins+=selling_price*userQuantity
    
                                                    }
                                                    await profileModel.updateOne({userID:authorId},foundProfile)
    
                                                })
                                                await interaction.reply({content:`${userQuantity} ${userobject}(s) has been sold for ${selling_price*userQuantity}🪙 successfully!`})
                                                
                                            }
                                            else{
                                                interaction.reply({content:`you dont have ${userQuantity} ${userobject}(s) to sell`,ephemeral:true})
                                            }
                                           
                                            await inventory.updateOne({userID:authorId},userProfile)
                                        }
    
                                    }})
                                
                            }
                            else{
                                interaction.reply({content:"invalid type",ephemeral:true})
                            }
                        }
                        else{
                            interaction.reply({content:`you are not in a location where you can sell!`,ephemeral:true})
                        }
                    })
                    
                    



                }
                else{
                    interaction.reply({content:"it seems you are not an awakened yet!",ephemeral:true})
                }
            }
        })




    })