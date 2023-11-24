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
                        .setDescription(`you visited ${foundUser.guild}'s ${location}, As you enter the guild hall, you observe a bustling atmosphere filled with Rangers of varying ranks. The walls are adorned with faded banners and worn-out mission reports, a testament to the guild's history. The sound of camaraderie and training drills fills the air, as Rangers of different divisions hone their skills. Despite the lack of grandeur, there is an undeniable sense of determination and unity among the members, each striving to prove their worth and make their mark in the Ranger Association.\n\nuse **/explore** to explore this location.\n\n**use /questboard to view the Questboard**`)
                         
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
                else if(location == 'Castle Luminar'){
                    const attachment = new MessageAttachment('assets/Zorya/castle_chariots.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://castle_chariots.jpg')
                    .setDescription(` As you arrive at the Castle Luminar, your eyes behold a majestic fortress nestled in the heart of the Stateship of Zorya, serving as both the residence and administrative center for Earl Auriga, who oversees every facet of the state with unwavering dedication.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Siewelle Port'){
                    const attachment = new MessageAttachment('assets/Zorya/siewelle_port.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://siewelle_port.jpg')
                    .setDescription(`As you arrive at the bustling Siewelle Port, your eyes widen at the sight of its grandeur. The expansive harbor stretches before you, adorned with seven imposing piers, each protected by a towering sea gate, standing as sentinels of maritime trade and adventure.\n\nuse **/explore** to explore this location\n\nThis is a Shop location, you can use **/shop** here`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Black Market'){
                    const attachment = new MessageAttachment('assets/Zorya/black_market.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://black_market.jpg')
                    .setDescription(`As you descend into the shadowy depths beneath the Golden Terminal, your eyes widen at the sight of the clandestine Black Market. A hidden realm of intrigue and forbidden dealings, it offers a tantalizing array of rare artifacts and perilous experimental weapons, whispering secrets that promise power and danger.\n\nuse **/explore** to explore this location\n\nThis is a Shop location, you can use **/shop** here`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Sun Archives'){
                    const attachment = new MessageAttachment('assets/Zorya/sun_archives.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://sun_archives.jpg')
                    .setDescription(`When you reach the Sun Archives, you are greeted by an awe-inspiring sight. The grand entrance, adorned with intricate carvings and golden accents, opens up to a vast hall filled with rows upon rows of towering bookshelves. The air is filled with a faint scent of ancient parchment and the whispers of knowledge that seem to echo through the space. Sunlight streams in through stained glass windows, casting colorful patterns on the marble floor below.\n\nuse **/explore** to explore this location`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Cloud Gardens'){
                    const attachment = new MessageAttachment('assets/Zorya/cloud_gardens.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://cloud_gardens.jpg')
                    .setDescription(`As you enter the Cloud Gardens, you find yourself immersed in a realm of beauty and innovation. The gardens are a marvel of engineering, with an intricate network of steam-powered mechanisms creating a breathtaking spectacle. Vibrant flowers, suspended in mid-air by delicate gears and pistons, bloom in a mesmerizing display of colors. Steam gently billows from ornate fountains, filling the air with a soothing mist.\n\nuse **/explore** to explore this location`)
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
                        .setImage('attachment://ranger_centre.jpeg')
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
            else if(city_town == "Vigia"){
                
                                        let embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT LOCATION')
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
            new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),])
        
        let select =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select')
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
               
                if(location == 'Trinity Plateau'){
                    const attachment = new MessageAttachment('assets/Vigia/trinity_plateau.jpg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://trinity_plateau.jpg')
                    .setDescription(`Climbing the switchback path, the plateau emerges like an oasis amid Vigia's stone walls. Three great swords stand frozen in combat atop grassy banks. In the distance, the SolGate stands eternal vigil, and beyond - the ominous shadow of DeathRust looms.\n\n**use /explore to explore this location**`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Temple of Tears'){
                    const attachment = new MessageAttachment('assets/Vigia/templeoftears.jpg')
                    let successembed
                        successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage(`attachment://ranger_centre.jpg`)
                        .setDescription(`Dark and foreboding, Morozh's temple is hewn from age-old stone. Weeping faces spout an endless stream upon which solace seekers float candles in tribute. Shadows dance as you enter, feeling suddenly small beneath the arched passages. What rest may be found in despair's domain?\n\n**use /explore to explore this location**`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Esparta Museum'){
                    const attachment = new MessageAttachment('assets/Vigia/esparta.jpg')
                    let successembed
                        successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://esparta.jpg')
                        .setDescription(`Soaring pillars greet you at the threshold of the towering building. Displays of artifacts line the high-ceilinged halls - from ancient weapons to pottery with pictographs unknown. Scholars talk in hushed whispers, stooped over crumbling books.\n\n**use /explore to explore this location**`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Sol Barracks'){
                    const attachment = new MessageAttachment('assets/Vigia/ranger_centre.jpeg')
                    let successembed
                        successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://ranger_centre.jpeg')
                        .setDescription(` As you pass under the towering stone archway, the pounding of sparring knights fills your ears. Rows of neat barracks lines either side of the central courtyard. Bellowing drills instructors put recruits through their paces with spear, shield and sword. Sweat-slicked trainees grunt and parry under the noon sun.At the far end, an imposing armory bears the banners of past battles. Veterans hone and maintain the garrison's formidable arms within.\n\n**use /explore to explore this location**\n\n**This is a Shop location, you can use /shop here**`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Fort Primis'){
                    const attachment = new MessageAttachment('assets/Vigia/fort_primis.jpg')
                    let successembed
                        successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage(`attachment://fort_primis.jpg`)
                        .setDescription(`As you arrive at the fort, you see soldiers in full armor marching about on patrol.Approaching the looming gatehouse, you crane your neck to take in the height of Primis' fortified walls. Arrow slits peer out like eyes, ever vigilant for signs of threat. As the portcullis clanks up, you glimpse Sol Crusaders manning post and patrol atop the battlements.\n\n**use /explore to explore this location**`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Castle Arcemis'){
                    const attachment = new MessageAttachment('assets/Werfall/ranger_centre.jpeg')
                    let successembed
                        successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://ranger_centre.jpeg')
                        .setDescription(`As you approach the imposing fortress of castle Arcemis, you crane your neck to take in its sheer scale. Perched atop a hill overlooking the city, its weathered ramparts and towers loom large, dominating the landscape. The last rays of the setting sun paint the stone walls in hues of gold and crimson. Banners with Earl Arvid's crest snap in the wind above parapets manned by watchful guards. Reaching the enormous gate, you glimpse the bustling activity inside - soldiers drilling in the courtyard, stewards rushing about on errands.Though you have not yet entered its halls, the castle radiates power and purpose, an indomitable guardian that has safeguarded Vigia for centuries.\n\n**use /explore to explore this location**`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Ruins of Eldorath'){
                    const attachment = new MessageAttachment('assets/Vigia/ruinsofeldorath.jpg')
                    let successembed
                        successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://ruinsofeldorath.jpg')
                        .setDescription(`As you make your way to the sealed off ruins of Eldorath, you notice remnants of a once great civilization. Broken pillars and crumbled walls tower above you, now reclaimed by vines and moss. You peel back curtains of creeping plants and peer into ancient halls, glimpsing faded murals depicting the lives of the Eldruids who constructed this place. Ghosts of the past seem to lurk around every corner, daring you to uncover their secrets. Stepping carefully over reckless from fallen domes and arched ceilings, you puzzle over symbols and writings in a long forgotten language. All around you, clues remain to stitch together the faded tapestry of this lost world, if only you can decipher its long held silence.\n\n**use /explore to explore this location**`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Vigia Ranger Centre'){
                    const attachment = new MessageAttachment('assets/Werfall/ranger_centre.jpeg')
                    let successembed
                        successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://ranger_centre.jpeg')
                        .setDescription(`Upon entering the Vigia Ranger Centre, you are met with the buzz of activity as rangers mingle, share tales of adventure and peruse the many posted jobs and deeds. Over by the quest board, parties debate undertakings in Deathrust forest or across the rugged landscape beyond the SolGate. In the back of the spacious hall, trainees spar and show off newly learned skills.\n\n**use /explore to explore this location**\n\n**use /questboard to view the Questboard**`)
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
                interaction.reply({content:`The place you are in is an explorable location in it's own!`,ephemeral:true})
            }
            else if(city_town == "Deathrust Forest"){
                interaction.reply({content:`The place you are in is an explorable location in it's own!`,ephemeral:true})
            }

            else if(city_town == "Kafig"){
                
                                        let embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('SELECT LOCATION')
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
            new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),])
        
        let select =  new MessageActionRow().addComponents([
                new MessageSelectMenu()
                .setCustomId('select')
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
               
                if(location == 'Avian Square'){
                    const attachment = new MessageAttachment('assets/Kafig/avian_square.jpeg')
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('LOCATION REACHED')
                    .setImage('attachment://avian_square.jpeg')
                    .setDescription(`As you step into Avian Square, your eyes are immediately drawn to the towering statue of Radohn, crafted from obsidian. The square bustles with townsfolk and visitors, paying their respects and leaving offerings at the base of the statue.\n\n**use /explore to explore this location**`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Cloud Haven'){
                    const attachment = new MessageAttachment('assets/Kafig/cloudhaven.jpeg')
                    let successembed
                        successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://cloudhaven.jpeg')
                        .setDescription(`You approach Cloud Haven and marvel at its imposing structure. The cylindrical building, with its intricate lattice design and large open windows, stands as a testament to the town's dedication to the avian creatures. The sound of wings fluttering and distant bird calls fills the air, enticing you to enter and explore further.\n\n**use /explore to explore this location**`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'The Guilded Cage'){
                    const attachment = new MessageAttachment('assets/Kafig/ranger_centre.jpeg')
                    let successembed
                        successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://ranger_centre.jpeg')
                        .setDescription(`The warm glow emanating from The Gilded Cage invites you inside. As you enter, the cozy ambiance welcomes you, with wooden tables and benches filling the space. Laughter and lively conversations fill the air, accompanied by the aroma of delicious local cuisine and the clinking of glasses. The sound of a bard's melodious voice can be heard, captivating the audience.\n\n**use /explore to explore this location**\n\n**This is a Shop location, you can use /shop here**`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Radohn Roost'){
                    const attachment = new MessageAttachment('assets/Werfall/radohn_roost.jpeg')
                    let successembed
                        successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://radohn_roost.jpeg')
                        .setDescription(`Climbing the steep steps leading to Radohn Roost, you feel a sense of serenity and reverence in the air. The temple emerges, nestled on the hillside above the town. The gentle breeze carries the fragrance of incense, inviting you to explore further. From this elevated vantage point, you can already catch glimpses of the breathtaking views awaiting you.\n\n**use /explore to explore this location**`)
                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]})
                }
                else if(location == 'Kafig Guild Outpost'){
                    const attachment = new MessageAttachment('assets/Werfall/ranger_centre.jpeg')
                    let successembed
                        successembed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('LOCATION REACHED')
                        .setImage('attachment://ranger_centre.jpeg')
                        .setDescription(`As you enter the Kafig Guild Outpost, you see a lively and quite well maintained place. People are talking and sharing stories. On the walls, there are maps and trophies from adventures and the Insignia of the Eterna Guild. In the middle, there's a space where plans are made. A small desk in the corner has important papers and messages. The atmosphere feels friendly and busy, showing that the outpost is a key spot where everyone works together, The Front wall is adorned with the portrait of the revered ranger "Demon Bird" Basil.\n\n**use /explore to explore this location**\n\n**use /questboard to view the Questboard**`)
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