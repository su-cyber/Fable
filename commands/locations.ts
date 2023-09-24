import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, MessageComponentInteraction,CacheType} from 'discord.js'
import { MessageAttachment } from 'discord.js'
import getHealth from '../src/utils/getHealth'


export default new MyCommandSlashBuilder({ name: 'walk', description: 'visit a location' })

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
        
                                        let embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT LOCATION')
                                        .setDescription(`Choose a a location to visit in ${city_town}`)
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
            new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),])
        
        let select =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select')
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
            let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
            let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"    
            let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select })
            let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel })
        
           
        
            await interaction.reply({content: null,embeds:[embed],components:[select,btn_cancel]}).catch(e => {})
        
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
                    .setDescription(`As you cast your eyes upon the bustling market in Aube Town, crofters proudly display an eclectic array of wares, including intricate weapons, sturdy armor, and a cornucopia of items, creating a vibrant tapestry of commerce and craftsmanship.\n\nuse **/explore** to explore this location\n\nuse**/shop** to access the shops`)
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
            else if(city_town == "Castellan Fields"){
                interaction.reply({content:`The place you are in is an explorable location in it's own!`,ephemeral:true})
            }
            else if(city_town == "Sunshade Forest"){
                interaction.reply({content:`The place you are in is an explorable location in it's own!`,ephemeral:true})
            }
            
            else if(city_town == "Zorya"){
        
                                        let embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT LOCATION')
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
                                                name: `Castle of Chariots`,
                                                value:`**Description**:An imposing fortress residence of Earl Auriga.\n`
                                            },
                                            {
                                                name: `Siewelle Port`,
                                                value:`**Description**:A grand harbor with 7 piers guarded by towering sea gates.\n`
                                            },
                                            {
                                                name: `Black Market`,
                                                value:`**Description**:An underground network of illicit and experimental wares.\n`
                                            }
                                        ])
                                        
                                   
        
        
        let btn_cancel = new MessageActionRow().addComponents([
            new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),])
        
        let select =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select')
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
                        label: `Castle of Chariots`,
                        description: ``,
                        value: `Castle of Chariots`,
                    },{
                        label: `Siewelle Port`,
                        description: ``,
                        value: `Siewelle Port`,
                    },{
                        label: `Black Market`,
                        description: ``,
                        value: `Black Market`,
                    },
                    
                    )
                    .setDisabled(false),
            ])  
            let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
            let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"    
            let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select,time:1000*300 })
            let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel,time:1000*300 })
        
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
                    .setDescription(`As you step into the Guild District of the Stateship of Zorya, the bustling streets unfold before you, lined with branches of the world's most renowned guilds. Dedicated guild rangers, sworn to safeguard the common-folk and brave perilous quests, traverse the vibrant thoroughfares. At the heart of it all, the colossal Colosseum looms, where the roads of the district converge, a testament to the unity and valor of these guilds.\n\nuse **/explore** to explore this location`)
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
                        .setDescription(`you visited ${foundUser.guild}'s ${location}, As you enter the guild hall, you observe a bustling atmosphere filled with Rangers of varying ranks. The walls are adorned with faded banners and worn-out mission reports, a testament to the guild's history. The sound of camaraderie and training drills fills the air, as Rangers of different divisions hone their skills. Despite the lack of grandeur, there is an undeniable sense of determination and unity among the members, each striving to prove their worth and make their mark in the Ranger Association.\n\nuse **/explore** to explore this location`)
                         
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
                    .setDescription(`As you step onto Astro Avenue, a vibrant tapestry of sights and sounds envelops you. The bustling heart of the state comes alive with captivating attractions, lively street performers, and a plethora of delights, beckoning you to immerse yourself in its enchanting atmosphere.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Golden Terminal'){
                    const attachment = new MessageAttachment('assets/Zorya/golden_terminal.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://golden_terminal.jpg')
                    .setDescription(`As you arrive at the Golden Terminal, the sight of its magnificent copper architecture dazzles your eyes, reflecting the sunlight in a resplendent display. This bustling hub serves as a gateway for citizens and travelers seeking to embark on thrilling journeys across the Kingdom of Solarstrio, where the iconic Steam Train awaits, promising adventures beyond imagination, and roads unriddled with evils.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Castle of Chariots'){
                    const attachment = new MessageAttachment('assets/Zorya/castle_chariots.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://castle_chariots.jpg')
                    .setDescription(` As you arrive at the Castle of Chariots, your eyes behold a majestic fortress nestled in the heart of the Stateship of Zorya, serving as both the residence and administrative center for Earl Auriga, who oversees every facet of the state with unwavering dedication.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Siewelle Port'){
                    const attachment = new MessageAttachment('assets/Zorya/siewelle_port.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://siewelle_port.jpg')
                    .setDescription(`As you arrive at the bustling Siewelle Port, your eyes widen at the sight of its grandeur. The expansive harbor stretches before you, adorned with seven imposing piers, each protected by a towering sea gate, standing as sentinels of maritime trade and adventure.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Black Market'){
                    const attachment = new MessageAttachment('assets/Zorya/black_market.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://black_market.jpg')
                    .setDescription(`As you descend into the shadowy depths beneath the Golden Terminal, your eyes widen at the sight of the clandestine Black Market. A hidden realm of intrigue and forbidden dealings, it offers a tantalizing array of rare artifacts and perilous experimental weapons, whispering secrets that promise power and danger.\n\nuse **/explore** to explore this location`)
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
            else if(city_town == "ellior"){
                interaction.reply({content:`The place you are in is an explorable location in it's own!`,ephemeral:true})
            }
            else if(city_town == "Dragon's Den"){
                interaction.reply({content:`The place you are in is an explorable location in it's own!`,ephemeral:true})
            }
            else if(city_town == "Zephyr Mountain"){
                interaction.reply({content:`The place you are in is an explorable location in it's own!`,ephemeral:true})
            }
            else if(city_town == "Orld Tree Husk"){
                interaction.reply({content:`The place you are in is an explorable location in it's own!`,ephemeral:true})
            }
            else if(city_town == "Sunstone Mines"){
                interaction.reply({content:`The place you are in is an explorable location in it's own!`,ephemeral:true})
            }
            else if(city_town == "Werfall"){
                
                                        let embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT LOCATION')
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
            new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),])
        
        let select =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select')
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
            let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
            let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"    
            let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select,time:1000*300 })
            let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel,time:1000*300 })
        
            collector_select.setMaxListeners(Infinity)
            collector_cancel.setMaxListeners(Infinity)
        
        
            await interaction.reply({content: null,embeds:[embed],components:[select,btn_cancel]})
        
            collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                collected.deferUpdate().catch(() => null)
                const location = collected.values[0]
                
                await profileModel.updateOne({userID:authorId},{location:location})
               
                if(location == 'Ranger Tents'){
                    const attachment = new MessageAttachment('assets/Werfall/ranger_tents.jpeg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://ranger_tents.jpeg')
                    .setDescription(`Arriving at the heart of Werfall, you are met with the sight of the Ranger Tents. These canvas sanctuaries, bearing the distinctive marks of the "Emperal Brigade" and various Guilds dot the landscape, a stark contrast against the backdrop of ruin. Your footsteps echo softly as you navigate the narrow pathways between the tents. Rangers move with purpose, their faces etched with determination as they mend gear, resupply, and attend to their wounded companions. The atmosphere exudes a somber camaraderie, a testament to the unbreakable bonds forged amidst adversity, as the Rangers stand united against the encroaching darkness.\n\n**use /explore to explore this location**`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Werfall Ranger Centre'){
                    const attachment = new MessageAttachment('assets/Werfall/ranger_centre.jpeg')
                    let successembed
                        successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://ranger_centre.jpeg.jpg')
                        .setDescription(`Your footsteps lead you to the heart of Werfall, where the Werfall Ranger Centre stands resolute. Its weathered walls, bearing witness to the town's tumultuous history, exude an air of defiance. Stepping through its entrance, you are met with a scene of purposeful activity. The scent of herbs and ink fills the air, a reminder of the centre's dual roles in both healing and planning. Rangers and medics work in harmony, exchanging nods and soft words as they carry out their duties. The centre pulses with an unyielding spirit, a symbol of resilience in the face of the unrelenting challenges that have befallen Werfall.\n\n**use /explore to explore this location**`)
                         
                   
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