import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import { SlashCommandStringOption } from '@discordjs/builders'
import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, MessageComponentInteraction,CacheType} from 'discord.js'



export default new MyCommandSlashBuilder({ name: 'addskill', description: 'add a skill to your skill cycle' })
.addStringOption((option: SlashCommandStringOption) =>
        option.setName('skill').setDescription('skill to add').setRequired(true)
    )
.setDo(
    async (bot, interaction) => {
        
        
        const authorId = interaction.user.id;
        const userSkill = interaction.options.getString('skill').toLowerCase()

        profileModel.exists({userID:authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    profileModel.findOne({userID:authorId},async function(err,foundUser){
                        const foundskill=foundUser.allskills.find(skill => skill.name.toLowerCase() === userSkill)
                        const foundcurrent = foundUser.currentskills.find(skill => skill.name.toLowerCase() === userSkill)
                        if(foundskill){
                            if(foundcurrent){
                                interaction.reply({content:`${foundcurrent.name} already exists in your skill cycle`,ephemeral:true})
                            }
                            else{
                                if(foundUser.currentskills.length<4){
                                   const skill = {
                                    name:foundskill.name,
                                    description:foundskill.description

                                   }
                                foundUser.currentskills.unshift(skill)
                                   await profileModel.updateOne({userID:authorId},{currentskills:foundUser.currentskills})
                                   await interaction.reply(`${foundskill.name} has been added to your skill cycle!`)
                                }
                                else{


                                    let embed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('REPLACE SKILL')
                                    .setDescription(`Choose a skill in your skill cycle to be replaced with ${foundskill.name}`)
                                    
                                    
                               


 let btn_cancel = new MessageActionRow().addComponents([
        new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),])

    let select =  new MessageActionRow().addComponents([
            new MessageSelectMenu()
            .setCustomId('select')
                .setPlaceholder(`Select skill to replace ${interaction.user.username}`)
                .addOptions({
                    
                    label: `${foundUser.currentskills[0].name}`,
                    description: ``,
                    value: `${foundUser.currentskills[0].name}`,
                },{
                    label: `${foundUser.currentskills[1].name}`,
                    description: ``,
                    value: `${foundUser.currentskills[1].name}`,
                },{
                    label: `${foundUser.currentskills[2].name}`,
                    description: ``,
                    value: `${foundUser.currentskills[2].name}`,
                },{
                    label: `${foundUser.currentskills[3].name}`,
                    description: ``,
                    value: `${foundUser.currentskills[3].name}`,
                }
                )
                .setDisabled(false),
        ])  
        let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
        let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"    
        let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select })
        let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel })
    
        
    

        await interaction.reply({content: null,embeds:[embed],components:[select,btn_cancel]})

        collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
            collected.deferUpdate().catch(() => null)
            const replace = collected.values[0]
            const index = await foundUser.currentskills.findIndex(skill => skill.name.toLowerCase() === replace.toLowerCase())
            
            const skill = {
                name:foundskill.name,
                description:foundskill.description

               }
            foundUser.currentskills.splice(index,1)
             foundUser.currentskills.push(skill)
             
            
            await profileModel.updateOne({userID:authorId},{currentskills:foundUser.currentskills})

            let successembed = await new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('REPLACE SKILL')
            .setDescription(`${foundskill.name} has been replaced with ${replace} in skill cycle!`)

            await interaction.editReply({embeds:[successembed],components:[]})
            collector_select.stop()
            collector_select.stop()
        })

        collector_cancel.on('collect', async j => {
            j.deferUpdate().catch(() => null)

            let delembed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('REPLACE SKILL')
            .setDescription(`skill replacement cancelled!`)
            
            await interaction.editReply({embeds:[delembed],components:[]})
            collector_cancel.stop()
            collector_select.stop()
        })



                                }
                            }
                            
                        }
                        else{
                            interaction.reply({content:`you dont have any skill named ${userSkill}`,ephemeral:true})
                        }


                    })


                }
                else{
                    await interaction.reply({content:"you are not awakened yet!",ephemeral:true})
                }
            }
    })

})