import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import { SlashCommandUserOption } from '@discordjs/builders'
import { SlashCommandStringOption } from '@discordjs/builders'



export default new MyCommandSlashBuilder({ name: 'equip', description: 'Equip a weapon,armour or item' })
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
                    inventory.findOne({userID:authorId},async function(err,foundUser){
                        if(err){
                            console.log(err);
                            
                        }
                        else{
                            const foundObject=foundUser.inventory.weapons.find(object => object.name.name.toLowerCase() === userobject)
                            if(foundObject){
                                foundObject.quantity-=1
                                if(foundObject.quantity===0){
                                    const index = foundUser.inventory.weapons.indexOf(foundObject)
                                    foundUser.inventory.weapons.splice(index)
                                }
                                profileModel.findOne({userID:authorId},async function(err,foundProfile){
                                    if(err){
                                        console.log(err);
                                        
                                    }
                                    else{
                                        foundProfile.weapon.push(foundObject.name)
                                    await profileModel.findOneAndUpdate({userID:authorId},foundProfile)
                                    }
                                    
                                })
                                await interaction.reply({content:`${userobject} has been equipped successfully!`})
                            }
                            else{
                                await interaction.reply({content:`you dont own anything called ${userobject}`})
                            }
                        }
                        await inventory.findOneAndUpdate({userID:authorId},foundUser)
                        
                    })
                }
                else{
                    await interaction.reply({content:"you have not awakened yet!"})
                }
            }
        })

    })