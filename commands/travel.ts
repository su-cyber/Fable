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
                            interaction.reply(`You cannot use this command inside a dungeon!`)
                           }
                           else{
                            const kingdom = foundUser.kingdom
                            const city_town = foundUser.city_town
    
                            if(kingdom == "solarstrio"){
                                if(city_town == "aube"){
                                    let embed
                                    let mount = "none"
                                    if(mount == "none"){
                                        embed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('SELECT PLACE')
                                    .setDescription(`choose a place to travel from Aube Town`)
                                    .addFields([
                                        {
                                            name: `Castellan Fields`,
                                            value:`**Travelled on Foot**\n**Description**:a field outside aube town\n**Cost**:0 🪙`
                                        },
                                        {
                                            name: `Sunshade Forest`,
                                            value:`**Travelled on Foot**\n**Description**:a forest outside aube town\n**Cost**:0 🪙`
                                        },
                                        {
                                            name: `The Badlands`,
                                            value:`**Travelled on Foot**\n**Description**:the outskirts of aube town\n**Cost**:0 🪙`
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
                                            value:`**Travelled on Mount**\n**Description**:a field outside aube town\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Sunshade Forest`,
                                            value:`**Travelled on Mount**\n**Description**:a forest outside aube town\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `The Badlands`,
                                            value:`**Travelled on Mount**\n**Description**:the outskirts of aube town\n**Cost**:0 🪙\n`
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
                    description: `a field outside aube town`,
                    value: `Castellan Fields`,
                },{
                    label: `Sunshade Forest`,
                    description: `a forest outside aube town`,
                    value: `Sunshade Forest`,
                },
                {
                    label: `The Badlands`,
                    description: `the outskirts of aube town`,
                    value: `The Badlands`,
                },{
                    label: `State of Zorya`,
                    description: `One of the largest Stateships in Solarstrio, where progress meets modernity.`,
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
                const attachment = new MessageAttachment('assets/AubeTown/Badlands.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://Badlands.jpg')
                .setDescription(`As your eyes penetrate the Sunshade Forest in Aube Town, you encounter a foreboding realm cloaked in darkness, where the drought-resistant Sunshade Trees, adorned with broad silver leaves that reflect sunlight, create an eerie and treacherous ambiance, concealing lurking dangers within its depths.\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Zorya'){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-100,location:"None"})
                const attachment = new MessageAttachment('assets/Zorya/zorya_main.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://zorya_main.jpg')
                .setDescription(`As you arrive in the Stateship of Zorya, one of the kingdom's largest states, the skyline greets you with a mesmerizing blend of architectural marvels, where progress and modernity have woven themselves into the very fabric of this bustling metropolis.\n\nuse **/explore** to explore this location`)
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
                    else if(city_town == "Castellan Fields"){
                                    let embed
                                    let mount = "none"
                                    if(mount == "none"){
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
                                            value:`**Travelled on Foot**\n**Description**:a forest outside aube town\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `The Badlands`,
                                            value:`**Travelled on Foot**\n**Description**:the outskirts of aube town\n**Cost**:0 🪙\n`
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
                                            value:`**Travelled on Mount**\n**Description**:a forest outside aube town\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `The Badlands`,
                                            value:`**Travelled on Mount**\n**Description**:the outskirts of aube town\n**Cost**:0 🪙\n`
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
                    description: `The township of Aube`,
                    value: `aube`,
                },{
                    label: `Sunshade Forest`,
                    description: `a forest outside aube town`,
                    value: `Sunshade Forest`,
                },
                {
                    label: `The Badlands`,
                    description: `the outskirts of aube town`,
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
                .setDescription(`you visited ${location}, The township of aube\n\nuse **/explore** to explore this location`)
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
                const attachment = new MessageAttachment('assets/AubeTown/Badlands.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://Badlands.jpg')
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
                                    let mount = "none"
                                    if(mount == "none"){
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
                                            value:`**Travelled on Foot**\n**Description**:a field outside aube town\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `The Badlands`,
                                            value:`**Travelled on Foot**\n**Description**:the outskirts of aube town\n**Cost**:0 🪙\n`
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
                                            value:`**Travelled on Mount**\n**Description**:a field outside aube town\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `The Badlands`,
                                            value:`**Travelled on Mount**\n**Description**:the outskirts of aube town\n**Cost**:0 🪙\n`
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
                    description: `The township of Aube`,
                    value: `aube`,
                },{
                    label: `Castellan Fields`,
                    description: `a field outside aube town`,
                    value: `Castellan Fields`,
                },
                {
                    label: `The Badlands`,
                    description: `the outskirts of aube town`,
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
                .setDescription(`you visited ${location}, The township of aube\n\nuse **/explore** to explore this location`)
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
                                    let mount = "none"
                                    if(mount == "none"){
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
                                            value:`**Travelled on Foot**\n**Description**:a field outside aube town\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Sunshade Forest`,
                                            value:`**Travelled on Foot**\n**Description**:a forrest outside aube town\n**Cost**:0 🪙\n`
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
                                            value:`**Travelled on Mount**\n**Description**:a field outside aube town\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Sunshade Forest`,
                                            value:`**Travelled on Mount**\n**Description**:a forest outside aube town\n**Cost**:0 🪙\n`
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
                    description: `The township of Aube`,
                    value: `aube`,
                },{
                    label: `Castellan Fields`,
                    description: `a field outside aube town`,
                    value: `Castellan Fields`,
                },
                {
                    label: `Sunshade Forest`,
                    description: `the outskirts of aube town`,
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
                .setDescription(`you visited ${location}, The township of aube\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Sunshade Forest'){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/AubeTown/Badlands.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://Badlands.jpg')
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
                                            name: `Dragon’s Den`,
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
                                            name: `Orld Tree’s Husk`,
                                            value:`**Travelled on Foot**\n**Description**:The Husk of the ancient Orld Tree\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Township of Werfall`,
                                            value:`**Travelled on Stage Coach**\n**Description**:The Township of Werfall\n**Cost**:100 🪙`
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
                                            name: `Dragon’s Den`,
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
                                            name: `Orld Tree’s Husk`,
                                            value:`**Travelled on Mount**\n**Description**:The Husk of the ancient Orld Tree\n**Cost**:0 🪙\n`
                                        },
                                        {
                                            name: `Township of Werfall`,
                                            value:`**Travelled on Mount**\n**Description**:The Township of Werfall\n**Cost**:0 🪙\n`
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
                    description: `The township of Aube`,
                    value: `aube`,
                },{
                    label: `Ellior Forest`,
                    description: `The enchanting Forest of Ellior`,
                    value: `ellior`,
                },
                {
                    label: `Dragon’s Den`,
                    description: `The den of an ancient dragon`,
                    value: `Dragon’s Den`,
                },
                {
                    label: `Sunstone Mines`,
                    description: `The minefield where sunstones are mined`,
                    value: `Sunstone Mines`,
                },
                {
                    label: `Zephyr Mountain`,
                    description: `The great mountains of Zephyr range`,
                    value: `Zephyr Mountain`,
                },
                {
                    label: `State of Tethys`,
                    description: `The Stateship of Tethys`,
                    value: `Tethys`,
                },
                {
                    label: `Capital State of Gloaming`,
                    description: `The Capital of Solarstrio, stateship of Gloaming`,
                    value: `Gloaming`,
                },
                {
                    label: `Orld Tree’s Husk`,
                    description: `The Husk of the ancient Orld Tree`,
                    value: `orld husk`,
                },
                {
                    label: `Township of Werfall`,
                    description: `The Township of Werfall`,
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
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-100,location:"None"})
                const attachment = new MessageAttachment('assets/AubeTown/Aube_Town.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://Aube_Town.jpg')
                .setDescription(`you visited ${location}, The township of aube\n\nuse **/explore** to explore this location`)
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
            else if(location == 'Dragon’s Den'){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/Zorya/dragon_den.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://dragon_den.jpg')
                .setDescription(`you visited ${location},The den of an ancient Dragon\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Sunstone Mines'){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/Zorya/sunstone_mines.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://sunstone_mines.jpg')
                .setDescription(`you visited ${location},The minefield where sunstones are mined\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Zephyr Mountain'){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/Zorya/zephyr_mountain.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://zephyr_mountain.jpg')
                .setDescription(`you visited ${location},The great mountains of Zephyr range\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Tethys'){
                
                const attachment = new MessageAttachment('assets/Tethys/tethys_main.jpg')
                let successembed = new MessageEmbed()
                .setColor('RED')
                .setTitle('ERROR!')
                .setImage('attachment://tethys_main.jpg')
                .setDescription(`The road to state of Tethys is currently Blocked!\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Gloaming'){
                
                const attachment = new MessageAttachment('assets/Tethys/tethys_main.jpg')
                let successembed = new MessageEmbed()
                .setColor('RED')
                .setTitle('ERROR!')
                .setImage('attachment://tethys_main.jpg')
                .setDescription(`The road to the capital state of Gloaming is currently Blocked!\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'orld husk'){
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
                
                const attachment = new MessageAttachment('assets/Tethys/tethys_main.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://tethys_main.jpg')
                .setDescription(`The road to the township of Werfall is currently Blocked!\n\nuse **/explore** to explore this location`)
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
            else if(city_town == "ellior"){
                                    let embed
                                    let mount = "none"
                                    if(mount == "none"){
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
                                            name: `Dragon’s Den`,
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
                                            name: `Orld Tree’s Husk`,
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
                                            name: `Dragon’s Den`,
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
                                            name: `Orld Tree’s Husk`,
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
                    description: `One of the largest Stateships in Solarstrio, where progress meets modernity.`,
                    value: `Zorya`,
                },{
                    label: `Dragon’s Den`,
                    description: `The den of an ancient Dragon`,
                    value: `Dragon’s Den`,
                },
                {
                    label: `Sunstone Mines`,
                    description: `A minefield where sunstones are mined`,
                    value: `Sunstone Mines`,
                },
                {
                    label: `Zephyr Mountain`,
                    description: `The great mountains of Zephyr range`,
                    value: `Zephyr Mountain`,
                },
                {
                    label: `Orld Tree’s Husk`,
                    description: `The husk of the orld tree`,
                    value: `orld husk`,
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
            else if(location == 'Zephyr Mountain'){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/Zorya/zephyr_mountain.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://zephyr_mountain.jpg')
                .setDescription(`you visited ${location},The great mountains of Zephyr range\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Sunstone Mines'){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/Zorya/sunstone_mines.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://sunstone_mines.jpg')
                .setDescription(`you visited ${location},The minefield where sunstones are mined\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'orld husk'){
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
                                    let mount = "none"
                                    if(mount == "none"){
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
                                            name: `Orld Tree’s Husk`,
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
                                            name: `Orld Tree’s Husk`,
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
                    description: `One of the largest Stateships in Solarstrio, where progress meets modernity.`,
                    value: `Zorya`,
                },{
                    label: `Ellior Forest`,
                    description: `the enchanted forest of ellior`,
                    value: `ellior`,
                },
                {
                    label: `Sunstone Mines`,
                    description: `A minefield where sunstones are mined`,
                    value: `Sunstone Mines`,
                },
                {
                    label: `Zephyr Mountain`,
                    description: `The great mountains of Zephyr range`,
                    value: `Zephyr Mountain`,
                },
                {
                    label: `Orld Tree’s Husk`,
                    description: `The husk of the orld tree`,
                    value: `orld husk`,
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
            else if(location == 'Zephyr Mountain'){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/Zorya/zephyr_mountain.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://zephyr_mountain.jpg')
                .setDescription(`you visited ${location},The great mountains of Zephyr range\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Sunstone Mines'){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/Zorya/sunstone_mines.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://sunstone_mines.jpg')
                .setDescription(`you visited ${location},The minefield where sunstones are mined\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'orld husk'){
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
                                    let mount = "none"
                                    if(mount == "none"){
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
                                            name: `Orld Tree’s Husk`,
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
                                            name: `Orld Tree’s Husk`,
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
                    description: `One of the largest Stateships in Solarstrio, where progress meets modernity.`,
                    value: `Zorya`,
                },{
                    label: `Ellior Forest`,
                    description: `the enchanted forest of ellior`,
                    value: `ellior`,
                },
                {
                    label: `Dragon's Den`,
                    description: `A minefield where sunstones are mined`,
                    value: `Dragon's Den`,
                },
                {
                    label: `Zephyr Mountain`,
                    description: `The great mountains of Zephyr range`,
                    value: `Zephyr Mountain`,
                },
                {
                    label: `Orld Tree’s Husk`,
                    description: `The husk of the orld tree`,
                    value: `orld husk`,
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
            else if(location == 'Dragon’s Den'){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/Zorya/dragon_den.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://dragon_den.jpg')
                .setDescription(`you visited ${location},The den of an ancient Dragon\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Zephyr Mountain'){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/Zorya/zephyr_mountain.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://zephyr_mountain.jpg')
                .setDescription(`you visited ${location},The great mountains of Zephyr range\n\nuse **/explore** to explore this location`)
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
            else if(location == 'orld husk'){
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
                                    let mount = "none"
                                    if(mount == "none"){
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
                                            name: `Orld Tree’s Husk`,
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
                                            name: `Orld Tree’s Husk`,
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
                    description: `One of the largest Stateships in Solarstrio, where progress meets modernity.`,
                    value: `Zorya`,
                },{
                    label: `Ellior Forest`,
                    description: `the enchanted forest of ellior`,
                    value: `ellior`,
                },
                {
                    label: `Dragon's Den`,
                    description: `A minefield where sunstones are mined`,
                    value: `Dragon's Den`,
                },
                {
                    label: `Sunstone Mines`,
                    description: `The great mountains of Zephyr range`,
                    value: `Sunstone Mines`,
                },
                {
                    label: `Orld Tree’s Husk`,
                    description: `The husk of the orld tree`,
                    value: `orld husk`,
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
            else if(location == 'Dragon’s Den'){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/Zorya/dragon_den.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://dragon_den.jpg')
                .setDescription(`you visited ${location},The den of an ancient Dragon\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Sunstone Mines'){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/Zorya/sunstone_mines.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://sunstone_mines.jpg')
                .setDescription(`you visited ${location},The minefield where sunstones are mined\n\nuse **/explore** to explore this location`)
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
            else if(location == 'orld husk'){
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
            else if(city_town == "orld husk"){
                                    let embed
                                    let mount = "none"
                                    if(mount == "none"){
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
                    description: `One of the largest Stateships in Solarstrio, where progress meets modernity.`,
                    value: `Zorya`,
                },{
                    label: `Ellior Forest`,
                    description: `the enchanted forest of ellior`,
                    value: `ellior`,
                },
                {
                    label: `Dragon's Den`,
                    description: `A minefield where sunstones are mined`,
                    value: `Dragon's Den`,
                },
                {
                    label: `Sunstone Mines`,
                    description: `The great mountains of Zephyr range`,
                    value: `Sunstone Mines`,
                },
                {
                    label: `Zephyr Mountain`,
                    description: `The husk of the orld tree`,
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
            else if(location == 'Dragon’s Den'){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/Zorya/dragon_den.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://dragon_den.jpg')
                .setDescription(`you visited ${location},The den of an ancient Dragon\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Sunstone Mines'){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/Zorya/sunstone_mines.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://sunstone_mines.jpg')
                .setDescription(`you visited ${location},The minefield where sunstones are mined\n\nuse **/explore** to explore this location`)
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
            else if(location == 'Zephyr Mountain'){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/Zorya/zephyr_mountain.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://zephyr_mountain.jpg')
                .setDescription(`you visited ${location},The great mountains of Zephyr range\n\nuse **/explore** to explore this location`)
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
                
                            }
                           }
                 
                    })

                }
                else{
                    interaction.reply(`it seems you have not awakened yet!`)
                }
            }
        })

    })