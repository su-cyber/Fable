import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import { weightedRandom } from '../src/utils'
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
            interaction.reply(`You cannot use this command inside a dungeon!`)
           }
           else{
            const location = foundUser.location
            const city_town = foundUser.city_town
            if(foundUser.kingdom == "solarstrio"){
                if(city_town == "ellior"){
                    await interaction.reply({ content: `searching ${city_town}...`})
                    const pick = weightedRandom(["flora","monster"],[0,1])

                    if(pick == "flora"){
                        await interaction.editReply({ content: '\u200b', components: [] })
                        const flora = (await getRandomFlora(city_town))
                        await interaction.editReply(`you found a ${flora.fake_name}\n${flora.name} X ${flora.quantity} has been added to inventory!`)
    
                        inventory.findOne({userID:interaction.user.id},async function(err,foundUser){
                            if(err){
                                console.log(err);
                                
                            }
                            else{
                                const foundItem = foundUser.inventory.items.find(item => item.name === flora.name)
                                if (foundItem){
                
                                    foundItem.quantity+=flora.quantity
                                }
                                else{
                                    const newItem = {
                                        name:flora.name,
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
                    
                    
                       
                            await interaction.editReply({ content: '\u200b', components: [] })
                            const monster = (await getRandomMonster(city_town))
                            
    
                            
                            foundUser.encounter = []
                           
                       
                            let btnraw= new MessageActionRow().addComponents([
                                new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Fight"),
                                new MessageButton().setCustomId("btn_reject").setStyle("DANGER").setLabel("Run"),])
    
                                let d_btnraw = new MessageActionRow().addComponents([
                                    new MessageButton().setCustomId("dbtn_accept").setStyle("PRIMARY").setLabel("Fight").setDisabled(true),
                                    new MessageButton().setCustomId("dbtn_reject").setStyle("DANGER").setLabel("Run").setDisabled(true),
                                ])
    
                                
                            let fightEmbed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('ENCOUNTER')
                            .setDescription(`🔎 you found a ${monster.name}!\n\nDescription:${monster.description}`)
        
                            let acceptEmbed = new MessageEmbed()
                            .setColor('GREEN')
                            .setTitle('ACCEPTED')
                            .setDescription('You have decided to fight!\ncheck your private message')
        
                            let rejectEmbed = new MessageEmbed()
                            .setColor('RED')
                            .setTitle('RAN AWAY')
                            .setDescription('You ran away!')
                            
                        
                        await interaction.editReply({content: null,embeds:[fightEmbed],components:[btnraw]})
                        let filter = i => i.user.id === authorId
                            let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                    
                            collector.on('collect',async (btn) => {
                                if(btn.isButton()){
                                    if(btn.customId === "btn_accept"){
                                        await btn.deferUpdate().catch(e => {})
                                        await interaction.editReply({embeds:[acceptEmbed]})
                                        const encounter = {
                                            name: monster.name,
                                            time : Date.now(),
                                            location:foundUser.city_town
    
                                        }
                                        
                                        foundUser.encounter.push(encounter)
                                        await profileModel.updateOne({userID:authorId},{encounter:foundUser.encounter})
                                        interaction.user.send(`Use /fight to begin encounter`)
    
                                        
                                   
                                    collector.stop()
                                        
                                    }
                                    else if(btn.customId === "btn_reject"){
                                        await btn.deferUpdate().catch(e => {})
                                        await interaction.editReply({embeds:[rejectEmbed]})
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
                    await interaction.reply({ content: `searching ${city_town}...`})
                    const pick = weightedRandom(["flora","monster"],[0,1])

                    if(pick == "flora"){
                        await interaction.editReply({ content: '\u200b', components: [] })
                        const flora = (await getRandomFlora(city_town))
                        await interaction.editReply(`you found a ${flora.fake_name}\n${flora.name} X ${flora.quantity} has been added to inventory!`)
    
                        inventory.findOne({userID:interaction.user.id},async function(err,foundUser){
                            if(err){
                                console.log(err);
                                
                            }
                            else{
                                const foundItem = foundUser.inventory.items.find(item => item.name === flora.name)
                                if (foundItem){
                
                                    foundItem.quantity+=flora.quantity
                                }
                                else{
                                    const newItem = {
                                        name:flora.name,
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
                    
                    
                       
                            await interaction.editReply({ content: '\u200b', components: [] })
                            const monster = (await getRandomMonster(city_town))
                            
    
                            
                            foundUser.encounter = []
                           
                       
                            let btnraw= new MessageActionRow().addComponents([
                                new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Fight"),
                                new MessageButton().setCustomId("btn_reject").setStyle("DANGER").setLabel("Run"),])
    
                                let d_btnraw = new MessageActionRow().addComponents([
                                    new MessageButton().setCustomId("dbtn_accept").setStyle("PRIMARY").setLabel("Fight").setDisabled(true),
                                    new MessageButton().setCustomId("dbtn_reject").setStyle("DANGER").setLabel("Run").setDisabled(true),
                                ])
    
                                
                            let fightEmbed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('ENCOUNTER')
                            .setDescription(`🔎 you found a ${monster.name}!\nDescription:${monster.description}`)
        
                            let acceptEmbed = new MessageEmbed()
                            .setColor('GREEN')
                            .setTitle('ACCEPTED')
                            .setDescription('You have decided to fight!\ncheck your private message')
        
                            let rejectEmbed = new MessageEmbed()
                            .setColor('RED')
                            .setTitle('RAN AWAY')
                            .setDescription('You ran away!')
                            
                        
                        await interaction.editReply({content: null,embeds:[fightEmbed],components:[btnraw]})
                        let filter = i => i.user.id === authorId
                            let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                    
                            collector.on('collect',async (btn) => {
                                if(btn.isButton()){
                                    if(btn.customId === "btn_accept"){
                                        await btn.deferUpdate().catch(e => {})
                                        await interaction.editReply({embeds:[acceptEmbed]})
                                        const encounter = {
                                            name: monster.name,
                                            time : Date.now(),
                                            location:foundUser.city_town
    
                                        }
                                        
                                        foundUser.encounter.push(encounter)
                                        await profileModel.updateOne({userID:authorId},{encounter:foundUser.encounter})
                                        interaction.user.send(`Use /fight to begin encounter`)
    
                                        
                                   
                                    collector.stop()
                                        
                                    }
                                    else if(btn.customId === "btn_reject"){
                                        await btn.deferUpdate().catch(e => {})
                                        await interaction.editReply({embeds:[rejectEmbed]})
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
                    await interaction.reply({ content: `searching ${city_town}...`})
                    const pick = weightedRandom(["flora","monster"],[0,1])

                    if(pick == "flora"){
                        await interaction.editReply({ content: '\u200b', components: [] })
                        const flora = (await getRandomFlora(city_town))
                        await interaction.editReply(`you found a ${flora.fake_name}\n${flora.name} X ${flora.quantity} has been added to inventory!`)
    
                        inventory.findOne({userID:interaction.user.id},async function(err,foundUser){
                            if(err){
                                console.log(err);
                                
                            }
                            else{
                                const foundItem = foundUser.inventory.items.find(item => item.name === flora.name)
                                if (foundItem){
                
                                    foundItem.quantity+=flora.quantity
                                }
                                else{
                                    const newItem = {
                                        name:flora.name,
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
                    
                    
                       
                            await interaction.editReply({ content: '\u200b', components: [] })
                            const monster = (await getRandomMonster(city_town))
                            
    
                            
                            foundUser.encounter = []
                           
                       
                            let btnraw= new MessageActionRow().addComponents([
                                new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Fight"),
                                new MessageButton().setCustomId("btn_reject").setStyle("DANGER").setLabel("Run"),])
    
                                let d_btnraw = new MessageActionRow().addComponents([
                                    new MessageButton().setCustomId("dbtn_accept").setStyle("PRIMARY").setLabel("Fight").setDisabled(true),
                                    new MessageButton().setCustomId("dbtn_reject").setStyle("DANGER").setLabel("Run").setDisabled(true),
                                ])
    
                                
                            let fightEmbed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('ENCOUNTER')
                            .setDescription(`🔎 you found a ${monster.name}!\nDescription:${monster.description}`)
        
                            let acceptEmbed = new MessageEmbed()
                            .setColor('GREEN')
                            .setTitle('ACCEPTED')
                            .setDescription('You have decided to fight!\ncheck your private message')
        
                            let rejectEmbed = new MessageEmbed()
                            .setColor('RED')
                            .setTitle('RAN AWAY')
                            .setDescription('You ran away!')
                            
                        
                        await interaction.editReply({content: null,embeds:[fightEmbed],components:[btnraw]})
                        let filter = i => i.user.id === authorId
                            let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                    
                            collector.on('collect',async (btn) => {
                                if(btn.isButton()){
                                    if(btn.customId === "btn_accept"){
                                        await btn.deferUpdate().catch(e => {})
                                        await interaction.editReply({embeds:[acceptEmbed]})
                                        const encounter = {
                                            name: monster.name,
                                            time : Date.now(),
                                            location:foundUser.city_town
    
                                        }
                                        
                                        foundUser.encounter.push(encounter)
                                        await profileModel.updateOne({userID:authorId},{encounter:foundUser.encounter})
                                        interaction.user.send(`Use /fight to begin encounter`)
    
                                        
                                   
                                    collector.stop()
                                        
                                    }
                                    else if(btn.customId === "btn_reject"){
                                        await btn.deferUpdate().catch(e => {})
                                        await interaction.editReply({embeds:[rejectEmbed]})
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
                            interaction.reply(`You have already cleared this dungeon!`)
                        }
                        else{
                            let btnraw= new MessageActionRow().addComponents([
                                new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Enter"),
                                new MessageButton().setCustomId("btn_reject").setStyle("DANGER").setLabel("Cancel"),])
        
                                let d_btnraw = new MessageActionRow().addComponents([
                                    new MessageButton().setCustomId("dbtn_accept").setStyle("PRIMARY").setLabel("Enter").setDisabled(true),
                                    new MessageButton().setCustomId("dbtn_reject").setStyle("DANGER").setLabel("Cancel").setDisabled(true),
                                ])
                            let dungeonEmbed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle(`Exploring ${location}...`)
                                    .setDescription(`As you approach the Abandoned Castle, a sense of mystery and melancholy washes over you. Its imposing silhouette stands as a testament to a bygone era, where echoes of battles and whispers of forgotten tales linger in the air. The weathered stones bear the weight of history, each crack and crevice whispering secrets lost to time. The once-majestic architecture now wears a cloak of solitude, the windows like empty eyes that have seen the passage of ages.\n\nYou are about to enter a dungeon!\nDo you wish to proceed?`)
                
                                    let acceptEmbed = new MessageEmbed()
                                    .setColor('GREEN')
                                    .setTitle('ENTERED DUNGEON')
                                    .setDescription('You have decided to enter!\npress /proceeddungeon in DMs to move forward')
                
                                    let rejectEmbed = new MessageEmbed()
                                    .setColor('RED')
                                    .setTitle('RETREAT')
                                    .setDescription('You decided to retreat!')
                                    
                                
                                await interaction.reply({content: null,embeds:[dungeonEmbed],components:[btnraw]})
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
                                                await interaction.editReply({embeds:[rejectEmbed]})
        
                                            
            
                                                collector.stop()
                                            }
            
                                            
                                            
                                        }
                                          
                            
                               
                               
                                })
            
                                collector.on('end', () => {
                                    interaction.editReply({components: [d_btnraw]})
                                })
                        }
                        
                    }
                    else if(location == "None"){
                const attachment = new MessageAttachment('assets/AubeTown/Aube_Town.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Now Exploring ${city_town}...`)
                .setImage('attachment://Aube_Town.jpg')
                .setDescription(`you visited ${location}, The township of aube\n\nuse **/explore** to explore this location`)
                await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
            
                    }
                    else if(location == 'Town Centre'){
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(`Exploring ${location}...`)
                        .setDescription(`As you walk around the town center of Aube, a whimsical world unfolds before your eyes. Vibrant market stalls adorned with colorful banners beckon you closer, while the air buzzes with laughter and music, as the tightly-knit community of residents and travelers alike gather joyfully to partake in enchanting events and lively festivals.`)
                        await interaction.reply({embeds:[successembed],components:[]})
                    }
                    else if(location == 'Aube Town Guild Outpost'){
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(`Exploring ${location}...`)
                        .setDescription(`As your gaze lands upon the Guild Outpost nestled in Aube Town, you witness a bustling hub where Guild Rangers diligently assist the locals, providing support in tasks and safeguarding them from both mythical creatures and nefarious bandits with unwavering dedication.`)
                        await interaction.reply({embeds:[successembed],components:[]})
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
                        await interaction.reply(`you are not in a particular location!`)
                     }

                }
                else if(city_town == "Badlands"){
            
                const attachment = new MessageAttachment('assets/AubeTown/Badlands.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://Badlands.jpg')
                .setDescription(`You venture into the Badlands, where the merciless sun beats down upon your weary shoulders, each step an arduous journey across the treacherous desert expanse. The air is a stifling furnace, the relentless heat mirroring the challenges that await. The land is strewn with rocky outcrops and shifting sands, a harsh reminder of the unforgiving nature of this desolate realm. As you navigate through this wasteland, the secrets of the Badlands whisper in the wind, urging caution and resilience. In this land of extreme adversity, you become a solitary figure, forever humbled by the power and fragility of life.\n\nuse **/explore** to explore this location`)
                await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(city_town == "Zorya"){
                    if(location == 'Guild District'){
                        const attachment = new MessageAttachment('assets/Zorya/guild_district.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(`Now Exploring ${location}...`)
                        .setImage('attachment://guild_district.jpg')
                        .setDescription(`you visited ${location},The home to all guilds and the guild colosseum\n\nuse **/explore** to explore this location`)
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
                            .setDescription(`you visited a random ${location} but were restricted entry by the Guards\n\nuse **/explore** to explore this location`)
                             
                        }
                        else{
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle(`Now Exploring ${location}...`)
                            .setImage('attachment://guild_office.jpg')
                            .setDescription(`you visited ${foundUser.guild}'s ${location}, The main office in Solarstrio\n\nuse **/explore** to explore this location`)
                             
                        }
                        await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == `Auriga Sails Company`){
                        const attachment = new MessageAttachment('assets/Zorya/auriga_company.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(`Now Exploring ${location}...`)
                        .setImage('attachment://auriga_company.jpg')
                        .setDescription(`you visited ${location},the famous Auriga ship company run by earl Auriga\n\nuse **/explore** to explore this location\n\nuse**/shop** to access the shops\nuse **/buy** to buy something\nuse **/sell** to sell something`)
                        await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Astro Avenue'){
                        const attachment = new MessageAttachment('assets/Zorya/astro_avenue.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(`Now Exploring ${location}...`)
                        .setImage('attachment://astro_avenue.jpg')
                        .setDescription(`you visited ${location},home to many foreign goods not found in Solarstrio\n\nuse **/explore** to explore this location`)
                        await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Golden Terminal'){
                        const attachment = new MessageAttachment('assets/Zorya/golden_terminal.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(`Now Exploring ${location}...`)
                        .setImage('attachment://golden_terminal.jpg')
                        .setDescription(`you visited ${location},A famous station for Quarantrain\n\nuse **/explore** to explore this location`)
                        await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Castle of Chariots'){
                        const attachment = new MessageAttachment('assets/Zorya/castle_chariots.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(`Now Exploring ${location}...`)
                        .setImage('attachment://castle_chariots.jpg')
                        .setDescription(`you visited ${location},The stunning castle of Earl Auriga\n\nuse **/explore** to explore this location`)
                        await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Siewelle Port'){
                        const attachment = new MessageAttachment('assets/Zorya/siewelle_port.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(`Now Exploring ${location}...`)
                        .setImage('attachment://siewelle_port.jpg')
                        .setDescription(`you visited ${location},The Port which serves as the main market of Zorya\n\nuse **/explore** to explore this location`)
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
                .setDescription(`you visited ${location},The great mountains of Zephyr range\n\nuse **/explore** to explore this location`)
                await interaction.reply({embeds:[embed],components:[],files:[attachment]})
        
                }
                else if(city_town == "Sunstone Mines"){
                const attachment = new MessageAttachment('assets/Zorya/sunstone_mines.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Now Exploring ${city_town}...`)
                .setImage('attachment://sunstone_mines.jpg')
                .setDescription(`you visited ${location},The minefield where sunstones are mined\n\nuse **/explore** to explore this location`)
                await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
            
                }
                else if(city_town == "Dragon's Den"){
                const attachment = new MessageAttachment('assets/Zorya/dragon_den.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Now Exploring ${city_town}...`)
                .setImage('attachment://dragon_den.jpg')
                .setDescription(`you visited ${location},The den of an ancient Dragon\n\nuse **/explore** to explore this location`)
                await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
            
                }
                else if(city_town == "orld husk"){
                const attachment = new MessageAttachment('assets/Zorya/orld_husk.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Now Exploring ${city_town}...`)
                .setImage('attachment://orld_husk.jpg')
                .setDescription(`you visited ${location},The Husk of the ancient Orld Tree\n\nuse **/explore** to explore this location`)
                await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
            
                }
            }
          
                
                
                

                
    
            
            
           }
            
         
        })

        
        
            }

            else {
                    interaction.reply({content:"it seems that you are not an awakened yet!"})
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





