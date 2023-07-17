import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import {MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, MessageComponentInteraction,CacheType} from 'discord.js'
import allQuests from '../src/utils/allQuests'


export default new MyCommandSlashBuilder({ name: 'choose_side_quest', description: 'switch your sidequests' })

.setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id
        const guildID = interaction.guildId;

        profileModel.exists({userID: authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    profileModel.findOne({userID:authorId},async function(err,foundUser) {
                        if(foundUser.side_quest.length != 0){
                            if(foundUser.side_quest_phase>1){
                                interaction.reply({content:`you cannot change side quests when you have one ongoing`,ephemeral:true})
                            }
                            else{
                                let current_quests = []
                                for(let i=0;i<foundUser.side_quest.length;i++){
                                    const foundQuest = allQuests.find(quest => quest.quest_id ===foundUser.side_quest[i])
                                    current_quests.push(foundQuest)
                                }
                                
                                let btn_cancel = new MessageActionRow().addComponents([
                                    new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),])
    
                               let switch_quest  = new MessageActionRow().addComponents([
                                    new MessageSelectMenu()
                                        .setCustomId('select')
                                        .setPlaceholder(`Select a quest to switch ${interaction.user.username}`)
                                        .addOptions(
                                            current_quests.map(quest => ({
                                                label: quest.name,
                                                description: quest.description,
                                                value: quest.quest_id,
                                            }))
                                        )
                                        .setDisabled(false),
                                        
                                       
                                        ]
                                )
    
                                let embed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('SELECT QUEST')
                                    .setDescription(`Choose a quest to switch`)
    
    
                                    let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
                            let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"    
                            let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select })
                            let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel })
                        
                            
                        
                    
                            await interaction.reply({content: null,embeds:[embed],components:[switch_quest,btn_cancel]})
    
                            collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                                collected.deferUpdate().catch(() => null)
                                const replace = collected.values[0]
                                const index = foundUser.side_quest.findIndex(quest => quest === replace)
                                foundUser.side_quest.splice(index,1)
                                foundUser.side_quest.unshift(replace)
                                await profileModel.updateOne({userID:authorId},{side_quest:foundUser.side_quest})
    
                                let successembed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('QUEST SWITCHED')
                                .setDescription(`your quest has been switched!`)
                    
                                await interaction.editReply({embeds:[successembed],components:[]})
                                collector_select.stop()
                            })
                    
                            collector_cancel.on('collect', async j => {
                                j.deferUpdate().catch(() => null)
                    
                                let delembed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('CANCELLED')
                                .setDescription(`quest switch cancelled!`)
                                
                                await interaction.editReply({embeds:[delembed],components:[]})
                                collector_cancel.stop()
                            })
                    
                            
    
                            
                        }
                        }
                        else{
                            interaction.reply({content:`you have no side quests!`,ephemeral:true})
                        }
                     
                })
                }
                else{
                    interaction.reply({content:`it seemes you have not awakened yet!`,ephemeral:true})
                }
            }
        })
    })