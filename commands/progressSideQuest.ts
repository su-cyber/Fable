import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import { MessageActionRow } from 'discord.js'
import { MessageButton, MessageEmbed } from 'discord.js'
import Inventory from '../models/InventorySchema'
import { solarCorn } from '../src/age/items/solarcornstalks'
import { ArgentenumLeaves } from '../src/age/flora/Sunshade Forest/argentenum_leaves'
import { Radiantura_milk } from '../src/age/items/radiantura_milk'
import { salePoster } from '../src/age/items/salePoster'
import { steamShovel } from '../src/age/items/steamShovel'
import { guildTshirt } from '../src/age/items/guildTshirt'
import { treemickBranch } from '../src/age/items/treemickBranch'
import { PvEDuel } from './fight'


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

                        if(foundUser.side_quest[0] == "KS-TA-SQ1"){
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
    
                                            foundUser.completed_quests.push("KS-TA-SQ1")
                                            foundUser.side_quest.splice(0,1)
                                            await Inventory.updateOne({userID:authorId},userProfile)
                                            await profileModel.updateOne({userID:authorId},{side_quest_phase:"1",completed_quests:foundUser.completed_quests,side_quest:foundUser.side_quest})
                                        }
                                        else{
                                            interaction.reply({content:`You have not gathered the required materials!`,ephemeral:true})
                                        }
                                    }
                                    
                                    else{
                                        interaction.reply({content:`You have not gathered the required materials!`,ephemeral:true})
                                    }
                                })
                               
                                
                            }
                        }
                        else if(foundUser.side_quest[0] == "KS-TA-SQ2"){
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
                                    interaction.reply({content:`you are not in Lager Estate!`,ephemeral:true})
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
                                                .setDescription(`you hand over the stalk to the Crofters, and they give you some to keep.`)
                                                interaction.reply({embeds:[successembed]})
                                                foundObject.quantity-=4
                                                        if(foundObject.quantity===0){
                                                            const index = userProfile.inventory.items.indexOf(foundObject)
                                                            userProfile.inventory.items.splice(index,1)
                                                        }
        
                                                foundUser.completed_quests.push("KS-TA-SQ2")
                                                foundUser.side_quest.splice(0,1)
                                                await Inventory.updateOne({userID:authorId},userProfile)
                                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"1",completed_quests:foundUser.completed_quests,side_quest:foundUser.side_quest})
                                          
                                            }
                                            else{
                                                interaction.reply({content:`you do not have the required number of solarcorn stalks!`,ephemeral:true})
                                            }
                                            
                                        }
                                        else{
                                            interaction.reply({content:`you do not have the Solarcorn stalks!`,ephemeral:true})
                                        }
                                 
                                    })
                                    
                                }
                                else{
                                    interaction.reply({content:`you are not in Castellan Fields!`,ephemeral:true})
                                }
                            }
                        }
                        
                            
                        else if(foundUser.side_quest[0] == "KS-TA-SQ4"){
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
                                                foundUser.completed_quests.push("KS-TA-SQ4")
                                                foundUser.side_quest.splice(0,1)
                                               
                                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"1",completed_quests:foundUser.completed_quests,side_quest:foundUser.side_quest})
                                        
                                        }
                                        else{
                                            interaction.reply({content:`you failed to bring enough proof`,ephemeral:true})
                                        }
                                    }
                                    else{
                                        interaction.reply({content:`you failed to bring any proof`,ephemeral:true})
                                    }
                                    })
                                }
                                else{
                                    interaction.reply({content:`You are not in the guild outpost!`,ephemeral:true})
                                }
                            }
                        }
                        else if(foundUser.side_quest[0] == "KS-TA-SQ5"){
                            if(foundUser.side_quest_phase == "1"){
                                let quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`STOLEN CONSIGNMENTS!`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**press /progresssidequest in lager estate to proceed**`
                                    }
                                ])
                                .setDescription(`The owner of the Terrific Troll Tavern claims that his latest consignment of Backbreaker never reached him, and thus he is losing a lot of business unable to satisfy the Crofters visiting him. The Lager Family refuses to accept any blame so it is up to you to find what is happening to his consignments between the Lager Estate and the Tavern.\n\n**Go to lager estate to proceed**`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"2"})

                            }
                            else if(foundUser.side_quest_phase == "2"){
                                if(foundUser.location == "Lager Estate"){
                                    let quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`STOLEN CONSIGNMENTS!`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**press /progresssidequest in the town centre to proceed**`
                                    }
                                ])
                                .setDescription(` You find out that the Tavern’s consignment of Backbreaker is being stolen by the driver, as he drives off to the Abandoned castle instead of the way of the Tavern.By following the Stagecoach, you see the driver stop by the gate of the Abandoned Castle and use a key to get inside it.\n\n**You must report this back!**`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"3"})
                                }
                                else{
                                    interaction.reply({content:`You are not in the lager estate!`,ephemeral:true})
                                }
                                

                            }
                            else if(foundUser.side_quest_phase == "3"){
                                if(foundUser.location == "Town Centre"){
                                    let quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`STOLEN CONSIGNMENTS!`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**press /progresssidequest in the town centre to proceed**`
                                    }
                                ])
                                .setDescription(`You report your findings to the owner of the Tavern who is shocked by your findings because none of the residents have reported any shady activity associated with the abandoned castle. It was once an outpost for the Empral Brigade during the old war but ever since then, it has been unoccupied. The owner of the Tavern is concerned because this is not enough proof for him to take a fight with the Lager Family, and thus he requests you to assist him further by doubling your pay. He requests you to speak with the Town’s mayor\nWith the Fort’s key in hand, it is now time to make your way to the Abandoned Castle. However, the Mayor warns you beforehand. Whatever you uncover in the castle, it is not something you can handle as you are now. So he requests you to speak with Sebas, who is Mayor’s butler and also the town’s trainer who teaches the fundamentals of Spyr in Aube Town.\n\n**You must speak to sebas**`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"4"})
                                }
                                else{
                                    interaction.reply({content:`You are not in the town centre!`,ephemeral:true})
                                }
                                

                            }
                            else if(foundUser.side_quest_phase == "4"){
                                if(foundUser.location == "Town Centre"){
                                    let quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`STOLEN CONSIGNMENTS!`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Clear the dungeon in the Abandoned Castle and press /progresssidequest in towncentre**`
                                    }
                                ])
                                .setDescription(`Sebas teaches you about investing in your stats and how you can focus your builds to match your style of fighting. He further explains what changes in your body occur when you invest in certain stats. Now you are ready to take on whatever awaits you at the Abandoned Fort.\n\n**Go and investigate the Abandoned Castle**`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"5"})
                                }
                                else{
                                    interaction.reply({content:`You are not in the town centre!`,ephemeral:true})
                                }
                                

                            }
                            else if(foundUser.side_quest_phase == "5"){
                                if(foundUser.location == "Town Centre"){
                                    if(foundUser.completed_dungeons.includes("Abandoned Castle")){
                                        let quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`STOLEN CONSIGNMENTS!`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Quest Completed!`,
                                        value:`**Clear the dungeon in the Abandoned Castle and press /progresssidequest in towncentre**`
                                    }
                                ])
                                .setDescription(`You rid Aube Town of its problems with the Beer Buccaneers as any survivors will run away. The player will then be named “Hero of Aube Town” by the Mayor.\n\n**You earned a new title!**`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                foundUser.completed_quests.push("KS-TA-SQ5")
                                foundUser.side_quest.splice(0,1)
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"1",completed_quests:foundUser.completed_quests,side_quest:foundUser.side_quest})
                     
                                    }
                                    else{
                                        interaction.reply({content:`You have not cleared the dungeon yet!`,ephemeral:true})
                                    }
                                    
                                }
                                else{
                                    interaction.reply({content:`You are not in the town centre!`,ephemeral:true})
                                }
                                

                            }
                        }
                        else if(foundUser.side_quest[0] == "KS-ZS-SQ1"){
                            if(foundUser.side_quest_phase == "1"){
                                let quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`Heirloom Missing`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**press /progresssidequest in Various locations of Zorya to investigate further**`
                                    }
                                ])
                                .setDescription(`you are hired by a wealthy citizen of Zorya to find their missing astrolabe. The astrolabe is a family heirloom that is believed to bring good fortune to its owner. You must search the city and interview locals to find out where the astrolabe may have ended up.\n\n**Talk to the locals around the city to investigate further**`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"2"})

                            }
                            else if(foundUser.side_quest_phase == "2"){
                                let quest_embed
                                if(foundUser.location == "Astro Avenue"){
                                    quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`Heirloom Missing`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**press /progresssidequest in Golden Terminal to investigate further**`
                                    }
                                ])
                                .setDescription(`You ask around various people in Astro Avenue which finally leads you to a certain stranger.\n\n**You:** I am investigating a case of a stolen astrolabe around here,have you seen anyone shady carying one around here?\n\n**Stranger:** I faintly remember someone climbing on top of a shop with an astrolabe in their hands running from someone while I was enjoying the view of the Russet Tower. They went towards the Golden Terminal I believe.`)

                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"3"})
                                }
                                else{
                                    quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`Heirloom Missing`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**press /progresssidequest in Various locations of Zorya to investigate further**`
                                    }
                                ])
                                .setDescription(`You search and interview many in ${foundUser.location} but to your dismay you couldn't obtain any useful information.`)
                                
                                }
                                
                                await interaction.reply({embeds:[quest_embed]})
                                

                            }
                            else if(foundUser.side_quest_phase == "3"){
                                if(foundUser.location == "Golden Terminal"){
                                    let quest_embed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle(`Heirloom Missing`)
                                    .setAuthor({
                                        iconURL:interaction.user.displayAvatarURL(),
                                        name:interaction.user.tag
                                    })
                                    .addFields([
                                        {
                                            name: `Current Objective:`,
                                            value:`**press /progresssidequest in Black Market to chase the thief!**`
                                        }
                                    ])
                                    .setDescription(`You search around the Golden terminal for any shady figures when your gaze locks on to a hooded figure sneaking into the sewers from a back alleywway carrying an astrolabe. You start following the person quitely before they soon disappears into the darkness. You know this path leads to the infamous black market of Zorya which is home to all underhanded dealings.\n\n**Go to the blackmarket on the Thief's Trail**`)
                                
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"4"})
                                }
                                else{
                                    interaction.reply({content:`You are not in the Golden Terminal! visit the Golden Terminal to continue`,ephemeral:true})
                                }
                                

                            }
                            else if(foundUser.side_quest_phase == "4"){
                                if(foundUser.location == "Black Market"){
                                    let quest_embed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle(`Heirloom Missing`)
                                    .setAuthor({
                                        iconURL:interaction.user.displayAvatarURL(),
                                        name:interaction.user.tag
                                    })
                                    .addFields([
                                        {
                                            name: `Current Objective:`,
                                            value:`**press /progresssidequest in Black Market to retrieve the money from the thief!**`
                                        }
                                    ])
                                    .setDescription(`You Reach the Black Market following the trail of the thief and manage to finally catch them talking to a dealer in the black market. It turns out to be a lady who panics seeing your Guild Emblem after you confront her and explains that she isn't the thief but rather someone who bought it from the original thief and is trying to sell it for a profit.\n\n The seller isn't ready to hand over the astrolabe just like that and everyone in the Black Market seems to take her side. You figue that it isn't wise to cause a scene here and Your only choice is to catch the thief and bring back the money the seller originally paid for the Astrolabe if you ever hope to retrieve it.\n\n**You Must search the blackmarket for the original thief who also dwells here**`)
                                
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"5"})
                               
                                }
                                else{
                                    interaction.reply({content:`You are not in the Black Market! visit the Black Market to continue`,ephemeral:true})
                                }
                            }
                            else if(foundUser.side_quest_phase == "5"){
                                if(foundUser.location == "Black Market"){
                                    let dialogue
                                    if(foundUser.guild == "Chimaera"){
                                        dialogue = `**Vash: **“This thief really did give you a run for his money haha! Here, take him, I don’t want to be known for completing such quests anyway. You owe me one now by the way.”`
                                    }
                                    else if(foundUser.guild == "Belenus"){
                                        dialogue = `**Gylbart: **“I apologize for coming in between your endeavors. This person just ran into me and injured themselves. I truly hope they are at least breathing. Please take care of them.”`
                                    }
                                    else if(foundUser.guild == "Tetsuryu"){
                                        dialogue = `**Zavyr: **“It is truly hard to believe that such a weakling like him had you sweating. I think you should reevaluate your place in this business fellow Ranger. Here, take him.”`
                                    }
                                    else if(foundUser.guild == "Fenris"){
                                        dialogue = `**Ayden: **“I saw this man scurrying like a roach so I stepped on him hahaha! Here, take him. Also…do you mind if I take his shoes?”`
                                    }
                                    else if(foundUser.guild == "Gleipnir"){
                                        dialogue = `**Valefor: **“Oi Rival! Long time no see. Did ya see this thief? He basically ran to me and got himself caught! What do you mean, he was yours to catch? Ah…I apologize for butting in. Here, take him!”`
                                    }
                                    else if(foundUser.guild == "Hammerfaust"){
                                        dialogue = `**Ashlei:** *whispers* “Are you seriously struggling with a thug? Just pretend we don’t know each other and take him.”`
                                    }
                                    else if(foundUser.guild == "Eisenherz"){
                                        dialogue = `**Json: **“Oh! Hey there friend! Look at this chump. He just ran into me and the bottle of rare whiskey I just purchased got ruined. Of course I beat him up. Hopefully he is still breathing though. Anyway, I’ll be off. Don’t want the Vice-Master to find out I was drinking again.”`
                                    }
                                    else if(foundUser.guild == "Maledictus"){
                                        dialogue = `**Elbert: **“What did I tell you about being prepared Ranger? I recommend you carry a throwable knife in the future so you can avoid situations like this. Luckily I had them on me so I caught him for you. Here you go.”`
                                    }
                                    else if(foundUser.guild == "Suncrest"){
                                        dialogue = `**Avani: **“I was just here purchasing something when I saw you chase this thief. I hope I didn’t cause you an inconvenience. As Rangers, we need to look out for each other. Here, please take him away.”`
                                    }
                                    else if(foundUser.guild == "Blackfin"){
                                        dialogue = `**Yoel: **“Sorry for barging in your business but I couldn’t stop myself. You are doing good work helping other people. I like it. It is our duty to better the lives of other people, so let us continue doing it. Here, he is yours. I hope we can work together in the future.”`
                                    }

                                    let quest_embed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle(`Heirloom Missing`)
                                    .setAuthor({
                                        iconURL:interaction.user.displayAvatarURL(),
                                        name:interaction.user.tag
                                    })
                                    .addFields([
                                        {
                                            name: `Current Objective:`,
                                            value:`**press /progresssidequest to Interrogate the thief and retrieve the money**`
                                        }
                                    ])
                                    .setDescription(`You try your best to locate the thief before finally managing to find someone who matches the description given to you by the stranger in Astro Avenue and start running towards him who quickly catches on and starts running away swiftly through the nooks and crooks of the market making it very difficult even for an awakened like you to catch up.After running after him for a while you suddenly find a familiar face holding the thief by his neck as he struggles to move,It's your fellow guildmate who joined the guild around the same time as you.\n\n${dialogue}\n\n You retrieve the thief from your guildmate thanking for the help in chasing him.\n\n**Proceed to Interrogate the Thief**`)
                                
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"6"})
                               
                                }
                                else{
                                    interaction.reply({content:`You are not in the Black Market! visit the Black Market to continue`,ephemeral:true})
                                }
                            }
                            else if(foundUser.side_quest_phase == "6"){
                                if(foundUser.location == "Black Market"){
                                    let quest_embed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle(`Heirloom Missing`)
                                    .setAuthor({
                                        iconURL:interaction.user.displayAvatarURL(),
                                        name:interaction.user.tag
                                    })
                                    .addFields([
                                        {
                                            name: `Current Objective:`,
                                            value:`**press /progresssidequest in Astro Avenue to return the astrolabe back to it's owner**`
                                        }
                                    ])
                                    .setDescription(`After receiving aid from your Guildmate, you catch the thief and interrogate him. After going through the experience, the thief is terrified and hands over the money willingly. But you need to tie up the thief and hand them over to the Knights of Zorya. Just then, the lady whom you earlier saw selling the Astrolabe comes and begs you to show mercy to the thief. Apparently the two are siblings, Butch and Cassidy. It is their mode of operation where Butch steals an item, hands it to Cassidy while he gets chased and Cassidy vanishes with the item, acting like its new owner. They have been doing it since they were children, so they can get by. That is the reason that the people of the Black Market support them. After hearing them out, you decide to spare them and head off with the Astrolabe. On your way out, you throw the bag of money you retrieved from Butch. As you leave, Butch and Cassidy bow to you as a sign of thankfulness and tell you that they owe you a favor and that you can cash in anytime you need it.\n\n**You Must Take back the stolen astrolabe to it's original owner**`)
                                
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"7"})
                               
                                }
                                else{
                                    interaction.reply({content:`You are not in the Black Market! visit the Black Market to continue`,ephemeral:true})
                                }
                            }
                            else if(foundUser.side_quest_phase == "7"){
                                if(foundUser.location == "Astro Avenue"){
                                    let quest_embed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle(`Heirloom Missing - COMPLETED`)
                                    .setAuthor({
                                        iconURL:interaction.user.displayAvatarURL(),
                                        name:interaction.user.tag
                                    })
                                    .addFields([
                                        {
                                            name: `Rewards:`,
                                            value:`**some shit**`
                                        }
                                    ])
                                    .setDescription(`You bring back the Astrolabe to the wealthy citizen who hired you to find it. He is ecstatic since you brought it back and pays you well for your troubles. In the moment you think how Butch got lucky in the sense that he got caught by you, who spared him, and how you ended up being owed a favor by the thieving siblings as soon as you held the Astrolabe. Perhaps there is something about them that is just hard to explain.`)
                                
                                await interaction.reply({embeds:[quest_embed]})
                                foundUser.completed_quests.push("KS-ZS-SQ1")
                                foundUser.side_quest.splice(0,1)
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"1",completed_quests:foundUser.completed_quests,side_quest:foundUser.side_quest})
                     
                               
                                }
                                else{
                                    interaction.reply({content:`You are not in the Astro Avenue! visit the Astro Avenue to continue`,ephemeral:true})
                                }
                            }
                        }
                        
                       
                        
                    })
                    class PvEDuel_SQuest extends PvEDuel {
                        player1: any
                        player2: any
                    
                        
                        async onEnd(winner: any, loser: any) {
                            await this.sendInfoMessage(this.attacker.skills,true)
                            const authorID = this.interaction.user.id
                            
                             profileModel.findOne({userID:authorID},async function(err,foundUser) {
                                 
                                 if(err){
                                     console.log(err);
                                     
                                 }
                                 else{
                                    let i
                                     foundUser.encounter = []
                                     foundUser.energy-=1
                                     if(foundUser.status_effects.status.length != 0){
                                        foundUser.status_effects.turns-=1
                                    if(foundUser.status_effects.turns==0){
                                        for(i=0;i<foundUser.status_effects.status.length;i++){
                                            if(foundUser.status_effects.status[i] == "Attack"){
                                                foundUser.attackDamage-=foundUser.status_effects.value[i]
                                            }
                                            else if(foundUser.status_effects.status[i] == "Speed"){
                                                foundUser.speed-=foundUser.status_effects.value[i]
                                            }
                                            else if(foundUser.status_effects.status[i] == "Armour"){
                                                foundUser.armour-=foundUser.status_effects.value[i]
                                            }
                                            else if(foundUser.status_effects.status[i] == "Evasion-percent"){
                                                foundUser.evasion=foundUser.evasion/(1+foundUser.status_effects.value[i])
                                            }
                                            else if(foundUser.status_effects.status[i] == "Evasion"){
                                                foundUser.evasion-=foundUser.status_effects.value[i]
                                            }
                                        }
                                        foundUser.status_effects.status = []
                                        foundUser.status_effects.value = []
                                    }
                                    }
                                     await profileModel.updateOne({userID:authorID},{encounter:foundUser.encounter,energy:foundUser.energy})
                                     if(winner.id == authorID){
                                         await profileModel.updateOne({userID:authorID},{health:winner.health})
                                         if(foundUser.quest_mob == loser.name && foundUser.quest_quantity>0){
                                             foundUser.quest_quantity -=1
                                             
                                             await profileModel.updateOne({userID:authorID},{quest_quantity:foundUser.quest_quantity})
                                         }
                                     }
                                     else{
                                         foundUser.location = "None"
                                         foundUser.dungeon.status = false
                                         foundUser.dungeon.name = ""
                                         foundUser.dungeon.step = 0

                                         
                                         await profileModel.updateOne({userID:authorID},{health:loser.maxHealth,location:foundUser.location,dungeon:foundUser.dungeon,side_quest_phase:foundUser.side_quest_phase-1})
                                     
                                     }
                                     
                                         
                     
                                 }
                             })
                             await loser.onDeath(this.interaction, winner)
                            
                        }
                    
                    }
                }
            }
        })
    })