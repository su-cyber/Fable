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
import { TextChannel } from 'discord.js'
import { MessageAttachment } from 'discord.js'
import { WindblownFeather } from '../src/age/flora/The Badlands/windblown_feather'


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
                                                    value:`**Obtained Radiantura's Milk x 5\nYou recieved 10 Merit**`
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
                                            await profileModel.updateOne({userID:authorId},{side_quest_phase:"1",completed_quests:foundUser.completed_quests,side_quest:foundUser.side_quest,merit:foundUser.merit+10})
                                            let fableLog = new MessageEmbed()
                                                .setColor('RANDOM')
                                                .setTitle('FABLE LOG')
                                                .setDescription(`${interaction.user.username} has Completed the Side Quest **"War with Ravens"** and recieved **Radiantura's Milk x 5**!`)
                                                await (interaction.client.channels.cache.get(`1141991984526012466`) as TextChannel).send({embeds:[fableLog]})
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
                                                        value:`**Obtained Solarcorn Stalk X 1**\n**You recieved 300🪙**\n**You recieve 10 Merit**`
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
                                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"1",completed_quests:foundUser.completed_quests,side_quest:foundUser.side_quest,coins:foundUser.coins,merit:foundUser.merit+10})
                                                let fableLog = new MessageEmbed()
                                                .setColor('RANDOM')
                                                .setTitle('FABLE LOG')
                                                .setDescription(`${interaction.user.username} has Completed the Side Quest **"Feed the Radiantura"** and recieved **300🪙**!`)
                                                await (interaction.client.channels.cache.get(`1141991984526012466`) as TextChannel).send({embeds:[fableLog]})
                                          
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
                                        value:`**Go to Castellan Fields to hunt the Treemicks\nexplore the Castellan Fields to encounter treemicks**`
                                    }
                                ])
                                .setDescription(`The local Solarii are having trouble cutting down Sunshade Trees in Castellan Fields, due to a wild group of Treemics that have mixed themselves among the leftover tree stumps. Whenever a person traverses near the tree stumps’, the Treemics attack them. Hunt Them down.\n\n**Bring 5 'Treemick's Branch' to Guild Outpost as proof**`)
                            
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
                                                        value:`**Obtained Goblin Whistle X 1\nYou recieved 10 Merit**`
                                                    }
                                                ])
                                                .setDescription(`You show the Treemick's Branches to the Guild Outpost and they confirm the quest completion, You are given a trinket as a reward`)
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
                                               
                                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"1",completed_quests:foundUser.completed_quests,side_quest:foundUser.side_quest,merit:foundUser.merit+10})
                                                let fableLog = new MessageEmbed()
                                                .setColor('RANDOM')
                                                .setTitle('FABLE LOG')
                                                .setDescription(`${interaction.user.username} has Completed the Side Quest **"Stumped!"** and recieved **Goblin Whistle**!`)
                                                await (interaction.client.channels.cache.get(`1141991984526012466`) as TextChannel).send({embeds:[fableLog]})
                                        
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
                                    interaction.reply({content:`As you return to the Guild Outpost after helping everyone in Aube Town, the atmosphere is subdued with most Challengers gone. Andan shares a poignant tale of his reckless, brave father who faced danger fearlessly but tragically lost his life. He sees that same spark of bravery in you. Andan presents a grey box containing his father's prized weapons, allowing you to choose one before embarking on the final Quest.\n**(Press /progresssidequest in Terrific Troll Tavern to continue)**`,ephemeral:true})
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
                                    interaction.reply({content:`The owner of the Terrific Troll Tavern claims that his latest consignment of Backbreaker never reached him, and thus he is losing a lot of business unable to satisfy the Crofters visiting him. The Lager Family refuses to accept any blame so it is up to you to find what is happening to his consignments between the Lager Estate and the Tavern.\n**(Press "/progresssidequest" at the Lager Estate to continue.)**`,ephemeral:true})
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
                                    interaction.reply({content:`Under the cover of darkness, you observe the Lager Estate loading new consignments for the Terrific Troll Tavern. Heightened security and caution hint at the feud between the Lager Family and the Tavern's owner. Following the carriage discreetly, you stumble upon a shocking twist—the consignment is delivered to the Abandoned Castle. Sinister Beer Buccaneers enter the forsaken fortress, leaving you with an enigmatic puzzle to unravel.\n**(Press "/progresssidequest" at the Terrific Troll Tavern to continue.)**`,ephemeral:true})
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
                                    },
                                    {
                                        name: `Rewards`,
                                        value:`**Recieved Key to Abandoned Castle x1\nYou recieved 15 Merit**`
                                      
                                    }
                                ])
                                .setDescription(`You relay your startling discoveries to the Mayor, who, to your relief, not only believes you but is also willing to extend his support. Shock and anger flicker across his features as he realizes the brigands have nestled themselves so close to his town, right under his nose. With a solemn determination, he entrusts you with a key to the Abandoned Castle, recognizing your strength as an Ajin—knowledge he gleaned from Mr. Sebas, whose endorsement carries great weight.\n\nHowever, the Mayor doesn't mince words. The secrets you may uncover within the Castle are not to be taken lightly. The lurking dangers lie beyond your current capabilities, and he implores you to seek counsel from Mr. Sebas, a beacon of wisdom and strength, to unlock your potential and grow even more powerful.`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"5"})
                                }
                                else{
                                    interaction.reply({content:`You reveal the shocking findings to the Tavern owner, who is astonished as the residents haven't reported any suspicious activity at the abandoned castle. To confront the Lager Family, he requests your further assistance and offers to double your pay. He asks you to speak with the Town's mayor to uncover more evidence, delving into the mysteries of Aube Town.\n**(Press /progresssidequest in Town Centre to continue)**`,ephemeral:true})
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
                                    interaction.reply({content:`After informing the Mayor of the brigands' presence at the Abandoned Castle, he expresses shock and frustration for being unaware of their proximity. He trusts you, an Ajin, and provides you with the key to the Castle. However, he warns you of the dangers lurking within and advises seeking guidance from Mr. Sebas to become stronger before facing the mysteries within. With the Mayor's trust and guidance, you embark on a transformative journey to uncover the Castle's secrets and unlock your true potential as an Ajin. The stage is set for an epic adventure in the city of Aube, where shadows of ancient history converge with your own quest for strength and resilience.\n**(Press /progresssidequest in Town Centre to continue)**`,ephemeral:true})
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
                                    interaction.reply({content:`Visiting Mr. Sebas in his library, you are warmly received. He astutely observes a significant change in you since your last encounter—an evident manifestation and control over Spyr on your own. Your Keystone Grimoire's increased power level signifies your growth, unlocking dormant Spyr Cores within your body. With each core awakened, you gain the ability to generate and wield more Spyr, fueling your excitement and potential.\n**(Press /progresssidequest in Abandoned Castle to continue)**`,ephemeral:true})
                                }
                                

                            }
                        }
                        else if(foundUser.side_quest[0] == "KS-TA-SQ6"){
                            if(foundUser.side_quest_phase == "1"){
                                if(foundUser.location == "Aube Town Guild Outpost"){
                                    let quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`AUBE TOWN'S WATER CRISIS`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**press /progresssidequest in Badlands to proceed**`
                                    }
                                ])
                                .setDescription(`The Mayor of Aube Town is concerned due to the sudden shortened supply of fresh water coming to their town. It is a real problem for a Town that depends heavily on its produce. He insists that the problem lies with the Aqueduct coming in from Spezia Cliffs through the Badlands. The Badlands are an extremely treacherous and scorching landscape. It is the only way of traveling to the Mirazh Empire on land from Solarstrio, yet it is completely isolated. Sure, some merchants who have lost their minds may venture forth, and some Ajin who wish to explore it. But the general agreement between the Solarii is that it is an unstable environment.\n\nLuckily, the Aqueduct is at the edge of the Badlands, so investigating it will not be as rough. However, anyone venturing into the Badlands is told to be vary of the Spyriths that call it home, and especially the “Silthunters' that dwell there. They are dangerous hunters who rule the Badlands and all of its treasures. Aube Town shares their supply of fresh water with the Silthunters in exchange for peace. Your objective is to investigate the Aqueduct in the Badlands.`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"2"})

                                }
                                else{
                                    interaction.reply({content:`You must be at the Guild Outpost to be briefed about the Quest.\n**(Press /progresssidequest in Aube Town Guild Outpost to continue)**`,ephemeral:true})
                                }
                                

                            }
                            else if(foundUser.side_quest_phase == "2"){
                                if(foundUser.location == "The Badlands"){
                                    const attachment = new MessageAttachment('assets/AubeTown/SQ61.jpg')
                                    let quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`AUBE TOWN'S WATER CRISIS`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**press /progresssidequest in Town Centre to proceed**`
                                    }
                                ])
                                .setImage('attachment://SQ61.jpg')
                                .setDescription(`Even though you were only at the edge of the Badlands, the heat you felt was quite intense. But, after a little exploration, you were able to locate the Aqueduct hidden among a small group of trees, carrying fresh water from the Spezia Cliffs. As you closely inspected it, you noticed that one of its legs had been chipped away heavily, making the flow of water unstable enough that it burst out from a place. This had caused plantations to grow on and around the Aqueduct which you normally would not see in the Badlands. It was somewhat of an Oasis now. Surely this was the cause of Aube’s short supply of fresh water. Upon further investigation, you saw that the other legs of the Aqueduct were far from being chipped. This meant that the Aqueduct had been damaged by a third party. It could have been a Spyrith…or someone else.\n\nYou decide to bring this information to the Mayor.`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"3"})

                                }
                                else{
                                    interaction.reply({content:`**(Press /progresssidequest in The Badlands to continue)**`,ephemeral:true})
                                }
                                

                            }
                            else if(foundUser.side_quest_phase == "3"){
                                if(foundUser.location == "Town Centre"){
                                    let quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`AUBE TOWN'S WATER CRISIS`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Press "/progresssidequest" at the Castle Luminar to continue.**`
                                    }
                                ])
                                .setDescription(`You meet up with the Mayor and explain to him about your findings on the Aqueduct. He is at first, extremely delighted to meet you, and at ease since their Hero had come to their aid yet again. After hearing your findings, the Mayor cannot help but show his nervousness regarding the situation.\n\n“It must be the Silthunters. If the Aqueduct had broken and they hadn’t known of it, they would have already sent a Zephyrite my way asking about it.” The Mayor said.\n\nYou concluded that it was indeed the Silthunters who had sabotaged the Aqueduct. Although their motive was unclear, the Mayor theorized they may have been paid by the Sultan of the Mirazh Empire. It may be his way of showing his discontent with King Helios and our disputes over trade routes with their empire.\n\nHe requests you to deliver a letter from him to the Earl of Zorya. The Mayor believes something sinister is at play, and Earl Auriga must know of these developments at the earliest. He cannot send Sebas, as he may require his aid to investigate the issue further.\n\n**Received Letter for Earl Auriga x1**`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"4"})

                                }
                                else{
                                    interaction.reply({content:`**(Press /progresssidequest in Town Centre to continue)**`,ephemeral:true})
                                }
                                

                            }
                            else if(foundUser.side_quest_phase == "4"){
                                if(foundUser.location == "Castle Luminar"){
                                    const attachment = new MessageAttachment('assets/AubeTown/SQ62.jpg')
                                    let quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`AUBE TOWN'S WATER CRISIS`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Press "/progresssidequest" at the Castle Luminar to continue.**`
                                    }
                                ])
                                .setImage('attachment://SQ62.jpg')
                                .setDescription(`As you reach towards Castle Luminar - the primary residence of Earl Auriga, you walk over an inclined stone bridge whose columns emerge from within the Dragon Pit Basin below. On your way to Earl Auriga’s Court, you come across many Solarii and tourists. Most of them had come to see the infamous “Moving Dragon Carcass”. You assumed that the rumor may have caused a lot of trouble for the Earl.\n\nBefore you knew it, you reached the main gates of the Castle. They were massive, and the fact that Castle Luminar was built upon a small hill, only accessible by the stone bridge or flight, it felt impregnable.\n\nYou were stopped at the gates, frisked, and verified of your belongings and credentials, then let go deeper into Castle Luminar. Somehow, your weapons were not taken, which came as quite a shock to you. The Castle’s interior consisted of several smaller Castles, and buildings. But, the most important feature that stood out to you were the windows and the spires adorned in beautiful stained glass.\n\nYou were taken to a decent residence just beyond the Castle’s courtyard where you met up with Madam Cornelia, the leader of Aegis Luminis - a Knight Chapter consisting of Elite Soldiers that serve and obey Earl Auriga.- a Knight Chapter consisting of Elite Soldiers that serve and obey Earl Auriga.\n\n“I see you’ve brought a letter from the Mayor of Aube Town. Tell me, how does a small town’s mayor afford to send a Guild Ranger just to deliver his letter? You would think he would be on the streets after paying that senile Sebas huh.” Cornelia commented as she stared you dead in the face.\n\nHer comments didn’t sit right with you, but you decided to hold your anger for the time being.\n\nUnlike Sebas and you other Rangers, we have ethics. We exist to serve people, not rob them.” Cornelia left another snarky comment.\n\nSomething didn’t feel right this time. Something hurt, and your expression changed.`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"5"})

                                }
                                else{
                                    interaction.reply({content:`**(Press /progresssidequest in Castle Luminar in Zorya to continue)**`,ephemeral:true})
                                }
                                

                            }
                            else if(foundUser.side_quest_phase == "5"){
                                if(foundUser.location == "Castle Luminar"){
                                    const attachment = new MessageAttachment('assets/AubeTown/SQ63.jpg')
                                    let quest_embed = new MessageEmbed()
                                .setColor('GREEN')
                                .setTitle(`AUBE TOWN'S WATER CRISIS-QUEST COMPLETED`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Rewards:`,
                                        value:`**You recieved 1500🪙!**\n**You recieved 35 Merit!**`
                                    }
                                ])
                                .setImage('attachment://SQ63.jpg')
                                .setDescription(`Due to your renewed anger, a mass of Spyr began enveloping your body. Even though you were unaware of the past between Mr. Sebas and Madam Cornelia, her remarks were not right.\n\n“Oh! are we getting a little serious? Well then, it isn’t everyday we get to show up a Guild Ranger. Iris, come forward! Show this ignorant Ranger what a Super-Regular can do!” Says Madam Cornelia as a young trainee comes forward and assumes a combat stance.\n\nAs you got ready to fight, you sensed absolutely no traces of Spyr being harnessed by Iris. You worried about her safety, but the events had already taken a full turn. It would be foolish to turn your back now.\n\nTo show Iris respect, you also assume your stance and ready yourself to launch a devastating attack.\n\nHowever, you are surprised to see Iris walk slowly towards you without flinching or showing any ounce of fear. Shocked to see this, you lunge yourself forward to seal the deal once and for all, but Iris manages to dodge your strike. Even though it seemed you barely managed to graze her, you knew in your heart that you weren’t even close.\n\nSwiftly, she grabbed her sword, still in its scabbard and began striking you with it. Each hit was precise and strong. You felt crippled and immediately fell to your knees, eyes widened from the pain.\n\n“That was **Revok**. Those who have mastered it will have the vigour of a hundred men, the endurance of a blackstone, knowledge of the unseeable and the agility surpassing all reflexes. Such is the power of a **Super-Regular**.” Madam Cornelia commented as she paced around the room.\n\n“Do not drag your name any further in the mud, Ranger. You see, despite your loss here today, I am quite impressed with your loyalty and conviction. You don’t see that everyday. Look, Earl Auriga isn’t in Zorya at the moment. So for you, I will hand this letter to the Earl when he returns and convey the Mayor’s request for aid in his matter concerning Aube. You may be asked to present yourself in the Earl’s court in the future regarding this matter. I hope you will be stronger the next time we meet.\n\n You hand the Letter to Madam Cornelia and leave Castle Luminar, wondering about **“Revok”** and the reason for Madam Cornelia’s disliking towards the Guild Rangers.`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                foundUser.completed_quests.push("KS-TA-SQ6")
                                foundUser.side_quest.splice(0,1)
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"1",completed_quests:foundUser.completed_quests,side_quest:foundUser.side_quest,merit:foundUser.merit+35,coins:foundUser.coins+1500})
                                                let fableLog = new MessageEmbed()
                                                .setColor('RANDOM')
                                                .setTitle('FABLE LOG')
                                                .setDescription(`${interaction.user.username} has Completed the Side Quest **"Aube Town's Water Crisis"** and recieved **1500🪙**!`)
                                                await (interaction.client.channels.cache.get(`1141991984526012466`) as TextChannel).send({embeds:[fableLog]})

                                }
                                else{
                                    interaction.reply({content:`**(Press /progresssidequest in Castle Luminar in Zorya to continue)**`,ephemeral:true})
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
                                .setDescription(`In your search for the missing Astrolabe,you interview many in ${foundUser.location} but to your dismay you couldn't obtain any useful information.`)
                                
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
                                    interaction.reply({content:`After investigating various locations, you finally find a lead on the missing astrolabe, you must go to the Golden Terminal to continue.\n**(press /progresssidequest in Golden Terminal to continue)**`,ephemeral:true})
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
                                    .setDescription(`You Reach the Black Market following the trail of the thief and manage to finally catch them talking to a dealer in the black market. It turns out to be a lady who panics seeing your Guild Emblem after you confront her and explains that she isn't the thief but rather someone who bought it from the original thief and is trying to sell it for a profit.\n\n The seller isn't ready to hand over the astrolabe just like that and everyone in the Black Market seems to take her side. You figure that it isn't wise to cause a scene here and Your only choice is to catch the thief and bring back the money the seller originally paid for the Astrolabe if you ever hope to retrieve it.\n\n**You Must search the blackmarket for the original thief who also dwells here**`)
                                
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"5"})
                               
                                }
                                else{
                                    interaction.reply({content:`You must follow the trail of the thief and reach the Black Market! visit the Black Market to continue`,ephemeral:true})
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
                                    .setDescription(`You try your best to locate the thief before finally managing to find someone who matches the description given to you by the stranger in Astro Avenue and start running towards him who quickly catches on and starts running away swiftly through the nooks and crooks of the market making it very difficult even for an Ajin like you to catch up.After running after him for a while you suddenly find a familiar face holding the thief by his neck as he struggles to move,It's your fellow guildmate who joined the guild around the same time as you.\n\n${dialogue}\n\n You retrieve the thief from your guildmate thanking for the help in chasing him.\n\n**Proceed to Interrogate the Thief**`)
                                
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
                                    interaction.reply({content:`You must interrogate the thief! visit the Black Market to continue`,ephemeral:true})
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
                                            value:`**1500🪙**`
                                        }
                                    ])
                                    .setDescription(`You bring back the Astrolabe to the wealthy citizen who hired you to find it. He is ecstatic since you brought it back and pays you well for your troubles. In the moment you think how Butch got lucky in the sense that he got caught by you, who spared him, and how you ended up being owed a favor by the thieving siblings as soon as you held the Astrolabe. Perhaps there is something about them that is just hard to explain.`)
                                
                                await interaction.reply({embeds:[quest_embed]})
                                foundUser.completed_quests.push("KS-ZS-SQ1")
                                foundUser.side_quest.splice(0,1)
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"1",completed_quests:foundUser.completed_quests,side_quest:foundUser.side_quest,coins:foundUser.coins+1500})
                                let fableLog = new MessageEmbed()
                                                .setColor('RANDOM')
                                                .setTitle('FABLE LOG')
                                                .setDescription(`${interaction.user.username} has Completed the Side Quest **"Heirloom Missing"** and recieved 1500🪙!`)
                                                await (interaction.client.channels.cache.get(`1141991984526012466`) as TextChannel).send({embeds:[fableLog]})
                     
                               
                                }
                                else{
                                    interaction.reply({content:`You must give the missing astrolabe back to the owner! visit the Astro Avenue to continue`,ephemeral:true})
                                }
                            }
                        }
                        else if(foundUser.side_quest[0] == "KS-ZS-SQ2"){
                            if(foundUser.side_quest_phase == "1"){
                                let quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`Helping Set Sail`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Press "/progresssidequest" at the AURIGA SAILS COMPANY to continue.**`
                                    }
                                ])
                                .setDescription(`The Shipwrights at Auriga Sails Company are running behind schedule in finishing a new ship for the Golden Dutchman Fleet. And to rub salt on the wound, one of their best workers has fallen ill. The Player must fill in for the helper by assisting the shipwrights in various tasks around the Port, and help them in completing the project on time.\n\n**Go to Auriga Sails Company to continue**`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"2"})

                            }
                            else if(foundUser.side_quest_phase == "2"){
                                if(foundUser.location == "Auriga Sails Company"){
                                let quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`Helping Set Sail`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Press "/progresssidequest" at the AURIGA SAILS COMPANY to continue.**`
                                    }
                                ])
                                .setDescription(`As you enter the bustling Auriga Sails Company's Shipyard, the rhythmic clanging of metal fills the air. Steam-powered machines hiss and whirr as they assist the shipwrights in crafting magnificent airships. You spot a group of shipwrights working diligently on a massive steam-powered airship. Among them are the twins, Damen and Daewoo, the focused and meticulous Imabari, and their charismatic leader, Cantieri.\n\nDamen, the older twin, gives you a serious nod, while Daewoo flashes a warm smile. Imabari nods in greeting, her attention focused on her work. Cantieri greets you with a hearty handshake, his enthusiasm palpable.\n\n**Cantieri:** "Ah, welcome! We're thrilled to have you here. Let's work together to overcome this challenge."\n\nThe shipwrights explain that they are in the final stages of assembling the airship's engine, but they need assistance due to a tight deadline. They are all rookies who haven’t constructed a single Airship in their life, but Cantieri’s father Iceberg was a renowned shipwright, whom he learnt from. If they finish their Airship in time, they want to showcase it in the upcoming Airship Expo to get their careers started. If they miss it, they would have lost a great opportunity and all their savings. You need to help them.`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"3"})
                            }
                            else{
                                interaction.reply({content:`You must talk to the shipwrights in Auriga Sails Company to continue`,ephemeral:true})
                            }

                            }
                            else if(foundUser.side_quest_phase == "3"){
                                if(foundUser.location == "Auriga Sails Company"){
                                let quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`Helping Set Sail`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`** Press "/progresssidequest" at the ASTRO AVENUE to continue.**`
                                    }
                                ])
                                .setDescription(`The shipwrights provide you with specific tasks based on their expertise.\n\n**Damen and Daewoo's Task:**\n\nThey need specialized tools from a nearby merchant. You're asked to negotiate the best price.\n\n**Damen:** "We require a Genhead for the Airship's engine from the local merchant. Can you handle the negotiation?"\n\n**Daewoo:** "Show us your bartering skills! I heard you Rangers buy items on a discount anyway."`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"4"})
                            }
                            else{
                                interaction.reply({content:`You must continue the conversation with the shipwrights in Auriga Sails Company to continue`,ephemeral:true})
                            }

                            }
                            else if(foundUser.side_quest_phase == "4"){
                                if(foundUser.location == "Astro Avenue"){
                                let quest_embed
                                if(foundUser.completed_quests.includes("KS-ZS-SQ1")){
                                quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`Helping Set Sail`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Press "/progresssidequest" at the AURIGA SAILS COMPANY to continue.**`
                                    }
                                ])
                                .setDescription(`As you waddle along Astro Avenue, you find the store Damen and Daewoo told you about. Inside of the store is filled with many  tools and machines that you have no business knowing the application of. There is stuff everywhere, even on the roof and the floor that obstructs your walk. You walk to the counter and find out that it is owned by the same person whom you helped by finding their family heirloom.\n\n“Ah, greetings Rangers! You’re the person who helped me with my request! I am in your debt. But emotions aside, what brings you here today? I assume you’re here on business.\n\nYou explain to him about requiring a Genhead.\n\n“A Genhead? Well that is quite an interesting buy, but not a problem for a gentleman like me. Tell you what, I’ll let you own it for a steep discount since you helped me!” Says the Gentleman.\n\n**Received Genhead x1**`)
                            
                                }
                                else{
                                quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`Helping Set Sail`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Press "/progresssidequest" at the AURIGA SAILS COMPANY to continue.**`
                                    }
                                ])
                                .setDescription(`As you waddle along Astro Avenue, you find the store Damen and Daewoo told you about. Inside of the store is filled with many tools and machines that you have no business knowing the application of. There is stuff everywhere, even on the roof and the floor that obstructs your walk. You walk to the counter and ask the Gentleman there about him selling a Genhead.\n\n“A Genhead? Well that is quite an ask, but a feeble one for a gentleman such as me. But, before we discuss pricing, tell me, are you not a Ranger?” The Store Owner asks.\n\nYou nod positively.\n\n“Well I’ll be! See, I was recently robbed off of a very valuable family heirloom and I posted a request to find the culprit back at the Guild District. So far, no Ranger has given it a chance. You seem like a good lad. How about I offer you this Genhead at a steep discount if you promise to help me with my request when you’re done with your current one, eh? A Genhead is normally quite expensive if you follow…” the Store Owner, staring at you like a creep.\n\nYou agree to help him with his request.\n\n“Thank you! Here, this makes our deal official.\n\n**Received Genhead x1**`)
                            
                                }
                                
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"5"})
                            }
                            else{
                                interaction.reply({content:`You must buy a Genhead from a local merchant in Astro Avenue to continue`,ephemeral:true})
                            }

                            }
                            else if(foundUser.side_quest_phase == "5"){
                                if(foundUser.location == "Auriga Sails Company"){
                                let quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`Helping Set Sail`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Press "/progresssidequest" at the AURIGA SAILS COMPANY with the required materials to continue.**`
                                    }
                                ])
                                .setDescription(`Damen takes the tools with a nod of approval, while Daewoo pats you on the back.\n\n**Damen:** "Tools are perfect. Good job."\n\n**Daewoo:** "You've got a knack for negotiation. Thanks!"\n\n**Imabari's Task:**\n\nImabari requests your help with finishing up her sail, but she is short of x15 Windblown Feathers.\n\n**Imabari:** "Could you handle the delicate task of getting me x15 Windblown Feathers? I’ve heard they are found in the Badlands."\n\n**Find x15 Windblown Feathers for Imabari.**`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"6"})
                            }
                            else{
                                interaction.reply({content:`You must deliver the Genhead to the shipwrights in Auriga Sails Company to continue`,ephemeral:true})
                            }

                            }
                            else if(foundUser.side_quest_phase == "6"){
                                if(foundUser.location == "Auriga Sails Company"){
                                    Inventory.findOne({userID:authorId},async function(err,userProfile){
                                        const foundObject=await userProfile.inventory.items.find(object => object.name.name.toLowerCase() === WindblownFeather.create().name.toLowerCase())
                                        if(foundObject){
                                            if(foundObject.quantity >= 15){
                                                foundObject.quantity-=15
                                                if(foundObject.quantity == 0){
                                                    const index = await userProfile.inventory.items.indexOf(foundObject)
                                                    userProfile.inventory.items.splice(index,1)
                                                }
                                                
                                                let quest_embed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`Helping Set Sail`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Press "/progresssidequest" at the AURIGA SAILS COMPANY to continue.**`
                                    }
                                ])
                                .setDescription(`Imabari inspects the Windblown Feathers with a satisfied smile.\n\n**Imabari:** "You've handled them well. Impressive.”\n\n**Cantieri's Task:**\n\nCantieri needs you to use your Spyr to power-up the propellers Damen and Daewoo recently fit in.\n\n**Cantieri:** "We're not going to be able to use the propellers at our current power. The Genhead that distributes the power to the propellers would need more time to start, but we have to jump start it. Could you perhaps use your Spyr to help us?"\n\n**This talk requires x2 Energy.**`)
                            
                                await interaction.reply({embeds:[quest_embed]})
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"7"})
                                await Inventory.updateOne({userID:authorId},userProfile)
                                                }
                                                else{
                                                    interaction.reply({content:`You must deliver **x15 Windblown Feathers** to the shipwrights in Auriga Sails Company to continue, it seems that you do not have enough materials yet!`,ephemeral:true})
                                                }
                                            }
                                            else{
                                                interaction.reply({content:`You must deliver **x15 Windblown Feathers** which are found in The Badlands to the shipwrights in Auriga Sails Company to continue`,ephemeral:true})
                                            }
                                        })
                                
                            }
                            else{
                                interaction.reply({content:`You must deliver **x15 Windblown Feathers** which are found in The Badlands to the shipwrights in Auriga Sails Company to continue`,ephemeral:true})
                            }

                            }
                            else if(foundUser.side_quest_phase == "7"){
                                if(foundUser.location == "Auriga Sails Company"){
                                    if(foundUser.energy >= 2){
                                        let quest_embed = new MessageEmbed()
                                        .setColor('RANDOM')
                                        .setTitle(`Helping Set Sail - QUEST COMPLETED`)
                                        .setAuthor({
                                            iconURL:interaction.user.displayAvatarURL(),
                                            name:interaction.user.tag
                                        })
                                        .addFields([
                                            {
                                                name: `Rewards:`,
                                                value:`**You recieved 1500🪙!**\n**You recieved 35 Merit!**`
                                            }
                                        ])
                                        .setDescription(`Cantieri is visibly pleased with your aid and commends your efforts.\n\n**Cantieri:** "This is exactly what we needed. You've been a great help."\n\nThe shipwrights incorporate your contributions into the airship, completing the project with renewed efficiency.\n\nThe shipwrights offer you a reward for your assistance and acknowledge your pivotal role in their success.`)
                                    
                                        await interaction.reply({embeds:[quest_embed]})
                                        foundUser.completed_quests.push("KS-ZS-SQ2")
                                foundUser.side_quest.splice(0,1)
                                await profileModel.updateOne({userID:authorId},{side_quest_phase:"1",completed_quests:foundUser.completed_quests,side_quest:foundUser.side_quest,merit:foundUser.merit+35,coins:foundUser.coins+1500,energy:foundUser.energy-2})
                                                let fableLog = new MessageEmbed()
                                                .setColor('RANDOM')
                                                .setTitle('FABLE LOG')
                                                .setDescription(`${interaction.user.username} has Completed the Side Quest **"Helping Set Sail"** and recieved **1500🪙**!`)
                                                await (interaction.client.channels.cache.get(`1141991984526012466`) as TextChannel).send({embeds:[fableLog]})
                                    }
                                    else{
                                        interaction.reply({content:`You require 2x Energy to perform this action!`,ephemeral:true})
                                    }
                                
                            }
                            else{
                                interaction.reply({content:`You must help the shipwrights in Auriga Sails Company to continue`,ephemeral:true})
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
                else{
                    await interaction.reply({content:"It seems you are not awakened yet!\n```use /awaken to begin your Fable```",ephemeral:true})
                }
            }
        })
    })