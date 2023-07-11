import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import { Sword } from '../src/age/weapons/sword'
import { steelArmour } from '../src/age/armour/steel_armour'
import { healthPotion } from '../src/age/potions/healthPotion'
import { MessageActionRow, MessageSelectMenu} from 'discord.js'
import { MessageButton, MessageEmbed } from 'discord.js'
import { steelSword } from '../src/age/weapons/steelSword'
import { MessageComponentInteraction,CacheType } from 'discord.js'
import { sleep } from '../src/utils'


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
                        new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Tutorial"),
                        new MessageButton().setCustomId("btn_reject").setStyle("DANGER").setLabel("Cancel"),])
                        
                        
        
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
                        .setTitle('CLASS SELECTION')
                        .setAuthor({
                            iconURL:interaction.user.displayAvatarURL(),
                            name:interaction.user.tag
                        })
                        .setDescription('Select your class out of the options')
                        
                        let ProceedEmbed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('TUTORIAL: New Beginings')
                        .setAuthor({
                            iconURL:interaction.user.displayAvatarURL(),
                            name:interaction.user.tag
                        })
                        .setDescription(`You are the newest recruit for the Empral Brigade, otherwise referred to as the “Horde” by different chapters of Knights across the Kingdoms. You are conscripts who are on your way over to the City of Vigia to assist the Sol-Crusaders. However, your long journey is cut short as a new Fragment is discovered near Aube Town and you are requested to wait until it has been sealed. During this time, the town is attacked by a band of Beer Buccaneers! You need to save yourself and the townsfolk under the absence of security.`)
    
                        let acceptEmbed = new MessageEmbed()
                        .setColor('GREEN')
                        .setTitle('TUTORIAL STARTED')
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
                        .setDescription('You have decided to Begin your story!\n\nTutorial of Fabled has been initiated!')
    
                        let rejectEmbed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('CANCELLED')
                        .setAuthor({
                            iconURL:interaction.user.displayAvatarURL(),
                            name:interaction.user.tag
                        })
                        .setDescription('You cannot play the game without completing the tutorial')
                        let elementEmbed1 = new MessageEmbed()
                        .setColor('BLUE')
                        .setTitle('ELEMENT SELECTION')
                        .setAuthor({
                            iconURL:interaction.user.displayAvatarURL(),
                            name:interaction.user.tag
                        })
                        .setDescription('Select your preferred element out of the options')

                    

                        let errorEmbed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('ERROR')
                        .setAuthor({
                            iconURL:interaction.user.displayAvatarURL(),
                            name:interaction.user.tag
                        })
                        .setDescription('an error was encountered while creating your profile! kindly /awaken again')

                   await interaction.deferReply()
                    await interaction.editReply({content: null,embeds:[ProceedEmbed],components:[btnraw]})
                    let filter = i => i.user.id === authorId || (i.customId == 'btn_element')
                    let filter_select_class = i => (i.customId === 'select_class') && i.user.id === authorId
                    let filter_select_element = i => (i.customId === 'select_element') && i.user.id === authorId
                        let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 240})
                        let collector_select_element = await interaction.channel.createMessageComponentCollector({filter: filter_select_element,time : 1000 * 240})
                        
                        let collector_select_class = await interaction.channel.createMessageComponentCollector({filter: filter_select_class,time:1000*240})
                
                        collector.on('collect',async (btn) => {
                            if(btn.isButton()){
                                if(btn.customId === "btn_accept"){
                                    await btn.deferUpdate().catch(e => {})
                                    await interaction.editReply({embeds:[classEmbed],components:[select_class]})
                                    
                                    
                                    let profile = await new profileModel({
                                        userID: authorId,
                                        serverID: guildID,
                                        coins: 20000,
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
                                        quest:false,
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
                                        guild:"None",
                                        guild_class:"None",
                                        guild_rank:"None",
                                        titles:[],
                                        current_title:"None"
                                        
                                    })
                                    profile.save();
                    
                                let playerInventory = await new inventory({
                                    userID: authorId,
                                    serverID: guildID,
                                    inventory: {
                                        weapons:[{name: Sword,
                                        quantity:Number(1)},{name: steelSword,
                                            quantity:Number(1)}],
                                        items:[],
                                        armour:[{name: steelArmour,
                                            quantity:Number(1)}],
                                        potions:[{
                                            name: healthPotion,
                                            quantity:Number(1)
                                        }],
                                    }
                                })
                                playerInventory.save();
                                }
                                else if(btn.customId === "btn_reject"){
                                    await btn.deferUpdate().catch(e => {})
                                    await interaction.editReply({embeds:[rejectEmbed],components:[]})
                                    collector.stop()
                                }
                               
                                
                                collector.on("end",async(btn) => {
                                    await interaction.editReply({components:[d_btnraw]})
                                })

                                
                         
                                
                            }
                              
                
                   
                   
                    })
                    let user_elements =[]
                    let count = 0
                    collector_select_class.on('collect', async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                        
                        if(collected.customId == 'select_class'){
                            let user_class = collected.values[0]
                            profileModel.findOne({userID:authorId},async (err,foundUser) => {
                                
                                if(user_class == 'gladius'){
                                    foundUser.class = 'Gladius'
                                    foundUser.attackDamage = 15
                                    foundUser.armour = 10
                                    foundUser.speed = 15
                                    foundUser.evasion = 0.065
                                    foundUser.health = 100
                                    foundUser.magicPower = 7
                                    foundUser.vitality = 10
                                    foundUser.magicResistance = 5
                                    foundUser.currentskills = [{
                                        name: 'Flashing Strike',
                                        description: 'Unleash a swift strike, catching your opponent off guard with lightning-fast precision.',
                                    }]
                                    foundUser.allskills = [{
                                        name: 'Flashing Strike',
                                        description: 'Unleash a swift strike, catching your opponent off guard with lightning-fast precision.',
                                    }]
                                }
                                else if(user_class == 'noir'){
                                    foundUser.class = 'Noir'
                                    foundUser.attackDamage = 15
                                    foundUser.armour = 2
                                    foundUser.speed = 20
                                    foundUser.evasion = 0.08
                                    foundUser.health = 50
                                    foundUser.magicPower = 10
                                    foundUser.vitality = 5
                                    foundUser.magicResistance = 10
                                    foundUser.currentskills = [{
                                        name: 'Vanishing Strike',
                                        description: 'The Noir melds into the darkness, teleporting behind their target with deadly intent, leaving no trace but the echoing whispers of their vanishing strike.',
                                    }]
                                    foundUser.allskills = [{
                                        name: 'Vanishing Strike',
                                        description: 'The Noir melds into the darkness, teleporting behind their target with deadly intent, leaving no trace but the echoing whispers of their vanishing strike.',
                                    }]
                                }
                                else if(user_class == 'magus'){
                                    foundUser.class = 'Magus'
                                    foundUser.attackDamage = 2
                                    foundUser.armour = 5
                                    foundUser.speed = 10
                                    foundUser.health = 100
                                    foundUser.magicPower = 20
                                    foundUser.vitality = 10
                                    foundUser.magicResistance = 15
                                    foundUser.currentskills = [{
                                        name: 'Force Push',
                                        description: 'Unleash an arcane surge, a devastating force that propels adversaries backward with explosive energy.',
                                    }]
                                    foundUser.allskills = [{
                                        name: 'Force Push',
                                        description: 'Unleash an arcane surge, a devastating force that propels adversaries backward with explosive energy.',
                                    }]
                                }
                                else if(user_class == 'buushin'){
                                    foundUser.class = 'Buushin'
                                    foundUser.attackDamage = 20
                                    foundUser.armour = 15
                                    foundUser.speed = 10
                                    foundUser.magicPower = 2
                                    foundUser.vitality = 10
                                    foundUser.health = 100
                                    foundUser.magicResistance = 5
                                    foundUser.currentskills = [{
                                        name: 'Shattering Kick',
                                        description: `Unleash a resonating kick that reverberates through your opponent's defenses, creating a shattering impact.`,
                                    }]
                                    foundUser.allskills = [{
                                        name: 'Shattering Kick',
                                        description: `Unleash a resonating kick that reverberates through your opponent's defenses, creating a shattering impact.`,
                                    }]
                                }
                                
                                else if(user_class == 'dragoon'){
                                    foundUser.class = 'Dragoon'
                                    foundUser.attackDamage = 5
                                    foundUser.armour = 5
                                    foundUser.speed = 15
                                    foundUser.evasion = 0.065
                                    foundUser.magicPower = 15
                                    foundUser.health = 70
                                    foundUser.vitality = 7
                                    foundUser.magicResistance = 15
                                    foundUser.currentskills = [{
                                        name: 'Piercing Shot',
                                        description: `Harness your weapon's power to project a shot that defies armor, piercing through even the sturdiest defenses with relentless precision.`,
                                    }]
                                    foundUser.allskills = [{
                                        name: 'Piercing Shot',
                                        description: `Harness your weapon's power to project a shot that defies armor, piercing through even the sturdiest defenses with relentless precision.`,
                                    }]
                                }
                                

                               await collected.deferUpdate().catch(e => {})
                                await interaction.editReply({content: null,embeds:[elementEmbed1],components:[select_element]})
                                await profileModel.updateOne({userID:authorId},{class:foundUser.class,attackDamage:foundUser.attackDamage,armour:foundUser.armour,speed:foundUser.speed,magicPower:foundUser.magicPower,vitality:foundUser.vitality,magicResistance:foundUser.magicResistance,currentskills:foundUser.currentskills,allskills:foundUser.allskills,health:foundUser.health})
                                
                                
                               
                                
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
                                collector.stop()
                                collector_select_class.stop()
                                collector_select_element.stop()
                  
                                    profileModel.findOne({userID:authorId},async (err,foundUser) => {
                                        if(foundUser.class =="" || foundUser.elements.length !=1){
                                            await interaction.editReply({content: null,embeds:[errorEmbed],components:[]})
                                            await profileModel.deleteOne({userID:authorId})
                                            await inventory.deleteOne({userID:authorId})
                                        }
                                        else{
                                            await interaction.editReply({content: null,embeds:[acceptEmbed],components:[]})
                                        }
                                    })
                                   
                                   
                                    
                                
                        
                                    
                       
                           
                           
                            
                        }
                        
                    })
                    collector_select_element.on("end",async(btn) => {
                        await interaction.editReply({components:[d_btnraw]})
                    })
                    
    
                    
    
    
                })
                
               
               
            }
        })
        

    })