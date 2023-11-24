import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import {MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, MessageComponentInteraction,CacheType} from 'discord.js'
import { MessageAttachment } from 'discord.js'
import getHealth from '../src/utils/getHealth'


export default new MyCommandSlashBuilder({ name: 'travel', description: 'travel to a place' })

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
                    profileModel.findOne({userID:authorId},async function(err,foundUser) {
                        if(foundUser.main_quest == "Tutorial" && Number(foundUser.main_quest_phase)<7){
                            interaction.reply({content:`You cannot use this command right now! please complete the tutorial`,ephemeral:true})
                        }
                        else{
                            if(foundUser.dungeon.status){
                                interaction.reply({content:`You cannot use this command inside a dungeon!`,ephemeral:true})
                               }
                               else{
                                const kingdom = foundUser.kingdom
                                const city_town = foundUser.city_town
        
                                if(kingdom == "solarstrio"){
                                    if(city_town == "aube"){
                                        let Interiorembed
                                        let Exteriorembed
                                        let mount = "None"
                                        if(mount == "None"){
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT EXTERIOR LOCATION')
                                        .setDescription(`choose a place to travel outside Aube Town`)
                                        .addFields([
                                            {
                                                name: `Castellan Fields`,
                                                value:`**Travelled on Foot**\n**Description**:The famous golden hued fields of Aube.\n**Cost**:0 🪙`
                                            },
                                            {
                                                name: `Sunshade Forest`,
                                                value:`**Travelled on Foot**\n**Description**:a forest outside aube town\n**Cost**:0 🪙`
                                            },
                                            {
                                                name: `The Badlands`,
                                                value:`**Travelled on Foot**\n**Description**: Face the crippling heat, with nothing to find in it.\n**Cost**:0 🪙`
                                            },
                                            {
                                                name: `State of Zorya`,
                                                value:`**Travelled on StageCoach**\n**Description**:One of the largest Stateships in Solarstrio, where progress meets modernity.\n**Cost**:100 🪙`
                                            }
                                        ])
                                        
                                        }
                                        else{
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from Aube Town`)
                                        .addFields([
                                            {
                                                name: `Castellan Fields`,
                                                value:`**Travelled on Spyralink**\n**Description**:The famous golden hued fields of Aube.\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Sunshade Forest`,
                                                value:`**Travelled on Spyralink**\n**Description**:A treacherous place for travelers and explorers alike.\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `The Badlands`,
                                                value:`**Travelled on Spyralink**\n**Description**: Face the crippling heat, with nothing to find in it.\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `State of Zorya`,
                                                value:`**Travelled on Spyralink**\n**Description**:One of the largest Stateships in Solarstrio, where progress meets modernity.a\n**Cost**:0 🪙\n`
                                            }
                                        ])
    
                                        }
                                        
                                   Interiorembed = new MessageEmbed()
                                   .setColor('RANDOM')
                                   .setTitle('SELECT INTERIOR LOCATION')
                                   .setDescription(`Choose a location to visit in ${city_town}`)
                                   .addFields([
                                       {
                                           name: `The Terrific Troll Tavern`,
                                           value:`**Description**:The Terrific Troll Tavern is a place of the rumors of halls and chatter of inns\n`
                                       },
                                       {
                                           name: `The Lager Estate`,
                                           value:`**Description**:Home to the famous Lager Family and their legendary Backbreaker Beer.\n`
                                       },
                                       {
                                           name: `Crofter's Market`,
                                           value:`**Description**:The Crofter’s Market is a place for craftsmanship to find new homes.\n`
                                       },
                                       {
                                           name: `Aube Town Guild Outpost`,
                                           value:`**Description**:The Guild Outpost is home to the unwavering and dedicated Guild Rangers.\n`
                                       },
                                       {
                                           name: `Town Centre`,
                                           value:`**Description**:The Town Center is a place of importance, gathering and sometimes entertainment.\n`
                                       },
                                       {
                                           name: `Abandoned Castle`,
                                           value:`**Description**:An important architecture of the past, that has since become irrelevant\n`
                                       }
                                   ])
        
        
        let btn_cancel = new MessageActionRow().addComponents([
            new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),
            new MessageButton().setCustomId("interior").setStyle("PRIMARY").setLabel("interior"),
            new MessageButton().setCustomId("exterior").setStyle("PRIMARY").setLabel("exterior")])
        
        let Exteriorselect =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_exterior')
                    .setPlaceholder(`Select a place to travel ${interaction.user.username}`)
                    .addOptions({
                        label: `Castellan Fields`,
                        description: ``,
                        value: `Castellan Fields`,
                    },{
                        label: `Sunshade Forest`,
                        description: ``,
                        value: `Sunshade Forest`,
                    },
                    {
                        label: `The Badlands`,
                        description: ``,
                        value: `The Badlands`,
                    },{
                        label: `State of Zorya`,
                        description: ``,
                        value: `Zorya`,
                    }
                    )
                    .setDisabled(false),
            ]) 

            let Interiorselect =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_interior')
                    .setPlaceholder(`Select a location ${interaction.user.username}`)
                    .addOptions({
                        label: `The Terrific Troll Tavern`,
                        description: ``,
                        value: `The Terrific Troll Tavern`,
                    },{
                        label: `The Lager Estate`,
                        description: ``,
                        value: `The Lager Estate`,
                    },
                    {
                        label: `Crofter's Market`,
                        description: ``,
                        value: `Crofter's Market`,
                    },{
                        label: `Aube Town Guild Outpost`,
                        description: ``,
                        value: `Aube Town Guild Outpost`,
                    },{
                        label: `Town Centre`,
                        description: ``,
                        value: `Town Centre`,
                    },{
                        label: `Abandoned Castle`,
                        description: ``,
                        value: `Abandoned Castle`,
                    },
                    
                    )
                    .setDisabled(false),
            ])  
            let filter_select = (interaction : any) => interaction.user.id === authorId && (interaction.customId == "select_interior" || interaction.customId == "select_exterior")
            let filter_cancel = (interaction : any) => interaction.user.id === authorId && (interaction.customId == "cancel" || interaction.customId == "interior" || interaction.customId == "exterior")    
            let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select,time:1000*300 })
            let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel,time:1000*300 })
        
            
        
        
            await interaction.reply({content: null,embeds:[Interiorembed],components:[Interiorselect,btn_cancel]})
        
            collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                collected.deferUpdate().catch(() => null)
                const location = collected.values[0]
                
                if(collected.customId == "select_exterior"){
                    if(location == 'Castellan Fields'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/AubeTown/Castellan_Fields.jpeg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://Castellan_Fields.jpeg')
                        .setDescription(`As your eyes sweep across the Castellan Fields in Aube Town, you behold a vast expanse of golden plains where diligent crofters toil, their sweat transforming ordinary dust into a bountiful harvest of precious riches, painting a scene of perseverance and prosperity.\n\nuse **/explore** to explore this location\n\n**Recommeded Level: 2**`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'The Badlands'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/AubeTown/Badlands.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://Badlands.jpg')
                        .setDescription(`As your gaze falls upon the Badlands in Aube Town, you behold a scorching desert realm where relentless heat engulfs the treacherous landscape, concealing untold secrets and lurking death at every precarious step, warning you of the unforgiving nature of this desolate domain.\n\nuse **/explore** to explore this location`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Sunshade Forest'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/AubeTown/sunshade_forest.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://sunshade_forest.jpg')
                        .setDescription(`As your eyes penetrate the Sunshade Forest in Aube Town, you encounter a foreboding realm cloaked in darkness, where the drought-resistant Sunshade Trees, adorned with broad silver leaves that reflect sunlight, create an eerie and treacherous ambiance, concealing lurking dangers within its depths.\n\nuse **/explore** to explore this location\n\n**Recommeded Level: 2**`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Zorya'){
                        if(foundUser.completed_quests.includes( "KS-TA-SQ5")){
                            if(foundUser.coins>=100 && foundUser.mount == "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-100,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/zorya_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://zorya_main.jpg')
                        .setDescription(`As you arrive in the Stateship of Zorya, one of the kingdom's largest states, the skyline greets you with a mesmerizing blend of architectural marvels, where progress and modernity have woven themselves into the very fabric of this bustling metropolis.\n\nuse **/explore** to explore this location`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                            }
                        else if(foundUser.mount != "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/zorya_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://zorya_main.jpg')
                        .setDescription(`As you arrive in the Stateship of Zorya, one of the kingdom's largest states, the skyline greets you with a mesmerizing blend of architectural marvels, where progress and modernity have woven themselves into the very fabric of this bustling metropolis.\n\nuse **/explore** to explore this location`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else{
                            interaction.editReply(`You do not have enough coins to pay for the Stagecoach`)
                        }
                collector_select.stop()
                collector_cancel.stop()
                }
                
                    
                    }
                    else{
                       await interaction.editReply({content:`The Route to Zorya is Blocked by the Emperal Brigade due to the ongoing Nightmare, You cannot proceed right now`,embeds:[],components:[]}) 
                    }
                    
                }
                else if(collected.customId == "select_interior"){
                    await profileModel.updateOne({userID:authorId},{location:location})
               
                if(location == 'The Terrific Troll Tavern'){
                    const attachment = new MessageAttachment('assets/AubeTown/Terrific_Troll_Tavern.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Terrific_Troll_Tavern.jpg')
                    .setDescription(`As you cast your gaze upon the Terrific Troll Tavern in Aube Town, you witness a haven where both the burdened find solace, and the troubled find empathy, as laughter intertwines with heartfelt tales, creating an atmosphere that embraces both escapism and catharsis.You take a room at the Tavern and rest.\n\nuse **/explore** to explore this location`)
                    await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'The Lager Estate'){
                    const attachment = new MessageAttachment('assets/AubeTown/Lager_Estate.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Lager_Estate.jpg')
                    .setDescription(`As your eyes wander across the Lager Estate in Aube Town, you witness the renowned Lager family's brewers diligently crafting the legendary "Backbreaker Beer" using Solarcorn, a golden elixir that glows with the sun's essence, immersing you in a realm of tantalizing tastes and its twisted aftermath.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == `Crofter's Market`){
                    const attachment = new MessageAttachment('assets/AubeTown/Crofters_Market.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Crofters_Market.jpg')
                    .setDescription(`As you cast your eyes upon the bustling market in Aube Town, crofters proudly display an eclectic array of wares, including intricate weapons, sturdy armor, and a cornucopia of items, creating a vibrant tapestry of commerce and craftsmanship.\n\nuse **/explore** to explore this location\n\nThis is a Shop location, you can use **/shop** here`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Aube Town Guild Outpost'){
                    const attachment = new MessageAttachment('assets/AubeTown/Aube_outpost.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Aube_outpost.jpg')
                    .setDescription(`There is something about the Guild Outpost where the Guild Rangers, stalwart protectors, can be seen offering aid to the locals, their presence a shield against the dangers of magical beasts and bandits, while the air hums with a sense of shared purpose and safety\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Town Centre'){
                    const attachment = new MessageAttachment('assets/AubeTown/Town_Centre.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Town_Centre.jpg')
                    .setDescription(`As you step into the town center of Aube, a bustling community awaits your gaze. Vibrant colors intertwine with enchanting melodies as the tight-knit community of residents and travelers unite, creating a mesmerizing tapestry of joyous events and captivating festivals that dance before your eyes.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Abandoned Castle'){
                    const attachment = new MessageAttachment('assets/AubeTown/Abandoned_Castle.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Abandoned_Castle.jpg')
                    .setDescription(`As you cast your gaze upon the towering Abandoned Castle in Aube Town, you witness a haunting relic of forgotten wars, its grandeur and scars visible to all, a solemn reminder of a turbulent past that continues to resonate in the hearts of those who call this town home.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                collector_select.stop()
                collector_cancel.stop()
               
                }
                
                
        
                
                
            })
        
            collector_cancel.on('collect', async j => {
                j.deferUpdate().catch(() => null)
                if(j.customId == "cancel"){
                let delembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('CANCELLED')
                .setDescription(`location visit cancelled!`)
                
                await interaction.editReply({embeds:[delembed],components:[]})
                collector_cancel.stop()
                collector_select.stop()
                }
                else if(j.customId == "interior"){
                    
                    await interaction.editReply({embeds:[Interiorembed],components:[btn_cancel,Interiorselect]})
                    }
                else if(j.customId == "exterior"){
                    
                        await interaction.editReply({embeds:[Exteriorembed],components:[btn_cancel,Exteriorselect]})

                        }
                    
                
            })
        
        
        
                        }
                        else if(city_town == "Castellan Fields"){
                                        let embed
                                        let mount = "None"
                                        if(mount == "None"){
                                            embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Aube Town`,
                                                value:`**Travelled on Foot**\n**Description**:The township of aube\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Sunshade Forest`,
                                                value:`**Travelled on Foot**\n**Description**:A treacherous place for travelers and explorers alike.\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `The Badlands`,
                                                value:`**Travelled on Foot**\n**Description**: Face the crippling heat, with nothing to find in it.\n**Cost**:0 🪙\n`
                                            },
                                           
                                        ])
                                        
                                        }
                                        else{
                                            embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Aube Town`,
                                                value:`**Travelled on Spyralink**\n**Description**:The township of aube\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Sunshade Forest`,
                                                value:`**Travelled on Spyralink**\n**Description**:A treacherous place for travelers and explorers alike.\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `The Badlands`,
                                                value:`**Travelled on Spyralink**\n**Description**: Face the crippling heat, with nothing to find in it.\n**Cost**:0 🪙\n`
                                            },
                                            
                                        ])
    
                                        }
                                        
                                   
        
        
        let btn_cancel = new MessageActionRow().addComponents([
            new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),])
        
        let select =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select')
                    .setPlaceholder(`Select a place to travel ${interaction.user.username}`)
                    .addOptions({
                        label: `Aube Town`,
                        description: ``,
                        value: `aube`,
                    },{
                        label: `Sunshade Forest`,
                        description: ``,
                        value: `Sunshade Forest`,
                    },
                    {
                        label: `The Badlands`,
                        description: ``,
                        value: `The Badlands`,
                    },
                    )
                    .setDisabled(false),
            ])  
            let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
            let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"    
            let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select,time:1000*300 })
            let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel,time:1000*300 })
        
            
        
        
            await interaction.reply({content: null,embeds:[embed],components:[select,btn_cancel]})
        
            collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                collected.deferUpdate().catch(() => null)
                const location = collected.values[0]
                
                
                if(location == 'aube'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/AubeTown/Aube_Town.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Aube_Town.jpg')
                    .setDescription(`As you arrive in Aube Town, the tranquil beauty of the quaint settlement unfolds before you. Nestled at the eastern edge of the Kingdom, it holds the distinction of being the place where the first rays of the morning sun touch the land, casting a golden glow upon the town and awakening a sense of hope and possibility within your heart.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'The Badlands'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/AubeTown/Badlands.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Badlands.jpg')
                    .setDescription(`As your gaze falls upon the Badlands in Aube Town, you behold a scorching desert realm where relentless heat engulfs the treacherous landscape, concealing untold secrets and lurking death at every precarious step, warning you of the unforgiving nature of this desolate domain.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Sunshade Forest'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/AubeTown/sunshade_forest.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://sunshade_forest.jpg')
                    .setDescription(`As your eyes penetrate the Sunshade Forest in Aube Town, you encounter a foreboding realm cloaked in darkness, where the drought-resistant Sunshade Trees, adorned with broad silver leaves that reflect sunlight, create an eerie and treacherous ambiance, concealing lurking dangers within its depths.\n\nuse **/explore** to explore this location\n\n**Recommeded Level: 2**`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                
                
                
                
        
                
                collector_select.stop()
                collector_cancel.stop()
            })
        
            collector_cancel.on('collect', async j => {
                j.deferUpdate().catch(() => null)
        
                let delembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('CANCELLED')
                .setDescription(`location visit cancelled!`)
                
                await interaction.editReply({embeds:[delembed],components:[]})
                collector_cancel.stop()
                collector_select.stop()
            })
        
        
        
                }
                 else if(city_town == "Sunshade Forest"){
                                        let embed
                                        let mount = "None"
                                        if(mount == "None"){
                                            embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Aube Town`,
                                                value:`**Travelled on Foot**\n**Description**:The township of aube\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Castellan Fields`,
                                                value:`**Travelled on Foot**\n**Description**:The famous golden hued fields of Aube.\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `The Badlands`,
                                                value:`**Travelled on Foot**\n**Description**: Face the crippling heat, with nothing to find in it.\n**Cost**:0 🪙\n`
                                            },
                                           
                                        ])
                                        
                                        }
                                        else{
                                            embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Aube Town`,
                                                value:`**Travelled on Spyralink**\n**Description**:The township of aube\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Castellan Fields`,
                                                value:`**Travelled on Spyralink**\n**Description**:The famous golden hued fields of Aube.\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `The Badlands`,
                                                value:`**Travelled on Spyralink**\n**Description**: Face the crippling heat, with nothing to find in it.\n**Cost**:0 🪙\n`
                                            },
                                            
                                        ])
    
                                        }
                                        
                                   
        
        
        let btn_cancel = new MessageActionRow().addComponents([
            new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),])
        
        let select =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select')
                    .setPlaceholder(`Select a place to travel ${interaction.user.username}`)
                    .addOptions({
                        label: `Aube Town`,
                        description: ``,
                        value: `aube`,
                    },{
                        label: `Castellan Fields`,
                        description: ``,
                        value: `Castellan Fields`,
                    },
                    {
                        label: `The Badlands`,
                        description: ``,
                        value: `The Badlands`,
                    },
                    )
                    .setDisabled(false),
            ])  
            let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
            let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"    
            let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select,time:1000*300 })
            let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel,time:1000*300 })
        
           
        
            await interaction.reply({content: null,embeds:[embed],components:[select,btn_cancel]})
        
            collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                collected.deferUpdate().catch(() => null)
                const location = collected.values[0]
                
                
                if(location == 'aube'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/AubeTown/Aube_Town.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Aube_Town.jpg')
                    .setDescription(`As you arrive in Aube Town, the tranquil beauty of the quaint settlement unfolds before you. Nestled at the eastern edge of the Kingdom, it holds the distinction of being the place where the first rays of the morning sun touch the land, casting a golden glow upon the town and awakening a sense of hope and possibility within your heart.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'The Badlands'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/AubeTown/Badlands.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Badlands.jpg')
                    .setDescription(`As your gaze falls upon the Badlands in Aube Town, you behold a scorching desert realm where relentless heat engulfs the treacherous landscape, concealing untold secrets and lurking death at every precarious step, warning you of the unforgiving nature of this desolate domain.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Castellan Fields'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/AubeTown/Castellan_Fields.jpeg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Castellan_Fields.jpeg')
                    .setDescription(`As your eyes sweep across the Castellan Fields in Aube Town, you behold a vast expanse of golden plains where diligent crofters toil, their sweat transforming ordinary dust into a bountiful harvest of precious riches, painting a scene of perseverance and prosperity.\n\nuse **/explore** to explore this location\n\n**Recommeded Level: 2**`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                
                
                
                
        
                
                collector_select.stop()
                collector_cancel.stop()
            })
        
            collector_cancel.on('collect', async j => {
                j.deferUpdate().catch(() => null)
        
                let delembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('CANCELLED')
                .setDescription(`location visit cancelled!`)
                
                await interaction.editReply({embeds:[delembed],components:[]})
                collector_cancel.stop()
                collector_select.stop()
            })
        
        
        
                }
                else if(city_town == "The Badlands"){
                                        let embed
                                        let mount = "None"
                                        if(mount == "None"){
                                            embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Aube Town`,
                                                value:`**Travelled on Foot**\n**Description**:The township of aube\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Castellan Fields`,
                                                value:`**Travelled on Foot**\n**Description**:The famous golden hued fields of Aube.\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Sunshade Forest`,
                                                value:`**Travelled on Foot**\n**Description**:A treacherous place for travelers and explorers alike.\n**Cost**:0 🪙\n`
                                            },
                                           
                                        ])
                                        
                                        }
                                        else{
                                            embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Aube Town`,
                                                value:`**Travelled on Spyralink**\n**Description**:The township of aube\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Castellan Fields`,
                                                value:`**Travelled on Spyralink**\n**Description**:The famous golden hued fields of Aube.\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Sunshade Forest`,
                                                value:`**Travelled on Spyralink**\n**Description**:A treacherous place for travelers and explorers alike.\n**Cost**:0 🪙\n`
                                            },
                                            
                                        ])
    
                                        }
                                        
                                   
        
        
        let btn_cancel = new MessageActionRow().addComponents([
            new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),])
        
        let select =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select')
                    .setPlaceholder(`Select a place to travel ${interaction.user.username}`)
                    .addOptions({
                        label: `Aube Town`,
                        description: ``,
                        value: `aube`,
                    },{
                        label: `Castellan Fields`,
                        description: ``,
                        value: `Castellan Fields`,
                    },
                    {
                        label: `Sunshade Forest`,
                        description: ``,
                        value: `Sunshade Forest`,
                    },
                    )
                    .setDisabled(false),
            ])  
            let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
            let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"    
            let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select,time:1000*300 })
            let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel,time:1000*300 })
        
            
        
        
            await interaction.reply({content: null,embeds:[embed],components:[select,btn_cancel]})
        
            collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                collected.deferUpdate().catch(() => null)
                const location = collected.values[0]
                
                
                if(location == 'aube'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/AubeTown/Aube_Town.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Aube_Town.jpg')
                    .setDescription(`As you arrive in Aube Town, the tranquil beauty of the quaint settlement unfolds before you. Nestled at the eastern edge of the Kingdom, it holds the distinction of being the place where the first rays of the morning sun touch the land, casting a golden glow upon the town and awakening a sense of hope and possibility within your heart.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Sunshade Forest'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/AubeTown/sunshade_forest.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://sunshade_forest.jpg')
                    .setDescription(`As your eyes penetrate the Sunshade Forest in Aube Town, you encounter a foreboding realm cloaked in darkness, where the drought-resistant Sunshade Trees, adorned with broad silver leaves that reflect sunlight, create an eerie and treacherous ambiance, concealing lurking dangers within its depths.\n\nuse **/explore** to explore this location\n\n**Recommeded Level: 2**`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Castellan Fields'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/AubeTown/Castellan_Fields.jpeg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Castellan_Fields.jpeg')
                    .setDescription(`As your eyes sweep across the Castellan Fields in Aube Town, you behold a vast expanse of golden plains where diligent crofters toil, their sweat transforming ordinary dust into a bountiful harvest of precious riches, painting a scene of perseverance and prosperity.\n\nuse **/explore** to explore this location\n\n**Recommeded Level: 2**`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                
                
                
                
        
                
                collector_select.stop()
                collector_cancel.stop()
            })
        
            collector_cancel.on('collect', async j => {
                j.deferUpdate().catch(() => null)
        
                let delembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('CANCELLED')
                .setDescription(`location visit cancelled!`)
                
                await interaction.editReply({embeds:[delembed],components:[]})
                collector_cancel.stop()
                collector_select.stop()
            })
        
        
        
                }
                     else if(city_town == "Zorya"){
                                        let embed
                                        let mount = "None"
                                        if(mount == "None"){
                                            embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from Zorya`)
                                        .addFields([
                                            {
                                                name: `Ellior Forest`,
                                                value:`**Travelled on Foot**\n**Description**:The enchanting Forest of Ellior\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Dragon's Den`,
                                                value:`**Travelled on Foot**\n**Description**:The Den of an Ancient Dragon\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Sunstone Mines`,
                                                value:`**Travelled on Foot**\n**Description**:The minefield where sunstones are mined\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Township of Aube`,
                                                value:`**Travelled on Stage Coach**\n**Description**:The township of Aube\n**Cost**:100 🪙\n`
                                            },
                                            {
                                                name: `Zephyr Mountain`,
                                                value:`**Travelled on Foot**\n**Description**:The great mountains of Zephyr range\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `State of Tethys`,
                                                value:`**Travelled on Stage Coach**\n**Description**:The Stateship of Tethys\n**Cost**:300 🪙\n`
                                            },
                                            {
                                                name: `Capital State of Gloaming`,
                                                value:`**Travelled on Stage Coach**\n**Description**:The Capital of Solarstrio, stateship of Gloaming\n**Cost**:200 🪙\n`
                                            },
                                            {
                                                name: `Orld Tree's Husk`,
                                                value:`**Travelled on Foot**\n**Description**:The Husk of the ancient Orld Tree\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Township of Werfall`,
                                                value:`**Travelled on Stage Coach**\n**Description**:Werfall, once a thriving trade hub known for efficient distribution, collapsed due to a mysterious incident, leaving its lands infertile. Now a war-torn battleground between Abyssals and Rangers, the town's former prosperity is but a memory.\n**Cost**:150 🪙`
                                            },
                                           
                                        ])
                                        
                                        }
                                        else{
                                            embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Ellior Forest`,
                                                value:`**Travelled on Spyralink**\n**Description**:The enchanting Forest of Ellior\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Dragon's Den`,
                                                value:`**Travelled on Spyralink**\n**Description**:The Den of an Ancient Dragon\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Sunstone Mines`,
                                                value:`**Travelled on Spyralink**\n**Description**:The minefield where sunstones are mined\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Township of Aube`,
                                                value:`**Travelled on Spyralink**\n**Description**:The township of Aube\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Zephyr Mountain`,
                                                value:`**Travelled on Spyralink**\n**Description**:The great mountains of Zephyr range\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `State of Tethys`,
                                                value:`**Travelled on Spyralink**\n**Description**:The Stateship of Tethys\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Capital State of Gloaming`,
                                                value:`**Travelled on Spyralink**\n**Description**:The Capital of Solarstrio, stateship of Gloaming\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Orld Tree's Husk`,
                                                value:`**Travelled on Spyralink**\n**Description**:The Husk of the ancient Orld Tree\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Township of Werfall`,
                                                value:`**Travelled on Spyralink**\n**Description**:Werfall, once a thriving trade hub known for efficient distribution, collapsed due to a mysterious incident, leaving its lands infertile. Now a war-torn battleground between Abyssals and Rangers, the town's former prosperity is but a memory.\n**Cost**:0 🪙\n`
                                            },
                                           
                                            
                                        ])
    
                                        }
                                        
                                   
        
        
        let btn_cancel = new MessageActionRow().addComponents([
            new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),])
        
        let select =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select')
                    .setPlaceholder(`Select a place to travel ${interaction.user.username}`)
                    .addOptions({
                        label: `Aube Town`,
                        description: ``,
                        value: `aube`,
                    },{
                        label: `Ellior Forest`,
                        description: ``,
                        value: `ellior`,
                    },
                    {
                        label: `Dragon's Den`,
                        description: ``,
                        value: `Dragon's Den`,
                    },
                    {
                        label: `Sunstone Mines`,
                        description: ``,
                        value: `Sunstone Mines`,
                    },
                    {
                        label: `Zephyr Mountain`,
                        description: ``,
                        value: `Zephyr Mountain`,
                    },
                    {
                        label: `State of Tethys`,
                        description: ``,
                        value: `Tethys`,
                    },
                    {
                        label: `Capital State of Gloaming`,
                        description: ``,
                        value: `Gloaming`,
                    },
                    {
                        label: `Orld Tree's Husk`,
                        description: ``,
                        value: `Orld Tree Husk`,
                    },
                    {
                        label: `Township of Werfall`,
                        description: ``,
                        value: `Werfall`,
                    },
                    )
                    .setDisabled(false),
            ])  
            let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
            let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"    
            let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select,time:1000*300 })
            let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel,time:1000*300 })
        
            
        
            await interaction.reply({content: null,embeds:[embed],components:[select,btn_cancel]})
        
            collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                collected.deferUpdate().catch(() => null)
                const location = collected.values[0]
                
                
                if(location == 'aube'){
                    if(foundUser.coins>=100 && foundUser.mount == "None"){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-100,location:"None"})
                    const attachment = new MessageAttachment('assets/AubeTown/Aube_Town.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Aube_Town.jpg')
                    .setDescription(`As you arrive in Aube Town, the tranquil beauty of the quaint settlement unfolds before you. Nestled at the eastern edge of the Kingdom, it holds the distinction of being the place where the first rays of the morning sun touch the land, casting a golden glow upon the town and awakening a sense of hope and possibility within your heart.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(foundUser.mount != "None"){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/AubeTown/Aube_Town.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Aube_Town.jpg')
                    .setDescription(`As you arrive in Aube Town, the tranquil beauty of the quaint settlement unfolds before you. Nestled at the eastern edge of the Kingdom, it holds the distinction of being the place where the first rays of the morning sun touch the land, casting a golden glow upon the town and awakening a sense of hope and possibility within your heart.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else{
                        interaction.editReply(`You don't have enough coins to pay for the Stagecoach`)
                    }
                    
                }
                else if(location == 'ellior'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/ellior_forest.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://ellior_forest.jpg')
                    .setDescription(`As you enter the foreboding Ellior Forest, an eerie silence descends upon the air. Sinister shadows dance among the gnarled trees, whispering tales of malevolence and treachery, warning of the evil that lurks within its depths.\n\nuse **/explore** to explore this location\n\n**Recommeded Level: 5**`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == `Dragon's Den`){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/dragon_den.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://dragon_den.jpg')
                    .setDescription(`As you enter the ominous Dragon's Den, a sense of awe and trepidation engulfs you. The remnants of the fallen Greater Dragon's lair echo with tales of unimaginable wealth and hidden perils, a haunting testament to the power that once dwelled within these hallowed grounds\n\nuse **/explore** to explore this location\n\n**Recommeded Level: 7**`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Sunstone Mines'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/sunstone_mines.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://sunstone_mines.jpg')
                    .setDescription(`As you arrive at the Sunstone Mines, a mesmerizing sight awaits. Sunlight dances upon the glistening walls, revealing veins of the coveted Sunstone, whose radiant glow fuels the Kingdom of Solarstrio's technological advancements and casts a warm aura of progress upon the land.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Zephyr Mountain'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/zephyr_mountain.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://zephyr_mountain.jpg')
                    .setDescription(`As you arrive at the majestic Zephyr Mountain, its towering presence commands your attention. A formidable barrier between kingdoms, its treacherous slopes hold both danger and allure, but a safe gondola ride offers a breathtaking ascent, allowing you to admire the grandeur of the world below without facing the perils within.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Tethys'){
                    
                    const attachment = new MessageAttachment('assets/Tethys/tethys_main.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RED')
                    .setTitle('ERROR!')
                    .setImage('attachment://tethys_main.jpg')
                    .setDescription(`The road to state of Tethys is currently Blocked!`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Gloaming'){
                    
                    const attachment = new MessageAttachment('assets/Tethys/tethys_main.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RED')
                    .setTitle('ERROR!')
                    .setImage('attachment://tethys_main.jpg')
                    .setDescription(`The road to the capital state of Gloaming is currently Blocked!`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Orld Tree Husk'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/orld_husk.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://orld_husk.jpg')
                    .setDescription(`you visited ${location},The Husk of the ancient Orld Tree\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Werfall'){
                    if(foundUser.coins>=150 && foundUser.mount == "None"){
                        let successembed
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-150,location:"None"})
                    const attachment = new MessageAttachment('assets/Werfall/werfall_main.jpg')
                    if(foundUser.completed_quests.includes("KS-ZS-MQ1")){
                    successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://werfall_main.jpg')
                    .setDescription(`As You approached the outskirts of Werfall, an eerie transformation was evident. Once a thriving hub of commerce, the town now exuded an air of bleakness and despair. Tents, emblazoned with the emblem of the "Emperal Brigade," sprawled across the landscape, housing a mix of rangers and medics in a poignant display of organized chaos. The streets, once teeming with life, were now pathways of decay and abandonment. The atmosphere was heavy with a sense of death that had permeated every corner of the town, leaving behind an indelible mark of loss. The toll of this ruinous affliction was evident in the haunted gazes of those who moved among the tents, their once-strong spirits shattered by the unforgiving grip of the town's tragic fate.`)
                    }
                    else{
                    successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://werfall_main.jpg')
                    .setDescription(`The road to the township of Werfall is currently Blocked!`)
                    }
                    
                    
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(foundUser.mount != "None"){
                        let successembed
                        
                        const attachment = new MessageAttachment('assets/Tethys/werfall_main.jpg')
                        if(foundUser.completed_quests.includes("KS-ZS-MQ1")){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://werfall_main.jpg')
                        .setDescription(`As You approached the outskirts of Werfall, an eerie transformation was evident. Once a thriving hub of commerce, the town now exuded an air of bleakness and despair. Tents, emblazoned with the emblem of the "Emperal Brigade," sprawled across the landscape, housing a mix of rangers and medics in a poignant display of organized chaos. The streets, once teeming with life, were now pathways of decay and abandonment. The atmosphere was heavy with a sense of death that had permeated every corner of the town, leaving behind an indelible mark of loss. The toll of this ruinous affliction was evident in the haunted gazes of those who moved among the tents, their once-strong spirits shattered by the unforgiving grip of the town's tragic fate.`)
                        }
                        else{
                        successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://werfall_main.jpg')
                        .setDescription(`The road to the township of Werfall is currently Blocked!`)
                        }
                        
                        
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else{
                        interaction.editReply(`You don't have enough coins to pay for the Stagecoach`)
                    }
                    
                }
                
                
                
        
                
                collector_select.stop()
                collector_cancel.stop()
            })
        
            collector_cancel.on('collect', async j => {
                j.deferUpdate().catch(() => null)
        
                let delembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('CANCELLED')
                .setDescription(`location visit cancelled!`)
                
                await interaction.editReply({embeds:[delembed],components:[]})
                collector_cancel.stop()
                collector_select.stop()
            })
        
        
        
                }
                else if(city_town == "ellior"){
                                        let embed
                                        let mount = "None"
                                        if(mount == "None"){
                                            embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from Ellior Forest`)
                                        .addFields([
                                            {
                                                name: `Stateship of Zorya`,
                                                value:`**Travelled on Foot**\n**Description**:One of the largest Stateships in Solarstrio, where progress meets modernity.\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Dragon's Den`,
                                                value:`**Travelled on Foot**\n**Description**:The den of an ancient Dragon\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Sunstone Mines`,
                                                value:`**Travelled on Foot**\n**Description**:A minefield where sunstones are mined\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Zephyr Mountain`,
                                                value:`**Travelled on Foot**\n**Description**:The great mountains of Zephyr range\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Orld Tree's Husk`,
                                                value:`**Travelled on Foot**\n**Description**:The husk of the orld tree\n**Cost**:0 🪙`
                                            },
                                           
                                        ])
                                        
                                        }
                                        else{
                                            embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from Ellior Forest`)
                                        .addFields([
                                            {
                                                name: `Stateship of Zorya`,
                                                value:`**Travelled on Spyralink**\n**Description**:One of the largest Stateships in Solarstrio, where progress meets modernity.\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Dragon's Den`,
                                                value:`**Travelled on Spyralink**\n**Description**:The den of an ancient Dragon\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Sunstone Mines`,
                                                value:`**Travelled on Spyralink**\n**Description**:A minefield where sunstones are mined\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Zephyr Mountain`,
                                                value:`**Travelled on Spyralink**\n**Description**:The great mountains of Zephyr range\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Orld Tree's Husk`,
                                                value:`**Travelled on Spyralink**\n**Description**:The husk of the orld tree\n**Cost**:0 🪙\n`
                                            },
                                           
                                        ])
    
                                        }
                                        
                                   
        
        
        let btn_cancel = new MessageActionRow().addComponents([
            new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),])
        
        let select =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select')
                    .setPlaceholder(`Select a place to travel ${interaction.user.username}`)
                    .addOptions({
                        label: `Stateship of Zorya`,
                        description: ``,
                        value: `Zorya`,
                    },{
                        label: `Dragon's Den`,
                        description: ``,
                        value: `Dragon's Den`,
                    },
                    {
                        label: `Sunstone Mines`,
                        description: ``,
                        value: `Sunstone Mines`,
                    },
                    {
                        label: `Zephyr Mountain`,
                        description: ``,
                        value: `Zephyr Mountain`,
                    },
                    {
                        label: `Orld Tree's Husk`,
                        description: ``,
                        value: `Orld Tree Husk`,
                    },
                    )
                    .setDisabled(false),
            ])  
            let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
            let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"    
            let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select,time:1000*300 })
            let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel,time:1000*300 })
        
        
        
            await interaction.reply({content: null,embeds:[embed],components:[select,btn_cancel]})
        
            collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                collected.deferUpdate().catch(() => null)
                const location = collected.values[0]
                
                
                if(location == 'Zorya'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/zorya_main.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://zorya_main.jpg')
                    .setDescription(`As you arrive in the Stateship of Zorya, one of the kingdom's largest states, the skyline greets you with a mesmerizing blend of architectural marvels, where progress and modernity have woven themselves into the very fabric of this bustling metropolis.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'ellior'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/ellior_forest.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://ellior_forest.jpg')
                    .setDescription(`As you enter the foreboding Ellior Forest, an eerie silence descends upon the air. Sinister shadows dance among the gnarled trees, whispering tales of malevolence and treachery, warning of the evil that lurks within its depths.\n\nuse **/explore** to explore this location\n\n**Recommeded Level: 5**`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == `Dragon's Den`){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/dragon_den.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://dragon_den.jpg')
                    .setDescription(`As you enter the ominous Dragon's Den, a sense of awe and trepidation engulfs you. The remnants of the fallen Greater Dragon's lair echo with tales of unimaginable wealth and hidden perils, a haunting testament to the power that once dwelled within these hallowed grounds\n\nuse **/explore** to explore this location\n\n**Recommeded Level: 7**`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Zephyr Mountain'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/zephyr_mountain.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://zephyr_mountain.jpg')
                    .setDescription(`As you arrive at the majestic Zephyr Mountain, its towering presence commands your attention. A formidable barrier between kingdoms, its treacherous slopes hold both danger and allure, but a safe gondola ride offers a breathtaking ascent, allowing you to admire the grandeur of the world below without facing the perils within.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Sunstone Mines'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/sunstone_mines.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://sunstone_mines.jpg')
                    .setDescription(`As you arrive at the Sunstone Mines, a mesmerizing sight awaits. Sunlight dances upon the glistening walls, revealing veins of the coveted Sunstone, whose radiant glow fuels the Kingdom of Solarstrio's technological advancements and casts a warm aura of progress upon the land.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Orld Tree Husk'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/orld_husk.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://orld_husk.jpg')
                    .setDescription(`you visited ${location},The Husk of the ancient Orld Tree\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                
                
                
                
        
                
                collector_select.stop()
                collector_cancel.stop()
            })
        
            collector_cancel.on('collect', async j => {
                j.deferUpdate().catch(() => null)
        
                let delembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('CANCELLED')
                .setDescription(`location visit cancelled!`)
                
                await interaction.editReply({embeds:[delembed],components:[]})
                collector_cancel.stop()
                collector_select.stop()
            })
        
        
        
                }
                else if(city_town == "Dragon's Den"){
                                        let embed
                                        let mount = "None"
                                        if(mount == "None"){
                                            embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from Dragon's Den`)
                                        .addFields([
                                            {
                                                name: `Stateship of Zorya`,
                                                value:`**Travelled on Foot**\n**Description**:One of the largest Stateships in Solarstrio, where progress meets modernity.\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Ellior Forest`,
                                                value:`**Travelled on Foot**\n**Description**:The Enchanted Forest of Ellior\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Sunstone Mines`,
                                                value:`**Travelled on Foot**\n**Description**:A minefield where sunstones are mined\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Zephyr Mountain`,
                                                value:`**Travelled on Foot**\n**Description**:The great mountains of Zephyr range\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Orld Tree's Husk`,
                                                value:`**Travelled on Foot**\n**Description**:The husk of the orld tree\n**Cost**:0 🪙\n`
                                            },
                                           
                                        ])
                                        
                                        }
                                        else{
                                            embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from Dragon's Den`)
                                        .addFields([
                                            {
                                                name: `Stateship of Zorya`,
                                                value:`**Travelled on Spyralink**\n**Description**:One of the largest Stateships in Solarstrio, where progress meets modernity.\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Ellior Forest`,
                                                value:`**Travelled on Spyralink**\n**Description**:The Enchanted Forest of Ellior\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Sunstone Mines`,
                                                value:`**Travelled on Spyralink**\n**Description**:A minefield where sunstones are mined\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Zephyr Mountain`,
                                                value:`**Travelled on Spyralink**\n**Description**:The great mountains of Zephyr range\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Orld Tree's Husk`,
                                                value:`**Travelled on Spyralink**\n**Description**:The husk of the orld tree\n**Cost**:0 🪙`
                                            },
                                           
                                        ])
    
                                        }
                                        
                                   
        
        
        let btn_cancel = new MessageActionRow().addComponents([
            new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),])
        
        let select =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select')
                    .setPlaceholder(`Select a place to travel ${interaction.user.username}`)
                    .addOptions({
                        label: `Stateship of Zorya`,
                        description: ``,
                        value: `Zorya`,
                    },{
                        label: `Ellior Forest`,
                        description: ``,
                        value: `ellior`,
                    },
                    {
                        label: `Sunstone Mines`,
                        description: ``,
                        value: `Sunstone Mines`,
                    },
                    {
                        label: `Zephyr Mountain`,
                        description: ``,
                        value: `Zephyr Mountain`,
                    },
                    {
                        label: `Orld Tree's Husk`,
                        description: ``,
                        value: `Orld Tree Husk`,
                    },
                    )
                    .setDisabled(false),
            ])  
            let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
            let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"    
            let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select,time:1000*300 })
            let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel,time:1000*300 })
        
        
        
            await interaction.reply({content: null,embeds:[embed],components:[select,btn_cancel]})
        
            collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                collected.deferUpdate().catch(() => null)
                const location = collected.values[0]
                
                
                if(location == 'Zorya'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/zorya_main.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://zorya_main.jpg')
                    .setDescription(`As you arrive in the Stateship of Zorya, one of the kingdom's largest states, the skyline greets you with a mesmerizing blend of architectural marvels, where progress and modernity have woven themselves into the very fabric of this bustling metropolis.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'ellior'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/ellior_forest.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://ellior_forest.jpg')
                    .setDescription(`As you enter the foreboding Ellior Forest, an eerie silence descends upon the air. Sinister shadows dance among the gnarled trees, whispering tales of malevolence and treachery, warning of the evil that lurks within its depths.\n\nuse **/explore** to explore this location\n\n**Recommeded Level: 5**`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Zephyr Mountain'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/zephyr_mountain.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://zephyr_mountain.jpg')
                    .setDescription(`As you arrive at the majestic Zephyr Mountain, its towering presence commands your attention. A formidable barrier between kingdoms, its treacherous slopes hold both danger and allure, but a safe gondola ride offers a breathtaking ascent, allowing you to admire the grandeur of the world below without facing the perils within.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Sunstone Mines'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/sunstone_mines.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://sunstone_mines.jpg')
                    .setDescription(`As you arrive at the Sunstone Mines, a mesmerizing sight awaits. Sunlight dances upon the glistening walls, revealing veins of the coveted Sunstone, whose radiant glow fuels the Kingdom of Solarstrio's technological advancements and casts a warm aura of progress upon the land.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Orld Tree Husk'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/orld_husk.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://orld_husk.jpg')
                    .setDescription(`you visited ${location},The Husk of the ancient Orld Tree\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                
                
                
                
        
                
                collector_select.stop()
                collector_cancel.stop()
            })
        
            collector_cancel.on('collect', async j => {
                j.deferUpdate().catch(() => null)
        
                let delembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('CANCELLED')
                .setDescription(`location visit cancelled!`)
                
                await interaction.editReply({embeds:[delembed],components:[]})
                collector_cancel.stop()
                collector_select.stop()
            })
        
        
        
                }
                else if(city_town == "Sunstone Mines"){
                                        let embed
                                        let mount = "None"
                                        if(mount == "None"){
                                            embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from Sunstone Mines`)
                                        .addFields([
                                            {
                                                name: `Stateship of Zorya`,
                                                value:`**Travelled on Foot**\n**Description**:One of the largest Stateships in Solarstrio, where progress meets modernity.\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Ellior Forest`,
                                                value:`**Travelled on Foot**\n**Description**:The Enchanted Forest of Ellior\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Dragon's Den`,
                                                value:`**Travelled on Foot**\n**Description**:The Den of an ancient Dragon\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Zephyr Mountain`,
                                                value:`**Travelled on Foot**\n**Description**:The great mountains of Zephyr range\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Orld Tree's Husk`,
                                                value:`**Travelled on Foot**\n**Description**:The husk of the orld tree\n**Cost**:0 🪙\n`
                                            },
                                           
                                        ])
                                        
                                        }
                                        else{
                                            embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from Sunstone Mines`)
                                        .addFields([
                                            {
                                                name: `Stateship of Zorya`,
                                                value:`**Travelled on Spyralink**\n**Description**:One of the largest Stateships in Solarstrio, where progress meets modernity.\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Ellior Forest`,
                                                value:`**Travelled on Spyralink**\n**Description**:The Enchanted Forest of Ellior\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Dragon's Den`,
                                                value:`**Travelled on Spyralink**\n**Description**:The Den of an ancient Dragon\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Zephyr Mountain`,
                                                value:`**Travelled on Spyralink**\n**Description**:The great mountains of Zephyr range\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Orld Tree's Husk`,
                                                value:`**Travelled on Spyralink**\n**Description**:The husk of the orld tree\n**Cost**:0 🪙\n`
                                            },
                                           
                                        ])
    
                                        }
                                        
                                   
        
        
        let btn_cancel = new MessageActionRow().addComponents([
            new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),])
        
        let select =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select')
                    .setPlaceholder(`Select a place to travel ${interaction.user.username}`)
                    .addOptions({
                        label: `Stateship of Zorya`,
                        description: ``,
                        value: `Zorya`,
                    },{
                        label: `Ellior Forest`,
                        description: ``,
                        value: `ellior`,
                    },
                    {
                        label: `Dragon's Den`,
                        description: ``,
                        value: `Dragon's Den`,
                    },
                    {
                        label: `Zephyr Mountain`,
                        description: ``,
                        value: `Zephyr Mountain`,
                    },
                    {
                        label: `Orld Tree's Husk`,
                        description: ``,
                        value: `Orld Tree Husk`,
                    },
                    )
                    .setDisabled(false),
            ])  
            let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
            let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"    
            let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select,time:1000*300 })
            let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel,time:1000*300 })
        
    
        
            await interaction.reply({content: null,embeds:[embed],components:[select,btn_cancel]})
        
            collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                collected.deferUpdate().catch(() => null)
                const location = collected.values[0]
                
                
                if(location == 'Zorya'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/zorya_main.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://zorya_main.jpg')
                    .setDescription(`As you arrive in the Stateship of Zorya, one of the kingdom's largest states, the skyline greets you with a mesmerizing blend of architectural marvels, where progress and modernity have woven themselves into the very fabric of this bustling metropolis.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == `Dragon's Den`){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/dragon_den.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://dragon_den.jpg')
                    .setDescription(`As you enter the ominous Dragon's Den, a sense of awe and trepidation engulfs you. The remnants of the fallen Greater Dragon's lair echo with tales of unimaginable wealth and hidden perils, a haunting testament to the power that once dwelled within these hallowed grounds\n\nuse **/explore** to explore this location\n\n**Recommeded Level: 7**`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Zephyr Mountain'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/zephyr_mountain.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://zephyr_mountain.jpg')
                    .setDescription(`As you arrive at the majestic Zephyr Mountain, its towering presence commands your attention. A formidable barrier between kingdoms, its treacherous slopes hold both danger and allure, but a safe gondola ride offers a breathtaking ascent, allowing you to admire the grandeur of the world below without facing the perils within.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'ellior'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/ellior_forest.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://ellior_forest.jpg')
                    .setDescription(`As you enter the foreboding Ellior Forest, an eerie silence descends upon the air. Sinister shadows dance among the gnarled trees, whispering tales of malevolence and treachery, warning of the evil that lurks within its depths.\n\nuse **/explore** to explore this location\n\n**Recommeded Level: 5**`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Orld Tree Husk'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/orld_husk.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://orld_husk.jpg')
                    .setDescription(`you visited ${location},The Husk of the ancient Orld Tree\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                
                
                
                
        
                
                collector_select.stop()
                collector_cancel.stop()
            })
        
            collector_cancel.on('collect', async j => {
                j.deferUpdate().catch(() => null)
        
                let delembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('CANCELLED')
                .setDescription(`location visit cancelled!`)
                
                await interaction.editReply({embeds:[delembed],components:[]})
                collector_cancel.stop()
                collector_select.stop()
            })
        
        
        
                }
                else if(city_town == "Zephyr Mountain"){
                                        let embed
                                        let mount = "None"
                                        if(mount == "None"){
                                            embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from Zephyr Mountain`)
                                        .addFields([
                                            {
                                                name: `Stateship of Zorya`,
                                                value:`**Travelled on Foot**\n**Description**:One of the largest Stateships in Solarstrio, where progress meets modernity.\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Ellior Forest`,
                                                value:`**Travelled on Foot**\n**Description**:The Enchanted Forest of Ellior\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Dragon's Den`,
                                                value:`**Travelled on Foot**\n**Description**:The Den of an ancient Dragon\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Sunstone Mines`,
                                                value:`**Travelled on Foot**\n**Description**:The minefield when sunstones are mined\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Orld Tree's Husk`,
                                                value:`**Travelled on Foot**\n**Description**:The husk of the orld tree\n**Cost**:0 🪙`
                                            },
                                           
                                        ])
                                        
                                        }
                                        else{
                                            embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from Zephyr Mountain`)
                                        .addFields([
                                            {
                                                name: `Stateship of Zorya`,
                                                value:`**Travelled on Spyralink**\n**Description**:One of the largest Stateships in Solarstrio, where progress meets modernity.\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Ellior Forest`,
                                                value:`**Travelled on Spyralink**\n**Description**:The Enchanted Forest of Ellior\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Dragon's Den`,
                                                value:`**Travelled on Spyralink**\n**Description**:The Den of an ancient Dragon\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Sunstone Mines`,
                                                value:`**Travelled on Spyralink**\n**Description**:The minefield when sunstones are mined\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Orld Tree's Husk`,
                                                value:`**Travelled on Spyralink**\n**Description**:The husk of the orld tree\n**Cost**:0 🪙`
                                            },
                                           
                                        ])
    
                                        }
                                        
                                   
        
        
        let btn_cancel = new MessageActionRow().addComponents([
            new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),])
        
        let select =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select')
                    .setPlaceholder(`Select a place to travel ${interaction.user.username}`)
                    .addOptions({
                        label: `Stateship of Zorya`,
                        description: ``,
                        value: `Zorya`,
                    },{
                        label: `Ellior Forest`,
                        description: ``,
                        value: `ellior`,
                    },
                    {
                        label: `Dragon's Den`,
                        description: ``,
                        value: `Dragon's Den`,
                    },
                    {
                        label: `Sunstone Mines`,
                        description: ``,
                        value: `Sunstone Mines`,
                    },
                    {
                        label: `Orld Tree's Husk`,
                        description: ``,
                        value: `Orld Tree Husk`,
                    },
                    )
                    .setDisabled(false),
            ])  
            let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
            let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"    
            let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select,time:1000*300 })
            let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel,time:1000*300 })
        
           
        
        
            await interaction.reply({content: null,embeds:[embed],components:[select,btn_cancel]})
        
            collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                collected.deferUpdate().catch(() => null)
                const location = collected.values[0]
                
                
                if(location == 'Zorya'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/zorya_main.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://zorya_main.jpg')
                    .setDescription(`As you arrive in the Stateship of Zorya, one of the kingdom's largest states, the skyline greets you with a mesmerizing blend of architectural marvels, where progress and modernity have woven themselves into the very fabric of this bustling metropolis.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == `Dragon's Den`){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/dragon_den.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://dragon_den.jpg')
                    .setDescription(`As you enter the ominous Dragon's Den, a sense of awe and trepidation engulfs you. The remnants of the fallen Greater Dragon's lair echo with tales of unimaginable wealth and hidden perils, a haunting testament to the power that once dwelled within these hallowed grounds\n\nuse **/explore** to explore this location\n\n**Recommeded Level: 7**`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Sunstone Mines'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/sunstone_mines.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://sunstone_mines.jpg')
                    .setDescription(`As you arrive at the Sunstone Mines, a mesmerizing sight awaits. Sunlight dances upon the glistening walls, revealing veins of the coveted Sunstone, whose radiant glow fuels the Kingdom of Solarstrio's technological advancements and casts a warm aura of progress upon the land.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'ellior'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/ellior_forest.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://ellior_forest.jpg')
                    .setDescription(`As you enter the foreboding Ellior Forest, an eerie silence descends upon the air. Sinister shadows dance among the gnarled trees, whispering tales of malevolence and treachery, warning of the evil that lurks within its depths.\n\nuse **/explore** to explore this location\n\n**Recommeded Level: 5**`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Orld Tree Husk'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/orld_husk.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://orld_husk.jpg')
                    .setDescription(`you visited ${location},The Husk of the ancient Orld Tree\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                
                
                
                
        
                
                collector_select.stop()
                collector_cancel.stop()
            })
        
            collector_cancel.on('collect', async j => {
                j.deferUpdate().catch(() => null)
        
                let delembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('CANCELLED')
                .setDescription(`location visit cancelled!`)
                
                await interaction.editReply({embeds:[delembed],components:[]})
                collector_cancel.stop()
                collector_select.stop()
            })
        
        
        
                }
                else if(city_town == "Orld Tree Husk"){
                                        let embed
                                        let mount = "None"
                                        if(mount == "None"){
                                            embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from Orld Tree Husk`)
                                        .addFields([
                                            {
                                                name: `Stateship of Zorya`,
                                                value:`**Travelled on Foot**\n**Description**:One of the largest Stateships in Solarstrio, where progress meets modernity.\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Ellior Forest`,
                                                value:`**Travelled on Foot**\n**Description**:The Enchanted Forest of Ellior\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Dragon's Den`,
                                                value:`**Travelled on Foot**\n**Description**:The Den of an ancient Dragon\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Sunstone Mines`,
                                                value:`**Travelled on Foot**\n**Description**:The minefield when sunstones are mined\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Zephyr Mountain`,
                                                value:`**Travelled on Foot**\n**Description**:The great mountains of the Zephyr range\n**Cost**:0 🪙`
                                            },
                                           
                                        ])
                                        
                                        }
                                        else{
                                            embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from Orld Tree Husk`)
                                        .addFields([
                                            {
                                                name: `Stateship of Zorya`,
                                                value:`**Travelled on Spyralink**\n**Description**:One of the largest Stateships in Solarstrio, where progress meets modernity.\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Ellior Forest`,
                                                value:`**Travelled on Spyralink**\n**Description**:The Enchanted Forest of Ellior\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Dragon's Den`,
                                                value:`**Travelled on Spyralink**\n**Description**:The Den of an ancient Dragon\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Sunstone Mines`,
                                                value:`**Travelled on Spyralink**\n**Description**:The minefield when sunstones are mined\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Zephyr Mountain`,
                                                value:`**Travelled on Spyralink**\n**Description**:The great mountains of the Zephyr range\n**Cost**:0 🪙`
                                            },
                                           
                                        ])
    
                                        }
                                        
                                   
        
        
        let btn_cancel = new MessageActionRow().addComponents([
            new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),])
        
        let select =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select')
                    .setPlaceholder(`Select a place to travel ${interaction.user.username}`)
                    .addOptions({
                        label: `Stateship of Zorya`,
                        description: ``,
                        value: `Zorya`,
                    },{
                        label: `Ellior Forest`,
                        description: ``,
                        value: `ellior`,
                    },
                    {
                        label: `Dragon's Den`,
                        description: ``,
                        value: `Dragon's Den`,
                    },
                    {
                        label: `Sunstone Mines`,
                        description: ``,
                        value: `Sunstone Mines`,
                    },
                    {
                        label: `Zephyr Mountain`,
                        description: ``,
                        value: `Zephyr Mountain`,
                    },
                    )
                    .setDisabled(false),
            ])  
            let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
            let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"    
            let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select,time:1000*300 })
            let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel,time:1000*300 })
    
        
        
            await interaction.reply({content: null,embeds:[embed],components:[select,btn_cancel]})
        
            collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                collected.deferUpdate().catch(() => null)
                const location = collected.values[0]
                
                
                if(location == 'Zorya'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/zorya_main.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://zorya_main.jpg')
                    .setDescription(`As you arrive in the Stateship of Zorya, one of the kingdom's largest states, the skyline greets you with a mesmerizing blend of architectural marvels, where progress and modernity have woven themselves into the very fabric of this bustling metropolis.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == `Dragon's Den`){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/dragon_den.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://dragon_den.jpg')
                    .setDescription(`As you enter the ominous Dragon's Den, a sense of awe and trepidation engulfs you. The remnants of the fallen Greater Dragon's lair echo with tales of unimaginable wealth and hidden perils, a haunting testament to the power that once dwelled within these hallowed grounds\n\nuse **/explore** to explore this location\n\n**Recommeded Level: 7**`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Sunstone Mines'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/sunstone_mines.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://sunstone_mines.jpg')
                    .setDescription(`As you arrive at the Sunstone Mines, a mesmerizing sight awaits. Sunlight dances upon the glistening walls, revealing veins of the coveted Sunstone, whose radiant glow fuels the Kingdom of Solarstrio's technological advancements and casts a warm aura of progress upon the land.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'ellior'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/ellior_forest.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://ellior_forest.jpg')
                    .setDescription(`As you enter the foreboding Ellior Forest, an eerie silence descends upon the air. Sinister shadows dance among the gnarled trees, whispering tales of malevolence and treachery, warning of the evil that lurks within its depths.\n\nuse **/explore** to explore this location\n\n**Recommeded Level: 5**`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Zephyr Mountain'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/zephyr_mountain.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://zephyr_mountain.jpg')
                    .setDescription(`As you arrive at the majestic Zephyr Mountain, its towering presence commands your attention. A formidable barrier between kingdoms, its treacherous slopes hold both danger and allure, but a safe gondola ride offers a breathtaking ascent, allowing you to admire the grandeur of the world below without facing the perils within.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                
                
                
                
        
                
                collector_select.stop()
                collector_cancel.stop()
            })
        
            collector_cancel.on('collect', async j => {
                j.deferUpdate().catch(() => null)
        
                let delembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('CANCELLED')
                .setDescription(`location visit cancelled!`)
                
                await interaction.editReply({embeds:[delembed],components:[]})
                collector_cancel.stop()
                collector_select.stop()
            })
        
        
        
                }
                else if(city_town == "Werfall"){
                    let embed
                                        let mount = "None"
                                        if(mount == "None"){
                                            embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from Werfall`)
                                        .addFields([
                                            {
                                                name: `Stateship of Zorya`,
                                                value:`**Travelled on Stagecoach**\n**Description**:One of the largest Stateships in Solarstrio, where progress meets modernity.\n**Cost**:150 🪙\n`
                                            },{
                                                name: `Stateship of Vigia`,
                                                value:`**Travelled on Stagecoach**\n**Description**:The state of Vigia is a fortress state in Solarstrio, standing as the first and last defense against the deadly forest of DeathRust.\n**Cost**:150 🪙\n`
                                            },
                                            
                                        ])
                                        
                                        }
                                        else{
                                            embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Stateship of Zorya`,
                                                value:`**Travelled on Spyralink**\n**Description**:One of the largest Stateships in Solarstrio, where progress meets modernity.\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Stateship of Vigia`,
                                                value:`**Travelled on Spyralink**\n**Description**:The state of Vigia is a fortress state in Solarstrio, standing as the first and last defense against the deadly forest of DeathRust.\n**Cost**:0 🪙\n`
                                            },
                                            
                                        ])
    
                                        }
                                        
                                   
        
        
        let btn_cancel = new MessageActionRow().addComponents([
            new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),])
        
        let select =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select')
                    .setPlaceholder(`Select a place to travel ${interaction.user.username}`)
                    .addOptions({
                        label: `Stateship of Zorya`,
                        description: ``,
                        value: `Zorya`,
                    },
                    {
                        label: `Stateship of Vigia`,
                        description: ``,
                        value: `Vigia`,
                    },
                    )
                    .setDisabled(false),
            ])  
            let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
            let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"    
            let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select,time:1000*300 })
            let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel,time:1000*300 })
    
        
        
            await interaction.reply({content: null,embeds:[embed],components:[select,btn_cancel]})
        
            collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                collected.deferUpdate().catch(() => null)
                const location = collected.values[0]
                
                
                if(location == 'Zorya'){
                    if(foundUser.coins >=150 && foundUser.mount == "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-150,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/zorya_main.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://zorya_main.jpg')
                    .setDescription(`As you arrive in the Stateship of Zorya, one of the kingdom's largest states, the skyline greets you with a mesmerizing blend of architectural marvels, where progress and modernity have woven themselves into the very fabric of this bustling metropolis.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(foundUser.mount != "None"){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/zorya_main.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://zorya_main.jpg')
                    .setDescription(`As you arrive in the Stateship of Zorya, one of the kingdom's largest states, the skyline greets you with a mesmerizing blend of architectural marvels, where progress and modernity have woven themselves into the very fabric of this bustling metropolis.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else{
                        interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                    }
                    
                }
                else if(location == 'Vigia'){
                    if(foundUser.coins >=150 && foundUser.mount == "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-150,location:"None"})
                    const attachment = new MessageAttachment('assets/Vigia/vigia_main.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://vigia_main.jpg')
                    .setDescription(`As you arrive in the state of Vigia, a fortified sanctuary nestled in the heart of Solarstrio, the cityscape unfolds before your eyes, showcasing a harmonious fusion of history and resilience. The towering walls of Vigia, known as the SolGate, stand as a testament to the city's unwavering defense against the menacing DeathRust forest. Within its protective embrace, Vigia thrives as a vibrant hub, where echoes of the past reverberate through its streets. The city's charm lies in its lively atmosphere, adorned with museums, monuments, and a sense of time-honored significance.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(foundUser.mount != "None"){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Vigia/vigia_main.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://vigia_main.jpg')
                    .setDescription(`As you arrive in the state of Vigia, a fortified sanctuary nestled in the heart of Solarstrio, the cityscape unfolds before your eyes, showcasing a harmonious fusion of history and resilience. The towering walls of Vigia, known as the SolGate, stand as a testament to the city's unwavering defense against the menacing DeathRust forest. Within its protective embrace, Vigia thrives as a vibrant hub, where echoes of the past reverberate through its streets. The city's charm lies in its lively atmosphere, adorned with museums, monuments, and a sense of time-honored significance.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else{
                        interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                    }
                    
                }
                
                
        
                
                collector_select.stop()
                collector_cancel.stop()
            })
        
            collector_cancel.on('collect', async j => {
                j.deferUpdate().catch(() => null)
        
                let delembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('CANCELLED')
                .setDescription(`location visit cancelled!`)
                
                await interaction.editReply({embeds:[delembed],components:[]})
                collector_cancel.stop()
                collector_select.stop()
            })
        
        
                }
                else if(city_town == "Vigia"){
                    let embed
                                        let mount = "None"
                                        if(mount == "None"){
                                            embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Township of Werfall`,
                                                value:`**Travelled on Stagecoach**\n**Description**:Werfall, once a thriving trade hub known for efficient distribution, collapsed due to a mysterious incident, leaving its lands infertile. Now a war-torn battleground between Abyssals and Rangers, the town's former prosperity is but a memory.\n**Cost**:150 🪙\n`
                                            },
                                            {
                                                name: `Township of Kafig`,
                                                value:`**Travelled on Stagecoach**\n**Description**:Kafig, a vibrant town nestled near the mystical Asche Peak, where the locals revere Avian Spyriths, especially the mythical Radohn, and thrive in a bustling market for magical flying beasts.\n**Cost**:100 🪙\n`
                                            },
                                            {
                                                name: `Asche Peak`,
                                                value:`**Travelled on Stagecoach**\n**Description**:A charred hill crowned in perpetual darkness, its soot-blackened soil radiating intense heat, home to a rich variety of Avian Spyriths.\n**Cost**: 0 🪙\n`
                                            },
                                            {
                                                name: `Deathrust Forest`,
                                                value:`**Travelled on Stagecoach**\n**Description**:DeathRust Forest, a forsaken realm devoid of life, haunted by the relentless menace of mindless iron zombies known as Ferromites, where the very air carries an infectious rust turning all who breathe it into rusted husks with burning cores.\n**Cost**: 0 🪙\n`
                                            },
                                            
                                        ])
                                        
                                        }
                                        else{
                                            embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Township of Werfall`,
                                                value:`**Travelled on Spyralink**\n**Description**:Werfall, once a thriving trade hub known for efficient distribution, collapsed due to a mysterious incident, leaving its lands infertile. Now a war-torn battleground between Abyssals and Rangers, the town's former prosperity is but a memory.\n**Cost**: 0 🪙\n`
                                            },
                                            {
                                                name: `Township of Kafig`,
                                                value:`**Travelled on Spyralink**\n**Description**:Kafig, a vibrant town nestled near the mystical Asche Peak, where the locals revere Avian Spyriths, especially the mythical Radohn, and thrive in a bustling market for magical flying beasts.\n**Cost**: 0 🪙\n`
                                            },
                                            {
                                                name: `Asche Peak`,
                                                value:`**Travelled on Spyralink**\n**Description**:A charred hill crowned in perpetual darkness, its soot-blackened soil radiating intense heat, home to a rich variety of Avian Spyriths.\n**Cost**: 0 🪙\n`
                                            },
                                            {
                                                name: `Deathrust Forest`,
                                                value:`**Travelled on Spyralink**\n**Description**:DeathRust Forest, a forsaken realm devoid of life, haunted by the relentless menace of mindless iron zombies known as Ferromites, where the very air carries an infectious rust turning all who breathe it into rusted husks with burning cores.\n**Cost**: 0 🪙\n`
                                            },
                                            
                                        ])
    
                                        }
                                        
                                   
        
        
        let btn_cancel = new MessageActionRow().addComponents([
            new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),])
        
        let select =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select')
                    .setPlaceholder(`Select a place to travel ${interaction.user.username}`)
                    .addOptions({
                        label: `Township of Werfall`,
                        description: ``,
                        value: `Werfall`,
                    },
                    {
                        label: `Township of Kafig`,
                        description: ``,
                        value: `Kafig`,
                    },
                    {
                        label: `Asche Peak`,
                        description: ``,
                        value: `Asche Peak`,
                    },
                    {
                        label: `Deathrust Forest`,
                        description: ``,
                        value: `Deathrust Forest`,
                    },
                    )
                    .setDisabled(false),
            ])  
            let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
            let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"    
            let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select,time:1000*300 })
            let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel,time:1000*300 })
    
        
        
            await interaction.reply({content: null,embeds:[embed],components:[select,btn_cancel]})
        
            collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                collected.deferUpdate().catch(() => null)
                const location = collected.values[0]
                
                
                if(location == 'Werfall'){
                    if(foundUser.coins >=150 && foundUser.mount == "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-150,location:"None"})
                    const attachment = new MessageAttachment('assets/Werfall/werfall_main.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://werfall_main.jpg')
                    .setDescription(`As You approached the outskirts of Werfall, an eerie transformation was evident. Once a thriving hub of commerce, the town now exuded an air of bleakness and despair. Tents, emblazoned with the emblem of the "Emperal Brigade," sprawled across the landscape, housing a mix of rangers and medics in a poignant display of organized chaos. The streets, once teeming with life, were now pathways of decay and abandonment. The atmosphere was heavy with a sense of death that had permeated every corner of the town, leaving behind an indelible mark of loss. The toll of this ruinous affliction was evident in the haunted gazes of those who moved among the tents, their once-strong spirits shattered by the unforgiving grip of the town's tragic fate.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(foundUser.mount != "None"){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Werfall/werfall_main.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://werfall_main.jpg')
                    .setDescription(`As You approached the outskirts of Werfall, an eerie transformation was evident. Once a thriving hub of commerce, the town now exuded an air of bleakness and despair. Tents, emblazoned with the emblem of the "Emperal Brigade," sprawled across the landscape, housing a mix of rangers and medics in a poignant display of organized chaos. The streets, once teeming with life, were now pathways of decay and abandonment. The atmosphere was heavy with a sense of death that had permeated every corner of the town, leaving behind an indelible mark of loss. The toll of this ruinous affliction was evident in the haunted gazes of those who moved among the tents, their once-strong spirits shattered by the unforgiving grip of the town's tragic fate.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else{
                        interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                    }
                    
                }
                else if(location == 'Kafig'){
                    if(foundUser.coins >=100 && foundUser.mount == "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-100,location:"None"})
                    const attachment = new MessageAttachment('assets/Kafig/kafig_main.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://kafig_main.jpg')
                    .setDescription(`As you enter Kafig, vibrant bird houses adorn every corner of the bustling town, creating a picturesque scene. The Avian Square, with its central obsidian statue, stands as a focal point amidst the lively atmosphere. Traders and merchants add to the visual tapestry, drawn to the town's reputation as a thriving market for magical flying beasts, while the air carries a sense of reverence for the mythical Avian Spyriths.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(foundUser.mount != "None"){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Kafig/kafig_main.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://vigia_main.jpg')
                    .setDescription(`As you enter Kafig, vibrant bird houses adorn every corner of the bustling town, creating a picturesque scene. The Avian Square, with its central obsidian statue, stands as a focal point amidst the lively atmosphere. Traders and merchants add to the visual tapestry, drawn to the town's reputation as a thriving market for magical flying beasts, while the air carries a sense of reverence for the mythical Avian Spyriths.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else{
                        interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                    }
                    
                }
                else if(location == 'Asche Peak'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/zephyr_mountain.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://zephyr_mountain.jpg')
                    .setDescription(`As you reach Asche Peak, the landscape transforms into a surreal panorama of charred hills and blackened soil. The air is thick with an intense heat, radiating from the ground that gives the hill its soot-like black color. Avian Spyriths, both friendly and hostile, fill the skies, adding life to the mysterious hill. The legend of Radohn, the flame-draped ruler of the skies, lingers in the atmosphere, shrouding Asche Peak in an aura of mythical beauty.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Deathrust Forest'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/zephyr_mountain.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://zephyr_mountain.jpg')
                    .setDescription(`As you enter DeathRust Forest, the sight is eerie and still. Tall, old trees stand like ghostly statues, their branches reaching out like twisted fingers against a gray, lifeless sky. The ground is covered in dry leaves and brittle plants, creating a carpet of quiet decay. A hazy mist hangs in the air, giving the whole place a ghostly atmosphere. The once-green forest now seems like a graveyard, with rusted figures scattered around—those mindless iron zombies, the Ferromites, blending into the haunting scenery, their skeletal shapes telling a tale of a place forgotten and left to rust.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                
                
        
                
                collector_select.stop()
                collector_cancel.stop()
            })
        
            collector_cancel.on('collect', async j => {
                j.deferUpdate().catch(() => null)
        
                let delembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('CANCELLED')
                .setDescription(`location visit cancelled!`)
                
                await interaction.editReply({embeds:[delembed],components:[]})
                collector_cancel.stop()
                collector_select.stop()
            })
        
        
                }
                else if(city_town == "Kafig"){
                    let embed
                                        let mount = "None"
                                        if(mount == "None"){
                                            embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Asche Peak`,
                                                value:`**Travelled on Stagecoach**\n**Description**:A charred hill crowned in perpetual darkness, its soot-blackened soil radiating intense heat, home to a rich variety of Avian Spyriths.\n**Cost**: 0 🪙\n`
                                            },
                                            {
                                                name: `Stateship of Vigia`,
                                                value:`**Travelled on Stagecoach**\n**Description**:The state of Vigia is a fortress state in Solarstrio, standing as the first and last defense against the deadly forest of DeathRust.\n**Cost**: 100 🪙\n`
                                            },
                                            
                                        ])
                                        
                                        }
                                        else{
                                            embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Asche Peak`,
                                                value:`**Travelled on Spyralink**\n**Description**:A charred hill crowned in perpetual darkness, its soot-blackened soil radiating intense heat, home to a rich variety of Avian Spyriths.\n**Cost**: 0 🪙\n`
                                            },
                                            {
                                                name: `Stateship of Vigia`,
                                                value:`**Travelled on Spyralink**\n**Description**:The state of Vigia is a fortress state in Solarstrio, standing as the first and last defense against the deadly forest of DeathRust.\n**Cost**: 100 🪙\n`
                                            },
                                            
                                        ])
    
                                        }
                                        
                                   
        
        
        let btn_cancel = new MessageActionRow().addComponents([
            new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),])
        
        let select =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select')
                    .setPlaceholder(`Select a place to travel ${interaction.user.username}`)
                    .addOptions(
                    {
                        label: `Asche Peak`,
                        description: ``,
                        value: `Asche Peak`,
                    },
                    {
                        label: `Stateship of Vigia`,
                        description: ``,
                        value: `Vigia`,
                    },
                    )
                    .setDisabled(false),
            ])  
            let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
            let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"    
            let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select,time:1000*300 })
            let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel,time:1000*300 })
    
        
        
            await interaction.reply({content: null,embeds:[embed],components:[select,btn_cancel]})
        
            collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                collected.deferUpdate().catch(() => null)
                const location = collected.values[0]
                
                
                if(location == 'Vigia'){
                    if(foundUser.coins >=100 && foundUser.mount == "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-100,location:"None"})
                    const attachment = new MessageAttachment('assets/Vigia/vigia_main.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://vigia_main.jpg')
                    .setDescription(`As you arrive in the state of Vigia, a fortified sanctuary nestled in the heart of Solarstrio, the cityscape unfolds before your eyes, showcasing a harmonious fusion of history and resilience. The towering walls of Vigia, known as the SolGate, stand as a testament to the city's unwavering defense against the menacing DeathRust forest. Within its protective embrace, Vigia thrives as a vibrant hub, where echoes of the past reverberate through its streets. The city's charm lies in its lively atmosphere, adorned with museums, monuments, and a sense of time-honored significance.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(foundUser.mount != "None"){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Vigia/vigia_main.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://vigia_main.jpg')
                    .setDescription(`As you arrive in the state of Vigia, a fortified sanctuary nestled in the heart of Solarstrio, the cityscape unfolds before your eyes, showcasing a harmonious fusion of history and resilience. The towering walls of Vigia, known as the SolGate, stand as a testament to the city's unwavering defense against the menacing DeathRust forest. Within its protective embrace, Vigia thrives as a vibrant hub, where echoes of the past reverberate through its streets. The city's charm lies in its lively atmosphere, adorned with museums, monuments, and a sense of time-honored significance.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else{
                        interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                    }
                    
                }
                
                else if(location == 'Asche Peak'){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Zorya/zephyr_mountain.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://zephyr_mountain.jpg')
                    .setDescription(`As you reach Asche Peak, the landscape transforms into a surreal panorama of charred hills and blackened soil. The air is thick with an intense heat, radiating from the ground that gives the hill its soot-like black color. Avian Spyriths, both friendly and hostile, fill the skies, adding life to the mysterious hill. The legend of Radohn, the flame-draped ruler of the skies, lingers in the atmosphere, shrouding Asche Peak in an aura of mythical beauty.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                
                
                
        
                
                collector_select.stop()
                collector_cancel.stop()
            })
        
            collector_cancel.on('collect', async j => {
                j.deferUpdate().catch(() => null)
        
                let delembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('CANCELLED')
                .setDescription(`location visit cancelled!`)
                
                await interaction.editReply({embeds:[delembed],components:[]})
                collector_cancel.stop()
                collector_select.stop()
            })
        
        
                }
                else if(city_town == "Asche Peak"){
                                        let embed
                                        let mount = "None"
                                        if(mount == "None"){
                                            embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Township of Kafig`,
                                                value:`**Travelled on Stagecoach**\n**Description**:Kafig, a vibrant town nestled near the mystical Asche Peak, where the locals revere Avian Spyriths, especially the mythical Radohn, and thrive in a bustling market for magical flying beasts.\n**Cost**: 0 🪙\n`
                                            },
                                            {
                                                name: `Stateship of Vigia`,
                                                value:`**Travelled on Stagecoach**\n**Description**:The state of Vigia is a fortress state in Solarstrio, standing as the first and last defense against the deadly forest of DeathRust.\n**Cost**: 100 🪙\n`
                                            },
                                            
                                        ])
                                        
                                        }
                                        else{
                                            embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Township of Kafig`,
                                                value:`**Travelled on Spyralink**\n**Description**:Kafig, a vibrant town nestled near the mystical Asche Peak, where the locals revere Avian Spyriths, especially the mythical Radohn, and thrive in a bustling market for magical flying beasts.\n**Cost**: 0 🪙\n`
                                            },
                                            {
                                                name: `Stateship of Vigia`,
                                                value:`**Travelled on Spyralink**\n**Description**:The state of Vigia is a fortress state in Solarstrio, standing as the first and last defense against the deadly forest of DeathRust.\n**Cost**: 100 🪙\n`
                                            },
                                            
                                        ])
    
                                        }
                                        
                                   
        
        
        let btn_cancel = new MessageActionRow().addComponents([
            new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),])
        
        let select =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select')
                    .setPlaceholder(`Select a place to travel ${interaction.user.username}`)
                    .addOptions(
                    {
                        label: `Township of Kafig`,
                        description: ``,
                        value: `Kafig`,
                    },
                    {
                        label: `Stateship of Vigia`,
                        description: ``,
                        value: `Vigia`,
                    },
                    )
                    .setDisabled(false),
            ])  
            let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
            let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"    
            let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select,time:1000*300 })
            let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel,time:1000*300 })
    
        
        
            await interaction.reply({content: null,embeds:[embed],components:[select,btn_cancel]})
        
            collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                collected.deferUpdate().catch(() => null)
                const location = collected.values[0]
                
                
                if(location == 'Vigia'){
                    if(foundUser.coins >=0 && foundUser.mount == "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Vigia/vigia_main.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://vigia_main.jpg')
                    .setDescription(`As you arrive in the state of Vigia, a fortified sanctuary nestled in the heart of Solarstrio, the cityscape unfolds before your eyes, showcasing a harmonious fusion of history and resilience. The towering walls of Vigia, known as the SolGate, stand as a testament to the city's unwavering defense against the menacing DeathRust forest. Within its protective embrace, Vigia thrives as a vibrant hub, where echoes of the past reverberate through its streets. The city's charm lies in its lively atmosphere, adorned with museums, monuments, and a sense of time-honored significance.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(foundUser.mount != "None"){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Vigia/vigia_main.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://vigia_main.jpg')
                    .setDescription(`As you arrive in the state of Vigia, a fortified sanctuary nestled in the heart of Solarstrio, the cityscape unfolds before your eyes, showcasing a harmonious fusion of history and resilience. The towering walls of Vigia, known as the SolGate, stand as a testament to the city's unwavering defense against the menacing DeathRust forest. Within its protective embrace, Vigia thrives as a vibrant hub, where echoes of the past reverberate through its streets. The city's charm lies in its lively atmosphere, adorned with museums, monuments, and a sense of time-honored significance.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else{
                        interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                    }
                    
                }
                
                else if(location == 'Kafig'){
                    if(foundUser.coins >=0 && foundUser.mount == "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Vigia/vigia_main.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://vigia_main.jpg')
                    .setDescription(`As you enter Kafig, vibrant bird houses adorn every corner of the bustling town, creating a picturesque scene. The Avian Square, with its central obsidian statue, stands as a focal point amidst the lively atmosphere. Traders and merchants add to the visual tapestry, drawn to the town's reputation as a thriving market for magical flying beasts, while the air carries a sense of reverence for the mythical Avian Spyriths.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(foundUser.mount != "None"){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Vigia/vigia_main.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://vigia_main.jpg')
                    .setDescription(`As you enter Kafig, vibrant bird houses adorn every corner of the bustling town, creating a picturesque scene. The Avian Square, with its central obsidian statue, stands as a focal point amidst the lively atmosphere. Traders and merchants add to the visual tapestry, drawn to the town's reputation as a thriving market for magical flying beasts, while the air carries a sense of reverence for the mythical Avian Spyriths.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else{
                        interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                    }
                    
                }
                
                
                
        
                
                collector_select.stop()
                collector_cancel.stop()
            })
        
            collector_cancel.on('collect', async j => {
                j.deferUpdate().catch(() => null)
        
                let delembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('CANCELLED')
                .setDescription(`location visit cancelled!`)
                
                await interaction.editReply({embeds:[delembed],components:[]})
                collector_cancel.stop()
                collector_select.stop()
            })
        
        
                }
                else if(city_town == "Deathrust Forest"){
                                        let embed
                                        let mount = "None"
                                        if(mount == "None"){
                                            embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
                                        .addFields([
                                            
                                            {
                                                name: `Stateship of Vigia`,
                                                value:`**Travelled on Stagecoach**\n**Description**:The state of Vigia is a fortress state in Solarstrio, standing as the first and last defense against the deadly forest of DeathRust.\n**Cost**: 100 🪙\n`
                                            },
                                            
                                        ])
                                        
                                        }
                                        else{
                                            embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Stateship of Vigia`,
                                                value:`**Travelled on Spyralink**\n**Description**:The state of Vigia is a fortress state in Solarstrio, standing as the first and last defense against the deadly forest of DeathRust.\n**Cost**: 100 🪙\n`
                                            },
                                            
                                        ])
    
                                        }
                                        
                                   
        
        
        let btn_cancel = new MessageActionRow().addComponents([
            new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),])
        
        let select =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select')
                    .setPlaceholder(`Select a place to travel ${interaction.user.username}`)
                    .addOptions(
                    {
                        label: `Stateship of Vigia`,
                        description: ``,
                        value: `Vigia`,
                    },
                    )
                    .setDisabled(false),
            ])  
            let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
            let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"    
            let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select,time:1000*300 })
            let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel,time:1000*300 })
    
        
        
            await interaction.reply({content: null,embeds:[embed],components:[select,btn_cancel]})
        
            collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                collected.deferUpdate().catch(() => null)
                const location = collected.values[0]
                
                
                if(location == 'Vigia'){
                    if(foundUser.coins >=0 && foundUser.mount == "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Vigia/vigia_main.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://vigia_main.jpg')
                    .setDescription(`As you arrive in the state of Vigia, a fortified sanctuary nestled in the heart of Solarstrio, the cityscape unfolds before your eyes, showcasing a harmonious fusion of history and resilience. The towering walls of Vigia, known as the SolGate, stand as a testament to the city's unwavering defense against the menacing DeathRust forest. Within its protective embrace, Vigia thrives as a vibrant hub, where echoes of the past reverberate through its streets. The city's charm lies in its lively atmosphere, adorned with museums, monuments, and a sense of time-honored significance.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(foundUser.mount != "None"){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                    const attachment = new MessageAttachment('assets/Vigia/vigia_main.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://vigia_main.jpg')
                    .setDescription(`As you arrive in the state of Vigia, a fortified sanctuary nestled in the heart of Solarstrio, the cityscape unfolds before your eyes, showcasing a harmonious fusion of history and resilience. The towering walls of Vigia, known as the SolGate, stand as a testament to the city's unwavering defense against the menacing DeathRust forest. Within its protective embrace, Vigia thrives as a vibrant hub, where echoes of the past reverberate through its streets. The city's charm lies in its lively atmosphere, adorned with museums, monuments, and a sense of time-honored significance.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else{
                        interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                    }
                    
                }
                
                
                
                
        
                
                collector_select.stop()
                collector_cancel.stop()
            })
        
            collector_cancel.on('collect', async j => {
                j.deferUpdate().catch(() => null)
        
                let delembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('CANCELLED')
                .setDescription(`location visit cancelled!`)
                
                await interaction.editReply({embeds:[delembed],components:[]})
                collector_cancel.stop()
                collector_select.stop()
            })
        
        
                }
                    
                                }
                               }
                        }
                        
                 
                    })

                }
                else{
                    await interaction.reply({content:"It seems you are not awakened yet!\n```use /awaken to begin your Fable```",ephemeral:true})
                }
            }
        })

    })