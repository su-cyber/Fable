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
import { emoji } from '../src/lib/utils/emoji'

export default new MyCommandSlashBuilder({ name: 'hunting_contract', description: 'get a hunting conract' })

.setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id
        const exceptionEmbed = new MessageEmbed()
        .setColor('RED')
        .setTitle('INTERACTION TIMED OUT')
        .setDescription(`Oops! your interaction has been timed out as it has crossed the waiting limit for your action.\n\nHowever, don't worry! simply use the command again to restart.`)
        
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
                                .setDescription(`The Ranger Association has put up a contract to eliminate 5 Thornbacks due to their recent hostile nature\n\n__Rewards__:**500${emoji.CRUS} | 35 Merit**`)

                                let Quest_embed_2 = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('Contract - Mudcrawlers')
                                .setDescription(`The Ranger Association has put up a contract to eliminate 3 Mudcrawlers as crofters are having difficulties in farming the Castellan Fields due to an onslaught of Mudcrawlers\n\n__Rewards__:**150${emoji.CRUS} | 35 Merit**`)

                                

                                
                                
                            
                                
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
    await interaction.editReply({content: null,embeds:[board_copy[0]],components:[btnraw,select]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})

    let filter_btn = (interaction : any) => interaction.user.id === authorId && interaction.isButton()
    let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select_hunt"
    let collector_btn =  interaction.channel.createMessageComponentCollector({ filter:filter_btn })
    let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select })


    let count = 0
    collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
        collected.deferUpdate().catch(() => null)
        const quest = collected.values[0]
        if(foundUser.quest_quantity > 0){
            interaction.editReply({content: `you already have an ongoing hunting contract!`,embeds:[],components:[]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
        }
        else{
            let quest_selected = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Selected')
            .setDescription(`You have selected a Hunting Contract!`)
    
            
            foundUser.quest = quest
            const foundhunt = hunting_contracts.find(quest => quest.quest_id == foundUser.quest)
 
            await profileModel.updateOne({userID:authorId},{quest:foundUser.quest,quest_mob:foundhunt.target,quest_quantity:foundhunt.quantity})
            
            
            interaction.editReply({content: null,embeds:[quest_selected],components:[]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
            
          
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
            
            interaction.editReply({content: null,embeds:[board_copy[count]],components:[btnraw,select]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
        }
        else if(i.customId === 'backward'){
            if(count== 0){
                count=board_copy.length-1
            }
            else{
                count-=1
            }
            
            interaction.editReply({content: null,embeds:[board_copy[count]],components:[btnraw,select]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})

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
   if(location == "Guild Office"){
                                let Quest_embed_1 = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('Contract - Gloomroots')
                                .setDescription(`The Ranger Association has put up a contract to eliminate 3 Gloomroots residing in the Forest of Ellior. Their rapidly growing population is affecting travel of citizens from and around Zorya. Even though Gloomroots aren’t the most threatening Spyriths, they can prove to be a challenge for many Rookies. Proceed with caution.\n\n__Rewards__:**200${emoji.CRUS} | 45 Merit**`)

                                let Quest_embed_2 = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('Contract - Emberbeasts')
                                .setDescription(`The Ranger Association has put up a contract to eliminate 5 Emberbeasts residing in the Dragon’s Den. Due to their flame affinity, the meat of the Emberbeasts is very popular among the residents of Solarstrio. The meat has amazing taste due to it being cooked twice. Due to its high demand, the Association has put up this request.\n\n__Rewards__:**200${emoji.CRUS} | 45 Merit**`)

                                let Quest_embed_3 = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('Contract - Gilded Wyverns')
                                .setDescription(`The Ranger Association has put up a contract to eliminate 1 Gilded Wyvern residing in the Dragon’s Den. Their recent emergence and scavenging nature has disturbed the entire ecosystem of the place. Since they hunt in packs, the Association requests you to hunt down a Gilded Wyvern that is not part of a pack. Trying to hunt large numbers may be fatal.\n\n__Rewards__:**500${emoji.CRUS} | 55 Merit**`)

                                

                                
                                
                            
                                
    let btnraw= new MessageActionRow().addComponents([
        new MessageButton().setCustomId("backward").setStyle("PRIMARY").setLabel("⏪"),
        new MessageButton().setCustomId("stop").setStyle("DANGER").setLabel("stop"),
        new MessageButton().setCustomId("forward").setStyle("PRIMARY").setLabel("⏩"),
        
    ])
    let filtered_menu = []
    let board = [Quest_embed_1,Quest_embed_2,Quest_embed_3]
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
    await interaction.editReply({content: null,embeds:[board_copy[0]],components:[btnraw,select]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})

    let filter_btn = (interaction : any) => interaction.user.id === authorId && interaction.isButton()
    let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select_hunt"
    let collector_btn =  interaction.channel.createMessageComponentCollector({ filter:filter_btn })
    let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select })


    let count = 0
    collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
        collected.deferUpdate().catch(() => null)
        const quest = collected.values[0]
        if(foundUser.quest_quantity > 0){
            interaction.editReply({content: `you already have an ongoing hunting contract!`,embeds:[],components:[]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
        }
        else{
            let quest_selected = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Selected')
            .setDescription(`You have selected a Hunting Contract!`)
    
            
            foundUser.quest = quest
            const foundhunt = hunting_contracts.find(quest => quest.quest_id == foundUser.quest)
 
            await profileModel.updateOne({userID:authorId},{quest:foundUser.quest,quest_mob:foundhunt.target,quest_quantity:foundhunt.quantity})
            
            
            interaction.editReply({content: null,embeds:[quest_selected],components:[]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
            
          
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
            
            interaction.editReply({content: null,embeds:[board_copy[count]],components:[btnraw,select]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
        }
        else if(i.customId === 'backward'){
            if(count== 0){
                count=board_copy.length-1
            }
            else{
                count-=1
            }
            
            interaction.editReply({content: null,embeds:[board_copy[count]],components:[btnraw,select]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})

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
                            else{
                                interaction.reply({content:`you are not in a guild outpost!`,ephemeral:true})
                            }
                        }
                    })
                }
                else{
                    await interaction.reply({content:"It seems you are not awakened yet!\n```use /awaken to begin your Fable```",ephemeral:true})
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