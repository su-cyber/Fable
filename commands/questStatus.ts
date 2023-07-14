import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import { MessageEmbed } from 'discord.js'
import xpFormulate from '../src/utils/XPformulate'
import allQuests from '../src/utils/allQuests'

export default new MyCommandSlashBuilder({ name: 'questinfo', description: 'Know about your current quests' }).setDo(
    async (bot, interaction) => {
        
        
        const authorId = interaction.user.id;
        const guildID = interaction.guildId;

        profileModel.exists({userID:authorId},async function(err,res){
            if(res){
                profileModel.findOne({userID:authorId},async function(err,foundUser) {
                    let statEmbed
                    
                    let mainQuest = allQuests.find(quest => quest.quest_id == foundUser.main_quest)
                    let sideQuest
                    if(foundUser.side_quest.length == 0){
                        sideQuest = {
                            name:"NONE",
                            description:"The Radiantura in Castellan Fields need to be fed",
                            quest_id:"null",
                            rewards:"None",
                            info:"You have no ongoing side Quest"
                        }
                    }
                    else{
                        sideQuest = allQuests.find(quest => quest.quest_id == foundUser.side_quest[0])
                    }
                    


                        statEmbed= new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('QUEST INFO')
                        .setDescription(`**CURRENT MAIN QUEST:**\n\nName: ${mainQuest.name}\nDescription: ${mainQuest.info}\nRewards: ${mainQuest.rewards}\n\n\n**CURRENT SIDE QUEST:**\n\nName: ${sideQuest.name}\nDescription: ${sideQuest.info}\nRewards: ${sideQuest.rewards}`)
                    
                    
                    
                    await interaction.reply({embeds:[statEmbed],ephemeral:false})
                })
            }
            else{
                await interaction.reply({content:"it seems you are not an awakened yet!",ephemeral:true})
            }
        })



    })