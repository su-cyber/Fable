import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import {MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, MessageComponentInteraction,CacheType} from 'discord.js'
import { MessageAttachment } from 'discord.js'


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
                        if(foundUser.dungeon.status){
                            interaction.reply({content:`You cannot use this command inside a dungeon!`,ephemeral:true})
                           }
                           else{
                            const kingdom = foundUser.kingdom
                            const city_town = foundUser.city_town
    
                            if(kingdom == "solarstrio"){
                                if(city_town == "aube"){
                                    let embed
                                    let mount = "None"
                                    if(mount == "None"){
                                        embed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('SELECT PLACE')
                                    .setDescription(`choose a place to travel from Aube Town`)
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
                                        embed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('SELECT PLACE')
                                    .setDescription(`choose a place to travel from Aube Town`)
                                    .addFields([
                                        {
                                            name: `Castellan Fields`,
                                            value:`**Travelled on Mount**\n**Description**:The famous golden hued fields of Aube.\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Sunshade Forest`,
                                            value:`**Travelled on Mount**\n**Description**:A treacherous place for travelers and explorers alike.\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `The Badlands`,
                                            value:`**Travelled on Mount**\n**Description**: Face the crippling heat, with nothing to find in it.\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `State of Zorya`,
                                            value:`**Travelled on Mount**\n**Description**:One of the largest Stateships in Solarstrio, where progress meets modernity.a\n**Cost**:0 🪙\n`
                                        }
                                    ])

                                    }
                                    
                               
    
    
    let btn_cancel = new MessageActionRow().addComponents([
        new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),])
    
    let select =  new MessageActionRow().addComponents([
            new MessageSelectMenu()
            .setCustomId('select')
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
        let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
        let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"    
        let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select })
        let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel })
    
        
    
    
        await interaction.reply({content: null,embeds:[embed],components:[select,btn_cancel]})
    
        collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
            collected.deferUpdate().catch(() => null)
            const location = collected.values[0]
            
            
            if(location == 'Castellan Fields'){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/AubeTown/Castellan_Fields.jpeg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://Castellan_Fields.jpeg')
                .setDescription(`As your eyes sweep across the Castellan Fields in Aube Town, you behold a vast expanse of golden plains where diligent crofters toil, their sweat transforming ordinary dust into a bountiful harvest of precious riches, painting a scene of perseverance and prosperity.\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Badlands'){
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
                .setDescription(`As your eyes penetrate the Sunshade Forest in Aube Town, you encounter a foreboding realm cloaked in darkness, where the drought-resistant Sunshade Trees, adorned with broad silver leaves that reflect sunlight, create an eerie and treacherous ambiance, concealing lurking dangers within its depths.\n\nuse **/explore** to explore this location`)
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
                
                }
                else{
                   await interaction.editReply({content:`The Route to Zorya is Blocked by the Emperal Brigade due to the ongoing Nightmare, You cannot proceed right now`,embeds:[],components:[]}) 
                }
                
            }
            
            
            
    
            
            collector_select.stop()
        })
    
        collector_cancel.on('collect', async j => {
            j.deferUpdate().catch(() => null)
    
            let delembed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('CANCELLED')
            .setDescription(`location visit cancelled!`)
            
            await interaction.editReply({embeds:[delembed],components:[]})
            collector_cancel.stop()
        })
    
    
    
                    }
                    else if(city_town == "Castellan Fields"){
                                    let embed
                                    let mount = "None"
                                    if(mount == "None"){
                                        embed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('SELECT PLACE')
                                    .setDescription(`choose a place to travel from Aube Town`)
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
                                    .setDescription(`choose a place to travel from Aube Town`)
                                    .addFields([
                                        {
                                            name: `Aube Town`,
                                            value:`**Travelled on Mount**\n**Description**:The township of aube\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Sunshade Forest`,
                                            value:`**Travelled on Mount**\n**Description**:A treacherous place for travelers and explorers alike.\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `The Badlands`,
                                            value:`**Travelled on Mount**\n**Description**: Face the crippling heat, with nothing to find in it.\n**Cost**:0 🪙\n`
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
        let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select })
        let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel })
    
        
    
    
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
            else if(location == 'Badlands'){
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
                .setDescription(`As your eyes penetrate the Sunshade Forest in Aube Town, you encounter a foreboding realm cloaked in darkness, where the drought-resistant Sunshade Trees, adorned with broad silver leaves that reflect sunlight, create an eerie and treacherous ambiance, concealing lurking dangers within its depths.\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            
            
            
            
    
            
            collector_select.stop()
        })
    
        collector_cancel.on('collect', async j => {
            j.deferUpdate().catch(() => null)
    
            let delembed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('CANCELLED')
            .setDescription(`location visit cancelled!`)
            
            await interaction.editReply({embeds:[delembed],components:[]})
            collector_cancel.stop()
        })
    
    
    
            }
             else if(city_town == "Sunshade Forest"){
                                    let embed
                                    let mount = "None"
                                    if(mount == "None"){
                                        embed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('SELECT PLACE')
                                    .setDescription(`choose a place to travel from Aube Town`)
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
                                    .setDescription(`choose a place to travel from Aube Town`)
                                    .addFields([
                                        {
                                            name: `Aube Town`,
                                            value:`**Travelled on Mount**\n**Description**:The township of aube\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Castellan Fields`,
                                            value:`**Travelled on Mount**\n**Description**:The famous golden hued fields of Aube.\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `The Badlands`,
                                            value:`**Travelled on Mount**\n**Description**: Face the crippling heat, with nothing to find in it.\n**Cost**:0 🪙\n`
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
        let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select })
        let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel })
    
       
    
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
            else if(location == 'Badlands'){
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
                .setDescription(`As your eyes sweep across the Castellan Fields in Aube Town, you behold a vast expanse of golden plains where diligent crofters toil, their sweat transforming ordinary dust into a bountiful harvest of precious riches, painting a scene of perseverance and prosperity.\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            
            
            
            
    
            
            collector_select.stop()
        })
    
        collector_cancel.on('collect', async j => {
            j.deferUpdate().catch(() => null)
    
            let delembed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('CANCELLED')
            .setDescription(`location visit cancelled!`)
            
            await interaction.editReply({embeds:[delembed],components:[]})
            collector_cancel.stop()
        })
    
    
    
            }
            else if(city_town == "The Badlands"){
                                    let embed
                                    let mount = "None"
                                    if(mount == "None"){
                                        embed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('SELECT PLACE')
                                    .setDescription(`choose a place to travel from Aube Town`)
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
                                    .setDescription(`choose a place to travel from Aube Town`)
                                    .addFields([
                                        {
                                            name: `Aube Town`,
                                            value:`**Travelled on Mount**\n**Description**:The township of aube\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Castellan Fields`,
                                            value:`**Travelled on Mount**\n**Description**:The famous golden hued fields of Aube.\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Sunshade Forest`,
                                            value:`**Travelled on Mount**\n**Description**:A treacherous place for travelers and explorers alike.\n**Cost**:0 🪙\n`
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
        let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select })
        let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel })
    
        
    
    
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
                .setDescription(`As your eyes penetrate the Sunshade Forest in Aube Town, you encounter a foreboding realm cloaked in darkness, where the drought-resistant Sunshade Trees, adorned with broad silver leaves that reflect sunlight, create an eerie and treacherous ambiance, concealing lurking dangers within its depths.\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Castellan Fields'){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/AubeTown/Castellan_Fields.jpeg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://Castellan_Fields.jpeg')
                .setDescription(`As your eyes sweep across the Castellan Fields in Aube Town, you behold a vast expanse of golden plains where diligent crofters toil, their sweat transforming ordinary dust into a bountiful harvest of precious riches, painting a scene of perseverance and prosperity.\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            
            
            
            
    
            
            collector_select.stop()
        })
    
        collector_cancel.on('collect', async j => {
            j.deferUpdate().catch(() => null)
    
            let delembed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('CANCELLED')
            .setDescription(`location visit cancelled!`)
            
            await interaction.editReply({embeds:[delembed],components:[]})
            collector_cancel.stop()
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
                                            value:`**Travelled on Stage Coach**\n**Description**:The Township of Werfall\n**Cost**:500 🪙`
                                        },
                                       
                                    ])
                                    
                                    }
                                    else{
                                        embed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('SELECT PLACE')
                                    .setDescription(`choose a place to travel from Aube Town`)
                                    .addFields([
                                        {
                                            name: `Ellior Forest`,
                                            value:`**Travelled on Mount**\n**Description**:The enchanting Forest of Ellior\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Dragon's Den`,
                                            value:`**Travelled on Mount**\n**Description**:The Den of an Ancient Dragon\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Sunstone Mines`,
                                            value:`**Travelled on Mount**\n**Description**:The minefield where sunstones are mined\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Township of Aube`,
                                            value:`**Travelled on Mount**\n**Description**:The township of Aube\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Zephyr Mountain`,
                                            value:`**Travelled on Mount**\n**Description**:The great mountains of Zephyr range\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `State of Tethys`,
                                            value:`**Travelled on Mount**\n**Description**:The Stateship of Tethys\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Capital State of Gloaming`,
                                            value:`**Travelled on Mount**\n**Description**:The Capital of Solarstrio, stateship of Gloaming\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Orld Tree's Husk`,
                                            value:`**Travelled on Mount**\n**Description**:The Husk of the ancient Orld Tree\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Township of Werfall`,
                                            value:`**Travelled on Mount**\n**Description**:Werfall, once a thriving trade hub known for efficient distribution, collapsed due to a mysterious incident, leaving its lands infertile. Now a war-torn battleground between Abyssals and Rangers, the town's former prosperity is but a memory.\n**Cost**:0 🪙\n`
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
                    value: `Orld Tree Husk `,
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
        let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select })
        let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel })
    
        
    
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
                .setDescription(`As you enter the foreboding Ellior Forest, an eerie silence descends upon the air. Sinister shadows dance among the gnarled trees, whispering tales of malevolence and treachery, warning of the evil that lurks within its depths.\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == `Dragon's Den`){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/Zorya/dragon_den.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://dragon_den.jpg')
                .setDescription(`As you enter the ominous Dragon's Den, a sense of awe and trepidation engulfs you. The remnants of the fallen Greater Dragon's lair echo with tales of unimaginable wealth and hidden perils, a haunting testament to the power that once dwelled within these hallowed grounds\n\nuse **/explore** to explore this location`)
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
            else if(location == 'Orld Tree Husk '){
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
                if(foundUser.coins>=500 && foundUser.mount == "None"){
                    let successembed
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-500,location:"None"})
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
        })
    
        collector_cancel.on('collect', async j => {
            j.deferUpdate().catch(() => null)
    
            let delembed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('CANCELLED')
            .setDescription(`location visit cancelled!`)
            
            await interaction.editReply({embeds:[delembed],components:[]})
            collector_cancel.stop()
        })
    
    
    
            }
            else if(city_town == "ellior"){
                                    let embed
                                    let mount = "None"
                                    if(mount == "None"){
                                        embed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('SELECT PLACE')
                                    .setDescription(`choose a place to travel from Aube Town`)
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
                                    .setDescription(`choose a place to travel from Aube Town`)
                                    .addFields([
                                        {
                                            name: `Stateship of Zorya`,
                                            value:`**Travelled on Mount**\n**Description**:One of the largest Stateships in Solarstrio, where progress meets modernity.\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Dragon's Den`,
                                            value:`**Travelled on Mount**\n**Description**:The den of an ancient Dragon\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Sunstone Mines`,
                                            value:`**Travelled on Mount**\n**Description**:A minefield where sunstones are mined\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Zephyr Mountain`,
                                            value:`**Travelled on Mount**\n**Description**:The great mountains of Zephyr range\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Orld Tree's Husk`,
                                            value:`**Travelled on Mount**\n**Description**:The husk of the orld tree\n**Cost**:0 🪙\n`
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
                    value: ``,
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
                    value: `Orld Tree Husk `,
                },
                )
                .setDisabled(false),
        ])  
        let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
        let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"    
        let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select })
        let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel })
    
    
    
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
                .setDescription(`you visited ${location},The enchanted forest of Ellior\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == `Dragon's Den`){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/Zorya/dragon_den.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://dragon_den.jpg')
                .setDescription(`As you enter the ominous Dragon's Den, a sense of awe and trepidation engulfs you. The remnants of the fallen Greater Dragon's lair echo with tales of unimaginable wealth and hidden perils, a haunting testament to the power that once dwelled within these hallowed grounds\n\nuse **/explore** to explore this location`)
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
            else if(location == 'Orld Tree Husk '){
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
        })
    
        collector_cancel.on('collect', async j => {
            j.deferUpdate().catch(() => null)
    
            let delembed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('CANCELLED')
            .setDescription(`location visit cancelled!`)
            
            await interaction.editReply({embeds:[delembed],components:[]})
            collector_cancel.stop()
        })
    
    
    
            }
            else if(city_town == "Dragon's Den"){
                                    let embed
                                    let mount = "None"
                                    if(mount == "None"){
                                        embed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('SELECT PLACE')
                                    .setDescription(`choose a place to travel from Aube Town`)
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
                                    .setDescription(`choose a place to travel from Aube Town`)
                                    .addFields([
                                        {
                                            name: `Stateship of Zorya`,
                                            value:`**Travelled on Mount**\n**Description**:One of the largest Stateships in Solarstrio, where progress meets modernity.\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Ellior Forest`,
                                            value:`**Travelled on Mount**\n**Description**:The Enchanted Forest of Ellior\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Sunstone Mines`,
                                            value:`**Travelled on Mount**\n**Description**:A minefield where sunstones are mined\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Zephyr Mountain`,
                                            value:`**Travelled on Mount**\n**Description**:The great mountains of Zephyr range\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Orld Tree's Husk`,
                                            value:`**Travelled on Mount**\n**Description**:The husk of the orld tree\n**Cost**:0 🪙`
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
                    value: `Orld Tree Husk `,
                },
                )
                .setDisabled(false),
        ])  
        let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
        let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"    
        let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select })
        let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel })
    
    
    
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
                .setDescription(`As you enter the foreboding Ellior Forest, an eerie silence descends upon the air. Sinister shadows dance among the gnarled trees, whispering tales of malevolence and treachery, warning of the evil that lurks within its depths.\n\nuse **/explore** to explore this location`)
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
            else if(location == 'Orld Tree Husk '){
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
        })
    
        collector_cancel.on('collect', async j => {
            j.deferUpdate().catch(() => null)
    
            let delembed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('CANCELLED')
            .setDescription(`location visit cancelled!`)
            
            await interaction.editReply({embeds:[delembed],components:[]})
            collector_cancel.stop()
        })
    
    
    
            }
            else if(city_town == "Sunstone Mines"){
                                    let embed
                                    let mount = "None"
                                    if(mount == "None"){
                                        embed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('SELECT PLACE')
                                    .setDescription(`choose a place to travel from Aube Town`)
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
                                    .setDescription(`choose a place to travel from Aube Town`)
                                    .addFields([
                                        {
                                            name: `Stateship of Zorya`,
                                            value:`**Travelled on Mount**\n**Description**:One of the largest Stateships in Solarstrio, where progress meets modernity.\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Ellior Forest`,
                                            value:`**Travelled on Mount**\n**Description**:The Enchanted Forest of Ellior\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Dragon's Den`,
                                            value:`**Travelled on Mount**\n**Description**:The Den of an ancient Dragon\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Zephyr Mountain`,
                                            value:`**Travelled on Mount**\n**Description**:The great mountains of Zephyr range\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Orld Tree's Husk`,
                                            value:`**Travelled on Mount**\n**Description**:The husk of the orld tree\n**Cost**:0 🪙\n`
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
                    value: `Orld Tree Husk `,
                },
                )
                .setDisabled(false),
        ])  
        let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
        let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"    
        let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select })
        let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel })
    

    
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
                .setDescription(`As you enter the ominous Dragon's Den, a sense of awe and trepidation engulfs you. The remnants of the fallen Greater Dragon's lair echo with tales of unimaginable wealth and hidden perils, a haunting testament to the power that once dwelled within these hallowed grounds\n\nuse **/explore** to explore this location`)
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
                .setDescription(`As you enter the foreboding Ellior Forest, an eerie silence descends upon the air. Sinister shadows dance among the gnarled trees, whispering tales of malevolence and treachery, warning of the evil that lurks within its depths.\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Orld Tree Husk '){
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
        })
    
        collector_cancel.on('collect', async j => {
            j.deferUpdate().catch(() => null)
    
            let delembed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('CANCELLED')
            .setDescription(`location visit cancelled!`)
            
            await interaction.editReply({embeds:[delembed],components:[]})
            collector_cancel.stop()
        })
    
    
    
            }
            else if(city_town == "Zephyr Mountain"){
                                    let embed
                                    let mount = "None"
                                    if(mount == "None"){
                                        embed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('SELECT PLACE')
                                    .setDescription(`choose a place to travel from Aube Town`)
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
                                    .setDescription(`choose a place to travel from Aube Town`)
                                    .addFields([
                                        {
                                            name: `Stateship of Zorya`,
                                            value:`**Travelled on Mount**\n**Description**:One of the largest Stateships in Solarstrio, where progress meets modernity.\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Ellior Forest`,
                                            value:`**Travelled on Mount**\n**Description**:The Enchanted Forest of Ellior\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Dragon's Den`,
                                            value:`**Travelled on Mount**\n**Description**:The Den of an ancient Dragon\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Sunstone Mines`,
                                            value:`**Travelled on Mount**\n**Description**:The minefield when sunstones are mined\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Orld Tree's Husk`,
                                            value:`**Travelled on Mount**\n**Description**:The husk of the orld tree\n**Cost**:0 🪙`
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
                    value: `Orld Tree Husk `,
                },
                )
                .setDisabled(false),
        ])  
        let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
        let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"    
        let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select })
        let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel })
    
       
    
    
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
                .setDescription(`As you enter the ominous Dragon's Den, a sense of awe and trepidation engulfs you. The remnants of the fallen Greater Dragon's lair echo with tales of unimaginable wealth and hidden perils, a haunting testament to the power that once dwelled within these hallowed grounds\n\nuse **/explore** to explore this location`)
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
                .setDescription(`As you enter the foreboding Ellior Forest, an eerie silence descends upon the air. Sinister shadows dance among the gnarled trees, whispering tales of malevolence and treachery, warning of the evil that lurks within its depths.\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Orld Tree Husk '){
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
        })
    
        collector_cancel.on('collect', async j => {
            j.deferUpdate().catch(() => null)
    
            let delembed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('CANCELLED')
            .setDescription(`location visit cancelled!`)
            
            await interaction.editReply({embeds:[delembed],components:[]})
            collector_cancel.stop()
        })
    
    
    
            }
            else if(city_town == "Orld Tree Husk "){
                                    let embed
                                    let mount = "None"
                                    if(mount == "None"){
                                        embed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('SELECT PLACE')
                                    .setDescription(`choose a place to travel from Aube Town`)
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
                                    .setDescription(`choose a place to travel from Aube Town`)
                                    .addFields([
                                        {
                                            name: `Stateship of Zorya`,
                                            value:`**Travelled on Mount**\n**Description**:One of the largest Stateships in Solarstrio, where progress meets modernity.\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Ellior Forest`,
                                            value:`**Travelled on Mount**\n**Description**:The Enchanted Forest of Ellior\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Dragon's Den`,
                                            value:`**Travelled on Mount**\n**Description**:The Den of an ancient Dragon\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Sunstone Mines`,
                                            value:`**Travelled on Mount**\n**Description**:The minefield when sunstones are mined\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Zephyr Mountain`,
                                            value:`**Travelled on Mount**\n**Description**:The great mountains of the Zephyr range\n**Cost**:0 🪙`
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
        let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select })
        let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel })

    
    
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
                .setDescription(`As you enter the ominous Dragon's Den, a sense of awe and trepidation engulfs you. The remnants of the fallen Greater Dragon's lair echo with tales of unimaginable wealth and hidden perils, a haunting testament to the power that once dwelled within these hallowed grounds\n\nuse **/explore** to explore this location`)
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
                .setDescription(`As you enter the foreboding Ellior Forest, an eerie silence descends upon the air. Sinister shadows dance among the gnarled trees, whispering tales of malevolence and treachery, warning of the evil that lurks within its depths.\n\nuse **/explore** to explore this location`)
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
        })
    
        collector_cancel.on('collect', async j => {
            j.deferUpdate().catch(() => null)
    
            let delembed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('CANCELLED')
            .setDescription(`location visit cancelled!`)
            
            await interaction.editReply({embeds:[delembed],components:[]})
            collector_cancel.stop()
        })
    
    
    
            }
            else if(city_town == "Werfall"){
                let embed
                                    let mount = "None"
                                    if(mount == "None"){
                                        embed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('SELECT PLACE')
                                    .setDescription(`choose a place to travel from Aube Town`)
                                    .addFields([
                                        {
                                            name: `Stateship of Zorya`,
                                            value:`**Travelled on Stagecoach**\n**Description**:One of the largest Stateships in Solarstrio, where progress meets modernity.\n**Cost**:500 🪙\n`
                                        },
                                        
                                    ])
                                    
                                    }
                                    else{
                                        embed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('SELECT PLACE')
                                    .setDescription(`choose a place to travel from Aube Town`)
                                    .addFields([
                                        {
                                            name: `Stateship of Zorya`,
                                            value:`**Travelled on Mount**\n**Description**:One of the largest Stateships in Solarstrio, where progress meets modernity.\n**Cost**:0 🪙\n`
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
                )
                .setDisabled(false),
        ])  
        let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
        let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"    
        let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select })
        let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel })

    
    
        await interaction.reply({content: null,embeds:[embed],components:[select,btn_cancel]})
    
        collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
            collected.deferUpdate().catch(() => null)
            const location = collected.values[0]
            
            
            if(location == 'Zorya'){
                if(foundUser.coins >=500 && foundUser.mount == "None"){
                    await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-500,location:"None"})
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
            
            
    
            
            collector_select.stop()
        })
    
        collector_cancel.on('collect', async j => {
            j.deferUpdate().catch(() => null)
    
            let delembed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('CANCELLED')
            .setDescription(`location visit cancelled!`)
            
            await interaction.editReply({embeds:[delembed],components:[]})
            collector_cancel.stop()
        })
    
    
            }
                
                            }
                           }
                 
                    })

                }
                else{
                    interaction.reply({content:`it seems you have not awakened yet!`,ephemeral:true})
                }
            }
        })

    })