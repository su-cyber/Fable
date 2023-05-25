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

export default new MyCommandSlashBuilder({ name: 'questboard', description: 'select a quest' })

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
                                .setTitle('War with Ravens')
                                .setDescription(`Quest 1`)

                                let Quest_embed_2 = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('Feed the Radiantura')
                                .setDescription(`Quest 2`)

                                

                                let Quest_embed_3 = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('The Crofter’s Market')
                                .setDescription(`Quest 3`)

                                let Quest_embed_4 = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('Stumped!')
                                .setDescription(`Quest 4`)

                                let Quest_embed_5 = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('Stolen Consignments')
                                .setDescription(`Quest 5`)

                            
                                
    let btnraw= new MessageActionRow().addComponents([
        new MessageButton().setCustomId("backward").setStyle("PRIMARY").setLabel("⏪"),
        new MessageButton().setCustomId("stop").setStyle("DANGER").setLabel("stop"),
        new MessageButton().setCustomId("forward").setStyle("PRIMARY").setLabel("⏩"),
        
    ])
    let filtered_menu = []
    let board = [Quest_embed_1,Quest_embed_2,Quest_embed_3,Quest_embed_4,Quest_embed_5]
    shuffleArray(board)
    let board_copy = []
    for(let i=0;i<board.length;i++){
        const foundQuest = allQuests.find(quest => quest.name === board[i].title)
        
        if(foundUser.completed_quests.includes(foundQuest.quest_id)){
            

        }
        else{
            board_copy.push(board[i])
            filtered_menu.push(foundQuest)
        }
    }
    if(board.length == 0){
        interaction.reply(`You have completed all the quests!`)
    }
    else{
        let select =  new MessageActionRow().addComponents([
            new MessageSelectMenu()
            .setCustomId('select')
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
    let filter_select = (interaction : any) => interaction.user.id === authorId && interaction.customId == "select"
    let collector_btn =  interaction.channel.createMessageComponentCollector({ filter:filter_btn })
    let collector_select = interaction.channel.createMessageComponentCollector({ filter:filter_select })


    let count = 0
    collector_select.on('collect',async (collected : MessageComponentInteraction<CacheType> & { values: string[] }) => {
        collected.deferUpdate().catch(() => null)
        const quest = collected.values[0]
        if(foundUser.side_quest.includes(quest)){
            interaction.editReply({content: `you have already taken this quest!`,embeds:[],components:[]})
        }
        else{
            let quest_selected = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Selected')
            .setDescription(`You have selected a quest!`)
    
            let quest_cancel = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Cancelled')
            .setDescription(`You already have an ongoing side quest!`)
            if(foundUser.side_quest_phase == 1 || foundUser.side_quest_phase == ""){
                foundUser.side_quest.push(quest)
                await profileModel.updateOne({userID:authorId},{side_quest:foundUser.side_quest,side_quest_phase:"1"})
                interaction.editReply({content: null,embeds:[quest_selected],components:[]})
            }
            else{
                interaction.editReply({content: null,embeds:[quest_cancel],components:[]})
            }
        }
    

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
            interaction.deleteReply()
            collector_btn.stop()
        }
        else{

        }

  
    
    })
    }

  
     }
                            else{
                                interaction.reply(`you are not in a guild outpost!`)
                            }
                        }
                    })
                }
                else{
                    interaction.reply(`it seems you have not awakened yet!`)
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