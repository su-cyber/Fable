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
import { goblinWhistle } from '../src/age/items/goblinWhistle'


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
                                        value:`**Explore the Sunshade Forest to obtain 25 Sunshade Wood**`
                                    }
                                ])
                                .setDescription(`The Solarii farms are suffering from an onslaught of Ravens who are out to destroy their hard-earned harvest. You need to help them build 5 Scarecrows. Each Scarecrow requires 5 wood. Wood can be found by chopping down trees in Sunshade Forest.\n\n use **/progresssidequest** to proceed after you collect the Sunshade Wood`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"2"})

                            }
                            else if(foundUser.side_quest_phase == "2"){
                                Inventory.findOne({userID:authorId},async function(err,userProfile){
                                    const foundObject=userProfile.inventory.items.find(object => object.name.name.toLowerCase() === "sunshade wood")
                                    if(foundObject){
                                        if(foundObject.quantity >=25){
                                            let successembed = new MessageEmbed()
                                            .setColor('GREEN')
                                            .setTitle('WAR WITH RAVENS-Quest Completed!')
                                            .addFields([
                                                {
                                                    name: `Rewards:`,
                                                    value:`**Obtained Radiantura's Milk x 5**`
                                                }
                                            ])
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
                                            const foundmilk = userProfile.inventory.items.find(object => object.name.name.toLowerCase() === "radiantura's milk")
                                            if(foundmilk){
                                                foundmilk.quantity+=5
                                            }
                                            else{
                                                const reward = {
                                                    name:Radiantura_milk,
                                                    quantity:5
                                                }
                                                userProfile.inventory.items.push(reward)
                                            }
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
                                            const foundItem = foundUser.inventory.items.find(item => item.name.name === solarCorn.name)
                                            if (foundItem){
                            
                                                foundItem.quantity+=5
                                            }
                                            else{
                                                const newItem = {
                                                    name:solarCorn,
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
                                if(foundUser.city_town == "Castellan Fields"){
                                    Inventory.findOne({userID:authorId},async function(err,userProfile){
                                        const foundObject=userProfile.inventory.items.find(object => object.name.name.toLowerCase() === "solarcorn stalk")
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
                                                        value:`**Obtained Solarcorn Stalk X 1**\n**You recieved 300🪙**`
                                                    }
                                                ])
                                                .setDescription(`you hand over the stalk to the Crofters, and they give you some to keep.They thank you for your service and give 300🪙 as a token of gratitude.`)
                                                interaction.reply({embeds:[successembed]})
                                                foundObject.quantity-=4
                                                        if(foundObject.quantity===0){
                                                            const index = userProfile.inventory.items.indexOf(foundObject)
                                                            userProfile.inventory.items.splice(index,1)
                                                        }
        
                                                foundUser.completed_quests.push("KS-TA-SQ2")
                                                foundUser.side_quest.splice(0,1)
                                                foundUser.coins+=300
                                                await Inventory.updateOne({userID:authorId},userProfile)
                                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"1",completed_quests:foundUser.completed_quests,side_quest:foundUser.side_quest,coins:foundUser.coins})
                                          
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
                                        value:`**Go to Sunshade Forest to hunt the Treemicks\nexplore the Sunshade Forest to encounter treemicks**`
                                    }
                                ])
                                .setDescription(`The local Solarii are having trouble cutting down Sunshade Trees in Sunshade Forest, due to a wild group of Treemics that have mixed themselves among the leftover tree stumps. Whenever a person traverses near the tree stumps’, the Treemics attack them. Hunt Them down.\n\n**Bring 5 'Treemick's Branch' to Guild Outpost as proof**`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"2"})

                            }
                            else if(foundUser.side_quest_phase == "2"){
                                if(foundUser.location == "Aube Town Guild Outpost"){
                                    Inventory.findOne({userID:authorId},async function(err,userProfile){
                                    const foundObject=userProfile.inventory.items.find(object => object.name.name.toLowerCase() === treemickBranch.name.toLowerCase())
                                    if(foundObject){
                                        if(foundObject.quantity >= 5){
                                            let successembed = new MessageEmbed()
                                                .setColor('RANDOM')
                                                .setTitle(`STUMPED! - Quest Completed`)
                                                .setAuthor({
                                                    iconURL:interaction.user.displayAvatarURL(),
                                                    name:interaction.user.tag
                                                })
                                                .addFields([
                                                    {
                                                        name: `Rewards:`,
                                                        value:`**Obtained Goblin Whistle X 1**`
                                                    }
                                                ])
                                                .setDescription(`You show the Treemick's Branches to the Guild and they confirm the quest completion, You are given a trinket as a reward`)
                                                interaction.reply({embeds:[successembed]})
                                                foundUser.completed_quests.push("KS-TA-SQ4")
                                                foundUser.side_quest.splice(0,1)
                                                const foundwhistle = userProfile.inventory.items.find(object => object.name.name.toLowerCase() === "goblin whistle")
                                            if(foundwhistle){
                                                foundwhistle.quantity+=1
                                            }
                                            else{
                                                const reward = {
                                                    name:goblinWhistle,
                                                    quantity:1
                                                }
                                                userProfile.inventory.items.push(reward)
                                            }
                                            await Inventory.updateOne({userID:authorId},userProfile)
                                               
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
                                if(foundUser.location == "The Terrific Troll Tavern"){
                                    let quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`AUBE TOWN'S HERO`)
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
                                .setDescription(`In the heart of Aube Town lies the Terrific Troll Tavern, its owner burdened with a troubled tale. His latest consignment of the renowned Backbreaker has vanished without a trace, leaving him unable to appease the thirsty Crofters who flock to his establishment. Frustration drips from his words as he lays blame on the esteemed Lager Family, accusing them of withholding the precious deliveries.\n\n But the Lager Family remains steadfast, denying any responsibility for the missing consignments. The feud has brewed a tempest of mistrust between them and the townsfolk, and the burden of unearthing the truth now falls upon you, a determined Ajin.\n\nTonight, the Tavern owner reveals, a fresh consignment from the Lager Family is set to arrive. The stakes are high, and he implores you to unveil the hard evidence he so desperately seeks. Your task is to embark on this treacherous journey, following the trail from the Lager Estate to the Tavern's doorstep. Unraveling the enigma surrounding the missing deliveries is now in your hands.`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"2"})

                                }
                                else{
                                    interaction.reply({content:`You are not at The Terrific Troll Tavern, please visit the tavern to continue`,ephemeral:true})
                                }
                                

                            }
                            else if(foundUser.side_quest_phase == "2"){
                                if(foundUser.location == "The Lager Estate"){
                                    let quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`AUBE TOWN'S HERO`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Press "/progresssidequest" at the Terrific Troll Tavern to continue.**`
                                    }
                                ])
                                .setDescription(`In the dead of night, the eerie shadows of the Lager Estate loom before you. A sense of foreboding taints the air as you witness them loading the new consignments bound for the Terrific Troll Tavern. But something's amiss – there's an unusual air of heightened security, a guardedness that oozes suspicion and caution. Perhaps the feud between the Lager Family and the Tavern's owner seems to have cast a dark cloud over the Estate, amplifying their vigilance.\n\nAs the Backbreaker-laden carriage sets off, you find yourself compelled to follow its path, curiosity and trepidation twisting in your gut. Following the carriage, you venture into the unknown, the night enshrouding you in its chilling embrace. The carriage's destination unravels a shocking twist – the Abandoned Castle, a forsaken relic on the town's fringes. The unsettling sight of the carriage stopping before the Castle sends shivers down your spine.\n\nTwo figures emerge from the carriage – sinister Beer Buccaneers. They wield a key to the Castle's gate, gaining entry to the forsaken fortress. A shroud of uncertainty hangs over this unexpected development, and dread clings to your every step.\n\nA torrent of questions floods your mind. Why would the Lager Family's consignment end up at the Abandoned Castle? The Tavern's owner must be informed, but the truth you bear might ignite a storm of chaos and despair that could consume Aube Town whole.`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"3"})
                                }
                                else{
                                    interaction.reply({content:`You are not in the lager estate!`,ephemeral:true})
                                }
                                

                            }
                            else if(foundUser.side_quest_phase == "3"){
                                if(foundUser.location == "The Terrific Troll Tavern"){
                                    let quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`AUBE TOWN'S HERO`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Press "/progresssidequest" at the Town Centre to continue.**`
                                    }
                                ])
                                .setDescription(`You share the bone-chilling revelation with the Tavern owner, and his shock resonates through the room like a lingering ghost. The residents of Aube Town have yet to report any suspicious activity associated with the forsaken Abandoned Castle. Once an outpost for the Empral Brigade during the Old War, the Castle has remained deserted since, cloaked in a shroud of forgotten history.\n\nThe Tavern owner's concern is palpable—he knows this discovery alone is not enough to confront the mighty Lager Family. The prospect of a confrontation with them sends shivers down his spine, for their laughter would echo like sinister whispers in the night, taunting his accusations.\n\n He implores you to delve deeper into the mysteries of Aube Town, promising to double your pay for your aid. He believes the key to unearthing more evidence lies with the Town's mayor. A request that might unveil truths darker than the abandoned fortress itself.`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"4"})
                                }
                                else{
                                    interaction.reply({content:`You are not at The Terrific Troll Tavern, please visit the tavern to continue`,ephemeral:true})
                                }
                                

                            }
                            else if(foundUser.side_quest_phase == "4"){
                                if(foundUser.location == "Town Centre"){
                                    let quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`AUBE TOWN'S HERO`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Press "/progresssidequest" at the Town Centre to continue.**`
                                    }
                                ])
                                .setDescription(`You relay your startling discoveries to the Mayor, who, to your relief, not only believes you but is also willing to extend his support. Shock and anger flicker across his features as he realizes the brigands have nestled themselves so close to his town, right under his nose. With a solemn determination, he entrusts you with a key to the Abandoned Castle, recognizing your strength as an Ajin—knowledge he gleaned from Mr. Sebas, whose endorsement carries great weight.\n\nHowever, the Mayor doesn't mince words. The secrets you may uncover within the Castle are not to be taken lightly. The lurking dangers lie beyond your current capabilities, and he implores you to seek counsel from Mr. Sebas, a beacon of wisdom and strength, to unlock your potential and grow even more powerful.`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"5"})
                                }
                                else{
                                    interaction.reply({content:`You are not in the town centre!`,ephemeral:true})
                                }
                                

                            }
                            else if(foundUser.side_quest_phase == "5"){
                                if(foundUser.location == "Town Centre"){
                                    let quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`AUBE TOWN'S HERO`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Press "/progresssidequest" at the Abandoned Castle to continue.**`
                                    }
                                ])
                                .setDescription(`Upon entering Mr. Sebas' library, a warm welcome awaits you. The seasoned Ajin notices the change in you, a transformation evident since your last encounter. The spark of progress is unmistakable—you now manifest and wield Spyr on your own, a testament to your growth and potential. Notably, your Keystone Grimoire reveals an increased power level, a sign of your burgeoning strength.\n\nThe surge in power brings forth a remarkable phenomenon—an unlocking of dormant Spyr Cores within your body. As these long-hidden cores awaken, they grant you access to a wellspring of untapped Spyr, empowering you with a reservoir of potential waiting to be unleashed.\n\nWith each rise in your Power Level, the once dormant Spyr Cores transform into sources of energy, allowing you to generate and wield greater quantities of Spyr.\n\n[You have now unlocked the use of the command **/statinvest**. As your Power Level increases, more Spyr Cores in your body unlock that empower you further. For every Power Level you increase, you will unlock 3 Spyr Cores. You can then decide how these newly opened Spyr Cores have made you stronger. Consider them like unlocking Skill Points on level-ups. Whenever you want to invest them, use the command **/statinvest**. Each Spyr Core increases a stat of your choosing by +5.]\n\n- Investing in Vigour makes your melee attacks stronger.\n- Investing in Endurance makes you resist melee attacks better.\n- Investing in Arcana makes your ranged attacks stronger.\n- Investing in Knowledge makes you resist ranged attacks better.\n- Investing in Agility makes you attack ahead of those slower than yourself.\n`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"6"})
                                }
                                else{
                                    interaction.reply({content:`You are not in the town centre!`,ephemeral:true})
                                }
                                

                            }
                            else if(foundUser.side_quest_phase == "6"){
                                if(foundUser.location == "Abandoned Castle"){
                                    let quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`AUBE TOWN'S HERO`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Press "/explore" at the Abandoned Castle to enter the dungeon. Then press /proceeddungeon whenever you wish to move to the next room in the Dungeon.**`
                                    }
                                ])
                                .setDescription(`In the ominous shadow of the Abandoned Castle, you clutch the key in your trembling arms, its weight a grim reminder of the impending challenge. The rusted steel gates loom before you, creaking in the desolate wind, as if whispering foreboding secrets. With every step closer, a sense of unease grips your heart, for you know that crossing this threshold will lead you into the heart of darkness. With a deep breath, you ready yourself for the challenges that await beyond those decrepit gates.\n\n: You are about to enter your first “Dungeon”. Dungeons in Fable are different and more difficult than any other form of challenge. They throw you into a lair which you cannot return from. There are tougher battles and they occur more often. There are traps, but also rewarding items to find in Dungeons. There are two types of Dungeons in Fable. Pygmy Dungeons and Colossal Dungeons. When you’re in a Dungeon, your only choice is to “proceed” further into the rooms of a dungeon. It is impossible to determine the length nor predict every room of a Dungeon. They’re completely random for every person who attempts them. Sometimes, you may find certain rooms in Dungeons that will heal you, but other than those, you better come stocked up on items when you enter them. Once you go in, you’re only coming out the other end…or if you lose. Are you ready?`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                }
                                else{
                                    interaction.reply({content:`You are not in the Abandoned Castle!`,ephemeral:true})
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
                        else{
                            interaction.reply({content:`You do not have any SideQuest right now`,ephemeral:true})
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