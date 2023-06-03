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
                const attachment = new MessageAttachment('assets/Zorya/ellior_forest.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Now Exploring ${city_town}...`)
                .setImage('attachment://ellior_forest.jpg')
                .setDescription(`As you venture into the haunting embrace of the Ellior Forest, an unsettling chill creeps up your spine. The dense canopy above casts an oppressive gloom, obscuring the path ahead. Every rustle of leaves and hushed whisper of the wind sends shivers down your spine, as if the very air carries a sense of foreboding. Shadows dance among the gnarled trees, playing tricks on your mind. Every step forward is fraught with trepidation, for within this sinister realm, evil lurks at every corner, and the line between reality and nightmares blurs.`)
                await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                await sleep(2)
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
                            
                        
                        await interaction.editReply({content: null,embeds:[fightEmbed],components:[btnraw],files:[]})
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
                const attachment = new MessageAttachment('assets/AubeTown/Castellan_Fields.jpeg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Now Exploring ${city_town}...`)
                .setImage('attachment://Castellan_Fields.jpeg')
                .setDescription(`You step onto the Castellan Fields, feeling the earth beneath your feet and the gentle breeze whispering through the golden grains. The air is alive with the symphony of hard work as resilient crofters sow seeds and tend to their crops, their determination transforming mere dust into bountiful treasures. In this sea of golden splendor, you become part of a timeless cycle of growth and abundance, where the sweat of the crofters turns the humble soil into infinite prosperity.`)
                await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                await sleep(2)
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
                            
                        
                        await interaction.editReply({content: null,embeds:[fightEmbed],components:[btnraw],files:[]})
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
                const attachment = new MessageAttachment('assets/AubeTown/sunshade_forest.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Now Exploring ${city_town}...`)
                .setImage('attachment://sunshade_forest.jpg')
                .setDescription(`As you step into the Sunshade Forest, an otherworldly hush blankets the air, shrouding the surroundings in an ominous darkness. The drought-tolerant Sunshade Trees loom overhead, their broad silver leaves reflecting scant rays of sunlight, casting a surreal glow. Each step brings a sense of trepidation, for this forest holds secrets and hidden perils. Shadows dance and whispers echo, reminding you to tread cautiously, as the beauty of the Sunshade Forest conceals the lurking dangers that lie within its enigmatic depths.`)
                await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                await sleep(2)
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
                            
                        
                        await interaction.editReply({content: null,embeds:[fightEmbed],components:[btnraw],files:[]})
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
                .setDescription(`As you wander through the charming streets of Aube Town, a sense of serenity embraces you. The warm glow of the rising sun bathes the quaint buildings, casting long shadows that dance upon the cobblestones. The town awakens with a gentle buzz of activity, as locals exchange friendly greetings and prepare for the day ahead. From the inviting aroma of freshly baked goods wafting from the local dairy to the cheerful chatter echoing from the town center, every corner reveals the tight-knit community that thrives in this idyllic haven. In Aube Town, you feel a sense of belonging and discover the simple joys of life in a place where the dawn brings not just a new day, but a promise of camaraderie and the embrace of a vibrant community.`)
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
                        await interaction.reply({content:`you are not in a particular location!`,ephemeral:true})
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
                    else if(location == 'Castle of Chariots'){
                        const attachment = new MessageAttachment('assets/Zorya/castle_chariots.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(`Now Exploring ${location}...`)
                        .setImage('attachment://castle_chariots.jpg')
                        .setDescription(`As you step into the grand Castle of Chariots, a sense of awe washes over you. The halls echo with whispers of history, and every corner is adorned with regal splendor. You find yourself captivated by the intricate tapestries and the ornate craftsmanship that adorns the walls. The air is filled with an air of authority and purpose, a testament to Earl Auriga's vigilant guardianship over the state. In this fortress of power and grace, you walk in the footsteps of legends, feeling a deep reverence for the responsibilities and secrets held within these ancient walls.`)
                        await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Siewelle Port'){
                        const attachment = new MessageAttachment('assets/Zorya/siewelle_port.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(`Now Exploring ${location}...`)
                        .setImage('attachment://siewelle_port.jpg')
                        .setDescription(`As you step into the vibrant Siewelle Port, the symphony of maritime activity envelops you. The air is thick with the scent of saltwater and the sound of creaking ships. Your gaze dances from one pier to another, captivated by the bustling docks and the constant flow of goods being loaded and unloaded. The colossal sea gates stand like silent guardians, their imposing presence a testament to the port's significance. The air is filled with a sense of adventure and possibility as you envision the far-reaching destinations these ships will embark upon. In the Siewelle Port, you become a part of the bustling trade and seafaring dreams, igniting your own wanderlust and stoking the fires of your imagination.`)
                        await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
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
                const attachment = new MessageAttachment('assets/Zorya/dragon_den.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Now Exploring ${city_town}...`)
                .setImage('attachment://dragon_den.jpg')
                .setDescription(`As you cautiously step into the foreboding depths of the Dragon's Den, an ancient presence lingers in the air. The cavernous expanse resonates with a sense of both awe and danger, as if the very walls hold whispered secrets of untold wealth and unspoken perils. Your gaze is drawn to the remnants of a fallen Greater Dragon, its skeletal remains a haunting reminder of the power that once commanded this domain. Every step forward is accompanied by a mix of fascination and unease, as you navigate the treacherous path in search of the legendary treasures rumored to be concealed within. In the Dragon's Den, you become an intrepid explorer, venturing into the heart of the unknown, ready to face the mysteries and dangers that lie in wait.`)

                await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
                await sleep(2)
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
                            
                        
                        await interaction.editReply({content: null,embeds:[fightEmbed],components:[btnraw],files:[]})
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
                    interaction.reply({content:"it seems that you are not an awakened yet!",ephemeral:true})
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




