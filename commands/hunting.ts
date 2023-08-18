import {
    CacheType,
    CommandInteraction,
    InteractionCollector,
    MappedInteractionTypes,
    MessageActionRow,
    MessageButton,
    MessageComponentInteraction,
    MessageEmbed,
    MessageSelectMenu,
} from 'discord.js'
import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import allQuests from '../src/utils/allQuests'
import hunting_contracts from '../src/utils/allHuntingContracts'

export default new MyCommandSlashBuilder({ name: 'hunting_contract', description: 'get a hunting conract' })

.setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id

        profileModel.exists({userID: authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    profileModel.findOne({userID:authorId},async function(err,foundUser) {
           
                        const kingdom = foundUser.kingdom
                        const location = foundUser.location

                        if(kingdom == "solarstrio"){
                            if(location == "Aube Town Guild Outpost"){
                                let Quest_embed_1 = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('Contract - Thornbacks')
                                .setDescription(`The Ranger Association has put up a contract to eliminate 5 Thornbacks due to their recent hostile nature\n\n__Rewards__:**500🪙 | 35 Merit**`)

                                let Quest_embed_2 = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('Contract - Mudcrawlers')
                                .setDescription(`The Ranger Association has put up a contract to eliminate 3 Mudcrawlers as crofters are having difficulties in farming the Castellan Fields due to an onslaught of Mudcrawlers\n\n__Rewards__:**510🪙 | 35 Merit**`)

                                

                                
                                
                            
                                
    let btnraw= new MessageActionRow().addComponents([
        new MessageButton().setCustomId("backward").setStyle("PRIMARY").setLabel("⏪"),
        new MessageButton().setCustomId("stop").setStyle("DANGER").setLabel("stop"),
        new MessageButton().setCustomId("forward").setStyle("PRIMARY").setLabel("⏩"),
        
    ])
    let filtered_menu = []
    let board = [Quest_embed_1,Quest_embed_2]
    shuffleArray(board)
    let board_copy = []
    for(let i=0;i<board.length;i++){
        const foundQuest = hunting_contracts.find(quest => quest.name === board[i].title)
        
        if(foundUser.completed_quests.includes(foundQuest.quest_id)){
            

        }
        else{
            board_copy.push(board[i])
            filtered_menu.push(foundQuest)
        }
    }
    if(board_copy.length == 0){
        interaction.reply({content:`You have completed all the hunting contracts!`,ephemeral:true})
    }
    else{
        let select =  new MessageActionRow().addComponents([
            new MessageSelectMenu()
            .setCustomId('select_hunt')
                .setPlaceholder(`Select a quest ${interaction.user.username}`)
                .addOptions(
                    filtered_menu.map(quest => ({
                    label: quest.name,
                    description: quest.description,
                    value: quest.quest_id,
                })))
                .setDisabled(false),
        ]) 
   
    await interaction.deferReply()
    await interaction.editReply({content: null,embeds:[board_copy[0]],components:[btnraw,select]})

    let filter_btn = (interaction : any) => interaction.user.id === authorId && interaction.isButton()
    let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select_hunt"
    let collector_btn =  interaction.channel.createMessageComponentCollector({ filter:filter_btn })
    let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select })


    let count = 0
    collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
        collected.deferUpdate().catch(() => null)
        const quest = collected.values[0]
        if(foundUser.quest_quantity > 0){
            interaction.editReply({content: `you already have an ongoing hunting contract!`,embeds:[],components:[]})
        }
        else{
            let quest_selected = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Selected')
            .setDescription(`You have selected a Hunting Contract!`)
    
            
            foundUser.quest = quest
            const foundhunt = hunting_contracts.find(quest => quest.quest_id == foundUser.quest)
 
            await profileModel.updateOne({userID:authorId},{quest:foundUser.quest,quest_mob:foundhunt.target,quest_quantity:foundhunt.quantity})
            
            
            interaction.editReply({content: null,embeds:[quest_selected],components:[]})
            
          
        }
    
        collector_btn.stop()
        collector_select.stop()

    })
    collector_btn.on('collect', async i => {
        i.deferUpdate().catch(() => null)
        if(i.customId === 'forward'){
            if(count== board_copy.length-1){
                count=0
            }
            else{
                count +=1
            }
            
            interaction.editReply({content: null,embeds:[board_copy[count]],components:[btnraw,select]})
        }
        else if(i.customId === 'backward'){
            if(count== 0){
                count=board_copy.length-1
            }
            else{
                count-=1
            }
            
            interaction.editReply({content: null,embeds:[board_copy[count]],components:[btnraw,select]})

        }
        else if(i.customId === 'stop'){
            await interaction.deleteReply()
            collector_btn.stop()
            collector_select.stop()
        }
        else{

        }

  
    
    })
    }

  
     }
    //  else if(location == "Guild Office"){
    //     if(foundUser.guild == "None"){
    //         interaction.reply({content:`You are not a Guild Member yet, you cannot access the questboard!`,ephemeral:true})
    //     }
    //     else{
    //                         let Quest_embed_1 = new MessageEmbed()
    //                             .setColor('RANDOM')
    //                             .setTitle('Heirloom Missing')
    //                             .setDescription(`The player is hired by a wealthy citizen of Zorya to find their missing astrolabe. The astrolabe is a family heirloom that is believed to bring good fortune to its owner. The player must search the city and interview locals to find out where the astrolabe may have ended up\n\nRequired Guild Class: **E**\nRecommended Level: **Lvl 6**`)

    //                             let Quest_embed_2 = new MessageEmbed()
    //                             .setColor('RANDOM')
    //                             .setTitle('Lost Bussiness')
    //                             .setDescription(`A local shop owner's steam generator has broken down,The shop owner relies on the generator to power their machinery and without it, they are losing business. You must investigate the cause of the malfunction and repair the generator.\n\nRequired Guild Class: **E**\nRecommended Level: **Lvl 6**`)

                                

    //                             let Quest_embed_3 = new MessageEmbed()
    //                             .setColor('RANDOM')
    //                             .setTitle('Quest 3')
    //                             .setDescription(`The player is asked by the local farmer to help set up a farmer's market in Aube Town. The player must gather ingredients like Radiantura’s Milk, Argentum Leaf, Sale Poster, Steam Shovel, & I Love Guild t-shirts to help the farmer set up a stall, and attract customers to the market`)

    //                             let Quest_embed_4 = new MessageEmbed()
    //                             .setColor('RANDOM')
    //                             .setTitle('Quest 4')
    //                             .setDescription(`The local Solarii are having trouble cutting down Sunshade Trees in Sunshade Forest, due to a wild group of Treemics that have mixed themselves among the leftover tree stumps. Whenever a person traverses near the tree stumps’, the Treemics attack them. A few lives have already been lost.`)

                            
                                
    // let btnraw= new MessageActionRow().addComponents([
    //     new MessageButton().setCustomId("backward").setStyle("PRIMARY").setLabel("⏪"),
    //     new MessageButton().setCustomId("stop").setStyle("DANGER").setLabel("stop"),
    //     new MessageButton().setCustomId("forward").setStyle("PRIMARY").setLabel("⏩"),
        
    // ])
    // let filtered_menu = []
    // let board
    // if(foundUser.guild_class == "E"){
    //     board = [Quest_embed_1,Quest_embed_2]
    // }
    // else{
    //     board = [Quest_embed_1,Quest_embed_2,Quest_embed_3,Quest_embed_4]
    // }
     
    // shuffleArray(board)
    // let board_copy = []
    // for(let i=0;i<board.length;i++){
    //     const foundQuest = allQuests.find(quest => quest.name === board[i].title)
        
    //     if(foundUser.completed_quests.includes(foundQuest.quest_id)){
            

    //     }
    //     else{
    //         board_copy.push(board[i])
    //         filtered_menu.push(foundQuest)
    //     }
    // }
    // if(board_copy.length == 0){
    //     interaction.reply({content:`You have completed all the quests!`,ephemeral:true})
    // }
    // else{
    //     let select =  new MessageActionRow().addComponents([
    //         new MessageSelectMenu()
    //         .setCustomId('select')
    //             .setPlaceholder(`Select a quest ${interaction.user.username}`)
    //             .addOptions(
    //                 filtered_menu.map(quest => ({
    //                 label: quest.name,
    //                 description: quest.description,
    //                 value: quest.quest_id,
    //             })))
    //             .setDisabled(false),
    //     ]) 
   
    // await interaction.deferReply()
    // await interaction.editReply({content: null,embeds:[board_copy[0]],components:[btnraw,select]})

    // let filter_btn = (interaction : any) => interaction.user.id === authorId && interaction.isButton()
    // let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
    // let collector_btn =  interaction.channel.createMessageComponentCollector({ filter:filter_btn })
    // let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select })


    // let count = 0
    // collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
    //     collected.deferUpdate().catch(() => null)
    //     const quest = collected.values[0]
    //     if(foundUser.side_quest.includes(quest)){
    //         interaction.editReply({content: `you have already taken this quest!`,embeds:[],components:[]})
    //     }
    //     else{
    //         let quest_selected = new MessageEmbed()
    //         .setColor('RANDOM')
    //         .setTitle('Selected')
    //         .setDescription(`You have selected a quest!`)
    
    //         let quest_cancel = new MessageEmbed()
    //         .setColor('RANDOM')
    //         .setTitle('Cancelled')
    //         .setDescription(`You already have an ongoing side quest!`)
    //         if(foundUser.side_quest_phase == 1 || foundUser.side_quest_phase == ""){
    //             foundUser.side_quest.push(quest)
    //             await profileModel.updateOne({userID:authorId},{side_quest:foundUser.side_quest,side_quest_phase:"1"})
    //             interaction.editReply({content: null,embeds:[quest_selected],components:[]})
    //         }
    //         else{
    //             interaction.editReply({content: null,embeds:[quest_cancel],components:[]})
    //         }
    //     }
    

    //     collector_select.stop()

    // })
    // collector_btn.on('collect', async i => {
    //     i.deferUpdate().catch(() => null)
    //     if(i.customId === 'forward'){
    //         if(count== board_copy.length-1){
    //             count=0
    //         }
    //         else{
    //             count +=1
    //         }
            
    //         interaction.editReply({content: null,embeds:[board_copy[count]],components:[btnraw,select]})
    //     }
    //     else if(i.customId === 'backward'){
    //         if(count== 0){
    //             count=board_copy.length-1
    //         }
    //         else{
    //             count-=1
    //         }
            
    //         interaction.editReply({content: null,embeds:[board_copy[count]],components:[btnraw,select]})

    //     }
    //     else if(i.customId === 'stop'){
    //         interaction.deleteReply()
    //         collector_btn.stop()
    //     }
    //     else{

    //     }

  
    
    // })
    // }
    //     }
        

    //  }
                            else{
                                interaction.reply({content:`you are not in a guild outpost!`,ephemeral:true})
                            }
                        }
                    })
                }
                else{
                    interaction.reply({content:`it seems you have not awakened yet!`,ephemeral:true})
                }
            }
        })
    })

    function shuffleArray(array: MessageEmbed[]) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }