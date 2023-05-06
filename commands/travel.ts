import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import { Collector, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, MessageComponentInteraction,CacheType} from 'discord.js'
import { MessageAttachment } from 'discord.js'


export default new MyCommandSlashBuilder({ name: 'locations', description: 'visit a location' })

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
                                            value:`**Travelled on StageCoach**\n**Description**:The Great stateship of Zorya\n**Cost**:100 🪙`
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
                                            value:`**Travelled on Mount**\n**Description**:a field outside aube town\n**Cost**:0 🪙`
                                        },
                                        {
                                            name: `Sunshade Forest`,
                                            value:`**Travelled on Mount**\n**Description**:a forest outside aube town\n**Cost**:0 🪙`
                                        },
                                        {
                                            name: `The Badlands`,
                                            value:`**Travelled on Mount**\n**Description**:the outskirts of aube town\n**Cost**:0 🪙`
                                        },
                                        {
                                            name: `State of Zorya`,
                                            value:`**Travelled on Mount**\n**Description**:The Great stateship of Zorya\n**Cost**:0 🪙`
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
                    description: `The Great stateship of Zorya`,
                    value: `Zorya`,
                }
                )
                .setDisabled(false),
        ])  
        let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
        let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"    
        let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select })
        let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel })
    
        collector_select.setMaxListeners(Infinity)
        collector_cancel.setMaxListeners(Infinity)
    
    
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
                .setDescription(`you visited ${location}, a wide field outside aube town\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Badlands'){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/AubeTown/Badlands.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://Badlands.jpg')
                .setDescription(`you visited ${location},the outskirts of aube town\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Sunshade Forest'){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/AubeTown/Badlands.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://Badlands.jpg')
                .setDescription(`you visited ${location},a forest outside aube town\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Zorya'){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-100,location:"None"})
                const attachment = new MessageAttachment('assets/AubeTown/Badlands.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://Badlands.jpg')
                .setDescription(`you visited ${location},The great stateship of zorya\n\nuse **/explore** to explore this location`)
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
                                            value:`**Travelled on Foot**\n**Description**:The township of aube\n**Cost**:0 🪙`
                                        },
                                        {
                                            name: `Sunshade Forest`,
                                            value:`**Travelled on Foot**\n**Description**:a forest outside aube town\n**Cost**:0 🪙`
                                        },
                                        {
                                            name: `The Badlands`,
                                            value:`**Travelled on Foot**\n**Description**:the outskirts of aube town\n**Cost**:0 🪙`
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
                                            value:`**Travelled on Mount**\n**Description**:The township of aube\n**Cost**:0 🪙`
                                        },
                                        {
                                            name: `Sunshade Forest`,
                                            value:`**Travelled on Mount**\n**Description**:a forest outside aube town\n**Cost**:0 🪙`
                                        },
                                        {
                                            name: `The Badlands`,
                                            value:`**Travelled on Mount**\n**Description**:the outskirts of aube town\n**Cost**:0 🪙`
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
    
        collector_select.setMaxListeners(Infinity)
        collector_cancel.setMaxListeners(Infinity)
    
    
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
                .setDescription(`you visited ${location},the outskirts of aube town\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Sunshade Forest'){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/AubeTown/Badlands.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://Badlands.jpg')
                .setDescription(`you visited ${location},a forest outside aube town\n\nuse **/explore** to explore this location`)
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
                                            value:`**Travelled on Foot**\n**Description**:The township of aube\n**Cost**:0 🪙`
                                        },
                                        {
                                            name: `Castellan Fields`,
                                            value:`**Travelled on Foot**\n**Description**:a field outside aube town\n**Cost**:0 🪙`
                                        },
                                        {
                                            name: `The Badlands`,
                                            value:`**Travelled on Foot**\n**Description**:the outskirts of aube town\n**Cost**:0 🪙`
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
                                            value:`**Travelled on Mount**\n**Description**:The township of aube\n**Cost**:0 🪙`
                                        },
                                        {
                                            name: `Castellan Fields`,
                                            value:`**Travelled on Mount**\n**Description**:a field outside aube town\n**Cost**:0 🪙`
                                        },
                                        {
                                            name: `The Badlands`,
                                            value:`**Travelled on Mount**\n**Description**:the outskirts of aube town\n**Cost**:0 🪙`
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
    
        collector_select.setMaxListeners(Infinity)
        collector_cancel.setMaxListeners(Infinity)
    
    
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
                .setDescription(`you visited ${location},the outskirts of aube town\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Castellan Fields'){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/AubeTown/Castellan_Fields.jpeg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://Castellan_Fields.jpeg')
                .setDescription(`you visited ${location},a field outside aube town\n\nuse **/explore** to explore this location`)
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
                                            value:`**Travelled on Foot**\n**Description**:The township of aube\n**Cost**:0 🪙`
                                        },
                                        {
                                            name: `Castellan Fields`,
                                            value:`**Travelled on Foot**\n**Description**:a field outside aube town\n**Cost**:0 🪙`
                                        },
                                        {
                                            name: `Sunshade Forest`,
                                            value:`**Travelled on Foot**\n**Description**:a forrest outside aube town\n**Cost**:0 🪙`
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
                                            value:`**Travelled on Mount**\n**Description**:The township of aube\n**Cost**:0 🪙`
                                        },
                                        {
                                            name: `Castellan Fields`,
                                            value:`**Travelled on Mount**\n**Description**:a field outside aube town\n**Cost**:0 🪙`
                                        },
                                        {
                                            name: `Sunshade Forest`,
                                            value:`**Travelled on Mount**\n**Description**:a forest outside aube town\n**Cost**:0 🪙`
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
    
        collector_select.setMaxListeners(Infinity)
        collector_cancel.setMaxListeners(Infinity)
    
    
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
                .setDescription(`you visited ${location},a forest outside aube town\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Castellan Fields'){
                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                const attachment = new MessageAttachment('assets/AubeTown/Castellan_Fields.jpeg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://Castellan_Fields.jpeg')
                .setDescription(`you visited ${location},a field outside aube town\n\nuse **/explore** to explore this location`)
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