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
                    else if(location == 'Town Centre'){
                        const attachment = new MessageAttachment('assets/AubeTown/Town_Centre.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setImage('attachment://Town_Centre.jpg')
                        .setTitle(`Exploring ${location}...`)
                        .setDescription(`As you walk around the town center of Aube, a whimsical world unfolds before your eyes. Vibrant market stalls adorned with colorful banners beckon you closer, while the air buzzes with laughter and music, as the tightly-knit community of residents and travelers alike gather joyfully to partake in enchanting events and lively festivals.`)
                        await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Aube Town Guild Outpost'){
                        const attachment = new MessageAttachment('assets/AubeTown/Aube_outpost.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setImage('attachment://Aube_outpost.jpg')
                        .setTitle(`Exploring ${location}...`)
                        .setDescription(`As your gaze lands upon the Guild Outpost nestled in Aube Town, you witness a bustling hub where Guild Rangers diligently assist the locals, providing support in tasks and safeguarding them from both mythical creatures and nefarious bandits with unwavering dedication.`)
                        await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == `Crofter's Market`){
                        const attachment = new MessageAttachment('assets/AubeTown/Crofters_Market.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(`Exploring ${location}...`)
                        .setImage('attachment://Crofters_Market.jpg')
                        .setDescription(`You step into the lively market of Aube, immersing yourself in a whirlwind of sights and sounds. The air is filled with the scent of exotic spices, echoing laughter, and the clinking of coins. Crofters proudly display their diverse array of goods, from gleaming weapons to intricate suits of armor, each telling a tale of craftsmanship and adventure. It's a bustling hub of vibrant colors, where the spirit of commerce dances in the air, captivating your senses and igniting your imagination.`)
                        await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == `The Lager Estate`){
                        const attachment = new MessageAttachment('assets/AubeTown/Lager_Estate.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(`Exploring ${location}...`)
                        .setImage('attachment://Lager_Estate.jpg')
                        .setDescription(`As you venture into the hallowed grounds of the Lager Estate, the air becomes infused with a symphony of aromatic delights. The Lager family's brewers, steeped in tradition, meticulously brew the legendary "Backbreaker Beer" using Solarcorn, infusing it with the essence of the sun. The estate exudes an aura of mastery and craftsmanship, captivating your senses with tantalizing scents and promising an unforgettable journey into the world of exquisite flavors.`)
                        await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == `The Terrific Troll Tavern`){
                        const attachment = new MessageAttachment('assets/AubeTown/Terrific_Troll_Tavern.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(`Exploring ${location}...`)
                        .setImage('attachment://Terrific_Troll_Tavern.jpg')
                        .setDescription(`You step through the entrance of the Terrific Troll Tavern, instantly enveloped in a warm embrace of camaraderie and understanding. The air is thick with laughter and whispers of shared stories, as patrons from all walks of life gather to find respite from their burdens. The flickering candlelight dances upon the worn wooden tables, casting a comforting glow that seems to invite confessions and healing. In this haven of solace, you find yourself welcomed into a community where vulnerability is celebrated and burdens are lightened through the power of shared experiences.`)
                        await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else{
                        await interaction.reply({content:`you are not in a particular location!`,ephemeral:true})
                     }

                }
                
                else if(city_town == "Zorya"){
                    if(location == 'Guild District'){
                        const attachment = new MessageAttachment('assets/Zorya/guild_district.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(`Now Exploring ${location}...`)
                        .setImage('attachment://guild_district.jpg')
                        .setDescription(`As you wander through the Guild District of the Stateship of Zorya, the air crackles with an electrifying energy. The streets are alive with the bustling branches of diverse guilds, each one a gateway to a world of specialized skills and knowledge. Guild rangers, with unwavering dedication, traverse these thoroughfares, their presence a testament to their commitment to protecting the common-folk and venturing into the depths of danger. Amidst this vibrant tapestry, you find yourself drawn towards the grand Colosseum at the heart of the district, where roads converge and stories unfold. In the Guild District, a realm of expertise and bravery intertwines, igniting your curiosity and fueling your imagination.`)
                        await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Guild Office'){
                        const attachment = new MessageAttachment('assets/Zorya/guild_office.jpg')
                        let successembed
                        if(foundUser.guild == "None"){
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle(`Now Exploring ${location}...`)
                            .setImage('attachment://guild_office.jpg')
                            .setDescription(`You visited a random ${location} but were restricted entry by the Guards\n\nuse **/explore** to explore this location`)
                             
                        }
                        else{
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle(`Now Exploring ${location}...`)
                            .setImage('attachment://guild_office.jpg')
                            .setDescription(`As you step into the guild office, you are greeted by a bustling hub of activity. Rangers and Guild Officers are scattered about, engaged in various tasks. The walls are adorned with notice boards displaying quests of different difficulties, their parchment edges curling with age. The air is filled with a mix of excitement and anticipation, as Rangers gather around the quest board, discussing potential missions. Guild officers can be seen diligently managing appointments, answering inquiries, and ensuring the smooth operation of the guild. The office exudes a sense of purpose and opportunity, with the promise of adventure awaiting those who are ready to take on the challenges that lie ahead.\n\nuse **/explore** to explore this location`)
                             
                        }
                        await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == `Auriga Sails Company`){
                        const attachment = new MessageAttachment('assets/Zorya/auriga_company.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(`Now Exploring ${location}...`)
                        .setImage('attachment://auriga_company.jpg')
                        .setDescription(`As you enter the Auriga Sails Company, the air crackles with the scent of timber and the symphony of skilled craftsmanship. The workshop is a hive of activity, with master shipwrights meticulously shaping the sturdiest airships ever known to grace the skies. Your eyes widen in awe as you witness their artistry, knowing that their expertise has given birth to the legendary Golden Dutchman Fleet—the world's largest fleet of merchant ships, each owned by the wealthiest of merchant families. In this realm of nautical marvels, you become immersed in a world where dreams take flight and the boundless horizons of adventure beckon.`)
                        await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Astro Avenue'){
                        const attachment = new MessageAttachment('assets/Zorya/astro_avenue.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(`Now Exploring ${location}...`)
                        .setImage('attachment://astro_avenue.jpg')
                        .setDescription(`As you stroll down the bustling Astro Avenue, a symphony of colors and melodies fills the air. Vibrant storefronts adorned with whimsical displays compete for your attention, while street performers captivate with their dazzling acts. The aroma of delectable treats wafts through the lively crowd, tempting your taste buds. Everywhere you turn, there's a new delight to discover, making each step along Astro Avenue a thrilling adventure.`)
                        await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Golden Terminal'){
                        const attachment = new MessageAttachment('assets/Zorya/golden_terminal.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(`Now Exploring ${location}...`)
                        .setImage('attachment://golden_terminal.jpg')
                        .setDescription(` As you step into the Golden Terminal, the gleam of copper architecture surrounds you, casting a warm and inviting glow. The air hums with anticipation as crowds of citizens and travelers converge, their eyes filled with wanderlust. The bustling atmosphere embraces you, echoing the excitement of those embarking on new adventures. Your gaze is drawn to the majestic Steam Train, standing proud on the platform, its billowing plumes of steam whispering tales of distant lands. In this vibrant hub of exploration, you become a part of a tapestry of dreams, ready to embark on a journey that will weave unforgettable memories into the fabric of your soul.`)
                        await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Castle Luminar'){
                        const attachment = new MessageAttachment('assets/Zorya/castle_chariots.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(`Now Exploring ${location}...`)
                        .setImage('attachment://castle_chariots.jpg')
                        .setDescription(`As you step into the grand Castle Luminar, a sense of awe washes over you. The halls echo with whispers of history, and every corner is adorned with regal splendor. You find yourself captivated by the intricate tapestries and the ornate craftsmanship that adorns the walls. The air is filled with an air of authority and purpose, a testament to Earl Auriga's vigilant guardianship over the state. In this fortress of power and grace, you walk in the footsteps of legends, feeling a deep reverence for the responsibilities and secrets held within these ancient walls.`)
                        await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Sun Archives'){
                        const attachment = new MessageAttachment('assets/Zorya/sun_archives.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(`Now Exploring ${location}...`)
                        .setImage('attachment://sun_archives.jpg')
                        .setDescription(`As you wander deeper into the archives, you discover scholars and researchers engrossed in their studies, pouring over intricate diagrams and handwritten manuscripts. The atmosphere is one of quiet intensity, with the occasional hushed conversation and the gentle rustling of pages. Each shelf seems to hold secrets waiting to be unlocked, and the sheer breadth of knowledge is awe-inspiring.`)
                        await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Cloud Gardens'){
                        const attachment = new MessageAttachment('assets/Zorya/cloud_gardens.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(`Now Exploring ${location}...`)
                        .setImage('attachment://cloud_gardens.jpg')
                        .setDescription(`Moving on to the Cloud Gardens, you find yourself entering a realm of enchantment and tranquility. The air is filled with a delicate mist, created by the gentle release of steam from ornate fountains. Lush greenery surrounds you, with vibrant flowers and exotic plants that seem to defy gravity, suspended in mid-air by intricate gears and pulleys. Their petals shimmer with vivid hues, casting a magical ambiance.`)
                        await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Siewelle Port'){
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
                        const attachment = new MessageAttachment('assets/Zorya/siewelle_port.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(`Now Exploring ${location}...`)
                        .setImage('attachment://siewelle_port.jpg')
                        .setDescription(`As you step into the vibrant Siewelle Port, the symphony of maritime activity envelops you. The air is thick with the scent of saltwater and the sound of creaking ships. Your gaze dances from one pier to another, captivated by the bustling docks and the constant flow of goods being loaded and unloaded. The colossal sea gates stand like silent guardians, their imposing presence a testament to the port's significance. The air is filled with a sense of adventure and possibility as you envision the far-reaching destinations these ships will embark upon. In the Siewelle Port, you become a part of the bustling trade and seafaring dreams, igniting your own wanderlust and stoking the fires of your imagination.\n\n**This is a shop location, press /shop to access shop**`)
                        await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                    }
                }
                
                    else if(location == 'Black Market'){
                        const attachment = new MessageAttachment('assets/Zorya/black_market.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(`Now Exploring ${location}...`)
                        .setImage('attachment://black_market.jpg')
                        .setDescription(`As you venture into the concealed depths of the Black Market, a shroud of secrecy envelops you. Dimly lit stalls line the labyrinthine corridors, revealing a treasure trove of forbidden wonders. The air crackles with whispered negotiations and the scent of intrigue. Your heart races as you feast your eyes on rare artifacts and experimental weapons, each whispering tales of untold power and peril. In this clandestine realm, the allure of the forbidden intertwines with the thrill of the unknown, beckoning you to immerse yourself in a world where shadows hold hidden treasures and the line between legality and chaos blurs.`)
                        await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
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
                    if(location == "None"){
                        const attachment = new MessageAttachment('assets/Werfall/werfall_main.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Now Exploring ${city_town}...`)
                .setImage('attachment://werfall_main.jpg')
                .setDescription(`Venturing deeper into Werfall, You were met with a disheartening tableau. Tents, both orderly and makeshift, formed a sprawling encampment that seemed to stretch endlessly, filled with rangers and medics going about their grim duties. The air was tinged with an unsettling mixture of determination and resignation, as those who remained struggled to grapple with the insurmountable challenges before them. The remnants of what once was a thriving community were now akin to the pervasive undercurrent of death and insanity that had claimed many of their own. It was a haunting reminder of the fragile nature of existence, as well as a testament to the unyielding resolve of those who continued to fight against the darkness that had befallen the once-prosperous township.`)
                await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                    }

                    else if(location == "Ranger Tents"){
                const attachment = new MessageAttachment('assets/Werfall/ranger_tents.jpeg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Now Exploring ${location}...`)
                .setImage('attachment://ranger_tents.jpeg')
                .setDescription(`As you navigate the ruins of Werfall, you come across the Ranger Tents. These makeshift shelters, adorned with the emblem of the "Emperal Brigade," stand as a testament to the determination and struggle of those who have sought refuge here. The lanterns cast a dim, almost ethereal glow, revealing the faces of weary but resolute Rangers huddled around tables strewn with maps and documents. The air is thick with a mixture of weariness and dedication, as the Rangers press on in their mission amidst the backdrop of devastation.`)
                await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == "Werfall Ranger Centre"){
                        const attachment = new MessageAttachment('assets/Werfall/ranger_centre.jpeg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(`Now Exploring ${location}...`)
                        .setImage('attachment://ranger_centre.jpeg')
                        .setDescription(` In the heart of the fallen town, your gaze lands upon the Werfall Ranger Centre. Once a hub of bustling activity, it now stands as a resilient bastion amid the chaos. The sturdy stone walls bear scars of past battles, a visual record of the determination of those who defend the town. Stepping inside, the mingling scents of herbs, antiseptics, ink, and parchment create an atmosphere of both healing and strategy. Rangers move purposefully, their conversations hushed yet intense, while medics tend to wounded comrades with practiced care. The centre emanates a steadfast resolve, a beacon of hope against the pervasive shadow of despair.`)
                        await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                            }
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
                   else if(location == 'Trinity Plateau'){
                       const attachment = new MessageAttachment('assets/AubeTown/Town_Centre.jpg')
                       let successembed = new MessageEmbed()
                       .setColor('RANDOM')
                       .setImage('attachment://Town_Centre.jpg')
                       .setTitle(`Exploring ${location}...`)
                       .setDescription(`Hiking up the windswept Trinity Plateau, you behold the weathered swords jutting from the earth, marking the alliance that ended Eldorath's bloodshed. Placing a hand on each sword, you can feel the fading enchantments pulsing within, hinting at the awesome power these chieftains wielded. Looking out across the plateau, you picture the climactic battle, giants clashing with earth-shaking force until united against true darkness.`)
                       await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                   }
                   else if(location == 'Temple of Tears '){
                       const attachment = new MessageAttachment('assets/AubeTown/Aube_outpost.jpg')
                       let successembed = new MessageEmbed()
                       .setColor('RANDOM')
                       .setImage('attachment://Aube_outpost.jpg')
                       .setTitle(`Exploring ${location}...`)
                       .setDescription(`Approaching the carved visage of Morozh, you watch rivulets of water stream from the statue's eyes and mouth. Entering the dim temple, flickering candles cast dancing shadows on the walls. Kneeling before the weeping likeness, you close your eyes and let droplets fall on your face, cleansing away sadness and despair. Rising renewed, you leave offerings of flowers and coins for the god who bleeds anguish itself.`)
                       await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                   }
                   else if(location == `Esparta Museum`){
                       const attachment = new MessageAttachment('assets/AubeTown/Crofters_Market.jpg')
                       let successembed = new MessageEmbed()
                       .setColor('RANDOM')
                       .setTitle(`Exploring ${location}...`)
                       .setImage('attachment://Crofters_Market.jpg')
                       .setDescription(`Stepping into the hallowed Esparta Museum, you marvel at the greatest trove of artifacts in the kingdom. Priceless relics sit encased in glass as you wander wide-eyed through the vast halls. Strange mechanical objects whir and click as if from another world. Lifelike statues depict ancient heroes and monsters long turned to dust.`)
                       await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                   }
                   else if(location == `Sol Barracks`){
                       const attachment = new MessageAttachment('assets/AubeTown/Lager_Estate.jpg')
                       let successembed = new MessageEmbed()
                       .setColor('RANDOM')
                       .setTitle(`Exploring ${location}...`)
                       .setImage('attachment://Lager_Estate.jpg')
                       .setDescription(`The smell of oil and ringing of hammers on steel greet you in the Sol Crusaders' barracks. Weapon racks brim with meticulously maintained arms of every shape and size. Testing the weight of a mythril axe, you know no better equipped force guards the kingdom. In the dining hall, boisterous knights regale you with bawdy tales between bites of roasted game. Though weary from ceaseless vigilance, their spirits remain unbroken in brotherhood.`)
                       await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                   }
                   else if(location == `Fort Primis`){
                       const attachment = new MessageAttachment('assets/AubeTown/Terrific_Troll_Tavern.jpg')
                       let successembed = new MessageEmbed()
                       .setColor('RANDOM')
                       .setTitle(`Exploring ${location}...`)
                       .setImage('attachment://Terrific_Troll_Tavern.jpg')
                       .setDescription(`As you enter the headquarters of the legendary Sol Crusaders, you are greeted by the sight of grizzled soldiers in glinting armor marching in formation. The clanging of swords and axes on whetstones echoes through the courtyard as recruits train. You glimpse the imposing Quarantrain station, the armored steam engine that safely transports prisoners, before being ushered through grand wooden doors into the war room. A large map sprawls across the table, markers denoting critical strongholds.`)
                       await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                   }
                   else if(location == `Castle Arcemis`){
                    const attachment = new MessageAttachment('assets/AubeTown/Terrific_Troll_Tavern.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(`Exploring ${location}...`)
                    .setImage('attachment://Terrific_Troll_Tavern.jpg')
                    .setDescription(`Entering Earl Arvid's stately castle, you walk down halls lined with woven tapestries recounting Vigia's rich history. The throne room inspires awe with its soaring marble pillars and stained glass casting rainbow prisms on the floor. As you bow before the Earl, his piercing eyes regard you shrewdly as you understand the weight of responsibility on one man's shoulders to protect this city from those who would destroy it.`)
                    await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == `Ruins of Eldorath`){
                    const attachment = new MessageAttachment('assets/AubeTown/Terrific_Troll_Tavern.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(`Exploring ${location}...`)
                    .setImage('attachment://Terrific_Troll_Tavern.jpg')
                    .setDescription(`The crumbling ruins of the lost city of Eldorath speak of past glory and knowledge vanished from memory. Wandering the abandoned streets, you trace carved runes and murals worn by time, grasping to reconstruct a forgotten language. Deep in the ruins, intricate carvings lie undisturbed, daring intrepid explorers to unravel its secrets. What wonders and perils still remain hidden in this city lost to history?`)
                    await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == `Vigia Ranger Centre`){
                    const attachment = new MessageAttachment('assets/AubeTown/Terrific_Troll_Tavern.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(`Exploring ${location}...`)
                    .setImage('attachment://Terrific_Troll_Tavern.jpg')
                    .setDescription(`As you push open the large oaken doors, you find yourself standing at the threshold of a bustling hub of Ranger activity. Before you, an expansive training yard fills with the sounds of steel on steel as warriors and rogues spar under the watchful eye of stern combat instructors. To your left, a library stacks towering with tomes of war, history and arcana sees scholars and sages deep in study. Ahead, the canteen buzzes with lively tales from the road told over flagons of ale around its many fireplaces and tables. A web of staircases leads up and around the perimeter, beyond which you glimpse lodgings, enchanting rooms and more.`)
                    await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                }
                   else{
                       await interaction.reply({content:`you are not in a particular location!`,ephemeral:true})
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
                   else if(location == 'Avian Square'){
                       const attachment = new MessageAttachment('assets/AubeTown/Town_Centre.jpg')
                       let successembed = new MessageEmbed()
                       .setColor('RANDOM')
                       .setImage('attachment://Town_Centre.jpg')
                       .setTitle(`Exploring ${location}...`)
                       .setDescription(`As you venture deeper into Avian Square, you discover vibrant market stalls selling an array of goods related to magical flying beasts. The air is alive with the sounds of chirping birds and the scent of freshly bloomed flowers. The atmosphere is filled with reverence and excitement, as people gather to share tales and knowledge about avians and their connection to Radohn.`)
                       await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                   }
                   else if(location == 'Cloud Haven'){
                       const attachment = new MessageAttachment('assets/AubeTown/Aube_outpost.jpg')
                       let successembed = new MessageEmbed()
                       .setColor('RANDOM')
                       .setImage('attachment://Aube_outpost.jpg')
                       .setTitle(`Exploring ${location}...`)
                       .setDescription(`Stepping inside Cloud Haven, you are greeted by an awe-inspiring sight. The vast interior is divided into individual climate-controlled stables, each tailored to accommodate the needs of specific Spyriths. The spaciousness allows the magnificent creatures to soar and glide freely within their designated areas. Workers diligently attend to the needs of the Spyriths, ensuring their well-being and comfort. The air is filled with a medley of chirps, trills, and the occasional gusts of wind as the Spyriths gracefully navigate the space.`)
                       await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                   }
                   else if(location == `The Gilded Cage`){
                       const attachment = new MessageAttachment('assets/AubeTown/Crofters_Market.jpg')
                       let successembed = new MessageEmbed()
                       .setColor('RANDOM')
                       .setTitle(`Exploring ${location}...`)
                       .setImage('attachment://Crofters_Market.jpg')
                       .setDescription(`As you make your way through the tavern, you notice the walls adorned with paintings depicting avian creatures and the Epic of Orin. The bar is bustling with activity, as rangers and locals mingle, sharing stories and experiences. The bartenders skillfully mix drinks, serving up specialties inspired by the flavors of Kafig. The air is filled with a sense of camaraderie and celebration, creating an atmosphere where bonds are forged and memories are made.`)
                       await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                   }
                   else if(location == `Radohn Roost`){
                       const attachment = new MessageAttachment('assets/AubeTown/Lager_Estate.jpg')
                       let successembed = new MessageEmbed()
                       .setColor('RANDOM')
                       .setTitle(`Exploring ${location}...`)
                       .setImage('attachment://Lager_Estate.jpg')
                       .setDescription(`As you enter Radohn Roost, you find yourself surrounded by a collection of small shrines adorned with intricate carvings and offerings. The main altar, bathed in soft light, holds an eternal flame, symbolizing Radohn's eternal rule over the skies. From here, you are treated to a panoramic view of Kafig below, with its bustling streets and vibrant rooftops, while in the distance, the majestic silhouette of Asche Peak looms. The tranquility of the temple and the sweeping vistas evoke a profound sense of connection with the natural world and the mythical realm of Radohn.`)
                       await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                   }
                else if(location == `Kafig Guild Outpost`){
                    const attachment = new MessageAttachment('assets/AubeTown/Terrific_Troll_Tavern.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(`Exploring ${location}...`)
                    .setImage('attachment://Terrific_Troll_Tavern.jpg')
                    .setDescription(`As you wander through Kafig Guild Outpost, you find a lively place with Rangers and locals chatting and sharing stories. The walls are covered in maps and trophies, telling cool adventure tales. In the middle, there's a busy spot where Rangers make plans and chat. A small desk in the corner has important papers and feathers, showing that it's a place for messages and organizing stuff. The vibe is friendly and busy, and a big picture of the leegndary "Demon Bird" Basil hangs, watching over everything.`)
                    await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                }
                   else{
                       await interaction.reply({content:`you are not in a particular location!`,ephemeral:true})
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




