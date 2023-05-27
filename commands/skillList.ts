import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'

export default new MyCommandSlashBuilder({ name: 'listskills', description: 'list all your skills' }).setDo(
    async (bot, interaction) => {

        const authorId = interaction.user.id;
        const guildID = interaction.guildId;

        profileModel.exists({userID:authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    profileModel.findOne({userID:authorId},async function(err,foundUser) {
                        if(err){
                            console.log(err);
                            
                        }
                        else{
                            const mappedcskills=foundUser.currentskills.map((skill) => {
                                return `${skill.name}`
                            }).join("\n")
                           
                            const mappedallskills=foundUser.allskills.map((skill) => {
                                return `${skill.name}`
                            }).join("\n")
                           
                            await interaction.reply({content:`**current skills:**\n${mappedcskills}\n\n**all skills:**\n${mappedallskills}`});
                        }
                    })
                }
                else{
                    await interaction.reply({content:"you are not awakened yet!",ephemeral:true})
                }
            }
        })
    })