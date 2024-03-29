import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import { SlashCommandIntegerOption, SlashCommandUserOption } from '@discordjs/builders'
import { SlashCommandStringOption } from '@discordjs/builders'
import { emoji } from '../src/lib/utils/emoji'



export default new MyCommandSlashBuilder({ name: 'sell', description: 'sell any weapon,armour or item' })
.addStringOption((option: SlashCommandStringOption) =>
        option.setName('object').setDescription('name of the weapon,armour or item').setRequired(true)
    )
.addIntegerOption((option: SlashCommandIntegerOption) => 
            option.setName('quantity').setDescription('quantity to buy').setRequired(true)
)
    .setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id;
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

                            
                            
                        
                                inventory.findOne({userID:authorId},async function(err,userProfile){
                                    if(err){
                                        console.log(err);
                                        
                                    }
                                    else{
                                        let foundObject
                                        let foundWeapon = userProfile.inventory.weapons.find(object => object.name.name.toLowerCase() === userobject.toLowerCase())
                                        let foundarmour = userProfile.inventory.armour.find(object => object.name.name.toLowerCase() === userobject.toLowerCase())
                                        let foundpotion = userProfile.inventory.potions.find(object => object.name.name.toLowerCase() === userobject.toLowerCase())
                                        let foundItem = userProfile.inventory.items.find(object => object.name.name.toLowerCase() === userobject.toLowerCase())
                                        if(foundItem || foundWeapon || foundarmour || foundpotion){
                                            if(foundWeapon){
                                                
                                                foundObject = userProfile.inventory.weapons.find(object => object.name.name.toLowerCase() === userobject)
                                                if(foundObject.quantity>=userQuantity){
                                                    foundObject.quantity-=userQuantity
                                                    if(foundObject.quantity===0){
                                                        const index = userProfile.inventory.weapons.indexOf(foundObject)
                                                        userProfile.inventory.weapons.splice(index,1)
                                                        
                                                    }
                                                    const selling_price=foundObject.name.cost*0.5
                                                    profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                                        if(err){
                                                            console.log(err);
                                                            
                                                        }
                                                        else{
                                                            foundProfile.coins+=selling_price*userQuantity
        
                                                        }
                                                        await profileModel.updateOne({userID:authorId},foundProfile)
        
                                                    })
                                                    await interaction.reply({content:`${userQuantity} ${foundObject.name.name}(s) has been sold for ${selling_price*userQuantity}${emoji.CRUS} successfully!`})
                                                    
                                                }
                                                else{
                                                    interaction.reply({content:`you dont have ${userQuantity} ${userobject}(s) to sell`,ephemeral:true})
                                                }
                                               
                                                await inventory.updateOne({userID:authorId},userProfile)
                                            }
                                            else if(foundarmour){
                                                foundObject = userProfile.inventory.armour.find(object => object.name.name.toLowerCase() === userobject)
                                                if(foundObject.quantity>=userQuantity){
                                                    foundObject.quantity-=userQuantity
                                                    if(foundObject.quantity===0){
                                                        const index = userProfile.inventory.armour.indexOf(foundObject)
                                                        userProfile.inventory.armour.splice(index,1)
                                                    }
                                                    const selling_price=foundObject.name.cost*0.5
                                                    profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                                        if(err){
                                                            console.log(err);
                                                            
                                                        }
                                                        else{
                                                            foundProfile.coins+=selling_price*userQuantity
        
                                                        }
                                                        await profileModel.updateOne({userID:authorId},foundProfile)
        
                                                    })
                                                    await interaction.reply({content:`${userQuantity} ${foundObject.name.name}(s) has been sold for ${selling_price*userQuantity}${emoji.CRUS} successfully!`})
                                                    
                                                }
                                                else{
                                                    interaction.reply({content:`you dont have ${userQuantity} ${userobject}(s) to sell`,ephemeral:true})
                                                }
                                               
                                                await inventory.updateOne({userID:authorId},userProfile)
                                            }
                                            else if(foundpotion){
                                                foundObject = userProfile.inventory.potions.find(object => object.name.name.toLowerCase() === userobject)
                                                if(foundObject.quantity>=userQuantity){
                                                    foundObject.quantity-=userQuantity
                                                    if(foundObject.quantity===0){
                                                        const index = userProfile.inventory.potions.indexOf(foundObject)
                                                        userProfile.inventory.potions.splice(index,1)
                                                    }
                                                    const selling_price=foundObject.name.cost*0.5
                                                    profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                                        if(err){
                                                            console.log(err);
                                                            
                                                        }
                                                        else{
                                                            foundProfile.coins+=selling_price*userQuantity
        
                                                        }
                                                        await profileModel.updateOne({userID:authorId},foundProfile)
        
                                                    })
                                                    await interaction.reply({content:`${userQuantity} ${foundObject.name.name}(s) has been sold for ${selling_price*userQuantity}${emoji.CRUS} successfully!`})
                                                    
                                                }
                                                else{
                                                    interaction.reply({content:`you dont have ${userQuantity} ${userobject}(s) to sell`,ephemeral:true})
                                                }
                                               
                                                await inventory.updateOne({userID:authorId},userProfile)
                                            }
                                            else{
                                                foundObject = userProfile.inventory.items.find(object => object.name.name.toLowerCase() === userobject)
                                                if(foundObject.quantity>=userQuantity){
                                                    foundObject.quantity-=userQuantity
                                                    if(foundObject.quantity===0){
                                                        const index = userProfile.inventory.items.indexOf(foundObject)
                                                        userProfile.inventory.items.splice(index,1)
                                                        
                                                    }
                                                    const selling_price=foundObject.name.cost*0.5
                                                    profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                                        if(err){
                                                            console.log(err);
                                                            
                                                        }
                                                        else{
                                                            foundProfile.coins+=selling_price*userQuantity
        
                                                        }
                                                        await profileModel.updateOne({userID:authorId},foundProfile)
        
                                                    })
                                                    await interaction.reply({content:`${userQuantity} ${foundObject.name.name}(s) has been sold for ${selling_price*userQuantity}${emoji.CRUS} successfully!`})
                                                    
                                                }
                                                else{
                                                    interaction.reply({content:`you dont have ${userQuantity} ${userobject}(s) to sell`,ephemeral:true})
                                                }
                                               
                                                await inventory.updateOne({userID:authorId},userProfile)
                                            }
                                            
                                        }
                                        else{
                                            interaction.reply({content:`you do not own any item called ${userobject}!`,ephemeral:true})
                                        }
    
                                    }})
                                
                            
    
                            
                            
    
                            
                            
                        }
                        else if(location == "Siewelle Port"){

                            
                            
                        
                            inventory.findOne({userID:authorId},async function(err,userProfile){
                                if(err){
                                    console.log(err);
                                    
                                }
                                else{
                                    let foundObject
                                    let foundWeapon = userProfile.inventory.weapons.find(object => object.name.name.toLowerCase() === userobject.toLowerCase())
                                    let foundarmour = userProfile.inventory.armour.find(object => object.name.name.toLowerCase() === userobject.toLowerCase())
                                    let foundpotion = userProfile.inventory.potions.find(object => object.name.name.toLowerCase() === userobject.toLowerCase())
                                    let foundItem = userProfile.inventory.items.find(object => object.name.name.toLowerCase() === userobject.toLowerCase())
                                    if(foundItem || foundWeapon || foundarmour || foundpotion){
                                        if(foundWeapon){
                                            
                                            foundObject = userProfile.inventory.weapons.find(object => object.name.name.toLowerCase() === userobject)
                                            if(foundObject.quantity>=userQuantity){
                                                foundObject.quantity-=userQuantity
                                                if(foundObject.quantity===0){
                                                    const index = userProfile.inventory.weapons.indexOf(foundObject)
                                                    userProfile.inventory.weapons.splice(index,1)
                                                    
                                                }
                                                const selling_price=foundObject.name.cost*0.5
                                                profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                                    if(err){
                                                        console.log(err);
                                                        
                                                    }
                                                    else{
                                                        foundProfile.coins+=selling_price*userQuantity
    
                                                    }
                                                    await profileModel.updateOne({userID:authorId},foundProfile)
    
                                                })
                                                await interaction.reply({content:`${userQuantity} ${foundObject.name.name}(s) has been sold for ${selling_price*userQuantity}${emoji.CRUS} successfully!`})
                                                
                                            }
                                            else{
                                                interaction.reply({content:`you dont have ${userQuantity} ${userobject}(s) to sell`,ephemeral:true})
                                            }
                                           
                                            await inventory.updateOne({userID:authorId},userProfile)
                                        }
                                        else if(foundarmour){
                                            foundObject = userProfile.inventory.armour.find(object => object.name.name.toLowerCase() === userobject)
                                            if(foundObject.quantity>=userQuantity){
                                                foundObject.quantity-=userQuantity
                                                if(foundObject.quantity===0){
                                                    const index = userProfile.inventory.armour.indexOf(foundObject)
                                                    userProfile.inventory.armour.splice(index,1)
                                                }
                                                const selling_price=foundObject.name.cost*0.5
                                                profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                                    if(err){
                                                        console.log(err);
                                                        
                                                    }
                                                    else{
                                                        foundProfile.coins+=selling_price*userQuantity
    
                                                    }
                                                    await profileModel.updateOne({userID:authorId},foundProfile)
    
                                                })
                                                await interaction.reply({content:`${userQuantity} ${foundObject.name.name}(s) has been sold for ${selling_price*userQuantity}${emoji.CRUS} successfully!`})
                                                
                                            }
                                            else{
                                                interaction.reply({content:`you dont have ${userQuantity} ${userobject}(s) to sell`,ephemeral:true})
                                            }
                                           
                                            await inventory.updateOne({userID:authorId},userProfile)
                                        }
                                        else if(foundpotion){
                                            foundObject = userProfile.inventory.potions.find(object => object.name.name.toLowerCase() === userobject)
                                            if(foundObject.quantity>=userQuantity){
                                                foundObject.quantity-=userQuantity
                                                if(foundObject.quantity===0){
                                                    const index = userProfile.inventory.potions.indexOf(foundObject)
                                                    userProfile.inventory.potions.splice(index,1)
                                                }
                                                const selling_price=foundObject.name.cost*0.5
                                                profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                                    if(err){
                                                        console.log(err);
                                                        
                                                    }
                                                    else{
                                                        foundProfile.coins+=selling_price*userQuantity
    
                                                    }
                                                    await profileModel.updateOne({userID:authorId},foundProfile)
    
                                                })
                                                await interaction.reply({content:`${userQuantity} ${foundObject.name.name}(s) has been sold for ${selling_price*userQuantity}${emoji.CRUS} successfully!`})
                                                
                                            }
                                            else{
                                                interaction.reply({content:`you dont have ${userQuantity} ${userobject}(s) to sell`,ephemeral:true})
                                            }
                                           
                                            await inventory.updateOne({userID:authorId},userProfile)
                                        }
                                        else{
                                            foundObject = userProfile.inventory.items.find(object => object.name.name.toLowerCase() === userobject)
                                            if(foundObject.quantity>=userQuantity){
                                                foundObject.quantity-=userQuantity
                                                if(foundObject.quantity===0){
                                                    const index = userProfile.inventory.items.indexOf(foundObject)
                                                    userProfile.inventory.items.splice(index,1)
                                                    
                                                }
                                                const selling_price=foundObject.name.cost*0.5
                                                profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                                    if(err){
                                                        console.log(err);
                                                        
                                                    }
                                                    else{
                                                        foundProfile.coins+=selling_price*userQuantity
    
                                                    }
                                                    await profileModel.updateOne({userID:authorId},foundProfile)
    
                                                })
                                                await interaction.reply({content:`${userQuantity} ${foundObject.name.name}(s) has been sold for ${selling_price*userQuantity}${emoji.CRUS} successfully!`})
                                                
                                            }
                                            else{
                                                interaction.reply({content:`you dont have ${userQuantity} ${userobject}(s) to sell`,ephemeral:true})
                                            }
                                           
                                            await inventory.updateOne({userID:authorId},userProfile)
                                        }
                                        
                                    }
                                    else{
                                        interaction.reply({content:`you do not own any item called ${userobject}!`,ephemeral:true})
                                    }

                                }})
                            
                        

                        
                        

                        
                        
                    }
                    else if(location == "Black Market"){

                            
                            
                        
                        inventory.findOne({userID:authorId},async function(err,userProfile){
                            if(err){
                                console.log(err);
                                
                            }
                            else{
                                let foundObject
                                let foundWeapon = userProfile.inventory.weapons.find(object => object.name.name.toLowerCase() === userobject.toLowerCase())
                                let foundarmour = userProfile.inventory.armour.find(object => object.name.name.toLowerCase() === userobject.toLowerCase())
                                let foundpotion = userProfile.inventory.potions.find(object => object.name.name.toLowerCase() === userobject.toLowerCase())
                                let foundItem = userProfile.inventory.items.find(object => object.name.name.toLowerCase() === userobject.toLowerCase())
                                if(foundItem || foundWeapon || foundarmour || foundpotion){
                                    if(foundWeapon){
                                        
                                        foundObject = userProfile.inventory.weapons.find(object => object.name.name.toLowerCase() === userobject)
                                        if(foundObject.quantity>=userQuantity){
                                            foundObject.quantity-=userQuantity
                                            if(foundObject.quantity===0){
                                                const index = userProfile.inventory.weapons.indexOf(foundObject)
                                                userProfile.inventory.weapons.splice(index,1)
                                                
                                            }
                                            const selling_price=foundObject.name.cost*0.5
                                            profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                                if(err){
                                                    console.log(err);
                                                    
                                                }
                                                else{
                                                    foundProfile.coins+=selling_price*userQuantity

                                                }
                                                await profileModel.updateOne({userID:authorId},foundProfile)

                                            })
                                            await interaction.reply({content:`${userQuantity} ${foundObject.name.name}(s) has been sold for ${selling_price*userQuantity}${emoji.CRUS} successfully!`})
                                            
                                        }
                                        else{
                                            interaction.reply({content:`you dont have ${userQuantity} ${userobject}(s) to sell`,ephemeral:true})
                                        }
                                       
                                        await inventory.updateOne({userID:authorId},userProfile)
                                    }
                                    else if(foundarmour){
                                        foundObject = userProfile.inventory.armour.find(object => object.name.name.toLowerCase() === userobject)
                                        if(foundObject.quantity>=userQuantity){
                                            foundObject.quantity-=userQuantity
                                            if(foundObject.quantity===0){
                                                const index = userProfile.inventory.armour.indexOf(foundObject)
                                                userProfile.inventory.armour.splice(index,1)
                                            }
                                            const selling_price=foundObject.name.cost*0.5
                                            profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                                if(err){
                                                    console.log(err);
                                                    
                                                }
                                                else{
                                                    foundProfile.coins+=selling_price*userQuantity

                                                }
                                                await profileModel.updateOne({userID:authorId},foundProfile)

                                            })
                                            await interaction.reply({content:`${userQuantity} ${foundObject.name.name}(s) has been sold for ${selling_price*userQuantity}${emoji.CRUS} successfully!`})
                                            
                                        }
                                        else{
                                            interaction.reply({content:`you dont have ${userQuantity} ${userobject}(s) to sell`,ephemeral:true})
                                        }
                                       
                                        await inventory.updateOne({userID:authorId},userProfile)
                                    }
                                    else if(foundpotion){
                                        foundObject = userProfile.inventory.potions.find(object => object.name.name.toLowerCase() === userobject)
                                        if(foundObject.quantity>=userQuantity){
                                            foundObject.quantity-=userQuantity
                                            if(foundObject.quantity===0){
                                                const index = userProfile.inventory.potions.indexOf(foundObject)
                                                userProfile.inventory.potions.splice(index,1)
                                            }
                                            const selling_price=foundObject.name.cost*0.5
                                            profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                                if(err){
                                                    console.log(err);
                                                    
                                                }
                                                else{
                                                    foundProfile.coins+=selling_price*userQuantity

                                                }
                                                await profileModel.updateOne({userID:authorId},foundProfile)

                                            })
                                            await interaction.reply({content:`${userQuantity} ${foundObject.name.name}(s) has been sold for ${selling_price*userQuantity}${emoji.CRUS} successfully!`})
                                            
                                        }
                                        else{
                                            interaction.reply({content:`you dont have ${userQuantity} ${userobject}(s) to sell`,ephemeral:true})
                                        }
                                       
                                        await inventory.updateOne({userID:authorId},userProfile)
                                    }
                                    else{
                                        foundObject = userProfile.inventory.items.find(object => object.name.name.toLowerCase() === userobject)
                                        if(foundObject.quantity>=userQuantity){
                                            foundObject.quantity-=userQuantity
                                            if(foundObject.quantity===0){
                                                const index = userProfile.inventory.items.indexOf(foundObject)
                                                userProfile.inventory.items.splice(index,1)
                                                
                                            }
                                            const selling_price=foundObject.name.cost*0.5
                                            profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                                if(err){
                                                    console.log(err);
                                                    
                                                }
                                                else{
                                                    foundProfile.coins+=selling_price*userQuantity

                                                }
                                                await profileModel.updateOne({userID:authorId},foundProfile)

                                            })
                                            await interaction.reply({content:`${userQuantity} ${foundObject.name.name}(s) has been sold for ${selling_price*userQuantity}${emoji.CRUS} successfully!`})
                                            
                                        }
                                        else{
                                            interaction.reply({content:`you dont have ${userQuantity} ${userobject}(s) to sell`,ephemeral:true})
                                        }
                                       
                                        await inventory.updateOne({userID:authorId},userProfile)
                                    }
                                    
                                }
                                else{
                                    interaction.reply({content:`you do not own any item called ${userobject}!`,ephemeral:true})
                                }

                            }})
                        
                    

                    
                    

                    
                    
                }
                        else{
                            interaction.reply({content:`you are not in a location where you can sell!`,ephemeral:true})
                        }
                    })
                    
                    



                }
                else{
                    await interaction.reply({content:"It seems you are not awakened yet!\n```use /awaken to begin your Fable```",ephemeral:true})
                }
            }
        })




    })