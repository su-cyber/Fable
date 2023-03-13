import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import { arachnidVenom } from '../src/age/items'
import { ghoulSkull } from '../src/age/items'
import { Sword } from '../src/age/weapons/sword'
import { steelArmour } from '../src/age/armour/steel_armour'
import { healthPotion } from '../src/age/potions/healthPotion'
import { MessageActionRow, MessageSelectMenu, SelectMenuInteraction } from 'discord.js'
import { MessageComponentInteraction,CacheType } from 'discord.js'
import { Collector, MessageButton, MessageEmbed } from 'discord.js'
import { steelSword } from '../src/age/weapons/steelSword'

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
                                    label: `Soldier`,
                                    description: `Proficient in all, master of none.`,
                                    value: `soldier`,
                                },{
                                    label: `Sorcerer`,
                                    description: `Ruins your day from a safe distance.`,
                                    value: `sorcerer`,
                                },
                                {
                                    label: `Wanderer`,
                                    description: `Left their home to claim yours.`,
                                    value: `wanderer`,
                                },{
                                    label: `Knight`,
                                    description: `Very heavy, resilient and unyielding.`,
                                    value: `knight`,
                                },{
                                    label: `Assassin`,
                                    description: `Silent as a feather, fast as a knife.`,
                                    value: `assassin`,
                                },
                                
                                )
                                .setDisabled(false),
                        ])  

                        let select_element =  new MessageActionRow().addComponents([
                            new MessageSelectMenu()
                            .setCustomId('select_element')
                                .setPlaceholder(`Select your preferred element ${interaction.user.username}`)
                                .addOptions({
                                    
                                    label: `Flame`,
                                    description: `Element of fire`,
                                    value: `flame`,
                                },{
                                    label: `Wave`,
                                    description: `Element of water`,
                                    value: `wave`,
                                },{
                                    label: `Light`,
                                    description: `element of light`,
                                    value: `light`,
                                },{
                                    label: `Volt`,
                                    description: `element of lightning`,
                                    value: `volt`,
                                },
                                {
                                    label: `Frost`,
                                    description: `Element of ice`,
                                    value: `frost`,
                                },{
                                    label: `Terra`,
                                    description: `element of earth`,
                                    value: `terra`,
                                },{
                                    label: `Gale`,
                                    description: `element of wind`,
                                    value: `wind`,
                                },{
                                    label: `Alloy`,
                                    description: `element of metal`,
                                    value: `alloy`,
                                },{
                                    label: `Wild`,
                                    description: `element of wind`,
                                    value: `wild`,
                                },{
                                    label: `Bloom`,
                                    description: `element of plants`,
                                    value: `bloom`,
                                },
                                
                                )
                                .setDisabled(false),
                        ])  
             
                       
                        let elementEmbed1 = new MessageEmbed()
                        .setColor('BLUE')
                        .setTitle('ELEMENT SELECTION')
                        .setAuthor({
                            iconURL:interaction.user.displayAvatarURL(),
                            name:interaction.user.tag
                        })
                        .setDescription('Select your first element out of the options')

                        let elementEmbed2 = new MessageEmbed()
                        .setColor('BLUE')
                        .setTitle('ELEMENT SELECTION')
                        .setAuthor({
                            iconURL:interaction.user.displayAvatarURL(),
                            name:interaction.user.tag
                        })
                        .setDescription('Select your second element out of the options')

                        let elementEmbed3 = new MessageEmbed()
                        .setColor('BLUE')
                        .setTitle('ELEMENT SELECTION')
                        .setAuthor({
                            iconURL:interaction.user.displayAvatarURL(),
                            name:interaction.user.tag
                        })
                        .setDescription('Select your third element out of the options')

                        let ProceedEmbed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('TUTORIAL: New Beginings')
                        .setAuthor({
                            iconURL:interaction.user.displayAvatarURL(),
                            name:interaction.user.tag
                        })
                        .setDescription(`You are the newest recruit for the Empral Brigade, otherwise referred to as the “Horde” by different chapters of Knights across the Kingdoms. You are conscripts who are on your way over to the City of Vigia to assist the Sol-Crusaders. However, your long journey is cut short as a new Fragment is discovered near Aube Town and you are requested to wait until it has been sealed. During this time, the town is attacked by a band of Beer Buccaneers! You need to save yourself and the townsfolk under the absence of security.`)
                        
                        let classEmbed = new MessageEmbed()
                        .setColor('BLURPLE')
                        .setTitle('CLASS SELECTION')
                        .setAuthor({
                            iconURL:interaction.user.displayAvatarURL(),
                            name:interaction.user.tag
                        })
                        .setDescription('Select your class out of the options')
                        
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
                        
                    
                        await interaction.reply({content: null,embeds:[classEmbed],components:[select_class]})
                        const filter = (interaction: any) =>
                
                        (interaction.customId === 'select_class' || interaction.customId === 'btn_accept'|| interaction.customId === `btn_reject` || interaction.customId === 'select_element' ) &&
                        interaction.user.id === authorId
                
                        
                        let collector = this.interaction.channel.createMessageComponentCollector({ filter })
                        collector.setMaxListeners(Infinity)
                        let user_class
                        let user_elements =[]
                        let count = 0
                        collector.on('collect', async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                           
                            if(collected.customId == 'select_class'){
                                 user_class = collected.values[0]
                                await interaction.editReply({content: null,embeds:[elementEmbed1],components:[select_element]})
                            }
                            else if(collected.customId == 'select_element'){
                                user_elements.push(collected.values[0])
                                count+=1
                                if(count == 1){
                                    await interaction.editReply({content: null,embeds:[elementEmbed2],components:[select_element]})
                                }
                                else if(count == 2){
                                    await interaction.editReply({content: null,embeds:[elementEmbed3],components:[select_element]})
                                }
                                else if(count ==3){
                                    await interaction.editReply({content: null,embeds:[ProceedEmbed],components:[btnraw]})
                                }
                                console.log(count);
                                console.log(user_elements);
                                
                                
                           }
                                else if(collected.customId === "btn_accept"){
                                    await collected.deferUpdate().catch(e => {})
                                    await interaction.editReply({embeds:[acceptEmbed]})
                                    
                                    
                                    let profile = await new profileModel({
                                        userID: authorId,
                                        serverID: guildID,
                                        coins: 20000,
                                        xp:205,
                                        level:1,
                                        skill_points:0,
                                        class:user_class,
                                        elements:user_elements,
                                        vitality:1,
                                        health: 100,
                                        magicPower: 5,
                                        mana: 50,
                                        evasion: 0.05,
                                        speed: 10,
                                        magicResistance: 5,
                                        armour: 5,
                                        attackDamage: 10,
                                        weapon: [],
                                        armourSuit:[],
                                        items:[],
                                        currentskills: [{
                                            name: 'Basic attack',
                                            description: 'Basic attack',
                                        },{name: 'Charged Attack',
                                        description: 'Charge a powerful attack for 1 turn'},{
                                            name: 'Fireball',
                                            description: 'Dealing damage and burning them for 3 turns',
                                        }],
                                        allskills:[{
                                            name: 'Basic attack',
                                            description: 'Basic attack',
                                        },{name: 'Charged Attack',
                                        description: 'Charge a powerful attack for 1 turn'},{
                                            name: 'Fireball',
                                            description: 'Dealing damage and burning them for 3 turns',
                                        },],
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
                                        location:"tutorial"
                                        
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
                                else if(collected.customId === "btn_reject"){
                                    await collected.deferUpdate().catch(e => {})
                                    await interaction.editReply({embeds:[rejectEmbed]})
    
                                    collector.stop()
                                }
    
                                
                                
                            })
                              
                
                            collector.on('end', () => {
                                interaction.editReply({components: [d_btnraw]})
                            })
                   
                    })
    
                   
    
                }
                })
                
               
               
            }
        )
        

    