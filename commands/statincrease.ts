
import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import { Collector, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, MessageComponentInteraction,CacheType} from 'discord.js'
import getHealth from '../src/utils/getHealth'

export default new MyCommandSlashBuilder({ name: 'statinvest', description: 'invest stat points' }).setDo(
    async (bot, interaction) => {
        
        
        const authorId = interaction.user.id;
        const guildID = interaction.guildId;

    let embed = new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('STAT INVEST')
    .setDescription(`invest stat points`)

    let btnraw= new MessageActionRow().addComponents([
        new MessageButton().setCustomId("attack_power").setStyle("PRIMARY").setLabel("attack power"),
        new MessageButton().setCustomId("magic_power").setStyle("PRIMARY").setLabel("magic power"),
        new MessageButton().setCustomId("vitality").setStyle("PRIMARY").setLabel("vitality"),
        new MessageButton().setCustomId("durability").setStyle("PRIMARY").setLabel("durability"),
        new MessageButton().setCustomId("speed").setStyle("PRIMARY").setLabel("speed"),
    ])

    let btn_cancel = new MessageActionRow().addComponents([
        new MessageButton().setCustomId("cancel").setStyle("DANGER").setLabel("cancel"),])

    let select =  new MessageActionRow().addComponents([
            new MessageSelectMenu()
            .setCustomId('select')
                .setPlaceholder(`Select number of skill points ${interaction.user.username}`)
                .addOptions({
                    
                        label: '1',
                        description: 'invest 1 stat point',
                        value: '1',
                },{
                    label: '2',
                    description: 'invest 2 stat point',
                    value: '2',
                },{
                    label: '3',
                    description: 'invest 3 stat point',
                    value: '3',
                },{
                    label: '4',
                    description: 'invest 4 stat point',
                    value: '4',
                },{
                    label: '5',
                    description: 'invest 5 stat point',
                    value: '5',
                }
                )
                .setDisabled(false),
        ]) 

    await interaction.deferReply()
    await interaction.editReply({content: null,embeds:[embed],components:[btnraw]})

    let filter_btn = (interaction : any) => interaction.user.id === authorId && interaction.isButton()
    let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
    let filter_cancel = (interaction : any) => interaction.user.id === authorId && interaction.customId == "cancel"
    let collector_btn =  interaction.channel.createMessageComponentCollector({ filter:filter_btn })
    let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select })
    let collector_cancel = interaction.channel.createMessageComponentCollector({ filter:filter_cancel })

    collector_btn.setMaxListeners(Infinity)
    collector_select.setMaxListeners(Infinity)
    collector_cancel.setMaxListeners(Infinity)

    collector_btn.on('collect', async i => {
        i.deferUpdate().catch(() => null)
        profileModel.findOne({userID:authorId}, async (err,foundUser) => {
            if(i.customId === 'attack_power'){
                await interaction.editReply({content: null,embeds:[embed],components:[select,btn_cancel]})
                collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                    collected.deferUpdate().catch(() => null)
                    const num = collected.values[0]
                    
                    foundUser.attackDamage += 5*Number(num)
                    foundUser.skill_points -= Number(num)
                
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('STAT INVEST')
                    .setDescription(`Your attack damage has been increased to ${foundUser.attackDamage}`)
                await profileModel.updateOne({userID:authorId},{attackDamage:foundUser.attackDamage,skill_points:foundUser.skill_points})
                await interaction.editReply({embeds:[successembed],components:[]})
                collector_select.stop()
                collector_btn.stop()
                    
                    
                })
                collector_cancel.on('collect', async j => {
                    j.deferUpdate().catch(() => null)

                    let delembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('STAT INVEST')
                    .setDescription(`stat investment cancelled!`)
                    
                    await interaction.editReply({embeds:[delembed],components:[]})
                    collector_cancel.stop()
                })
            } 

            else if(i.customId === 'magic_power'){
                await interaction.editReply({content: null,embeds:[embed],components:[select,btn_cancel]})
                collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                    collected.deferUpdate().catch(() => null)
                    const num = collected.values[0]
                    
                    foundUser.magicPower += 5*Number(num)
                    foundUser.mana += 100*Number(num)
                    foundUser.skill_points -= Number(num)
                
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('STAT INVEST')
                    .setDescription(`Your magic damage has been increased to ${foundUser.magicPower}\nYour mana has been increased to ${foundUser.mana}`)
                await profileModel.updateOne({userID:authorId},{magicPower:foundUser.magicPower,skill_points:foundUser.skill_points,mana:foundUser.mana})
                await interaction.editReply({embeds:[successembed],components:[]})
                
                collector_select.stop()
                collector_btn.stop()
                    
                })
                collector_cancel.on('collect', async j => {
                    j.deferUpdate().catch(() => null)

                    let delembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('STAT INVEST')
                    .setDescription(`stat investment cancelled!`)
                    
                    await interaction.editReply({embeds:[delembed],components:[]})
                    collector_cancel.stop()
                    
                })
            } 

            else if(i.customId === 'vitality'){
                await interaction.editReply({content: null,embeds:[embed],components:[select,btn_cancel]})
                collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                    collected.deferUpdate().catch(() => null)
                    const num = collected.values[0]
                    
                    foundUser.vitality += Number(num)
                    foundUser.health = getHealth(foundUser.level,foundUser.vitality)
                    foundUser.skill_points -= Number(num)
                
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('STAT INVEST')
                    .setDescription(`Your health has been increased to ${foundUser.health}`)
                await profileModel.updateOne({userID:authorId},{vitality:foundUser.vitality,skill_points:foundUser.skill_points,health:foundUser.health})
                await interaction.editReply({embeds:[successembed],components:[]})
                
                collector_select.stop()
                collector_btn.stop()
                    
                })
                collector_cancel.on('collect', async j => {
                    j.deferUpdate().catch(() => null)

                    let delembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('STAT INVEST')
                    .setDescription(`stat investment cancelled!`)
                    
                    await interaction.editReply({embeds:[delembed],components:[]})
                    collector_cancel.stop()
                })
            } 

            else if(i.customId === 'durability'){
                await interaction.editReply({content: null,embeds:[embed],components:[select,btn_cancel]})
                collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                    collected.deferUpdate().catch(() => null)
                    const num = collected.values[0]
                    
                    foundUser.armour += 5*Number(num)
                    foundUser.magicResistance += 5*Number(num)
                    foundUser.skill_points -= Number(num)
                
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('STAT INVEST')
                    .setDescription(`Your armour has been increased to ${foundUser.armour}\nYour magic resistance has been increased to ${foundUser.magicResistance}`)
                await profileModel.updateOne({userID:authorId},{armour:foundUser.armour,skill_points:foundUser.skill_points,magicResistance:foundUser.magicResistance})
                await interaction.editReply({embeds:[successembed],components:[]})
                
                collector_select.stop()
                collector_btn.stop()
                    
                })
                collector_cancel.on('collect', async j => {
                    j.deferUpdate().catch(() => null)

                    let delembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('STAT INVEST')
                    .setDescription(`stat investment cancelled!`)
                    
                    await interaction.editReply({embeds:[delembed],components:[]})
                    collector_cancel.stop()
                })
            } 

            else if(i.customId === 'speed'){
                await interaction.editReply({content: null,embeds:[embed],components:[select,btn_cancel]})
                collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
                    collected.deferUpdate().catch(() => null)
                    const num = collected.values[0]
                    
                    foundUser.evasion += 0.005*Number(num)
                    
                    foundUser.skill_points -= Number(num)
                
                    let successembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('STAT INVEST')
                    .setDescription(`Your speed has been increased!\nyou now have ${foundUser.evasion*100}% chance of evading an attack`)
                await profileModel.updateOne({userID:authorId},{evasion:foundUser.evasion,skill_points:foundUser.skill_points})
                await interaction.editReply({embeds:[successembed],components:[]})
                
                collector_select.stop()
                collector_btn.stop()
                    
                    
                })
                collector_cancel.on('collect', async j => {
                    j.deferUpdate().catch(() => null)

                    let delembed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('STAT INVEST')
                    .setDescription(`stat investment cancelled!`)
                    
                    await interaction.editReply({embeds:[delembed],components:[]})
                    collector_cancel.stop()
                })
            }
            
        })
       
    })
    

    })