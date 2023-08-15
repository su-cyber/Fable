import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import { Sword } from '../src/age/weapons/sword'
import { steelArmour } from '../src/age/armour/steel_armour'
import { healthPotion } from '../src/age/potions/healthPotion'
import { MessageActionRow, MessageSelectMenu} from 'discord.js'
import { MessageButton, MessageEmbed } from 'discord.js'
import { MessageComponentInteraction,CacheType } from 'discord.js'
import { sleep } from '../src/utils'
import { tachi_katana } from '../src/age/weapons/tachi_katana'
import { Farmer_scythe } from '../src/age/weapons/farmer_scythe'
import { bronze_orbe } from '../src/age/weapons/bronze_orb'
import { leather_gauntlets } from '../src/age/weapons/leather_gauntlets'
import learnskill from './learnskill'
import { carved_bow } from '../src/age/weapons/carved_bow'
import { MessageAttachment } from 'discord.js'


export default new MyCommandSlashBuilder({ name: 'awaken', description: 'Awaken to your story' }).setDo(
    async (bot, interaction) => {
        
        
        const authorId = interaction.user.id;
        const guildID = interaction.guildId;
        
        profileModel.exists({userID: authorId},async function(err,res){
            if(res){
               await interaction.reply({content:"You have already begun your journey!",ephemeral:true});
            }
            else{
                profileModel.findOne({userID:authorId}, async function(err,foundUser) {
                    let btnraw= new MessageActionRow().addComponents([
                        new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Begin Fable"),
                        new MessageButton().setCustomId("btn_reject").setStyle("DANGER").setLabel("Cancel"),])
                    
                        let prologuebtn= new MessageActionRow().addComponents([
                            new MessageButton().setCustomId("prologue_accept").setStyle("PRIMARY").setLabel("Begin Tutorial"),
                            new MessageButton().setCustomId("prologue_reject").setStyle("DANGER").setLabel("Cancel"),])
                            
                        
        
                        let d_btnraw = new MessageActionRow().addComponents([
                            new MessageButton().setCustomId("dbtn_accept").setStyle("PRIMARY").setLabel("Tutorial").setDisabled(true),
                            new MessageButton().setCustomId("dbtn_reject").setStyle("DANGER").setLabel("Cancel").setDisabled(true),
                        ])

                        let select_class =  new MessageActionRow().addComponents([
                            new MessageSelectMenu()
                            .setCustomId('select_class')
                                .setPlaceholder(`Select your preferred class ${interaction.user.username}`)
                                .addOptions({
                                    
                                    label: `Gladius`,
                                    description: `A Category of Ajins who are experts in the use of Melee Weapons`,
                                    value: `gladius`,
                                },{
                                    label: `Buushin`,
                                    description: `A Category of Ajins who are experts in the use of Spyr, mainly melee attacks`,
                                    value: `buushin`,
                                },{
                                    label: `Magus`,
                                    description: `A Category of Ajins who are experts in the use of Spyr, mainly ranged attacks`,
                                    value: `magus`,
                                },
                                {
                                    label: `Dragoon`,
                                    description: `A Category of Ajins who are experts in the use of Ranged Weapons`,
                                    value: `dragoon`,
                                },{
                                    label: `Noir`,
                                    description: `A Category of Ajins that specialise in the use of Dark Arts and stealth`,
                                    value: `noir`,
                                },
                                
                                )
                                .setDisabled(false),
                        ]) 
                        
                        const elements = [{
                            name:`Flame`,
                            description:`Element of fire`,
                            emoji:'🔥'
                        },{
                            name:`Wave`,
                            description:`Element of water`,
                            emoji:'🌊'
                        },{
                            name:`Light`,
                            description:`Element of light`,
                            emoji:'✨'
                        },{
                            name:`Frost`,
                            description:`Element of ice`,
                            emoji:'❄️'
                        },{
                            name:`Volt`,
                            description:`Element of lightning`,
                            emoji:'⚡'
                        },{
                            name:`Terra`,
                            description:`Element of earth`,
                            emoji:'🪨'
                        },{
                            name:`Venom`,
                            description:`Element of poison`,
                            emoji:'☠️'
                        },{
                            name:`Gale`,
                            description:`Element of wind`,
                            emoji:'💨'
                        },{
                            name:`Bloom`,
                            description:`Element of plants`,
                            emoji:'🍁'
                        },{
                            name:`Alloy`,
                            description:`Element of metals`,
                            emoji:'⚙️'
                        }]
                        let select_element =  new MessageActionRow().addComponents([
                            new MessageSelectMenu()
                            .setCustomId('select_element')
                                .setPlaceholder(`Select your preferred element ${interaction.user.username}`)
                                .addOptions(
                                    elements.map(element => ({
                                        label: `${element.name} ${element.emoji}`,
                                        description: element.description,
                                        value: `${element.name}`,
                                    }))
                                    
                                
                                 )
                                .setDisabled(false),
                        ])  

                        let classEmbed = new MessageEmbed()
                        .setColor('BLURPLE')
                        .setTitle('DESTINY')
                        .setAuthor({
                            iconURL:interaction.user.displayAvatarURL(),
                            name:interaction.user.tag
                        })
                        .setDescription('Choose the destiny that awaits you:')
                        const attachment = new MessageAttachment('assets/AubeTown/vearth_scape.jpeg')
                        let ProceedEmbed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('A NEW FABLE')
                        .setImage('attachment://vearth_scape.jpeg')
                        .setAuthor({
                            iconURL:interaction.user.displayAvatarURL(),
                            name:interaction.user.tag
                        })
                        .setDescription(`Vearth, a land blessed by the Gods, stretches out with emerald green lands and rivers that flow endlessly. Within its vibrant tapestry, diverse creatures called Spyriths roam, both kind and cruel. Sentient races hold dominion, ruling over this mystical realm.\n\nBut Vearth's true gift lies in the embrace of "Spyr," a magical essence that weaves through the land and its people. Yet, this blessed realm suffers under a curse—the Nightmares. These capricious storms unleash devastation with thunderous might, relentless winds, and blinding deluges. Within the chaos, the Nightmares birth the malevolent Abyssals, demonic creatures hell-bent on Vearth's destruction.\n\nAmidst this turmoil, the Ajins emerge as both a beacon of hope and a target of fear. Unnatural beings, they command and bend Spyr to unprecedented levels. They stand as the vanguard against the Abyssals and their Nightmares, sacrificing their lives to safeguard the weak.\n\nYou, too, are an Ajin, marked by an elemental affinity since birth, a guiding force on your destined Adventure. Your fable begins now. So, reveal to me which element enfolds you and the destiny that awaits your unwavering spirit.`)
    
                        let acceptEmbed = new MessageEmbed()
                        .setColor('GREEN')
                        .setTitle('THE FIRST STEP')
                        .setAuthor({
                            iconURL:interaction.user.displayAvatarURL(),
                            name:interaction.user.tag
                        })
                        .addFields([
                            {
                                name: `Current Objective:`,
                                value:`**Enter the command "/progressmainquest" to proceed further**`
                            }
                        ])
                        .setDescription(`Welcome to your Fable, Ajin. Before you set out on your very own adventure, let’s learn a few things first. And that is the most important of all - the “Progress Main Quest” Command. It allows you to progress the main storyline of your Fable. Use whenever you’re ready to progress this game’s story.`)
    
                        let rejectEmbed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('CANCELLED')
                        .setAuthor({
                            iconURL:interaction.user.displayAvatarURL(),
                            name:interaction.user.tag
                        })
                        .setDescription('You cannot play the game without proceeding!\n```please /awaken again to continue```')

                        let prologuerejectEmbed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('THE FIRST STEP')
                        .setAuthor({
                            iconURL:interaction.user.displayAvatarURL(),
                            name:interaction.user.tag
                        })
                        .addFields([
                            {
                                name: `Current Objective:`,
                                value:`**Enter the command "/progressmainquest" to proceed further**`
                            }
                        ])
                        .setDescription(`Yeah backing out is not an option anymore,anyways\n\nWelcome to your Fable, Ajin. Before you set out on your very own adventure, let’s learn a few things first. And that is the most important of all - the “Progress Main Quest” Command. It allows you to progress the main storyline of your Fable. Use whenever you’re ready to progress this game’s story.\n\nNow, enter the command /progressmainquest to proceed further.`)

                        let elementEmbed1 = new MessageEmbed()
                        .setColor('BLUE')
                        .setTitle('ELEMENT SELECTION')
                        .setAuthor({
                            iconURL:interaction.user.displayAvatarURL(),
                            name:interaction.user.tag
                        })
                        .setDescription('Choose the element of Spyr that enfolds you:')
                        const attachment2 = new MessageAttachment('assets/AubeTown/nightmare.jpeg')
                        let prologueEmbed = new MessageEmbed()
                        .setColor('BLUE')
                        .setTitle('A New Beginning')
                        .setImage('attachment2://nightmare.jpeg')
                        .setAuthor({
                            iconURL:interaction.user.displayAvatarURL(),
                            name:interaction.user.tag
                        })
                        
                        .setDescription(`As the Nightmare's tendrils stretched across the southern realm, you raced towards the nearest bastion of safety. Yet, as despair settled upon you like a shroud, an unexpected savior emerged from the shadows - Mr. Briggs, an old acquaintance. Emerging from a fitful slumber, you awoke to find yourself nestled within the comforting embrace of Aube Town.\n\nIn the safety of Mr. Briggs' presence, you confided your dwindling career as a Bodyguard, like a flickering flame threatened by encroaching darkness. Captivated by your tale, he beseeched you to become the shield that safeguards his life and that of his son, Emyr, during their stay in the town.\n\nTogether, you ventured forth, marching towards the Mayor's domain, the air thick with apprehension. Yet, fate, with its twisted sense of irony, lay in wait. The murky depths of treachery revealed themselves as you fell into an ambush orchestrated by the notorious Beer Buccaneers, the local brigands known for their depravity.\n\nIn this crucible of danger, you must rise to the occasion, combating the sinister forces that seek to unravel your newfound purpose. It is here, amidst the clash of steel and the scent of fear, that you shall prove your mettle, illuminating the path ahead and silencing the doubts that haunt your tormented soul.\n\n[Read extended Prologue](https://docs.google.com/document/d/1KMXk4I87ZPkMwGQbG5nvcA_c5L2IWTT2i6t_5_8W2x8/edit?usp=drive_link)📜`)

                        let errorEmbed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('ERROR')
                        .setAuthor({
                            iconURL:interaction.user.displayAvatarURL(),
                            name:interaction.user.tag
                        })
                        .setDescription('an error was encountered while creating your profile! kindly /awaken again')

                   await interaction.deferReply()
                    await interaction.editReply({content: null,embeds:[ProceedEmbed],components:[btnraw],files:[attachment]})
                    let filter = i => i.user.id === authorId 
                    let filter_select_class = i => (i.customId === 'select_class') && i.user.id === authorId
                    let filter_select_element = i => (i.customId === 'select_element') && i.user.id === authorId
                        let collector = await interaction.channel.createMessageComponentCollector({filter: filter})
                        let collector_select_element = await interaction.channel.createMessageComponentCollector({filter: filter_select_element})
                        
                        let collector_select_class = await interaction.channel.createMessageComponentCollector({filter: filter_select_class})
                
                        collector.on('collect',async (btn) => {
                            if(btn.isButton()){
                                if(btn.customId === "btn_accept"){
                                    await btn.deferUpdate().catch(e => {})
                                    await interaction.editReply({embeds:[classEmbed],components:[select_class],files:[]})
                                    
                                    
                                    let profile = await new profileModel({
                                        userID: authorId,
                                        serverID: guildID,
                                        coins: 50,
                                        xp:0,
                                        level:1,
                                        energy:25,
                                        skill_points:0,
                                        class:'',
                                        elements:[],
                                        skill_tree:{
                                            elemental:0,
                                            class:1,
                                            class_status:0,
                                            status:0
                                        },
                                        vitality:1,
                                        health: 100,
                                        magicPower: 5,
                                        mana: 0,
                                        evasion: 0.05,
                                        speed: 10,
                                        magicResistance: 5,
                                        armour: 5,
                                        attackDamage: 10,
                                        weapon: [],
                                        armourSuit:[],
                                        items:[],
                                        status_effects:{
                                            status:[],
                                            value:[],
                                            turns:0
                                        },
                                        currentskills: [],
                                        allskills:[],
                                        passiveskills:[],
                                        quest:'None',
                                        quest_location:'',
                                        quest_mob:'',
                                        quest_quantity:0,
                                        quest_item:'',
                                        encounter:[],
                                        main_quest:"Tutorial",
                                        side_quest:[],
                                        completed_quests:[],
                                        main_quest_phase:"1",
                                        side_quest_phase:"",
                                        kingdom:"solarstrio",
                                        city_town:"aube",
                                        location:"tutorial",
                                        dungeon:{
                                            status:false,
                                            name:"",
                                            step:0
                                        },
                                        completed_dungeons:[],
                                        merit:0,
                                        guild:"None",
                                        guild_rank:"None",
                                        ranger_grade:"None",
                                        titles:[],
                                        current_title:"None",
                                        mount:"None"
                                        
                                        
                                    })
                                    profile.save();
                    
                                let playerInventory = await new inventory({
                                    userID: authorId,
                                    serverID: guildID,
                                    inventory: {
                                        weapons:[],
                                        items:[],
                                        armour:[],
                                        potions:[],
                                    }
                                })
                                playerInventory.save();
                                }
                                // else if(btn.customId === 'prologue_accept'){
                                //     await btn.deferUpdate().catch(e => {})
                                //     await interaction.editReply({embeds:[acceptEmbed],components:[]})
                                //     collector.stop()
                                // }
                                // else if(btn.customId === "prologue_reject"){
                                //     await btn.deferUpdate().catch(e => {})
                                //     await interaction.editReply({embeds:[prologuerejectEmbed],components:[]})
                                //     collector.stop()
                                // }
                                else if(btn.customId === "btn_reject"){
                                    await btn.deferUpdate().catch(e => {})
                                    await interaction.editReply({embeds:[rejectEmbed],components:[],files:[]})
                                    collector.stop()
                                }
                               
                                
                                

                                
                         
                                
                            }
                              
                
                   
                   
                    })
                    let user_elements =[]
                    let count = 0
                    collector_select_class.on('collect', async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                        
                        if(collected.customId == 'select_class'){
                            let user_class = collected.values[0]
                            let class_weapon
                            profileModel.findOne({userID:authorId},async (err,foundUser) => {
                            inventory.findOne({userID:authorId},async (err,foundInventory) => {
                                if(user_class == 'gladius'){
                                    foundUser.class = 'Gladius'
                                    foundUser.attackDamage = 17
                                    foundUser.armour = 12
                                    foundUser.speed = 17
                                    foundUser.evasion = 0.065
                                    foundUser.health = 100
                                    foundUser.magicPower = 7
                                    foundUser.vitality = 10
                                    foundUser.magicResistance = 7
                                    foundUser.currentskills = [{
                                        name: 'Flashing Strike',
                                        description: 'Unleash a swift strike, catching your opponent off guard with lightning-fast precision.',
                                    }]
                                    foundUser.allskills = [{
                                        name: 'Flashing Strike',
                                        description: 'Unleash a swift strike, catching your opponent off guard with lightning-fast precision.',
                                    }]

                                    class_weapon = {name: tachi_katana,
                                        quantity:Number(1)}
                                }
                                else if(user_class == 'noir'){
                                    foundUser.class = 'Noir'
                                    foundUser.attackDamage = 17
                                    foundUser.armour = 7
                                    foundUser.speed = 22
                                    foundUser.evasion = 0.08
                                    foundUser.health = 100
                                    foundUser.magicPower = 7
                                    foundUser.vitality = 10
                                    foundUser.magicResistance = 7
                                    foundUser.currentskills = [{
                                        name: 'Vanishing Strike',
                                        description: 'The Noir melds into the darkness, teleporting behind their target with deadly intent, leaving no trace but the echoing whispers of their vanishing strike.',
                                    }]
                                    foundUser.allskills = [{
                                        name: 'Vanishing Strike',
                                        description: 'The Noir melds into the darkness, teleporting behind their target with deadly intent, leaving no trace but the echoing whispers of their vanishing strike.',
                                    }]

                                    class_weapon = {name: Farmer_scythe,
                                        quantity:Number(1)}
                                }
                                else if(user_class == 'magus'){
                                    foundUser.class = 'Magus'
                                    foundUser.attackDamage = 3
                                    foundUser.armour = 7
                                    foundUser.speed = 10
                                    foundUser.health = 100
                                    foundUser.magicPower = 22
                                    foundUser.vitality = 10
                                    foundUser.magicResistance = 18
                                    foundUser.currentskills = [{
                                        name: 'Force Push',
                                        description: 'Unleash an arcane surge, a devastating force that propels adversaries backward with explosive energy.',
                                    }]
                                    foundUser.allskills = [{
                                        name: 'Force Push',
                                        description: 'Unleash an arcane surge, a devastating force that propels adversaries backward with explosive energy.',
                                    }]

                                    class_weapon = {name: bronze_orbe,
                                        quantity:Number(1)}
                                }
                                else if(user_class == 'buushin'){
                                    foundUser.class = 'Buushin'
                                    foundUser.attackDamage = 22
                                    foundUser.armour = 17
                                    foundUser.speed = 10
                                    foundUser.magicPower = 3
                                    foundUser.vitality = 10
                                    foundUser.health = 100
                                    foundUser.magicResistance = 8
                                    foundUser.currentskills = [{
                                        name: 'Shattering Kick',
                                        description: `Unleash a resonating kick that reverberates through your opponent's defenses, creating a shattering impact.`,
                                    }]
                                    foundUser.allskills = [{
                                        name: 'Shattering Kick',
                                        description: `Unleash a resonating kick that reverberates through your opponent's defenses, creating a shattering impact.`,
                                    }]

                                    class_weapon = {name: leather_gauntlets,
                                        quantity:Number(1)}
                                        
                                }
                                
                                else if(user_class == 'dragoon'){
                                    foundUser.class = 'Dragoon'
                                    foundUser.attackDamage = 7
                                    foundUser.armour = 7
                                    foundUser.speed = 17
                                    foundUser.evasion = 0.065
                                    foundUser.magicPower = 17
                                    foundUser.health = 100
                                    foundUser.vitality = 10
                                    foundUser.magicResistance = 12
                                    foundUser.currentskills = [{
                                        name: 'Piercing Shot',
                                        description: `Harness your weapon's power to project a shot that defies armor, piercing through even the sturdiest defenses with relentless precision.`,
                                    }]
                                    foundUser.allskills = [{
                                        name: 'Piercing Shot',
                                        description: `Harness your weapon's power to project a shot that defies armor, piercing through even the sturdiest defenses with relentless precision.`,
                                    }]

                                    class_weapon = {name: carved_bow,
                                        quantity:Number(1)}
                                }
                                
                                foundInventory.inventory.weapons.push(class_weapon)

                               await collected.deferUpdate().catch(e => {})
                                await interaction.editReply({content: null,embeds:[elementEmbed1],components:[select_element]})
                                await profileModel.updateOne({userID:authorId},{class:foundUser.class,attackDamage:foundUser.attackDamage,armour:foundUser.armour,speed:foundUser.speed,magicPower:foundUser.magicPower,vitality:foundUser.vitality,magicResistance:foundUser.magicResistance,evasion:foundUser.evasion,currentskills:foundUser.currentskills,allskills:foundUser.allskills,health:foundUser.health})
                                await inventory.updateOne({userID:authorId},{inventory:foundInventory.inventory})
                                
                               

                            })
                                
                                
                            })
                            
                        }
                    })
                    collector_select_class.on("end",async(btn) => {
                        await interaction.editReply({components:[d_btnraw]})
                    })
                        collector_select_element.on('collect', async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                            if(collected.customId == 'select_element'){
                                user_elements.push(collected.values[0])
                                await profileModel.updateOne({userID:authorId},{elements:user_elements})
                                
                                collector_select_class.stop()
                                collector_select_element.stop()
                  
                                    profileModel.findOne({userID:authorId},async (err,foundUser) => {
                                        if(foundUser.class =="" || foundUser.elements.length !=1){
                                            await interaction.editReply({content: null,embeds:[errorEmbed],components:[]})
                                            await profileModel.deleteOne({userID:authorId})
                                            await inventory.deleteOne({userID:authorId})
                                        }
                                        else{
                                            await collected.deferUpdate().catch(e => {})
                                            await interaction.editReply({content: null,embeds:[prologueEmbed],components:[],files:[attachment2]})
                                            await interaction.channel.send({content: null,embeds:[acceptEmbed],components:[],files:[]})
                                        }
                                    })
                                   
                                   
                                    
                                
                        
                                    
                       
                           
                           
                            
                        }
                        
                    })
                    
                    
    
                    
    
    
                })
                
               
               
            }
        })
        

    })