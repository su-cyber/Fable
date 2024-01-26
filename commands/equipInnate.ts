import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import { SlashCommandStringOption } from '@discordjs/builders'
import allItems from '../src/age/items/allItems'
import getHealth from '../src/utils/getHealth'
import { log } from 'console'
import cloneDeep from 'lodash.clonedeep'



export default new MyCommandSlashBuilder({ name: 'equipinnate', description: 'Equip an innate passive skill' })
.addStringOption((option: SlashCommandStringOption) =>
        option.setName('skill').setDescription('name of the passive skill').setRequired(true)
    )
    .setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id;
        const userskill = interaction.options.getString('skill').toLowerCase()

        profileModel.exists({userID:authorId},async function(err,res){
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
                            let allSkills = cloneDeep(foundUser.all_passives)

                            if(allSkills.length == 0){
                                await interaction.reply({content:"You do not have any Innate Passive Skills yet! Level Up to unlock them!",ephemeral:true})
                            }
                            else{
                                const foundPassive = await allSkills.find(skill => skill.name.toLowerCase() === userskill)
                                if(foundPassive){
                                    foundUser.innate_passive.splice(0,1)
                                    foundUser.innate_passive.push(foundPassive)
                                    await profileModel.updateOne({userID:authorId},{innate_passive:foundUser.innate_passive})
                                    await interaction.reply({content:`${foundPassive.name} has been equipped as your Innate Passive Skill!`})
                                }
                                else{
                                    await interaction.reply({content:`You do not have any innate skill called ${userskill}!`,ephemeral:true})
                                }
                            }
                        }
                    })
                }
                else{
                    await interaction.reply({content:"It seems you are not awakened yet!\n```use /awaken to begin your Fable```",ephemeral:true})
                }
            }
        })

    })