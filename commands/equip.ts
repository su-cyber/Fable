import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import { SlashCommandUserOption } from '@discordjs/builders'
import { SlashCommandStringOption } from '@discordjs/builders'
import allItems from '../src/age/items/allItems'



export default new MyCommandSlashBuilder({ name: 'equip', description: 'Equip a weapon,armour or item' })
.addStringOption((option: SlashCommandStringOption) =>
        option.setName('type').setDescription('type of the object').setRequired(true)
    )
.addStringOption((option: SlashCommandStringOption) =>
        option.setName('object').setDescription('name of the weapon,armour or item').setRequired(true)
    )
    .setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id;
        const guildID = interaction.guildId;
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
                            if(userType === "weapon"){
                                const foundObject=foundUser.inventory.weapons.find(object => object.name.name.toLowerCase() === userobject)
                                if(foundObject){
                                    
                                    profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                        if(err){
                                            console.log(err);
                                            
                                        }
                                        else{
                                            if(foundProfile.weapon.length === 0){
                                                foundObject.quantity-=1
                                    if(foundObject.quantity===0){
                                        const index = foundUser.inventory.weapons.findIndex(object => object.name.name.toLowerCase() === userobject)
                                        foundUser.inventory.weapons.splice(index,1)
                                    }
                                    else{

                                    }
                                    if(foundProfile.currentskills.length<4){
                                        foundProfile.currentskills.push(foundObject.name.skills[0])
                                        await profileModel.updateOne({userID:authorId},{currentskills:foundProfile.currentskills})
                                        
                                        foundProfile.weapon.push(foundObject.name)
                                        foundProfile.attackDamage+=foundObject.name.damage
                                        if(foundObject.skills.length == 0){
                                            await interaction.reply({content:`${userobject} has been equipped successfully!`})
                                 
                                        }
                                        else{
                                            await interaction.reply({content:`${userobject} has been equipped successfully!\n${foundObject.skills[0].name} has been added to your skill cycle!`})
                                 
                                        }
                                           }
                                    else{
                                        foundProfile.allskills.push(foundObject.name.skills[0])
                                        await profileModel.updateOne({userID:authorId},{allskills:foundProfile.allskills})
                                        
                                        foundProfile.weapon.push(foundObject.name)
                                        foundProfile.attackDamage+=foundObject.name.damage
                                        if(foundObject.name.skills.length == 0){
                                            await interaction.reply({content:`${userobject} has been equipped successfully!`})
                                 
                                        }
                                        else{
                                            await interaction.reply({content:`${userobject} has been equipped successfully!\n${foundObject.skills[0].name} has been added to your skill list!`})
                                 
                                        }
                                    }
                                               
                                            }
                                            
                                            else{
                                                
                                                interaction.reply("you already have a weapon equipped!")
                                            }
                                           
                                        await profileModel.updateOne({userID:authorId},foundProfile)
                                        await inventory.updateOne({userID:authorId},foundUser)
                                        }
                                        
                                    })
                                    
                                }
                                else{
                                    await interaction.reply({content:`you dont own anything called ${userobject}`})
                                }
                            }
                            else if(userType === "armour"){
                                const foundObject=foundUser.inventory.armour.find(object => object.name.name.toLowerCase() === userobject)
                                if(foundObject){
                                    
                                    profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                        if(err){
                                            console.log(err);
                                            
                                        }
                                        else{
                                            if(foundProfile.armourSuit.length === 0){
                                                foundObject.quantity-=1
                                    if(foundObject.quantity===0){
                                        const index = foundUser.inventory.armour.indexOf(foundObject)
                                        foundUser.inventory.armour.splice(index,1)
                                    }
                                                foundProfile.armourSuit.push(foundObject.name)
                                                foundProfile.armour+=foundObject.name.armour
                                                foundProfile.passiveskills = foundProfile.passiveskills.concat(foundObject.name.skills)
                                                await interaction.reply({content:`${userobject} has been equipped successfully!`})
                                            }
                                            else{
                                                
                                                interaction.reply("you already have an armour equipped!")
                                            }
                                        await profileModel.updateOne({userID:authorId},foundProfile)
                                        }
                                        
                                    })
                                    
                                }
                                else{
                                    await interaction.reply({content:`you dont own anything called ${userobject}`})
                                }
                            }
                    
                            else if(userType === "item"){
                                const foundObject = foundUser.inventory.items.find(object => object.name.toLowerCase() === userobject)
                                if(foundObject){
                                    const foundItem = allItems.find(item => item.name.toLowerCase() === userobject)
                                    if(foundItem.type === "equipable"){
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
                                                    
                                                    interaction.reply("you cannot have more than 3 items eqipped!")
                                                }
                                            await profileModel.updateOne({userID:authorId},foundProfile)
                                            }
                                            
                                        })
                                    }
                                    else{
                                        interaction.reply("this item cannot be equipped")
                                    }

                                }
                                else{
                                    await interaction.reply({content:`you dont own anything called ${userobject}`})
                                }
                    
                            }
                            else{
                                interaction.reply("invalid type")
                            }
                           
                        }
                        await inventory.updateOne({userID:authorId},foundUser)
                        
                    })
                }
                else{
                    await interaction.reply({content:"you have not awakened yet!"})
                }
            }
        })

    })