import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import { MessageEmbed } from 'discord.js'
import xpFormulate from '../src/utils/XPformulate'
import allQuests from '../src/utils/allQuests'
import hunting_contracts from '../src/utils/allHuntingContracts'

export default new MyCommandSlashBuilder({ name: 'questinfo', description: 'Know about your current quests' }).setDo(
    async (bot, interaction) => {
        
        
        const authorId = interaction.user.id;
        const guildID = interaction.guildId;

        profileModel.exists({userID:authorId},async function(err,res){
            if(res){
                profileModel.findOne({userID:authorId},async function(err,foundUser) {
                    let statEmbed
                    
                    const mainQuest = allQuests.find(quest => quest.quest_id == foundUser.main_quest)
                    let sideQuest
                    let huntingQuest
                    if(foundUser.side_quest.length == 0){
                        sideQuest = {
                            name:"NONE",
                            description:"",
                            quest_id:"null",
                            rewards:"None",
                            info:"You have no ongoing side Quest"
                        }
                    }
                    else{
                        sideQuest = allQuests.find(quest => quest.quest_id == foundUser.side_quest[0])
                    }
                    
                    if(foundUser.quest == "None"){
                        statEmbed= new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('QUEST INFO')
                        .setDescription(`## CURRENT MAIN QUEST:\n\n__**Name:**__ ${mainQuest.name}\n__**Description:**__ ${mainQuest.info}\n__**Rewards:**__ ${mainQuest.rewards}\n\n\n## CURRENT SIDE QUEST:\n\n__**Name:**__ ${sideQuest.name}\n__**Description:**__ ${sideQuest.info}\n__**Rewards:**__ ${sideQuest.rewards}\n\n\n## CURRENT HUNTING CONTRACT:\n\n__**Name:**__ NONE\n__**Description:**__ You have no hunting contracts currently\n__**Rewards:**__ NONE\n__**Remaining Targets:**__ NONE`)
                    }
                    else{
                        const foundContract = await hunting_contracts.find(quest => quest.quest_id == foundUser.quest)
                        statEmbed= new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('QUEST INFO')
                        .setDescription(`## CURRENT MAIN QUEST:\n\n__**Name:**__ ${mainQuest.name}\n__**Description:**__ ${mainQuest.info}\n__**Rewards:**__ ${mainQuest.rewards}\n\n\n## CURRENT SIDE QUEST:\n\n__**Name:**__ ${sideQuest.name}\n__**Description:**__ ${sideQuest.info}\n__**Rewards:**__ ${sideQuest.rewards}\n\n\n## CURRENT HUNTING CONTRACT:\n\n__**Name:**__ ${foundContract.name}\n__**Description:**__ ${foundContract.info}\n__**Rewards:**__ ${foundContract.rewards.coins}🪙 | ${foundContract.rewards.merit} Merit\n__**Remaining Targets:**__ ${foundUser.quest_quantity}`)
                    }

                        
                    
                    
                    
                    await interaction.reply({embeds:[statEmbed],ephemeral:false})
                })
            }
            else{
                await interaction.reply({content:"it seems you are not an awakened yet!",ephemeral:true})
            }
        })



    })