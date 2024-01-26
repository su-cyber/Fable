import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import allskills from '../src/age/skills/skills'
import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import { getEmoji } from './fight'
import cloneDeep from 'lodash.clonedeep'

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
                            let btnraw= new MessageActionRow().addComponents([
                                new MessageButton().setCustomId("backward").setStyle("PRIMARY").setLabel("⏪"),
                                new MessageButton().setCustomId("stop").setStyle("DANGER").setLabel("stop"),
                                new MessageButton().setCustomId("forward").setStyle("PRIMARY").setLabel("⏩"),
                                
                            ])
                            let currentSkills = foundUser.currentskills
                            let passiveSkills = foundUser.all_passives
                            let allSkills = foundUser.allskills


                            let filter = i => i.user.id === authorId
                            let collector = await interaction.channel.createMessageComponentCollector({filter: filter , time : 1000 * 300})
    
    function chunkArray(array, chunkSize) {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += chunkSize) {
          chunkedArray.push(array.slice(i, i + chunkSize));
        }
        return chunkedArray;
      }
      const chunkedCurrent = chunkArray(currentSkills,5);
      const chunkedPassives = chunkArray(passiveSkills,5);
      const chunkedAll = chunkArray(allSkills,5);

      let CurrentEmbeds = []
      let PassiveEmbeds = []
      let AllSkillEmbeds = []
      
      let innate_passive = cloneDeep(foundUser.innate_passive)
      if(innate_passive.length == 0){
        innate_passive = [{
            name:"None",
            description:"None"
        }]
      }
      let external_passive = cloneDeep(foundUser.passiveskills)
      let mapped_external = external_passive.map((skill) => {
           
        return `__**Name**__: ${skill.name}\n__**Description**__:${skill.description}`
    }).join("\n\n")

    if(external_passive.length == 0){
        mapped_external = `__**Name**__: None\n__**Description**__:None`
    }
      const passive_home = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('CURRENT PASSIVE SKILLS')
      .setDescription(`### INNATE:\n\n__**Name**__:${innate_passive[0].name}\n__**Description**__:${innate_passive[0].description}\n\n### EXTERNAL:\n\n${mapped_external}`)
      PassiveEmbeds.push(passive_home)
      chunkedCurrent.map((data) => {
        const current=data.map((skill) => {
            let use
            const foundSkill = allskills.find(allskill => allskill.name == skill.name)
            if(foundSkill.type == "physical"){
                use = `Uses Vigour`
            }
            else{
                use = `Uses Arcana`
            }
            let emoji = getEmoji(foundSkill.element)
            if(emoji === undefined){
                emoji = ""
            }
            return `__**Name**__: ${skill.name} ${emoji}\n__**Description**__:${skill.description}\n__**POW**__: ${foundSkill.damage}\n__**AP Cost**__: ${foundSkill.mana_cost}\n**(${use})**`
        }).join("\n\n")
        const newEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('CURRENT SKILLS')
        .setDescription(`${current}`)
        CurrentEmbeds.push(newEmbed)
         
      })
      chunkedPassives.map((data) => {
        const passive=data.map((skill) => {
           
            return `__**Name**__: ${skill.name}\n__**Description**__:${skill.description}`
        }).join("\n\n")
        const newEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('AVAILABLE PASSIVE SKILLS')
        .setDescription(`${passive}`)
        PassiveEmbeds.push(newEmbed)
         
      })
      chunkedAll.map((data) => {
        const all=data.map((skill) => {
            let use
            const foundSkill = allskills.find(allskill => allskill.name == skill.name)
            if(foundSkill.type == "physical"){
                use = `Uses Vigour`
            }
            else{
                use = `Uses Arcana`
            }
            let emoji = getEmoji(foundSkill.element)
            if(emoji === undefined){
                emoji = ""
            }
            return `__**Name**__: ${skill.name} ${emoji}\n__**Description**__:${skill.description}\n__**POW**__: ${foundSkill.damage}\n__**AP Cost**__: ${foundSkill.mana_cost}\n**(${use})**`
        }).join("\n\n")
        const newEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('ALL SKILLS')
        .setDescription(`${all}`)
        AllSkillEmbeds.push(newEmbed)
         
      })

      let empty = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('SKILL LIST')
      .setDescription(`**YOU HAVE NO SKILLS AVAILABLE**`)
    let totalEmbeds = CurrentEmbeds.concat(PassiveEmbeds,AllSkillEmbeds)
    if(totalEmbeds.length == 0){
        totalEmbeds.push(empty)
    }
    for(let j =0;j<totalEmbeds.length;j++){
        totalEmbeds[j].setFooter({text:`Page: ${j+1}/${totalEmbeds.length}`})
    }
    await interaction.deferReply()
    await interaction.editReply({embeds:[totalEmbeds[0]],components:[btnraw]})
    let count = 0
    collector.on('collect', async i => {
        if(i.customId === 'forward'){
            await i.deferUpdate().catch(e => {})
            if(count== totalEmbeds.length-1){
                count=0
            }
            else{
                count +=1
            }
            
            await interaction.editReply({content: null,embeds:[totalEmbeds[count]],components:[btnraw]})
        }
        else if(i.customId === 'backward'){
            await i.deferUpdate().catch(e => {})
            if(count== 0){
                count=totalEmbeds.length-1
            }
            else{
                count-=1
            }
            
            await interaction.editReply({content: null,embeds:[totalEmbeds[count]],components:[btnraw]})

        }
        else if(i.customId === 'stop'){
            collector.stop()
            
        }
        else{

        }

  
    
    })

collector.on('end', () => {
interaction.deleteReply()
})


                           
                        }
                    })
                }
                else{
                    await interaction.reply({content:"It seems you are not awakened yet!\n```use /awaken to begin your Fable```",ephemeral:true})
                }
            }
        })
    })