import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import allskills from '../src/age/skills/skills'

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
                                let use
                                const foundSkill = allskills.find(allskill => allskill.name == skill.name)
                                if(foundSkill.type == "physical"){
                                    use = `Uses Vigour`
                                }
                                else{
                                    use = `Uses Arcana`
                                }
                                return `__**Name**__: ${skill.name}\n__**Description**__:${skill.description}\n__**POW**__: ${foundSkill.damage}\n**(${use})**`
                            }).join("\n\n")
                           
                            const mappedallskills=foundUser.allskills.map((skill) => {
                                let use
                                const foundSkill = allskills.find(allskill => allskill.name == skill.name)
                                if(foundSkill.type == "physical"){
                                    use = `Uses Vigour`
                                }
                                else{
                                    use = `Uses Arcana`
                                }
                                return `__**Name**__: ${skill.name}\n__**Description**__:${skill.description}\n__**POW**__: ${foundSkill.damage}\n**(${use})**`
                            }).join("\n\n")
                           
                            await interaction.reply({content:`**Current Skills:**\n${mappedcskills}\n\n**All Skills:**\n${mappedallskills}`});
                        }
                    })
                }
                else{
                    await interaction.reply({content:"you are not awakened yet!",ephemeral:true})
                }
            }
        })
    })