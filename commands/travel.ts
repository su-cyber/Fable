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
                        .setDescription(`As your eyes sweep across the Castellan Fields in Aube Town, you behold a vast expanse of golden plains where diligent crofters toil, their sweat transforming ordinary dust into a bountiful harvest of precious riches, painting a scene of perseverance and prosperity.\n\n\n\n**Recommeded Level: 2**`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'The Badlands'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/AubeTown/Badlands.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://Badlands.jpg')
                        .setDescription(`As your gaze falls upon the Badlands in Aube Town, you behold a scorching desert realm where relentless heat engulfs the treacherous landscape, concealing untold secrets and lurking death at every precarious step, warning you of the unforgiving nature of this desolate domain.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Sunshade Forest'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/AubeTown/sunshade_forest.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://sunshade_forest.jpg')
                        .setDescription(`As your eyes penetrate the Sunshade Forest in Aube Town, you encounter a foreboding realm cloaked in darkness, where the drought-resistant Sunshade Trees, adorned with broad silver leaves that reflect sunlight, create an eerie and treacherous ambiance, concealing lurking dangers within its depths.\n\n\n\n**Recommeded Level: 2**`)
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
                        .setDescription(`As you arrive in the Stateship of Zorya, one of the kingdom's largest states, the skyline greets you with a mesmerizing blend of architectural marvels, where progress and modernity have woven themselves into the very fabric of this bustling metropolis.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                            }
                        else if(foundUser.mount != "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/zorya_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://zorya_main.jpg')
                        .setDescription(`As you arrive in the Stateship of Zorya, one of the kingdom's largest states, the skyline greets you with a mesmerizing blend of architectural marvels, where progress and modernity have woven themselves into the very fabric of this bustling metropolis.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else{
                            interaction.editReply(`You do not have enough coins to pay for the Stagecoach`)
                        }
                
                }
                else{
                    await interaction.editReply({content:`The Route to Zorya is Blocked by the Emperal Brigade due to the ongoing Nightmare, You cannot proceed right now`,embeds:[],components:[]}) 
                 }
                
                    
                    }
                    
                collector_select.stop()
                collector_cancel.stop()
                    
                }
                else if(collected.customId == "select_interior"){
                    await profileModel.updateOne({userID:authorId},{location:location})
               
                if(location == 'The Terrific Troll Tavern'){
                    const attachment = new MessageAttachment('assets/AubeTown/Terrific_Troll_Tavern.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Terrific_Troll_Tavern.jpg')
                    .setDescription(`As you cast your gaze upon the Terrific Troll Tavern in Aube Town, you witness a haven where both the burdened find solace, and the troubled find empathy, as laughter intertwines with heartfelt tales, creating an atmosphere that embraces both escapism and catharsis.You take a room at the Tavern and rest.\n\n`)
                    await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'The Lager Estate'){
                    const attachment = new MessageAttachment('assets/AubeTown/Lager_Estate.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Lager_Estate.jpg')
                    .setDescription(`As your eyes wander across the Lager Estate in Aube Town, you witness the renowned Lager family's brewers diligently crafting the legendary "Backbreaker Beer" using Solarcorn, a golden elixir that glows with the sun's essence, immersing you in a realm of tantalizing tastes and its twisted aftermath.\n\n`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == `Crofter's Market`){
                    const attachment = new MessageAttachment('assets/AubeTown/Crofters_Market.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Crofters_Market.jpg')
                    .setDescription(`As you cast your eyes upon the bustling market in Aube Town, crofters proudly display an eclectic array of wares, including intricate weapons, sturdy armor, and a cornucopia of items, creating a vibrant tapestry of commerce and craftsmanship.\n\n\n\nThis is a Shop location, you can use **/shop** here`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Aube Town Guild Outpost'){
                    const attachment = new MessageAttachment('assets/AubeTown/Aube_outpost.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Aube_outpost.jpg')
                    .setDescription(`There is something about the Guild Outpost where the Guild Rangers, stalwart protectors, can be seen offering aid to the locals, their presence a shield against the dangers of magical beasts and bandits, while the air hums with a sense of shared purpose and safety\n\n`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Town Centre'){
                    const attachment = new MessageAttachment('assets/AubeTown/Town_Centre.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Town_Centre.jpg')
                    .setDescription(`As you step into the town center of Aube, a bustling community awaits your gaze. Vibrant colors intertwine with enchanting melodies as the tight-knit community of residents and travelers unite, creating a mesmerizing tapestry of joyous events and captivating festivals that dance before your eyes.\n\n`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Abandoned Castle'){
                    const attachment = new MessageAttachment('assets/AubeTown/Abandoned_Castle.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Abandoned_Castle.jpg')
                    .setDescription(`As you cast your gaze upon the towering Abandoned Castle in Aube Town, you witness a haunting relic of forgotten wars, its grandeur and scars visible to all, a solemn reminder of a turbulent past that continues to resonate in the hearts of those who call this town home.\n\n`)
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
                    
                    await interaction.editReply({embeds:[Interiorembed],components:[Interiorselect,btn_cancel]})
                    }
                else if(j.customId == "exterior"){
                    
                        await interaction.editReply({embeds:[Exteriorembed],components:[Exteriorselect,btn_cancel]})

                        }
                    
                
            })
        
        
        
                        }
                        else if(city_town == "Castellan Fields"){
                                        let Interiorembed
                                        let Exteriorembed
                                        let mount = "None"
                                        if(mount == "None"){
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT EXTERIOR LOCATION')
                                        .setDescription(`choose a place to travel outside ${city_town}`)
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
                                            Exteriorembed = new MessageEmbed()
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
                                        
                                   Interiorembed = new MessageEmbed()
                                   .setColor('RANDOM')
                                   .setTitle('SELECT INTERIOR LOCATION IN AUBE TOWN')
                                   .setDescription(`Choose a location to visit in Aube`)
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
            new MessageButton().setCustomId("interior").setStyle("PRIMARY").setLabel("Aube Interior"),
            new MessageButton().setCustomId("exterior").setStyle("PRIMARY").setLabel("Exterior")])
        
        let Exteriorselect =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_exterior')
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
                    if(location == 'aube'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/AubeTown/Aube_Town.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://Aube_Town.jpg')
                        .setDescription(`As you arrive in Aube Town, the tranquil beauty of the quaint settlement unfolds before you. Nestled at the eastern edge of the Kingdom, it holds the distinction of being the place where the first rays of the morning sun touch the land, casting a golden glow upon the town and awakening a sense of hope and possibility within your heart.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'The Badlands'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/AubeTown/Badlands.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://Badlands.jpg')
                        .setDescription(`As your gaze falls upon the Badlands in Aube Town, you behold a scorching desert realm where relentless heat engulfs the treacherous landscape, concealing untold secrets and lurking death at every precarious step, warning you of the unforgiving nature of this desolate domain.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Sunshade Forest'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/AubeTown/sunshade_forest.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://sunshade_forest.jpg')
                        .setDescription(`As your eyes penetrate the Sunshade Forest in Aube Town, you encounter a foreboding realm cloaked in darkness, where the drought-resistant Sunshade Trees, adorned with broad silver leaves that reflect sunlight, create an eerie and treacherous ambiance, concealing lurking dangers within its depths.\n\n\n\n**Recommeded Level: 2**`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    
                collector_select.stop()
                collector_cancel.stop()
                }
                else if(collected.customId == "select_interior"){
                    await profileModel.updateOne({userID:authorId},{location:location,city_town:"aube"})
               
                if(location == 'The Terrific Troll Tavern'){
                    const attachment = new MessageAttachment('assets/AubeTown/Terrific_Troll_Tavern.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Terrific_Troll_Tavern.jpg')
                    .setDescription(`As you cast your gaze upon the Terrific Troll Tavern in Aube Town, you witness a haven where both the burdened find solace, and the troubled find empathy, as laughter intertwines with heartfelt tales, creating an atmosphere that embraces both escapism and catharsis.You take a room at the Tavern and rest.\n\n`)
                    await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'The Lager Estate'){
                    const attachment = new MessageAttachment('assets/AubeTown/Lager_Estate.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Lager_Estate.jpg')
                    .setDescription(`As your eyes wander across the Lager Estate in Aube Town, you witness the renowned Lager family's brewers diligently crafting the legendary "Backbreaker Beer" using Solarcorn, a golden elixir that glows with the sun's essence, immersing you in a realm of tantalizing tastes and its twisted aftermath.\n\n`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == `Crofter's Market`){
                    const attachment = new MessageAttachment('assets/AubeTown/Crofters_Market.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Crofters_Market.jpg')
                    .setDescription(`As you cast your eyes upon the bustling market in Aube Town, crofters proudly display an eclectic array of wares, including intricate weapons, sturdy armor, and a cornucopia of items, creating a vibrant tapestry of commerce and craftsmanship.\n\n\n\nThis is a Shop location, you can use **/shop** here`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Aube Town Guild Outpost'){
                    const attachment = new MessageAttachment('assets/AubeTown/Aube_outpost.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Aube_outpost.jpg')
                    .setDescription(`There is something about the Guild Outpost where the Guild Rangers, stalwart protectors, can be seen offering aid to the locals, their presence a shield against the dangers of magical beasts and bandits, while the air hums with a sense of shared purpose and safety\n\n`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Town Centre'){
                    const attachment = new MessageAttachment('assets/AubeTown/Town_Centre.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Town_Centre.jpg')
                    .setDescription(`As you step into the town center of Aube, a bustling community awaits your gaze. Vibrant colors intertwine with enchanting melodies as the tight-knit community of residents and travelers unite, creating a mesmerizing tapestry of joyous events and captivating festivals that dance before your eyes.\n\n`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Abandoned Castle'){
                    const attachment = new MessageAttachment('assets/AubeTown/Abandoned_Castle.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Abandoned_Castle.jpg')
                    .setDescription(`As you cast your gaze upon the towering Abandoned Castle in Aube Town, you witness a haunting relic of forgotten wars, its grandeur and scars visible to all, a solemn reminder of a turbulent past that continues to resonate in the hearts of those who call this town home.\n\n`)
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
                    
                    await interaction.editReply({embeds:[Interiorembed],components:[Interiorselect,btn_cancel]})
                    }
                else if(j.customId == "exterior"){
                    
                        await interaction.editReply({embeds:[Exteriorembed],components:[Exteriorselect,btn_cancel]})

                        }
                    
                
            })
        
        
        
                        }
                 else if(city_town == "Sunshade Forest"){
                                        let Interiorembed
                                        let Exteriorembed
                                        let mount = "None"
                                        if(mount == "None"){
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT EXTERIOR LOCATION')
                                        .setDescription(`choose a place to travel outside ${city_town}`)
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
                                            Exteriorembed = new MessageEmbed()
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
                                        
                                   Interiorembed = new MessageEmbed()
                                   .setColor('RANDOM')
                                   .setTitle('SELECT INTERIOR LOCATION IN AUBE TOWN')
                                   .setDescription(`Choose a location to visit in Aube`)
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
            new MessageButton().setCustomId("interior").setStyle("PRIMARY").setLabel("Aube Interior"),
            new MessageButton().setCustomId("exterior").setStyle("PRIMARY").setLabel("Exterior")])
        
        let Exteriorselect =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_exterior')
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
                    if(location == 'aube'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/AubeTown/Aube_Town.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://Aube_Town.jpg')
                        .setDescription(`As you arrive in Aube Town, the tranquil beauty of the quaint settlement unfolds before you. Nestled at the eastern edge of the Kingdom, it holds the distinction of being the place where the first rays of the morning sun touch the land, casting a golden glow upon the town and awakening a sense of hope and possibility within your heart.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'The Badlands'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/AubeTown/Badlands.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://Badlands.jpg')
                        .setDescription(`As your gaze falls upon the Badlands in Aube Town, you behold a scorching desert realm where relentless heat engulfs the treacherous landscape, concealing untold secrets and lurking death at every precarious step, warning you of the unforgiving nature of this desolate domain.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Castellan Fields'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/AubeTown/Castellan_Fields.jpeg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://Castellan_Fields.jpeg')
                        .setDescription(`As your eyes sweep across the Castellan Fields in Aube Town, you behold a vast expanse of golden plains where diligent crofters toil, their sweat transforming ordinary dust into a bountiful harvest of precious riches, painting a scene of perseverance and prosperity.\n\n\n\n**Recommeded Level: 2**`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    
                collector_select.stop()
                collector_cancel.stop()
                }
                else if(collected.customId == "select_interior"){
                    await profileModel.updateOne({userID:authorId},{location:location,city_town:"aube"})
               
                if(location == 'The Terrific Troll Tavern'){
                    const attachment = new MessageAttachment('assets/AubeTown/Terrific_Troll_Tavern.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Terrific_Troll_Tavern.jpg')
                    .setDescription(`As you cast your gaze upon the Terrific Troll Tavern in Aube Town, you witness a haven where both the burdened find solace, and the troubled find empathy, as laughter intertwines with heartfelt tales, creating an atmosphere that embraces both escapism and catharsis.You take a room at the Tavern and rest.\n\n`)
                    await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'The Lager Estate'){
                    const attachment = new MessageAttachment('assets/AubeTown/Lager_Estate.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Lager_Estate.jpg')
                    .setDescription(`As your eyes wander across the Lager Estate in Aube Town, you witness the renowned Lager family's brewers diligently crafting the legendary "Backbreaker Beer" using Solarcorn, a golden elixir that glows with the sun's essence, immersing you in a realm of tantalizing tastes and its twisted aftermath.\n\n`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == `Crofter's Market`){
                    const attachment = new MessageAttachment('assets/AubeTown/Crofters_Market.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Crofters_Market.jpg')
                    .setDescription(`As you cast your eyes upon the bustling market in Aube Town, crofters proudly display an eclectic array of wares, including intricate weapons, sturdy armor, and a cornucopia of items, creating a vibrant tapestry of commerce and craftsmanship.\n\n\n\nThis is a Shop location, you can use **/shop** here`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Aube Town Guild Outpost'){
                    const attachment = new MessageAttachment('assets/AubeTown/Aube_outpost.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Aube_outpost.jpg')
                    .setDescription(`There is something about the Guild Outpost where the Guild Rangers, stalwart protectors, can be seen offering aid to the locals, their presence a shield against the dangers of magical beasts and bandits, while the air hums with a sense of shared purpose and safety\n\n`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Town Centre'){
                    const attachment = new MessageAttachment('assets/AubeTown/Town_Centre.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Town_Centre.jpg')
                    .setDescription(`As you step into the town center of Aube, a bustling community awaits your gaze. Vibrant colors intertwine with enchanting melodies as the tight-knit community of residents and travelers unite, creating a mesmerizing tapestry of joyous events and captivating festivals that dance before your eyes.\n\n`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Abandoned Castle'){
                    const attachment = new MessageAttachment('assets/AubeTown/Abandoned_Castle.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Abandoned_Castle.jpg')
                    .setDescription(`As you cast your gaze upon the towering Abandoned Castle in Aube Town, you witness a haunting relic of forgotten wars, its grandeur and scars visible to all, a solemn reminder of a turbulent past that continues to resonate in the hearts of those who call this town home.\n\n`)
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
                    
                    await interaction.editReply({embeds:[Interiorembed],components:[Interiorselect,btn_cancel]})
                    }
                else if(j.customId == "exterior"){
                    
                        await interaction.editReply({embeds:[Exteriorembed],components:[Exteriorselect,btn_cancel]})

                        }
                    
                
            })
        
        
                }
                else if(city_town == "The Badlands"){
                                       let Interiorembed
                                        let Exteriorembed
                                        let mount = "None"
                                        if(mount == "None"){
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT EXTERIOR LOCATION')
                                        .setDescription(`choose a place to travel outside ${city_town}`)
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
                                            Exteriorembed = new MessageEmbed()
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
                                        
                                   Interiorembed = new MessageEmbed()
                                   .setColor('RANDOM')
                                   .setTitle('SELECT INTERIOR LOCATION IN AUBE TOWN')
                                   .setDescription(`Choose a location to visit in Aube`)
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
            new MessageButton().setCustomId("interior").setStyle("PRIMARY").setLabel("Aube Interior"),
            new MessageButton().setCustomId("exterior").setStyle("PRIMARY").setLabel("Exterior")])
        
        let Exteriorselect =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_exterior')
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
                    if(location == 'aube'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/AubeTown/Aube_Town.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://Aube_Town.jpg')
                        .setDescription(`As you arrive in Aube Town, the tranquil beauty of the quaint settlement unfolds before you. Nestled at the eastern edge of the Kingdom, it holds the distinction of being the place where the first rays of the morning sun touch the land, casting a golden glow upon the town and awakening a sense of hope and possibility within your heart.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Sunshade Forest'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/AubeTown/sunshade_forest.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://sunshade_forest.jpg')
                        .setDescription(`As your eyes penetrate the Sunshade Forest in Aube Town, you encounter a foreboding realm cloaked in darkness, where the drought-resistant Sunshade Trees, adorned with broad silver leaves that reflect sunlight, create an eerie and treacherous ambiance, concealing lurking dangers within its depths.\n\n\n\n**Recommeded Level: 2**`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Castellan Fields'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/AubeTown/Castellan_Fields.jpeg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://Castellan_Fields.jpeg')
                        .setDescription(`As your eyes sweep across the Castellan Fields in Aube Town, you behold a vast expanse of golden plains where diligent crofters toil, their sweat transforming ordinary dust into a bountiful harvest of precious riches, painting a scene of perseverance and prosperity.\n\n\n\n**Recommeded Level: 2**`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    
                collector_select.stop()
                collector_cancel.stop()
                }
                else if(collected.customId == "select_interior"){
                    await profileModel.updateOne({userID:authorId},{location:location,city_town:"aube"})
               
                if(location == 'The Terrific Troll Tavern'){
                    const attachment = new MessageAttachment('assets/AubeTown/Terrific_Troll_Tavern.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Terrific_Troll_Tavern.jpg')
                    .setDescription(`As you cast your gaze upon the Terrific Troll Tavern in Aube Town, you witness a haven where both the burdened find solace, and the troubled find empathy, as laughter intertwines with heartfelt tales, creating an atmosphere that embraces both escapism and catharsis.You take a room at the Tavern and rest.\n\n`)
                    await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'The Lager Estate'){
                    const attachment = new MessageAttachment('assets/AubeTown/Lager_Estate.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Lager_Estate.jpg')
                    .setDescription(`As your eyes wander across the Lager Estate in Aube Town, you witness the renowned Lager family's brewers diligently crafting the legendary "Backbreaker Beer" using Solarcorn, a golden elixir that glows with the sun's essence, immersing you in a realm of tantalizing tastes and its twisted aftermath.\n\n`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == `Crofter's Market`){
                    const attachment = new MessageAttachment('assets/AubeTown/Crofters_Market.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Crofters_Market.jpg')
                    .setDescription(`As you cast your eyes upon the bustling market in Aube Town, crofters proudly display an eclectic array of wares, including intricate weapons, sturdy armor, and a cornucopia of items, creating a vibrant tapestry of commerce and craftsmanship.\n\n\n\nThis is a Shop location, you can use **/shop** here`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Aube Town Guild Outpost'){
                    const attachment = new MessageAttachment('assets/AubeTown/Aube_outpost.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Aube_outpost.jpg')
                    .setDescription(`There is something about the Guild Outpost where the Guild Rangers, stalwart protectors, can be seen offering aid to the locals, their presence a shield against the dangers of magical beasts and bandits, while the air hums with a sense of shared purpose and safety\n\n`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Town Centre'){
                    const attachment = new MessageAttachment('assets/AubeTown/Town_Centre.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Town_Centre.jpg')
                    .setDescription(`As you step into the town center of Aube, a bustling community awaits your gaze. Vibrant colors intertwine with enchanting melodies as the tight-knit community of residents and travelers unite, creating a mesmerizing tapestry of joyous events and captivating festivals that dance before your eyes.\n\n`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Abandoned Castle'){
                    const attachment = new MessageAttachment('assets/AubeTown/Abandoned_Castle.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://Abandoned_Castle.jpg')
                    .setDescription(`As you cast your gaze upon the towering Abandoned Castle in Aube Town, you witness a haunting relic of forgotten wars, its grandeur and scars visible to all, a solemn reminder of a turbulent past that continues to resonate in the hearts of those who call this town home.\n\n`)
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
                    
                    await interaction.editReply({embeds:[Interiorembed],components:[Interiorselect,btn_cancel]})
                    }
                else if(j.customId == "exterior"){
                    
                        await interaction.editReply({embeds:[Exteriorembed],components:[Exteriorselect,btn_cancel]})

                        }
                    
                
            })
        
        
        
        
                }
                     else if(city_town == "Zorya"){
                                        let Interiorembed
                                        let Exteriorembed
                                        let mount = "None"
                                        if(mount == "None"){
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT EXTERIOR LOCATION')
                                        .setDescription(`choose a place to travel outside ${city_town}`)
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
                                            Exteriorembed = new MessageEmbed()
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
                                        
                                   Interiorembed = new MessageEmbed()
                                   .setColor('RANDOM')
                                   .setTitle('SELECT INTERIOR LOCATION')
                                   .setDescription(`Choose a location to visit in ${city_town}`)
                                   .addFields([
                                    {
                                        name: `Guild District`,
                                        value:`**Description**:A hub of adventurer guilds and the grand Colosseum arena.\n`
                                    },
                                    {
                                        name: `Guild Office`,
                                        value:`**Description**:The main Guild Office of many guilds around the world\n`
                                    },
                                    {
                                        name: `Auriga Sails Company`,
                                        value:`**Description**:A renowned shipbuilding workshop crafting sturdy vessels.\n`
                                    },
                                    {
                                        name: `Astro Avenue`,
                                        value:`**Description**:A vibrant thoroughfare lined with captivating attractions.\n`
                                    },
                                    {
                                        name: `Golden Terminal`,
                                        value:`**Description**:A bustling travel hub with majestic steam engine trains.\n`
                                    },
                                    {
                                        name: `Castle Luminar`,
                                        value:`**Description**:An imposing fortress residence of Earl Auriga.\n`
                                    },
                                    {
                                        name: `Siewelle Port`,
                                        value:`**Description**:A grand harbor with 7 piers guarded by towering sea gates.\n`
                                    },
                                    {
                                        name: `Black Market`,
                                        value:`**Description**:An underground network of illicit and experimental wares.\n`
                                    },
                                    {
                                        name: `Sun Archives`,
                                        value:`**Description**:A vast repository of knowledge and blueprints, where the echoes of history and innovation come alive.\n`
                                    },
                                    {
                                        name: `Cloud Gardens`,
                                        value:`**Description**:A mesmerizing fusion of nature and steam-powered marvels, where vibrant flowers bloom suspended in mid-air, creating an enchanting and tranquil visual.\n`
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

            let Interiorselect =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_interior')
                    .setPlaceholder(`Select a location ${interaction.user.username}`)
                    .addOptions({
                        label: `Guild District`,
                        description: ``,
                        value: `Guild District`,
                    },{
                        label: `Guild Office`,
                        description: ``,
                        value: `Guild Office`,
                    },
                    {
                        label: `Auriga Sails Company`,
                        description: ``,
                        value: `Auriga Sails Company`,
                    },{
                        label: `Astro Avenue`,
                        description: ``,
                        value: `Astro Avenue`,
                    },{
                        label: `Golden Terminal`,
                        description: ``,
                        value: `Golden Terminal`,
                    },{
                        label: `Castle Luminar`,
                        description: ``,
                        value: `Castle Luminar`,
                    },{
                        label: `Siewelle Port`,
                        description: ``,
                        value: `Siewelle Port`,
                    },{
                        label: `Black Market`,
                        description: ``,
                        value: `Black Market`,
                    },{
                        label: `Sun Archives`,
                        description: ``,
                        value: `Sun Archives`,
                    },{
                        label: `Cloud Gardens`,
                        description: ``,
                        value: `Cloud Gardens`,
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
                    if(location == 'aube'){
                        if(foundUser.coins>=100 && foundUser.mount == "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-100,location:"None"})
                        const attachment = new MessageAttachment('assets/AubeTown/Aube_Town.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://Aube_Town.jpg')
                        .setDescription(`As you arrive in Aube Town, the tranquil beauty of the quaint settlement unfolds before you. Nestled at the eastern edge of the Kingdom, it holds the distinction of being the place where the first rays of the morning sun touch the land, casting a golden glow upon the town and awakening a sense of hope and possibility within your heart.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else if(foundUser.mount != "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/AubeTown/Aube_Town.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://Aube_Town.jpg')
                        .setDescription(`As you arrive in Aube Town, the tranquil beauty of the quaint settlement unfolds before you. Nestled at the eastern edge of the Kingdom, it holds the distinction of being the place where the first rays of the morning sun touch the land, casting a golden glow upon the town and awakening a sense of hope and possibility within your heart.\n\n`)
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
                        .setDescription(`As you enter the foreboding Ellior Forest, an eerie silence descends upon the air. Sinister shadows dance among the gnarled trees, whispering tales of malevolence and treachery, warning of the evil that lurks within its depths.\n\n\n\n**Recommeded Level: 5**`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == `Dragon's Den`){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/dragon_den.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://dragon_den.jpg')
                        .setDescription(`As you enter the ominous Dragon's Den, a sense of awe and trepidation engulfs you. The remnants of the fallen Greater Dragon's lair echo with tales of unimaginable wealth and hidden perils, a haunting testament to the power that once dwelled within these hallowed grounds\n\n\n\n**Recommeded Level: 7**`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Sunstone Mines'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/sunstone_mines.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://sunstone_mines.jpg')
                        .setDescription(`As you arrive at the Sunstone Mines, a mesmerizing sight awaits. Sunlight dances upon the glistening walls, revealing veins of the coveted Sunstone, whose radiant glow fuels the Kingdom of Solarstrio's technological advancements and casts a warm aura of progress upon the land.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Zephyr Mountain'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/zephyr_mountain.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://zephyr_mountain.jpg')
                        .setDescription(`As you arrive at the majestic Zephyr Mountain, its towering presence commands your attention. A formidable barrier between kingdoms, its treacherous slopes hold both danger and allure, but a safe gondola ride offers a breathtaking ascent, allowing you to admire the grandeur of the world below without facing the perils within.\n\n`)
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
                        .setDescription(`you visited ${location},The Husk of the ancient Orld Tree\n\n`)
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
                    
                }
                else if(collected.customId == "select_interior"){
                    await profileModel.updateOne({userID:authorId},{location:location})
               
                    if(location == 'Guild District'){
                        const attachment = new MessageAttachment('assets/Zorya/guild_district.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://guild_district.jpg')
                        .setDescription(`As you step into the Guild District of the Stateship of Zorya, the bustling streets unfold before you, lined with branches of the world's most renowned guilds. Dedicated guild rangers, sworn to safeguard the common-folk and brave perilous quests, traverse the vibrant thoroughfares. At the heart of it all, the colossal Colosseum looms, where the roads of the district converge, a testament to the unity and valor of these guilds.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Guild Office'){
                        const attachment = new MessageAttachment('assets/Zorya/guild_office.jpg')
                        let successembed
                        if(foundUser.guild == "None"){
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://guild_office.jpg')
                            .setDescription(`you visited a random ${location} but were restricted entry by the Guards\n\n`)
                             
                        }
                        else{
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://guild_office.jpg')
                            .setDescription(`you visited ${foundUser.guild}'s ${location}, As you enter the guild hall, you observe a bustling atmosphere filled with Rangers of varying ranks. The walls are adorned with faded banners and worn-out mission reports, a testament to the guild's history. The sound of camaraderie and training drills fills the air, as Rangers of different divisions hone their skills. Despite the lack of grandeur, there is an undeniable sense of determination and unity among the members, each striving to prove their worth and make their mark in the Ranger Association.\n\n.\n\n**use /questboard to view the Questboard**`)
                             
                        }
                        await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == `Auriga Sails Company`){
                        const attachment = new MessageAttachment('assets/Zorya/auriga_company.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://auriga_company.jpg')
                        .setDescription(`As you step into the Auriga Sails Company, your eyes are greeted by a bustling workshop where the world's most renowned shipwrights craft the sturdiest airships ever known. Their fame resonates in the Golden Dutchman Fleet, a majestic collection of merchant ships owned by the wealthiest of merchant families, proudly showcasing the shipwrights' unparalleled talent.\n\n use **/explore** to explore the location.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Astro Avenue'){
                        const attachment = new MessageAttachment('assets/Zorya/astro_avenue.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://astro_avenue.jpg')
                        .setDescription(`As you step onto Astro Avenue, a vibrant tapestry of sights and sounds envelops you. The bustling heart of the state comes alive with captivating attractions, lively street performers, and a plethora of delights, beckoning you to immerse yourself in its enchanting atmosphere.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Golden Terminal'){
                        const attachment = new MessageAttachment('assets/Zorya/golden_terminal.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://golden_terminal.jpg')
                        .setDescription(`As you arrive at the Golden Terminal, the sight of its magnificent copper architecture dazzles your eyes, reflecting the sunlight in a resplendent display. This bustling hub serves as a gateway for citizens and travelers seeking to embark on thrilling journeys across the Kingdom of Solarstrio, where the iconic Steam Train awaits, promising adventures beyond imagination, and roads unriddled with evils.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Castle Luminar'){
                        const attachment = new MessageAttachment('assets/Zorya/castle_chariots.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://castle_chariots.jpg')
                        .setDescription(` As you arrive at the Castle Luminar, your eyes behold a majestic fortress nestled in the heart of the Stateship of Zorya, serving as both the residence and administrative center for Earl Auriga, who oversees every facet of the state with unwavering dedication.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Siewelle Port'){
                        const attachment = new MessageAttachment('assets/Zorya/siewelle_port.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://siewelle_port.jpg')
                        .setDescription(`As you arrive at the bustling Siewelle Port, your eyes widen at the sight of its grandeur. The expansive harbor stretches before you, adorned with seven imposing piers, each protected by a towering sea gate, standing as sentinels of maritime trade and adventure.\n\n\n\nThis is a Shop location, you can use **/shop** here`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Black Market'){
                        const attachment = new MessageAttachment('assets/Zorya/black_market.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://black_market.jpg')
                        .setDescription(`As you descend into the shadowy depths beneath the Golden Terminal, your eyes widen at the sight of the clandestine Black Market. A hidden realm of intrigue and forbidden dealings, it offers a tantalizing array of rare artifacts and perilous experimental weapons, whispering secrets that promise power and danger.\n\n\n\nThis is a Shop location, you can use **/shop** here`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Sun Archives'){
                        const attachment = new MessageAttachment('assets/Zorya/sun_archives.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://sun_archives.jpg')
                        .setDescription(`When you reach the Sun Archives, you are greeted by an awe-inspiring sight. The grand entrance, adorned with intricate carvings and golden accents, opens up to a vast hall filled with rows upon rows of towering bookshelves. The air is filled with a faint scent of ancient parchment and the whispers of knowledge that seem to echo through the space. Sunlight streams in through stained glass windows, casting colorful patterns on the marble floor below.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Cloud Gardens'){
                        const attachment = new MessageAttachment('assets/Zorya/cloud_gardens.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://cloud_gardens.jpg')
                        .setDescription(`As you enter the Cloud Gardens, you find yourself immersed in a realm of beauty and innovation. The gardens are a marvel of engineering, with an intricate network of steam-powered mechanisms creating a breathtaking spectacle. Vibrant flowers, suspended in mid-air by delicate gears and pistons, bloom in a mesmerizing display of colors. Steam gently billows from ornate fountains, filling the air with a soothing mist.\n\n`)
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
                    
                    await interaction.editReply({embeds:[Interiorembed],components:[Interiorselect,btn_cancel]})
                    }
                else if(j.customId == "exterior"){
                    
                        await interaction.editReply({embeds:[Exteriorembed],components:[Exteriorselect,btn_cancel]})

                        }
                    
                
            })
        
        
        
                }
                else if(city_town == "ellior"){
                                        let Interiorembed
                                        let Exteriorembed
                                        let mount = "None"
                                        if(mount == "None"){
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT EXTERIOR LOCATION')
                                        .setDescription(`choose a place to travel outside ${city_town}`)
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
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
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
                                        
                                   Interiorembed = new MessageEmbed()
                                   .setColor('RANDOM')
                                   .setTitle('SELECT INTERIOR LOCATION')
                                   .setDescription(`Choose a location to visit in Zorya`)
                                   .addFields([
                                    {
                                        name: `Guild District`,
                                        value:`**Description**:A hub of adventurer guilds and the grand Colosseum arena.\n`
                                    },
                                    {
                                        name: `Guild Office`,
                                        value:`**Description**:The main Guild Office of many guilds around the world\n`
                                    },
                                    {
                                        name: `Auriga Sails Company`,
                                        value:`**Description**:A renowned shipbuilding workshop crafting sturdy vessels.\n`
                                    },
                                    {
                                        name: `Astro Avenue`,
                                        value:`**Description**:A vibrant thoroughfare lined with captivating attractions.\n`
                                    },
                                    {
                                        name: `Golden Terminal`,
                                        value:`**Description**:A bustling travel hub with majestic steam engine trains.\n`
                                    },
                                    {
                                        name: `Castle Luminar`,
                                        value:`**Description**:An imposing fortress residence of Earl Auriga.\n`
                                    },
                                    {
                                        name: `Siewelle Port`,
                                        value:`**Description**:A grand harbor with 7 piers guarded by towering sea gates.\n`
                                    },
                                    {
                                        name: `Black Market`,
                                        value:`**Description**:An underground network of illicit and experimental wares.\n`
                                    },
                                    {
                                        name: `Sun Archives`,
                                        value:`**Description**:A vast repository of knowledge and blueprints, where the echoes of history and innovation come alive.\n`
                                    },
                                    {
                                        name: `Cloud Gardens`,
                                        value:`**Description**:A mesmerizing fusion of nature and steam-powered marvels, where vibrant flowers bloom suspended in mid-air, creating an enchanting and tranquil visual.\n`
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

            let Interiorselect =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_interior')
                    .setPlaceholder(`Select a location ${interaction.user.username}`)
                    .addOptions({
                        label: `Guild District`,
                        description: ``,
                        value: `Guild District`,
                    },{
                        label: `Guild Office`,
                        description: ``,
                        value: `Guild Office`,
                    },
                    {
                        label: `Auriga Sails Company`,
                        description: ``,
                        value: `Auriga Sails Company`,
                    },{
                        label: `Astro Avenue`,
                        description: ``,
                        value: `Astro Avenue`,
                    },{
                        label: `Golden Terminal`,
                        description: ``,
                        value: `Golden Terminal`,
                    },{
                        label: `Castle Luminar`,
                        description: ``,
                        value: `Castle Luminar`,
                    },{
                        label: `Siewelle Port`,
                        description: ``,
                        value: `Siewelle Port`,
                    },{
                        label: `Black Market`,
                        description: ``,
                        value: `Black Market`,
                    },{
                        label: `Sun Archives`,
                        description: ``,
                        value: `Sun Archives`,
                    },{
                        label: `Cloud Gardens`,
                        description: ``,
                        value: `Cloud Gardens`,
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
                    if(location == 'Zorya'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/zorya_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://zorya_main.jpg')
                        .setDescription(`As you arrive in the Stateship of Zorya, one of the kingdom's largest states, the skyline greets you with a mesmerizing blend of architectural marvels, where progress and modernity have woven themselves into the very fabric of this bustling metropolis.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == `Dragon's Den`){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/dragon_den.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://dragon_den.jpg')
                        .setDescription(`As you enter the ominous Dragon's Den, a sense of awe and trepidation engulfs you. The remnants of the fallen Greater Dragon's lair echo with tales of unimaginable wealth and hidden perils, a haunting testament to the power that once dwelled within these hallowed grounds\n\n\n\n**Recommeded Level: 7**`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Zephyr Mountain'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/zephyr_mountain.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://zephyr_mountain.jpg')
                        .setDescription(`As you arrive at the majestic Zephyr Mountain, its towering presence commands your attention. A formidable barrier between kingdoms, its treacherous slopes hold both danger and allure, but a safe gondola ride offers a breathtaking ascent, allowing you to admire the grandeur of the world below without facing the perils within.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Sunstone Mines'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/sunstone_mines.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://sunstone_mines.jpg')
                        .setDescription(`As you arrive at the Sunstone Mines, a mesmerizing sight awaits. Sunlight dances upon the glistening walls, revealing veins of the coveted Sunstone, whose radiant glow fuels the Kingdom of Solarstrio's technological advancements and casts a warm aura of progress upon the land.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Orld Tree Husk'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/orld_husk.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://orld_husk.jpg')
                        .setDescription(`you visited ${location},The Husk of the ancient Orld Tree\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    
                collector_select.stop()
                collector_cancel.stop()
                    
                }
                else if(collected.customId == "select_interior"){
                    await profileModel.updateOne({userID:authorId},{location:location,city_town:"Zorya"})
               
                    if(location == 'Guild District'){
                        const attachment = new MessageAttachment('assets/Zorya/guild_district.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://guild_district.jpg')
                        .setDescription(`As you step into the Guild District of the Stateship of Zorya, the bustling streets unfold before you, lined with branches of the world's most renowned guilds. Dedicated guild rangers, sworn to safeguard the common-folk and brave perilous quests, traverse the vibrant thoroughfares. At the heart of it all, the colossal Colosseum looms, where the roads of the district converge, a testament to the unity and valor of these guilds.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Guild Office'){
                        const attachment = new MessageAttachment('assets/Zorya/guild_office.jpg')
                        let successembed
                        if(foundUser.guild == "None"){
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://guild_office.jpg')
                            .setDescription(`you visited a random ${location} but were restricted entry by the Guards\n\n`)
                             
                        }
                        else{
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://guild_office.jpg')
                            .setDescription(`you visited ${foundUser.guild}'s ${location}, As you enter the guild hall, you observe a bustling atmosphere filled with Rangers of varying ranks. The walls are adorned with faded banners and worn-out mission reports, a testament to the guild's history. The sound of camaraderie and training drills fills the air, as Rangers of different divisions hone their skills. Despite the lack of grandeur, there is an undeniable sense of determination and unity among the members, each striving to prove their worth and make their mark in the Ranger Association.\n\n.\n\n**use /questboard to view the Questboard**`)
                             
                        }
                        await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == `Auriga Sails Company`){
                        const attachment = new MessageAttachment('assets/Zorya/auriga_company.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://auriga_company.jpg')
                        .setDescription(`As you step into the Auriga Sails Company, your eyes are greeted by a bustling workshop where the world's most renowned shipwrights craft the sturdiest airships ever known. Their fame resonates in the Golden Dutchman Fleet, a majestic collection of merchant ships owned by the wealthiest of merchant families, proudly showcasing the shipwrights' unparalleled talent.\n\n use **/explore** to explore the location.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Astro Avenue'){
                        const attachment = new MessageAttachment('assets/Zorya/astro_avenue.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://astro_avenue.jpg')
                        .setDescription(`As you step onto Astro Avenue, a vibrant tapestry of sights and sounds envelops you. The bustling heart of the state comes alive with captivating attractions, lively street performers, and a plethora of delights, beckoning you to immerse yourself in its enchanting atmosphere.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Golden Terminal'){
                        const attachment = new MessageAttachment('assets/Zorya/golden_terminal.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://golden_terminal.jpg')
                        .setDescription(`As you arrive at the Golden Terminal, the sight of its magnificent copper architecture dazzles your eyes, reflecting the sunlight in a resplendent display. This bustling hub serves as a gateway for citizens and travelers seeking to embark on thrilling journeys across the Kingdom of Solarstrio, where the iconic Steam Train awaits, promising adventures beyond imagination, and roads unriddled with evils.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Castle Luminar'){
                        const attachment = new MessageAttachment('assets/Zorya/castle_chariots.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://castle_chariots.jpg')
                        .setDescription(` As you arrive at the Castle Luminar, your eyes behold a majestic fortress nestled in the heart of the Stateship of Zorya, serving as both the residence and administrative center for Earl Auriga, who oversees every facet of the state with unwavering dedication.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Siewelle Port'){
                        const attachment = new MessageAttachment('assets/Zorya/siewelle_port.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://siewelle_port.jpg')
                        .setDescription(`As you arrive at the bustling Siewelle Port, your eyes widen at the sight of its grandeur. The expansive harbor stretches before you, adorned with seven imposing piers, each protected by a towering sea gate, standing as sentinels of maritime trade and adventure.\n\n\n\nThis is a Shop location, you can use **/shop** here`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Black Market'){
                        const attachment = new MessageAttachment('assets/Zorya/black_market.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://black_market.jpg')
                        .setDescription(`As you descend into the shadowy depths beneath the Golden Terminal, your eyes widen at the sight of the clandestine Black Market. A hidden realm of intrigue and forbidden dealings, it offers a tantalizing array of rare artifacts and perilous experimental weapons, whispering secrets that promise power and danger.\n\n\n\nThis is a Shop location, you can use **/shop** here`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Sun Archives'){
                        const attachment = new MessageAttachment('assets/Zorya/sun_archives.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://sun_archives.jpg')
                        .setDescription(`When you reach the Sun Archives, you are greeted by an awe-inspiring sight. The grand entrance, adorned with intricate carvings and golden accents, opens up to a vast hall filled with rows upon rows of towering bookshelves. The air is filled with a faint scent of ancient parchment and the whispers of knowledge that seem to echo through the space. Sunlight streams in through stained glass windows, casting colorful patterns on the marble floor below.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Cloud Gardens'){
                        const attachment = new MessageAttachment('assets/Zorya/cloud_gardens.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://cloud_gardens.jpg')
                        .setDescription(`As you enter the Cloud Gardens, you find yourself immersed in a realm of beauty and innovation. The gardens are a marvel of engineering, with an intricate network of steam-powered mechanisms creating a breathtaking spectacle. Vibrant flowers, suspended in mid-air by delicate gears and pistons, bloom in a mesmerizing display of colors. Steam gently billows from ornate fountains, filling the air with a soothing mist.\n\n`)
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
                    
                    await interaction.editReply({embeds:[Interiorembed],components:[Interiorselect,btn_cancel]})
                    }
                else if(j.customId == "exterior"){
                    
                        await interaction.editReply({embeds:[Exteriorembed],components:[Exteriorselect,btn_cancel]})

                        }
                    
                
            })
        
        
        
        
                }
                else if(city_town == "Dragon's Den"){
                                        let Interiorembed
                                        let Exteriorembed
                                        let mount = "None"
                                        if(mount == "None"){
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT EXTERIOR LOCATION')
                                        .setDescription(`choose a place to travel outside ${city_town}`)
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
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
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
                                        
                                   Interiorembed = new MessageEmbed()
                                   .setColor('RANDOM')
                                   .setTitle('SELECT INTERIOR LOCATION')
                                   .setDescription(`Choose a location to visit in Zorya`)
                                   .addFields([
                                    {
                                        name: `Guild District`,
                                        value:`**Description**:A hub of adventurer guilds and the grand Colosseum arena.\n`
                                    },
                                    {
                                        name: `Guild Office`,
                                        value:`**Description**:The main Guild Office of many guilds around the world\n`
                                    },
                                    {
                                        name: `Auriga Sails Company`,
                                        value:`**Description**:A renowned shipbuilding workshop crafting sturdy vessels.\n`
                                    },
                                    {
                                        name: `Astro Avenue`,
                                        value:`**Description**:A vibrant thoroughfare lined with captivating attractions.\n`
                                    },
                                    {
                                        name: `Golden Terminal`,
                                        value:`**Description**:A bustling travel hub with majestic steam engine trains.\n`
                                    },
                                    {
                                        name: `Castle Luminar`,
                                        value:`**Description**:An imposing fortress residence of Earl Auriga.\n`
                                    },
                                    {
                                        name: `Siewelle Port`,
                                        value:`**Description**:A grand harbor with 7 piers guarded by towering sea gates.\n`
                                    },
                                    {
                                        name: `Black Market`,
                                        value:`**Description**:An underground network of illicit and experimental wares.\n`
                                    },
                                    {
                                        name: `Sun Archives`,
                                        value:`**Description**:A vast repository of knowledge and blueprints, where the echoes of history and innovation come alive.\n`
                                    },
                                    {
                                        name: `Cloud Gardens`,
                                        value:`**Description**:A mesmerizing fusion of nature and steam-powered marvels, where vibrant flowers bloom suspended in mid-air, creating an enchanting and tranquil visual.\n`
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

            let Interiorselect =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_interior')
                    .setPlaceholder(`Select a location ${interaction.user.username}`)
                    .addOptions({
                        label: `Guild District`,
                        description: ``,
                        value: `Guild District`,
                    },{
                        label: `Guild Office`,
                        description: ``,
                        value: `Guild Office`,
                    },
                    {
                        label: `Auriga Sails Company`,
                        description: ``,
                        value: `Auriga Sails Company`,
                    },{
                        label: `Astro Avenue`,
                        description: ``,
                        value: `Astro Avenue`,
                    },{
                        label: `Golden Terminal`,
                        description: ``,
                        value: `Golden Terminal`,
                    },{
                        label: `Castle Luminar`,
                        description: ``,
                        value: `Castle Luminar`,
                    },{
                        label: `Siewelle Port`,
                        description: ``,
                        value: `Siewelle Port`,
                    },{
                        label: `Black Market`,
                        description: ``,
                        value: `Black Market`,
                    },{
                        label: `Sun Archives`,
                        description: ``,
                        value: `Sun Archives`,
                    },{
                        label: `Cloud Gardens`,
                        description: ``,
                        value: `Cloud Gardens`,
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
                    if(location == 'Zorya'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/zorya_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://zorya_main.jpg')
                        .setDescription(`As you arrive in the Stateship of Zorya, one of the kingdom's largest states, the skyline greets you with a mesmerizing blend of architectural marvels, where progress and modernity have woven themselves into the very fabric of this bustling metropolis.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'ellior'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/ellior_forest.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://ellior_forest.jpg')
                        .setDescription(`As you enter the foreboding Ellior Forest, an eerie silence descends upon the air. Sinister shadows dance among the gnarled trees, whispering tales of malevolence and treachery, warning of the evil that lurks within its depths.\n\n\n\n**Recommeded Level: 5**`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Zephyr Mountain'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/zephyr_mountain.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://zephyr_mountain.jpg')
                        .setDescription(`As you arrive at the majestic Zephyr Mountain, its towering presence commands your attention. A formidable barrier between kingdoms, its treacherous slopes hold both danger and allure, but a safe gondola ride offers a breathtaking ascent, allowing you to admire the grandeur of the world below without facing the perils within.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Sunstone Mines'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/sunstone_mines.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://sunstone_mines.jpg')
                        .setDescription(`As you arrive at the Sunstone Mines, a mesmerizing sight awaits. Sunlight dances upon the glistening walls, revealing veins of the coveted Sunstone, whose radiant glow fuels the Kingdom of Solarstrio's technological advancements and casts a warm aura of progress upon the land.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Orld Tree Husk'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/orld_husk.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://orld_husk.jpg')
                        .setDescription(`you visited ${location},The Husk of the ancient Orld Tree\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    
                collector_select.stop()
                collector_cancel.stop()
                    
                }
                else if(collected.customId == "select_interior"){
                    await profileModel.updateOne({userID:authorId},{location:location,city_town:"Zorya"})
               
                    if(location == 'Guild District'){
                        const attachment = new MessageAttachment('assets/Zorya/guild_district.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://guild_district.jpg')
                        .setDescription(`As you step into the Guild District of the Stateship of Zorya, the bustling streets unfold before you, lined with branches of the world's most renowned guilds. Dedicated guild rangers, sworn to safeguard the common-folk and brave perilous quests, traverse the vibrant thoroughfares. At the heart of it all, the colossal Colosseum looms, where the roads of the district converge, a testament to the unity and valor of these guilds.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Guild Office'){
                        const attachment = new MessageAttachment('assets/Zorya/guild_office.jpg')
                        let successembed
                        if(foundUser.guild == "None"){
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://guild_office.jpg')
                            .setDescription(`you visited a random ${location} but were restricted entry by the Guards\n\n`)
                             
                        }
                        else{
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://guild_office.jpg')
                            .setDescription(`you visited ${foundUser.guild}'s ${location}, As you enter the guild hall, you observe a bustling atmosphere filled with Rangers of varying ranks. The walls are adorned with faded banners and worn-out mission reports, a testament to the guild's history. The sound of camaraderie and training drills fills the air, as Rangers of different divisions hone their skills. Despite the lack of grandeur, there is an undeniable sense of determination and unity among the members, each striving to prove their worth and make their mark in the Ranger Association.\n\n.\n\n**use /questboard to view the Questboard**`)
                             
                        }
                        await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == `Auriga Sails Company`){
                        const attachment = new MessageAttachment('assets/Zorya/auriga_company.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://auriga_company.jpg')
                        .setDescription(`As you step into the Auriga Sails Company, your eyes are greeted by a bustling workshop where the world's most renowned shipwrights craft the sturdiest airships ever known. Their fame resonates in the Golden Dutchman Fleet, a majestic collection of merchant ships owned by the wealthiest of merchant families, proudly showcasing the shipwrights' unparalleled talent.\n\n use **/explore** to explore the location.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Astro Avenue'){
                        const attachment = new MessageAttachment('assets/Zorya/astro_avenue.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://astro_avenue.jpg')
                        .setDescription(`As you step onto Astro Avenue, a vibrant tapestry of sights and sounds envelops you. The bustling heart of the state comes alive with captivating attractions, lively street performers, and a plethora of delights, beckoning you to immerse yourself in its enchanting atmosphere.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Golden Terminal'){
                        const attachment = new MessageAttachment('assets/Zorya/golden_terminal.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://golden_terminal.jpg')
                        .setDescription(`As you arrive at the Golden Terminal, the sight of its magnificent copper architecture dazzles your eyes, reflecting the sunlight in a resplendent display. This bustling hub serves as a gateway for citizens and travelers seeking to embark on thrilling journeys across the Kingdom of Solarstrio, where the iconic Steam Train awaits, promising adventures beyond imagination, and roads unriddled with evils.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Castle Luminar'){
                        const attachment = new MessageAttachment('assets/Zorya/castle_chariots.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://castle_chariots.jpg')
                        .setDescription(` As you arrive at the Castle Luminar, your eyes behold a majestic fortress nestled in the heart of the Stateship of Zorya, serving as both the residence and administrative center for Earl Auriga, who oversees every facet of the state with unwavering dedication.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Siewelle Port'){
                        const attachment = new MessageAttachment('assets/Zorya/siewelle_port.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://siewelle_port.jpg')
                        .setDescription(`As you arrive at the bustling Siewelle Port, your eyes widen at the sight of its grandeur. The expansive harbor stretches before you, adorned with seven imposing piers, each protected by a towering sea gate, standing as sentinels of maritime trade and adventure.\n\n\n\nThis is a Shop location, you can use **/shop** here`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Black Market'){
                        const attachment = new MessageAttachment('assets/Zorya/black_market.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://black_market.jpg')
                        .setDescription(`As you descend into the shadowy depths beneath the Golden Terminal, your eyes widen at the sight of the clandestine Black Market. A hidden realm of intrigue and forbidden dealings, it offers a tantalizing array of rare artifacts and perilous experimental weapons, whispering secrets that promise power and danger.\n\n\n\nThis is a Shop location, you can use **/shop** here`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Sun Archives'){
                        const attachment = new MessageAttachment('assets/Zorya/sun_archives.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://sun_archives.jpg')
                        .setDescription(`When you reach the Sun Archives, you are greeted by an awe-inspiring sight. The grand entrance, adorned with intricate carvings and golden accents, opens up to a vast hall filled with rows upon rows of towering bookshelves. The air is filled with a faint scent of ancient parchment and the whispers of knowledge that seem to echo through the space. Sunlight streams in through stained glass windows, casting colorful patterns on the marble floor below.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Cloud Gardens'){
                        const attachment = new MessageAttachment('assets/Zorya/cloud_gardens.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://cloud_gardens.jpg')
                        .setDescription(`As you enter the Cloud Gardens, you find yourself immersed in a realm of beauty and innovation. The gardens are a marvel of engineering, with an intricate network of steam-powered mechanisms creating a breathtaking spectacle. Vibrant flowers, suspended in mid-air by delicate gears and pistons, bloom in a mesmerizing display of colors. Steam gently billows from ornate fountains, filling the air with a soothing mist.\n\n`)
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
                    
                    await interaction.editReply({embeds:[Interiorembed],components:[Interiorselect,btn_cancel]})
                    }
                else if(j.customId == "exterior"){
                    
                        await interaction.editReply({embeds:[Exteriorembed],components:[Exteriorselect,btn_cancel]})

                        }
                    
                
            })
        
        
                }
                else if(city_town == "Sunstone Mines"){
                                        let Interiorembed
                                        let Exteriorembed
                                        let mount = "None"
                                        if(mount == "None"){
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT EXTERIOR LOCATION')
                                        .setDescription(`choose a place to travel outside ${city_town}`)
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
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
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
                                        
                                   Interiorembed = new MessageEmbed()
                                   .setColor('RANDOM')
                                   .setTitle('SELECT INTERIOR LOCATION')
                                   .setDescription(`Choose a location to visit in Zorya`)
                                   .addFields([
                                    {
                                        name: `Guild District`,
                                        value:`**Description**:A hub of adventurer guilds and the grand Colosseum arena.\n`
                                    },
                                    {
                                        name: `Guild Office`,
                                        value:`**Description**:The main Guild Office of many guilds around the world\n`
                                    },
                                    {
                                        name: `Auriga Sails Company`,
                                        value:`**Description**:A renowned shipbuilding workshop crafting sturdy vessels.\n`
                                    },
                                    {
                                        name: `Astro Avenue`,
                                        value:`**Description**:A vibrant thoroughfare lined with captivating attractions.\n`
                                    },
                                    {
                                        name: `Golden Terminal`,
                                        value:`**Description**:A bustling travel hub with majestic steam engine trains.\n`
                                    },
                                    {
                                        name: `Castle Luminar`,
                                        value:`**Description**:An imposing fortress residence of Earl Auriga.\n`
                                    },
                                    {
                                        name: `Siewelle Port`,
                                        value:`**Description**:A grand harbor with 7 piers guarded by towering sea gates.\n`
                                    },
                                    {
                                        name: `Black Market`,
                                        value:`**Description**:An underground network of illicit and experimental wares.\n`
                                    },
                                    {
                                        name: `Sun Archives`,
                                        value:`**Description**:A vast repository of knowledge and blueprints, where the echoes of history and innovation come alive.\n`
                                    },
                                    {
                                        name: `Cloud Gardens`,
                                        value:`**Description**:A mesmerizing fusion of nature and steam-powered marvels, where vibrant flowers bloom suspended in mid-air, creating an enchanting and tranquil visual.\n`
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

            let Interiorselect =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_interior')
                    .setPlaceholder(`Select a location ${interaction.user.username}`)
                    .addOptions({
                        label: `Guild District`,
                        description: ``,
                        value: `Guild District`,
                    },{
                        label: `Guild Office`,
                        description: ``,
                        value: `Guild Office`,
                    },
                    {
                        label: `Auriga Sails Company`,
                        description: ``,
                        value: `Auriga Sails Company`,
                    },{
                        label: `Astro Avenue`,
                        description: ``,
                        value: `Astro Avenue`,
                    },{
                        label: `Golden Terminal`,
                        description: ``,
                        value: `Golden Terminal`,
                    },{
                        label: `Castle Luminar`,
                        description: ``,
                        value: `Castle Luminar`,
                    },{
                        label: `Siewelle Port`,
                        description: ``,
                        value: `Siewelle Port`,
                    },{
                        label: `Black Market`,
                        description: ``,
                        value: `Black Market`,
                    },{
                        label: `Sun Archives`,
                        description: ``,
                        value: `Sun Archives`,
                    },{
                        label: `Cloud Gardens`,
                        description: ``,
                        value: `Cloud Gardens`,
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
                    if(location == 'Zorya'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/zorya_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://zorya_main.jpg')
                        .setDescription(`As you arrive in the Stateship of Zorya, one of the kingdom's largest states, the skyline greets you with a mesmerizing blend of architectural marvels, where progress and modernity have woven themselves into the very fabric of this bustling metropolis.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'ellior'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/ellior_forest.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://ellior_forest.jpg')
                        .setDescription(`As you enter the foreboding Ellior Forest, an eerie silence descends upon the air. Sinister shadows dance among the gnarled trees, whispering tales of malevolence and treachery, warning of the evil that lurks within its depths.\n\n\n\n**Recommeded Level: 5**`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Zephyr Mountain'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/zephyr_mountain.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://zephyr_mountain.jpg')
                        .setDescription(`As you arrive at the majestic Zephyr Mountain, its towering presence commands your attention. A formidable barrier between kingdoms, its treacherous slopes hold both danger and allure, but a safe gondola ride offers a breathtaking ascent, allowing you to admire the grandeur of the world below without facing the perils within.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == `Dragon's Den`){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/dragon_den.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://dragon_den.jpg')
                        .setDescription(`As you enter the ominous Dragon's Den, a sense of awe and trepidation engulfs you. The remnants of the fallen Greater Dragon's lair echo with tales of unimaginable wealth and hidden perils, a haunting testament to the power that once dwelled within these hallowed grounds\n\n\n\n**Recommeded Level: 7**`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Orld Tree Husk'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/orld_husk.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://orld_husk.jpg')
                        .setDescription(`you visited ${location},The Husk of the ancient Orld Tree\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    
                collector_select.stop()
                collector_cancel.stop()
                    
                }
                else if(collected.customId == "select_interior"){
                    await profileModel.updateOne({userID:authorId},{location:location,city_town:"Zorya"})
               
                    if(location == 'Guild District'){
                        const attachment = new MessageAttachment('assets/Zorya/guild_district.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://guild_district.jpg')
                        .setDescription(`As you step into the Guild District of the Stateship of Zorya, the bustling streets unfold before you, lined with branches of the world's most renowned guilds. Dedicated guild rangers, sworn to safeguard the common-folk and brave perilous quests, traverse the vibrant thoroughfares. At the heart of it all, the colossal Colosseum looms, where the roads of the district converge, a testament to the unity and valor of these guilds.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Guild Office'){
                        const attachment = new MessageAttachment('assets/Zorya/guild_office.jpg')
                        let successembed
                        if(foundUser.guild == "None"){
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://guild_office.jpg')
                            .setDescription(`you visited a random ${location} but were restricted entry by the Guards\n\n`)
                             
                        }
                        else{
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://guild_office.jpg')
                            .setDescription(`you visited ${foundUser.guild}'s ${location}, As you enter the guild hall, you observe a bustling atmosphere filled with Rangers of varying ranks. The walls are adorned with faded banners and worn-out mission reports, a testament to the guild's history. The sound of camaraderie and training drills fills the air, as Rangers of different divisions hone their skills. Despite the lack of grandeur, there is an undeniable sense of determination and unity among the members, each striving to prove their worth and make their mark in the Ranger Association.\n\n.\n\n**use /questboard to view the Questboard**`)
                             
                        }
                        await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == `Auriga Sails Company`){
                        const attachment = new MessageAttachment('assets/Zorya/auriga_company.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://auriga_company.jpg')
                        .setDescription(`As you step into the Auriga Sails Company, your eyes are greeted by a bustling workshop where the world's most renowned shipwrights craft the sturdiest airships ever known. Their fame resonates in the Golden Dutchman Fleet, a majestic collection of merchant ships owned by the wealthiest of merchant families, proudly showcasing the shipwrights' unparalleled talent.\n\n use **/explore** to explore the location.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Astro Avenue'){
                        const attachment = new MessageAttachment('assets/Zorya/astro_avenue.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://astro_avenue.jpg')
                        .setDescription(`As you step onto Astro Avenue, a vibrant tapestry of sights and sounds envelops you. The bustling heart of the state comes alive with captivating attractions, lively street performers, and a plethora of delights, beckoning you to immerse yourself in its enchanting atmosphere.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Golden Terminal'){
                        const attachment = new MessageAttachment('assets/Zorya/golden_terminal.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://golden_terminal.jpg')
                        .setDescription(`As you arrive at the Golden Terminal, the sight of its magnificent copper architecture dazzles your eyes, reflecting the sunlight in a resplendent display. This bustling hub serves as a gateway for citizens and travelers seeking to embark on thrilling journeys across the Kingdom of Solarstrio, where the iconic Steam Train awaits, promising adventures beyond imagination, and roads unriddled with evils.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Castle Luminar'){
                        const attachment = new MessageAttachment('assets/Zorya/castle_chariots.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://castle_chariots.jpg')
                        .setDescription(` As you arrive at the Castle Luminar, your eyes behold a majestic fortress nestled in the heart of the Stateship of Zorya, serving as both the residence and administrative center for Earl Auriga, who oversees every facet of the state with unwavering dedication.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Siewelle Port'){
                        const attachment = new MessageAttachment('assets/Zorya/siewelle_port.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://siewelle_port.jpg')
                        .setDescription(`As you arrive at the bustling Siewelle Port, your eyes widen at the sight of its grandeur. The expansive harbor stretches before you, adorned with seven imposing piers, each protected by a towering sea gate, standing as sentinels of maritime trade and adventure.\n\n\n\nThis is a Shop location, you can use **/shop** here`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Black Market'){
                        const attachment = new MessageAttachment('assets/Zorya/black_market.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://black_market.jpg')
                        .setDescription(`As you descend into the shadowy depths beneath the Golden Terminal, your eyes widen at the sight of the clandestine Black Market. A hidden realm of intrigue and forbidden dealings, it offers a tantalizing array of rare artifacts and perilous experimental weapons, whispering secrets that promise power and danger.\n\n\n\nThis is a Shop location, you can use **/shop** here`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Sun Archives'){
                        const attachment = new MessageAttachment('assets/Zorya/sun_archives.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://sun_archives.jpg')
                        .setDescription(`When you reach the Sun Archives, you are greeted by an awe-inspiring sight. The grand entrance, adorned with intricate carvings and golden accents, opens up to a vast hall filled with rows upon rows of towering bookshelves. The air is filled with a faint scent of ancient parchment and the whispers of knowledge that seem to echo through the space. Sunlight streams in through stained glass windows, casting colorful patterns on the marble floor below.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Cloud Gardens'){
                        const attachment = new MessageAttachment('assets/Zorya/cloud_gardens.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://cloud_gardens.jpg')
                        .setDescription(`As you enter the Cloud Gardens, you find yourself immersed in a realm of beauty and innovation. The gardens are a marvel of engineering, with an intricate network of steam-powered mechanisms creating a breathtaking spectacle. Vibrant flowers, suspended in mid-air by delicate gears and pistons, bloom in a mesmerizing display of colors. Steam gently billows from ornate fountains, filling the air with a soothing mist.\n\n`)
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
                    
                    await interaction.editReply({embeds:[Interiorembed],components:[Interiorselect,btn_cancel]})
                    }
                else if(j.customId == "exterior"){
                    
                        await interaction.editReply({embeds:[Exteriorembed],components:[Exteriorselect,btn_cancel]})

                        }
                    
                
            })
        
        
        
        
                }
                else if(city_town == "Zephyr Mountain"){
                                        let Interiorembed
                                        let Exteriorembed
                                        let mount = "None"
                                        if(mount == "None"){
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT EXTERIOR LOCATION')
                                        .setDescription(`choose a place to travel outside ${city_town}`)
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
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
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
                                        
                                   Interiorembed = new MessageEmbed()
                                   .setColor('RANDOM')
                                   .setTitle('SELECT INTERIOR LOCATION')
                                   .setDescription(`Choose a location to visit in Zorya`)
                                   .addFields([
                                    {
                                        name: `Guild District`,
                                        value:`**Description**:A hub of adventurer guilds and the grand Colosseum arena.\n`
                                    },
                                    {
                                        name: `Guild Office`,
                                        value:`**Description**:The main Guild Office of many guilds around the world\n`
                                    },
                                    {
                                        name: `Auriga Sails Company`,
                                        value:`**Description**:A renowned shipbuilding workshop crafting sturdy vessels.\n`
                                    },
                                    {
                                        name: `Astro Avenue`,
                                        value:`**Description**:A vibrant thoroughfare lined with captivating attractions.\n`
                                    },
                                    {
                                        name: `Golden Terminal`,
                                        value:`**Description**:A bustling travel hub with majestic steam engine trains.\n`
                                    },
                                    {
                                        name: `Castle Luminar`,
                                        value:`**Description**:An imposing fortress residence of Earl Auriga.\n`
                                    },
                                    {
                                        name: `Siewelle Port`,
                                        value:`**Description**:A grand harbor with 7 piers guarded by towering sea gates.\n`
                                    },
                                    {
                                        name: `Black Market`,
                                        value:`**Description**:An underground network of illicit and experimental wares.\n`
                                    },
                                    {
                                        name: `Sun Archives`,
                                        value:`**Description**:A vast repository of knowledge and blueprints, where the echoes of history and innovation come alive.\n`
                                    },
                                    {
                                        name: `Cloud Gardens`,
                                        value:`**Description**:A mesmerizing fusion of nature and steam-powered marvels, where vibrant flowers bloom suspended in mid-air, creating an enchanting and tranquil visual.\n`
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

            let Interiorselect =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_interior')
                    .setPlaceholder(`Select a location ${interaction.user.username}`)
                    .addOptions({
                        label: `Guild District`,
                        description: ``,
                        value: `Guild District`,
                    },{
                        label: `Guild Office`,
                        description: ``,
                        value: `Guild Office`,
                    },
                    {
                        label: `Auriga Sails Company`,
                        description: ``,
                        value: `Auriga Sails Company`,
                    },{
                        label: `Astro Avenue`,
                        description: ``,
                        value: `Astro Avenue`,
                    },{
                        label: `Golden Terminal`,
                        description: ``,
                        value: `Golden Terminal`,
                    },{
                        label: `Castle Luminar`,
                        description: ``,
                        value: `Castle Luminar`,
                    },{
                        label: `Siewelle Port`,
                        description: ``,
                        value: `Siewelle Port`,
                    },{
                        label: `Black Market`,
                        description: ``,
                        value: `Black Market`,
                    },{
                        label: `Sun Archives`,
                        description: ``,
                        value: `Sun Archives`,
                    },{
                        label: `Cloud Gardens`,
                        description: ``,
                        value: `Cloud Gardens`,
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
                    if(location == 'Zorya'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/zorya_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://zorya_main.jpg')
                        .setDescription(`As you arrive in the Stateship of Zorya, one of the kingdom's largest states, the skyline greets you with a mesmerizing blend of architectural marvels, where progress and modernity have woven themselves into the very fabric of this bustling metropolis.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'ellior'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/ellior_forest.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://ellior_forest.jpg')
                        .setDescription(`As you enter the foreboding Ellior Forest, an eerie silence descends upon the air. Sinister shadows dance among the gnarled trees, whispering tales of malevolence and treachery, warning of the evil that lurks within its depths.\n\n\n\n**Recommeded Level: 5**`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Sunstone Mines'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/sunstone_mines.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://sunstone_mines.jpg')
                        .setDescription(`As you arrive at the Sunstone Mines, a mesmerizing sight awaits. Sunlight dances upon the glistening walls, revealing veins of the coveted Sunstone, whose radiant glow fuels the Kingdom of Solarstrio's technological advancements and casts a warm aura of progress upon the land.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == `Dragon's Den`){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/dragon_den.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://dragon_den.jpg')
                        .setDescription(`As you enter the ominous Dragon's Den, a sense of awe and trepidation engulfs you. The remnants of the fallen Greater Dragon's lair echo with tales of unimaginable wealth and hidden perils, a haunting testament to the power that once dwelled within these hallowed grounds\n\n\n\n**Recommeded Level: 7**`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Orld Tree Husk'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/orld_husk.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://orld_husk.jpg')
                        .setDescription(`you visited ${location},The Husk of the ancient Orld Tree\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    
                collector_select.stop()
                collector_cancel.stop()
                    
                }
                else if(collected.customId == "select_interior"){
                    await profileModel.updateOne({userID:authorId},{location:location,city_town:"Zorya"})
               
                    if(location == 'Guild District'){
                        const attachment = new MessageAttachment('assets/Zorya/guild_district.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://guild_district.jpg')
                        .setDescription(`As you step into the Guild District of the Stateship of Zorya, the bustling streets unfold before you, lined with branches of the world's most renowned guilds. Dedicated guild rangers, sworn to safeguard the common-folk and brave perilous quests, traverse the vibrant thoroughfares. At the heart of it all, the colossal Colosseum looms, where the roads of the district converge, a testament to the unity and valor of these guilds.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Guild Office'){
                        const attachment = new MessageAttachment('assets/Zorya/guild_office.jpg')
                        let successembed
                        if(foundUser.guild == "None"){
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://guild_office.jpg')
                            .setDescription(`you visited a random ${location} but were restricted entry by the Guards\n\n`)
                             
                        }
                        else{
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://guild_office.jpg')
                            .setDescription(`you visited ${foundUser.guild}'s ${location}, As you enter the guild hall, you observe a bustling atmosphere filled with Rangers of varying ranks. The walls are adorned with faded banners and worn-out mission reports, a testament to the guild's history. The sound of camaraderie and training drills fills the air, as Rangers of different divisions hone their skills. Despite the lack of grandeur, there is an undeniable sense of determination and unity among the members, each striving to prove their worth and make their mark in the Ranger Association.\n\n.\n\n**use /questboard to view the Questboard**`)
                             
                        }
                        await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == `Auriga Sails Company`){
                        const attachment = new MessageAttachment('assets/Zorya/auriga_company.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://auriga_company.jpg')
                        .setDescription(`As you step into the Auriga Sails Company, your eyes are greeted by a bustling workshop where the world's most renowned shipwrights craft the sturdiest airships ever known. Their fame resonates in the Golden Dutchman Fleet, a majestic collection of merchant ships owned by the wealthiest of merchant families, proudly showcasing the shipwrights' unparalleled talent.\n\n use **/explore** to explore the location.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Astro Avenue'){
                        const attachment = new MessageAttachment('assets/Zorya/astro_avenue.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://astro_avenue.jpg')
                        .setDescription(`As you step onto Astro Avenue, a vibrant tapestry of sights and sounds envelops you. The bustling heart of the state comes alive with captivating attractions, lively street performers, and a plethora of delights, beckoning you to immerse yourself in its enchanting atmosphere.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Golden Terminal'){
                        const attachment = new MessageAttachment('assets/Zorya/golden_terminal.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://golden_terminal.jpg')
                        .setDescription(`As you arrive at the Golden Terminal, the sight of its magnificent copper architecture dazzles your eyes, reflecting the sunlight in a resplendent display. This bustling hub serves as a gateway for citizens and travelers seeking to embark on thrilling journeys across the Kingdom of Solarstrio, where the iconic Steam Train awaits, promising adventures beyond imagination, and roads unriddled with evils.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Castle Luminar'){
                        const attachment = new MessageAttachment('assets/Zorya/castle_chariots.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://castle_chariots.jpg')
                        .setDescription(` As you arrive at the Castle Luminar, your eyes behold a majestic fortress nestled in the heart of the Stateship of Zorya, serving as both the residence and administrative center for Earl Auriga, who oversees every facet of the state with unwavering dedication.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Siewelle Port'){
                        const attachment = new MessageAttachment('assets/Zorya/siewelle_port.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://siewelle_port.jpg')
                        .setDescription(`As you arrive at the bustling Siewelle Port, your eyes widen at the sight of its grandeur. The expansive harbor stretches before you, adorned with seven imposing piers, each protected by a towering sea gate, standing as sentinels of maritime trade and adventure.\n\n\n\nThis is a Shop location, you can use **/shop** here`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Black Market'){
                        const attachment = new MessageAttachment('assets/Zorya/black_market.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://black_market.jpg')
                        .setDescription(`As you descend into the shadowy depths beneath the Golden Terminal, your eyes widen at the sight of the clandestine Black Market. A hidden realm of intrigue and forbidden dealings, it offers a tantalizing array of rare artifacts and perilous experimental weapons, whispering secrets that promise power and danger.\n\n\n\nThis is a Shop location, you can use **/shop** here`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Sun Archives'){
                        const attachment = new MessageAttachment('assets/Zorya/sun_archives.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://sun_archives.jpg')
                        .setDescription(`When you reach the Sun Archives, you are greeted by an awe-inspiring sight. The grand entrance, adorned with intricate carvings and golden accents, opens up to a vast hall filled with rows upon rows of towering bookshelves. The air is filled with a faint scent of ancient parchment and the whispers of knowledge that seem to echo through the space. Sunlight streams in through stained glass windows, casting colorful patterns on the marble floor below.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Cloud Gardens'){
                        const attachment = new MessageAttachment('assets/Zorya/cloud_gardens.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://cloud_gardens.jpg')
                        .setDescription(`As you enter the Cloud Gardens, you find yourself immersed in a realm of beauty and innovation. The gardens are a marvel of engineering, with an intricate network of steam-powered mechanisms creating a breathtaking spectacle. Vibrant flowers, suspended in mid-air by delicate gears and pistons, bloom in a mesmerizing display of colors. Steam gently billows from ornate fountains, filling the air with a soothing mist.\n\n`)
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
                    
                    await interaction.editReply({embeds:[Interiorembed],components:[Interiorselect,btn_cancel]})
                    }
                else if(j.customId == "exterior"){
                    
                        await interaction.editReply({embeds:[Exteriorembed],components:[Exteriorselect,btn_cancel]})

                        }
                    
                
            })
        
        
        
        
                }
                else if(city_town == "Orld Tree Husk"){
                                        let Interiorembed1
                                        let Interiorembed2
                                        let Exteriorembed
                                        let mount = "None"
                                        if(mount == "None"){
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT EXTERIOR LOCATION')
                                        .setDescription(`choose a place to travel outside ${city_town}`)
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
                                            {
                                                name: `Capital of Gloaming`,
                                                value:`**Travelled on Stagecoach**\n**Description**: Majestic cityscape where history, commerce, and culture converge under the watchful eye of Castle Heliad, embodying Solarstrio's rich heritage and vibrant trade.\n**Cost**: 100 🪙\n`
                                            },
                                        ])
                                        
                                        }
                                        else{
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
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
                                            {
                                                name: `Capital of Gloaming`,
                                                value:`**Travelled on Spyralink**\n**Description**: Majestic cityscape where history, commerce, and culture converge under the watchful eye of Castle Heliad, embodying Solarstrio's rich heritage and vibrant trade.\n**Cost**: 0 🪙\n`
                                            },
                                        ])
    
                                        }
                                        
                                   Interiorembed1 = new MessageEmbed()
                                   .setColor('RANDOM')
                                   .setTitle('SELECT INTERIOR LOCATION')
                                   .setDescription(`Choose a location to visit in Zorya`)
                                   .addFields([
                                    {
                                        name: `Guild District`,
                                        value:`**Description**:A hub of adventurer guilds and the grand Colosseum arena.\n`
                                    },
                                    {
                                        name: `Guild Office`,
                                        value:`**Description**:The main Guild Office of many guilds around the world\n`
                                    },
                                    {
                                        name: `Auriga Sails Company`,
                                        value:`**Description**:A renowned shipbuilding workshop crafting sturdy vessels.\n`
                                    },
                                    {
                                        name: `Astro Avenue`,
                                        value:`**Description**:A vibrant thoroughfare lined with captivating attractions.\n`
                                    },
                                    {
                                        name: `Golden Terminal`,
                                        value:`**Description**:A bustling travel hub with majestic steam engine trains.\n`
                                    },
                                    {
                                        name: `Castle Luminar`,
                                        value:`**Description**:An imposing fortress residence of Earl Auriga.\n`
                                    },
                                    {
                                        name: `Siewelle Port`,
                                        value:`**Description**:A grand harbor with 7 piers guarded by towering sea gates.\n`
                                    },
                                    {
                                        name: `Black Market`,
                                        value:`**Description**:An underground network of illicit and experimental wares.\n`
                                    },
                                    {
                                        name: `Sun Archives`,
                                        value:`**Description**:A vast repository of knowledge and blueprints, where the echoes of history and innovation come alive.\n`
                                    },
                                    {
                                        name: `Cloud Gardens`,
                                        value:`**Description**:A mesmerizing fusion of nature and steam-powered marvels, where vibrant flowers bloom suspended in mid-air, creating an enchanting and tranquil visual.\n`
                                    }
                                   ])

                                   Interiorembed2 = new MessageEmbed()
                                   .setColor('RANDOM')
                                   .setTitle('SELECT INTERIOR LOCATION')
                                   .setDescription(`Choose a location to visit in ${city_town}`)
                                   .addFields([
                                    {
                                        name: `Capitol Central`,
                                        value:`**Description**:  A bustling hub of governance and diplomacy, where the kingdom's affairs are conducted.\n`
                                    },
                                    {
                                        name: `Badshahi Bazaar`,
                                        value:`**Description**: The vibrant heart of commerce and culture, where the sights beckon eager shoppers and curious wanderers alike.\n`
                                    },
                                    {
                                        name: `Spirit Arsenal`,
                                        value:`**Description**: A majestic tribute to valor and heritage, where legendary weapons of myth and legend stand.\n`
                                    },
                                    {
                                        name: `Gloaming Ranger Centre`,
                                        value:`**Description**: The hub of Ranger Activities under the jurisdiction of the Ranger Association.\n`
                                    },
                                    {
                                        name: `Solar Vault`,
                                        value:`**Description**: A secured bank where the wealth of the realm is safeguarded.\n`
                                    },
                                    {
                                        name: `Castle Heliad`,
                                        value:`**Description**: The majestic seat of Solarstrio's revered ruler King Helios\n`
                                    },
                                    {
                                        name: `Shahi Quila`,
                                        value:`**Description**: A culinary paradise where the rich flavors of the Mirazh Empire mingle with Solarstrio's hospitality.\n`
                                    }
                                   ])
        
        
        
                                   let btn_cancel = new MessageActionRow().addComponents([
                                    new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),
                                    new MessageButton().setCustomId("interior1").setStyle("PRIMARY").setLabel("Zorya Interior"),
                                    new MessageButton().setCustomId("interior2").setStyle("PRIMARY").setLabel("Gloaming Interior"),
                                    new MessageButton().setCustomId("exterior").setStyle("PRIMARY").setLabel("Exterior")])
        
        let Exteriorselect =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_exterior')
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
                    {
                        label: `Capital of Gloaming`,
                        description: ``,
                        value: `Gloaming`,
                    }
                    )
                    .setDisabled(false),
            ]) 

            let Interiorselect1 =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_interior')
                    .setPlaceholder(`Select a location ${interaction.user.username}`)
                    .addOptions({
                        label: `Guild District`,
                        description: ``,
                        value: `Guild District`,
                    },{
                        label: `Guild Office`,
                        description: ``,
                        value: `Guild Office`,
                    },
                    {
                        label: `Auriga Sails Company`,
                        description: ``,
                        value: `Auriga Sails Company`,
                    },{
                        label: `Astro Avenue`,
                        description: ``,
                        value: `Astro Avenue`,
                    },{
                        label: `Golden Terminal`,
                        description: ``,
                        value: `Golden Terminal`,
                    },{
                        label: `Castle Luminar`,
                        description: ``,
                        value: `Castle Luminar`,
                    },{
                        label: `Siewelle Port`,
                        description: ``,
                        value: `Siewelle Port`,
                    },{
                        label: `Black Market`,
                        description: ``,
                        value: `Black Market`,
                    },{
                        label: `Sun Archives`,
                        description: ``,
                        value: `Sun Archives`,
                    },{
                        label: `Cloud Gardens`,
                        description: ``,
                        value: `Cloud Gardens`,
                    },
                    
                    )
                    .setDisabled(false),
            ])
            let Interiorselect2 =   new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_interior2')
                    .setPlaceholder(`Select a location ${interaction.user.username}`)
                    .addOptions({
                        label: `Capitol Central`,
                        description: ``,
                        value: `Capitol Central`,
                    },{
                        label: `Badshahi Bazaar`,
                        description: ``,
                        value: `Badshahi Bazaar`,
                    },{
                        label: `Spirit Arsenal`,
                        description: ``,
                        value: `Spirit Arsenal`,
                    },{
                        label: `Gloaming Ranger Centre`,
                        description: ``,
                        value: `Gloaming Ranger Centre`,
                    },{
                        label: `Solar Vault`,
                        description: ``,
                        value: `Solar Vault`,
                    },{
                        label: `Castle Heliad`,
                        description: ``,
                        value: `Castle Heliad`,
                    },{
                        label: `Shahi Quila`,
                        description: ``,
                        value: `Shahi Quila`,
                    }
                    
                    )
                    .setDisabled(false),
            ])  
            let filter_select = (interaction : any) => interaction.user.id === authorId && (interaction.customId == "select_interior" || interaction.customId == "select_interior2" || interaction.customId == "select_exterior")
            let filter_cancel = (interaction : any) => interaction.user.id === authorId && (interaction.customId == "cancel" || interaction.customId == "interior1"|| interaction.customId == "interior2" || interaction.customId == "exterior")    
            let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select,time:1000*300 })
            let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel,time:1000*300 })
        
            
        
        
            await interaction.reply({content: null,embeds:[Interiorembed1],components:[Interiorselect1,btn_cancel]})
        
            collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                collected.deferUpdate().catch(() => null)
                const location = collected.values[0]
                
                if(collected.customId == "select_exterior"){
                    if(location == 'Zorya'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/zorya_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://zorya_main.jpg')
                        .setDescription(`As you arrive in the Stateship of Zorya, one of the kingdom's largest states, the skyline greets you with a mesmerizing blend of architectural marvels, where progress and modernity have woven themselves into the very fabric of this bustling metropolis.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'ellior'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/ellior_forest.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://ellior_forest.jpg')
                        .setDescription(`As you enter the foreboding Ellior Forest, an eerie silence descends upon the air. Sinister shadows dance among the gnarled trees, whispering tales of malevolence and treachery, warning of the evil that lurks within its depths.\n\n\n\n**Recommeded Level: 5**`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Sunstone Mines'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/sunstone_mines.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://sunstone_mines.jpg')
                        .setDescription(`As you arrive at the Sunstone Mines, a mesmerizing sight awaits. Sunlight dances upon the glistening walls, revealing veins of the coveted Sunstone, whose radiant glow fuels the Kingdom of Solarstrio's technological advancements and casts a warm aura of progress upon the land.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == `Dragon's Den`){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/dragon_den.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://dragon_den.jpg')
                        .setDescription(`As you enter the ominous Dragon's Den, a sense of awe and trepidation engulfs you. The remnants of the fallen Greater Dragon's lair echo with tales of unimaginable wealth and hidden perils, a haunting testament to the power that once dwelled within these hallowed grounds\n\n\n\n**Recommeded Level: 7**`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Zephyr Mountain'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/zephyr_mountain.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://zephyr_mountain.jpg')
                        .setDescription(`As you arrive at the majestic Zephyr Mountain, its towering presence commands your attention. A formidable barrier between kingdoms, its treacherous slopes hold both danger and allure, but a safe gondola ride offers a breathtaking ascent, allowing you to admire the grandeur of the world below without facing the perils within.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    
                collector_select.stop()
                collector_cancel.stop()
                    
                }
                else if(collected.customId == "select_interior"){
                    await profileModel.updateOne({userID:authorId},{location:location,city_town:"Zorya"})
               
                    if(location == 'Guild District'){
                        const attachment = new MessageAttachment('assets/Zorya/guild_district.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://guild_district.jpg')
                        .setDescription(`As you step into the Guild District of the Stateship of Zorya, the bustling streets unfold before you, lined with branches of the world's most renowned guilds. Dedicated guild rangers, sworn to safeguard the common-folk and brave perilous quests, traverse the vibrant thoroughfares. At the heart of it all, the colossal Colosseum looms, where the roads of the district converge, a testament to the unity and valor of these guilds.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Guild Office'){
                        const attachment = new MessageAttachment('assets/Zorya/guild_office.jpg')
                        let successembed
                        if(foundUser.guild == "None"){
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://guild_office.jpg')
                            .setDescription(`you visited a random ${location} but were restricted entry by the Guards\n\n`)
                             
                        }
                        else{
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://guild_office.jpg')
                            .setDescription(`you visited ${foundUser.guild}'s ${location}, As you enter the guild hall, you observe a bustling atmosphere filled with Rangers of varying ranks. The walls are adorned with faded banners and worn-out mission reports, a testament to the guild's history. The sound of camaraderie and training drills fills the air, as Rangers of different divisions hone their skills. Despite the lack of grandeur, there is an undeniable sense of determination and unity among the members, each striving to prove their worth and make their mark in the Ranger Association.\n\n.\n\n**use /questboard to view the Questboard**`)
                             
                        }
                        await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == `Auriga Sails Company`){
                        const attachment = new MessageAttachment('assets/Zorya/auriga_company.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://auriga_company.jpg')
                        .setDescription(`As you step into the Auriga Sails Company, your eyes are greeted by a bustling workshop where the world's most renowned shipwrights craft the sturdiest airships ever known. Their fame resonates in the Golden Dutchman Fleet, a majestic collection of merchant ships owned by the wealthiest of merchant families, proudly showcasing the shipwrights' unparalleled talent.\n\n use **/explore** to explore the location.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Astro Avenue'){
                        const attachment = new MessageAttachment('assets/Zorya/astro_avenue.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://astro_avenue.jpg')
                        .setDescription(`As you step onto Astro Avenue, a vibrant tapestry of sights and sounds envelops you. The bustling heart of the state comes alive with captivating attractions, lively street performers, and a plethora of delights, beckoning you to immerse yourself in its enchanting atmosphere.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Golden Terminal'){
                        const attachment = new MessageAttachment('assets/Zorya/golden_terminal.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://golden_terminal.jpg')
                        .setDescription(`As you arrive at the Golden Terminal, the sight of its magnificent copper architecture dazzles your eyes, reflecting the sunlight in a resplendent display. This bustling hub serves as a gateway for citizens and travelers seeking to embark on thrilling journeys across the Kingdom of Solarstrio, where the iconic Steam Train awaits, promising adventures beyond imagination, and roads unriddled with evils.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Castle Luminar'){
                        const attachment = new MessageAttachment('assets/Zorya/castle_chariots.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://castle_chariots.jpg')
                        .setDescription(` As you arrive at the Castle Luminar, your eyes behold a majestic fortress nestled in the heart of the Stateship of Zorya, serving as both the residence and administrative center for Earl Auriga, who oversees every facet of the state with unwavering dedication.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Siewelle Port'){
                        const attachment = new MessageAttachment('assets/Zorya/siewelle_port.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://siewelle_port.jpg')
                        .setDescription(`As you arrive at the bustling Siewelle Port, your eyes widen at the sight of its grandeur. The expansive harbor stretches before you, adorned with seven imposing piers, each protected by a towering sea gate, standing as sentinels of maritime trade and adventure.\n\n\n\nThis is a Shop location, you can use **/shop** here`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Black Market'){
                        const attachment = new MessageAttachment('assets/Zorya/black_market.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://black_market.jpg')
                        .setDescription(`As you descend into the shadowy depths beneath the Golden Terminal, your eyes widen at the sight of the clandestine Black Market. A hidden realm of intrigue and forbidden dealings, it offers a tantalizing array of rare artifacts and perilous experimental weapons, whispering secrets that promise power and danger.\n\n\n\nThis is a Shop location, you can use **/shop** here`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Sun Archives'){
                        const attachment = new MessageAttachment('assets/Zorya/sun_archives.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://sun_archives.jpg')
                        .setDescription(`When you reach the Sun Archives, you are greeted by an awe-inspiring sight. The grand entrance, adorned with intricate carvings and golden accents, opens up to a vast hall filled with rows upon rows of towering bookshelves. The air is filled with a faint scent of ancient parchment and the whispers of knowledge that seem to echo through the space. Sunlight streams in through stained glass windows, casting colorful patterns on the marble floor below.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Cloud Gardens'){
                        const attachment = new MessageAttachment('assets/Zorya/cloud_gardens.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://cloud_gardens.jpg')
                        .setDescription(`As you enter the Cloud Gardens, you find yourself immersed in a realm of beauty and innovation. The gardens are a marvel of engineering, with an intricate network of steam-powered mechanisms creating a breathtaking spectacle. Vibrant flowers, suspended in mid-air by delicate gears and pistons, bloom in a mesmerizing display of colors. Steam gently billows from ornate fountains, filling the air with a soothing mist.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                collector_select.stop()
                collector_cancel.stop()
               
                }
                else if(collected.customId == "select_interior"){
                    await profileModel.updateOne({userID:authorId},{location:location})
               
                    if(location == 'Capitol Central'){
                        const attachment = new MessageAttachment('assets/Gloaming/capitol_central.jpeg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://capitol_central.jpeg')
                        .setDescription(`As you step into Capitol Central, the air is alive with the sound of hurried footsteps and the murmur of whispered conversations. Marble corridors adorned with intricate tapestries lead to vast chambers filled with ornate furnishings and imposing figures engaged in heated debates.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Badshahi Bazaar'){
                        const attachment = new MessageAttachment('assets/Gloaming/badshahi_bazaar.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://badshahi_bazaar.jpeg')
                            .setDescription(`Entering Badshahi Bazaar, you're immediately enveloped in a whirlwind of activity. Colorful stalls line bustling streets, their wares displayed in a riot of hues and textures. Merchants call out in melodic voices, extolling the virtues of their goods as shoppers haggle and bargain amidst the vibrant chaos.\n\nThis is a shop location, use **/shop** to open the shop`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Spirit Arsenal'){
                        const attachment = new MessageAttachment('assets/Gloaming/spirit_arsenal.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://spirit_arsenal.jpeg')
                            .setDescription(`Stepping into the Spirit Arsenal, you're greeted by a sense of awe and reverence. The Towering column of stone rise majestically, its surfaces adorned with intricately engraved weapons of every shape and size. Each blade tells a story of courage and sacrifice, its craftsmanship a testament to the skill of the ancient artisan.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Gloaming Ranger Centre'){
                        const attachment = new MessageAttachment('assets/Gloaming/gloaming_rangercentre.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://gloaming_rangercentre.jpeg')
                            .setDescription(`As you step into the Gloaming Ranger Centre, you're greeted by the sight of seasoned rangers clad in weathered armor and rugged attire. Rangers of every ilk and background bustle about, sharpening blades, mending gear, and trading tales of daring exploits.\n\n**use /questboard to view the Questboard**`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Solar Vault'){
                        const attachment = new MessageAttachment('assets/Gloaming/solar_vault.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://solar_vault.jpeg')
                            .setDescription(`Entering the Solar Vault, you're struck by the aura of wealth and power that permeates the air. Vaulted ceilings soar overhead, adorned with intricate carvings and gilded embellishments that speak of opulence and grandeur. Rows of polished teller stations stretch into the distance, attended by bankers.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    } 
                    else if(location == 'Castle Heliad'){
                        const attachment = new MessageAttachment('assets/Gloaming/castle_heliad.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://castle_heliad.jpeg')
                            .setDescription(`Ascending into Castle Heliad, you're greeted by the imposing splendor of its architecture. Stone pillars rise skyward, supporting the weight of the castle above, while banners bearing the sigil of the king flutter in the breeze. Helios Aureus clad in gleaming armor stand sentinel at every corner, their vigilant watch speaking to the kingdom's unwavering military might`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Shahi Quila'){
                        const attachment = new MessageAttachment('assets/Gloaming/shahi_quila.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://shahi_quila.jpeg')
                            .setDescription(`Stepping into Shahi Quila, you're greeted by the tantalizing aroma of spices and sizzling meats, mingling with the warm glow of lanterns and the lively chatter of diners. Tables adorned with richly embroidered cloths beckon guests to indulge in savory delicacies, served with a generous side of hospitality by bustling waitstaff clad in traditional attire.`)
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
                else if(j.customId == "interior1"){
                    
                    await interaction.editReply({embeds:[Interiorembed1],components:[Interiorselect1,btn_cancel]})
                    }
                else if(j.customId == "interior2"){
                    
                        await interaction.editReply({embeds:[Interiorembed2],components:[Interiorselect2,btn_cancel]})
                    }
                else if(j.customId == "exterior"){
                    
                        await interaction.editReply({embeds:[Exteriorembed],components:[Exteriorselect,btn_cancel]})

                        }
                    
                
            })
        
        
        
                }
                else if(city_town == "Werfall"){
                    let Interiorembed
                                        let Exteriorembed
                                        let mount = "None"
                                        if(mount == "None"){
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT EXTERIOR LOCATION')
                                        .setDescription(`choose a place to travel outside ${city_town}`)
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
                                            Exteriorembed = new MessageEmbed()
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
                                        
                                   Interiorembed = new MessageEmbed()
                                   .setColor('RANDOM')
                                   .setTitle('SELECT INTERIOR LOCATION')
                                   .setDescription(`Choose a location to visit in ${city_town}`)
                                   .addFields([
                                    {
                                        name: `Ranger Tents`,
                                        value:`**Description**:A sprawling encampment housing determined yet weary rangers.\n`
                                    },
                                    {
                                        name: `Werfall Ranger Centre`,
                                        value:`**Description**:A strategic command center coordinating efforts against the nightmare.\n`
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

            let Interiorselect =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_interior')
                    .setPlaceholder(`Select a location ${interaction.user.username}`)
                    .addOptions({
                        label: `Ranger Tents`,
                        description: ``,
                        value: `Ranger Tents`,
                    },{
                        label: `Werfall Ranger Centre`,
                        description: ``,
                        value: `Werfall Ranger Centre`,
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
                    if(location == 'Zorya'){
                        if(foundUser.coins >=150 && foundUser.mount == "None"){
                            await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-150,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/zorya_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://zorya_main.jpg')
                        .setDescription(`As you arrive in the Stateship of Zorya, one of the kingdom's largest states, the skyline greets you with a mesmerizing blend of architectural marvels, where progress and modernity have woven themselves into the very fabric of this bustling metropolis.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else if(foundUser.mount != "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/zorya_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://zorya_main.jpg')
                        .setDescription(`As you arrive in the Stateship of Zorya, one of the kingdom's largest states, the skyline greets you with a mesmerizing blend of architectural marvels, where progress and modernity have woven themselves into the very fabric of this bustling metropolis.\n\n`)
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
                        .setDescription(`As you arrive in the state of Vigia, a fortified sanctuary nestled in the heart of Solarstrio, the cityscape unfolds before your eyes, showcasing a harmonious fusion of history and resilience. The towering walls of Vigia, known as the SolGate, stand as a testament to the city's unwavering defense against the menacing DeathRust forest. Within its protective embrace, Vigia thrives as a vibrant hub, where echoes of the past reverberate through its streets. The city's charm lies in its lively atmosphere, adorned with museums, monuments, and a sense of time-honored significance.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else if(foundUser.mount != "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Vigia/vigia_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://vigia_main.jpg')
                        .setDescription(`As you arrive in the state of Vigia, a fortified sanctuary nestled in the heart of Solarstrio, the cityscape unfolds before your eyes, showcasing a harmonious fusion of history and resilience. The towering walls of Vigia, known as the SolGate, stand as a testament to the city's unwavering defense against the menacing DeathRust forest. Within its protective embrace, Vigia thrives as a vibrant hub, where echoes of the past reverberate through its streets. The city's charm lies in its lively atmosphere, adorned with museums, monuments, and a sense of time-honored significance.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else{
                            interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                        }
                        
                    }
                    
                collector_select.stop()
                collector_cancel.stop()
                    
                }
                else if(collected.customId == "select_interior"){
                    await profileModel.updateOne({userID:authorId},{location:location})
               
                    if(location == 'Ranger Tents'){
                        const attachment = new MessageAttachment('assets/Werfall/ranger_tents.jpeg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://ranger_tents.jpeg')
                        .setDescription(`Arriving at the heart of Werfall, you are met with the sight of the Ranger Tents. These canvas sanctuaries, bearing the distinctive marks of the "Emperal Brigade" and various Guilds dot the landscape, a stark contrast against the backdrop of ruin. Your footsteps echo softly as you navigate the narrow pathways between the tents. Rangers move with purpose, their faces etched with determination as they mend gear, resupply, and attend to their wounded companions. The atmosphere exudes a somber camaraderie, a testament to the unbreakable bonds forged amidst adversity, as the Rangers stand united against the encroaching darkness.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Werfall Ranger Centre'){
                        const attachment = new MessageAttachment('assets/Werfall/ranger_centre.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://ranger_centre.jpeg')
                            .setDescription(`Your footsteps lead you to the heart of Werfall, where the Werfall Ranger Centre stands resolute. Its weathered walls, bearing witness to the town's tumultuous history, exude an air of defiance. Stepping through its entrance, you are met with a scene of purposeful activity. The scent of herbs and ink fills the air, a reminder of the centre's dual roles in both healing and planning. Rangers and medics work in harmony, exchanging nods and soft words as they carry out their duties. The centre pulses with an unyielding spirit, a symbol of resilience in the face of the unrelenting challenges that have befallen Werfall.\n\n`)
                             
                       
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
                    
                    await interaction.editReply({embeds:[Interiorembed],components:[Interiorselect,btn_cancel]})
                    }
                else if(j.customId == "exterior"){
                    
                        await interaction.editReply({embeds:[Exteriorembed],components:[Exteriorselect,btn_cancel]})

                        }
                    
                
            })
        
        
                }
                else if(city_town == "Vigia"){
                    let Interiorembed
                                        let Exteriorembed
                                        let mount = "None"
                                        if(mount == "None"){
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT EXTERIOR LOCATION')
                                        .setDescription(`choose a place to travel outside ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Township of Werfall`,
                                                value:`**Travelled on Stagecoach**\n**Description**:Werfall, once a thriving trade hub known for efficient distribution, collapsed due to a mysterious incident, leaving its lands infertile. Now a war-torn battleground between Abyssals and Rangers, the town's former prosperity is but a memory.\n**Cost**:150 🪙\n`
                                            },
                                            {
                                                name: `Township of Kafig`,
                                                value:`**Travelled on Stagecoach**\n**Description**:Kafig, a vibrant town nestled near the mystical Asche Peak, where the locals revere Avian Spyriths, especially the mythical Radohn, and thrive in a bustling market for flying spyriths.\n**Cost**:100 🪙\n`
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
                                            Exteriorembed = new MessageEmbed()
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
                                                value:`**Travelled on Spyralink**\n**Description**:Kafig, a vibrant town nestled near the mystical Asche Peak, where the locals revere Avian Spyriths, especially the mythical Radohn, and thrive in a bustling market for flying spyriths.\n**Cost**: 0 🪙\n`
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
                                        
                                   Interiorembed = new MessageEmbed()
                                   .setColor('RANDOM')
                                   .setTitle('SELECT INTERIOR LOCATION')
                                   .setDescription(`Choose a location to visit in ${city_town}`)
                                   .addFields([
                                    {
                                        name: `Trinity Plateau`,
                                        value:`**Description**: A Monument where three swords remain sheathed in a pact between warriors long forgotten.\n`
                                    },
                                    {
                                        name: `Temple of Tears`,
                                        value:`**Description**:  A temple within weeping stone carved in tears of a God\n`
                                    },
                                    {
                                        name: `Esparta Museum`,
                                        value:`**Description**:  A treasure trove of history within Vigia's hallowed halls. One of the biggest Museums on Vearth.\n`
                                    },
                                    {
                                        name: `Sol Barracks`,
                                        value:`**Description**:  The Armory,Training Grounds and Residential Quarters of the Sol Crusaders.Military Grade equipment are also sold to licensed Rangers.\n`
                                    },
                                    {
                                        name: `Fort Primis`,
                                        value:`**Description**:  The imposing bastion where the Sol Crusaders hold vigil against the Death Rust. It is the first fort of the Sol Gate and the HQ of Sol Crusaders.\n`
                                    },
                                    {
                                        name: `Castle Arcemis`,
                                        value:`**Description**:   Earl Arvid's towering seat of power overlooking the city.\n`
                                    },
                                    {
                                        name: `Ruins of Eldorath`,
                                        value:`**Description**:   Crumbling fragments of a lost civilization faded in history.\n`
                                    },
                                    {
                                        name: `Vigia Ranger Centre`,
                                        value:`**Description**:   Vigia's official Ranger Centre bold rangers gather for quests on the frontier's edge.\n`
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

            let Interiorselect =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_interior')
                    .setPlaceholder(`Select a location ${interaction.user.username}`)
                    .addOptions({
                        label: `Trinity Plateau`,
                        description: ``,
                        value: `Trinity Plateau`,
                    },{
                        label: `Temple of Tears`,
                        description: ``,
                        value: `Temple of Tears`,
                    },{
                        label: `Esparta Museum`,
                        description: ``,
                        value: `Esparta Museum`,
                    },{
                        label: `Sol Barracks`,
                        description: ``,
                        value: `Sol Barracks`,
                    },{
                        label: `Fort Primis`,
                        description: ``,
                        value: `Fort Primis`,
                    },{
                        label: `Castle Arcemis`,
                        description: ``,
                        value: `Castle Arcemis`,
                    },{
                        label: `Ruins of Eldorath`,
                        description: ``,
                        value: `Ruins of Eldorath`,
                    },{
                        label: `Vigia Ranger Centre`,
                        description: ``,
                        value: `Vigia Ranger Centre`,
                    }
                    
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
                    if(location == 'Werfall'){
                        if(foundUser.coins >=150 && foundUser.mount == "None"){
                            await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-150,location:"None"})
                        const attachment = new MessageAttachment('assets/Werfall/werfall_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://werfall_main.jpg')
                        .setDescription(`As You approached the outskirts of Werfall, an eerie transformation was evident. Once a thriving hub of commerce, the town now exuded an air of bleakness and despair. Tents, emblazoned with the emblem of the "Emperal Brigade," sprawled across the landscape, housing a mix of rangers and medics in a poignant display of organized chaos. The streets, once teeming with life, were now pathways of decay and abandonment. The atmosphere was heavy with a sense of death that had permeated every corner of the town, leaving behind an indelible mark of loss. The toll of this ruinous affliction was evident in the haunted gazes of those who moved among the tents, their once-strong spirits shattered by the unforgiving grip of the town's tragic fate.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else if(foundUser.mount != "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Werfall/werfall_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://werfall_main.jpg')
                        .setDescription(`As You approached the outskirts of Werfall, an eerie transformation was evident. Once a thriving hub of commerce, the town now exuded an air of bleakness and despair. Tents, emblazoned with the emblem of the "Emperal Brigade," sprawled across the landscape, housing a mix of rangers and medics in a poignant display of organized chaos. The streets, once teeming with life, were now pathways of decay and abandonment. The atmosphere was heavy with a sense of death that had permeated every corner of the town, leaving behind an indelible mark of loss. The toll of this ruinous affliction was evident in the haunted gazes of those who moved among the tents, their once-strong spirits shattered by the unforgiving grip of the town's tragic fate.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else{
                            interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                        }
                        
                    }
                    else if(location == 'Kafig'){
                        if(foundUser.coins >=100 && foundUser.mount == "None"){
                            await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-100,location:"None"})
                        const attachment = new MessageAttachment('assets/Kafig/kafig_main.jpeg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://kafig_main.jpeg')
                        .setDescription(`As you enter Kafig, vibrant bird houses adorn every corner of the bustling town, creating a picturesque scene. The Avian Square, with its central obsidian statue, stands as a focal point amidst the lively atmosphere. Traders and merchants add to the visual tapestry, drawn to the town's reputation as a thriving market for flying spyriths, while the air carries a sense of reverence for the mythical Avian Spyriths.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else if(foundUser.mount != "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Kafig/kafig_main.jpeg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://kafig_main.jpg')
                        .setDescription(`As you enter Kafig, vibrant bird houses adorn every corner of the bustling town, creating a picturesque scene. The Avian Square, with its central obsidian statue, stands as a focal point amidst the lively atmosphere. Traders and merchants add to the visual tapestry, drawn to the town's reputation as a thriving market for flying spyriths, while the air carries a sense of reverence for the mythical Avian Spyriths.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else{
                            interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                        }
                        
                    }
                    else if(location == 'Asche Peak'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Kafig/asche_peak.jpeg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://asche_peak.jpeg')
                        .setDescription(`As you reach Asche Peak, the landscape transforms into a surreal panorama of charred hills and blackened soil. The air is thick with an intense heat, radiating from the ground that gives the hill its soot-like black color. Avian Spyriths, both friendly and hostile, fill the skies, adding life to the mysterious hill. The legend of Radohn, the flame-draped ruler of the skies, lingers in the atmosphere, shrouding Asche Peak in an aura of mythical beauty.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Deathrust Forest'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/zephyr_mountain.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://zephyr_mountain.jpg')
                        .setDescription(`As you enter DeathRust Forest, the sight is eerie and still. Tall, old trees stand like ghostly statues, their branches reaching out like twisted fingers against a gray, lifeless sky. The ground is covered in dry leaves and brittle plants, creating a carpet of quiet decay. A hazy mist hangs in the air, giving the whole place a ghostly atmosphere. The once-green forest now seems like a graveyard, with rusted figures scattered around—those mindless iron zombies, the Ferromites, blending into the haunting scenery, their skeletal shapes telling a tale of a place forgotten and left to rust.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    
                    
                collector_select.stop()
                collector_cancel.stop()
                    
                }
                else if(collected.customId == "select_interior"){
                    await profileModel.updateOne({userID:authorId},{location:location})
               
                    if(location == 'Trinity Plateau'){
                        const attachment = new MessageAttachment('assets/Vigia/trinity_plateau.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://trinity_plateau.jpg')
                        .setDescription(`Climbing the switchback path, the plateau emerges like an oasis amid Vigia's stone walls. Three great swords stand frozen in combat atop grassy banks. In the distance, the SolGate stands eternal vigil, and beyond - the ominous shadow of DeathRust looms.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Temple of Tears'){
                        const attachment = new MessageAttachment('assets/Vigia/templeoftears.jpg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage(`attachment://ranger_centre.jpg`)
                            .setDescription(`Dark and foreboding, Morozh's temple is hewn from age-old stone. Weeping faces spout an endless stream upon which solace seekers float candles in tribute. Shadows dance as you enter, feeling suddenly small beneath the arched passages. What rest may be found in despair's domain?\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Esparta Museum'){
                        const attachment = new MessageAttachment('assets/Vigia/esparta.jpg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://esparta.jpg')
                            .setDescription(`Soaring pillars greet you at the threshold of the towering building. Displays of artifacts line the high-ceilinged halls - from ancient weapons to pottery with pictographs unknown. Scholars talk in hushed whispers, stooped over crumbling books.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Sol Barracks'){
                        const attachment = new MessageAttachment('assets/Vigia/ranger_centre.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://ranger_centre.jpeg')
                            .setDescription(` As you pass under the towering stone archway, the pounding of sparring knights fills your ears. Rows of neat barracks lines either side of the central courtyard. Bellowing drills instructors put recruits through their paces with spear, shield and sword. Sweat-slicked trainees grunt and parry under the noon sun.At the far end, an imposing armory bears the banners of past battles. Veterans hone and maintain the garrison's formidable arms within.\n\n**This is a Shop location, you can use /shop here**`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Fort Primis'){
                        const attachment = new MessageAttachment('assets/Vigia/fort_primis.jpg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage(`attachment://fort_primis.jpg`)
                            .setDescription(`As you arrive at the fort, you see soldiers in full armor marching about on patrol.Approaching the looming gatehouse, you crane your neck to take in the height of Primis' fortified walls. Arrow slits peer out like eyes, ever vigilant for signs of threat. As the portcullis clanks up, you glimpse Sol Crusaders manning post and patrol atop the battlements.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Castle Arcemis'){
                        const attachment = new MessageAttachment('assets/Werfall/ranger_centre.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://ranger_centre.jpeg')
                            .setDescription(`As you approach the imposing fortress of castle Arcemis, you crane your neck to take in its sheer scale. Perched atop a hill overlooking the city, its weathered ramparts and towers loom large, dominating the landscape. The last rays of the setting sun paint the stone walls in hues of gold and crimson. Banners with Earl Arvid's crest snap in the wind above parapets manned by watchful guards. Reaching the enormous gate, you glimpse the bustling activity inside - soldiers drilling in the courtyard, stewards rushing about on errands.Though you have not yet entered its halls, the castle radiates power and purpose, an indomitable guardian that has safeguarded Vigia for centuries.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Ruins of Eldorath'){
                        const attachment = new MessageAttachment('assets/Vigia/ruinsofeldorath.jpg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://ruinsofeldorath.jpg')
                            .setDescription(`As you make your way to the sealed off ruins of Eldorath, you notice remnants of a once great civilization. Broken pillars and crumbled walls tower above you, now reclaimed by vines and moss. You peel back curtains of creeping plants and peer into ancient halls, glimpsing faded murals depicting the lives of the Eldruids who constructed this place. Ghosts of the past seem to lurk around every corner, daring you to uncover their secrets. Stepping carefully over reckless from fallen domes and arched ceilings, you puzzle over symbols and writings in a long forgotten language. All around you, clues remain to stitch together the faded tapestry of this lost world, if only you can decipher its long held silence.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Vigia Ranger Centre'){
                        const attachment = new MessageAttachment('assets/Werfall/ranger_centre.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://ranger_centre.jpeg')
                            .setDescription(`Upon entering the Vigia Ranger Centre, you are met with the buzz of activity as rangers mingle, share tales of adventure and peruse the many posted jobs and deeds. Over by the quest board, parties debate undertakings in Deathrust forest or across the rugged landscape beyond the SolGate. In the back of the spacious hall, trainees spar and show off newly learned skills.\n\n**use /questboard to view the Questboard**`)
                            await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
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
                    
                    await interaction.editReply({embeds:[Interiorembed],components:[Interiorselect,btn_cancel]})
                    }
                else if(j.customId == "exterior"){
                       await interaction.editReply({embeds:[Exteriorembed],components:[Exteriorselect,btn_cancel]})

                        }
                    
                
            })              
       
        
        
        
        
                }
                else if(city_town == "Asche Peak"){
                                        let Interiorembed1
                                        let Interiorembed2
                                        let Exteriorembed
                                        let mount = "None"
                                        if(mount == "None"){
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT EXTERIOR LOCATION')
                                        .setDescription(`choose a place to travel outside ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Township of Kafig`,
                                                value:`**Travelled on Stagecoach**\n**Description**:Kafig, a vibrant town nestled near the mystical Asche Peak, where the locals revere Avian Spyriths, especially the mythical Radohn, and thrive in a bustling market for flying spyriths.\n**Cost**: 0 🪙\n`
                                            },
                                            {
                                                name: `Stateship of Vigia`,
                                                value:`**Travelled on Stagecoach**\n**Description**:The state of Vigia is a fortress state in Solarstrio, standing as the first and last defense against the deadly forest of DeathRust.\n**Cost**: 100 🪙\n`
                                            },
                                        ])
                                        
                                        }
                                        else{
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Township of Kafig`,
                                                value:`**Travelled on Spyralink**\n**Description**:Kafig, a vibrant town nestled near the mystical Asche Peak, where the locals revere Avian Spyriths, especially the mythical Radohn, and thrive in a bustling market for flying spyriths.\n**Cost**: 0 🪙\n`
                                            },
                                            {
                                                name: `Stateship of Vigia`,
                                                value:`**Travelled on Spyralink**\n**Description**:The state of Vigia is a fortress state in Solarstrio, standing as the first and last defense against the deadly forest of DeathRust.\n**Cost**: 100 🪙\n`
                                            },
                                        ])
    
                                        }
                                        
                                   Interiorembed1 = new MessageEmbed()
                                   .setColor('RANDOM')
                                   .setTitle('SELECT INTERIOR LOCATION')
                                   .setDescription(`Choose a location to visit in Vigia`)
                                   .addFields([
                                    {
                                        name: `Trinity Plateau`,
                                        value:`**Description**: A Monument where three swords remain sheathed in a pact between warriors long forgotten.\n`
                                    },
                                    {
                                        name: `Temple of Tears`,
                                        value:`**Description**:  A temple within weeping stone carved in tears of a God\n`
                                    },
                                    {
                                        name: `Esparta Museum`,
                                        value:`**Description**:  A treasure trove of history within Vigia's hallowed halls. One of the biggest Museums on Vearth.\n`
                                    },
                                    {
                                        name: `Sol Barracks`,
                                        value:`**Description**:  The Armory,Training Grounds and Residential Quarters of the Sol Crusaders.Military Grade equipment are also sold to licensed Rangers.\n`
                                    },
                                    {
                                        name: `Fort Primis`,
                                        value:`**Description**:  The imposing bastion where the Sol Crusaders hold vigil against the Death Rust. It is the first fort of the Sol Gate and the HQ of Sol Crusaders.\n`
                                    },
                                    {
                                        name: `Castle Arcemis`,
                                        value:`**Description**:   Earl Arvid's towering seat of power overlooking the city.\n`
                                    },
                                    {
                                        name: `Ruins of Eldorath`,
                                        value:`**Description**:   Crumbling fragments of a lost civilization faded in history.\n`
                                    },
                                    {
                                        name: `Vigia Ranger Centre`,
                                        value:`**Description**:   Vigia's official Ranger Centre bold rangers gather for quests on the frontier's edge.\n`
                                    }
                                   ])

                                   Interiorembed2 = new MessageEmbed()
                                   .setColor('RANDOM')
                                   .setTitle('SELECT INTERIOR LOCATION')
                                   .setDescription(`Choose a location to visit in Kafig`)
                                   .addFields([
                                    {
                                        name: `Avian Square`,
                                        value:`**Description**: The central hub of Kafig where commerce florishes, adorned with a statue of Radohn\n`
                                    },
                                    {
                                        name: `Cloud Haven`,
                                        value:`**Description**:  A cylindrical building resembling a bird cage, serving as a sanctuary for exotic Spyriths.\n`
                                    },
                                    {
                                        name: `The Gilded Cage`,
                                        value:`**Description**:  Kafig's beloved tavern, where locals and rangers come together to unwind and celebrate.\n`
                                    },
                                    {
                                        name: `Radohn Roost`,
                                        value:`**Description**:  A hillside temple above Kafig, dedicated to Radohn burning with the flame of eternity.\n`
                                    },
                                    {
                                        name: `Kafig Guild Outpost`,
                                        value:`**Description**:  The Guild Outpost of Kafig, one of the many outposts under the jurisdiction of Eterna Guild and serves as the central hub for rangers around.\n`
                                    }
                                   ])
        
        
        let btn_cancel = new MessageActionRow().addComponents([
            new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),
            new MessageButton().setCustomId("interior1").setStyle("PRIMARY").setLabel("Vigia Interior"),
            new MessageButton().setCustomId("interior2").setStyle("PRIMARY").setLabel("Kafig Interior"),
            new MessageButton().setCustomId("exterior").setStyle("PRIMARY").setLabel("Exterior")])
        
        let Exteriorselect =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_exterior')
                    .setPlaceholder(`Select a place to travel ${interaction.user.username}`)
                    .addOptions({
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

            let Interiorselect1 =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_interior')
                    .setPlaceholder(`Select a location ${interaction.user.username}`)
                    .addOptions({
                        label: `Trinity Plateau`,
                        description: ``,
                        value: `Trinity Plateau`,
                    },{
                        label: `Temple of Tears`,
                        description: ``,
                        value: `Temple of Tears`,
                    },{
                        label: `Esparta Museum`,
                        description: ``,
                        value: `Esparta Museum`,
                    },{
                        label: `Sol Barracks`,
                        description: ``,
                        value: `Sol Barracks`,
                    },{
                        label: `Fort Primis`,
                        description: ``,
                        value: `Fort Primis`,
                    },{
                        label: `Castle Arcemis`,
                        description: ``,
                        value: `Castle Arcemis`,
                    },{
                        label: `Ruins of Eldorath`,
                        description: ``,
                        value: `Ruins of Eldorath`,
                    },{
                        label: `Vigia Ranger Centre`,
                        description: ``,
                        value: `Vigia Ranger Centre`,
                    }
                    
                    )
                    .setDisabled(false),
            ])
            
            let Interiorselect2 =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_interior2')
                    .setPlaceholder(`Select a location ${interaction.user.username}`)
                    .addOptions({
                        label: `Avian Square`,
                        description: ``,
                        value: `Avian Square`,
                    },{
                        label: `Cloud Haven`,
                        description: ``,
                        value: `Cloud Haven`,
                    },{
                        label: `The Gilded Cage`,
                        description: ``,
                        value: `The Gilded Cage`,
                    },{
                        label: `Radohn Roost`,
                        description: ``,
                        value: `Radohn Roost`,
                    },{
                        label: `Kafig Guild Outpost`,
                        description: ``,
                        value: `Kafig Guild Outpost`,
                    }
                    
                    )
                    .setDisabled(false),
            ]) 
            let filter_select = (interaction : any) => interaction.user.id === authorId && (interaction.customId == "select_interior" || interaction.customId == "select_interior2" || interaction.customId == "select_exterior")
            let filter_cancel = (interaction : any) => interaction.user.id === authorId && (interaction.customId == "cancel" || interaction.customId == "interior1"|| interaction.customId == "interior2" || interaction.customId == "exterior")    
            let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select,time:1000*300 })
            let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel,time:1000*300 })
        
            
        
        
            await interaction.reply({content: null,embeds:[Interiorembed1],components:[Interiorselect1,btn_cancel]})
        
            collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                collected.deferUpdate().catch(() => null)
                const location = collected.values[0]
                
                if(collected.customId == "select_exterior"){
                    if(location == 'Vigia'){
                        if(foundUser.coins >=0 && foundUser.mount == "None"){
                            await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Vigia/vigia_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://vigia_main.jpg')
                        .setDescription(`As you arrive in the state of Vigia, a fortified sanctuary nestled in the heart of Solarstrio, the cityscape unfolds before your eyes, showcasing a harmonious fusion of history and resilience. The towering walls of Vigia, known as the SolGate, stand as a testament to the city's unwavering defense against the menacing DeathRust forest. Within its protective embrace, Vigia thrives as a vibrant hub, where echoes of the past reverberate through its streets. The city's charm lies in its lively atmosphere, adorned with museums, monuments, and a sense of time-honored significance.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else if(foundUser.mount != "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Vigia/vigia_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://vigia_main.jpg')
                        .setDescription(`As you arrive in the state of Vigia, a fortified sanctuary nestled in the heart of Solarstrio, the cityscape unfolds before your eyes, showcasing a harmonious fusion of history and resilience. The towering walls of Vigia, known as the SolGate, stand as a testament to the city's unwavering defense against the menacing DeathRust forest. Within its protective embrace, Vigia thrives as a vibrant hub, where echoes of the past reverberate through its streets. The city's charm lies in its lively atmosphere, adorned with museums, monuments, and a sense of time-honored significance.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else{
                            interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                        }
                        
                    }
                    
                    else if(location == 'Kafig'){
                        if(foundUser.coins >=0 && foundUser.mount == "None"){
                            await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Kafig/kafig_main.jpeg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://kafig_main.jpeg')
                        .setDescription(`As you enter Kafig, vibrant bird houses adorn every corner of the bustling town, creating a picturesque scene. The Avian Square, with its central obsidian statue, stands as a focal point amidst the lively atmosphere. Traders and merchants add to the visual tapestry, drawn to the town's reputation as a thriving market for flying spyriths, while the air carries a sense of reverence for the mythical Avian Spyriths.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else if(foundUser.mount != "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Kafig/kafig_main.jpeg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://kafig_main.jpeg')
                        .setDescription(`As you enter Kafig, vibrant bird houses adorn every corner of the bustling town, creating a picturesque scene. The Avian Square, with its central obsidian statue, stands as a focal point amidst the lively atmosphere. Traders and merchants add to the visual tapestry, drawn to the town's reputation as a thriving market for flying spyriths, while the air carries a sense of reverence for the mythical Avian Spyriths.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else{
                            interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                        }
                        
                    }
                    
                    
                    
                    
                collector_select.stop()
                collector_cancel.stop()
                    
                }
                else if(collected.customId == "select_interior2"){
                    await profileModel.updateOne({userID:authorId},{location:location,city_town:"Kafig"})

                    if(location == 'Avian Square'){
                        const attachment = new MessageAttachment('assets/Kafig/avian_square.jpeg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://avian_square.jpeg')
                        .setDescription(`As you step into Avian Square, your eyes are immediately drawn to the towering statue of Radohn, crafted from obsidian. The square bustles with townsfolk and visitors, paying their respects and leaving offerings at the base of the statue.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Cloud Haven'){
                        const attachment = new MessageAttachment('assets/Kafig/cloudhaven.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://cloudhaven.jpeg')
                            .setDescription(`You approach Cloud Haven and marvel at its imposing structure. The cylindrical building, with its intricate lattice design and large open windows, stands as a testament to the town's dedication to the avian creatures. The sound of wings fluttering and distant bird calls fills the air, enticing you to enter and explore further.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'The Guilded Cage'){
                        const attachment = new MessageAttachment('assets/Kafig/ranger_centre.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://ranger_centre.jpeg')
                            .setDescription(`The warm glow emanating from The Gilded Cage invites you inside. As you enter, the cozy ambiance welcomes you, with wooden tables and benches filling the space. Laughter and lively conversations fill the air, accompanied by the aroma of delicious local cuisine and the clinking of glasses. The sound of a bard's melodious voice can be heard, captivating the audience.\n\n**This is a Shop location, you can use /shop here**`)
                            await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
                            await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Radohn Roost'){
                        const attachment = new MessageAttachment('assets/Kafig/radohn_roost.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://radohn_roost.jpeg')
                            .setDescription(`Climbing the steep steps leading to Radohn Roost, you feel a sense of serenity and reverence in the air. The temple emerges, nestled on the hillside above the town. The gentle breeze carries the fragrance of incense, inviting you to explore further. From this elevated vantage point, you can already catch glimpses of the breathtaking views awaiting you.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Kafig Guild Outpost'){
                        const attachment = new MessageAttachment('assets/Werfall/ranger_centre.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://ranger_centre.jpeg')
                            .setDescription(`As you enter the Kafig Guild Outpost, you see a lively and quite well maintained place. People are talking and sharing stories. On the walls, there are maps and trophies from adventures and the Insignia of the Eterna Guild. In the middle, there's a space where plans are made. A small desk in the corner has important papers and messages. The atmosphere feels friendly and busy, showing that the outpost is a key spot where everyone works together, The Front wall is adorned with the portrait of the revered ranger "Demon Bird" Basil.\n\n**use /questboard to view the Questboard**`)
                            await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
                            await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                }
                else if(collected.customId == "select_interior"){
                    await profileModel.updateOne({userID:authorId},{location:location,city_town:"Vigia"})
               
                    if(location == 'Trinity Plateau'){
                        const attachment = new MessageAttachment('assets/Vigia/trinity_plateau.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://trinity_plateau.jpg')
                        .setDescription(`Climbing the switchback path, the plateau emerges like an oasis amid Vigia's stone walls. Three great swords stand frozen in combat atop grassy banks. In the distance, the SolGate stands eternal vigil, and beyond - the ominous shadow of DeathRust looms.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Temple of Tears'){
                        const attachment = new MessageAttachment('assets/Vigia/templeoftears.jpg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage(`attachment://ranger_centre.jpg`)
                            .setDescription(`Dark and foreboding, Morozh's temple is hewn from age-old stone. Weeping faces spout an endless stream upon which solace seekers float candles in tribute. Shadows dance as you enter, feeling suddenly small beneath the arched passages. What rest may be found in despair's domain?\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Esparta Museum'){
                        const attachment = new MessageAttachment('assets/Vigia/esparta.jpg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://esparta.jpg')
                            .setDescription(`Soaring pillars greet you at the threshold of the towering building. Displays of artifacts line the high-ceilinged halls - from ancient weapons to pottery with pictographs unknown. Scholars talk in hushed whispers, stooped over crumbling books.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Sol Barracks'){
                        const attachment = new MessageAttachment('assets/Vigia/ranger_centre.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://ranger_centre.jpeg')
                            .setDescription(` As you pass under the towering stone archway, the pounding of sparring knights fills your ears. Rows of neat barracks lines either side of the central courtyard. Bellowing drills instructors put recruits through their paces with spear, shield and sword. Sweat-slicked trainees grunt and parry under the noon sun.At the far end, an imposing armory bears the banners of past battles. Veterans hone and maintain the garrison's formidable arms within.\n\n**This is a Shop location, you can use /shop here**`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Fort Primis'){
                        const attachment = new MessageAttachment('assets/Vigia/fort_primis.jpg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage(`attachment://fort_primis.jpg`)
                            .setDescription(`As you arrive at the fort, you see soldiers in full armor marching about on patrol.Approaching the looming gatehouse, you crane your neck to take in the height of Primis' fortified walls. Arrow slits peer out like eyes, ever vigilant for signs of threat. As the portcullis clanks up, you glimpse Sol Crusaders manning post and patrol atop the battlements.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Castle Arcemis'){
                        const attachment = new MessageAttachment('assets/Werfall/ranger_centre.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://ranger_centre.jpeg')
                            .setDescription(`As you approach the imposing fortress of castle Arcemis, you crane your neck to take in its sheer scale. Perched atop a hill overlooking the city, its weathered ramparts and towers loom large, dominating the landscape. The last rays of the setting sun paint the stone walls in hues of gold and crimson. Banners with Earl Arvid's crest snap in the wind above parapets manned by watchful guards. Reaching the enormous gate, you glimpse the bustling activity inside - soldiers drilling in the courtyard, stewards rushing about on errands.Though you have not yet entered its halls, the castle radiates power and purpose, an indomitable guardian that has safeguarded Vigia for centuries.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Ruins of Eldorath'){
                        const attachment = new MessageAttachment('assets/Vigia/ruinsofeldorath.jpg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://ruinsofeldorath.jpg')
                            .setDescription(`As you make your way to the sealed off ruins of Eldorath, you notice remnants of a once great civilization. Broken pillars and crumbled walls tower above you, now reclaimed by vines and moss. You peel back curtains of creeping plants and peer into ancient halls, glimpsing faded murals depicting the lives of the Eldruids who constructed this place. Ghosts of the past seem to lurk around every corner, daring you to uncover their secrets. Stepping carefully over reckless from fallen domes and arched ceilings, you puzzle over symbols and writings in a long forgotten language. All around you, clues remain to stitch together the faded tapestry of this lost world, if only you can decipher its long held silence.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Vigia Ranger Centre'){
                        const attachment = new MessageAttachment('assets/Werfall/ranger_centre.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://ranger_centre.jpeg')
                            .setDescription(`Upon entering the Vigia Ranger Centre, you are met with the buzz of activity as rangers mingle, share tales of adventure and peruse the many posted jobs and deeds. Over by the quest board, parties debate undertakings in Deathrust forest or across the rugged landscape beyond the SolGate. In the back of the spacious hall, trainees spar and show off newly learned skills.\n\n**use /questboard to view the Questboard**`)
                            await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
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
                else if(j.customId == "interior1"){
                    
                    await interaction.editReply({embeds:[Interiorembed1],components:[Interiorselect1,btn_cancel]})
                    }
                else if(j.customId == "interior2"){
                    
                        await interaction.editReply({embeds:[Interiorembed2],components:[Interiorselect2,btn_cancel]})
                    }
                else if(j.customId == "exterior"){
                    
                        await interaction.editReply({embeds:[Exteriorembed],components:[Exteriorselect,btn_cancel]})

                        }
                    
                
            })
        
        
        
        
                }
                else if(city_town == "Deathrust Forest"){
                                        let Interiorembed
                                        let Exteriorembed
                                        let mount = "None"
                                        if(mount == "None"){
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT EXTERIOR LOCATION')
                                        .setDescription(`choose a place to travel outside ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Stateship of Vigia`,
                                                value:`**Travelled on Stagecoach**\n**Description**:The state of Vigia is a fortress state in Solarstrio, standing as the first and last defense against the deadly forest of DeathRust.\n**Cost**: 100 🪙\n`
                                            },
                                        ])
                                        
                                        }
                                        else{
                                            Exteriorembed = new MessageEmbed()
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
                                        
                                   Interiorembed = new MessageEmbed()
                                   .setColor('RANDOM')
                                   .setTitle('SELECT INTERIOR LOCATION')
                                   .setDescription(`Choose a location to visit in Vigia`)
                                   .addFields([
                                    {
                                        name: `Trinity Plateau`,
                                        value:`**Description**: A Monument where three swords remain sheathed in a pact between warriors long forgotten.\n`
                                    },
                                    {
                                        name: `Temple of Tears`,
                                        value:`**Description**:  A temple within weeping stone carved in tears of a God\n`
                                    },
                                    {
                                        name: `Esparta Museum`,
                                        value:`**Description**:  A treasure trove of history within Vigia's hallowed halls. One of the biggest Museums on Vearth.\n`
                                    },
                                    {
                                        name: `Sol Barracks`,
                                        value:`**Description**:  The Armory,Training Grounds and Residential Quarters of the Sol Crusaders.Military Grade equipment are also sold to licensed Rangers.\n`
                                    },
                                    {
                                        name: `Fort Primis`,
                                        value:`**Description**:  The imposing bastion where the Sol Crusaders hold vigil against the Death Rust. It is the first fort of the Sol Gate and the HQ of Sol Crusaders.\n`
                                    },
                                    {
                                        name: `Castle Arcemis`,
                                        value:`**Description**:   Earl Arvid's towering seat of power overlooking the city.\n`
                                    },
                                    {
                                        name: `Ruins of Eldorath`,
                                        value:`**Description**:   Crumbling fragments of a lost civilization faded in history.\n`
                                    },
                                    {
                                        name: `Vigia Ranger Centre`,
                                        value:`**Description**:   Vigia's official Ranger Centre bold rangers gather for quests on the frontier's edge.\n`
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
                        label: `Stateship of Vigia`,
                        description: ``,
                        value: `Vigia`,
                    },
                    )
                    .setDisabled(false),
            ]) 

            let Interiorselect =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_interior')
                    .setPlaceholder(`Select a location ${interaction.user.username}`)
                    .addOptions({
                        label: `Trinity Plateau`,
                        description: ``,
                        value: `Trinity Plateau`,
                    },{
                        label: `Temple of Tears`,
                        description: ``,
                        value: `Temple of Tears`,
                    },{
                        label: `Esparta Museum`,
                        description: ``,
                        value: `Esparta Museum`,
                    },{
                        label: `Sol Barracks`,
                        description: ``,
                        value: `Sol Barracks`,
                    },{
                        label: `Fort Primis`,
                        description: ``,
                        value: `Fort Primis`,
                    },{
                        label: `Castle Arcemis`,
                        description: ``,
                        value: `Castle Arcemis`,
                    },{
                        label: `Ruins of Eldorath`,
                        description: ``,
                        value: `Ruins of Eldorath`,
                    },{
                        label: `Vigia Ranger Centre`,
                        description: ``,
                        value: `Vigia Ranger Centre`,
                    }
                    
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
                    if(location == 'Vigia'){
                        if(foundUser.coins >=0 && foundUser.mount == "None"){
                            await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Vigia/vigia_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://vigia_main.jpg')
                        .setDescription(`As you arrive in the state of Vigia, a fortified sanctuary nestled in the heart of Solarstrio, the cityscape unfolds before your eyes, showcasing a harmonious fusion of history and resilience. The towering walls of Vigia, known as the SolGate, stand as a testament to the city's unwavering defense against the menacing DeathRust forest. Within its protective embrace, Vigia thrives as a vibrant hub, where echoes of the past reverberate through its streets. The city's charm lies in its lively atmosphere, adorned with museums, monuments, and a sense of time-honored significance.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else if(foundUser.mount != "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Vigia/vigia_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://vigia_main.jpg')
                        .setDescription(`As you arrive in the state of Vigia, a fortified sanctuary nestled in the heart of Solarstrio, the cityscape unfolds before your eyes, showcasing a harmonious fusion of history and resilience. The towering walls of Vigia, known as the SolGate, stand as a testament to the city's unwavering defense against the menacing DeathRust forest. Within its protective embrace, Vigia thrives as a vibrant hub, where echoes of the past reverberate through its streets. The city's charm lies in its lively atmosphere, adorned with museums, monuments, and a sense of time-honored significance.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else{
                            interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                        }
                        
                    }
                    
                    
                    
                    
                    
                collector_select.stop()
                collector_cancel.stop()
                    
                }
                else if(collected.customId == "select_interior"){
                    await profileModel.updateOne({userID:authorId},{location:location,city_town:"Vigia"})
               
                    if(location == 'Trinity Plateau'){
                        const attachment = new MessageAttachment('assets/Vigia/trinity_plateau.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://trinity_plateau.jpg')
                        .setDescription(`Climbing the switchback path, the plateau emerges like an oasis amid Vigia's stone walls. Three great swords stand frozen in combat atop grassy banks. In the distance, the SolGate stands eternal vigil, and beyond - the ominous shadow of DeathRust looms.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Temple of Tears'){
                        const attachment = new MessageAttachment('assets/Vigia/templeoftears.jpg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage(`attachment://ranger_centre.jpg`)
                            .setDescription(`Dark and foreboding, Morozh's temple is hewn from age-old stone. Weeping faces spout an endless stream upon which solace seekers float candles in tribute. Shadows dance as you enter, feeling suddenly small beneath the arched passages. What rest may be found in despair's domain?\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Esparta Museum'){
                        const attachment = new MessageAttachment('assets/Vigia/esparta.jpg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://esparta.jpg')
                            .setDescription(`Soaring pillars greet you at the threshold of the towering building. Displays of artifacts line the high-ceilinged halls - from ancient weapons to pottery with pictographs unknown. Scholars talk in hushed whispers, stooped over crumbling books.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Sol Barracks'){
                        const attachment = new MessageAttachment('assets/Vigia/ranger_centre.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://ranger_centre.jpeg')
                            .setDescription(` As you pass under the towering stone archway, the pounding of sparring knights fills your ears. Rows of neat barracks lines either side of the central courtyard. Bellowing drills instructors put recruits through their paces with spear, shield and sword. Sweat-slicked trainees grunt and parry under the noon sun.At the far end, an imposing armory bears the banners of past battles. Veterans hone and maintain the garrison's formidable arms within.\n\n**This is a Shop location, you can use /shop here**`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Fort Primis'){
                        const attachment = new MessageAttachment('assets/Vigia/fort_primis.jpg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage(`attachment://fort_primis.jpg`)
                            .setDescription(`As you arrive at the fort, you see soldiers in full armor marching about on patrol.Approaching the looming gatehouse, you crane your neck to take in the height of Primis' fortified walls. Arrow slits peer out like eyes, ever vigilant for signs of threat. As the portcullis clanks up, you glimpse Sol Crusaders manning post and patrol atop the battlements.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Castle Arcemis'){
                        const attachment = new MessageAttachment('assets/Werfall/ranger_centre.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://ranger_centre.jpeg')
                            .setDescription(`As you approach the imposing fortress of castle Arcemis, you crane your neck to take in its sheer scale. Perched atop a hill overlooking the city, its weathered ramparts and towers loom large, dominating the landscape. The last rays of the setting sun paint the stone walls in hues of gold and crimson. Banners with Earl Arvid's crest snap in the wind above parapets manned by watchful guards. Reaching the enormous gate, you glimpse the bustling activity inside - soldiers drilling in the courtyard, stewards rushing about on errands.Though you have not yet entered its halls, the castle radiates power and purpose, an indomitable guardian that has safeguarded Vigia for centuries.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Ruins of Eldorath'){
                        const attachment = new MessageAttachment('assets/Vigia/ruinsofeldorath.jpg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://ruinsofeldorath.jpg')
                            .setDescription(`As you make your way to the sealed off ruins of Eldorath, you notice remnants of a once great civilization. Broken pillars and crumbled walls tower above you, now reclaimed by vines and moss. You peel back curtains of creeping plants and peer into ancient halls, glimpsing faded murals depicting the lives of the Eldruids who constructed this place. Ghosts of the past seem to lurk around every corner, daring you to uncover their secrets. Stepping carefully over reckless from fallen domes and arched ceilings, you puzzle over symbols and writings in a long forgotten language. All around you, clues remain to stitch together the faded tapestry of this lost world, if only you can decipher its long held silence.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Vigia Ranger Centre'){
                        const attachment = new MessageAttachment('assets/Werfall/ranger_centre.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://ranger_centre.jpeg')
                            .setDescription(`Upon entering the Vigia Ranger Centre, you are met with the buzz of activity as rangers mingle, share tales of adventure and peruse the many posted jobs and deeds. Over by the quest board, parties debate undertakings in Deathrust forest or across the rugged landscape beyond the SolGate. In the back of the spacious hall, trainees spar and show off newly learned skills.\n\n**use /questboard to view the Questboard**`)
                            await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
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
                    
                    await interaction.editReply({embeds:[Interiorembed],components:[Interiorselect,btn_cancel]})
                    }
                else if(j.customId == "exterior"){
                       await interaction.editReply({embeds:[Exteriorembed],components:[Exteriorselect,btn_cancel]})

                        }
                    
                
            })    
        
                }
                else if(city_town == "Kafig"){
                    let Interiorembed
                                        let Exteriorembed
                                        let mount = "None"
                                        if(mount == "None"){
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT EXTERIOR LOCATION')
                                        .setDescription(`choose a place to travel outside ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Asche Peak`,
                                                value:`**Travelled on Stagecoach**\n**Description**:A charred hill crowned in perpetual darkness, its soot-blackened soil radiating intense heat, home to a rich variety of Avian Spyriths.\n**Cost**: 0 🪙\n`
                                            },
                                            {
                                                name: `Stateship of Vigia`,
                                                value:`**Travelled on Stagecoach**\n**Description**:The state of Vigia is a fortress state in Solarstrio, standing as the first and last defense against the deadly forest of DeathRust.\n**Cost**: 100 🪙\n`
                                            },
                                            {
                                                name: `Township of Raflese`,
                                                value:`**Travelled on Stagecoach**\n**Description**:A botanical paradise where lush greenery, cultural traditions, and medicinal intrigue converge.\n**Cost**: 100 🪙\n`
                                            },
                                        ])
                                        
                                        }
                                        else{
                                            Exteriorembed = new MessageEmbed()
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
                                                value:`**Travelled on Spyralink**\n**Description**:The state of Vigia is a fortress state in Solarstrio, standing as the first and last defense against the deadly forest of DeathRust.\n**Cost**: 0 🪙\n`
                                            },
                                            {
                                                name: `Township of Raflese`,
                                                value:`**Travelled on Spyralink**\n**Description**:A botanical paradise where lush greenery, cultural traditions, and medicinal intrigue converge.\n**Cost**: 0 🪙\n`
                                            },
                                        ])
    
                                        }
                                        
                                   Interiorembed = new MessageEmbed()
                                   .setColor('RANDOM')
                                   .setTitle('SELECT INTERIOR LOCATION')
                                   .setDescription(`Choose a location to visit in ${city_town}`)
                                   .addFields([
                                    {
                                        name: `Avian Square`,
                                        value:`**Description**: The central hub of Kafig where commerce florishes, adorned with a statue of Radohn\n`
                                    },
                                    {
                                        name: `Cloud Haven`,
                                        value:`**Description**:  A cylindrical building resembling a bird cage, serving as a sanctuary for exotic Spyriths.\n`
                                    },
                                    {
                                        name: `The Gilded Cage`,
                                        value:`**Description**:  Kafig's beloved tavern, where locals and rangers come together to unwind and celebrate.\n`
                                    },
                                    {
                                        name: `Radohn Roost`,
                                        value:`**Description**:  A hillside temple above Kafig, dedicated to Radohn burning with the flame of eternity.\n`
                                    },
                                    {
                                        name: `Kafig Guild Outpost`,
                                        value:`**Description**:  The Guild Outpost of Kafig, one of the many outposts under the jurisdiction of Eterna Guild and serves as the central hub for rangers around.\n`
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
                        label: `Asche Peak`,
                        description: ``,
                        value: `Asche Peak`,
                    },
                    {
                        label: `Stateship of Vigia`,
                        description: ``,
                        value: `Vigia`,
                    },{
                        label: `Township of Raflese`,
                        description: ``,
                        value: `Raflese`,
                    },
                    )
                    .setDisabled(false),
            ]) 

            let Interiorselect =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_interior')
                    .setPlaceholder(`Select a location ${interaction.user.username}`)
                    .addOptions({
                        label: `Avian Square`,
                        description: ``,
                        value: `Avian Square`,
                    },{
                        label: `Cloud Haven`,
                        description: ``,
                        value: `Cloud Haven`,
                    },{
                        label: `The Gilded Cage`,
                        description: ``,
                        value: `The Gilded Cage`,
                    },{
                        label: `Radohn Roost`,
                        description: ``,
                        value: `Radohn Roost`,
                    },{
                        label: `Kafig Guild Outpost`,
                        description: ``,
                        value: `Kafig Guild Outpost`,
                    }
                    
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
                    if(location == 'Vigia'){
                        if(foundUser.coins >=100 && foundUser.mount == "None"){
                            await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-100,location:"None"})
                        const attachment = new MessageAttachment('assets/Vigia/vigia_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://vigia_main.jpg')
                        .setDescription(`As you arrive in the state of Vigia, a fortified sanctuary nestled in the heart of Solarstrio, the cityscape unfolds before your eyes, showcasing a harmonious fusion of history and resilience. The towering walls of Vigia, known as the SolGate, stand as a testament to the city's unwavering defense against the menacing DeathRust forest. Within its protective embrace, Vigia thrives as a vibrant hub, where echoes of the past reverberate through its streets. The city's charm lies in its lively atmosphere, adorned with museums, monuments, and a sense of time-honored significance.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else if(foundUser.mount != "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Vigia/vigia_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://vigia_main.jpg')
                        .setDescription(`As you arrive in the state of Vigia, a fortified sanctuary nestled in the heart of Solarstrio, the cityscape unfolds before your eyes, showcasing a harmonious fusion of history and resilience. The towering walls of Vigia, known as the SolGate, stand as a testament to the city's unwavering defense against the menacing DeathRust forest. Within its protective embrace, Vigia thrives as a vibrant hub, where echoes of the past reverberate through its streets. The city's charm lies in its lively atmosphere, adorned with museums, monuments, and a sense of time-honored significance.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else{
                            interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                        }
                        
                    }
                    
                    else if(location == 'Asche Peak'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Kafig/asche_peak.jpeg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://asche_peak.jpeg')
                        .setDescription(`As you reach Asche Peak, the landscape transforms into a surreal panorama of charred hills and blackened soil. The air is thick with an intense heat, radiating from the ground that gives the hill its soot-like black color. Avian Spyriths, both friendly and hostile, fill the skies, adding life to the mysterious hill. The legend of Radohn, the flame-draped ruler of the skies, lingers in the atmosphere, shrouding Asche Peak in an aura of mythical beauty.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }

                    else if(location == 'Raflese'){
                        if(foundUser.coins >=100 && foundUser.mount == "None"){
                            await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-100,location:"None"})
                        const attachment = new MessageAttachment('assets/Raflese/raflese_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://raflese_main.jpg')
                        .setDescription(`As you enter Raflese Town, you're greeted by a kaleidoscope of colors and fragrances: vibrant gardens, sweet floral scents, and the inviting allure of herbal shops. The imposing glass dome of the Green Keep lab stands on the outskirts, contrasting with the serene majesty of the Eden Garden and its iconic Tree of Life. In this botanical paradise, every corner teems with natural wonder, captivating your senses from the moment you arrive.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else if(foundUser.mount != "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Raflese/raflese_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://raflese_main.jpg')
                        .setDescription(`As you enter Raflese Town, you're greeted by a kaleidoscope of colors and fragrances: vibrant gardens, sweet floral scents, and the inviting allure of herbal shops. The imposing glass dome of the Green Keep lab stands on the outskirts, contrasting with the serene majesty of the Eden Garden and its iconic Tree of Life. In this botanical paradise, every corner teems with natural wonder, captivating your senses from the moment you arrive.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else{
                            interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                        }
                        
                    }
                    
                    
                collector_select.stop()
                collector_cancel.stop()
                    
                }
                else if(collected.customId == "select_interior"){
                    await profileModel.updateOne({userID:authorId},{location:location})
               
                    if(location == 'Avian Square'){
                        const attachment = new MessageAttachment('assets/Kafig/avian_square.jpeg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://avian_square.jpeg')
                        .setDescription(`As you step into Avian Square, your eyes are immediately drawn to the towering statue of Radohn, crafted from obsidian. The square bustles with townsfolk and visitors, paying their respects and leaving offerings at the base of the statue.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Cloud Haven'){
                        const attachment = new MessageAttachment('assets/Kafig/cloudhaven.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://cloudhaven.jpeg')
                            .setDescription(`You approach Cloud Haven and marvel at its imposing structure. The cylindrical building, with its intricate lattice design and large open windows, stands as a testament to the town's dedication to the avian creatures. The sound of wings fluttering and distant bird calls fills the air, enticing you to enter and explore further.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'The Guilded Cage'){
                        const attachment = new MessageAttachment('assets/Kafig/ranger_centre.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://ranger_centre.jpeg')
                            .setDescription(`The warm glow emanating from The Gilded Cage invites you inside. As you enter, the cozy ambiance welcomes you, with wooden tables and benches filling the space. Laughter and lively conversations fill the air, accompanied by the aroma of delicious local cuisine and the clinking of glasses. The sound of a bard's melodious voice can be heard, captivating the audience.\n\n**This is a Shop location, you can use /shop here**`)
                            await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
                            await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Radohn Roost'){
                        const attachment = new MessageAttachment('assets/Kafig/radohn_roost.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://radohn_roost.jpeg')
                            .setDescription(`Climbing the steep steps leading to Radohn Roost, you feel a sense of serenity and reverence in the air. The temple emerges, nestled on the hillside above the town. The gentle breeze carries the fragrance of incense, inviting you to explore further. From this elevated vantage point, you can already catch glimpses of the breathtaking views awaiting you.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Kafig Guild Outpost'){
                        const attachment = new MessageAttachment('assets/Kafig/ranger_centre.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://ranger_centre.jpeg')
                            .setDescription(`As you enter the Kafig Guild Outpost, you see a lively and quite well maintained place. People are talking and sharing stories. On the walls, there are maps and trophies from adventures and the Insignia of the Eterna Guild. In the middle, there's a space where plans are made. A small desk in the corner has important papers and messages. The atmosphere feels friendly and busy, showing that the outpost is a key spot where everyone works together, The Front wall is adorned with the portrait of the revered ranger "Demon Bird" Basil.\n\n**use /questboard to view the Questboard**`)
                            await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
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
                    
                    await interaction.editReply({embeds:[Interiorembed],components:[Interiorselect,btn_cancel]})
                    }
                else if(j.customId == "exterior"){
                       await interaction.editReply({embeds:[Exteriorembed],components:[Exteriorselect,btn_cancel]})

                        }
                    
                
            })              
       
                }
                else if(city_town == "Raflese"){
                    let Interiorembed
                                        let Exteriorembed
                                        let mount = "None"
                                        if(mount == "None"){
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT EXTERIOR LOCATION')
                                        .setDescription(`choose a place to travel outside ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Stateship of Dremenlond`,
                                                value:`**Travelled on Stagecoach**\n**Description**: A realm of opulence and ambition, where dreams are bought and sold amidst the whispers of power and privilege.\n**Cost**: 100 🪙\n`
                                            },
                                            {
                                                name: `Township of Kafig`,
                                                value:`**Travelled on Stagecoach**\n**Description**:Kafig, a vibrant town nestled near the mystical Asche Peak, where the locals revere Avian Spyriths, especially the mythical Radohn, and thrive in a bustling market for flying spyriths.\n**Cost**: 100 🪙\n`
                                            },
                                            {
                                                name: `Bleeding Gorge`,
                                                value:`**Travelled on Stagecoach**\n**Description**: A hauntingly beautiful canyon, where blood red streams cascade through rugged cliffs\n**Cost**: 0 🪙\n`
                                            },
                                        ])
                                        
                                        }
                                        else{
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Stateship of Dremenlond`,
                                                value:`**Travelled on Spyralink**\n**Description**: A realm of opulence and ambition, where dreams are bought and sold amidst the whispers of power and privilege.\n**Cost**: 0 🪙\n`
                                            },
                                            {
                                                name: `Township of Kafig`,
                                                value:`**Travelled on Spyralink**\n**Description**:Kafig, a vibrant town nestled near the mystical Asche Peak, where the locals revere Avian Spyriths, especially the mythical Radohn, and thrive in a bustling market for flying spyriths.\n**Cost**: 0 🪙\n`
                                            },
                                            {
                                                name: `Bleeding Gorge`,
                                                value:`**Travelled on Spyralink**\n**Description**:A hauntingly beautiful canyon, where blood red streams cascade through rugged cliffs\n**Cost**: 0 🪙\n`
                                            },
                                        ])
    
                                        }
                                        
                                   Interiorembed = new MessageEmbed()
                                   .setColor('RANDOM')
                                   .setTitle('SELECT INTERIOR LOCATION')
                                   .setDescription(`Choose a location to visit in ${city_town}`)
                                   .addFields([
                                    {
                                        name: `Vita Street`,
                                        value:`**Description**: A bustling Raflese street known for magical potions and herbs.\n`
                                    },
                                    {
                                        name: `Eden Garden`,
                                        value:`**Description**: A central botanical haven with the legendary Tree of Life.\n`
                                    },
                                    {
                                        name: `The Green Keep`,
                                        value:`**Description**: A guarded, glass-domed research facility headed by Dr. Rosalie.\n`
                                    },
                                    {
                                        name: `The Plantastic Inn`,
                                        value:`**Description**: A renowned inn in Raflese, celebrated for its exquisite vegetarian cuisine and floral-spiced tea.\n`
                                    },
                                    {
                                        name: `Raflese Guild Outpost`,
                                        value:`**Description**:  The Guild Outpost of Raflese, one of the many outposts under the jurisdiction of Eterna Guild and serves as the central hub for rangers around.\n`
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
                        label: `Stateship of Dremenlond`,
                        description: ``,
                        value: `Dremenlond`,
                    },
                    {
                        label: `Township of Kafig`,
                        description: ``,
                        value: `Kafig`,
                    },{
                        label: `Bleeding Gorge`,
                        description: ``,
                        value: `Bleeding Gorge`,
                    },
                    )
                    .setDisabled(false),
            ]) 

            let Interiorselect =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_interior')
                    .setPlaceholder(`Select a location ${interaction.user.username}`)
                    .addOptions({
                        label: `Vita Street`,
                        description: ``,
                        value: `Vita Street`,
                    },{
                        label: `Eden Garden`,
                        description: ``,
                        value: `Eden Garden`,
                    },{
                        label: `Plantastic Inn`,
                        description: ``,
                        value: `Plantastic Inn`,
                    },{
                        label: `The Green Keep`,
                        description: ``,
                        value: `The Green Keep`,
                    },{
                        label: `Raflese Guild Outpost`,
                        description: ``,
                        value: `Raflese Guild Outpost`,
                    }
                    
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
                    if(location == 'Dremenlond'){
                        if(foundUser.coins >=100 && foundUser.mount == "None"){
                            await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-100,location:"None"})
                        const attachment = new MessageAttachment('assets/Dremenlond/dremenlond_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://dremenlond_main.jpg')
                        .setDescription(`As you enter Dremenlond, you're immediately immersed in a realm of grandeur and ambition. Towering spires, bustling streets, and opulent displays beckon, offering a glimpse into a world of wealth and refinement. Yet, beneath the surface, you sense a palpable tension between privilege and aspiration, fueling your curiosity to explore further.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else if(foundUser.mount != "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Dremenlond/dremenlond_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://dremenlond_main.jpg')
                        .setDescription(`As you enter Dremenlond, you're immediately immersed in a realm of grandeur and ambition. Towering spires, bustling streets, and opulent displays beckon, offering a glimpse into a world of wealth and refinement. Yet, beneath the surface, you sense a palpable tension between privilege and aspiration, fueling your curiosity to explore further.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else{
                            interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                        }
                        
                    }
                    
                    else if(location == 'Bleeding Gorge'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Raflese/bleeding_gorge.jpeg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://bleeding_gorge.jpeg')
                        .setDescription(`As you arrive at the edge of Bleeding Gorge, a breathtaking panorama unfolds before you. Towering cliffs, weathered by time, enclose a deep chasm where a river of crimson water flows with an otherworldly grace. The air is heavy with the scent of damp earth and the distant echo of rushing water. As you peer into the depths below, shadows dance amidst the crimson currents, hinting at the enigmatic depths of this ancient gorge.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }

                    else if(location == 'Kafig'){
                        if(foundUser.coins >=0 && foundUser.mount == "None"){
                            await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Kafig/kafig_main.jpeg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://kafig_main.jpeg')
                        .setDescription(`As you enter Kafig, vibrant bird houses adorn every corner of the bustling town, creating a picturesque scene. The Avian Square, with its central obsidian statue, stands as a focal point amidst the lively atmosphere. Traders and merchants add to the visual tapestry, drawn to the town's reputation as a thriving market for flying spyriths, while the air carries a sense of reverence for the mythical Avian Spyriths.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else if(foundUser.mount != "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Kafig/kafig_main.jpeg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://kafig_main.jpeg')
                        .setDescription(`As you enter Kafig, vibrant bird houses adorn every corner of the bustling town, creating a picturesque scene. The Avian Square, with its central obsidian statue, stands as a focal point amidst the lively atmosphere. Traders and merchants add to the visual tapestry, drawn to the town's reputation as a thriving market for flying spyriths, while the air carries a sense of reverence for the mythical Avian Spyriths.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else{
                            interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                        }
                        
                    }
                    
                    
                collector_select.stop()
                collector_cancel.stop()
                    
                }
                else if(collected.customId == "select_interior"){
                    await profileModel.updateOne({userID:authorId},{location:location})
               
                    if(location == 'Vita Street'){
                        const attachment = new MessageAttachment('assets/Raflese/vita_street.jpeg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://vita_street.jpeg')
                        .setDescription(`As you arrive at Vita Street, it's like stepping into a lively painting. The air is filled with the sweet smell of magical potions and unique herbs. Colorful shops line the street, like Elixir Emporium with its shiny bottles and Sage's Gardenia showcasing amazing plants and herbs.\n\n**This is a shop location use /shop to open the shop**`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Eden Garden'){
                        const attachment = new MessageAttachment('assets/Raflese/eden_garden.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://eden_garden.jpeg')
                            .setDescription(`Entering Eden Garden feels like stepping into a magical tapestry. The air is filled with the sweet fragrance of exotic herbs and blossoms. At the heart stands the awe-inspiring Tree of Life, a towering testament to Raflese's transformation from barren land to flourishing paradise.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'The Green Keep'){
                        const attachment = new MessageAttachment('assets/Raflese/green_keep.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://green_keep.jpeg')
                            .setDescription(`The Green Keep on the outskirts is a transparent dome, hinting at secretive research within. Guards stand watch at the entrance, creating an atmosphere charged with scientific curiosity and whispered ethical concerns.**`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Plantastic Inn'){
                        const attachment = new MessageAttachment('assets/Raflese/plantastic_inn.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://plantastic_inn.jpeg')
                            .setDescription(`Plantastic Inn welcomes you with a charming exterior adorned with hanging baskets of flowers. The air carries the mouthwatering aroma of plant-based delicacies, and the subtle melody of laughter drifts from within, inviting you to experience the town's renowned vegetarian cuisine.\n\n`)
                            await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
                            await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Raflese Guild Outpost'){
                        const attachment = new MessageAttachment('assets/Raflese/raflese_guildoutpost.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://raflese_guildoutpost.jpeg')
                            .setDescription(`The Raflese Guild Outpost buzzes with excitement. The quest-board promises adventure, and the lively chatter of adventurers creates an energetic atmosphere. It becomes a gateway, connecting Raflese to the power of Ajins.\n\n**use /questboard to view the Questboard**`)
                            await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
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
                    
                    await interaction.editReply({embeds:[Interiorembed],components:[Interiorselect,btn_cancel]})
                    }
                else if(j.customId == "exterior"){
                       await interaction.editReply({embeds:[Exteriorembed],components:[Exteriorselect,btn_cancel]})

                        }
                    
                
            })              
       
                }
                else if(city_town == "Bleeding Gorge"){
                    let Interiorembed
                                        let Exteriorembed
                                        let mount = "None"
                                        if(mount == "None"){
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT EXTERIOR LOCATION')
                                        .setDescription(`choose a place to travel outside ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Township of Raflese`,
                                                value:`**Travelled on Stagecoach**\n**Description**:A botanical paradise where lush greenery, cultural traditions, and medicinal intrigue converge.\n**Cost**: 0 🪙\n`
                                            },
                                        ])
                                        
                                        }
                                        else{
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Township of Raflese`,
                                                value:`**Travelled on Spyralink**\n**Description**:A botanical paradise where lush greenery, cultural traditions, and medicinal intrigue converge.\n**Cost**: 0 🪙\n`
                                            },
                                        ])
    
                                        }
                                        
                                   Interiorembed = new MessageEmbed()
                                   .setColor('RANDOM')
                                   .setTitle('SELECT INTERIOR LOCATION')
                                   .setDescription(`Choose a location to visit in ${city_town}`)
                                   .addFields([
                                    {
                                        name: `Vita Street`,
                                        value:`**Description**: A bustling Raflese street known for magical potions and herbs.\n`
                                    },
                                    {
                                        name: `Eden Garden`,
                                        value:`**Description**: A central botanical haven with the legendary Tree of Life.\n`
                                    },
                                    {
                                        name: `The Green Keep`,
                                        value:`**Description**: A guarded, glass-domed research facility headed by Dr. Rosalie.\n`
                                    },
                                    {
                                        name: `The Plantastic Inn`,
                                        value:`**Description**: A renowned inn in Raflese, celebrated for its exquisite vegetarian cuisine and floral-spiced tea.\n`
                                    },
                                    {
                                        name: `Raflese Guild Outpost`,
                                        value:`**Description**:  The Guild Outpost of Raflese, one of the many outposts under the jurisdiction of Eterna Guild and serves as the central hub for rangers around.\n`
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
                    .addOptions(
                    {
                        label: `Township of Raflese`,
                        description: ``,
                        value: `Raflese`,
                    },
                    )
                    .setDisabled(false),
            ]) 

            let Interiorselect =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_interior')
                    .setPlaceholder(`Select a location ${interaction.user.username}`)
                    .addOptions({
                        label: `Vita Street`,
                        description: ``,
                        value: `Vita Street`,
                    },{
                        label: `Eden Garden`,
                        description: ``,
                        value: `Eden Garden`,
                    },{
                        label: `Plantastic Inn`,
                        description: ``,
                        value: `Plantastic Inn`,
                    },{
                        label: `The Green Keep`,
                        description: ``,
                        value: `The Green Keep`,
                    },{
                        label: `Raflese Guild Outpost`,
                        description: ``,
                        value: `Raflese Guild Outpost`,
                    }
                    
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
                    

                    if(location == 'Raflese'){
                        if(foundUser.coins >=0 && foundUser.mount == "None"){
                            await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-100,location:"None"})
                        const attachment = new MessageAttachment('assets/Raflese/raflese_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://raflese_main.jpg')
                        .setDescription(`As you enter Raflese Town, you're greeted by a kaleidoscope of colors and fragrances: vibrant gardens, sweet floral scents, and the inviting allure of herbal shops. The imposing glass dome of the Green Keep lab stands on the outskirts, contrasting with the serene majesty of the Eden Garden and its iconic Tree of Life. In this botanical paradise, every corner teems with natural wonder, captivating your senses from the moment you arrive.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else if(foundUser.mount != "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Raflese/raflese_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://raflese_main.jpg')
                        .setDescription(`As you enter Raflese Town, you're greeted by a kaleidoscope of colors and fragrances: vibrant gardens, sweet floral scents, and the inviting allure of herbal shops. The imposing glass dome of the Green Keep lab stands on the outskirts, contrasting with the serene majesty of the Eden Garden and its iconic Tree of Life. In this botanical paradise, every corner teems with natural wonder, captivating your senses from the moment you arrive.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else{
                            interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                        }
                        
                    }
                    
                    
                collector_select.stop()
                collector_cancel.stop()
                    
                }
                else if(collected.customId == "select_interior"){
                    await profileModel.updateOne({userID:authorId},{location:location})
               
                    if(location == 'Vita Street'){
                        const attachment = new MessageAttachment('assets/Raflese/vita_street.jpeg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://vita_street.jpeg')
                        .setDescription(`As you arrive at Vita Street, it's like stepping into a lively painting. The air is filled with the sweet smell of magical potions and unique herbs. Colorful shops line the street, like Elixir Emporium with its shiny bottles and Sage's Gardenia showcasing amazing plants and herbs.\n\n**This is a shop location use /shop to open the shop**`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Eden Garden'){
                        const attachment = new MessageAttachment('assets/Raflese/eden_garden.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://eden_garden.jpeg')
                            .setDescription(`Entering Eden Garden feels like stepping into a magical tapestry. The air is filled with the sweet fragrance of exotic herbs and blossoms. At the heart stands the awe-inspiring Tree of Life, a towering testament to Raflese's transformation from barren land to flourishing paradise.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'The Green Keep'){
                        const attachment = new MessageAttachment('assets/Raflese/green_keep.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://green_keep.jpeg')
                            .setDescription(`The Green Keep on the outskirts is a transparent dome, hinting at secretive research within. Guards stand watch at the entrance, creating an atmosphere charged with scientific curiosity and whispered ethical concerns.**`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Plantastic Inn'){
                        const attachment = new MessageAttachment('assets/Raflese/plantastic_inn.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://plantastic_inn.jpeg')
                            .setDescription(`Plantastic Inn welcomes you with a charming exterior adorned with hanging baskets of flowers. The air carries the mouthwatering aroma of plant-based delicacies, and the subtle melody of laughter drifts from within, inviting you to experience the town's renowned vegetarian cuisine.\n\n`)
                            await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
                            await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Raflese Guild Outpost'){
                        const attachment = new MessageAttachment('assets/Raflese/raflese_guildoutpost.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://raflese_guildoutpost.jpeg')
                            .setDescription(`The Raflese Guild Outpost buzzes with excitement. The quest-board promises adventure, and the lively chatter of adventurers creates an energetic atmosphere. It becomes a gateway, connecting Raflese to the power of Ajins.\n\n**use /questboard to view the Questboard**`)
                            await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
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
                    
                    await interaction.editReply({embeds:[Interiorembed],components:[Interiorselect,btn_cancel]})
                    }
                else if(j.customId == "exterior"){
                       await interaction.editReply({embeds:[Exteriorembed],components:[Exteriorselect,btn_cancel]})

                        }
                    
                
            })              
       
                }
                else if(city_town == "Dremenlond"){
                                        let Interiorembed
                                        let Exteriorembed
                                        let mount = "None"
                                        if(mount == "None"){
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT EXTERIOR LOCATION')
                                        .setDescription(`choose a place to travel outside ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Capital of Gloaming`,
                                                value:`**Travelled on Stagecoach**\n**Description**: Majestic cityscape where history, commerce, and culture converge under the watchful eye of Castle Heliad, embodying Solarstrio's rich heritage and vibrant trade.\n**Cost**: 100 🪙\n`
                                            },
                                            {
                                                name: `Township of Kafig`,
                                                value:`**Travelled on Stagecoach**\n**Description**:Kafig, a vibrant town nestled near the mystical Asche Peak, where the locals revere Avian Spyriths, especially the mythical Radohn, and thrive in a bustling market for flying spyriths.\n**Cost**: 100 🪙\n`
                                            },
                                            {
                                                name: `Township of Raflese`,
                                                value:`**Travelled on Stagecoach**\n**Description**:A botanical paradise where lush greenery, cultural traditions, and medicinal intrigue converge.\n**Cost**: 100 🪙\n`
                                            },
                                            
                                        ])
                                        
                                        }
                                        else{
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Capital of Gloaming`,
                                                value:`**Travelled on Spyralink**\n**Description**: Majestic cityscape where history, commerce, and culture converge under the watchful eye of Castle Heliad, embodying Solarstrio's rich heritage and vibrant trade.\n**Cost**: 0 🪙\n`
                                            },
                                            {
                                                name: `Township of Kafig`,
                                                value:`**Travelled on Spyralink**\n**Description**:Kafig, a vibrant town nestled near the mystical Asche Peak, where the locals revere Avian Spyriths, especially the mythical Radohn, and thrive in a bustling market for flying spyriths.\n**Cost**: 0 🪙\n`
                                            },
                                            {
                                                name: `Township of Raflese`,
                                                value:`**Travelled on Spyralink**\n**Description**:A botanical paradise where lush greenery, cultural traditions, and medicinal intrigue converge.\n**Cost**: 0 🪙\n`
                                        },
                                        
                                        ])
    
                                        }
                                        
                                   Interiorembed = new MessageEmbed()
                                   .setColor('RANDOM')
                                   .setTitle('SELECT INTERIOR LOCATION')
                                   .setDescription(`Choose a location to visit in ${city_town}`)
                                   .addFields([
                                    {
                                        name: `Royal District`,
                                        value:`**Description**: A fancy area with grand palaces and beautiful gardens, where rich and nobility live.\n`
                                    },
                                    {
                                        name: `Marché Royale`,
                                        value:`**Description**: Dremenlond's diverse and premium marketplace to suite the tastes of the Nobility\n`
                                    },
                                    {
                                        name: `Reich Auction House`,
                                        value:`**Description**: The grandest auction house Vearth has ever seen.\n`
                                    },
                                    {
                                        name: `Lumiere Academy`,
                                        value:`**Description**: The most Renowned educational institution in Solarstrio.\n`
                                    },
                                    {
                                        name: `Hotel Sapphire Star`,
                                        value:`**Description**: Luxurious accommodation and dining in the heart of Dremenlond.\n`
                                    },
                                    {
                                        name: `The Royal Council`,
                                        value:`**Description**: The Administrative headquarters of Solarstrio.\n`
                                    },
                                    {
                                        name: `Dremenlond Ranger Centre`,
                                        value:`**Description**: Headquarters of Ranger Association in Solarstrio branch.\n`
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
                        label: `Capital of Gloaming`,
                        description: ``,
                        value: `Gloaming`,
                    },
                    {
                        label: `Township of Kafig`,
                        description: ``,
                        value: `Kafig`,
                    },{
                        label: `Township of Raflese`,
                        description: ``,
                        value: `Raflese`,
                    },
                    )
                    .setDisabled(false),
            ]) 

            let Interiorselect =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_interior')
                    .setPlaceholder(`Select a location ${interaction.user.username}`)
                    .addOptions({
                        label: `Royal District`,
                        description: ``,
                        value: `Royal District`,
                    },{
                        label: `Marché Royale`,
                        description: ``,
                        value: `Marché Royale`,
                    },{
                        label: `Reich Auction House`,
                        description: ``,
                        value: `Reich Auction House`,
                    },{
                        label: `Lumiere Academy`,
                        description: ``,
                        value: `Lumiere Academy`,
                    },{
                        label: `Hotel Sapphire Star`,
                        description: ``,
                        value: `Hotel Sapphire Star`,
                    },{
                        label: `The Royal Council`,
                        description: ``,
                        value: `The Royal Council`,
                    },{
                        label: `Dremenlond Ranger Centre`,
                        description: ``,
                        value: `Dremenlond Ranger Centre`,
                    }
                    
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
                    if(location == 'Gloaming'){
                        if(foundUser.coins >=100 && foundUser.mount == "None"){
                            await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-100,location:"None"})
                        const attachment = new MessageAttachment('assets/Gloaming/gloaming_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://gloaming_main.jpg')
                        .setDescription(`As you enter Gloaming, you're greeted by bustling streets lined with towering stone columns and bridges. In the distance, the majestic Castle of Heliad stands tall against the sky. Below, the vibrant Badshahi Bazaar offers a colorful array of goods, while the King's personal military patrol with purpose. Everywhere, the city pulses with energy, a testament to its rich history and lively atmosphere.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else if(foundUser.mount != "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Dremenlond/dremenlond_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://dremenlond_main.jpg')
                        .setDescription(`As you enter Gloaming, you're greeted by bustling streets lined with towering stone columns and bridges. In the distance, the majestic Castle of Heliad stands tall against the sky. Below, the vibrant Badshahi Bazaar offers a colorful array of goods, while the King's personal military patrol with purpose. Everywhere, the city pulses with energy, a testament to its rich history and lively atmosphere.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else{
                            interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                        }
                        
                    }
                    else if(location == 'Raflese'){
                        if(foundUser.coins >=0 && foundUser.mount == "None"){
                            await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-100,location:"None"})
                        const attachment = new MessageAttachment('assets/Raflese/raflese_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://raflese_main.jpg')
                        .setDescription(`As you enter Raflese Town, you're greeted by a kaleidoscope of colors and fragrances: vibrant gardens, sweet floral scents, and the inviting allure of herbal shops. The imposing glass dome of the Green Keep lab stands on the outskirts, contrasting with the serene majesty of the Eden Garden and its iconic Tree of Life. In this botanical paradise, every corner teems with natural wonder, captivating your senses from the moment you arrive.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else if(foundUser.mount != "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Raflese/raflese_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://raflese_main.jpg')
                        .setDescription(`As you enter Raflese Town, you're greeted by a kaleidoscope of colors and fragrances: vibrant gardens, sweet floral scents, and the inviting allure of herbal shops. The imposing glass dome of the Green Keep lab stands on the outskirts, contrasting with the serene majesty of the Eden Garden and its iconic Tree of Life. In this botanical paradise, every corner teems with natural wonder, captivating your senses from the moment you arrive.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else{
                            interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                        }
                        
                    }

                    else if(location == 'Kafig'){
                        if(foundUser.coins >=0 && foundUser.mount == "None"){
                            await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Kafig/kafig_main.jpeg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://kafig_main.jpeg')
                        .setDescription(`As you enter Kafig, vibrant bird houses adorn every corner of the bustling town, creating a picturesque scene. The Avian Square, with its central obsidian statue, stands as a focal point amidst the lively atmosphere. Traders and merchants add to the visual tapestry, drawn to the town's reputation as a thriving market for flying spyriths, while the air carries a sense of reverence for the mythical Avian Spyriths.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else if(foundUser.mount != "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Kafig/kafig_main.jpeg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://kafig_main.jpeg')
                        .setDescription(`As you enter Kafig, vibrant bird houses adorn every corner of the bustling town, creating a picturesque scene. The Avian Square, with its central obsidian statue, stands as a focal point amidst the lively atmosphere. Traders and merchants add to the visual tapestry, drawn to the town's reputation as a thriving market for flying spyriths, while the air carries a sense of reverence for the mythical Avian Spyriths.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else{
                            interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                        }
                        
                    }
                    
                    
                collector_select.stop()
                collector_cancel.stop()
                    
                }
                else if(collected.customId == "select_interior"){
                    await profileModel.updateOne({userID:authorId},{location:location})
               
                    if(location == 'Royal District'){
                        const attachment = new MessageAttachment('assets/Dremenlond/royal_district.jpeg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://royal_district.jpeg')
                        .setDescription(`As you enter the Royal District, you are greeted by tall, ornate gates. The streets are wide and well-maintained, lined with lavish mansions and elegant gardens. Walking through the Royal District, you see magnificent mansions belonging to the noble houses. Each house has its own distinctive architecture and style, showcasing the wealth and power of Dremenlond's nobility.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Marché Royale'){
                        const attachment = new MessageAttachment('assets/Dremenlond/marche_royale.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://marche_royale.jpeg')
                            .setDescription(`Upon entering Marché Royale, you are greeted by a bustling and vibrant atmosphere. The market is filled with a wide variety of shops, each offering unique goods and delicacies. Exploring Marché Royale, you find an array of shops selling exquisite items, from magical artifacts to luxurious clothing. The market caters to the refined tastes of the nobility, offering high-quality products that are sought after in Solarstrio.\n\nThis is a shop location, use **/shop** to open the shop`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Reich Auction House'){
                        const attachment = new MessageAttachment('assets/Dremenlond/reich_auction.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://reich_auction.jpeg')
                            .setDescription(`The Green Keep on the outskirts is a transparent dome, hinting at secretive research within. Guards stand watch at the entrance, creating an atmosphere charged with scientific curiosity and whispered ethical concerns.**`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Lumiere Academy'){
                        const attachment = new MessageAttachment('assets/Dremenlond/lumiere_academy.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://lumiere_academy.jpeg')
                            .setDescription(`As you approach Lumiere Academy, you see a sprawling campus with impressive buildings and beautifully landscaped grounds. The architecture exudes a sense of knowledge and wisdom. Inside Lumiere Academy, you discover a vibrant academic environment. Students can be seen engaged in various disciplines, from spyr and weapon training to research and politics. The classrooms and lecture halls are filled with eager learners, and the air is buzzing with intellectual curiosity.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Dremenlond Ranger Centre'){
                        const attachment = new MessageAttachment('assets/Dremenlond/dremenlond_rangercentre.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://dremenlond_rangercentre.jpeg')
                            .setDescription(`As you approach the Dremenlond Ranger Centre, you are welcomed by a majestic building adorned with the emblems of the three big guilds of solarstrio. The architecture reflects a sense of grandeur and regality, befitting the esteemed nature of the rangers of noble blood. Inside the Dremenlond Ranger Centre, you step into a world of luxury and elegance. The interior is tastefully decorated, with lavish furnishings and intricate details. The walls proudly display the emblems of the three major guilds, defining their dominion over all the rangers in Solarstrio.\n\n**use /questboard to view the Questboard**`)
                            await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
                            await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Hotel Sapphire Star'){
                        const attachment = new MessageAttachment('assets/Dremenlond/sapphire_star.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://saphire_star.jpeg')
                            .setDescription(`As you reach Hotel Sapphire Star, you are greeted by an elegant and imposing facade. The hotel stands tall, exuding a sense of sophistication and grandeur. Stepping into Hotel Sapphire Star, you find yourself in a world of luxury and comfort. The lobby is adorned with exquisite chandeliers and plush furnishings, creating an atmosphere of opulence. The courteous staff welcomes you warmly and attends to your every need. The hotel offers a range of lavish rooms and suites, each tastefully decorated and equipped with modern amenities. The dining area boasts a fine selection of gourmet cuisine, prepared by skilled chefs.`)
                            await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
                            await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'The Royal Council'){
                        const attachment = new MessageAttachment('assets/Dremenlond/royal_council.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://royal_council.jpeg')
                            .setDescription(`Upon reaching the Royal Council, you find a majestic building that once served as the royal palace. Its architecture reflects a blend of regality and functionality, symbolizing the council's authority. As you approach the gates, you are stopped by Guards each belonging to the four great houses, each an elite in their own right. You are restricted access to the royal council without a proper permit.`)
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
                    
                    await interaction.editReply({embeds:[Interiorembed],components:[Interiorselect,btn_cancel]})
                    }
                else if(j.customId == "exterior"){
                       await interaction.editReply({embeds:[Exteriorembed],components:[Exteriorselect,btn_cancel]})

                        }
                    
                
            })              
       
                }
                else if(city_town == "Gloaming"){
                    let Interiorembed
                                        let Exteriorembed
                                        let mount = "None"
                                        if(mount == "None"){
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT EXTERIOR LOCATION')
                                        .setDescription(`choose a place to travel outside ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Stateship of Dremenlond`,
                                                value:`**Travelled on Stagecoach**\n**Description**: A realm of opulence and ambition, where dreams are bought and sold amidst the whispers of power and privilege.\n**Cost**: 100 🪙\n`
                                            },
                                            {
                                                name: `Orld Tree's Husk`,
                                                value:`**Travelled on Foot**\n**Description**:The Husk of the ancient Orld Tree\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Stateship of Zorya`,
                                                value:`**Travelled on StageCoach**\n**Description**:One of the largest Stateships in Solarstrio, where progress meets modernity.\n**Cost**:100 🪙`
                                            },
                                            {
                                                name: `Stateship of Nottfall`,
                                                value:`**Travelled on Stagecoach**\n**Description**: An Enigmatic nocturnal cityscape engulfed in the ethereal glow of moonlit revelry, where flying carpets traverse canals and dreams intertwine with reality under the rule of the resolute Earl Solis.\n**Cost**: 100 🪙\n`
                                            },
                                            {
                                                name: `Township of Vesper`,
                                                value:`**Travelled on Stagecoach**\n**Description**: A hidden town in the shadow of danger, driven by the allure of Nebula Flowers and governed by a delicate treaty with the lizardmen.\n**Cost**: 100 🪙\n`
                                            },
                                            
                                        ])
                                        
                                        }
                                        else{
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Stateship of Dremenlond`,
                                                value:`**Travelled on Spyralink**\n**Description**: A realm of opulence and ambition, where dreams are bought and sold amidst the whispers of power and privilege.\n**Cost**: 0 🪙\n`
                                            },
                                            {
                                                name: `Orld Tree's Husk`,
                                                value:`**Travelled on Spyralink**\n**Description**:The Husk of the ancient Orld Tree\n**Cost**: 0 🪙\n`
                                            },
                                            {
                                                name: `Stateship of Zorya`,
                                                value:`**Travelled on Spyralink**\n**Description**:One of the largest Stateships in Solarstrio, where progress meets modernity.\n**Cost**: 0 🪙`
                                            },
                                            {
                                                name: `Stateship of Nottfall`,
                                                value:`**Travelled on Spyralink**\n**Description**: An Enigmatic nocturnal cityscape engulfed in the ethereal glow of moonlit revelry, where flying carpets traverse canals and dreams intertwine with reality under the rule of the resolute Earl Solis.\n**Cost**: 0 🪙\n`
                                            },
                                            {
                                                name: `Township of Vesper`,
                                                value:`**Travelled on Spyralink**\n**Description**: A hidden town in the shadow of danger, driven by the allure of Nebula Flowers and governed by a delicate treaty with the lizardmen.\n**Cost**: 0 🪙\n`
                                            },
                                        
                                        ])
    
                                        }
                                        
                                   Interiorembed = new MessageEmbed()
                                   .setColor('RANDOM')
                                   .setTitle('SELECT INTERIOR LOCATION')
                                   .setDescription(`Choose a location to visit in ${city_town}`)
                                   .addFields([
                                    {
                                        name: `Capitol Central`,
                                        value:`**Description**:  A bustling hub of governance and diplomacy, where the kingdom's affairs are conducted.\n`
                                    },
                                    {
                                        name: `Badshahi Bazaar`,
                                        value:`**Description**: The vibrant heart of commerce and culture, where the sights beckon eager shoppers and curious wanderers alike.\n`
                                    },
                                    {
                                        name: `Spirit Arsenal`,
                                        value:`**Description**: A majestic tribute to valor and heritage, where legendary weapons of myth and legend stand.\n`
                                    },
                                    {
                                        name: `Gloaming Ranger Centre`,
                                        value:`**Description**: The hub of Ranger Activities under the jurisdiction of the Ranger Association.\n`
                                    },
                                    {
                                        name: `Solar Vault`,
                                        value:`**Description**: A secured bank where the wealth of the realm is safeguarded.\n`
                                    },
                                    {
                                        name: `Castle Heliad`,
                                        value:`**Description**: The majestic seat of Solarstrio's revered ruler King Helios\n`
                                    },
                                    {
                                        name: `Shahi Quila`,
                                        value:`**Description**: A culinary paradise where the rich flavors of the Mirazh Empire mingle with Solarstrio's hospitality.\n`
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
                        label: `Stateship of Dremenlond`,
                        description: ``,
                        value: `Dremenlond`,
                    },
                    {
                        label: `Orld Tree's Husk`,
                        description: ``,
                        value: `Orld Tree Husk`,
                    },
                    {
                        label: `Stateship of Zorya`,
                        description: ``,
                        value: `Zorya`,
                    },
                    {
                        label: `Stateship of Nottfall`,
                        description: ``,
                        value: `Nottfall`,
                    },
                    {
                        label: `Township of Vesper`,
                        description: ``,
                        value: `Vesper`,
                    },
                    )
                    .setDisabled(false),
            ]) 

            let Interiorselect =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_interior')
                    .setPlaceholder(`Select a location ${interaction.user.username}`)
                    .addOptions({
                        label: `Capitol Central`,
                        description: ``,
                        value: `Capitol Central`,
                    },{
                        label: `Badshahi Bazaar`,
                        description: ``,
                        value: `Badshahi Bazaar`,
                    },{
                        label: `Spirit Arsenal`,
                        description: ``,
                        value: `Spirit Arsenal`,
                    },{
                        label: `Gloaming Ranger Centre`,
                        description: ``,
                        value: `Gloaming Ranger Centre`,
                    },{
                        label: `Solar Vault`,
                        description: ``,
                        value: `Solar Vault`,
                    },{
                        label: `Castle Heliad`,
                        description: ``,
                        value: `Castle Heliad`,
                    },{
                        label: `Shahi Quila`,
                        description: ``,
                        value: `Shahi Quila`,
                    }
                    
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
                    if(location == 'Dremenlond'){
                        if(foundUser.coins >=100 && foundUser.mount == "None"){
                            await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-100,location:"None"})
                        const attachment = new MessageAttachment('assets/Dremenlond/dremenlond_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://dremenlond_main.jpg')
                        .setDescription(`As you enter Dremenlond, you're immediately immersed in a realm of grandeur and ambition. Towering spires, bustling streets, and opulent displays beckon, offering a glimpse into a world of wealth and refinement. Yet, beneath the surface, you sense a palpable tension between privilege and aspiration, fueling your curiosity to explore further.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else if(foundUser.mount != "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Dremenlond/dremenlond_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://dremenlond_main.jpg')
                        .setDescription(`As you enter Dremenlond, you're immediately immersed in a realm of grandeur and ambition. Towering spires, bustling streets, and opulent displays beckon, offering a glimpse into a world of wealth and refinement. Yet, beneath the surface, you sense a palpable tension between privilege and aspiration, fueling your curiosity to explore further.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else{
                            interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                        }
                        
                    }
                    else if(location == 'Nottfall'){
                        if(foundUser.coins >=100 && foundUser.mount == "None"){
                            await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-100,location:"None"})
                        const attachment = new MessageAttachment('assets/Nottfall/nottfall_main.png')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://nottfall_main.png')
                        .setDescription(`As you arrive in Nottfall, you're immersed in a nocturnal spectacle. The streets are submerged beneath a shimmering lake, while the moonlight illuminates the festivities. Flying carpets glide overhead, transporting revelers through the vibrant city. The air is filled with the aroma of exotic potions and seafood delicacies, and the sounds of live music and laughter echo through the Fire Dragon's Street. In the Royal District, Earl Solis's Castle Aurum casts a regal glow, overseeing the city's lively night. Nottfall comes alive after dark, a magical realm where dreams and reality intertwine.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else if(foundUser.mount != "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Nottfall/nottfall_main.png')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://nottfall_main.png')
                        .setDescription(`As you arrive in Nottfall, you're immersed in a nocturnal spectacle. The streets are submerged beneath a shimmering lake, while the moonlight illuminates the festivities. Flying carpets glide overhead, transporting revelers through the vibrant city. The air is filled with the aroma of exotic potions and seafood delicacies, and the sounds of live music and laughter echo through the Fire Dragon's Street. In the Royal District, Earl Solis's Castle Aurum casts a regal glow, overseeing the city's lively night. Nottfall comes alive after dark, a magical realm where dreams and reality intertwine.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else{
                            interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                        }
                        
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
                        .setDescription(`As you arrive in the Stateship of Zorya, one of the kingdom's largest states, the skyline greets you with a mesmerizing blend of architectural marvels, where progress and modernity have woven themselves into the very fabric of this bustling metropolis.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                            }
                        else if(foundUser.mount != "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Zorya/zorya_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://zorya_main.jpg')
                        .setDescription(`As you arrive in the Stateship of Zorya, one of the kingdom's largest states, the skyline greets you with a mesmerizing blend of architectural marvels, where progress and modernity have woven themselves into the very fabric of this bustling metropolis.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else{
                            interaction.editReply(`You do not have enough coins to pay for the Stagecoach`)
                        }
                
                }
            }
            else if(location == 'Orld Tree Husk'){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/Zorya/orld_husk.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://orld_husk.jpg')
                .setDescription(`Approaching the husk of the Orld Tree, you're struck by its sheer size and presence. Though now dead, its colossal form still looms large, casting shadows that seem to stretch endlessly across the land. The ground beneath your feet feels charged with energy, a testament to the tree's ancient power, which still pulses faintly through the soil. Standing in its shadow, you can't help but feel a sense of awe and wonder at the history and secrets this ancient relic holds.\n\n`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Vesper'){
                if(foundUser.coins >=100 && foundUser.mount == "None"){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-100,location:"None"})
                const attachment = new MessageAttachment('assets/Vesper/vesper_main.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://vesper_main.jpg')
                .setDescription(`
                As you arrive in Vesper, you're greeted by a unique sight. The town sits atop a foggy swamp, with roofs covered in mysterious mushrooms. People bustle about, a mix of lizard-like creatures and humans. The air is thick with anticipation, as traders and adventurers seek rare treasures amidst the murky landscape. Despite the dangers, there's an undeniable sense of intrigue in this bustling hub of activity.`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(foundUser.mount != "None"){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/Vesper/vesper_main.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://vesper_main.jpg')
                .setDescription(`
                As you arrive in Vesper, you're greeted by a unique sight. The town sits atop a foggy swamp, with roofs covered in mysterious mushrooms. People bustle about, a mix of lizard-like creatures and humans. The air is thick with anticipation, as traders and adventurers seek rare treasures amidst the murky landscape. Despite the dangers, there's an undeniable sense of intrigue in this bustling hub of activity.`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else{
                    interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                }
                
            }

                    
                    
                collector_select.stop()
                collector_cancel.stop()
                    
                }
                else if(collected.customId == "select_interior"){
                    await profileModel.updateOne({userID:authorId},{location:location})
               
                    if(location == 'Capitol Central'){
                        const attachment = new MessageAttachment('assets/Gloaming/capitol_central.jpeg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://capitol_central.jpeg')
                        .setDescription(`As you step into Capitol Central, the air is alive with the sound of hurried footsteps and the murmur of whispered conversations. Marble corridors adorned with intricate tapestries lead to vast chambers filled with ornate furnishings and imposing figures engaged in heated debates.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Badshahi Bazaar'){
                        const attachment = new MessageAttachment('assets/Gloaming/badshahi_bazaar.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://badshahi_bazaar.jpeg')
                            .setDescription(`Entering Badshahi Bazaar, you're immediately enveloped in a whirlwind of activity. Colorful stalls line bustling streets, their wares displayed in a riot of hues and textures. Merchants call out in melodic voices, extolling the virtues of their goods as shoppers haggle and bargain amidst the vibrant chaos.\n\nThis is a shop location, use **/shop** to open the shop`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Spirit Arsenal'){
                        const attachment = new MessageAttachment('assets/Gloaming/spirit_arsenal.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://spirit_arsenal.jpeg')
                            .setDescription(`Stepping into the Spirit Arsenal, you're greeted by a sense of awe and reverence. The Towering column of stone rise majestically, its surfaces adorned with intricately engraved weapons of every shape and size. Each blade tells a story of courage and sacrifice, its craftsmanship a testament to the skill of the ancient artisan.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Gloaming Ranger Centre'){
                        const attachment = new MessageAttachment('assets/Gloaming/gloaming_rangercentre.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://gloaming_rangercentre.jpeg')
                            .setDescription(`As you step into the Gloaming Ranger Centre, you're greeted by the sight of seasoned rangers clad in weathered armor and rugged attire. Rangers of every ilk and background bustle about, sharpening blades, mending gear, and trading tales of daring exploits.\n\n**use /questboard to view the Questboard**`)
                            await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
                            await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Solar Vault'){
                        const attachment = new MessageAttachment('assets/Gloaming/solar_vault.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://solar_vault.jpeg')
                            .setDescription(`Entering the Solar Vault, you're struck by the aura of wealth and power that permeates the air. Vaulted ceilings soar overhead, adorned with intricate carvings and gilded embellishments that speak of opulence and grandeur. Rows of polished teller stations stretch into the distance, attended by bankers.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    } 
                    else if(location == 'Castle Heliad'){
                        const attachment = new MessageAttachment('assets/Gloaming/castle_heliad.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://castle_heliad.jpeg')
                            .setDescription(`Ascending into Castle Heliad, you're greeted by the imposing splendor of its architecture. Stone pillars rise skyward, supporting the weight of the castle above, while banners bearing the sigil of the king flutter in the breeze. Helios Aureus clad in gleaming armor stand sentinel at every corner, their vigilant watch speaking to the kingdom's unwavering military might`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Shahi Quila'){
                        const attachment = new MessageAttachment('assets/Gloaming/shahi_quila.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://shahi_quila.jpeg')
                            .setDescription(`Stepping into Shahi Quila, you're greeted by the tantalizing aroma of spices and sizzling meats, mingling with the warm glow of lanterns and the lively chatter of diners. Tables adorned with richly embroidered cloths beckon guests to indulge in savory delicacies, served with a generous side of hospitality by bustling waitstaff clad in traditional attire.`)
                            await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
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
                    
                    await interaction.editReply({embeds:[Interiorembed],components:[Interiorselect,btn_cancel]})
                    }
                else if(j.customId == "exterior"){
                       await interaction.editReply({embeds:[Exteriorembed],components:[Exteriorselect,btn_cancel]})

                        }
                    
                
            })              
       
                }
                else if(city_town == "Vesper"){
                                        let Interiorembed
                                        let Exteriorembed
                                        let mount = "None"
                                        if(mount == "None"){
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT EXTERIOR LOCATION')
                                        .setDescription(`choose a place to travel outside ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Swamp of Abyss`,
                                                value:`**Travelled on Foot**\n**Description**:A misty, foreboding swamp with an indefinite depth, shrouded in mystery and danger.\n**Cost**: 0 🪙\n`
                                            },
                                            {
                                                name: `Stellaris Temple Ruins`,
                                                value:`**Travelled on Foot**\n**Description**:The remains of a once-sacred temple where a monstrous transformation unfolded.\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Capital of Gloaming`,
                                                value:`**Travelled on StageCoach**\n**Description**:Majestic cityscape where history, commerce, and culture converge under the watchful eye of Castle Heliad, embodying Solarstrio's rich heritage and vibrant trade.\n**Cost**: 100 🪙\n`
                                            },
                                            {
                                                name: `Stateship of Nottfall`,
                                                value:`**Travelled on Stagecoach**\n**Description**: An Enigmatic nocturnal cityscape engulfed in the ethereal glow of moonlit revelry, where flying carpets traverse canals and dreams intertwine with reality under the rule of the resolute Earl Solis.\n**Cost**: 100 🪙\n`
                                            },
                                            {
                                                name: `Township of Lucens`,
                                                value:`**Travelled on Stagecoach**\n**Description**: A coastal town steeped in maritime charm, adorned with vibrant streets, legendary landmarks, and tales of the sea.\n**Cost**: 100 🪙\n`
                                            },
                                            
                                        ])
                                        
                                        }
                                        else{
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Swamp of Abyss`,
                                                value:`**Travelled on Spyralink**\n**Description**:A misty, foreboding swamp with an indefinite depth, shrouded in mystery and danger.\n**Cost**: 0 🪙\n`
                                            },
                                            {
                                                name: `Stellaris Temple Ruins`,
                                                value:`**Travelled on Spyralink**\n**Description**:The remains of a once-sacred temple where a monstrous transformation unfolded.\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Capital of Gloaming`,
                                                value:`**Travelled on Spyralink**\n**Description**:Majestic cityscape where history, commerce, and culture converge under the watchful eye of Castle Heliad, embodying Solarstrio's rich heritage and vibrant trade.\n**Cost**: 0 🪙\n`
                                            },
                                            {
                                                name: `Stateship of Nottfall`,
                                                value:`**Travelled on Spyralink**\n**Description**: An Enigmatic nocturnal cityscape engulfed in the ethereal glow of moonlit revelry, where flying carpets traverse canals and dreams intertwine with reality under the rule of the resolute Earl Solis.\n**Cost**: 0 🪙\n`
                                            },
                                            {
                                                name: `Township of Lucens`,
                                                value:`**Travelled on Spyralink**\n**Description**: A coastal town steeped in maritime charm, adorned with vibrant streets, legendary landmarks, and tales of the sea.\n**Cost**: 0 🪙\n`
                                            },
                                        
                                        ])
    
                                        }
                                        
                                   Interiorembed = new MessageEmbed()
                                   .setColor('RANDOM')
                                   .setTitle('SELECT INTERIOR LOCATION')
                                   .setDescription(`Choose a location to visit in ${city_town}`)
                                   .addFields([
                                    {
                                        name: `Gaiyo Plaza`,
                                        value:`**Description**: A bustling town center at the heart of Vesper.\n`
                                    },
                                    {
                                        name: `Veinwalk Quarters`,
                                        value:`**Description**: The main residential area where lizardmen, humans, and guests reside.\n`
                                    },
                                    {
                                        name: `Starglow Overlook`,
                                        value:`**Description**: A vantage point offering a breathtaking view of nebula flowers.\n`
                                    },
                                    {
                                        name: `Vesper Guild Outpost`,
                                        value:`**Description**: An outpost regulating seekers of nebula flowers and maintaining order.\n`
                                    },
                                    {
                                        name: `Komodo's Rest`,
                                        value:`**Description**: The guarded location where the powerful monster Komodo slumbers.\n`
                                    },
                                    {
                                        name: `Mudcape Tavern`,
                                        value:`**Description**: A gathering spot where tales are exchanged over swamp-inspired drinks.\n`
                                    },
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
                        label: `Swamp of Abyss`,
                        description: ``,
                        value: `Swamp of Abyss`,
                    },
                    {
                        label: `Stellaris Temple Ruins`,
                        description: ``,
                        value: `Stellaris Temple Ruins`,
                    },
                    {
                        label: `Capital of Gloaming`,
                        description: ``,
                        value: `Gloaming`,
                    },
                    {
                        label: `Stateship of Nottfall`,
                        description: ``,
                        value: `Nottfall`,
                    },
                    {
                        label: `Township of Lucens`,
                        description: ``,
                        value: `Lucens`,
                    },
                    )
                    .setDisabled(false),
            ]) 

            let Interiorselect =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_interior')
                    .setPlaceholder(`Select a location ${interaction.user.username}`)
                    .addOptions({
                        label: `Gaiyo Plaza`,
                        description: ``,
                        value: `Gaiyo Plaza`,
                    },{
                        label: `Veinwalk Quarters`,
                        description: ``,
                        value: `Veinwalk Quarters`,
                    },{
                        label: `Starglow Overlook`,
                        description: ``,
                        value: `Starglow Overlook`,
                    },{
                        label: `Komodo's Rest`,
                        description: ``,
                        value: `Komodo's Rest`,
                    },{
                        label: `Vesper Guild Outpost`,
                        description: ``,
                        value: `Vesper Guild Outpost`,
                    },{
                        label: `Mudcape Tavern`,
                        description: ``,
                        value: `Mudcape Tavern`,
                    }
                    
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
                    if(location == 'Gloaming'){
                        if(foundUser.coins >=100 && foundUser.mount == "None"){
                            await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-100,location:"None"})
                        const attachment = new MessageAttachment('assets/Gloaming/gloaming_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://gloaming_main.jpg')
                        .setDescription(`As you enter Gloaming, you're greeted by bustling streets lined with towering stone columns and bridges. In the distance, the majestic Castle of Heliad stands tall against the sky. Below, the vibrant Badshahi Bazaar offers a colorful array of goods, while the King's personal military patrol with purpose. Everywhere, the city pulses with energy, a testament to its rich history and lively atmosphere.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else if(foundUser.mount != "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Dremenlond/dremenlond_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://dremenlond_main.jpg')
                        .setDescription(`As you enter Gloaming, you're greeted by bustling streets lined with towering stone columns and bridges. In the distance, the majestic Castle of Heliad stands tall against the sky. Below, the vibrant Badshahi Bazaar offers a colorful array of goods, while the King's personal military patrol with purpose. Everywhere, the city pulses with energy, a testament to its rich history and lively atmosphere.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else{
                            interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                        }
                        
                    }
                    else if(location == 'Lucens'){
                        if(foundUser.coins >=100 && foundUser.mount == "None"){
                            await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-100,location:"None"})
                        const attachment = new MessageAttachment('assets/Lucens/lucens_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://lucens_main.jpg')
                        .setDescription(`As you arrive in Lucens, the salty air and colorful streets welcome you. The Lighthouse Plateau stands tall, its statue of Captain Basilica a symbol of the town's maritime legacy. Nearby, the Temple of Still Water offers a serene retreat, while the Seabreeze Pavilion hosts lively performances celebrating local legends. Everywhere you turn, sculptures of Marvory Stone tell tales of the sea, inviting you to explore Lucens' rich history.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else if(foundUser.mount != "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Lucens/lucens_main.jpg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://lucens_main.jpg')
                        .setDescription(`As you arrive in Lucens, the salty air and colorful streets welcome you. The Lighthouse Plateau stands tall, its statue of Captain Basilica a symbol of the town's maritime legacy. Nearby, the Temple of Still Water offers a serene retreat, while the Seabreeze Pavilion hosts lively performances celebrating local legends. Everywhere you turn, sculptures of Marvory Stone tell tales of the sea, inviting you to explore Lucens' rich history.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else{
                            interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                        }
                        
                    }
                    else if(location == 'Nottfall'){
                        if(foundUser.coins >=100 && foundUser.mount == "None"){
                            await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-100,location:"None"})
                        const attachment = new MessageAttachment('assets/Nottfall/nottfall_main.png')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://nottfall_main.png')
                        .setDescription(`As you arrive in Nottfall, you're immersed in a nocturnal spectacle. The streets are submerged beneath a shimmering lake, while the moonlight illuminates the festivities. Flying carpets glide overhead, transporting revelers through the vibrant city. The air is filled with the aroma of exotic potions and seafood delicacies, and the sounds of live music and laughter echo through the Fire Dragon's Street. In the Royal District, Earl Solis's Castle Aurum casts a regal glow, overseeing the city's lively night. Nottfall comes alive after dark, a magical realm where dreams and reality intertwine.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else if(foundUser.mount != "None"){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Nottfall/nottfall_main.png')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://nottfall_main.png')
                        .setDescription(`As you arrive in Nottfall, you're immersed in a nocturnal spectacle. The streets are submerged beneath a shimmering lake, while the moonlight illuminates the festivities. Flying carpets glide overhead, transporting revelers through the vibrant city. The air is filled with the aroma of exotic potions and seafood delicacies, and the sounds of live music and laughter echo through the Fire Dragon's Street. In the Royal District, Earl Solis's Castle Aurum casts a regal glow, overseeing the city's lively night. Nottfall comes alive after dark, a magical realm where dreams and reality intertwine.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                        }
                        else{
                            interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                        }
                        
                    }
            else if(location == 'Swamp of Abyss'){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/Vesper/swamp_of_abyss.jpeg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://swamp_of_abyss.jpeg')
                .setDescription(`Entering the Swamp of Abyss, visibility diminishes as fog clings to the air. The ground feels spongy beneath your feet, and the distant croaking of unseen creatures adds an eerie soundtrack to your exploration.\n\n`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Stellaris Temple Ruins'){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/Vesper/stellaris_temple.jpeg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://stellaris_temple.jpeg')
                .setDescription(`The air thickens with the weight of history as you approach Stellaris Temple Ruins. Crumbled structures hint at former grandeur, and the echoes of ancient prayers linger. A hushed reverence fills the air, disrupted only by the occasional rustle of vegetation.\n\n`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }

                    
                    
                collector_select.stop()
                collector_cancel.stop()
                    
                }
                else if(collected.customId == "select_interior"){
                    await profileModel.updateOne({userID:authorId},{location:location})
               
                    if(location == 'Gaiyo Plaza'){
                        const attachment = new MessageAttachment('assets/Vesper/gaiyo_plaza.jpeg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://gaiyo_plaza.jpeg')
                        .setDescription(`As you step into Gaiyo Plaza, you're surrounded by a vibrant mix of lizardmen and humans, weaving through shops and stalls. The Gaiyo Shroom veins overhead form intricate patterns, casting a surreal glow over the lively marketplace.\n\nThis is a shop location, use **/shop** to open the shop`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Veinwalk Quarters'){
                        const attachment = new MessageAttachment('assets/Vesper/veinwalk_quarters.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://veinwalk_quarters.jpeg')
                            .setDescription(`Entering Veinwalk Quarters, you find homes nestled beneath the Gaiyo Shroom veins. The veins form ever-shifting patterns, casting shadows that dance across houses. Lively chatter echoes through the quarters as residents coexist in this unique habitat.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Starglow Overlook'){
                        const attachment = new MessageAttachment('assets/Vesper/starglow_overlook.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://starglow_overlook.jpeg')
                            .setDescription(`Climbing to Starglow Overlook, you're greeted by the mesmerizing sight of nebula flowers glimmering like stars. The lounge, adorned with mirrors reflecting the flowers' light, creates an otherworldly atmosphere, inducing a sense of tranquility and wonder.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Vesper Guild Outpost'){
                        const attachment = new MessageAttachment('assets/Vesper/vesper_guildoutpost.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://vesper_guildoutpost.jpeg')
                            .setDescription(`The outpost stands as a bastion against the greed-driven chaos. Guards inspect those entering Vesper, and a board displays regulations. In the courtyard, Ajins and mercenaries strategize, some eyeing the tempting allure of the Nebula Flowers.\n\n**use /questboard to view the Questboard**`)
                            await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
                            await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == `Komodo's Rest`){
                        const attachment = new MessageAttachment('assets/Vesper/komodo_rest.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://komodo_rest.jpeg')
                            .setDescription(`Approaching Komodo's Rest, you encounter elite Lizardmen guards, their eyes watchful. The atmosphere is tense, and the place exudes an aura of ancient protection. Nebula flowers, carefully fed to appease Komodo, surround the area, emitting an almost ethereal energy.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    } 
                    else if(location == 'Mudcape Tavern'){
                        const attachment = new MessageAttachment('assets/Vesper/mudcape_tavern.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://mudcape_tavern.jpeg')
                            .setDescription(`Stepping into Mudcape Tavern, you're enveloped in the scent of exotic herbs. Lively conversations mix with the occasional clinking of glasses. The tavern, adorned with swamp-themed decor, becomes a hub where stories of Nebula Flowers and swamp exploits unfold.`)
                            await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
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
                    
                    await interaction.editReply({embeds:[Interiorembed],components:[Interiorselect,btn_cancel]})
                    }
                else if(j.customId == "exterior"){
                       await interaction.editReply({embeds:[Exteriorembed],components:[Exteriorselect,btn_cancel]})

                        }
                    
                
            })              
       
                }
                else if(city_town == "Swamp of Abyss"){
                                        let Interiorembed
                                        let Exteriorembed
                                        let mount = "None"
                                        if(mount == "None"){
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT EXTERIOR LOCATION')
                                        .setDescription(`choose a place to travel outside ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Stellaris Temple Ruins`,
                                                value:`**Travelled on Foot**\n**Description**:The remains of a once-sacred temple where a monstrous transformation unfolded.\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Township of Vesper`,
                                                value:`**Travelled on Foot**\n**Description**: A hidden town in the shadow of danger, driven by the allure of Nebula Flowers and governed by a delicate treaty with the lizardmen.\n**Cost**: 0 🪙\n`
                                            },
                                            
                                        ])
                                        
                                        }
                                        else{
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Stellaris Temple Ruins`,
                                                value:`**Travelled on Spyralink**\n**Description**:The remains of a once-sacred temple where a monstrous transformation unfolded.\n**Cost**:0 🪙\n`
                                            },
                                            {
                                                name: `Township of Vesper`,
                                                value:`**Travelled on Spyralink**\n**Description**: A hidden town in the shadow of danger, driven by the allure of Nebula Flowers and governed by a delicate treaty with the lizardmen.\n**Cost**: 0 🪙\n`
                                            },
                                        ])
    
                                        }
                                        
                                   Interiorembed = new MessageEmbed()
                                   .setColor('RANDOM')
                                   .setTitle('SELECT INTERIOR LOCATION')
                                   .setDescription(`Choose a location to visit in ${city_town}`)
                                   .addFields([
                                    {
                                        name: `Gaiyo Plaza`,
                                        value:`**Description**: A bustling town center at the heart of Vesper.\n`
                                    },
                                    {
                                        name: `Veinwalk Quarters`,
                                        value:`**Description**: The main residential area where lizardmen, humans, and guests reside.\n`
                                    },
                                    {
                                        name: `Starglow Overlook`,
                                        value:`**Description**: A vantage point offering a breathtaking view of nebula flowers.\n`
                                    },
                                    {
                                        name: `Vesper Guild Outpost`,
                                        value:`**Description**: An outpost regulating seekers of nebula flowers and maintaining order.\n`
                                    },
                                    {
                                        name: `Komodo's Rest`,
                                        value:`**Description**: The guarded location where the powerful monster Komodo slumbers.\n`
                                    },
                                    {
                                        name: `Mudcape Tavern`,
                                        value:`**Description**: A gathering spot where tales are exchanged over swamp-inspired drinks.\n`
                                    },
                                   ])
        
        
        let btn_cancel = new MessageActionRow().addComponents([
            new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),
            new MessageButton().setCustomId("interior").setStyle("PRIMARY").setLabel("Vesper Interior"),
            new MessageButton().setCustomId("exterior").setStyle("PRIMARY").setLabel("exterior")])
        
        let Exteriorselect =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_exterior')
                    .setPlaceholder(`Select a place to travel ${interaction.user.username}`)
                    .addOptions(
                    {
                        label: `Stellaris Temple Ruins`,
                        description: ``,
                        value: `Stellaris Temple Ruins`,
                    },
                    {
                        label: `Township of Vesper`,
                        description: ``,
                        value: `Vesper`,
                    },
                    )
                    .setDisabled(false),
            ]) 

            let Interiorselect =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_interior')
                    .setPlaceholder(`Select a location ${interaction.user.username}`)
                    .addOptions({
                        label: `Gaiyo Plaza`,
                        description: ``,
                        value: `Gaiyo Plaza`,
                    },{
                        label: `Veinwalk Quarters`,
                        description: ``,
                        value: `Veinwalk Quarters`,
                    },{
                        label: `Starglow Overlook`,
                        description: ``,
                        value: `Starglow Overlook`,
                    },{
                        label: `Komodo's Rest`,
                        description: ``,
                        value: `Komodo's Rest`,
                    },{
                        label: `Vesper Guild Outpost`,
                        description: ``,
                        value: `Vesper Guild Outpost`,
                    },{
                        label: `Mudcape Tavern`,
                        description: ``,
                        value: `Mudcape Tavern`,
                    }
                    
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
                    
           if(location == 'Stellaris Temple Ruins'){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/Vesper/stellaris_temple.jpeg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://stellaris_temple.jpeg')
                .setDescription(`The air thickens with the weight of history as you approach Stellaris Temple Ruins. Crumbled structures hint at former grandeur, and the echoes of ancient prayers linger. A hushed reverence fills the air, disrupted only by the occasional rustle of vegetation.\n\n`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Vesper'){
                if(foundUser.coins >=100 && foundUser.mount == "None"){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-100,location:"None"})
                const attachment = new MessageAttachment('assets/Vesper/vesper_main.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://vesper_main.jpg')
                .setDescription(`
                As you arrive in Vesper, you're greeted by a unique sight. The town sits atop a foggy swamp, with roofs covered in mysterious mushrooms. People bustle about, a mix of lizard-like creatures and humans. The air is thick with anticipation, as traders and adventurers seek rare treasures amidst the murky landscape. Despite the dangers, there's an undeniable sense of intrigue in this bustling hub of activity.`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(foundUser.mount != "None"){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/Vesper/vesper_main.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://vesper_main.jpg')
                .setDescription(`
                As you arrive in Vesper, you're greeted by a unique sight. The town sits atop a foggy swamp, with roofs covered in mysterious mushrooms. People bustle about, a mix of lizard-like creatures and humans. The air is thick with anticipation, as traders and adventurers seek rare treasures amidst the murky landscape. Despite the dangers, there's an undeniable sense of intrigue in this bustling hub of activity.`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else{
                    interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                }
                
            }

                    
                    
                collector_select.stop()
                collector_cancel.stop()
                    
                }
                else if(collected.customId == "select_interior"){
                    await profileModel.updateOne({userID:authorId},{location:location})
               
                    if(location == 'Gaiyo Plaza'){
                        const attachment = new MessageAttachment('assets/Vesper/gaiyo_plaza.jpeg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://gaiyo_plaza.jpeg')
                        .setDescription(`As you step into Gaiyo Plaza, you're surrounded by a vibrant mix of lizardmen and humans, weaving through shops and stalls. The Gaiyo Shroom veins overhead form intricate patterns, casting a surreal glow over the lively marketplace.\n\nThis is a shop location, use **/shop** to open the shop`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Veinwalk Quarters'){
                        const attachment = new MessageAttachment('assets/Vesper/veinwalk_quarters.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://veinwalk_quarters.jpeg')
                            .setDescription(`Entering Veinwalk Quarters, you find homes nestled beneath the Gaiyo Shroom veins. The veins form ever-shifting patterns, casting shadows that dance across houses. Lively chatter echoes through the quarters as residents coexist in this unique habitat.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Starglow Overlook'){
                        const attachment = new MessageAttachment('assets/Vesper/starglow_overlook.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://starglow_overlook.jpeg')
                            .setDescription(`Climbing to Starglow Overlook, you're greeted by the mesmerizing sight of nebula flowers glimmering like stars. The lounge, adorned with mirrors reflecting the flowers' light, creates an otherworldly atmosphere, inducing a sense of tranquility and wonder.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Vesper Guild Outpost'){
                        const attachment = new MessageAttachment('assets/Vesper/vesper_guildoutpost.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://vesper_guildoutpost.jpeg')
                            .setDescription(`The outpost stands as a bastion against the greed-driven chaos. Guards inspect those entering Vesper, and a board displays regulations. In the courtyard, Ajins and mercenaries strategize, some eyeing the tempting allure of the Nebula Flowers.\n\n**use /questboard to view the Questboard**`)
                            await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
                            await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == `Komodo's Rest`){
                        const attachment = new MessageAttachment('assets/Vesper/komodo_rest.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://komodo_rest.jpeg')
                            .setDescription(`Approaching Komodo's Rest, you encounter elite Lizardmen guards, their eyes watchful. The atmosphere is tense, and the place exudes an aura of ancient protection. Nebula flowers, carefully fed to appease Komodo, surround the area, emitting an almost ethereal energy.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    } 
                    else if(location == 'Mudcape Tavern'){
                        const attachment = new MessageAttachment('assets/Vesper/mudcape_tavern.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://mudcape_tavern.jpeg')
                            .setDescription(`Stepping into Mudcape Tavern, you're enveloped in the scent of exotic herbs. Lively conversations mix with the occasional clinking of glasses. The tavern, adorned with swamp-themed decor, becomes a hub where stories of Nebula Flowers and swamp exploits unfold.`)
                            await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
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
                    
                    await interaction.editReply({embeds:[Interiorembed],components:[Interiorselect,btn_cancel]})
                    }
                else if(j.customId == "exterior"){
                       await interaction.editReply({embeds:[Exteriorembed],components:[Exteriorselect,btn_cancel]})

                        }
                    
                
            })              
       
                }
                else if(city_town == "Stellaris Temple Ruins"){
                                        let Interiorembed
                                        let Exteriorembed
                                        let mount = "None"
                                        if(mount == "None"){
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT EXTERIOR LOCATION')
                                        .setDescription(`choose a place to travel outside ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Swamp of Abyss`,
                                                value:`**Travelled on Foot**\n**Description**:A misty, foreboding swamp with an indefinite depth, shrouded in mystery and danger.\n**Cost**: 0 🪙\n`
                                            },
                                            {
                                                name: `Township of Vesper`,
                                                value:`**Travelled on Foot**\n**Description**: A hidden town in the shadow of danger, driven by the allure of Nebula Flowers and governed by a delicate treaty with the lizardmen.\n**Cost**: 0 🪙\n`
                                            },
                                            
                                        ])
                                        
                                        }
                                        else{
                                            Exteriorembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT PLACE')
                                        .setDescription(`choose a place to travel from ${city_town}`)
                                        .addFields([
                                            {
                                                name: `Swamp of Abyss`,
                                                value:`**Travelled on Spyralink**\n**Description**:A misty, foreboding swamp with an indefinite depth, shrouded in mystery and danger.\n**Cost**: 0 🪙\n`
                                            },
                                            {
                                                name: `Township of Vesper`,
                                                value:`**Travelled on Spyralink**\n**Description**: A hidden town in the shadow of danger, driven by the allure of Nebula Flowers and governed by a delicate treaty with the lizardmen.\n**Cost**: 0 🪙\n`
                                            },
                                        ])
    
                                        }
                                        
                                   Interiorembed = new MessageEmbed()
                                   .setColor('RANDOM')
                                   .setTitle('SELECT INTERIOR LOCATION')
                                   .setDescription(`Choose a location to visit in ${city_town}`)
                                   .addFields([
                                    {
                                        name: `Gaiyo Plaza`,
                                        value:`**Description**: A bustling town center at the heart of Vesper.\n`
                                    },
                                    {
                                        name: `Veinwalk Quarters`,
                                        value:`**Description**: The main residential area where lizardmen, humans, and guests reside.\n`
                                    },
                                    {
                                        name: `Starglow Overlook`,
                                        value:`**Description**: A vantage point offering a breathtaking view of nebula flowers.\n`
                                    },
                                    {
                                        name: `Vesper Guild Outpost`,
                                        value:`**Description**: An outpost regulating seekers of nebula flowers and maintaining order.\n`
                                    },
                                    {
                                        name: `Komodo's Rest`,
                                        value:`**Description**: The guarded location where the powerful monster Komodo slumbers.\n`
                                    },
                                    {
                                        name: `Mudcape Tavern`,
                                        value:`**Description**: A gathering spot where tales are exchanged over swamp-inspired drinks.\n`
                                    },
                                   ])
        
        
        let btn_cancel = new MessageActionRow().addComponents([
            new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),
            new MessageButton().setCustomId("interior").setStyle("PRIMARY").setLabel("Vesper Interior"),
            new MessageButton().setCustomId("exterior").setStyle("PRIMARY").setLabel("exterior")])
        
        let Exteriorselect =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_exterior')
                    .setPlaceholder(`Select a place to travel ${interaction.user.username}`)
                    .addOptions(
                    {
                        label: `Swamp of Abyss`,
                        description: ``,
                        value: `Swamp of Abyss`,
                    },
                    {
                        label: `Township of Vesper`,
                        description: ``,
                        value: `Vesper`,
                    },
                    )
                    .setDisabled(false),
            ]) 

            let Interiorselect =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select_interior')
                    .setPlaceholder(`Select a location ${interaction.user.username}`)
                    .addOptions({
                        label: `Gaiyo Plaza`,
                        description: ``,
                        value: `Gaiyo Plaza`,
                    },{
                        label: `Veinwalk Quarters`,
                        description: ``,
                        value: `Veinwalk Quarters`,
                    },{
                        label: `Starglow Overlook`,
                        description: ``,
                        value: `Starglow Overlook`,
                    },{
                        label: `Komodo's Rest`,
                        description: ``,
                        value: `Komodo's Rest`,
                    },{
                        label: `Vesper Guild Outpost`,
                        description: ``,
                        value: `Vesper Guild Outpost`,
                    },{
                        label: `Mudcape Tavern`,
                        description: ``,
                        value: `Mudcape Tavern`,
                    }
                    
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
                    
                    if(location == 'Swamp of Abyss'){
                        await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                        const attachment = new MessageAttachment('assets/Vesper/swamp_of_abyss.jpeg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://swamp_of_abyss.jpeg')
                        .setDescription(`Entering the Swamp of Abyss, visibility diminishes as fog clings to the air. The ground feels spongy beneath your feet, and the distant croaking of unseen creatures adds an eerie soundtrack to your exploration.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
            else if(location == 'Vesper'){
                if(foundUser.coins >=100 && foundUser.mount == "None"){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-100,location:"None"})
                const attachment = new MessageAttachment('assets/Vesper/vesper_main.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://vesper_main.jpg')
                .setDescription(`
                As you arrive in Vesper, you're greeted by a unique sight. The town sits atop a foggy swamp, with roofs covered in mysterious mushrooms. People bustle about, a mix of lizard-like creatures and humans. The air is thick with anticipation, as traders and adventurers seek rare treasures amidst the murky landscape. Despite the dangers, there's an undeniable sense of intrigue in this bustling hub of activity.`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(foundUser.mount != "None"){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/Vesper/vesper_main.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://vesper_main.jpg')
                .setDescription(`
                As you arrive in Vesper, you're greeted by a unique sight. The town sits atop a foggy swamp, with roofs covered in mysterious mushrooms. People bustle about, a mix of lizard-like creatures and humans. The air is thick with anticipation, as traders and adventurers seek rare treasures amidst the murky landscape. Despite the dangers, there's an undeniable sense of intrigue in this bustling hub of activity.`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else{
                    interaction.editReply(`You dont have enough coins to pay for the Stagecoach`)
                }
                
            }

                    
                    
                collector_select.stop()
                collector_cancel.stop()
                    
                }
                else if(collected.customId == "select_interior"){
                    await profileModel.updateOne({userID:authorId},{location:location})
               
                    if(location == 'Gaiyo Plaza'){
                        const attachment = new MessageAttachment('assets/Vesper/gaiyo_plaza.jpeg')
                        let successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://gaiyo_plaza.jpeg')
                        .setDescription(`As you step into Gaiyo Plaza, you're surrounded by a vibrant mix of lizardmen and humans, weaving through shops and stalls. The Gaiyo Shroom veins overhead form intricate patterns, casting a surreal glow over the lively marketplace.\n\nThis is a shop location, use **/shop** to open the shop`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Veinwalk Quarters'){
                        const attachment = new MessageAttachment('assets/Vesper/veinwalk_quarters.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://veinwalk_quarters.jpeg')
                            .setDescription(`Entering Veinwalk Quarters, you find homes nestled beneath the Gaiyo Shroom veins. The veins form ever-shifting patterns, casting shadows that dance across houses. Lively chatter echoes through the quarters as residents coexist in this unique habitat.\n\n`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Starglow Overlook'){
                        const attachment = new MessageAttachment('assets/Vesper/starglow_overlook.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://starglow_overlook.jpeg')
                            .setDescription(`Climbing to Starglow Overlook, you're greeted by the mesmerizing sight of nebula flowers glimmering like stars. The lounge, adorned with mirrors reflecting the flowers' light, creates an otherworldly atmosphere, inducing a sense of tranquility and wonder.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == 'Vesper Guild Outpost'){
                        const attachment = new MessageAttachment('assets/Vesper/vesper_guildoutpost.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://vesper_guildoutpost.jpeg')
                            .setDescription(`The outpost stands as a bastion against the greed-driven chaos. Guards inspect those entering Vesper, and a board displays regulations. In the courtyard, Ajins and mercenaries strategize, some eyeing the tempting allure of the Nebula Flowers.\n\n**use /questboard to view the Questboard**`)
                            await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
                            await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    }
                    else if(location == `Komodo's Rest`){
                        const attachment = new MessageAttachment('assets/Vesper/komodo_rest.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://komodo_rest.jpeg')
                            .setDescription(`Approaching Komodo's Rest, you encounter elite Lizardmen guards, their eyes watchful. The atmosphere is tense, and the place exudes an aura of ancient protection. Nebula flowers, carefully fed to appease Komodo, surround the area, emitting an almost ethereal energy.`)
                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                    } 
                    else if(location == 'Mudcape Tavern'){
                        const attachment = new MessageAttachment('assets/Vesper/mudcape_tavern.jpeg')
                        let successembed
                            successembed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('LOCATION REACHED')
                            .setImage('attachment://mudcape_tavern.jpeg')
                            .setDescription(`Stepping into Mudcape Tavern, you're enveloped in the scent of exotic herbs. Lively conversations mix with the occasional clinking of glasses. The tavern, adorned with swamp-themed decor, becomes a hub where stories of Nebula Flowers and swamp exploits unfold.`)
                            await profileModel.updateOne({userID:authorId},{health:getHealth(foundUser.level,foundUser.vitality)})
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
                    
                    await interaction.editReply({embeds:[Interiorembed],components:[Interiorselect,btn_cancel]})
                    }
                else if(j.customId == "exterior"){
                       await interaction.editReply({embeds:[Exteriorembed],components:[Exteriorselect,btn_cancel]})

                        }
                    
                
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