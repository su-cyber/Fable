import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import { SlashCommandStringOption } from '@discordjs/builders'
import allItems from '../src/age/items/allItems'
import getHealth from '../src/utils/getHealth'



export default new MyCommandSlashBuilder({ name: 'use', description: 'use an item or potion' })
.addStringOption((option: SlashCommandStringOption) =>
        option.setName('type').setDescription('type of the object').setRequired(true)
    )
.addStringOption((option: SlashCommandStringOption) =>
        option.setName('object').setDescription('name of the weapon,armour or item').setRequired(true)
    )
    .setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id;
        const userType = interaction.options.getString('type').toLowerCase()
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
                            if(userType === "potion"){
                                const foundObject=foundUser.inventory.potions.find(object => object.name.name.toLowerCase() === userobject)
                                if(foundObject){
                                    
                                    profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                        if(err){
                                            console.log(err);
                                            
                                        }
                                        else{
                                            
                                            if(foundProfile.status_effects.status.length == 0){
                                                foundObject.quantity-=1
                                                if(foundObject.quantity===0){
                                                    const index = foundUser.inventory.armour.indexOf(foundObject)
                                                    foundUser.inventory.potions.splice(index,1)
                                                }
                                                if(foundObject.name.status[0] == "Heal"){
                                                    interaction.reply({content:`${foundObject.name.use_string}`})
                                                    if(foundProfile.health+foundObject.name.value[0] > getHealth(foundProfile.level,foundProfile.vitality)){
                                                        foundProfile.health = getHealth(foundProfile.level,foundProfile.vitality)
                                                    }
                                                    else{
                                                        foundProfile.health = foundProfile.health+foundObject.name.value[0]
                                                    }
                                                    
                                                }
                                                else{
                                                    let i
                                                    foundProfile.status_effects.status = foundObject.name.status
                                                    foundProfile.status_effects.value = foundObject.name.value
                                                    foundProfile.status_effects.turns = foundObject.name.turns
                                                    for(i=0;i<foundUser.status_effects.status.length;i++){
                                                        if(foundUser.status_effects.status[i] == "Attack"){
                                                            foundProfile.attackDamage+=foundProfile.status_effects.value[i]
                                                        }
                                                        else if(foundUser.status_effects.status[i] == "Speed"){
                                                            foundProfile.speed+=foundProfile.status_effects.value[i]
                                                        }
                                                        else if(foundUser.status_effects.status[i] == "Armour"){
                                                            foundProfile.armour+=foundProfile.status_effects.value[i]
                                                        }
                                                        }
                                                    interaction.reply({content:`${foundObject.name.use_string}`})
                                                    }
                                                }
                                            else{
                                                interaction.reply({content:`you already have an active potion status effect!`,ephemeral:true})
                                            }
                                            
                                           
                                        await profileModel.updateOne({userID:authorId},foundProfile)
                                        await inventory.updateOne({userID:authorId},foundUser)
                                        }
                                        
                                    })
                                    
                                }
                                else{
                                    await interaction.reply({content:`you dont own anything called ${userobject}`,ephemeral:true})
                                }
                            }
                            
                    
                            else if(userType === "item"){
                                const foundObject = foundUser.inventory.items.find(object => object.name.toLowerCase() === userobject)
                                if(foundObject){
                                    const foundItem = allItems.find(item => item.name.toLowerCase() === userobject)
                                    if(foundItem.type === "usable"){
                                        profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                            if(err){
                                                console.log(err);
                                                
                                            }
                                            else{
                                                if(foundProfile.items.length <= 3){
                                                    foundObject.quantity-=1
                                        if(foundObject.quantity===0){
                                            const index = foundUser.inventory.items.indexOf(foundObject)
                                            foundUser.inventory.items.splice(index,1)
                                        }
                                                    foundProfile.items.push(foundItem)
                                                    foundProfile.passiveskills = foundProfile.passiveskills.concat(foundItem.skills)
                                                    await interaction.reply({content:`${userobject} has been equipped successfully!`})
                                                }
                                                else{
                                                    
                                                    interaction.reply({content:"you cannot have more than 3 items eqipped!",ephemeral:true})
                                                }
                                            await profileModel.updateOne({userID:authorId},foundProfile)
                                            }
                                            
                                        })
                                    }
                                    else{
                                        interaction.reply({content:"this item cannot be equipped",ephemeral:true})
                                    }

                                }
                                else{
                                    await interaction.reply({content:`you dont own anything called ${userobject}`,ephemeral:true})
                                }
                    
                            }
                            else{
                                interaction.reply({content:"invalid type",ephemeral:true})
                            }
                           
                        }
                        await inventory.updateOne({userID:authorId},foundUser)
                        
                    })
                }
                else{
                    await interaction.reply({content:"you have not awakened yet!",ephemeral:true})
                }
            }
        })

    })