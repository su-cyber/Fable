import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import { sleep, weightedRandom } from '../src/utils'
import { getMonsters } from '../src/age/monsters'
import { MessageActionRow, MessageSelectMenu} from 'discord.js'
import { getRandomMonster } from '../src/age/monsters'
import { getRandomFlora } from '../src/age/flora'
import profileModel from '../models/profileSchema'
import inventory from '../models/InventorySchema'
import {MessageButton, MessageEmbed } from 'discord.js'
import { MessageAttachment } from 'discord.js'
import { Entity, MonsterEntity } from '../src/age/classes'


export default new MyCommandSlashBuilder({ name: 'explore', description: 'Explore the world' })

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
           if(foundUser.dungeon.status){
            interaction.reply({content:`You cannot use this command inside a dungeon!`,ephemeral:true})
           }
           else{
            const location = foundUser.location
            const city_town = foundUser.city_town
            if(foundUser.kingdom == "solarstrio"){
                const monster_locations = ["ellior","Castellan Fields","Sunshade Forest","The Badlands","Dragon's Den","Bleeding Gorge","Asche Peak","Orld Tree Husk","Stellaris Temple Ruins"]
                if(monster_locations.includes(city_town)){
                    const pick = weightedRandom(["flora","monster"],[0.4,0.6])

                    if(pick == "flora"){
                        await interaction.reply({ content: '\u200b', components: [],files:[] })
                        const flora = (await getRandomFlora(city_town))
                        let floraEmbed = new MessageEmbed()
                            .setColor('GREEN')
                            .setTitle('ENCOUNTER')
                            .addFields([
                                {
                                    name: `Description:`,
                                    value:`${flora.description}`
                                }
                            ])
                            .setDescription(`You found a ${flora.fake_name}\n${flora.name} X ${flora.quantity} has been added to inventory!`)
                        await interaction.editReply({embeds:[floraEmbed],files:[]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
    
                        inventory.findOne({userID:interaction.user.id},async function(err,foundUser){
                            if(err){
                                console.log(err);
                                
                            }
                            else{
                                const foundItem = foundUser.inventory.items.find(item => item.name.name === flora.name)
                                if (foundItem){
                
                                    foundItem.quantity+=flora.quantity
                                }
                                else{
                                    const newItem = {
                                        name:flora,
                                        description:flora.description,
                                        quantity:Number(flora.quantity)
                                    }
                                    foundUser.inventory.items.push(newItem)
                                }
                                await inventory.updateOne({userID:authorId},foundUser)
                            }
                            
                        })
                    }
                    else if(pick == "monster"){
                    
                    
                       
                            await interaction.reply({ content: '\u200b', components: [] })
                            const monster = (await getRandomMonster(city_town))
                            
    
                            
                            foundUser.encounter = []
                           
                       
                            let btnraw= new MessageActionRow().addComponents([
                                new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Fight"),
                                new MessageButton().setCustomId("btn_reject").setStyle("DANGER").setLabel("Run"),])
    
                                let d_btnraw = new MessageActionRow().addComponents([
                                    new MessageButton().setCustomId("dbtn_accept").setStyle("PRIMARY").setLabel("Fight").setDisabled(true),
                                    new MessageButton().setCustomId("dbtn_reject").setStyle("DANGER").setLabel("Run").setDisabled(true),
                                ])
    
                            const attachment = new MessageAttachment('assets/Monsters/'+ monster.fileName)
                            let fightEmbed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('ENCOUNTER')
                            .setImage('attachment://' + monster.fileName)
                            .setDescription(`🔎 you found a ${monster.name}!\n\nDescription:${monster.description}`)
        
                            let acceptEmbed = new MessageEmbed()
                            .setColor('GREEN')
                            .setTitle('ACCEPTED')
                            .setDescription(`You have decided to fight!\n\nUse **/fight** to initiate combat with ${monster.name}!\nCombat Difficulty: **${await calculateDifficulty(monster,foundUser)}**`)
        
                            let rejectEmbed = new MessageEmbed()
                            .setColor('RED')
                            .setTitle('RAN AWAY')
                            .setDescription('You ran away!')
                            
                        
                        await interaction.editReply({content: null,embeds:[fightEmbed],components:[btnraw],files:[attachment]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                        let filter = i => i.user.id === authorId
                            let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                    
                            collector.on('collect',async (btn) => {
                                if(btn.isButton()){
                                    if(btn.customId === "btn_accept"){
                                        await btn.deferUpdate().catch(e => {})
                                        await interaction.editReply({embeds:[acceptEmbed],files:[]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                        const encounter = {
                                            name: monster.name,
                                            time : Date.now(),
                                            location:foundUser.city_town
    
                                        }
                                        
                                        foundUser.encounter.push(encounter)
                                        await profileModel.updateOne({userID:authorId},{encounter:foundUser.encounter})
                                        
    
                                        
                                   
                                    collector.stop()
                                        
                                    }
                                    else if(btn.customId === "btn_reject"){
                                        await btn.deferUpdate().catch(e => {})
                                        await interaction.editReply({embeds:[rejectEmbed],components:[],files:[]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                         foundUser.encounter = []
                                    
                                        await profileModel.updateOne({userID:authorId},foundUser)
    
                                        collector.stop()
                                    }
    
                                    
                                    
                                }
                                  
                    
                       
                       
                        })
    
                        collector.on('end', () => {
                            interaction.editReply({components: [d_btnraw]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                        })
    
                            
                       
                    }
     

                }
                else if(city_town == "aube"){
                     if(location == "Abandoned Castle"){
                        if(foundUser.completed_dungeons.includes("Abandoned Castle")){
                            interaction.reply({content:`You have already cleared this dungeon!`,ephemeral:true})
                        }
                        else if(foundUser.side_quest[0] == "KS-TA-SQ5" && foundUser.side_quest_phase == "6"){
                            let btnraw= new MessageActionRow().addComponents([
                                new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Enter"),
                                new MessageButton().setCustomId("btn_reject").setStyle("DANGER").setLabel("Cancel"),])
        
                                let d_btnraw = new MessageActionRow().addComponents([
                                    new MessageButton().setCustomId("dbtn_accept").setStyle("PRIMARY").setLabel("Enter").setDisabled(true),
                                    new MessageButton().setCustomId("dbtn_reject").setStyle("DANGER").setLabel("Cancel").setDisabled(true),
                                ])
                                const attachment = new MessageAttachment('assets/AubeTown/Abandoned_Castle.jpg')
                            let dungeonEmbed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle(`Exploring ${location}...`)
                                    .setImage('attachment://Abandoned_Castle.jpg')
                                    .setDescription(`As you approach the Abandoned Castle, a sense of mystery and melancholy washes over you. Its imposing silhouette stands as a testament to a bygone era, where echoes of battles and whispers of forgotten tales linger in the air. The weathered stones bear the weight of history, each crack and crevice whispering secrets lost to time. The once-majestic architecture now wears a cloak of solitude, the windows like empty eyes that have seen the passage of ages.\n\nYou are about to enter a dungeon!\nDo you wish to proceed?\n\n**Recommeded Level: 4**`)
                
                                    let acceptEmbed = new MessageEmbed()
                                    .setColor('GREEN')
                                    .setTitle('ENTERED DUNGEON')
                                    .setDescription('You have decided to enter!\npress /proceeddungeon in DMs to move forward')
                
                                    let rejectEmbed = new MessageEmbed()
                                    .setColor('RED')
                                    .setTitle('RETREAT')
                                    .setDescription('You decided to retreat!')
                                    
                                
                                await interaction.reply({content: null,embeds:[dungeonEmbed],components:[btnraw],files:[attachment]})
                                let filter = i => i.user.id === authorId
                                    let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                            
                                    collector.on('collect',async (btn) => {
                                        if(btn.isButton()){
                                            if(btn.customId === "btn_accept"){
                                                await btn.deferUpdate().catch(e => {})
                                                await interaction.editReply({embeds:[acceptEmbed]})
                                                foundUser.dungeon.status = true
                                                foundUser.dungeon.name = "Abandoned Castle"
                                                foundUser.dungeon.step = 1 
                                                await profileModel.updateOne({userID:authorId},{dungeon:foundUser.dungeon})
                                                interaction.user.send(`You are now inside a dungeon!\npress /proceeddungeon to move forward`)
            
                                                
                                           
                                            collector.stop()
                                                
                                            }
                                            else if(btn.customId === "btn_reject"){
                                                await btn.deferUpdate().catch(e => {})
                                                await interaction.editReply({embeds:[rejectEmbed],components:[]})
        
                                            
            
                                                collector.stop()
                                            }
            
                                            
                                            
                                        }
                                          
                            
                               
                               
                                })
            
                                collector.on('end', () => {
                                    interaction.editReply({components: [d_btnraw]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                })
                        }
                        else{
                            interaction.reply({content:`You cannot Explore this location yet,continue the story to reveal the hidden mystery of the Abandoned Castle!`,ephemeral:true})
                        }
                        
                    }
                    
                    else{
                        await interaction.reply({content:`You are not in an explorable location!`,ephemeral:true})
                     }

                }
                
                else if(city_town == "Zorya"){
                    
                    if(location == 'Siewelle Port'){
                        if(foundUser.side_quest[0] == "KS-ZS-SQ3" && foundUser.side_quest_phase == "4"){
                            let btnraw= new MessageActionRow().addComponents([
                                new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Enter"),
                                new MessageButton().setCustomId("btn_reject").setStyle("DANGER").setLabel("Cancel"),])
        
                                let d_btnraw = new MessageActionRow().addComponents([
                                    new MessageButton().setCustomId("dbtn_accept").setStyle("PRIMARY").setLabel("Enter").setDisabled(true),
                                    new MessageButton().setCustomId("dbtn_reject").setStyle("DANGER").setLabel("Cancel").setDisabled(true),
                                ])
                                const attachment = new MessageAttachment('assets/Zorya/Aqua_canal.jpeg')
                            let dungeonEmbed = new MessageEmbed()
                                    .setColor('RANDOM')
                                    .setTitle(`Exploring Aque Canals...`)
                                    .setImage('attachment://Aqua_canal.jpeg')
                                    .setDescription(`As you venture into the Aque Canals, you are transported to a fantastical realm. The labyrinthine stone pathways were adorned with luminescent moss, casting an eerie, ethereal glow, while mysterious, ancient symbols adorned the walls. The air was thick with the scent of enchanted flora, and as they looked down, the shallow waters seemed to reflect distant constellations, turning each step into a journey through the stars themselves.\n\nYou are about to enter a dungeon!\nDo you wish to proceed?\n\n**Recommeded Level: 13**`)
                
                                    let acceptEmbed = new MessageEmbed()
                                    .setColor('GREEN')
                                    .setTitle('ENTERED DUNGEON')
                                    .setDescription('You have decided to enter!\npress /proceeddungeon in DMs to move forward')
                
                                    let rejectEmbed = new MessageEmbed()
                                    .setColor('RED')
                                    .setTitle('RETREAT')
                                    .setDescription('You decided to retreat!')
                                    
                                
                                await interaction.reply({content: null,embeds:[dungeonEmbed],components:[btnraw],files:[attachment]})
                                let filter = i => i.user.id === authorId
                                    let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 300})
                            
                                    collector.on('collect',async (btn) => {
                                        if(btn.isButton()){
                                            if(btn.customId === "btn_accept"){
                                                await btn.deferUpdate().catch(e => {})
                                                await interaction.editReply({embeds:[acceptEmbed],files:[],components:[d_btnraw]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                                foundUser.dungeon.status = true
                                                foundUser.dungeon.name = "Aqua Canals"
                                                foundUser.dungeon.step = 1 
                                                await profileModel.updateOne({userID:authorId},{dungeon:foundUser.dungeon})
                                                interaction.user.send(`You are now inside a dungeon!\npress /proceeddungeon to move forward`)
            
                                                
                                           
                                            collector.stop()
                                                
                                            }
                                            else if(btn.customId === "btn_reject"){
                                                await btn.deferUpdate().catch(e => {})
                                                await interaction.editReply({embeds:[rejectEmbed],components:[]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
        
                                            
            
                                                collector.stop()
                                            }
  
                                        }
                                    })
                                       
                        
                    }
                    else{
                        await interaction.reply({content:`You are not in an explorable location!`,ephemeral:true})
                    }
                }
                

                    else{
                        await interaction.reply({content:`You are not in an explorable location!`,ephemeral:true})
                    }
                }
                else if(city_town == "Zephyr Mountain"){
                const attachment = new MessageAttachment('assets/Zorya/zephyr_mountain.jpg')
                let embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Now Exploring ${city_town}...`)
                .setImage('attachment://zephyr_mountain.jpg')
                .setDescription(`As you embark on the journey to explore Zephyr Mountain, a sense of awe washes over you. The air grows crisper, and the surroundings transform into a realm of rugged beauty. Towering cliffs and cascading waterfalls paint a breathtaking backdrop, while the distant echo of wind whispers tales of ancient secrets. With each step, the terrain becomes more challenging, urging you to push beyond your limits. Yet, as you ascend the mountain's slopes, a sense of accomplishment fills your being, knowing that you are conquering nature's formidable playground. From the summit, you witness a panorama of majestic landscapes, a testament to the boundless wonders that await those who dare to venture into the heart of Zephyr Mountain.`)
                await interaction.reply({embeds:[embed],components:[],files:[attachment]})
        
                }
                else if(city_town == "Sunstone Mines"){
                const attachment = new MessageAttachment('assets/Zorya/sunstone_mines.jpg')
                let successembed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Now Exploring ${city_town}...`)
                .setImage('attachment://sunstone_mines.jpg')
                .setDescription(` As you descend into the depths of the Sunstone Mines, a captivating spectacle unfolds before your eyes. The air hums with anticipation as workers skillfully extract the precious Sunstone, its ethereal glow casting an otherworldly radiance upon the cavernous walls. Each step reveals the intricate web of tunnels, alive with the industrious activity that powers the Kingdom of Solarstrio. The mesmerizing beauty of the Sunstone and the sheer magnitude of its importance in fueling progress fill you with a sense of awe and wonder. In the Sunstone Mines, you witness the heartbeat of a kingdom, where the harmony of natural beauty and technological innovation intertwine to shape the future.`)
                await interaction.reply({embeds:[successembed],components:[],files:[attachment]})
            
                }
                else if(city_town == "Swamp of Abyss"){
                       
                      
                           let btnraw= new MessageActionRow().addComponents([
                               new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Enter"),
                               new MessageButton().setCustomId("btn_reject").setStyle("DANGER").setLabel("Cancel"),])
       
                               let d_btnraw = new MessageActionRow().addComponents([
                                   new MessageButton().setCustomId("dbtn_accept").setStyle("PRIMARY").setLabel("Enter").setDisabled(true),
                                   new MessageButton().setCustomId("dbtn_reject").setStyle("DANGER").setLabel("Cancel").setDisabled(true),
                               ])
                               const attachment = new MessageAttachment('assets/Vesper/swamp_of_abyss.jpeg')
                           let dungeonEmbed = new MessageEmbed()
                                   .setColor('RANDOM')
                                   .setTitle(`Exploring ${location}...`)
                                   .setImage('attachment://swamp_of_abyss.jpeg')
                                   .setDescription(`As you step into the Swamp of Abyss, a shroud of darkness envelops you, and the air thickens with the scent of decay. The murky waters ripple ominously, and eerie sounds echo through the twisted trees that loom overhead. Your heart pounds in your chest as you venture deeper, the treacherous terrain making each step a test of nerve and skill. You can feel the weight of the swamp pressing down on you, its secrets lurking just beyond the veil of shadows.\n\nYou are about to enter a dungeon!\nDo you wish to proceed?\n\n**Recommeded Level: 17**`)
               
                                   let acceptEmbed = new MessageEmbed()
                                   .setColor('GREEN')
                                   .setTitle('ENTERED DUNGEON')
                                   .setDescription('You have decided to enter!\npress /proceeddungeon in DMs to move forward')
               
                                   let rejectEmbed = new MessageEmbed()
                                   .setColor('RED')
                                   .setTitle('RETREAT')
                                   .setDescription('You decided to retreat!')
                                   
                               
                               await interaction.reply({content: null,embeds:[dungeonEmbed],components:[btnraw],files:[attachment]})
                               let filter = i => i.user.id === authorId
                                   let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                           
                                   collector.on('collect',async (btn) => {
                                       if(btn.isButton()){
                                           if(btn.customId === "btn_accept"){
                                               await btn.deferUpdate().catch(e => {})
                                               await interaction.editReply({embeds:[acceptEmbed]})
                                               foundUser.dungeon.status = true
                                               foundUser.dungeon.name = "Swamp of Abyss"
                                               foundUser.dungeon.step = 1 
                                               await profileModel.updateOne({userID:authorId},{dungeon:foundUser.dungeon})
                                               interaction.user.send(`You are now inside a dungeon!\npress /proceeddungeon to move forward`)
           
                                               
                                          
                                           collector.stop()
                                               
                                           }
                                           else if(btn.customId === "btn_reject"){
                                               await btn.deferUpdate().catch(e => {})
                                               await interaction.editReply({embeds:[rejectEmbed],components:[]})
       
                                           
           
                                               collector.stop()
                                           }
           
                                           
                                           
                                       }
                                         
                           
                              
                              
                               })
           
                               collector.on('end', () => {
                                   interaction.editReply({components: [d_btnraw]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                               })
                       
                       
                   
                   
                   

               }
            else{
                await interaction.reply({content:`You are not in an explorable location!`,ephemeral:true})
             }
                
            }
          
                
                
                

                
    
            
            
           }
            
         
        })

        
        
            }

            else {
                await interaction.reply({content:"It seems you are not awakened yet!\n```use /awaken to begin your Fable```",ephemeral:true})
                }
            }
        })
       
    }
)

async function monstersDropdown(location:String) {
    const monsters = await getMonsters(location)

    return new MessageActionRow().addComponents(
        new MessageSelectMenu()
            .setCustomId('select-menu__monsters')
            .setPlaceholder('Select a monster')
            .addOptions(
                monsters.map(m => ({
                    label: m.name,
                    value: m.name,
                }))
            )
    )
}

async function calculateDifficulty(monster: MonsterEntity, player:any){
    const bst_player = player.attackDamage+player.magicPower+player.armour+player.speed+player.magicResistance
    const bst_monster = monster.attackDamage+monster.magicPower+monster.armor+monster.speed+monster.magicResistance
    // console.log("monster",bst_monster);
    // console.log("player",bst_player);
    
    
    if(bst_monster >= 0.95*bst_player &&  bst_monster < 1.2*bst_player){
        return "DANGER"
    }
    else if(bst_monster >= 0.80*bst_player &&  bst_monster < 0.95*bst_player){
        return "MODERATE"
    }
    else if(bst_monster < 0.80*bst_player ){
        return "EASY"
    }
    else{
        return "FATAL DEATH"
    }
}


