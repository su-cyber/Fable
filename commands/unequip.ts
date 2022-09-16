import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import { SlashCommandUserOption } from '@discordjs/builders'
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
                                        
                                    await inventory.findOneAndUpdate({userID:authorId},foundProfile)
                                    }
                                    
                                })
                                await interaction.reply({content:`${userobject} has been unequipped successfully!`})
                            }
                            else{
                                await interaction.reply({content:`you dont have anything called ${userobject} eqipped`})
                            }
                        }
                        await profileModel.findOneAndUpdate({userID:authorId},foundUser)
                        
                    })
                }
                else{
                    await interaction.reply({content:"you have not awakened yet!"})
                }
            }
        })

    })