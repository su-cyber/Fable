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
                                        let already_equipped
                                        let foundWeapon = await foundUser.inventory.weapons.find(object => object.name.name.toLowerCase() === userobject)
                                        let foundarmour = await foundUser.inventory.armour.find(object => object.name.name.toLowerCase() === userobject)
                                        let foundItem = await foundUser.inventory.items.find(object => object.name.name.toLowerCase() === userobject)
                                
                                if(foundItem || foundWeapon || foundarmour){
                                    if(foundWeapon){
                                        foundObject = await foundUser.inventory.weapons.find(object => object.name.name.toLowerCase() === userobject)
                                        profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                            if(err){
                                                console.log(err);
                                                
                                            }
                                            else{
                                                if(foundProfile.weapon.length === 0){
                                                    foundObject.quantity-=1
                                        if(foundObject.quantity===0){
                                            const index = await foundUser.inventory.weapons.findIndex(object => object.name.name.toLowerCase() === userobject)
                                            foundUser.inventory.weapons.splice(index,1)
                                        }
                                        else{
    
                                        }
                                        
                                           
                                            if(foundObject.name.skills.length == 0){
                                                await foundProfile.weapon.push(foundObject.name)
                                                if(foundObject.name.type == "melee"){
                                                    foundProfile.attackDamage+=foundObject.name.damage
                                                }
                                                else if(foundObject.name.type == "ranged"){
                                                    foundProfile.magicPower+=foundObject.name.damage
                                                }
                                                
                                                await interaction.reply({content:`${foundObject.name.name} has been equipped successfully!`})
                                     
                                            }
                                            else{
                                                if(foundProfile.currentskills.length<4){
                                                    await foundProfile.currentskills.push(foundObject.name.skills[0])
                                                    await foundProfile.allskills.push(foundObject.name.skills[0])
                                                    await profileModel.updateOne({userID:authorId},{currentskills:foundProfile.currentskills,allskills:foundProfile.allskills})
                                                    await foundProfile.weapon.push(foundObject.name)
                                                    if(foundObject.name.type == "melee"){
                                                        foundProfile.attackDamage+=foundObject.name.damage
                                                    }
                                                    else if(foundObject.name.type == "ranged"){
                                                        foundProfile.magicPower+=foundObject.name.damage
                                                    }
                                                    
                                                    
                                                    
                                                   
                                                    await interaction.reply({content:`${foundObject.name.name} has been equipped successfully!\n\n${foundObject.name.skills[0].name} has been added to your skill cycle!`})
                                                    }
                                                    else{
                                                        await foundProfile.allskills.push(foundObject.name.skills[0])
                                                        await profileModel.updateOne({userID:authorId},{allskills:foundProfile.allskills})
                                                        
                                                        await foundProfile.weapon.push(foundObject.name)
                                                        if(foundObject.name.type == "melee"){
                                                            foundProfile.attackDamage+=foundObject.name.damage
                                                        }
                                                        else if(foundObject.name.type == "ranged"){
                                                            foundProfile.magicPower+=foundObject.name.damage
                                                        }
                                                        await interaction.reply({content:`${foundObject.name.name} has been equipped successfully!\n${foundObject.name.skills[0].name} has been added to your skill list!`})
                                                    }
                                                
                                     
                                            }
                                               
                                       
                                                   
                                                }
                                                
                                        else{
                                                already_equipped = foundProfile.weapon[0]
                                                await foundProfile.weapon.splice(0,1)

                                            const foundInventory=foundUser.inventory.weapons.find(object => object.name.name.toLowerCase() === already_equipped.name.toLowerCase())
                                            if(foundInventory){
                                                foundInventory.quantity+=1
                                            }
                                            else{
                                                
                                                const newItem = {
                                                    name:already_equipped,
                                                    quantity:Number(1)
                                                }
                                                await foundUser.inventory.weapons.push(newItem)
                                            }
                                                    
                                            if(already_equipped.type == "melee"){
                                                foundProfile.attackDamage-=already_equipped.damage
                                            }
                                            else if(already_equipped.type == "ranged"){
                                                foundProfile.magicPower-=already_equipped.damage
                                            }

                                            if(already_equipped.skills.length !=0){
                                                const foundskill=foundProfile.allskills.find(skill => skill.name.toLowerCase() === already_equipped.skills[0].name.toLowerCase())
                                            const foundcurrent = foundProfile.currentskills.find(skill => skill.name.toLowerCase() === already_equipped.skills[0].name.toLowerCase())
                                            if(foundcurrent){
                                                const index1 = foundProfile.currentskills.findIndex(skill => skill.name.toLowerCase() === foundcurrent.name.toLowerCase())
                                                foundProfile.currentskills.splice(index1,1)
                                                await profileModel.updateOne({userID:authorId},{currentskills:foundProfile.currentskills})
                                                const index2 = foundProfile.allskills.findIndex(skill => skill.name.toLowerCase() === foundskill.name.toLowerCase())
                                                foundProfile.allskills.splice(index2,1)
                                                await profileModel.updateOne({userID:authorId},{allskills:foundProfile.allskills})
                                            }
                                            else{
                                                const index3 = foundProfile.allskills.findIndex(skill => skill.name.toLowerCase() === foundskill.name.toLowerCase())
                                                foundProfile.allskills.splice(index3,1)
                                                await profileModel.updateOne({userID:authorId},{allskills:foundProfile.allskills})
                                           
                                            }
                                            }

                                            foundObject.quantity-=1
                                        if(foundObject.quantity===0){
                                            const index = await foundUser.inventory.weapons.findIndex(object => object.name.name.toLowerCase() === userobject)
                                            foundUser.inventory.weapons.splice(index,1)
                                        }
                                        else{
    
                                        }
                                        
                                           
                                            if(foundObject.name.skills.length == 0){
                                                await foundProfile.weapon.push(foundObject.name)
                                                if(foundObject.name.type == "melee"){
                                                    foundProfile.attackDamage+=foundObject.name.damage
                                                }
                                                else if(foundObject.name.type == "ranged"){
                                                    foundProfile.magicPower+=foundObject.name.damage
                                                }
                                                
                                                await interaction.reply({content:`${foundObject.name.name} has been equipped successfully!`})
                                     
                                            }
                                            else{
                                                if(foundProfile.currentskills.length<4){
                                                    await foundProfile.currentskills.push(foundObject.name.skills[0])
                                                    await foundProfile.allskills.push(foundObject.name.skills[0])
                                                    await profileModel.updateOne({userID:authorId},{currentskills:foundProfile.currentskills,allskills:foundProfile.allskills})
                                                    await foundProfile.weapon.push(foundObject.name)
                                                    if(foundObject.name.type == "melee"){
                                                        foundProfile.attackDamage+=foundObject.name.damage
                                                    }
                                                    else if(foundObject.name.type == "ranged"){
                                                        foundProfile.magicPower+=foundObject.name.damage
                                                    }
                                                    
                                                    
                                                    
                                                   
                                                    await interaction.reply({content:`${foundObject.name.name} has been equipped successfully!\n\n${foundObject.name.skills[0].name} has been added to your skill cycle!`})
                                                    }
                                                    else{
                                                        await foundProfile.allskills.push(foundObject.name.skills[0])
                                                        await profileModel.updateOne({userID:authorId},{allskills:foundProfile.allskills})
                                                        
                                                        await foundProfile.weapon.push(foundObject.name)
                                                        if(foundObject.name.type == "melee"){
                                                            foundProfile.attackDamage+=foundObject.name.damage
                                                        }
                                                        else if(foundObject.name.type == "ranged"){
                                                            foundProfile.magicPower+=foundObject.name.damage
                                                        }
                                                        await interaction.reply({content:`${foundObject.name.name} has been equipped successfully!\n${foundObject.name.skills[0].name} has been added to your skill list!`})
                                                    }
                                                
                                     
                                            }
                                               
                                       
                                                
                                        
                                        }
                                               
                                            await profileModel.updateOne({userID:authorId},foundProfile)
                                            await inventory.updateOne({userID:authorId},foundUser)
                                            }
                                            
                                        })
                                    }
                                    else if(foundarmour){
                                        foundObject = await foundUser.inventory.armour.find(object => object.name.name.toLowerCase() === userobject)
                                        profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                            if(err){
                                                console.log(err);
                                                
                                            }
                                            else{
                                                if(foundProfile.armourSuit.length == 0){
                                                    foundObject.quantity-=1
                                        if(foundObject.quantity===0){
                                            const index2 = await foundUser.inventory.armour.indexOf(foundObject)
                                            foundUser.inventory.armour.splice(index2,1)
                                            
                                        }
                                                    await foundProfile.armourSuit.push(foundObject.name)
                                                    foundProfile.armour+=foundObject.name.armour
                                                    foundProfile.magicResistance +=foundObject.name.magicResistance
                                                    foundProfile.speed += foundObject.name.speed
                                                    foundProfile.vitality += foundObject.name.vitality
                                                    foundProfile.passiveskills = foundProfile.passiveskills.concat(foundObject.name.skills)
                                                    await interaction.reply({content:`${foundObject.name.name} has been equipped successfully!`})
                                                    await inventory.updateOne({userID:authorId},foundUser)
                                                    await profileModel.updateOne({userID:authorId},foundProfile)
                                                }
                                                else{
                                                    already_equipped = foundProfile.armourSuit[0]
                                                    await foundProfile.armourSuit.splice(0,1)
                                                    
                                                    const foundInventory= await foundUser.inventory.armour.find(object => object.name.name.toLowerCase() === already_equipped.name.toLowerCase())
                                            if(foundInventory){
                                                foundInventory.quantity+=1
                                            }
                                            else{
                                                
                                                const newItem = {
                                                    name:already_equipped,
                                                    quantity:Number(1)
                                                }
                                                await foundUser.inventory.armour.push(newItem)
                                            }


                                            foundProfile.armour-=already_equipped.armour
                                            foundProfile.magicResistance -=already_equipped.magicResistance
                                            foundProfile.speed -= already_equipped.speed
                                            foundProfile.vitality = foundProfile.vitality - already_equipped.vitality


                                            for(let i=0; i<already_equipped.skills.length;i++){
                                                const foundSkill = foundProfile.passiveskills.find(skill => skill.name == already_equipped.skills[i])
                                                const index2 = foundProfile.passiveskills.indexOf(foundSkill)
                                                foundProfile.passiveskills.splice(index2,1)
                                            }

                                            foundObject.quantity-=1
                                            if(foundObject.quantity===0){
                                                const index2 = await foundUser.inventory.armour.indexOf(foundObject)
                                                foundUser.inventory.armour.splice(index2,1)
                                                
                                            }
                                                        await foundProfile.armourSuit.push(foundObject.name)
                                                        foundProfile.armour+=foundObject.name.armour
                                                        foundProfile.magicResistance +=foundObject.name.magicResistance
                                                        foundProfile.speed += foundObject.name.speed
                                                        foundProfile.vitality += foundObject.name.vitality
                                                        foundProfile.passiveskills = foundProfile.passiveskills.concat(foundObject.name.skills)
                                                        await interaction.reply({content:`${foundObject.name.name} has been equipped successfully!`})
                                                        await inventory.updateOne({userID:authorId},foundUser)
                                                        await profileModel.updateOne({userID:authorId},foundProfile)
                                                }
                                                

                                               
                                            }
                                            
                                        })
                                    }
                                    else if (foundItem){
                                        foundObject = await foundUser.inventory.items.find(object => object.name.name.toLowerCase() === userobject)
                                        if(foundObject.name.type === "equippable"){
                                            profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                                if(err){
                                                    console.log(err);
                                                    
                                                }
                                                else{
                                                    if(foundProfile.items.length == 0){
                                                        foundObject.quantity-=1
                                            if(foundObject.quantity===0){
                                                const index3 = await foundUser.inventory.items.indexOf(foundObject)
                                                foundUser.inventory.items.splice(index3,1)
                                            }
                                                        await foundProfile.items.push(foundObject.name)
                                                        foundProfile.passiveskills = foundProfile.passiveskills.concat(foundObject.name.skills)
                                                        await interaction.reply({content:`${foundObject.name.name} has been equipped successfully!`})
                                                    }
                                                    else{
                                                        already_equipped = foundProfile.items[0]
                                                        await foundProfile.items.splice(0,1)
                                                        const foundInventory=foundUser.inventory.items.find(object => object.name.name.toLowerCase() === already_equipped.name.toLowerCase())
                                                        if(foundInventory){
                                                            foundInventory.quantity+=1
                                                        }
                                                        else{
                                                            
                                                            const newItem = {
                                                                name:already_equipped,
                                                                quantity:Number(1)
                                                            }
                                                            await foundUser.inventory.items.push(newItem)
                                                        }

                                                        for(let i=0; i<already_equipped.skills.length;i++){

                                                            const foundSkill = foundProfile.passiveskills.find(skill => skill.name == already_equipped.skills[i])
                                                            const index2 = foundProfile.passiveskills.indexOf(foundSkill)
                                                            await foundProfile.passiveskills.splice(index2,1)
            
                                                            
                                                        }

                                                        foundObject.quantity-=1
                                            if(foundObject.quantity===0){
                                                const index3 = await foundUser.inventory.items.indexOf(foundObject)
                                                foundUser.inventory.items.splice(index3,1)
                                            }
                                                        await foundProfile.items.push(foundObject.name)
                                                        foundProfile.passiveskills = foundProfile.passiveskills.concat(foundObject.name.skills)
                                                        await interaction.reply({content:`${foundObject.name.name} has been equipped successfully!`})
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
                    await interaction.reply({content:"It seems you are not awakened yet!\n```use /awaken to begin your Fable```",ephemeral:true})
                }
            }
        })

    })