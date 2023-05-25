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
                        if(foundUser.skill_tree.status){
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
                    //We initialise the options to something that can never happen i.e class_tree[0] will never come and add options one by one
                    //if we check that condition we can seperate the options
                                let option1 = class_tree[0]
                                let option2 = class_tree[0]
                                let option3 = class_tree[0]
                                if(foundUser.skill_tree.class != 5){
                                    option1 = class_tree[foundUser.skill_tree.class]
                                }
                                if(foundUser.skill_tree.physical != 8){
                                    option2 = element_tree[foundUser.skill_tree.physical]
                                }
                                if(foundUser.skill_tree.magical != 9){
                                    option3 = element_tree[foundUser.skill_tree.magical]
                                }
                                
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
                                                .setPlaceholder(`Select a skill to learn ${interaction.user.username}`)
                                                .addOptions({
                                                    
                                                    label: option1.name,
                                                    description: "",
                                                    value: option1.name,
                                                },{
                                                    label: option2.name,
                                                    description:  "",
                                                    value: option2.name,
                                                },{
                                                    label: option3.name,
                                                    description:  "",
                                                    value: option3.name,
                                                }
                                                )
                                                .setDisabled(false),
                                        ])
                                        if(option1 == class_tree[0] && option2 == class_tree[0] && option3 == class_tree[0]){
                                            let maxembed = new MessageEmbed()
                                            .setColor('RANDOM')
                                            .setTitle('SKILL TREE - MAX')
                                            .setDescription(`You Skill Tree is maxed out! you cannot learn a new skill`)

                                        await interaction.reply({embeds:[maxembed]})
                                        }
                                        else{
                                            if(option1 == class_tree[0]){
                                                if(option2 == class_tree[0]){
                                                    skillEmbed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('LEARN SKILL')
                                                    .setDescription(`Select a skill to learn:\n\nSkill 1: MAX\n\nSkill 2: MAX\n\nSkill 3: **${option3.name}**\nDescription:${option3.description}`)
                                  
                                                    select =  new MessageActionRow().addComponents([
                                                        new MessageSelectMenu()
                                                        .setCustomId('select')
                                                            .setPlaceholder(`Select a skill to learn ${interaction.user.username}`)
                                                            .addOptions({
                                                                label: option3.name,
                                                                description: option3.description,
                                                                value: option3.name,
                                                            }
                                                            )
                                                            .setDisabled(false),
                                                    ])
                                                }
                                                else if(option3 == class_tree[0]){
                                                    skillEmbed = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LEARN SKILL')
                                                        .setDescription(`Select a skill to learn:\n\nSkill 1: MAX\n\nSkill 2: **${option2.name}**\nDescription:${option2.description}\n\nSkill 3: MAX`)
                                                    
                                                    select =  new MessageActionRow().addComponents([
                                                        new MessageSelectMenu()
                                                        .setCustomId('select')
                                                            .setPlaceholder(`Select a skill to learn ${interaction.user.username}`)
                                                            .addOptions({
                                                                label: option2.name,
                                                                description: option2.description,
                                                                value: option2.name,
                                                            }
                                                            )
                                                            .setDisabled(false),
                                                    ])
                                                }
                                                else{
                                                    skillEmbed = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LEARN SKILL')
                                                        .setDescription(`Select a skill to learn:\n\nSkill 1: MAX\n\nSkill 2: **${option2.name}**\nDescription:${option2.description}\n\nSkill 3: **${option3.name}**\nDescription:${option3.description}`)
                                                    
                                                    select =  new MessageActionRow().addComponents([
                                                        new MessageSelectMenu()
                                                        .setCustomId('select')
                                                            .setPlaceholder(`Select a skill to learn ${interaction.user.username}`)
                                                            .addOptions({
                                                                label: option2.name,
                                                                description:  "",
                                                                value: option2.name,
                                                            },{
                                                                label: option3.name,
                                                                description:  "",
                                                                value: option3.name,
                                                            }
                                                            )
                                                            .setDisabled(false),
                                                    ])
                                                }
                                            }
                                            else if(option2 == class_tree[0]){
                                                if(option3 == class_tree[0]){
                                                    skillEmbed = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LEARN SKILL')
                                                        .setDescription(`Select a skill to learn:\n\nSkill 1: **${option1.name}**\nDescription:${option1.description}\n\nSkill 2: MAX\n\nSkill 3: MAX`)
                                                    
                                                    select =  new MessageActionRow().addComponents([
                                                        new MessageSelectMenu()
                                                        .setCustomId('select')
                                                            .setPlaceholder(`Select a skill to learn ${interaction.user.username}`)
                                                            .addOptions({
                                                                label: option1.name,
                                                                description:  "",
                                                                value: option1.name,
                                                            }
                                                            )
                                                            .setDisabled(false),
                                                    ])
                                                }
                                                else if(option1 == class_tree[0]){
                                                    skillEmbed = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LEARN SKILL')
                                                        .setDescription(`Select a skill to learn:\n\nSkill 1:MAX\n\nSkill 2: MAX\n\nSkill 3: **${option3.name}**\nDescription:${option3.description}`)
                                                    
                                                    select =  new MessageActionRow().addComponents([
                                                        new MessageSelectMenu()
                                                        .setCustomId('select')
                                                            .setPlaceholder(`Select a skill to learn ${interaction.user.username}`)
                                                            .addOptions({
                                                                label: option3.name,
                                                                description:  "",
                                                                value: option3.name,
                                                            }
                                                            )
                                                            .setDisabled(false),
                                                    ])
                                                }
                                                else{
                                                     skillEmbed = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LEARN SKILL')
                                                        .setDescription(`Select a skill to learn:\n\nSkill 1: **${option1.name}**\nDescription:${option1.description}\n\nSkill 2: MAX\n\nSkill 3: **${option3.name}**\nDescription:${option3.description}`)
                                                    
                                                    select =  new MessageActionRow().addComponents([
                                                        new MessageSelectMenu()
                                                        .setCustomId('select')
                                                            .setPlaceholder(`Select a skill to learn ${interaction.user.username}`)
                                                            .addOptions({
                                                                label: option1.name,
                                                                description:  "",
                                                                value: option1.name,
                                                            },{
                                                                label: option3.name,
                                                                description:  "",
                                                                value: option3.name,
                                                            }
                                                            )
                                                            .setDisabled(false),
                                                    ])
                                                }
                                            }
                                            else if(option3 == class_tree[0]){
                                                if(option1 == class_tree[0]){
                                                    skillEmbed = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LEARN SKILL')
                                                        .setDescription(`Select a skill to learn:\n\nSkill 1: MAX\n\nSkill 2: **${option2.name}**\nDescription:${option2.description}\n\nSkill 3: MAX`)
                                                    
                                                    select =  new MessageActionRow().addComponents([
                                                        new MessageSelectMenu()
                                                        .setCustomId('select')
                                                            .setPlaceholder(`Select a skill to learn ${interaction.user.username}`)
                                                            .addOptions({
                                                                label: option2.name,
                                                                description:  "",
                                                                value: option2.name,
                                                            }
                                                            )
                                                            .setDisabled(false),
                                                    ])
                                                }
                                                else if(option2 == class_tree[0]){
                                                    skillEmbed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('LEARN SKILL')
                                                    .setDescription(`Select a skill to learn:\n\nSkill 1: **${option1.name}**\nDescription:${option1.description}\n\nSkill 2: MAX\n\nSkill 3: MAX`)
                                                
                                                select =  new MessageActionRow().addComponents([
                                                    new MessageSelectMenu()
                                                    .setCustomId('select')
                                                        .setPlaceholder(`Select a skill to learn ${interaction.user.username}`)
                                                        .addOptions({
                                                            label: option1.name,
                                                            description:  "",
                                                            value: option1.name,
                                                        }
                                                        )
                                                        .setDisabled(false),
                                                ])
                                                }
                                                else{
                                                     skillEmbed = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LEARN SKILL')
                                                        .setDescription(`Select a skill to learn:\n\nSkill 1: **${option1.name}**\nDescription:${option1.description}\n\nSkill 2: **${option2.name}**\nDescription:${option2.description}\n\nSkill 3: MAX`)
                                                    
                                                    select =  new MessageActionRow().addComponents([
                                                        new MessageSelectMenu()
                                                        .setCustomId('select')
                                                            .setPlaceholder(`Select a skill to learn ${interaction.user.username}`)
                                                            .addOptions({
                                                                label: option1.name,
                                                                description:  "",
                                                                value: option1.name,
                                                            },{
                                                                label: option2.name,
                                                                description:  "",
                                                                value: option2.name,
                                                            }
                                                            )
                                                            .setDisabled(false),
                                                    ])
                                                }
                                            }
                                            await interaction.reply({content: null,embeds:[skillEmbed],components:[select,btn_cancel]})
                                        }
                                        

                                        let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
                                        let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"    
                                        let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select })
                                        let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel })
                                    
                                        collector_select.setMaxListeners(Infinity)
                                        collector_cancel.setMaxListeners(Infinity)
                                    
                                    
                                        
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
                                            foundUser.skill_tree.status-=1
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