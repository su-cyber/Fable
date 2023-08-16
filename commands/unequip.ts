import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import { SlashCommandStringOption } from '@discordjs/builders'



export default new MyCommandSlashBuilder({ name: 'unequip', description: 'Unequip a weapon,armour or item' })
.addStringOption((option: SlashCommandStringOption) =>
        option.setName('object').setDescription('name of the weapon,armour or item').setRequired(true)
    )
    .setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id;
        const guildID = interaction.guildId;
        const userobject = interaction.options.getString('object').toLowerCase()

        

        inventory.exists({userID:authorId}, async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    profileModel.findOne({userID:authorId},async function(err,foundUser){
                        if(err){
                            console.log(err);
                            
                        }
                        else{
                            
                            let foundWeapon = foundUser.weapon.find(object => object.name.toLowerCase() === userobject)
                            let foundArmour = foundUser.armourSuit.find(object => object.name.toLowerCase() === userobject)
                            let founditem = foundUser.items.find(object => object.name.toLowerCase() === userobject)
                            if(foundWeapon){
                                const foundObject=foundUser.weapon.find(object => object.name.toLowerCase() === userobject)
                                
                                    
                                        const index = foundUser.weapon.indexOf(foundObject)
                                        foundUser.weapon.splice(index,1)
                                    
                                    inventory.findOne({userID:authorId},async function(err,foundProfile){
                                        if(err){
                                            console.log(err);
                                            
                                        }
                                        else{
                                            const foundInventory=foundProfile.inventory.weapons.find(object => object.name.name.toLowerCase() === userobject)
                                            if(foundInventory){
                                                foundInventory.quantity+=1
                                            }
                                            else{
                                                
                                                const newItem = {
                                                    name:foundObject,
                                                    quantity:Number(1)
                                                }
                                                foundProfile.inventory.weapons.push(newItem)
                                            }
                                            
                                        await inventory.updateOne({userID:authorId},foundProfile)
                                        }
                                        
                                    })
                                    if(foundObject.type == "melee"){
                                        foundUser.attackDamage-=foundObject.damage
                                    }
                                    else if(foundObject.type == "ranged"){
                                        foundUser.magicPower-=foundObject.damage
                                    }
                                    

                                    if(foundObject.skills.length !=0){
                                        const foundskill=foundUser.allskills.find(skill => skill.name.toLowerCase() === foundObject.skills[0].name.toLowerCase())
                                    const foundcurrent = foundUser.currentskills.find(skill => skill.name.toLowerCase() === foundObject.skills[0].name.toLowerCase())
                                    if(foundcurrent){
                                        const index1 = foundUser.currentskills.findIndex(skill => skill.name.toLowerCase() === foundcurrent.name.toLowerCase())
                                        foundUser.currentskills.splice(index1,1)
                                        await profileModel.updateOne({userID:authorId},{currentskills:foundUser.currentskills})
                                        const index2 = foundUser.allskills.findIndex(skill => skill.name.toLowerCase() === foundskill.name.toLowerCase())
                                        foundUser.allskills.splice(index2,1)
                                        await profileModel.updateOne({userID:authorId},{allskills:foundUser.allskills})
                                    }
                                    else{
                                        const index = foundUser.allskills.findIndex(skill => skill.name.toLowerCase() === foundskill.name.toLowerCase())
                                        foundUser.allskills.splice(index,1)
                                        await profileModel.updateOne({userID:authorId},{allskills:foundUser.allskills})
                                   
                                    }
                                    }
                                    
                                    await interaction.reply({content:`${foundObject.name} has been unequipped successfully!`})
                                
                                
                            }
                            else if(foundArmour){
                                const foundObject=foundUser.armourSuit.find(object => object.name.toLowerCase() === userobject)
                                
                                    
                                        const index = foundUser.armourSuit.indexOf(foundObject)
                                        foundUser.armourSuit.splice(index,1)
                                    
                                    inventory.findOne({userID:authorId},async function(err,foundProfile){
                                        if(err){
                                            console.log(err);
                                            
                                        }
                                        else{
                                            const foundInventory=foundProfile.inventory.armour.find(object => object.name.name.toLowerCase() === userobject)
                                            if(foundInventory){
                                                foundInventory.quantity+=1
                                            }
                                            else{
                                                
                                                const newItem = {
                                                    name:foundObject,
                                                    quantity:Number(1)
                                                }
                                                foundProfile.inventory.armour.push(newItem)
                                            }
                                            
                                            foundUser.armour-=foundObject.armour
                                            foundUser.magicResistance -=foundObject.magicResistance
                                            foundUser.speed -= foundObject.speed
                                            foundUser.vitality = foundUser.vitality - foundObject.vitality
                                            
                                            
                                            
                                            for(let i=0; i<foundObject.skills.length;i++){
                                                const foundSkill = foundUser.passiveskills.find(skill => skill.name == foundObject.skills[i])
                                                const index = foundUser.passiveskills.indexOf(foundSkill)
                                                foundUser.passiveskills.splice(index,1)
                                            }
                                            await interaction.reply({content:`${foundObject.name} has been unequipped successfully!`})
                                        
                                        await inventory.updateOne({userID:authorId},foundProfile)
                                        await profileModel.updateOne({userID:authorId},foundUser)
                                        }
                                        
                                    })
                                    
                                
                            }
                            else if(founditem){
                                const foundObject=foundUser.items.find(object => object.name.toLowerCase() === userobject)
                                
                                    
                                        const index = foundUser.items.indexOf(foundObject)
                                        foundUser.items.splice(index,1)
                                    
                                    inventory.findOne({userID:authorId},async function(err,foundProfile){
                                        if(err){
                                            console.log(err);
                                            
                                        }
                                        else{
                                            const foundInventory=foundProfile.inventory.items.find(object => object.name.name.toLowerCase() === userobject)
                                            if(foundInventory){
                                                foundInventory.quantity+=1
                                            }
                                            else{
                                                
                                                const newItem = {
                                                    name:foundObject,
                                                    quantity:Number(1)
                                                }
                                                foundProfile.inventory.items.push(newItem)
                                            }
                                            for(let i=0; i<foundObject.skills.length;i++){
                                                const foundSkill = foundUser.passiveskills.find(skill => skill.name == foundObject.skills[i])
                                                const index = foundUser.passiveskills.indexOf(foundSkill)
                                                foundUser.passiveskills.splice(index,1)
                                            }
                                            await profileModel.updateOne({userID:authorId},foundUser)
                                            await interaction.reply({content:`${foundObject.name} has been unequipped successfully!`})
                                        await inventory.updateOne({userID:authorId},foundProfile)
                                        }
                                        
                                    })
                                    
                                
                            }
                            else{
                                await interaction.reply({content:`you dont have anything called ${userobject} equipped`,ephemeral:true})
                            }
                            await profileModel.updateOne({userID:authorId},foundUser)
                        }
                        
                        
                    })

                }
                else{
                    await interaction.reply({content:"you have not awakened yet!",ephemeral:true})
                }
            }
        })

    })