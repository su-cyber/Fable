import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import {MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, MessageComponentInteraction,CacheType} from 'discord.js'
import { MessageAttachment } from 'discord.js'
import getHealth from '../src/utils/getHealth'
import { sleep } from '../src/utils'
import { emoji } from '../src/lib/utils/emoji'


export default new MyCommandSlashBuilder({ name: 'fast_travel', description: 'travel to a place instantly' })

.setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id
        const guildID = interaction.guildId;
        const exceptionEmbed = new MessageEmbed()
        .setColor('RED')
        .setTitle('INTERACTION TIMED OUT')
        .setDescription(`Oops! your interaction has been timed out as it has crossed the waiting limit for your action.\n\nHowever, don't worry! simply use the command again to restart.`)
        

        profileModel.exists({userID: authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    profileModel.findOne({userID:authorId},async function(err,foundUser) {
                        if(foundUser.main_quest == "Tutorial"){
                            interaction.reply({content:`You cannot use this command right now! please complete the tutorial to unlock Fast Travel`,ephemeral:true})
                        }
                        else{
                            if(foundUser.dungeon.status){
                                interaction.reply({content:`You cannot use this command inside a dungeon!`,ephemeral:true})
                               }
                               else{
                                const kingdom = foundUser.kingdom
                                const city_town = foundUser.city_town
                                let spyralinkEmbed_town
                                let steamrailEmbed_state
                                let spyralinkEmbed_state
                                let steamrailEmbed_town
                                const mount = foundUser.mount.name
                                if(kingdom == "solarstrio"){
                                    let btnraw= new MessageActionRow().addComponents([
                                        new MessageButton().setCustomId("states").setStyle("PRIMARY").setLabel("Stateships"),
                                        new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("Cancel"),
                                        new MessageButton().setCustomId("towns").setStyle("PRIMARY").setLabel("Townships"),
                                        
                                    ])

                                    if(mount == "None"){
                                        steamrailEmbed_town = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('STEAMRAIL TICKET BOOTH')
                                    .setDescription(`choose a place to travel instantly`)
                                    .addFields([
                                        {
                                            name: `Township of Aube`,
                                            value:`**Travelled on Steamrail**\n**Description**:Aube Town, nestled on the eastern borders of Solarstrio, thrives as a farming community while facing threats from bandits.\n**Cost**: 300 ${emoji.CRUS}\n`
                                        },
                                        {
                                            name: `Township of Werfall`,
                                            value:`**Travelled on Steamrail**\n**Description**:Werfall, once a thriving trade hub known for efficient distribution, collapsed due to a mysterious incident, leaving its lands infertile. Now a war-torn battleground between Abyssals and Rangers, the town's former prosperity is but a memory.\n**Cost**:300 ${emoji.CRUS}`
                                        },
                                        {
                                            name: `Township of Kafig`,
                                            value:`**Travelled on Steamrail**\n**Description**:Kafig, a vibrant town nestled near the mystical Asche Peak, where the locals revere Avian Spyriths, especially the mythical Radohn, and thrive in a bustling market for flying spyriths.\n**Cost**:300 ${emoji.CRUS}\n`
                                        },
                                        {
                                            name: `Township of Raflese`,
                                            value:`**Travelled on Steamrail**\n**Description**:A botanical paradise where lush greenery, cultural traditions, and medicinal intrigue converge.\n**Cost**: 300 ${emoji.CRUS}\n`
                                        },
                                        {
                                            name: `Township of Vesper`,
                                            value:`**Travelled on Steamrail**\n**Description**: A hidden town in the shadow of danger, driven by the allure of Nebula Flowers and governed by a delicate treaty with the lizardmen.\n**Cost**: 300 ${emoji.CRUS}\n`
                                        },
                                        {
                                            name: `Township of Lucens`,
                                            value:`**Travelled on Steamrail**\n**Description**: A coastal town steeped in maritime charm, adorned with vibrant streets, legendary landmarks, and tales of the sea.\n**Cost**: 300 ${emoji.CRUS}\n`
                                        },
                                        {
                                            name: `Township of Ingenia`,
                                            value:`**Travelled on Steamrail**\n**Description**:Ingenia Town, a haven for mad scientists and engineers, thrives on innovation and eccentricity.\n**Cost**: 300 ${emoji.CRUS}\n`
                                        },
                                        {
                                            name: `Township of Underdagen`,
                                            value:`**Travelled on Steamrail**\n**Description**:A dwarven town nestled in an underground canyon, thrives as the last stop before the treacherous journey through the Zephyr Mountains\n**Cost**:300 ${emoji.CRUS}\n`
                                        },
                                    ])
                                    
                                    steamrailEmbed_state = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('STEAMRAIL TICKET BOOTH')
                                    .setDescription(`choose a place to travel instantly`)
                                    .addFields([
                                        {
                                            name: `Stateship of Zorya`,
                                            value:`**Travelled on Steamrail**\n**Description**:One of the largest Stateships in Solarstrio, where progress meets modernity.a\n**Cost**:300 ${emoji.CRUS}\n`
                                        },
                                        {
                                            name: `Stateship of Vigia`,
                                            value:`**Travelled on Steamrail**\n**Description**:The state of Vigia is a fortress state in Solarstrio, standing as the first and last defense against the deadly forest of DeathRust.\n**Cost**:300 ${emoji.CRUS}\n`
                                        },
                                        {
                                            name: `Stateship of Dremenlond`,
                                            value:`**Travelled on Steamrail**\n**Description**: A realm of opulence and ambition, where dreams are bought and sold amidst the whispers of power and privilege.\n**Cost**: 300 ${emoji.CRUS}\n`
                                        },
                                        {
                                            name: `Capital State of Gloaming`,
                                            value:`**Travelled on Steamrail**\n**Description**:The Capital of Solarstrio, stateship of Gloaming\n**Cost**:300 ${emoji.CRUS}\n`
                                        },
                                        {
                                            name: `Stateship of Nottfall`,
                                            value:`**Travelled on Steamrail**\n**Description**: An Enigmatic nocturnal cityscape engulfed in the ethereal glow of moonlit revelry, where flying carpets traverse canals and dreams intertwine with reality under the rule of the resolute Earl Solis.\n**Cost**: 300 ${emoji.CRUS}\n`
                                        },
                                        {
                                            name: `Stateship of Tethys`,
                                            value:`**Travelled on Steamrail**\n**Description**:A mountainous state known as the largest in solarstrio and for its precious Skysteel, vibrant marketplaces, and harmonious relationship with the Zephyr Mountain.\n**Cost**: 300 ${emoji.CRUS}\n`
                                        }
                                    ])
                                    }
                                    else{
                                    spyralinkEmbed_town = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('SPYRALINK SUMMON')
                                    .setDescription(`choose a place to travel instantly`)
                                    .addFields([
                                        {
                                            name: `Township of Aube`,
                                            value:`**Travelled on Spyralink**\n**Description**:Aube Town, nestled on the eastern borders of Solarstrio, thrives as a farming community while facing threats from bandits.\n**Cost**: 0 ${emoji.CRUS}\n`
                                        },
                                        {
                                            name: `Township of Werfall`,
                                            value:`**Travelled on Spyralink**\n**Description**:Werfall, once a thriving trade hub known for efficient distribution, collapsed due to a mysterious incident, leaving its lands infertile. Now a war-torn battleground between Abyssals and Rangers, the town's former prosperity is but a memory.\n**Cost**: 0 ${emoji.CRUS}`
                                        },
                                        {
                                            name: `Township of Kafig`,
                                            value:`**Travelled on Spyralink**\n**Description**:Kafig, a vibrant town nestled near the mystical Asche Peak, where the locals revere Avian Spyriths, especially the mythical Radohn, and thrive in a bustling market for flying spyriths.\n**Cost**: 0 ${emoji.CRUS}\n`
                                        },
                                        {
                                            name: `Township of Raflese`,
                                            value:`**Travelled on Spyralink**\n**Description**:A botanical paradise where lush greenery, cultural traditions, and medicinal intrigue converge.\n**Cost**: 0 ${emoji.CRUS}\n`
                                        },
                                        {
                                            name: `Township of Vesper`,
                                            value:`**Travelled on Spyralink**\n**Description**: A hidden town in the shadow of danger, driven by the allure of Nebula Flowers and governed by a delicate treaty with the lizardmen.\n**Cost**: 0 ${emoji.CRUS}\n`
                                        },
                                        {
                                            name: `Township of Lucens`,
                                            value:`**Travelled on Spyralink**\n**Description**: A coastal town steeped in maritime charm, adorned with vibrant streets, legendary landmarks, and tales of the sea.\n**Cost**: 0 ${emoji.CRUS}\n`
                                        },
                                        {
                                            name: `Township of Ingenia`,
                                            value:`**Travelled on Spyralink**\n**Description**:Ingenia Town, a haven for mad scientists and engineers, thrives on innovation and eccentricity.\n**Cost**: 0 ${emoji.CRUS}\n`
                                        },
                                        {
                                            name: `Township of Underdagen`,
                                            value:`**Travelled on Spyralink**\n**Description**:A dwarven town nestled in an underground canyon, thrives as the last stop before the treacherous journey through the Zephyr Mountains\n**Cost**: 0 ${emoji.CRUS}\n`
                                        },
                                    ])

                                    spyralinkEmbed_state = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('SPYRALINK SUMMON')
                                    .setDescription(`choose a place to travel instantly`)
                                    .addFields([
                                        {
                                            name: `Stateship of Zorya`,
                                            value:`**Travelled on Spyralink**\n**Description**:One of the largest Stateships in Solarstrio, where progress meets modernity.a\n**Cost**:0 ${emoji.CRUS}\n`
                                        },
                                        {
                                            name: `Stateship of Vigia`,
                                            value:`**Travelled on Spyralink**\n**Description**:The state of Vigia is a fortress state in Solarstrio, standing as the first and last defense against the deadly forest of DeathRust.\n**Cost**:0 ${emoji.CRUS}\n`
                                        },
                                        {
                                            name: `Stateship of Dremenlond`,
                                            value:`**Travelled on Spyralink**\n**Description**: A realm of opulence and ambition, where dreams are bought and sold amidst the whispers of power and privilege.\n**Cost**: 0 ${emoji.CRUS}\n`
                                        },
                                        {
                                            name: `Capital State of Gloaming`,
                                            value:`**Travelled on Spyralink**\n**Description**:The Capital of Solarstrio, stateship of Gloaming\n**Cost**:0 ${emoji.CRUS}\n`
                                        },
                                        {
                                            name: `Stateship of Nottfall`,
                                            value:`**Travelled on Spyralink**\n**Description**: An Enigmatic nocturnal cityscape engulfed in the ethereal glow of moonlit revelry, where flying carpets traverse canals and dreams intertwine with reality under the rule of the resolute Earl Solis.\n**Cost**: 0 ${emoji.CRUS}\n`
                                        },
                                        {
                                            name: `Stateship of Tethys`,
                                            value:`**Travelled on Spyralink**\n**Description**:A mountainous state known as the largest in solarstrio and for its precious Skysteel, vibrant marketplaces, and harmonious relationship with the Zephyr Mountain.\n**Cost**: 0 ${emoji.CRUS}\n`
                                        }
                                    ])

                                    }


                                    let select_town = new MessageActionRow().addComponents([
                                        new MessageSelectMenu()
                                        .setCustomId('select_town')
                                            .setPlaceholder(`Select a Township to visit ${interaction.user.username}`)
                                            .addOptions(
                                                {
                                                    label: 'Township of Aube',
                                                    description: ``,
                                                    value: 'aube',
                                                },
                                                {
                                                    label: 'Township of Werfall',
                                                    description: ``,
                                                    value: 'Werfall',
                                                },
                                                {
                                                    label: 'Township of Kafif',
                                                    description: ``,
                                                    value: 'Kafig',
                                                },
                                                {
                                                    label: 'Township of Raflese',
                                                    description: ``,
                                                    value: 'Raflese',
                                                },
                                                {
                                                    label: 'Township of Vesper',
                                                    description: ``,
                                                    value: 'Vesper',
                                                },
                                                {
                                                    label: 'Township of Lucens',
                                                    description: ``,
                                                    value: 'Lucens',
                                                },
                                                {
                                                    label: 'Township of Ingenia',
                                                    description: ``,
                                                    value: 'Ingenia',
                                                },
                                                {
                                                    label: 'Township of Underdagen',
                                                    description: ``,
                                                    value: 'Underdagen',
                                                }
                                            )
                                            .setDisabled(false),
                                    ])

                                    let select_state = new MessageActionRow().addComponents([
                                        new MessageSelectMenu()
                                        .setCustomId('select_state')
                                            .setPlaceholder(`Select a Stateship to visit ${interaction.user.username}`)
                                            .addOptions(
                                                {
                                                    label: 'Stateship of Zorya',
                                                    description: ``,
                                                    value: 'Zorya',
                                                },
                                                {
                                                    label: 'Stateship of Vigia',
                                                    description: ``,
                                                    value: 'Vigia',
                                                },
                                                {
                                                    label: 'Stateship of Dremenlond',
                                                    description: ``,
                                                    value: 'Dremenlond',
                                                },
                                                {
                                                    label: 'Capital of Gloaming',
                                                    description: ``,
                                                    value: 'Gloaming',
                                                },
                                                {
                                                    label: 'Stateship of Nottfall',
                                                    description: ``,
                                                    value: 'Nottfall',
                                                },
                                                {
                                                    label: 'Stateship of Tethys',
                                                    description: ``,
                                                    value: 'Tethys',
                                                }
                                            )
                                            .setDisabled(false),
                                    ])


                                    let filter_select = (interaction : any) => interaction.user.id === authorId && (interaction.customId == "select_state" || interaction.customId == "select_town")
                                    let filter_cancel = (interaction : any) => interaction.user.id === authorId && (interaction.customId == "cancel" || interaction.customId == "towns" || interaction.customId == "states")    
                                    let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select,time:1000*300 })
                                    let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel,time:1000*300 })
                                
                                    if(mount == "None"){
                                        await interaction.reply({content: null,embeds:[steamrailEmbed_town],components:[btnraw,select_town]})
                                    }
                                    else{
                                        await interaction.reply({content: null,embeds:[spyralinkEmbed_town],components:[btnraw,select_town]})
                                    }
                                    
        
                                    collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                                        collected.deferUpdate().catch(() => null)
                                        const location = collected.values[0]
                                        if(mount == "None"){
                                            if(foundUser.coins >=300){
                                                const attachment = new MessageAttachment(`assets/Zorya/steamrail.jpeg`)
                                                const travelEmbed = new MessageEmbed()
                                                .setColor('RANDOM')
                                                .setTitle('FAST TRAVEL')
                                                .setImage(`attachment://steamrail.jpeg`)
                                                .setDescription(`As you approach the bustling steamrail station, you feel a surge of excitement as you board the sleek, metal behemoth. With a deafening roar, the steamrail surges forward, its powerful engines propelling you through the sprawling landscape.\n\n### Reaching in 5 seconds...`)
                                                
                                                await interaction.editReply({embeds:[travelEmbed],files:[attachment],components:[]})
                                                await sleep(5)
                                                await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-300,location:"None"})
                                            
                                                if(collected.customId == "select_town"){
                                                    if(location == 'aube'){
                                                        const attachment = new MessageAttachment('assets/AubeTown/Aube_Town.jpg')
                                                        let successembed = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LOCATION REACHED')
                                                        .setImage('attachment://Aube_Town.jpg')
                                                        .setDescription(`As you arrive in Aube Town, the tranquil beauty of the quaint settlement unfolds before you. Nestled at the eastern edge of the Kingdom, it holds the distinction of being the place where the first rays of the morning sun touch the land, casting a golden glow upon the town and awakening a sense of hope and possibility within your heart.\n\n`)
                                                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                                    
                                                    }
                                                    else if(location == 'Werfall'){
                                                        let successembed
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
                        
                        
                                                            await interaction.editReply({embeds:[successembed],components:[],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                       
                                                    }
                                                    else if(location == 'Kafif'){
                                                        const attachment = new MessageAttachment('assets/Kafig/kafig_main.jpeg')
                                                        let successembed = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LOCATION REACHED')
                                                        .setImage('attachment://kafig_main.jpeg')
                                                        .setDescription(`As you enter Kafig, vibrant bird houses adorn every corner of the bustling town, creating a picturesque scene. The Avian Square, with its central obsidian statue, stands as a focal point amidst the lively atmosphere. Traders and merchants add to the visual tapestry, drawn to the town's reputation as a thriving market for flying spyriths, while the air carries a sense of reverence for the mythical Avian Spyriths.\n\n`)
                                                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                                    
                                                    }
                                                    else if(location == 'Raflese'){
                                                        const attachment = new MessageAttachment('assets/Raflese/raflese_main.jpeg')
                                                        let successembed = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LOCATION REACHED')
                                                        .setImage('attachment://raflese_main.jpeg')
                                                        .setDescription(`As you enter Raflese Town, you're greeted by a kaleidoscope of colors and fragrances: vibrant gardens, sweet floral scents, and the inviting allure of herbal shops. The imposing glass dome of the Green Keep lab stands on the outskirts, contrasting with the serene majesty of the Eden Garden and its iconic Tree of Life. In this botanical paradise, every corner teems with natural wonder, captivating your senses from the moment you arrive.`)
                                                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                                    
                                                    }
                                                    else if(location == 'Vesper'){
                                                        const attachment = new MessageAttachment('assets/Vesper/vesper_main.jpg')
                                                                    let successembed = new MessageEmbed()
                                                                    .setColor('RANDOM')
                                                                    .setTitle('LOCATION REACHED')
                                                                    .setImage('attachment://vesper_main.jpg')
                                                                    .setDescription(`
                                                                    As you arrive in Vesper, you're greeted by a unique sight. The town sits atop a foggy swamp, with roofs covered in mysterious mushrooms. People bustle about, a mix of lizard-like creatures and humans. The air is thick with anticipation, as traders and adventurers seek rare treasures amidst the murky landscape. Despite the dangers, there's an undeniable sense of intrigue in this bustling hub of activity.`)
                                                                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                                                    
                                                    }
                                                    else if(location == 'Lucens'){
                                                        const attachment = new MessageAttachment('assets/Lucens/lucens_main.jpg')
                                                        let successembed = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LOCATION REACHED')
                                                        .setImage('attachment://lucens_main.jpg')
                                                        .setDescription(`As you arrive in Lucens, the salty air and colorful streets welcome you. The Lighthouse Plateau stands tall, its statue of Captain Basilica a symbol of the town's maritime legacy. Nearby, the Temple of Still Water offers a serene retreat, while the Seabreeze Pavilion hosts lively performances celebrating local legends. Everywhere you turn, sculptures of Marvory Stone tell tales of the sea, inviting you to explore Lucens' rich history.`)
                                                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                                            
                                                }
                                                else if(location == 'Ingenia'){
                                                    const attachment = new MessageAttachment('assets/Ingenia/ingenia_main.jpg')
                                                    let successembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('LOCATION REACHED')
                                                    .setImage('attachment://ingenia_main.jpg')
                                                    .setDescription(`Stepping into Ingenia Town, you're greeted by a bustling hub of creativity, where makeshift homes and tinkering workshops line the streets, and the air hums with the energy of invention.`)
                                                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                                    
                                                    }

                                                    else if(location == 'Underdagen'){
                                                        const attachment = new MessageAttachment('assets/Underdagen/underdagen_main.jpg')
                                                        let successembed = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LOCATION REACHED')
                                                        .setImage('attachment://underdagen_main.jpg')
                                                        .setDescription(`As you descend into the depths of Underdagen, the air grows cooler, echoing with the clang of mining and the hiss of steam. Dwarven craftsmanship adorns the rocky walls, while traders and artisans bustle through narrow streets, their eyes glittering with the promise of Hex Crystals and tales of mythical hot springs.`)
                                                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                                    
                                                        }
                                                }
                                                else if(collected.customId == "select_state"){
                                                    if(location == 'Zorya'){
                                                        const attachment = new MessageAttachment('assets/Zorya/zorya_main.jpg')
                                                            let successembed = new MessageEmbed()
                                                            .setColor('RANDOM')
                                                            .setTitle('LOCATION REACHED')
                                                            .setImage('attachment://zorya_main.jpg')
                                                            .setDescription(`As you arrive in the Stateship of Zorya, one of the kingdom's largest states, the skyline greets you with a mesmerizing blend of architectural marvels, where progress and modernity have woven themselves into the very fabric of this bustling metropolis.\n\n`)
                                                            await interaction.editReply({embeds:[successembed],components:[],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                                            
                                                    }
                                                    else if(location == 'Vigia'){
                                                        const attachment = new MessageAttachment('assets/Vigia/vigia_main.jpg')
                                                        let successembed = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LOCATION REACHED')
                                                        .setImage('attachment://vigia_main.jpg')
                                                        .setDescription(`As you arrive in the state of Vigia, a fortified sanctuary nestled in the heart of Solarstrio, the cityscape unfolds before your eyes, showcasing a harmonious fusion of history and resilience. The towering walls of Vigia, known as the SolGate, stand as a testament to the city's unwavering defense against the menacing DeathRust forest. Within its protective embrace, Vigia thrives as a vibrant hub, where echoes of the past reverberate through its streets. The city's charm lies in its lively atmosphere, adorned with museums, monuments, and a sense of time-honored significance.\n\n`)
                                                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                                             
                                                    }
                                                    else if(location == 'Dremenlond'){
                                                        const attachment = new MessageAttachment('assets/Dremenlond/dremenlond_main.jpg')
                                                        let successembed = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LOCATION REACHED')
                                                        .setImage('attachment://dremenlond_main.jpg')
                                                        .setDescription(`As you enter Dremenlond, you're immediately immersed in a realm of grandeur and ambition. Towering spires, bustling streets, and opulent displays beckon, offering a glimpse into a world of wealth and refinement. Yet, beneath the surface, you sense a palpable tension between privilege and aspiration, fueling your curiosity to explore further.`)
                                                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                                           
                                                    }
                                                    else if(location == 'Gloaming'){
                                                        const attachment = new MessageAttachment('assets/Gloaming/gloaming_main.jpg')
                                                        let successembed = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LOCATION REACHED')
                                                        .setImage('attachment://gloaming_main.jpg')
                                                        .setDescription(`As you enter Gloaming, you're greeted by bustling streets lined with towering stone columns and bridges. In the distance, the majestic Castle of Heliad stands tall against the sky. Below, the vibrant Badshahi Bazaar offers a colorful array of goods, while the King's personal military patrol with purpose. Everywhere, the city pulses with energy, a testament to its rich history and lively atmosphere.`)
                                                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                                          
                                                    }
                                                    else if(location == 'Nottfall'){
                                                        const attachment = new MessageAttachment('assets/Nottfall/nottfall_main.png')
                                                        let successembed = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LOCATION REACHED')
                                                        .setImage('attachment://nottfall_main.png')
                                                        .setDescription(`As you arrive in Nottfall, you're immersed in a nocturnal spectacle. The streets are submerged beneath a shimmering lake, while the moonlight illuminates the festivities. Flying carpets glide overhead, transporting revelers through the vibrant city. The air is filled with the aroma of exotic potions and seafood delicacies, and the sounds of live music and laughter echo through the Fire Dragon's Street. In the Royal District, Earl Solis's Castle Aurum casts a regal glow, overseeing the city's lively night. Nottfall comes alive after dark, a magical realm where dreams and reality intertwine.`)
                                                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                                    
                                                    }
                                                    else if(location == 'Tethys'){
                                                        const attachment = new MessageAttachment('assets/Tethys/tethys_main.jpg')
                                                        let successembed = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LOCATION REACHED')
                                                        .setImage('attachment://tethys_main.jpg')
                                                        .setDescription(`As you approach Tethys, the grandeur of the Zephyr Mountains looms before you, their snow-capped peaks piercing the heavens. Cascading waterfalls cascade down the rocky cliffs, feeding the lush greenery below. Suspended between the cliffs, Haven's Bazaar teems with life, offering a dizzying array of sights and sounds. The air is tinged with the scent of exotic spices from the Zaffran Plains, hinting at the riches that await within this bustling mining state.\n\n`)
                                                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                                    
                                                    }
                                                }
                                                collector_select.stop()
                                                collector_cancel.stop()
                                            }
                                            else{
                                                await interaction.editReply({content:`You do not have enough ${emoji.CRUS} to pay for the Steamrail!`})
                                                collector_select.stop()
                                                collector_cancel.stop()
                                            }
                                            }
                                        else{
                                            
                                            const attachment = new MessageAttachment(`assets/Spyralinks/${foundUser.mount.image}`)
                                            const travelEmbed = new MessageEmbed()
                                            .setColor('RANDOM')
                                            .setTitle('FAST TRAVEL')
                                            .setImage(`attachment://${foundUser.mount.image}`)
                                            .setDescription(`${foundUser.mount.use_text}\n\n### Reaching in 5 seconds...`)
                                            
                                            await interaction.editReply({embeds:[travelEmbed],files:[attachment],components:[]})
                                            await sleep(5)
                                            await profileModel.updateOne({userID:authorId},{city_town:location,coins:foundUser.coins-0,location:"None"})
                                        
                                            if(collected.customId == "select_town"){
                                                if(location == 'aube'){
                                                    const attachment = new MessageAttachment('assets/AubeTown/Aube_Town.jpg')
                                                    let successembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('LOCATION REACHED')
                                                    .setImage('attachment://Aube_Town.jpg')
                                                    .setDescription(`As you arrive in Aube Town, the tranquil beauty of the quaint settlement unfolds before you. Nestled at the eastern edge of the Kingdom, it holds the distinction of being the place where the first rays of the morning sun touch the land, casting a golden glow upon the town and awakening a sense of hope and possibility within your heart.\n\n`)
                                                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                                
                                                }
                                                else if(location == 'Werfall'){
                                                    let successembed
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
                    
                    
                                                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                   
                                                }
                                                else if(location == 'Kafif'){
                                                    const attachment = new MessageAttachment('assets/Kafig/kafig_main.jpeg')
                                                    let successembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('LOCATION REACHED')
                                                    .setImage('attachment://kafig_main.jpeg')
                                                    .setDescription(`As you enter Kafig, vibrant bird houses adorn every corner of the bustling town, creating a picturesque scene. The Avian Square, with its central obsidian statue, stands as a focal point amidst the lively atmosphere. Traders and merchants add to the visual tapestry, drawn to the town's reputation as a thriving market for flying spyriths, while the air carries a sense of reverence for the mythical Avian Spyriths.\n\n`)
                                                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                                
                                                }
                                                else if(location == 'Raflese'){
                                                    const attachment = new MessageAttachment('assets/Raflese/raflese_main.jpeg')
                                                    let successembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('LOCATION REACHED')
                                                    .setImage('attachment://raflese_main.jpeg')
                                                    .setDescription(`As you enter Raflese Town, you're greeted by a kaleidoscope of colors and fragrances: vibrant gardens, sweet floral scents, and the inviting allure of herbal shops. The imposing glass dome of the Green Keep lab stands on the outskirts, contrasting with the serene majesty of the Eden Garden and its iconic Tree of Life. In this botanical paradise, every corner teems with natural wonder, captivating your senses from the moment you arrive.`)
                                                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                                
                                                }
                                                else if(location == 'Vesper'){
                                                    const attachment = new MessageAttachment('assets/Vesper/vesper_main.jpg')
                                                                let successembed = new MessageEmbed()
                                                                .setColor('RANDOM')
                                                                .setTitle('LOCATION REACHED')
                                                                .setImage('attachment://vesper_main.jpg')
                                                                .setDescription(`
                                                                As you arrive in Vesper, you're greeted by a unique sight. The town sits atop a foggy swamp, with roofs covered in mysterious mushrooms. People bustle about, a mix of lizard-like creatures and humans. The air is thick with anticipation, as traders and adventurers seek rare treasures amidst the murky landscape. Despite the dangers, there's an undeniable sense of intrigue in this bustling hub of activity.`)
                                                                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                                                
                                                }
                                                else if(location == 'Lucens'){
                                                    const attachment = new MessageAttachment('assets/Lucens/lucens_main.jpg')
                                                    let successembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('LOCATION REACHED')
                                                    .setImage('attachment://lucens_main.jpg')
                                                    .setDescription(`As you arrive in Lucens, the salty air and colorful streets welcome you. The Lighthouse Plateau stands tall, its statue of Captain Basilica a symbol of the town's maritime legacy. Nearby, the Temple of Still Water offers a serene retreat, while the Seabreeze Pavilion hosts lively performances celebrating local legends. Everywhere you turn, sculptures of Marvory Stone tell tales of the sea, inviting you to explore Lucens' rich history.`)
                                                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                                        
                                            }
                                            else if(location == 'Ingenia'){
                                                const attachment = new MessageAttachment('assets/Ingenia/ingenia_main.jpg')
                                                let successembed = new MessageEmbed()
                                                .setColor('RANDOM')
                                                .setTitle('LOCATION REACHED')
                                                .setImage('attachment://ingenia_main.jpg')
                                                .setDescription(`Stepping into Ingenia Town, you're greeted by a bustling hub of creativity, where makeshift homes and tinkering workshops line the streets, and the air hums with the energy of invention.`)
                                                await interaction.editReply({embeds:[successembed],components:[],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                                
                                                }

                                                else if(location == 'Underdagen'){
                                                    const attachment = new MessageAttachment('assets/Underdagen/underdagen_main.jpg')
                                                    let successembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('LOCATION REACHED')
                                                    .setImage('attachment://underdagen_main.jpg')
                                                    .setDescription(`As you descend into the depths of Underdagen, the air grows cooler, echoing with the clang of mining and the hiss of steam. Dwarven craftsmanship adorns the rocky walls, while traders and artisans bustle through narrow streets, their eyes glittering with the promise of Hex Crystals and tales of mythical hot springs.`)
                                                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                                
                                                    }
                                            }
                                            else if(collected.customId == "select_state"){
                                                if(location == 'Zorya'){
                                                    const attachment = new MessageAttachment('assets/Zorya/zorya_main.jpg')
                                                        let successembed = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LOCATION REACHED')
                                                        .setImage('attachment://zorya_main.jpg')
                                                        .setDescription(`As you arrive in the Stateship of Zorya, one of the kingdom's largest states, the skyline greets you with a mesmerizing blend of architectural marvels, where progress and modernity have woven themselves into the very fabric of this bustling metropolis.\n\n`)
                                                        await interaction.editReply({embeds:[successembed],components:[],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                                        
                                                }
                                                else if(location == 'Vigia'){
                                                    const attachment = new MessageAttachment('assets/Vigia/vigia_main.jpg')
                                                    let successembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('LOCATION REACHED')
                                                    .setImage('attachment://vigia_main.jpg')
                                                    .setDescription(`As you arrive in the state of Vigia, a fortified sanctuary nestled in the heart of Solarstrio, the cityscape unfolds before your eyes, showcasing a harmonious fusion of history and resilience. The towering walls of Vigia, known as the SolGate, stand as a testament to the city's unwavering defense against the menacing DeathRust forest. Within its protective embrace, Vigia thrives as a vibrant hub, where echoes of the past reverberate through its streets. The city's charm lies in its lively atmosphere, adorned with museums, monuments, and a sense of time-honored significance.\n\n`)
                                                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                                         
                                                }
                                                else if(location == 'Dremenlond'){
                                                    const attachment = new MessageAttachment('assets/Dremenlond/dremenlond_main.jpg')
                                                    let successembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('LOCATION REACHED')
                                                    .setImage('attachment://dremenlond_main.jpg')
                                                    .setDescription(`As you enter Dremenlond, you're immediately immersed in a realm of grandeur and ambition. Towering spires, bustling streets, and opulent displays beckon, offering a glimpse into a world of wealth and refinement. Yet, beneath the surface, you sense a palpable tension between privilege and aspiration, fueling your curiosity to explore further.`)
                                                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                                       
                                                }
                                                else if(location == 'Gloaming'){
                                                    const attachment = new MessageAttachment('assets/Gloaming/gloaming_main.jpg')
                                                    let successembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('LOCATION REACHED')
                                                    .setImage('attachment://gloaming_main.jpg')
                                                    .setDescription(`As you enter Gloaming, you're greeted by bustling streets lined with towering stone columns and bridges. In the distance, the majestic Castle of Heliad stands tall against the sky. Below, the vibrant Badshahi Bazaar offers a colorful array of goods, while the King's personal military patrol with purpose. Everywhere, the city pulses with energy, a testament to its rich history and lively atmosphere.`)
                                                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                                      
                                                }
                                                else if(location == 'Nottfall'){
                                                    const attachment = new MessageAttachment('assets/Nottfall/nottfall_main.png')
                                                    let successembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('LOCATION REACHED')
                                                    .setImage('attachment://nottfall_main.png')
                                                    .setDescription(`As you arrive in Nottfall, you're immersed in a nocturnal spectacle. The streets are submerged beneath a shimmering lake, while the moonlight illuminates the festivities. Flying carpets glide overhead, transporting revelers through the vibrant city. The air is filled with the aroma of exotic potions and seafood delicacies, and the sounds of live music and laughter echo through the Fire Dragon's Street. In the Royal District, Earl Solis's Castle Aurum casts a regal glow, overseeing the city's lively night. Nottfall comes alive after dark, a magical realm where dreams and reality intertwine.`)
                                                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                                
                                                }
                                                else if(location == 'Tethys'){
                                                    const attachment = new MessageAttachment('assets/Tethys/tethys_main.jpg')
                                                    let successembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('LOCATION REACHED')
                                                    .setImage('attachment://tethys_main.jpg')
                                                    .setDescription(`As you approach Tethys, the grandeur of the Zephyr Mountains looms before you, their snow-capped peaks piercing the heavens. Cascading waterfalls cascade down the rocky cliffs, feeding the lush greenery below. Suspended between the cliffs, Haven's Bazaar teems with life, offering a dizzying array of sights and sounds. The air is tinged with the scent of exotic spices from the Zaffran Plains, hinting at the riches that await within this bustling mining state.\n\n`)
                                                    await interaction.editReply({embeds:[successembed],components:[],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                                
                                                }
                                            }

                                                collector_select.stop()
                                                collector_cancel.stop()
                                        }
                                        
                                        
                                    })

                                    collector_cancel.on('collect', async j => {
                                        j.deferUpdate().catch(err => {})
                                        if(j.customId == "cancel"){
                                        let delembed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle('CANCELLED')
                                        .setDescription(`location visit cancelled!`)
                                        
                                        await interaction.editReply({embeds:[delembed],components:[]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                        collector_cancel.stop()
                                        collector_select.stop()
                                        }
                                        else if(j.customId == "towns"){
                                            if(mount == "None"){
                                                await interaction.editReply({embeds:[steamrailEmbed_town],components:[btnraw,select_town]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                            }
                                            else{
                                                await interaction.editReply({embeds:[spyralinkEmbed_town],components:[btnraw,select_town]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                            }
                                            
                                            }
                                        else if(j.customId == "states"){
                                            
                                            if(mount == "None"){
                                                await interaction.editReply({embeds:[steamrailEmbed_state],components:[btnraw,select_state]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                            }
                                            else{
                                                await interaction.editReply({embeds:[spyralinkEmbed_state],components:[btnraw,select_state]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                            }
                                                }
                                            
                                        
                                    })

                                }
                            }
                        }

                    })
                }
            }
        })
    })