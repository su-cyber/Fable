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
    
                                    let embed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('SELECT LOCATION')
                                    .setDescription(`Choose a a location to visit in ${city_town}`)
                                    .addFields([
                                        {
                                            name: `The Terrific Troll Tavern`,
                                            value:`**Description**:a simple tavern\n`
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
                                            value:`**Description**:an abandoned castle.\n`
                                        }
                                    ])
                                    
                               
    
    
    let btn_cancel = new MessageActionRow().addComponents([
        new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),])
    
    let select =  new MessageActionRow().addComponents([
            new MessageSelectMenu()
            .setCustomId('select')
                .setPlaceholder(`Select a location ${interaction.user.username}`)
                .addOptions({
                    label: `The Terrific Troll Tavern`,
                    description: `a simple tavern`,
                    value: `The Terrific Troll Tavern`,
                },{
                    label: `The Lager Estate`,
                    description: `Home to the famous Lager Family and their legendary Backbreaker Beer.`,
                    value: `The Lager Estate`,
                },
                {
                    label: `Crofter's Market`,
                    description: `The Crofter’s Market is a place for craftsmanship to find new homes.`,
                    value: `Crofter's Market`,
                },{
                    label: `Aube Town Guild Outpost`,
                    description: `The Guild Outpost is home to the unwavering and dedicated Guild Rangers.`,
                    value: `Aube Town Guild Outpost`,
                },{
                    label: `Town Centre`,
                    description: `The Town Center is a place of importance, gathering and sometimes entertainment.`,
                    value: `Town Centre`,
                },{
                    label: `Abandoned Castle`,
                    description: `an abandoned castle`,
                    value: `Abandoned Castle`,
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
            
            await profileModel.updateOne({userID:authorId},{location:location})
           
            if(location == 'The Terrific Troll Tavern'){
                const attachment = new MessageAttachment('assets/AubeTown/Terrific_Troll_Tavern.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://Terrific_Troll_Tavern.jpg')
                .setDescription(`As you cast your gaze upon the Terrific Troll Tavern in Aube Town, you witness a haven where both the burdened find solace, and the troubled find empathy, as laughter intertwines with heartfelt tales, creating an atmosphere that embraces both escapism and catharsis.\n\nuse **/explore** to explore this location`)
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
                .setDescription(`As you cast your eyes upon the bustling market in Aube Town, crofters proudly display an eclectic array of wares, including intricate weapons, sturdy armor, and a cornucopia of items, creating a vibrant tapestry of commerce and craftsmanship.\n\nuse **/explore** to explore this location\n\nuse**/shop** to access the shops\nuse **/buy** to buy something\nuse **/sell** to sell something`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Aube Town Guild Outpost'){
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setDescription(`There is something about the Guild Outpost where the Guild Rangers, stalwart protectors, can be seen offering aid to the locals, their presence a shield against the dangers of magical beasts and bandits, while the air hums with a sense of shared purpose and safety\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[]})
            }
            else if(location == 'Town Centre'){
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setDescription(`As you step into the town center of Aube, a bustling community awaits your gaze. Vibrant colors intertwine with enchanting melodies as the tight-knit community of residents and travelers unite, creating a mesmerizing tapestry of joyous events and captivating festivals that dance before your eyes.\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[]})
            }
            else if(location == 'Abandoned Castle'){
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setDescription(`As you cast your gaze upon the towering Abandoned Castle in Aube Town, you witness a haunting relic of forgotten wars, its grandeur and scars visible to all, a solemn reminder of a turbulent past that continues to resonate in the hearts of those who call this town home.\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[]})
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
            interaction.reply(`The place you are in is an explorable location in it's own! `)
        }
        else if(city_town == "Sunshade Forest"){
            interaction.reply(`The place you are in is an explorable location in it's own! `)
        }
        
        else if(city_town == "Zorya"){
    
                                    let embed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('SELECT LOCATION')
                                    .setDescription(`Choose a location to visit in ${city_town}`)
                                    
                                    
                               
    
    
    let btn_cancel = new MessageActionRow().addComponents([
        new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),])
    
    let select =  new MessageActionRow().addComponents([
            new MessageSelectMenu()
            .setCustomId('select')
                .setPlaceholder(`Select a location ${interaction.user.username}`)
                .addOptions({
                    label: `Guild District`,
                    description: `The home to all guilds and the guild colosseum`,
                    value: `Guild District`,
                },{
                    label: `Guild Office`,
                    description: `The Guild Office of your guild`,
                    value: `Guild Office`,
                },
                {
                    label: `Auriga Sails Company`,
                    description: `the famous Auriga ship company run by earl Auriga`,
                    value: `Auriga Sails Company`,
                },{
                    label: `Astro Avenue`,
                    description: `Astro Avenue which is home to many foreign goods not found in Solarstrio`,
                    value: `Astro Avenue`,
                },{
                    label: `Golden Terminal`,
                    description: `A famous station for Quarantrain`,
                    value: `Golden Terminal`,
                },{
                    label: `Castle of Chariots`,
                    description: `The stunning castle of Earl Auriga`,
                    value: `Castle of Chariots`,
                },{
                    label: `Siewelle Port`,
                    description: `The Port which serves as the main market of Zorya`,
                    value: `Siewelle Port`,
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
            
            await profileModel.updateOne({userID:authorId},{location:location})
           
            if(location == 'Guild District'){
                const attachment = new MessageAttachment('assets/Zorya/guild_district.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://guild_district.jpg')
                .setDescription(`you visited ${location},The home to all guilds and the guild colosseum\n\nuse **/explore** to explore this location`)
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
                    .setDescription(`you visited a random ${location} but were restricted entry by the Guards\n\nuse **/explore** to explore this location`)
                     
                }
                else{
                    successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://guild_office.jpg')
                    .setDescription(`you visited ${foundUser.guild}'s ${location}, The main office in Solarstrio\n\nuse **/explore** to explore this location`)
                     
                }
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == `Auriga Sails Company`){
                const attachment = new MessageAttachment('assets/Zorya/auriga_company.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://auriga_company.jpg')
                .setDescription(`you visited ${location},the famous Auriga ship company run by earl Auriga\n\nuse **/explore** to explore this location\n\nuse**/shop** to access the shops\nuse **/buy** to buy something\nuse **/sell** to sell something`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Astro Avenue'){
                const attachment = new MessageAttachment('assets/Zorya/astro_avenue.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://astro_avenue.jpg')
                .setDescription(`you visited ${location},home to many foreign goods not found in Solarstrio\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Golden Terminal'){
                const attachment = new MessageAttachment('assets/Zorya/golden_terminal.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://golden_terminal.jpg')
                .setDescription(`you visited ${location},A famous station for Quarantrain\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Castle of Chariots'){
                const attachment = new MessageAttachment('assets/Zorya/castle_chariots.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://castle_chariots.jpg')
                .setDescription(`you visited ${location},The stunning castle of Earl Auriga\n\nuse **/explore** to explore this location`)
                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
            }
            else if(location == 'Siewelle Port'){
                const attachment = new MessageAttachment('assets/Zorya/siewelle_port.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('LOCATION REACHED')
                .setImage('attachment://siewelle_port.jpg')
                .setDescription(`you visited ${location},The Port which serves as the main market of Zorya\n\nuse **/explore** to explore this location`)
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
            interaction.reply(`The place you are in is an explorable location in it's own! `)
        }
        else if(city_town == "Dragon's Den"){
            interaction.reply(`The place you are in is an explorable location in it's own! `)
        }
        else if(city_town == "Zephyr Mountain"){
            interaction.reply(`The place you are in is an explorable location in it's own! `)
        }
        else if(city_town == "orld husk"){
            interaction.reply(`The place you are in is an explorable location in it's own! `)
        }
        else if(city_town == "Sunstone Mines"){
            interaction.reply(`The place you are in is an explorable location in it's own! `)
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