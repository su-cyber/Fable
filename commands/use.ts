import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import { SlashCommandStringOption } from '@discordjs/builders'
import allItems from '../src/age/items/allItems'
import getHealth from '../src/utils/getHealth'
import { log } from 'console'



export default new MyCommandSlashBuilder({ name: 'use', description: 'use an item or potion' })
.addStringOption((option: SlashCommandStringOption) =>
        option.setName('object').setDescription('name of the weapon,armour or item').setRequired(true)
    )
    .setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id;
        const userobject = interaction.options.getString('object').toLowerCase()

      

        inventory.exists({userID:authorId}, async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    inventory.findOne({userID:authorId},async function(err,foundUser){
                        if(err){
                            console.log(err);
                            
                        }
                        else{
                            const foundPotion=foundUser.inventory.potions.find(object => object.name.name.toLowerCase() === userobject)
                            const foundtrinket = foundUser.inventory.items.find(object => object.name.name.toLowerCase() === userobject)
                            if(foundPotion){
                                const foundObject=foundUser.inventory.potions.find(object => object.name.name.toLowerCase() === userobject)
                                if(foundObject){
                                    
                                    profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                        if(err){
                                            console.log(err);
                                            
                                        }
                                        else{
                                            
                                            
                                                
                                                if(foundObject.name.status[0] == "Heal"){
                                                    foundObject.quantity-=1
                                                if(foundObject.quantity===0){
                                                    const index = foundUser.inventory.potions.indexOf(foundObject)
                                                    foundUser.inventory.potions.splice(index,1)
                                                }
                                                    interaction.reply({content:`${foundObject.name.use_string}`})
                                                    if(foundProfile.health+foundObject.name.value[0] > getHealth(foundProfile.level,foundProfile.vitality)){
                                                        foundProfile.health = getHealth(foundProfile.level,foundProfile.vitality)
                                                    }
                                                    else{
                                                        foundProfile.health = foundProfile.health+foundObject.name.value[0]
                                                    }
                                                    
                                                }
                                                else{
                                                    if(foundProfile.status_effects.status.length == 0){
                                                        foundObject.quantity-=1
                                                if(foundObject.quantity===0){
                                                    const index = foundUser.inventory.potions.indexOf(foundObject)
                                                    foundUser.inventory.potions.splice(index,1)
                                                }
                                                        let i
                                                    foundProfile.status_effects.status = foundObject.name.status
                                                    foundProfile.status_effects.value = foundObject.name.value
                                                    foundProfile.status_effects.turns = foundObject.name.turns
                                                    for(i=0;i<foundProfile.status_effects.status.length;i++){
                                                        if(foundProfile.status_effects.status[i] == "Attack"){
                                                            foundProfile.attackDamage+=foundProfile.status_effects.value[i]
                                                        }
                                                        else if(foundProfile.status_effects.status[i] == "Speed"){
                                                            foundProfile.speed+=foundProfile.status_effects.value[i]
                                                        }
                                                        else if(foundProfile.status_effects.status[i] == "Armour"){
                                                            foundProfile.armour+=foundProfile.status_effects.value[i]
                                                        }
                                                        
                                                        }
                                                    console.log(foundProfile.status_effects);
                                                    
                                                    interaction.reply({content:`${foundObject.name.use_string}`})
                                                    }
                                                    else{
                                                        interaction.reply({content:`you already have an active status effect!`,ephemeral:true})
                                                    }
                                                    
                                                    }
                                                
                                            
                                            
                                           
                                        await profileModel.updateOne({userID:authorId},foundProfile)
                                        await inventory.updateOne({userID:authorId},foundUser)
                                        }
                                        
                                    })
                                    
                                }
                            }
                            
                    
                            else if(foundtrinket){
                                const foundObject = foundUser.inventory.items.find(object => object.name.name.toLowerCase() === userobject)
                                if(foundObject){
                                    const foundItem = allItems.find(item => item.name.toLowerCase() === userobject)
                                    if(foundItem.type === "usable"){
                                        profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                            if(err){
                                                console.log(err);
                                                
                                            }
                                            else{
                                                
                                                    
                                                    if(foundItem.status[0] == "Heal"){
                                                        foundObject.quantity-=1
                                                    if(foundObject.quantity===0){
                                                        const index = foundUser.inventory.items.indexOf(foundObject)
                                                        foundUser.inventory.items.splice(index,1)
                                                    }
                                                        interaction.reply({content:`${foundItem.use_string}`})
                                                        if(foundProfile.health+foundItem.value[0] > getHealth(foundProfile.level,foundProfile.vitality)){
                                                            foundProfile.health = getHealth(foundProfile.level,foundProfile.vitality)
                                                        }
                                                        else{
                                                            foundProfile.health = foundProfile.health+foundItem.value[0]
                                                        }
                                                        
                                                    }
                                                    
                                                    else{
                                                        
                                                        if(foundProfile.status_effects.status.length == 0){
                                                            foundObject.quantity-=1
                                                    if(foundObject.quantity===0){
                                                        const index = foundUser.inventory.items.indexOf(foundObject)
                                                        foundUser.inventory.items.splice(index,1)
                                                    }
                                                            let i
                                                        foundProfile.status_effects.status = foundItem.status
                                                        foundProfile.status_effects.value = foundItem.value
                                                        foundProfile.status_effects.turns = foundItem.turns
                                                        for(i=0;i<foundProfile.status_effects.status.length;i++){
                                                            if(foundProfile.status_effects.status[i] == "Attack"){
                                                                foundProfile.attackDamage+=foundProfile.status_effects.value[i]
                                                            }
                                                            else if(foundProfile.status_effects.status[i] == "Speed"){
                                                                foundProfile.speed+=foundProfile.status_effects.value[i]
                                                            }
                                                            else if(foundProfile.status_effects.status[i] == "Armour"){
                                                                foundProfile.armour+=foundProfile.status_effects.value[i]
                                                            }
                                                            else if(foundProfile.status_effects.status[i] == "Evasion-percent"){
                                                                foundProfile.evasion+=foundProfile.status_effects.value[i]*foundProfile.evasion
                                                            }
                                                            else if(foundProfile.status_effects.status[i] == "Evasion"){
                                                                foundProfile.evasion+=foundProfile.status_effects.value[i]
                                                            }
                                                            
                                                            }
                                                        console.log(foundProfile.status_effects);
                                                        
                                                        interaction.reply({content:`${foundItem.use_string}`})
                                                        }
                                                        else{
                                                            interaction.reply({content:`you already have an active status effect!`,ephemeral:true})
                                                        }
                                                        
                                                        }
                                                    
                                                
                                                
                                               
                                            await profileModel.updateOne({userID:authorId},foundProfile)
                                            await inventory.updateOne({userID:authorId},foundUser)
                                            }
                                            
                                        })
                                    }
                                    else if(foundItem.type === "grimoire"){
                                        profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                            if(err){
                                                console.log(err);
                                                
                                            }
                                            else{
                                                foundObject.quantity-=1
                                                if(foundObject.quantity===0){
                                                    const index = foundUser.inventory.items.indexOf(foundObject)
                                                    foundUser.inventory.items.splice(index,1)
                                                }
                                                interaction.reply({content:`${foundItem.use_string}`})

                                                foundProfile.allskills.push(foundItem.skills[0])
                                                await profileModel.updateOne({userID:authorId},foundProfile)
                                                await inventory.updateOne({userID:authorId},foundUser)
                                            }
                                        })
                                       
                                                        
                                    }
                                    else{
                                        interaction.reply({content:"this item is not Usable!",ephemeral:true})
                                    }

                                }
                                
                    
                            }
                            else{
                                await interaction.reply({content:`you dont own anything called ${userobject}`,ephemeral:true})
                            }
                           
                        }
                        await inventory.updateOne({userID:authorId},foundUser)
                        
                    })
                }
                else{
                    await interaction.reply({content:"It seems you are not awakened yet!\n```use /awaken to begin your Fable```",ephemeral:true})
                }
            }
        })

    })