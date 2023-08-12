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
        const user = interaction.options.getUser('user')

        profileModel.exists({userID:authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    if(user == null){
                        let img
                        let path
                        const name = interaction.user.username.toUpperCase()
                        profileModel.findOne({userID:authorId},async function(err,foundUser){
                            if(foundUser.guild == "None"){
                                interaction.reply({content:`You have not recieved your Ranger License yet!`,ephemeral:true})
                            }
                            else{
                            path = `assets/Ranger_License/${foundUser.class}_Bronze_license.jpeg`
                            img = await loadImage(path)


                            const title = foundUser.current_title[0].toUpperCase()
                            const level = foundUser.level
                            const grade = foundUser.ranger_grade
                            const rank = foundUser.guild_rank.toUpperCase()
                            const guild = `${foundUser.guild.toUpperCase()} GUILD RANGER`
                            registerFont('fonts/DellaRespira.ttf', { family: 'DellaRespira' })
                            const src = new Canvas(822,1122)
                            let ctx = src.getContext("2d")
                            ctx.drawImage(img,0,0)

                            ctx.font = '58px "serif"'
                            ctx.fillStyle = "#E29A37"
                            ctx.fillText(`${level}`, 78, 820);
                            ctx.font = '32px "serif"'
                            ctx.fillText(`${grade}`, 292, 812);
                            ctx.fillText(`${rank}`, 515, 814);
                            ctx.font = 'bold 18px "serif"'
                            ctx.fillStyle = "black"
                            ctx.fillText(`${guild}`, 485, 906);
                            ctx.font = '26px "serif"'
                            ctx.fillStyle = "#E29A37"
                            ctx.fillText(`${name}`, 40, 910);
                            ctx.font = '38px "serif"'
                            ctx.fillText(`${title}`, 253, 57);
                            


                            const buffer = await src.toBuffer('image/jpeg')
                            const attachment = await new MessageAttachment(buffer)
                            interaction.reply({files:[attachment],ephemeral:true})
                            }
                            
                        })
                    }
                    else{
                        profileModel.exists({userID:user.id},async function(err,res){
                            if(err){
                                console.log(err);
                                
                            }
                            else{
                                if(res){
    
                                    let img
                                    let path
                                    const name = user.username
                                    profileModel.findOne({userID:user.id},async function(err,foundUser){
                                        if(foundUser.guild == "None"){
                                            interaction.reply({content:`The user has not recieved their Ranger License yet`,ephemeral:true})
                                        }
                                        else{
                                        path = `assets/Ranger_License/${foundUser.class}_Bronze_license.jpeg`
                                        img = await loadImage(path)
            
            
                                        const title = foundUser.current_title[0].toUpperCase()
                                        const level = foundUser.level
                                        const grade = foundUser.ranger_grade
                                        const rank = foundUser.guild_rank.toUpperCase()
                                        const guild = `${foundUser.guild.toUpperCase()} GUILD RANGER`
                                        registerFont('fonts/DellaRespira.ttf', { family: 'DellaRespira' })
                                        const src = new Canvas(822,1122)
                                        let ctx = src.getContext("2d")
                                        ctx.drawImage(img,0,0)
            
                                        ctx.font = '58px "serif"'
                                        ctx.fillStyle = "#E29A37"
                                        ctx.fillText(`${level}`, 78, 820);
                                        ctx.font = '32px "serif"'
                                        ctx.fillText(`${grade}`, 292, 812);
                                        ctx.fillText(`${rank}`, 515, 814);
                                        ctx.font = 'bold 18px "serif"'
                                        ctx.fillStyle = "black"
                                        ctx.fillText(`${guild}`, 485, 906);
                                        ctx.font = '26px "serif"'
                                        ctx.fillStyle = "#E29A37"
                                        ctx.fillText(`${name}`, 40, 910);
                                        ctx.font = '38px "serif"'
                                        ctx.fillText(`${title}`, 253, 57);
                                        
            
            
                                        const buffer = await src.toBuffer('image/jpeg')
                                        const attachment = await new MessageAttachment(buffer)
                                        interaction.reply({files:[attachment],ephemeral:true})
                                        }
                
                                    })
                                }
                                else{
                                    interaction.reply({content:`It seems that the mentioned User is not awakened yet!`,ephemeral:true},)
                                }
                            }
                        })
                    }
                    
                    
                   

                }
                else{
                    interaction.reply({content:`It seems that you are not awakened yet!`,ephemeral:true},)
                }
            }
        })
    })