import {
    CacheType,
    MessageActionRow,
    MessageButton,
    MessageComponentInteraction,
    MessageEmbed,
    MessageSelectMenu,
} from 'discord.js'
import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import gladius_tree from '../src/age/skills/gladius_tree'
import noir_tree from '../src/age/skills/noir'
import buushin_tree from '../src/age/skills/buushin_tree'
import magus_tree from '../src/age/skills/magus_tree'
import dragoon_tree from '../src/age/skills/dragoon_tree'
import flame_tree from '../src/age/skills/flame_tree'
import volt_tree from '../src/age/skills/volt_tree'
import light_tree from '../src/age/skills/light_tree'
import frost_tree from '../src/age/skills/frost_tree'
import wave_tree from '../src/age/skills/wave_tree'
import bloom_tree from '../src/age/skills/bloom_tree'
import venom_tree from '../src/age/skills/venom_tree'
import alloy_tree from '../src/age/skills/alloy_tree'
import gale_tree from '../src/age/skills/gale_tree'
import terra_tree from '../src/age/skills/terra_tree'

export default new MyCommandSlashBuilder({ name: 'learnnewskill', description: 'learn a new skill' })

.setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id

        profileModel.exists({userID: authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    profileModel.findOne({userID:authorId},async function(err,foundUser){
                        if(foundUser.skill_tree.status || foundUser.skill_tree.class_status){
                            let class_tree
                            if(foundUser.class == "Gladius"){
                                class_tree = gladius_tree
                            }
                            else if(foundUser.class == "Magus"){
                                class_tree = magus_tree
                            }
                            else if(foundUser.class == "Buushin"){
                                class_tree = buushin_tree
                            }
                            else if(foundUser.class == "Dragoon"){
                                class_tree = dragoon_tree
                            }
                            else if(foundUser.class == "Noir"){
                                class_tree = noir_tree
                            }
                                let element_tree
                                if(foundUser.elements[0] == "Flame"){
                                    element_tree = flame_tree
                                }
                                else if(foundUser.elements[0] == "Volt"){
                                    element_tree = volt_tree
                                }
                                else if(foundUser.elements[0] == "Light"){
                                    element_tree = light_tree
                                }
                                else if(foundUser.elements[0] == "Gale"){
                                    element_tree = gale_tree
                                }
                                else if(foundUser.elements[0] == "Frost"){
                                    element_tree = frost_tree
                                }
                                else if(foundUser.elements[0] == "Terra"){
                                    element_tree = terra_tree
                                }
                                else if(foundUser.elements[0] == "Alloy"){
                                    element_tree = alloy_tree
                                }
                                else if(foundUser.elements[0] == "Bloom"){
                                    element_tree = bloom_tree
                                }
                                else if(foundUser.elements[0] == "Venom"){
                                    element_tree = venom_tree
                                }
                                else if(foundUser.elements[0] == "Wave"){
                                    element_tree = wave_tree
                                }
                        
                        
                        let acquiredSkills = []
                        if(foundUser.skill_tree.status){
                            for(let i=0;i<foundUser.skill_tree.status;i++){
                                acquiredSkills.push(element_tree[foundUser.skill_tree.elemental])
                                foundUser.skill_tree.elemental+=1
                            }
                            foundUser.skill_tree.status=0
                        }
                       
                        if(foundUser.skill_tree.class_status){
                            for(let i=0;i<foundUser.skill_tree.class_status;i++){
                                acquiredSkills.push(class_tree[foundUser.skill_tree.class])
                                foundUser.skill_tree.class+=1
                            }
                            foundUser.skill_tree.class_status=0
                        }

                        const mappedskills=acquiredSkills.map((skill) => {
                            return `Skill Name: ${skill.name}\nDescription: ${skill.description}`
                        }).join("\n\n")
                        let skill
                        for(let j=0;j<acquiredSkills.length;j++){
                             skill = {
                                name:acquiredSkills[j].name,
                                description:acquiredSkills[j].description
                               }
                             foundUser.allskills.push(skill)
                        }
                        let skillembed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('SKILLS OBTAINED!')
                                .setDescription(`You have obtained the following skills:-\n\n${mappedskills}\n\nthe skills have been added to your skill list, use /addskill to add them to your skill cycle`)
                        
                        interaction.reply({embeds:[skillembed]})
                        await profileModel.updateOne({userID:authorId},{skill_tree:foundUser.skill_tree,allskills:foundUser.allskills})

                        }

                        
                        else{
                            interaction.reply({content:`you cannot learn any skill right now`,ephemeral:true})
                        }
                    })
                
                }
                else{
                    interaction.reply({content:`it seems you haven't awakened yet!`,ephemeral:true})
                }
            }
        })
    }
)