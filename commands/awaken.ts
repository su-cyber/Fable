import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import { arachnidVenom } from '../src/age/items'
import { ghoulSkull } from '../src/age/items'
import { Sword } from '../src/age/weapons/sword'
import { steelArmour } from '../src/age/armour/steel_armour'
import { healthPotion } from '../src/age/potions/healthPotion'
import { MessageActionRow, MessageSelectMenu, SelectMenuInteraction } from 'discord.js'
import { Collector, MessageButton, MessageEmbed } from 'discord.js'
import { steelSword } from '../src/age/weapons/steelSword'
import { MessageComponentInteraction,CacheType } from 'discord.js'
import { sleep } from '../src/utils'

export default new MyCommandSlashBuilder({ name: 'awaken', description: 'Awaken to your story' }).setDo(
    async (bot, interaction) => {
        
        
        const authorId = interaction.user.id;
        const guildID = interaction.guildId;
        
        profileModel.exists({userID: authorId},async function(err,res){
            if(res){
               await interaction.reply({content:"You have already begun your journey!"});
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
                                    
                                    label: `Samurai`,
                                    description: `Bloodthirsty and slices like butter.`,
                                    value: `samurai`,
                                },{
                                    label: `Crusader`,
                                    description: `Will crush you with his hammer.`,
                                    value: `crusader`,
                                },{
                                    label: `Sorceror`,
                                    description: `Ruins your day from a safe distance.`,
                                    value: `sorceror`,
                                },
                                {
                                    label: `Wanderer`,
                                    description: `Left their home to claim yours.`,
                                    value: `wanderer`,
                                },{
                                    label: `Paladin`,
                                    description: `Very heavy, resilient and unyielding.`,
                                    value: `paladin`,
                                },{
                                    label: `Assassin`,
                                    description: `Silent as a feather, fast as a knife.`,
                                    value: `assassin`,
                                },
                                
                                )
                                .setDisabled(false),
                        ]) 
                        
                        const elements = [{
                            name:`Flame`,
                            description:`Element of fire`
                        },{
                            name:`Wave`,
                            description:`Element of water`
                        },{
                            name:`Light`,
                            description:`Element of light`
                        },{
                            name:`Frost`,
                            description:`Element of ice`
                        },{
                            name:`Volt`,
                            description:`Element of lightning`
                        },{
                            name:`Terra`,
                            description:`Element of earth`
                        },{
                            name:`Venom`,
                            description:`Element of poison`
                        },{
                            name:`Gale`,
                            description:`Element of wind`
                        },{
                            name:`Bloom`,
                            description:`Element of plants`
                        },{
                            name:`Alloy`,
                            description:`Element of metals`
                        }]
                        let select_element =  new MessageActionRow().addComponents([
                            new MessageSelectMenu()
                            .setCustomId('select_element')
                                .setPlaceholder(`Select your preferred element ${interaction.user.username}`)
                                .addOptions(
                                    elements.map(element => ({
                                        label: element.name,
                                        description: element.description,
                                        value: element.name,
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

                    
                    await interaction.reply({content: null,embeds:[ProceedEmbed],components:[btnraw]})
                    let filter = i => i.user.id === authorId
                    let filter_select_class = i => (i.customId === 'select_class') && i.user.id === authorId
                    let filter_select_element = i => (i.customId === 'select_element') && i.user.id === authorId
                        let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                        let collector_select_element = await interaction.channel.createMessageComponentCollector({filter: filter_select_element,time : 1000 * 120})
                        
                        let collector_select_class = await interaction.channel.createMessageComponentCollector({filter: filter_select_class})
                
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
                                        energy:0,
                                        skill_points:0,
                                        class:'',
                                        elements:[],
                                        skill_tree:{
                                            physical:0,
                                            magical:1,
                                            class:1,
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
                                        completed_dungeons:[]
                                        
                                    })
                                    profile.save();
                    
                                let playerInventory = await new inventory({
                                    userID: authorId,
                                    serverID: guildID,
                                    inventory: {
                                        weapons:[{name: Sword,
                                        quantity:Number(1)},{name: steelSword,
                                            quantity:Number(1)}],
                                        items:[{name:arachnidVenom.name,
                                            description:arachnidVenom.description,
                                            quantity:Number(2)
                                        }, {name:ghoulSkull.name,
                                            description:ghoulSkull.description,
                                            quantity:Number(3)
                    
                                        }],
                                        armour:[{name: steelArmour,
                                            quantity:Number(1)}],
                                        potions:[{
                                            name: healthPotion,
                                            quantity:Number(1)
                                        }],
                                    }
                                })
                                playerInventory.save();
    
                                    
                               
                                collector.stop()
                                    
                                }
                                else if(btn.customId === "btn_reject"){
                                    await btn.deferUpdate().catch(e => {})
                                    await interaction.editReply({embeds:[rejectEmbed]})
    
                                    collector.stop()
                                }
    
                                
                                
                            }
                              
                
                   
                   
                    })
                    let user_elements =[]
                    let count = 0
                    collector_select_class.on('collect', async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                           
                        if(collected.customId == 'select_class'){
                            let user_class = collected.values[0]
                            profileModel.findOne({userID:authorId},async (err,foundUser) => {
                                
                                if(user_class == 'samurai'){
                                    foundUser.class = 'Samurai'
                                    foundUser.attackDamage = 15
                                    foundUser.armour = 8
                                    foundUser.speed = 15
                                    foundUser.health = 80
                                    foundUser.magicPower = 8
                                    foundUser.vitality = 8
                                    foundUser.magicResistance = 6
                                    foundUser.currentskills = [{
                                        name: 'Shattering Kick',
                                        description: 'A powerful kick that deals low damage to the opponent',
                                    }]
                                    foundUser.allskills = [{
                                        name: 'Shattering Kick',
                                        description: 'A powerful kick that deals low damage to the opponent',
                                    }]
                                }
                                else if(user_class == 'assassin'){
                                    foundUser.class = 'Assassin'
                                    foundUser.attackDamage = 20
                                    foundUser.armour = 0
                                    foundUser.speed = 20
                                    foundUser.health = 50
                                    foundUser.magicPower = 5
                                    foundUser.vitality = 5
                                    foundUser.magicResistance = 10
                                    foundUser.currentskills = [{
                                        name: 'Vanishing Strike',
                                        description: 'The assassin disappears and reappears behind their target, dealing low damage.',
                                    }]
                                    foundUser.allskills = [{
                                        name: 'Vanishing Strike',
                                        description: 'The assassin disappears and reappears behind their target, dealing low damage.',
                                    }]
                                }
                                else if(user_class == 'sorceror'){
                                    foundUser.class = 'Sorceror'
                                    foundUser.attackDamage = 0
                                    foundUser.armour = 5
                                    foundUser.speed = 10
                                    foundUser.health = 80
                                    foundUser.magicPower = 20
                                    foundUser.vitality = 8
                                    foundUser.magicResistance = 15
                                    foundUser.currentskills = [{
                                        name: 'Force Push',
                                        description: 'Pushes the enemy away from the Sorcerer, dealing low damage.',
                                    }]
                                    foundUser.allskills = [{
                                        name: 'Force Push',
                                        description: 'Pushes the enemy away from the Sorcerer, dealing low damage.',
                                    }]
                                }
                                else if(user_class == 'crusader'){
                                    foundUser.class = 'Crusader'
                                    foundUser.attackDamage = 20
                                    foundUser.armour = 15
                                    foundUser.speed = 10
                                    foundUser.magicPower = 0
                                    foundUser.vitality = 15
                                    foundUser.health = 150
                                    foundUser.magicResistance = 0
                                    foundUser.currentskills = [{
                                        name: 'Sprint Bash',
                                        description: 'The Crusader sprints into the enemy, pushing them to the ground.',
                                    }]
                                    foundUser.allskills = [{
                                        name: 'Sprint Bash',
                                        description: 'The Crusader sprints into the enemy, pushing them to the ground.',
                                    }]
                                }
                                
                                else if(user_class == 'wanderer'){
                                    foundUser.class = 'Wanderer'
                                    foundUser.attackDamage = 10
                                    foundUser.armour = 5
                                    foundUser.speed = 15
                                    foundUser.magicPower = 15
                                    foundUser.health = 100
                                    foundUser.vitality = 10
                                    foundUser.magicResistance = 15
                                    foundUser.currentskills = [{
                                        name: 'Scissor Kick',
                                        description: 'The Wanderer kicks the target with a powerful scissor kick, dealing low damage.',
                                    }]
                                    foundUser.allskills = [{
                                        name: 'Scissor Kick',
                                        description: 'The Wanderer kicks the target with a powerful scissor kick, dealing low damage.',
                                    }]
                                }
                                else if(user_class == 'paladin'){
                                    foundUser.class = 'Paladin'
                                    foundUser.attackDamage = 10
                                    foundUser.armour = 15
                                    foundUser.speed = 10
                                    foundUser.magicPower = 10
                                    foundUser.vitality = 10
                                    foundUser.health = 100
                                    foundUser.magicResistance = 5
                                    foundUser.currentskills = [{
                                        name: 'Authority Thrust',
                                        description: 'The Paladin thrusts their spear forward, dealing low damage to the enemy.',
                                    }]
                                    foundUser.allskills = [{
                                        name: 'Authority Thrust',
                                        description: 'The Paladin thrusts their spear forward, dealing low damage to the enemy.',
                                    }]
                                }

                                await profileModel.updateOne({userID:authorId},{class:foundUser.class,attackDamage:foundUser.attackDamage,armour:foundUser.armour,speed:foundUser.speed,magicPower:foundUser.magicPower,vitality:foundUser.vitality,magicResistance:foundUser.magicResistance,currentskills:foundUser.currentskills,allskills:foundUser.allskills})
                                interaction.editReply({content: null,embeds:[elementEmbed1],components:[select_element]})
                                collector_select_class.stop()
                                
                                
                            })
                            
                        }
                    })
                        collector_select_element.on('collect', async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                            if(collected.customId == 'select_element'){
                                user_elements.push(collected.values[0])
                                await profileModel.updateOne({userID:authorId},{elements:user_elements})
                                
                  
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
                                   
                                   
                                    collector_select_element.stop()
                                
                        

                       
                           
                           
                            
                        }
                        
                    })
                    
    
                    
    
    
                })
                
               
               
            }
        })
        

    })