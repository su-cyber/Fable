import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import {MessageAttachment} from 'discord.js'
import { loadImage,Canvas,registerFont } from 'canvas'
import { SlashCommandUserOption } from '@discordjs/builders'


export default new MyCommandSlashBuilder({ name: 'ranger_license', description: `View your own or another user's license` })
.addUserOption((option: SlashCommandUserOption) =>
option.setName('user').setDescription(`View user's license`).setRequired(false)
)
    .setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id;
        const guildID = interaction.guildId;
        const userId = interaction.options.getUser('user').id

        profileModel.exists({userID:authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    console.log(userId);
                    
                    profileModel.exists({userID:authorId},async function(err,res){
                        if(err){
                            console.log(err);
                            
                        }
                        else{
                            if(res){

                                let img
                                let path
                                const name = interaction.user.username
                                profileModel.findOne({userID:authorId},async function(err,foundUser){
            
            
                                })
                            }
                            else{
                                interaction.reply({content:`It seems that the mentioned User is not awakened yet!`,ephemeral:true},)
                            }
                        }
                    })
                   

                }
                else{
                    interaction.reply({content:`It seems that you are not awakened yet!`,ephemeral:true},)
                }
            }
        })
    })