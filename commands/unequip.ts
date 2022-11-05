import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import { SlashCommandUserOption } from '@discordjs/builders'
import { SlashCommandStringOption } from '@discordjs/builders'



export default new MyCommandSlashBuilder({ name: 'unequip', description: 'Unequip a weapon,armour or item' })
.addStringOption((option: SlashCommandStringOption) =>
        option.setName('type').setDescription('type of object').setRequired(true)
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
                    profileModel.findOne({userID:authorId},async function(err,foundUser){
                        if(err){
                            console.log(err);
                            
                        }
                        else{
                            if(userType === "weapon"){
                                const foundObject=foundUser.weapon.find(object => object.name.toLowerCase() === userobject)
                                if(foundObject){
                                    
                                        const index = foundUser.weapon.indexOf(foundObject)
                                        foundUser.weapon.splice(index)
                                    
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
                                    foundUser.attackDamage-=foundObject.damage
                                    await interaction.reply({content:`${userobject} has been unequipped successfully!`})
                                }
                                else{
                                    await interaction.reply({content:`you dont have anything called ${userobject} eqipped`})
                                }
                            }
                            else if(userType === "armour"){
                                const foundObject=foundUser.armourSuit.find(object => object.name.toLowerCase() === userobject)
                                if(foundObject){
                                    
                                        const index = foundUser.armourSuit.indexOf(foundObject)
                                        foundUser.armourSuit.splice(index)
                                    
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
                                            
                                        await inventory.updateOne({userID:authorId},foundProfile)
                                        }
                                        
                                    })
                                    foundUser.armour-=foundObject.armour
                                    for(let i=0; i<foundObject.skills.length;i++){
                                        const foundSkill = foundUser.passiveskills.find(skill => skill.name == foundObject.skills[i])
                                        const index = foundUser.passiveskills.indexOf(foundSkill)
                                        foundUser.passiveskills.splice(index)
                                    }
                                    await interaction.reply({content:`${userobject} has been unequipped successfully!`})

                                }
                                else{
                                    await interaction.reply({content:`you dont have anything called ${userobject} eqipped`})
                                }
                            }
                            else if(userType === "item"){
                                const foundObject=foundUser.items.find(object => object.name.toLowerCase() === userobject)
                                if(foundObject){
                                    
                                        const index = foundUser.items.indexOf(foundObject)
                                        foundUser.items.splice(index)
                                    
                                    inventory.findOne({userID:authorId},async function(err,foundProfile){
                                        if(err){
                                            console.log(err);
                                            
                                        }
                                        else{
                                            const foundInventory=foundProfile.inventory.items.find(object => object.name.toLowerCase() === userobject)
                                            if(foundInventory){
                                                foundInventory.quantity+=1
                                            }
                                            else{
                                                
                                                const newItem = {
                                                    name:foundObject.name,
                                                    quantity:Number(1)
                                                }
                                                foundProfile.inventory.items.push(newItem)
                                            }
                                            
                                        await inventory.updateOne({userID:authorId},foundProfile)
                                        }
                                        
                                    })
                                    for(let i=0; i<foundObject.skills.length;i++){
                                        const foundSkill = foundUser.passiveskills.find(skill => skill.name == foundObject.skills[i])
                                        const index = foundUser.passiveskills.indexOf(foundSkill)
                                        foundUser.passiveskills.splice(index)
                                    }
                                    
                                    await interaction.reply({content:`${userobject} has been unequipped successfully!`})
                                }
                                else{
                                    await interaction.reply({content:`you dont have anything called ${userobject} eqipped`})
                                }
                            }
                            else{
                                interaction.reply("invalid type")
                            }
                           
                        }
                        await profileModel.updateOne({userID:authorId},foundUser)
                        
                    })

                }
                else{
                    await interaction.reply({content:"you have not awakened yet!"})
                }
            }
        })

    })