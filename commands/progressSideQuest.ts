import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import { arachnidVenom } from '../src/age/items'
import { ghoulSkull } from '../src/age/items'
import { Sword } from '../src/age/weapons/sword'
import { steelArmour } from '../src/age/armour/steel_armour'
import { healthPotion } from '../src/age/potions/healthPotion'
import { DiscordAPIError, MessageActionRow, MessageSelectMenu, SelectMenuInteraction } from 'discord.js'
import { Collector, MessageButton, MessageEmbed } from 'discord.js'
import { BeerBuccsDuo } from '../src/age/monsters/none/BeerBuccsDuo'
import { MessageAttachment } from 'discord.js'
import Inventory from '../models/InventorySchema'
import { solarCorn } from '../src/age/items/solarcornstalks'
import { ArgentenumLeaves } from '../src/age/flora/Castellan Fields/argentenum_leaves'
import { Radiantura_milk } from '../src/age/items/radiantura_milk'
import { salePoster } from '../src/age/items/salePoster'
import { steamShovel } from '../src/age/items/steamShovel'
import { guildTshirt } from '../src/age/items/guildTshirt'
import { treemickBranch } from '../src/age/items/treemickBranch'


export default new MyCommandSlashBuilder({ name: 'progresssidequest', description: 'progress your side quest' }).setDo(
    async (bot, interaction) => {
        
        
        const authorId = interaction.user.id;
        const guildID = interaction.guildId;

        profileModel.exists({userID: authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){

                    profileModel.findOne({userID:authorId}, async function(err,foundUser) {

                        if(foundUser.side_quest[0] == "KS-TA-Q1"){
                            if(foundUser.side_quest_phase == "1"){
                                let quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('WAR WITH RAVENS')
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Explore the Castellan Fields to obtain 25 Sunshade Woods**`
                                    }
                                ])
                                .setDescription(`The Solarii farms are suffering from an onslaught of Ravens who are out to destroy their hard-earned harvest. You need to help them build 5 Scarecrows. Each Scarecrow requires 5 wood. Wood can be found by chopping down trees in Castellan Fields.\n\n use **/progresssidequest** to proceed after you collect the Sunshade Wood`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"2"})

                            }
                            else if(foundUser.side_quest_phase == "2"){
                                Inventory.findOne({userID:authorId},async function(err,userProfile){
                                    const foundObject=userProfile.inventory.items.find(object => object.name.toLowerCase() === "sunshade wood")
                                    if(foundObject){
                                        if(foundObject.quantity >=25){
                                            let successembed = new MessageEmbed()
                                            .setColor('GREEN')
                                            .setTitle('WAR WITH RAVENS-Quest Completed!')
                                            .setAuthor({
                                                iconURL:interaction.user.displayAvatarURL(),
                                                name:interaction.user.tag
                                            })
                                            .setDescription(`You have successfully gathered the materials for making the scarecrows!\n you gave the sunshade wood to the farmers`)
    
                                            interaction.reply({embeds:[successembed]})
                                            foundObject.quantity-=25
                                                    if(foundObject.quantity===0){
                                                        const index = userProfile.inventory.items.indexOf(foundObject)
                                                        userProfile.inventory.items.splice(index,1)
                                                    }
    
                                            foundUser.completed_quests.push("KS-TA-Q1")
                                            foundUser.side_quest.splice(0,1)
                                            await Inventory.updateOne({userID:authorId},userProfile)
                                            await profileModel.updateOne({userID:authorId},{side_quest_phase:"1",completed_quests:foundUser.completed_quests,side_quest:foundUser.side_quest})
                                        }
                                        else{
                                            interaction.reply(`You have not gathered the required materials!`)
                                        }
                                    }
                                    
                                    else{
                                        interaction.reply(`You have not gathered the required materials!`)
                                    }
                                })
                               
                                
                            }
                        }
                        else if(foundUser.side_quest[0] == "KS-TA-Q2"){
                            if(foundUser.side_quest_phase == "1"){
                                let quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('FEED THE RADIANTURA')
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Go to Lager Estate to get Solar Corn stalks\npress /progresssidequest in Lager Estate**`
                                    }
                                ])
                                .setDescription(`The Radiantura in Castellan Fields need to be fed with the Stalks of Solarcorn. However the Crofters have run out. Visit the Lager Estate where you can find the Solarcorn Stalks and bring them back to feed the Radiantura`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"2"})

                            }
                            else if(foundUser.side_quest_phase == "2"){
                                if(foundUser.location == "The Lager Estate"){
                                    let quest_embed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle('FEED THE RADIANTURA')
                                    .setAuthor({
                                        iconURL:interaction.user.displayAvatarURL(),
                                        name:interaction.user.tag
                                    })
                                    .addFields([
                                        {
                                            name: `Current Objective:`,
                                            value:`**Take the Solarcorn stalks back to Castellan Fields\npress /progresssidequest in Castellan Fields**`
                                        }
                                    ])
                                    .setDescription(` you are given a few stalks of Solarcorn by the incharge of Quality at Lager Estate\n\n**Obtained Solarcorn Stalk X 5**`)
                                
                                    inventory.findOne({userID:interaction.user.id},async function(err,foundUser){
                                        if(err){
                                            console.log(err);
                                            
                                        }
                                        else{
                                            const foundItem = foundUser.inventory.items.find(item => item.name === solarCorn.name)
                                            if (foundItem){
                            
                                                foundItem.quantity+=5
                                            }
                                            else{
                                                const newItem = {
                                                    name:solarCorn.name,
                                                    description:solarCorn.description,
                                                    quantity:Number(5)
                                                }
                                                foundUser.inventory.items.push(newItem)
                                            }
                                            await inventory.updateOne({userID:authorId},foundUser)
                                        }
                                        
                                    })
                                    await interaction.reply({embeds:[quest_embed]})
                                    await profileModel.updateOne({userID:authorId},{side_quest_phase:"3"})
    
                                }
                                else{
                                    interaction.reply(`you are not in Lager Estate!`)
                                }
             
                            }
                            else if(foundUser.side_quest_phase == "3"){
                                if(foundUser.location == "Castellan Fields"){
                                    Inventory.findOne({userID:authorId},async function(err,userProfile){
                                        const foundObject=userProfile.inventory.items.find(object => object.name.toLowerCase() === "solarcorn stalk")
                                        if(foundObject){
                                            if(foundObject.quantity>=5){
                                                let successembed = new MessageEmbed()
                                                .setColor('RANDOM')
                                                .setTitle('FEED THE RADIANTURA - Quest Completed')
                                                .setAuthor({
                                                    iconURL:interaction.user.displayAvatarURL(),
                                                    name:interaction.user.tag
                                                })
                                                .addFields([
                                                    {
                                                        name: `Rewards:`,
                                                        value:`**Obtained Solarcorn Stalk X 1**`
                                                    }
                                                ])
                                                .setDescription(`you hand over the stalk to the Crofters, and they give you some to keep. This reward will be relevant later when you leave Aube Town`)
                                                interaction.reply({embeds:[successembed]})
                                                foundObject.quantity-=4
                                                        if(foundObject.quantity===0){
                                                            const index = userProfile.inventory.items.indexOf(foundObject)
                                                            userProfile.inventory.items.splice(index,1)
                                                        }
        
                                                foundUser.completed_quests.push("KS-TA-Q2")
                                                foundUser.side_quest.splice(0,1)
                                                await Inventory.updateOne({userID:authorId},userProfile)
                                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"1",completed_quests:foundUser.completed_quests,side_quest:foundUser.side_quest})
                                          
                                            }
                                            else{
                                                interaction.reply(`you do not have the required number of solarcorn stalks!`)
                                            }
                                            
                                        }
                                        else{
                                            interaction.reply(`you do not have the Solarcorn stalks!`)
                                        }
                                 
                                    })
                                    
                                }
                                else{
                                    interaction.reply(`you are not in Castellan Fields!`)
                                }
                            }
                        }
                        else if(foundUser.side_quest[0] == "KS-TA-Q4"){
                            if(foundUser.side_quest_phase == "1"){
                                let quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`THE CROFTER'S MARKET`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Go to Crofter's Market to get the ingredients\npress /progresssidequest in crofter's market**`
                                    }
                                ])
                                .setDescription(`The player is asked by a travelling merchant to help get some ingredients. The player must gather ingredients like Radiantura’s Milk, Argentum Leaf, Sale Poster, Steam Shovel, & I Love Guild t-shirts\n\n**You have recieved 1500🪙 from the merchant**`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"2",coins:foundUser.coins+1500})

                            }
                            else if(foundUser.side_quest_phase == "2"){
                                if(foundUser.location == "Crofter's Market"){
                                    let quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`Argentum Arboretum`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .setDescription(`Shopkeeper:what do you need young fella?\nYou:I need 5 bottles of Radiantura’s Milk and 5 bunch of Argentenum Leaves\nShopkeeper:That'll be 1000🪙`)

                                let btnraw= new MessageActionRow().addComponents([
                                    new MessageButton().setCustomId("negotiate").setStyle("PRIMARY").setLabel("Negotiate"),
                        
                                ])
                                interaction.reply({embeds:[quest_embed],components:[btnraw]})
                                let filter = i => i.user.id === authorId
                                let collector = await interaction.channel.createMessageComponentCollector({filter: filter})

                                collector.on('collect',async (btn) => {
                                    if(btn.isButton()){
                                        if(btn.customId === "negotiate"){
                                            await btn.deferUpdate().catch(e => {})
                                            const cost =  Math.floor(Math.random() * (900 - 650 + 1)) + 650
                                            let buyEmbed =  new MessageEmbed()
                                            .setColor('RANDOM')
                                            .setTitle('Argentum Arboretum')
                                            .addFields([
                                                {
                                                    name: `Current Objective:`,
                                                    value:`**press /progresssidequest in crofter's market again to go to the next shop**`
                                                }
                                            ])
                                            .setDescription(`Shopkeeper:Fine! ${cost}🪙 is my last price.\nYou:Alright,pack them up.\n\n**You obtained Radiantura’s Milk X 5**\n**You obtained Argentenum Leaves X 5**`)
                                            if(foundUser.coins>=cost){
                                                interaction.editReply({embeds: [buyEmbed],components:[]})

                                                inventory.findOne({userID:interaction.user.id},async function(err,foundUser){
                                                    if(err){
                                                        console.log(err);
                                                        
                                                    }
                                                    else{
                                                        const foundItem = foundUser.inventory.items.find(item => item.name === ArgentenumLeaves.create().name)
                                                        if (foundItem){
                                        
                                                            foundItem.quantity+=5
                                                        }
                                                        else{
                                                            const newItem = {
                                                                name:ArgentenumLeaves.create().name,
                                                                description:ArgentenumLeaves.create().description,
                                                                quantity:Number(5)
                                                            }
                                                            foundUser.inventory.items.push(newItem)
                                                        }
                                                        const foundItem2 = foundUser.inventory.items.find(item => item.name === Radiantura_milk.name)
                                                        if (foundItem2){
                                        
                                                            foundItem2.quantity+=5
                                                        }
                                                        else{
                                                            const newItem2 = {
                                                                name:Radiantura_milk.name,
                                                                description:Radiantura_milk.description,
                                                                quantity:Number(5)
                                                            }
                                                            foundUser.inventory.items.push(newItem2)
                                                        }
                                                        await inventory.updateOne({userID:authorId},foundUser)
                                                    }
                                                    
                                                })
                                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"3",coins:foundUser.coins-cost})
                                                
                                                
                                            }
                                            else{
                                                interaction.editReply(`you dont even have ${cost}🪙 which was the last negotiated price!`)
                                            }
                                            
                                        }
                                    }
                                    collector.stop()
                                })


                                }
                                else{
                                    interaction.reply(`you are not in Crofter's Market`)
                                }
                            }
                            else if(foundUser.side_quest_phase == "3"){
                                if(foundUser.location == "Crofter's Market"){
                                    let quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`Artright’s Wares`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .setDescription(`Shopkeeper:Hello! what can i get you?\nYou:I need a Sale Poster, a Steam Shovel and a Guild T-Shirt\nShopkeeper:That'll be 500🪙 sir`)

                                let btnraw= new MessageActionRow().addComponents([
                                    new MessageButton().setCustomId("negotiate").setStyle("PRIMARY").setLabel("Negotiate"),
                        
                                ])
                                interaction.reply({embeds:[quest_embed],components:[btnraw]})
                                let filter = i => i.user.id === authorId
                                let collector = await interaction.channel.createMessageComponentCollector({filter: filter})

                                collector.on('collect',async (btn) => {
                                    if(btn.isButton()){
                                        if(btn.customId === "negotiate"){
                                            await btn.deferUpdate().catch(e => {})
                                            const cost =  Math.floor(Math.random() * (450 - 100 + 1)) + 100
                                            let buyEmbed =  new MessageEmbed()
                                            .setColor('RANDOM')
                                            .setTitle('Artright’s Wares')
                                            .addFields([
                                                {
                                                    name: `Current Objective:`,
                                                    value:`**press /progresssidequest in Town Centre to give the ingredients to the merchant**`
                                                }
                                            ])
                                            .setDescription(`Shopkeeper:You have a knack for negotiation huh? ${cost}🪙 is my final price.\nYou:Alright,pack them up.\n\n**You obtained Sale Poster X 1**\n**You obtained Steam Shovel X 1**\n**You obtained Guild Tshirt X 1**`)
                                            if(foundUser.coins>=cost){
                                                interaction.editReply({embeds: [buyEmbed],components:[]})

                                                inventory.findOne({userID:interaction.user.id},async function(err,foundUser){
                                                    if(err){
                                                        console.log(err);
                                                        
                                                    }
                                                    else{
                                                        const foundItem = foundUser.inventory.items.find(item => item.name === salePoster.name)
                                                        if (foundItem){
                                        
                                                            foundItem.quantity+=1
                                                        }
                                                        else{
                                                            const newItem = {
                                                                name:salePoster.name,
                                                                description:salePoster.description,
                                                                quantity:Number(1)
                                                            }
                                                            foundUser.inventory.items.push(newItem)
                                                        }
                                                        const foundItem2 = foundUser.inventory.items.find(item => item.name === steamShovel.name)
                                                        if (foundItem2){
                                        
                                                            foundItem2.quantity+=1
                                                        }
                                                        else{
                                                            const newItem2 = {
                                                                name:steamShovel.name,
                                                                description:steamShovel.description,
                                                                quantity:Number(1)
                                                            }
                                                            foundUser.inventory.items.push(newItem2)
                                                        }
                                                        const foundItem3 = foundUser.inventory.items.find(item => item.name === guildTshirt.name)
                                                        if (foundItem3){
                                        
                                                            foundItem3.quantity+=1
                                                        }
                                                        else{
                                                            const newItem3 = {
                                                                name:guildTshirt.name,
                                                                description:guildTshirt.description,
                                                                quantity:Number(1)
                                                            }
                                                            foundUser.inventory.items.push(newItem3)
                                                        }
                                                        await inventory.updateOne({userID:authorId},foundUser)
                                                    }
                                                    
                                                })
                                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"4",coins:foundUser.coins-cost})
                                                
                                                
                                            }
                                            else{
                                                interaction.editReply(`you dont even have ${cost}🪙 which was the last negotiated price!`)
                                            }
                                            
                                        }
                                    }

                                    collector.stop()
                                })


                                }
                                else{
                                    interaction.reply(`you are not in Crofter's Market`)
                                }
                            }
                            else if(foundUser.side_quest_phase == "4"){
                                if(foundUser.location == "Town Centre"){
                                    Inventory.findOne({userID:authorId},async function(err,userProfile){
                                        const foundposter=userProfile.inventory.items.find(object => object.name.toLowerCase() === "sale poster")
                                        const foundshovel=userProfile.inventory.items.find(object => object.name.toLowerCase() === "steam shovel")
                                        const foundtshirt=userProfile.inventory.items.find(object => object.name.toLowerCase() === "guild tshirt")
                                        const foundmilk=userProfile.inventory.items.find(object => object.name.toLowerCase() === "radiantura's milk")
                                        const foundleaves=userProfile.inventory.items.find(object => object.name.toLowerCase() === "argentenum leaves")
                                        
                                        
                                        
                                        const check = []
                                        if(foundposter){
                                            check.push(1)
                                        }
                                        else{
                                            
                                        }
                                        if(foundshovel){
                                            check.push(1)
                                        }
                                        else{
                                            
                                        }
                                        if(foundtshirt){
                                            check.push(1)
                                        }
                                        else{
                                            
                                        }
                                        if(foundmilk){
                                            if(foundmilk.quantity>=5){
                                                check.push(1)
                                            }
                                            
                                        }
                                        else{
                                            
                                        }
                                        if(foundleaves){
                                            if(foundleaves.quantity>=5){
                                                check.push(1)
                                            }
                                        }
                                        else{
                                            
                                        }
                                        if(check.length == 5){
                                            let successembed = new MessageEmbed()
                                                .setColor('RANDOM')
                                                .setTitle(`CROFTER'S MARKET - Quest Completed`)
                                                .setAuthor({
                                                    iconURL:interaction.user.displayAvatarURL(),
                                                    name:interaction.user.tag
                                                })
                                                
                                                .setDescription(`you hand over the ingredients to the merchant`)
                                                interaction.reply({embeds:[successembed]})
                                                foundmilk.quantity-=5
                                                        if(foundmilk.quantity===0){
                                                            const index = userProfile.inventory.items.indexOf(foundmilk)
                                                            userProfile.inventory.items.splice(index,1)
                                                        }
                                                        foundleaves.quantity-=5
                                                        if(foundleaves.quantity===0){
                                                            const index = userProfile.inventory.items.indexOf(foundleaves)
                                                            userProfile.inventory.items.splice(index,1)
                                                        }
                                                        foundshovel.quantity-=1
                                                        if(foundshovel.quantity===0){
                                                            const index = userProfile.inventory.items.indexOf(foundshovel)
                                                            userProfile.inventory.items.splice(index,1)
                                                        }
                                                        foundposter.quantity-=1
                                                        if(foundposter.quantity===0){
                                                            const index = userProfile.inventory.items.indexOf(foundposter)
                                                            userProfile.inventory.items.splice(index,1)
                                                        }
                                                        foundtshirt.quantity-=1
                                                        if(foundtshirt.quantity===0){
                                                            const index = userProfile.inventory.items.indexOf(foundtshirt)
                                                            userProfile.inventory.items.splice(index,1)
                                                        }
        
                                                foundUser.completed_quests.push("KS-TA-Q4")
                                                foundUser.side_quest.splice(0,1)
                                                await Inventory.updateOne({userID:authorId},userProfile)
                                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"1",completed_quests:foundUser.completed_quests,side_quest:foundUser.side_quest})
                                        }
                                        else{
                                            interaction.reply(`You do not have the required ingredients`)
                                        }
                                    })

                                }
                                else{
                                    interaction.reply(`you are not in Town Centre!`)
                                }
                            }
                        }
                        else if(foundUser.side_quest[0] == "KS-TA-Q5"){
                            if(foundUser.side_quest_phase == "1"){
                                let quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`STUMPED!`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Go to Castellan Fields to hunt the Treemicks\nexplore the castellan fields to encounter treemicks**`
                                    }
                                ])
                                .setDescription(`The local Solarii are having trouble cutting down Sunshade Trees in Castellan Fields, due to a wild group of Treemics that have mixed themselves among the leftover tree stumps. Whenever a person traverses near the tree stumps’, the Treemics attack them. Hunt Them down.\n\n**Bring 5 'Treemick's Branch' to Guild Outpost as proof**`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"2"})

                            }
                            else if(foundUser.side_quest_phase == "2"){
                                if(foundUser.location == "Aube Town Guild Outpost"){
                                    Inventory.findOne({userID:authorId},async function(err,userProfile){
                                    const foundObject=userProfile.inventory.items.find(object => object.name.toLowerCase() === treemickBranch.name.toLowerCase())
                                    if(foundObject){
                                        if(foundObject.quantity >= 5){
                                            let successembed = new MessageEmbed()
                                                .setColor('RANDOM')
                                                .setTitle(`STUMPED! - Quest Completed`)
                                                .setAuthor({
                                                    iconURL:interaction.user.displayAvatarURL(),
                                                    name:interaction.user.tag
                                                })
                                                
                                                .setDescription(`you show the Treemick's Branches to the Guild and they confirm the quest completion`)
                                                interaction.reply({embeds:[successembed]})
                                                foundUser.completed_quests.push("KS-TA-Q5")
                                                foundUser.side_quest.splice(0,1)
                                               
                                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"1",completed_quests:foundUser.completed_quests,side_quest:foundUser.side_quest})
                                        
                                        }
                                        else{
                                            interaction.reply(`you failed to bring enough proof`)
                                        }
                                    }
                                    else{
                                        interaction.reply(`you failed to bring any proof`)
                                    }
                                    })
                                }
                                else{
                                    interaction.reply(`You are not in the guild outpost!`)
                                }
                            }
                        }
                        
                    })
                }
            }
        })
    })