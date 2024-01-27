import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import { sleep, weightedRandom } from '../src/utils'
import { getMonsters } from '../src/age/monsters'
import { MessageActionRow, MessageSelectMenu} from 'discord.js'
import { getRandomMonster } from '../src/age/monsters'
import { getRandomFlora } from '../src/age/flora'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import {MessageButton, MessageEmbed } from 'discord.js'
import { MessageAttachment } from 'discord.js'


export default new MyCommandSlashBuilder({ name: 'explore', description: 'Explore the world' })

.setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id
        
        
        
        

        profileModel.exists({userID: authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    
        profileModel.findOne({userID:authorId},async function(err,foundUser) {
           if(foundUser.dungeon.status){
            interaction.reply({content:`You cannot use this command inside a dungeon!`,ephemeral:true})
           }
           else{
            const location = foundUser.location
            const city_town = foundUser.city_town
            if(foundUser.kingdom == "solarstrio"){
                if(city_town == "ellior"){
                    const pick = weightedRandom(["flora","monster"],[0.3,0.7])

                    if(pick == "flora"){
                        await interaction.reply({ content: '\u200b', components: [],files:[] })
                        const flora = (await getRandomFlora(city_town))
                        let floraEmbed = new MessageEmbed()
                            .setColor('GREEN')
                            .setTitle('ENCOUNTER')
                            .addFields([
                                {
                                    name: `Description:`,
                                    value:`${flora.description}`
                                }
                            ])
                            .setDescription(`You found a ${flora.fake_name}\n${flora.name} X ${flora.quantity} has been added to inventory!`)
                        await interaction.editReply({embeds:[floraEmbed],files:[]})
    
                        inventory.findOne({userID:interaction.user.id},async function(err,foundUser){
                            if(err){
                                console.log(err);
                                
                            }
                            else{
                                const foundItem = foundUser.inventory.items.find(item => item.name.name === flora.name)
                                if (foundItem){
                
                                    foundItem.quantity+=flora.quantity
                                }
                                else{
                                    const newItem = {
                                        name:flora,
                                        description:flora.description,
                                        quantity:Number(flora.quantity)
                                    }
                                    foundUser.inventory.items.push(newItem)
                                }
                                await inventory.updateOne({userID:authorId},foundUser)
                            }
                            
                        })
                    }
                    else if(pick == "monster"){
                    
                    
                       
                            await interaction.reply({ content: '\u200b', components: [] })
                            const monster = (await getRandomMonster(city_town))
                            
    
                            
                            foundUser.encounter = []
                           
                       
                            let btnraw= new MessageActionRow().addComponents([
                                new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Fight"),
                                new MessageButton().setCustomId("btn_reject").setStyle("DANGER").setLabel("Run"),])
    
                                let d_btnraw = new MessageActionRow().addComponents([
                                    new MessageButton().setCustomId("dbtn_accept").setStyle("PRIMARY").setLabel("Fight").setDisabled(true),
                                    new MessageButton().setCustomId("dbtn_reject").setStyle("DANGER").setLabel("Run").setDisabled(true),
                                ])
    
                            const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                            let fightEmbed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('ENCOUNTER')
                            .setImage('attachment://' + monster.fileName)
                            .setDescription(`🔎 you found a ${monster.name}!\n\nDescription:${monster.description}`)
        
                            let acceptEmbed = new MessageEmbed()
                            .setColor('GREEN')
                            .setTitle('ACCEPTED')
                            .setDescription('You have decided to fight!\ncheck your private message')
        
                            let rejectEmbed = new MessageEmbed()
                            .setColor('RED')
                            .setTitle('RAN AWAY')
                            .setDescription('You ran away!')
                            
                        
                        await interaction.editReply({content: null,embeds:[fightEmbed],components:[btnraw],files:[attachment]})
                        let filter = i => i.user.id === authorId
                            let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                    
                            collector.on('collect',async (btn) => {
                                if(btn.isButton()){
                                    if(btn.customId === "btn_accept"){
                                        await btn.deferUpdate().catch(e => {})
                                        await interaction.editReply({embeds:[acceptEmbed],files:[]})
                                        const encounter = {
                                            name: monster.name,
                                            time : Date.now(),
                                            location:foundUser.city_town
    
                                        }
                                        
                                        foundUser.encounter.push(encounter)
                                        await profileModel.updateOne({userID:authorId},{encounter:foundUser.encounter})
                                        interaction.user.send(`Use /fight to begin encounter`).catch(e => {interaction.editReply({content:`It seems your DMs are disabled! kindly turn them on to access the combat feature of Fable.`})})
    
                                        
                                   
                                    collector.stop()
                                        
                                    }
                                    else if(btn.customId === "btn_reject"){
                                        await btn.deferUpdate().catch(e => {})
                                        await interaction.editReply({embeds:[rejectEmbed],components:[],files:[]})
                                         foundUser.encounter = []
                                    
                                        await profileModel.updateOne({userID:authorId},foundUser)
    
                                        collector.stop()
                                    }
    
                                    
                                    
                                }
                                  
                    
                       
                       
                        })
    
                        collector.on('end', () => {
                            interaction.editReply({components: [d_btnraw]})
                        })
    
                            
                       
                    }
     
                }
                else if(city_town == "Castellan Fields"){
                
                    const pick = weightedRandom(["flora","monster"],[0.1,0.9])

                    if(pick == "flora"){
                        await interaction.reply({ content: '\u200b', components: [],files:[] })
                        const flora = (await getRandomFlora(city_town))
                        let floraEmbed = new MessageEmbed()
                            .setColor('GREEN')
                            .setTitle('ENCOUNTER')
                            .addFields([
                                {
                                    name: `Description:`,
                                    value:`${flora.description}`
                                }
                            ])
                            .setDescription(`You found a ${flora.fake_name}\n${flora.name} X ${flora.quantity} has been added to inventory!`)
                            await interaction.editReply({embeds:[floraEmbed],files:[]})
                        inventory.findOne({userID:interaction.user.id},async function(err,foundUser){
                            if(err){
                                console.log(err);
                                
                            }
                            else{
                                const foundItem = foundUser.inventory.items.find(item => item.name.name === flora.name)
                                if (foundItem){
                
                                    foundItem.quantity+=flora.quantity
                                }
                                else{
                                    const newItem = {
                                        name:flora,
                                        description:flora.description,
                                        quantity:Number(flora.quantity)
                                    }
                                    foundUser.inventory.items.push(newItem)
                                }
                                await inventory.updateOne({userID:authorId},foundUser)
                            }
                            
                        })
                    }
                    else if(pick == "monster"){
                    
                    
                       
                            await interaction.reply({ content: '\u200b', components: [], })
                            const monster = (await getRandomMonster(city_town))
                            
    
                            
                            foundUser.encounter = []
                           
                       
                            let btnraw= new MessageActionRow().addComponents([
                                new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Fight"),
                                new MessageButton().setCustomId("btn_reject").setStyle("DANGER").setLabel("Run"),])
    
                                let d_btnraw = new MessageActionRow().addComponents([
                                    new MessageButton().setCustomId("dbtn_accept").setStyle("PRIMARY").setLabel("Fight").setDisabled(true),
                                    new MessageButton().setCustomId("dbtn_reject").setStyle("DANGER").setLabel("Run").setDisabled(true),
                                ])
    
                                
                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                let fightEmbed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('ENCOUNTER')
                                .setImage('attachment://' + monster.fileName)
                                .setDescription(`🔎 you found a ${monster.name}!\n\nDescription:${monster.description}`)
        
                            let acceptEmbed = new MessageEmbed()
                            .setColor('GREEN')
                            .setTitle('ACCEPTED')
                            .setDescription('You have decided to fight!\ncheck your private message')
        
                            let rejectEmbed = new MessageEmbed()
                            .setColor('RED')
                            .setTitle('RAN AWAY')
                            .setDescription('You ran away!')
                            
                        
                        await interaction.editReply({content: null,embeds:[fightEmbed],components:[btnraw],files:[attachment]})
                        let filter = i => i.user.id === authorId
                            let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                    
                            collector.on('collect',async (btn) => {
                                if(btn.isButton()){
                                    if(btn.customId === "btn_accept"){
                                        await btn.deferUpdate().catch(e => {})
                                        await interaction.editReply({embeds:[acceptEmbed],files:[]})
                                        const encounter = {
                                            name: monster.name,
                                            time : Date.now(),
                                            location:foundUser.city_town
    
                                        }
                                        
                                        foundUser.encounter.push(encounter)
                                        await profileModel.updateOne({userID:authorId},{encounter:foundUser.encounter})
                                        interaction.user.send(`Use /fight to begin encounter`).catch(e => {interaction.editReply({content:`It seems your DMs are disabled! kindly turn them on to access the combat feature of Fable.`})})
    
                                        
                                   
                                    collector.stop()
                                        
                                    }
                                    else if(btn.customId === "btn_reject"){
                                        await btn.deferUpdate().catch(e => {})
                                        await interaction.editReply({embeds:[rejectEmbed],components:[],files:[]})
                                         foundUser.encounter = []
                                    
                                        await profileModel.updateOne({userID:authorId},foundUser)
    
                                        collector.stop()
                                    }
    
                                    
                                    
                                }
                                  
                    
                       
                       
                        })
    
                        collector.on('end', () => {
                            interaction.editReply({components: [d_btnraw]})
                        })
    
                            
                       
                    }
     
                }
                else if(city_town == "Sunshade Forest"){
                
                    const pick = weightedRandom(["flora","monster"],[0.3,0.7])

                    if(pick == "flora"){
                        await interaction.reply({ content: '\u200b', components: [] })
                        const flora = (await getRandomFlora(city_town))
                        let floraEmbed = new MessageEmbed()
                            .setColor('GREEN')
                            .setTitle('ENCOUNTER')
                            .addFields([
                                {
                                    name: `Description:`,
                                    value:`${flora.description}`
                                }
                            ])
                            .setDescription(`You found a ${flora.fake_name}\n${flora.name} X ${flora.quantity} has been added to inventory!`)
                        await interaction.editReply({embeds:[floraEmbed],files:[]})
                        inventory.findOne({userID:interaction.user.id},async function(err,foundUser){
                            if(err){
                                console.log(err);
                                
                            }
                            else{
                                const foundItem = foundUser.inventory.items.find(item => item.name.name === flora.name)
                                if (foundItem){
                
                                    foundItem.quantity+=flora.quantity
                                }
                                else{
                                    const newItem = {
                                        name:flora,
                                        description:flora.description,
                                        quantity:Number(flora.quantity)
                                    }
                                    foundUser.inventory.items.push(newItem)
                                }
                                await inventory.updateOne({userID:authorId},foundUser)
                            }
                            
                        })
                    }
                    else if(pick == "monster"){
                            await interaction.reply({ content: '\u200b', components: [] })
                            const monster = (await getRandomMonster(city_town))
                            
    
                            
                            foundUser.encounter = []
                           
                       
                            let btnraw= new MessageActionRow().addComponents([
                                new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Fight"),
                                new MessageButton().setCustomId("btn_reject").setStyle("DANGER").setLabel("Run"),])
    
                                let d_btnraw = new MessageActionRow().addComponents([
                                    new MessageButton().setCustomId("dbtn_accept").setStyle("PRIMARY").setLabel("Fight").setDisabled(true),
                                    new MessageButton().setCustomId("dbtn_reject").setStyle("DANGER").setLabel("Run").setDisabled(true),
                                ])
    
                                
                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                let fightEmbed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('ENCOUNTER')
                                .setImage('attachment://' + monster.fileName)
                                .setDescription(`🔎 you found a ${monster.name}!\n\nDescription:${monster.description}`)
        
                            let acceptEmbed = new MessageEmbed()
                            .setColor('GREEN')
                            .setTitle('ACCEPTED')
                            .setDescription('You have decided to fight!\ncheck your private message')
        
                            let rejectEmbed = new MessageEmbed()
                            .setColor('RED')
                            .setTitle('RAN AWAY')
                            .setDescription('You ran away!')
                            
                        
                        await interaction.editReply({content: null,embeds:[fightEmbed],components:[btnraw],files:[attachment]})
                        let filter = i => i.user.id === authorId
                            let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                    
                            collector.on('collect',async (btn) => {
                                if(btn.isButton()){
                                    if(btn.customId === "btn_accept"){
                                        await btn.deferUpdate().catch(e => {})
                                        await interaction.editReply({embeds:[acceptEmbed],files:[]})
                                        const encounter = {
                                            name: monster.name,
                                            time : Date.now(),
                                            location:foundUser.city_town
    
                                        }
                                        
                                        foundUser.encounter.push(encounter)
                                        await profileModel.updateOne({userID:authorId},{encounter:foundUser.encounter})
                                        interaction.user.send(`Use /fight to begin encounter`).catch(e => {interaction.editReply({content:`It seems your DMs are disabled! kindly turn them on to access the combat feature of Fable.`})})
    
                                        
                                   
                                    collector.stop()
                                        
                                    }
                                    else if(btn.customId === "btn_reject"){
                                        await btn.deferUpdate().catch(e => {})
                                        await interaction.editReply({embeds:[rejectEmbed],components:[],files:[]})
                                         foundUser.encounter = []
                                    
                                        await profileModel.updateOne({userID:authorId},foundUser)
    
                                        collector.stop()
                                    }
    
                                    
                                    
                                }
                                  
                    
                       
                       
                        })
    
                        collector.on('end', () => {
                            interaction.editReply({components: [d_btnraw]})
                        })
    
                            
                       
                    }
     
                }
                else if(city_town == "The Badlands"){
                
                    const pick = weightedRandom(["flora","monster"],[0.4,0.6])

                    if(pick == "flora"){
                        await interaction.reply({ content: '\u200b', components: [] })
                        const flora = (await getRandomFlora(city_town))
                        let floraEmbed = new MessageEmbed()
                            .setColor('GREEN')
                            .setTitle('ENCOUNTER')
                            .addFields([
                                {
                                    name: `Description:`,
                                    value:`${flora.description}`
                                }
                            ])
                            .setDescription(`You found a ${flora.fake_name}\n${flora.name} X ${flora.quantity} has been added to inventory!`)
                        await interaction.editReply({embeds:[floraEmbed],files:[]})
                        inventory.findOne({userID:interaction.user.id},async function(err,foundUser){
                            if(err){
                                console.log(err);
                                
                            }
                            else{
                                const foundItem = foundUser.inventory.items.find(item => item.name.name === flora.name)
                                if (foundItem){
                
                                    foundItem.quantity+=flora.quantity
                                }
                                else{
                                    const newItem = {
                                        name:flora,
                                        description:flora.description,
                                        quantity:Number(flora.quantity)
                                    }
                                    foundUser.inventory.items.push(newItem)
                                }
                                await inventory.updateOne({userID:authorId},foundUser)
                            }
                            
                        })
                    }
                    else if(pick == "monster"){
                            await interaction.reply({ content: '\u200b', components: [] })
                            const monster = (await getRandomMonster(city_town))
                            
    
                            
                            foundUser.encounter = []
                           
                       
                            let btnraw= new MessageActionRow().addComponents([
                                new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Fight"),
                                new MessageButton().setCustomId("btn_reject").setStyle("DANGER").setLabel("Run"),])
    
                                let d_btnraw = new MessageActionRow().addComponents([
                                    new MessageButton().setCustomId("dbtn_accept").setStyle("PRIMARY").setLabel("Fight").setDisabled(true),
                                    new MessageButton().setCustomId("dbtn_reject").setStyle("DANGER").setLabel("Run").setDisabled(true),
                                ])
    
                                
                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                let fightEmbed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('ENCOUNTER')
                                .setImage('attachment://' + monster.fileName)
                                .setDescription(`🔎 you found a ${monster.name}!\n\nDescription:${monster.description}`)
        
                            let acceptEmbed = new MessageEmbed()
                            .setColor('GREEN')
                            .setTitle('ACCEPTED')
                            .setDescription('You have decided to fight!\ncheck your private message')
        
                            let rejectEmbed = new MessageEmbed()
                            .setColor('RED')
                            .setTitle('RAN AWAY')
                            .setDescription('You ran away!')
                            
                        
                        await interaction.editReply({content: null,embeds:[fightEmbed],components:[btnraw],files:[attachment]})
                        let filter = i => i.user.id === authorId
                            let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                    
                            collector.on('collect',async (btn) => {
                                if(btn.isButton()){
                                    if(btn.customId === "btn_accept"){
                                        await btn.deferUpdate().catch(e => {})
                                        await interaction.editReply({embeds:[acceptEmbed],files:[]})
                                        const encounter = {
                                            name: monster.name,
                                            time : Date.now(),
                                            location:foundUser.city_town
    
                                        }
                                        
                                        foundUser.encounter.push(encounter)
                                        await profileModel.updateOne({userID:authorId},{encounter:foundUser.encounter})
                                        interaction.user.send(`Use /fight to begin encounter`).catch(e => {interaction.editReply({content:`It seems your DMs are disabled! kindly turn them on to access the combat feature of Fable.`})})
    
                                        
                                   
                                    collector.stop()
                                        
                                    }
                                    else if(btn.customId === "btn_reject"){
                                        await btn.deferUpdate().catch(e => {})
                                        await interaction.editReply({embeds:[rejectEmbed],components:[],files:[]})
                                         foundUser.encounter = []
                                    
                                        await profileModel.updateOne({userID:authorId},foundUser)
    
                                        collector.stop()
                                    }
    
                                    
                                    
                                }
                                  
                    
                       
                       
                        })
    
                        collector.on('end', () => {
                            interaction.editReply({components: [d_btnraw]})
                        })
    
                            
                       
                    }
     
                }
                else if(city_town == "aube"){
                     if(location == "Abandoned Castle"){
                        if(foundUser.completed_dungeons.includes("Abandoned Castle")){
                            interaction.reply({content:`You have already cleared this dungeon!`,ephemeral:true})
                        }
                        else if(foundUser.side_quest[0] == "KS-TA-SQ5" && foundUser.side_quest_phase == "6"){
                            let btnraw= new MessageActionRow().addComponents([
                                new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Enter"),
                                new MessageButton().setCustomId("btn_reject").setStyle("DANGER").setLabel("Cancel"),])
        
                                let d_btnraw = new MessageActionRow().addComponents([
                                    new MessageButton().setCustomId("dbtn_accept").setStyle("PRIMARY").setLabel("Enter").setDisabled(true),
                                    new MessageButton().setCustomId("dbtn_reject").setStyle("DANGER").setLabel("Cancel").setDisabled(true),
                                ])
                                const attachment = new MessageAttachment('assets/AubeTown/Abandoned_Castle.jpg')
                            let dungeonEmbed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle(`Exploring ${location}...`)
                                    .setImage('attachment://Abandoned_Castle.jpg')
                                    .setDescription(`As you approach the Abandoned Castle, a sense of mystery and melancholy washes over you. Its imposing silhouette stands as a testament to a bygone era, where echoes of battles and whispers of forgotten tales linger in the air. The weathered stones bear the weight of history, each crack and crevice whispering secrets lost to time. The once-majestic architecture now wears a cloak of solitude, the windows like empty eyes that have seen the passage of ages.\n\nYou are about to enter a dungeon!\nDo you wish to proceed?\n\n**Recommeded Level: 4**`)
                
                                    let acceptEmbed = new MessageEmbed()
                                    .setColor('GREEN')
                                    .setTitle('ENTERED DUNGEON')
                                    .setDescription('You have decided to enter!\npress /proceeddungeon in DMs to move forward')
                
                                    let rejectEmbed = new MessageEmbed()
                                    .setColor('RED')
                                    .setTitle('RETREAT')
                                    .setDescription('You decided to retreat!')
                                    
                                
                                await interaction.reply({content: null,embeds:[dungeonEmbed],components:[btnraw],files:[attachment]})
                                let filter = i => i.user.id === authorId
                                    let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                            
                                    collector.on('collect',async (btn) => {
                                        if(btn.isButton()){
                                            if(btn.customId === "btn_accept"){
                                                await btn.deferUpdate().catch(e => {})
                                                await interaction.editReply({embeds:[acceptEmbed]})
                                                foundUser.dungeon.status = true
                                                foundUser.dungeon.name = "Abandoned Castle"
                                                foundUser.dungeon.step = 1 
                                                await profileModel.updateOne({userID:authorId},{dungeon:foundUser.dungeon})
                                                interaction.user.send(`You are now inside a dungeon!\npress /proceeddungeon to move forward`)
            
                                                
                                           
                                            collector.stop()
                                                
                                            }
                                            else if(btn.customId === "btn_reject"){
                                                await btn.deferUpdate().catch(e => {})
                                                await interaction.editReply({embeds:[rejectEmbed],components:[]})
        
                                            
            
                                                collector.stop()
                                            }
            
                                            
                                            
                                        }
                                          
                            
                               
                               
                                })
            
                                collector.on('end', () => {
                                    interaction.editReply({components: [d_btnraw]})
                                })
                        }
                        else{
                            interaction.reply({content:`You cannot Explore this location yet,continue the story to reveal the hidden mystery of the Abandoned Castle!`,ephemeral:true})
                        }
                        
                    }
                    else if(location == "None"){
                const attachment = new MessageAttachment('assets/AubeTown/Aube_Town.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Now Exploring ${city_town}...`)
                .setImage('attachment://Aube_Town.jpg')
                .setDescription(`As you wander through the charming streets of Aube Town, a sense of serenity embraces you. The warm glow of the rising sun bathes the quaint buildings, casting long shadows that dance upon the cobblestones. The town awakens with a gentle buzz of activity, as locals exchange friendly greetings and prepare for the day ahead. From the inviting aroma of freshly baked goods wafting from the local dairy to the cheerful chatter echoing from the town center, every corner reveals the tight-knit community that thrives in this idyllic haven. In Aube Town, you feel a sense of belonging and discover the simple joys of life in a place where the dawn brings not just a new day, but a promise of camaraderie and the embrace of a vibrant community.`)
                await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
            
                    }
                    else{
                        await interaction.reply({content:`You are not in an explorable location!`,ephemeral:true})
                     }

                }
                
                else if(city_town == "Zorya"){
                    
                    if(location == 'Siewelle Port'){
                        if(foundUser.side_quest[0] == "KS-ZS-SQ3" && foundUser.side_quest_phase == "4"){
                            let btnraw= new MessageActionRow().addComponents([
                                new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Enter"),
                                new MessageButton().setCustomId("btn_reject").setStyle("DANGER").setLabel("Cancel"),])
        
                                let d_btnraw = new MessageActionRow().addComponents([
                                    new MessageButton().setCustomId("dbtn_accept").setStyle("PRIMARY").setLabel("Enter").setDisabled(true),
                                    new MessageButton().setCustomId("dbtn_reject").setStyle("DANGER").setLabel("Cancel").setDisabled(true),
                                ])
                                const attachment = new MessageAttachment('assets/Zorya/Aqua_canal.jpeg')
                            let dungeonEmbed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle(`Exploring Aque Canals...`)
                                    .setImage('attachment://Aqua_canal.jpeg')
                                    .setDescription(`As you venture into the Aque Canals, you are transported to a fantastical realm. The labyrinthine stone pathways were adorned with luminescent moss, casting an eerie, ethereal glow, while mysterious, ancient symbols adorned the walls. The air was thick with the scent of enchanted flora, and as they looked down, the shallow waters seemed to reflect distant constellations, turning each step into a journey through the stars themselves.\n\nYou are about to enter a dungeon!\nDo you wish to proceed?\n\n**Recommeded Level: 13**`)
                
                                    let acceptEmbed = new MessageEmbed()
                                    .setColor('GREEN')
                                    .setTitle('ENTERED DUNGEON')
                                    .setDescription('You have decided to enter!\npress /proceeddungeon in DMs to move forward')
                
                                    let rejectEmbed = new MessageEmbed()
                                    .setColor('RED')
                                    .setTitle('RETREAT')
                                    .setDescription('You decided to retreat!')
                                    
                                
                                await interaction.reply({content: null,embeds:[dungeonEmbed],components:[btnraw],files:[attachment]})
                                let filter = i => i.user.id === authorId
                                    let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 300})
                            
                                    collector.on('collect',async (btn) => {
                                        if(btn.isButton()){
                                            if(btn.customId === "btn_accept"){
                                                await btn.deferUpdate().catch(e => {})
                                                await interaction.editReply({embeds:[acceptEmbed],files:[],components:[d_btnraw]})
                                                foundUser.dungeon.status = true
                                                foundUser.dungeon.name = "Aqua Canals"
                                                foundUser.dungeon.step = 1 
                                                await profileModel.updateOne({userID:authorId},{dungeon:foundUser.dungeon})
                                                interaction.user.send(`You are now inside a dungeon!\npress /proceeddungeon to move forward`)
            
                                                
                                           
                                            collector.stop()
                                                
                                            }
                                            else if(btn.customId === "btn_reject"){
                                                await btn.deferUpdate().catch(e => {})
                                                await interaction.editReply({embeds:[rejectEmbed],components:[]})
        
                                            
            
                                                collector.stop()
                                            }
  
                                        }
                                    })
                                       
                        
                    }
                    else{
                        await interaction.reply({content:`You are not in an explorable location!`,ephemeral:true})
                    }
                }
                else if(location == "None"){
                const attachment = new MessageAttachment('assets/Zorya/zorya_main.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Now Exploring ${city_town}...`)
                .setImage('attachment://zorya_main.jpg')
                .setDescription(`As you explore the Stateship of Zorya, your senses are dazzled by a symphony of modernity. Copper-hued buildings rise majestically, adorned with intricate astrolabes that catch the sunlight, casting a mesmerizing glow. The city pulsates with energy as bustling streets and vibrant markets beckon you to indulge in their wares. High above, airships grace the sky, their sleek forms sailing amidst the clouds, a testament to human ingenuity and adventure. In the Stateship of Zorya, the fusion of progress and innovation embraces you, inviting you to revel in the marvels of this thriving metropolis.\n\nuse **/explore** to explore this location`)
                await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
            
                    }

                    else{
                        await interaction.reply({content:`You are not in an explorable location!`,ephemeral:true})
                    }
                }
                else if(city_town == "Zephyr Mountain"){
                const attachment = new MessageAttachment('assets/Zorya/zephyr_mountain.jpg')
                let embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Now Exploring ${city_town}...`)
                .setImage('attachment://zephyr_mountain.jpg')
                .setDescription(`As you embark on the journey to explore Zephyr Mountain, a sense of awe washes over you. The air grows crisper, and the surroundings transform into a realm of rugged beauty. Towering cliffs and cascading waterfalls paint a breathtaking backdrop, while the distant echo of wind whispers tales of ancient secrets. With each step, the terrain becomes more challenging, urging you to push beyond your limits. Yet, as you ascend the mountain's slopes, a sense of accomplishment fills your being, knowing that you are conquering nature's formidable playground. From the summit, you witness a panorama of majestic landscapes, a testament to the boundless wonders that await those who dare to venture into the heart of Zephyr Mountain.`)
                await interaction.reply({embeds:[embed],components:[],files:[attachment]})
        
                }
                else if(city_town == "Sunstone Mines"){
                const attachment = new MessageAttachment('assets/Zorya/sunstone_mines.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Now Exploring ${city_town}...`)
                .setImage('attachment://sunstone_mines.jpg')
                .setDescription(` As you descend into the depths of the Sunstone Mines, a captivating spectacle unfolds before your eyes. The air hums with anticipation as workers skillfully extract the precious Sunstone, its ethereal glow casting an otherworldly radiance upon the cavernous walls. Each step reveals the intricate web of tunnels, alive with the industrious activity that powers the Kingdom of Solarstrio. The mesmerizing beauty of the Sunstone and the sheer magnitude of its importance in fueling progress fill you with a sense of awe and wonder. In the Sunstone Mines, you witness the heartbeat of a kingdom, where the harmony of natural beauty and technological innovation intertwine to shape the future.`)
                await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
            
                }
                else if(city_town == "Dragon's Den"){
                
                    const pick = weightedRandom(["flora","monster"],[0.3,0.7])

                    if(pick == "flora"){
                        await interaction.reply({ content: '\u200b', components: [] })
                        const flora = (await getRandomFlora(city_town))
                        let floraEmbed = new MessageEmbed()
                            .setColor('GREEN')
                            .setTitle('ENCOUNTER')
                            .addFields([
                                {
                                    name: `Description:`,
                                    value:`${flora.description}`
                                }
                            ])
                            .setDescription(`You found a ${flora.fake_name}\n${flora.name} X ${flora.quantity} has been added to inventory!`)
                        await interaction.editReply({embeds:[floraEmbed],files:[]})
                        inventory.findOne({userID:interaction.user.id},async function(err,foundUser){
                            if(err){
                                console.log(err);
                                
                            }
                            else{
                                const foundItem = foundUser.inventory.items.find(item => item.name.name === flora.name)
                                if (foundItem){
                
                                    foundItem.quantity+=flora.quantity
                                }
                                else{
                                    const newItem = {
                                        name:flora,
                                        description:flora.description,
                                        quantity:Number(flora.quantity)
                                    }
                                    foundUser.inventory.items.push(newItem)
                                }
                                await inventory.updateOne({userID:authorId},foundUser)
                            }
                            
                        })
                    }
                    else if(pick == "monster"){
                    
                    
                       
                            await interaction.reply({ content: '\u200b', components: [] })
                            const monster = (await getRandomMonster(city_town))
                            
    
                            
                            foundUser.encounter = []
                           
                       
                            let btnraw= new MessageActionRow().addComponents([
                                new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Fight"),
                                new MessageButton().setCustomId("btn_reject").setStyle("DANGER").setLabel("Run"),])
    
                                let d_btnraw = new MessageActionRow().addComponents([
                                    new MessageButton().setCustomId("dbtn_accept").setStyle("PRIMARY").setLabel("Fight").setDisabled(true),
                                    new MessageButton().setCustomId("dbtn_reject").setStyle("DANGER").setLabel("Run").setDisabled(true),
                                ])
    
                                
                                const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                                let fightEmbed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('ENCOUNTER')
                                .setImage('attachment://' + monster.fileName)
                                .setDescription(`🔎 you found a ${monster.name}!\n\nDescription:${monster.description}`)
        
                            let acceptEmbed = new MessageEmbed()
                            .setColor('GREEN')
                            .setTitle('ACCEPTED')
                            .setDescription('You have decided to fight!\ncheck your private message')
        
                            let rejectEmbed = new MessageEmbed()
                            .setColor('RED')
                            .setTitle('RAN AWAY')
                            .setDescription('You ran away!')
                            
                        
                        await interaction.editReply({content: null,embeds:[fightEmbed],components:[btnraw],files:[attachment]})
                        let filter = i => i.user.id === authorId
                            let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                    
                            collector.on('collect',async (btn) => {
                                if(btn.isButton()){
                                    if(btn.customId === "btn_accept"){
                                        await btn.deferUpdate().catch(e => {})
                                        await interaction.editReply({embeds:[acceptEmbed],files:[]})
                                        const encounter = {
                                            name: monster.name,
                                            time : Date.now(),
                                            location:foundUser.city_town
    
                                        }
                                        
                                        foundUser.encounter.push(encounter)
                                        await profileModel.updateOne({userID:authorId},{encounter:foundUser.encounter})
                                        interaction.user.send(`Use /fight to begin encounter`).catch(e => {interaction.editReply({content:`It seems your DMs are disabled! kindly turn them on to access the combat feature of Fable.`})})
    
                                        
                                   
                                    collector.stop()
                                        
                                    }
                                    else if(btn.customId === "btn_reject"){
                                        await btn.deferUpdate().catch(e => {})
                                        await interaction.editReply({embeds:[rejectEmbed],components:[],files:[]})
                                         foundUser.encounter = []
                                    
                                        await profileModel.updateOne({userID:authorId},foundUser)
    
                                        collector.stop()
                                    }
    
                                    
                                    
                                }
                                  
                    
                       
                       
                        })
    
                        collector.on('end', () => {
                            interaction.editReply({components: [d_btnraw]})
                        })
    
                            
                       
                    }
                }
                else if(city_town == "Orld Tree Husk"){
                const attachment = new MessageAttachment('assets/Zorya/orld_husk.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Now Exploring ${city_town}...`)
                .setImage('attachment://orld_husk.jpg')
                .setDescription(`you visited ${location},The Husk of the ancient Orld Tree`)
                await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
            
                }
                else if(city_town == "Werfall"){
                    await interaction.reply({content:`You are not in an explorable location!`,ephemeral:true})
                }
                else if(city_town == "Vigia"){
                if(location == "None"){
               const attachment = new MessageAttachment('assets/Vigia/vigia_main.jpg')
               let successembed = new MessageEmbed()
               .setColor('RANDOM')
               .setTitle(`Now Exploring ${city_town}...`)
               .setImage('attachment://vigia_main.jpg')
               .setDescription(`As you wander through the charming streets of Aube Town, a sense of serenity embraces you. The warm glow of the rising sun bathes the quaint buildings, casting long shadows that dance upon the cobblestones. The town awakens with a gentle buzz of activity, as locals exchange friendly greetings and prepare for the day ahead. From the inviting aroma of freshly baked goods wafting from the local dairy to the cheerful chatter echoing from the town center, every corner reveals the tight-knit community that thrives in this idyllic haven. In Aube Town, you feel a sense of belonging and discover the simple joys of life in a place where the dawn brings not just a new day, but a promise of camaraderie and the embrace of a vibrant community.`)
               await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
           
                   }
                   
                   else{
                    await interaction.reply({content:`You are not in an explorable location!`,ephemeral:true})
                    }

               }
               else if(city_town == "Deathrust Forest"){
                const attachment = new MessageAttachment('assets/Vigia/deathrust.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Now Exploring ${city_town}...`)
                .setImage('attachment://deathrust.jpg')
                .setDescription(`As you venture into DeathRust Forest, a group of solemn Sol Crusaders halts you in your tracks. Their eyes carry a weight of caution as they emphasize the peril ahead – the relentless Ferromites and the rust that transforms the unwary. With a grave tone, they stress that you, with your current strength, aren't equipped to face the impending danger. Their warning echoes in the stillness, underscoring the stark reality that proceeding further may lead to a fate you're not strong enough to defy.`)
                await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
            
                }
               else if(city_town == "Asche Peak"){
                
                const pick = weightedRandom(["flora","monster"],[0.4,0.6])

                if(pick == "flora"){
                    await interaction.reply({ content: '\u200b', components: [] })
                    const flora = (await getRandomFlora(city_town))
                    let floraEmbed = new MessageEmbed()
                        .setColor('GREEN')
                        .setTitle('ENCOUNTER')
                        .addFields([
                            {
                                name: `Description:`,
                                value:`${flora.description}`
                            }
                        ])
                        .setDescription(`You found a ${flora.fake_name}\n${flora.name} X ${flora.quantity} has been added to inventory!`)
                    await interaction.editReply({embeds:[floraEmbed],files:[]})
                    inventory.findOne({userID:interaction.user.id},async function(err,foundUser){
                        if(err){
                            console.log(err);
                            
                        }
                        else{
                            const foundItem = foundUser.inventory.items.find(item => item.name.name === flora.name)
                            if (foundItem){
            
                                foundItem.quantity+=flora.quantity
                            }
                            else{
                                const newItem = {
                                    name:flora,
                                    description:flora.description,
                                    quantity:Number(flora.quantity)
                                }
                                foundUser.inventory.items.push(newItem)
                            }
                            await inventory.updateOne({userID:authorId},foundUser)
                        }
                        
                    })
                }
                else if(pick == "monster"){
                
                
                   
                        await interaction.reply({ content: '\u200b', components: [] })
                        const monster = (await getRandomMonster(city_town))
                        

                        
                        foundUser.encounter = []
                       
                   
                        let btnraw= new MessageActionRow().addComponents([
                            new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Fight"),
                            new MessageButton().setCustomId("btn_reject").setStyle("DANGER").setLabel("Run"),])

                            let d_btnraw = new MessageActionRow().addComponents([
                                new MessageButton().setCustomId("dbtn_accept").setStyle("PRIMARY").setLabel("Fight").setDisabled(true),
                                new MessageButton().setCustomId("dbtn_reject").setStyle("DANGER").setLabel("Run").setDisabled(true),
                            ])

                            
                            const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                            let fightEmbed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('ENCOUNTER')
                            .setImage('attachment://' + monster.fileName)
                            .setDescription(`🔎 you found a ${monster.name}!\n\nDescription:${monster.description}`)
    
                        let acceptEmbed = new MessageEmbed()
                        .setColor('GREEN')
                        .setTitle('ACCEPTED')
                        .setDescription('You have decided to fight!\ncheck your private message')
    
                        let rejectEmbed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('RAN AWAY')
                        .setDescription('You ran away!')
                        
                    
                    await interaction.editReply({content: null,embeds:[fightEmbed],components:[btnraw],files:[attachment]})
                    let filter = i => i.user.id === authorId
                        let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                
                        collector.on('collect',async (btn) => {
                            if(btn.isButton()){
                                if(btn.customId === "btn_accept"){
                                    await btn.deferUpdate().catch(e => {})
                                    await interaction.editReply({embeds:[acceptEmbed],files:[]})
                                    const encounter = {
                                        name: monster.name,
                                        time : Date.now(),
                                        location:foundUser.city_town

                                    }
                                    
                                    foundUser.encounter.push(encounter)
                                    await profileModel.updateOne({userID:authorId},{encounter:foundUser.encounter})
                                    interaction.user.send(`Use /fight to begin encounter`).catch(e => {interaction.editReply({content:`It seems your DMs are disabled! kindly turn them on to access the combat feature of Fable.`})})

                                    
                               
                                collector.stop()
                                    
                                }
                                else if(btn.customId === "btn_reject"){
                                    await btn.deferUpdate().catch(e => {})
                                    await interaction.editReply({embeds:[rejectEmbed],components:[],files:[]})
                                     foundUser.encounter = []
                                
                                    await profileModel.updateOne({userID:authorId},foundUser)

                                    collector.stop()
                                }

                                
                                
                            }
                              
                
                   
                   
                    })

                    collector.on('end', () => {
                        interaction.editReply({components: [d_btnraw]})
                    })

                        
                   
                }
            }

            else if(city_town == "Kafig"){
                if(location == "None"){
               const attachment = new MessageAttachment('assets/Kafig/kafig_main.jpg')
               let successembed = new MessageEmbed()
               .setColor('RANDOM')
               .setTitle(`Now Exploring ${city_town}...`)
               .setImage('attachment://kafig_main.jpg')
               .setDescription(`
               As you explore Kafig, the welcoming townsfolk gently guide you, sharing tales of the Avian Spyriths and advising against venturing too close to the hostile yet Holy, Asche Peak. They emphasize the importance of respect for Radohn, the legendary bird ruler. While the atmosphere is warm and inviting, a subtle caution lingers, suggesting that the heart of Kafig's charm lies in embracing its legends and traditions rather than wandering into the unknown.`)
               await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
           
                   }
                  
                   else{
                    await interaction.reply({content:`You are not in an explorable location!`,ephemeral:true})
                    }

               }
                
            }
          
                
                
                

                
    
            
            
           }
            
         
        })

        
        
            }

            else {
                await interaction.reply({content:"It seems you are not awakened yet!\n```use /awaken to begin your Fable```",ephemeral:true})
                }
            }
        })
       
    }
)

async function monstersDropdown(location:String) {
    const monsters = await getMonsters(location)

    return new MessageActionRow().addComponents(
        new MessageSelectMenu()
            .setCustomId('select-menu__monsters')
            .setPlaceholder('Select a monster')
            .addOptions(
                monsters.map(m => ({
                    label: m.name,
                    value: m.name,
                }))
            )
    )
}




