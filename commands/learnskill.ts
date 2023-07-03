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
import samurai_tree from '../src/age/skills/samurai_tree'
import assassin_tree from '../src/age/skills/assassin_tree'
import crusader_tree from '../src/age/skills/crusader_tree'
import sorceror_tree from '../src/age/skills/sorceror_tree'
import wanderer_tree from '../src/age/skills/wanderer_tree'
import paladin_tree from '../src/age/skills/paladin_tree'
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
                            if(foundUser.class == "Samurai"){
                                class_tree = samurai_tree
                            }
                            else if(foundUser.class == "Sorceror"){
                                class_tree = sorceror_tree
                            }
                            else if(foundUser.class == "Paladin"){
                                class_tree = paladin_tree
                            }
                            else if(foundUser.class == "Crusader"){
                                class_tree = crusader_tree
                            }
                            else if(foundUser.class == "Wanderer"){
                                class_tree = wanderer_tree
                            }
                            else if(foundUser.class == "Assassin"){
                                class_tree = assassin_tree
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
                        
                        let skillembed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('Selected')
                                .setDescription(`You have obtained the following skills:-\n\n${mappedskills}\n\nthe skills have been added to your skill list, use /addskill to add them to your skill cycle`)
                        
                        interaction.reply({embeds:[skillembed]})
                        foundUser.allskills.concat(acquiredSkills)
                        profileModel.updateOne({userID:authorId},{skill_tree:foundUser.skill_tree,allskills:foundUser.allskills})

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