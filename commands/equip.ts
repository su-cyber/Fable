import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import { SlashCommandStringOption } from '@discordjs/builders'
import allItems from '../src/age/items/allItems'



export default new MyCommandSlashBuilder({ name: 'equip', description: 'Equip a weapon,armour or item' })
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
                                        let foundObject
                                        let foundWeapon = foundUser.inventory.weapons.find(object => object.name.name.toLowerCase() === userobject)
                                        let foundarmour = foundUser.inventory.armour.find(object => object.name.name.toLowerCase() === userobject)
                                        let foundItem = foundUser.inventory.items.find(object => object.name.name.toLowerCase() === userobject)
                                
                                if(foundItem || foundWeapon || foundarmour){
                                    if(foundWeapon){
                                        foundObject = foundUser.inventory.weapons.find(object => object.name.name.toLowerCase() === userobject)
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
                                        
                                           
                                            if(foundObject.name.skills.length == 0){
                                                foundProfile.weapon.push(foundObject.name)
                                                if(foundObject.name.type == "melee"){
                                                    foundProfile.attackDamage+=foundObject.name.damage
                                                }
                                                else if(foundObject.name.type == "ranged"){
                                                    foundProfile.magicPower+=foundObject.name.damage
                                                }
                                                
                                                await interaction.reply({content:`${userobject} has been equipped successfully!`})
                                     
                                            }
                                            else{
                                                if(foundProfile.currentskills.length<4){
                                                    foundProfile.currentskills.push(foundObject.name.skills[0])
                                                    foundProfile.allskills.push(foundObject.name.skills[0])
                                                    await profileModel.updateOne({userID:authorId},{currentskills:foundProfile.currentskills,allskills:foundProfile.allskills})
                                                    foundProfile.weapon.push(foundObject.name)
                                                    if(foundObject.name.type == "melee"){
                                                        foundProfile.attackDamage+=foundObject.name.damage
                                                    }
                                                    else if(foundObject.name.type == "ranged"){
                                                        foundProfile.magicPower+=foundObject.name.damage
                                                    }
                                                    
                                                    
                                                    
                                                   
                                                    await interaction.reply({content:`${userobject} has been equipped successfully!\n${foundObject.name.skills[0].name} has been added to your skill cycle!`})
                                                    }
                                                    else{
                                                        foundProfile.allskills.push(foundObject.name.skills[0])
                                                        await profileModel.updateOne({userID:authorId},{allskills:foundProfile.allskills})
                                                        
                                                        foundProfile.weapon.push(foundObject.name)
                                                        if(foundObject.name.type == "melee"){
                                                            foundProfile.attackDamage+=foundObject.name.damage
                                                        }
                                                        else if(foundObject.name.type == "ranged"){
                                                            foundProfile.magicPower+=foundObject.name.damage
                                                        }
                                                        await interaction.reply({content:`${userobject} has been equipped successfully!\n${foundObject.name.skills[0].name} has been added to your skill list!`})
                                                    }
                                                
                                     
                                            }
                                               
                                       
                                                   
                                                }
                                                
                                                else{
                                                    
                                                    interaction.reply({content:"you already have a weapon equipped!",ephemeral:true})
                                                }
                                               
                                            await profileModel.updateOne({userID:authorId},foundProfile)
                                            await inventory.updateOne({userID:authorId},foundUser)
                                            }
                                            
                                        })
                                    }
                                    else if(foundarmour){
                                        foundObject = foundUser.inventory.armour.find(object => object.name.name.toLowerCase() === userobject)
                                        profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                            if(err){
                                                console.log(err);
                                                
                                            }
                                            else{
                                                if(foundProfile.armourSuit.length == 0){
                                                    foundObject.quantity-=1
                                        if(foundObject.quantity===0){
                                            const index = foundUser.inventory.armour.indexOf(foundObject)
                                            foundUser.inventory.armour.splice(index,1)
                                            
                                        }
                                                    foundProfile.armourSuit.push(foundObject.name)
                                                    foundProfile.armour+=foundObject.name.armour
                                                    foundProfile.magicResistance +=foundObject.name.magicResistance
                                                    foundProfile.speed += foundObject.name.speed
                                                    foundProfile.vitality += foundObject.name.vitality
                                                    foundProfile.passiveskills = foundProfile.passiveskills.concat(foundObject.name.skills)
                                                    await interaction.reply({content:`${userobject} has been equipped successfully!`})
                                                    await inventory.updateOne({userID:authorId},foundUser)
                                                    await profileModel.updateOne({userID:authorId},foundProfile)
                                                }
                                                else{
                                                    
                                                    interaction.reply({content:"you already have a Wearable Item equipped!",ephemeral:true})
                                                }
                                                

                                            
                                            }
                                            
                                        })
                                    }
                                    else if (foundItem){
                                        foundObject = foundUser.inventory.items.find(object => object.name.name.toLowerCase() === userobject)
                                        if(foundObject.name.type === "equippable"){
                                            profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                                if(err){
                                                    console.log(err);
                                                    
                                                }
                                                else{
                                                    if(foundProfile.items.length == 0){
                                                        foundObject.quantity-=1
                                            if(foundObject.quantity===0){
                                                const index = foundUser.inventory.items.indexOf(foundObject)
                                                foundUser.inventory.items.splice(index,1)
                                            }
                                                        foundProfile.items.push(foundObject.name)
                                                        foundProfile.passiveskills = foundProfile.passiveskills.concat(foundObject.name.skills)
                                                        await interaction.reply({content:`${userobject} has been equipped successfully!`})
                                                    }
                                                    else{
                                                        
                                                        interaction.reply({content:"you already have a trinket eqipped!",ephemeral:true})
                                                    }
                                                await profileModel.updateOne({userID:authorId},foundProfile)
                                                await inventory.updateOne({userID:authorId},foundUser)
                                                }
                                                
                                            })
                                        }
                                        else{
                                            interaction.reply({content:"this item cannot be equipped",ephemeral:true})
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
                    await interaction.reply({content:"you have not awakened yet!",ephemeral:true})
                }
            }
        })

    })