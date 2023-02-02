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
                        
                    
                    await interaction.reply({content: null,embeds:[ProceedEmbed],components:[btnraw]})
                    let filter = i => i.user.id === authorId
                        let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                
                        collector.on('collect',async (btn) => {
                            if(btn.isButton()){
                                if(btn.customId === "btn_accept"){
                                    await btn.deferUpdate().catch(e => {})
                                    await interaction.editReply({embeds:[acceptEmbed]})
                                    
                                    
                                    let profile = await new profileModel({
                                        userID: authorId,
                                        serverID: guildID,
                                        coins: 20000,
                                        xp:205,
                                        level:1,
                                        skill_points:0,
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
                                        weaponskills: [{
                                            name: 'Basic attack',
                                            description: 'Basic attack',
                                        },{name: 'Charged Attack',
                                        description: 'Charge a powerful attack for 1 turn'},],
                                        magicskills:[{
                                            name: 'Fireball',
                                            description: 'Dealing damage and burning them for 3 turns',
                                        }],
                                        passiveskills:[],
                                        quest:false,
                                        quest_location:'',
                                        quest_mob:'',
                                        quest_quantity:0,
                                        quest_item:'',
                                        encounter:[],
                                        main_quest:"Tutorial",
                                        side_quest:"",
                                        completed_quests:"",
                                        main_quest_phase:"1",
                                        side_quest_phase:""
                                        
                                    })
                                    profile.save();
                    
                                let playerInventory = await new inventory({
                                    userID: authorId,
                                    serverID: guildID,
                                    inventory: {
                                        weapons:[{name: Sword,
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
    
                    collector.on('end', () => {
                        interaction.editReply({components: [d_btnraw]})
                    })
    
    
                })
                
               
               
            }
        })
        

    })