import {
    CacheType,
    CommandInteraction,
    InteractionCollector,
    MappedInteractionTypes,
    MessageActionRow,
    MessageButton,
    MessageComponentInteraction,
    MessageEmbed,
    MessageSelectMenu,
} from 'discord.js'
import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import { Embed } from '@discordjs/builders'
import samurai_tree from '../src/age/skills/samurai_tree'
import flame_tree from '../src/age/skills/flame_tree'

export default new MyCommandSlashBuilder({ name: 'learnskill', description: 'learn a new skill' })

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
                    profileModel.findOne({userID:authorId},async function(err,foundUser){
                        if(foundUser.skill_tree.status){
                            if(foundUser.class == "Samurai"){
                                let class_tree = samurai_tree
                                let element_tree
                                if(foundUser.elements[0] == "Flame"){
                                    element_tree = flame_tree
                                }
                                const option1 = class_tree[foundUser.skill_tree.class]
                                const option2 = element_tree[foundUser.skill_tree.physical]
                                const option3 = element_tree[foundUser.skill_tree.magical]
                                let skillEmbed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('LEARN SKILL')
                                    .setDescription(`Select a skill to learn:\n\nSkill 1: **${option1.name}**\nDescription:${option1.description}\n\nSkill 2: **${option2.name}**\nDescription:${option2.description}\n\nSkill 3: **${option3.name}**\nDescription:${option3.description}`)
                                    let acceptembed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('SELECT LOCATION')
                                    .setDescription(``)
                                    let btn_cancel = new MessageActionRow().addComponents([
                                        new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),])
                                    
                                    let select =  new MessageActionRow().addComponents([
                                            new MessageSelectMenu()
                                            .setCustomId('select')
                                                .setPlaceholder(`Select a location ${interaction.user.username}`)
                                                .addOptions({
                                                    
                                                    label: option1.name,
                                                    description: option1.description,
                                                    value: option1.name,
                                                },{
                                                    label: option2.name,
                                                    description: option2.description,
                                                    value: option2.name,
                                                },{
                                                    label: option3.name,
                                                    description: option3.description,
                                                    value: option3.name,
                                                }
                                                )
                                                .setDisabled(false),
                                        ])

                                        let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
                                        let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"    
                                        let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select })
                                        let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel })
                                    
                                        collector_select.setMaxListeners(Infinity)
                                        collector_cancel.setMaxListeners(Infinity)
                                    
                                    
                                        await interaction.reply({content: null,embeds:[skillEmbed],components:[select,btn_cancel]})
                                        collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                                            collected.deferUpdate().catch(() => null)
                                            const choice = collected.values[0]
                                            
                                            if(choice == option1.name){
                                                const newskill = {
                                                    name:option1.name,
                                                    description:option1.description
                                                }
                                                if(foundUser.currentskills.length<4){
                                                    foundUser.currentskills.push(newskill)
                                                    foundUser.allskills.push(newskill)
                                                }
                                                else{
                                                    foundUser.allskills.push(newskill)
                                                }
                                                foundUser.skill_tree.class+=1
                                                foundUser.skill_tree.status-=1
                                                acceptembed = new MessageEmbed()
                                            .setColor('RANDOM')
                                            .setTitle('SKILL CHOSEN')
                                            .setDescription(`you chose ${option1.name}`)

                                            }
                                            else if(choice == option2.name){
                                                const newskill = {
                                                    name:option2.name,
                                                    description:option2.description
                                                }
                                                if(foundUser.currentskills.length<4){
                                                    foundUser.currentskills.push(newskill)
                                                    foundUser.allskills.push(newskill)
                                                }
                                                else{
                                                    foundUser.allskills.push(newskill)
                                                }
                                                foundUser.skill_tree.physical+=2
                                                acceptembed = new MessageEmbed()
                                                .setColor('RANDOM')
                                                .setTitle('SKILL CHOSEN')
                                                .setDescription(`you chose ${option2.name}`)
                                               
                                            }
                                            else if(choice == option3.name){
                                                const newskill = {
                                                    name:option3.name,
                                                    description:option3.description
                                                }
                                                if(foundUser.currentskills.length<4){
                                                    foundUser.currentskills.push(newskill)
                                                    foundUser.allskills.push(newskill)
                                                }
                                                else{
                                                    foundUser.allskills.push(newskill)
                                                }
                                                foundUser.skill_tree.magical+=2
                                                acceptembed = new MessageEmbed()
                                                .setColor('RANDOM')
                                                .setTitle('SKILL CHOSEN')
                                                .setDescription(`you chose ${option3.name}`)
                                               
                                            }
                                            await profileModel.updateOne({userID:authorId},{currentskills:foundUser.currentskills,allskills:foundUser.allskills,skill_tree:foundUser.skill_tree})
                                            await interaction.editReply({embeds:[acceptembed],components:[]})
                                            collector_select.stop()
                                        })

                                        collector_cancel.on('collect', async j => {
                                            j.deferUpdate().catch(() => null)
                                    
                                            let delembed = new MessageEmbed()
                                            .setColor('RANDOM')
                                            .setTitle('CANCELLED')
                                            .setDescription(`learn skill cancelled!`)
                                            
                                            await interaction.editReply({embeds:[delembed],components:[]})
                                            collector_cancel.stop()
                                        })
                            }
                        }
                        else{
                            interaction.reply(`you cannot learn any skill right now`)
                        }
                    })
                
                }
                else{
                    interaction.reply(`it seems you haven't awakened yet!`)
                }
            }
        })
    }
)