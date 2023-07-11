import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import {MessageActionRow} from 'discord.js'
import { MessageButton, MessageEmbed } from 'discord.js'
import { MessageAttachment } from 'discord.js'
import { PvEDuel } from './fight'
import { starHound } from '../src/age/monsters/ellior/Starhound'
import { Warrior } from '../src/age/heroes/warrior'
import getHealth from '../src/utils/getHealth'
import { Dave } from '../src/age/npc enemies/guildDraft_Dave'
import sample from 'lodash.sample'


export default new MyCommandSlashBuilder({ name: 'progressmainquest', description: 'progress your main quest progress' }).setDo(
    async (bot, interaction) => {
        
        
        const authorId = interaction.user.id;
        const guildID = interaction.guildId;
        const author = await bot.users.fetch(authorId)

        profileModel.exists({userID: authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){

                    profileModel.findOne({userID:authorId}, async function(err,foundUser) {

                        if(foundUser.main_quest == "Tutorial"){
                            if(foundUser.main_quest_phase == "1"){
                                foundUser.encounter = []
                       
                   
                                let btnraw= new MessageActionRow().addComponents([
                                    new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Fight"),
                                    new MessageButton().setCustomId("btn_reject").setStyle("DANGER").setLabel("Run"),])
        
                                    let d_btnraw = new MessageActionRow().addComponents([
                                        new MessageButton().setCustomId("dbtn_accept").setStyle("PRIMARY").setLabel("Fight").setDisabled(true),
                                        new MessageButton().setCustomId("dbtn_reject").setStyle("DANGER").setLabel("Run").setDisabled(true),
                                    ])
        
                                const attachment = new MessageAttachment('assets/Monsters/beerbuccsduo.jpeg')
                                
                                let fightEmbed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('ENCOUNTER')
                                .setImage('attachment://beerbuccsduo.jpeg')
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**press "fight" to fight them off when you are ready.**`
                                    }
                                ])
                                .setDescription(`You see a Duo of Beer Buccaneers approaching your way!\n\nEquip your sword by using the command "/equip" and entering "weapon" in **type** field and "sword" in **object** field.`)
            
                                let acceptEmbed = new MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('New Beginnings')
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Fight the Beer Buccaneers**`
                                    }
                                ])
                                .setDescription('You have decided to fight!check your private message.\nRemember,each encounter only lasts for 2 mins!fight them before 2 minutes are over')
            
                                let rejectEmbed = new MessageEmbed()
                                .setColor('RED')
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .setTitle('ERROR')
                                .setDescription('You cannot run away! Retry by pressing "/ProgressMainQuest"')
                                
                            
                            await interaction.reply({content: null,embeds:[fightEmbed],components:[btnraw],files:[attachment]})
                            let filter = i => i.user.id === authorId
                                let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                        
                                collector.on('collect',async (btn) => {
                                    if(btn.isButton()){
                                        if(btn.customId === "btn_accept"){
                                            await btn.deferUpdate().catch(e => {})
                                            await interaction.editReply({embeds:[acceptEmbed],files:[]})
                                            const encounter = {
                                                name: 'BeerBuccsDuo',
                                                time : new Date(),
                                                location:foundUser.location
                                            }
                                            
                                            foundUser.encounter.push(encounter)
                                            await profileModel.updateOne({userID:authorId},{encounter:foundUser.encounter})
                                            interaction.user.send(`Use /fight to begin encounter`)
                                            
        
                                            
                                       
                                        collector.stop()
                                            
                                        }
                                        else if(btn.customId === "btn_reject"){
                                            await btn.deferUpdate().catch(e => {})
                                            await interaction.editReply({embeds:[rejectEmbed]})
                                             foundUser.encounter = []
                                        
                                            await profileModel.updateOne({userID:authorId},foundUser)
        
                                            collector.stop()
                                        }
        
                                        
                                        
                                    }
                                      
                        
                           
                           
                            })
        
                            collector.on('end', () => {
                                interaction.editReply({components: [d_btnraw]})
                            })


                            }

                            else if(foundUser.main_quest_phase == "2"){

                                let btnraw= new MessageActionRow().addComponents([
                                    new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Fight"),
                                    new MessageButton().setCustomId("btn_reject").setStyle("DANGER").setLabel("Run"),])
        
                                    let d_btnraw = new MessageActionRow().addComponents([
                                        new MessageButton().setCustomId("dbtn_accept").setStyle("PRIMARY").setLabel("Fight").setDisabled(true),
                                        new MessageButton().setCustomId("dbtn_reject").setStyle("DANGER").setLabel("Run").setDisabled(true),
                                    ])
        
                                const attachment = new MessageAttachment('assets/AubeTown/Ghorgon.jpeg')
                                let fightEmbed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('ENCOUNTER')
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .setImage('attachment://Ghorgon.jpeg')
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Fight the Gorghon**`
                                    }
                                ])
                                .setDescription(` Just as you finish off the two Beer Buccaneers, you notice that the other conscripts were having a very bad time. Some were well off, and yet many were already in the mud. You too are surrounded, but then a giant Ghorgon swoops in from the Castellan Fields, and flings the Beer Buccaneers in the air. It rushes towards you. You will have to fight this beast. `)
            
                                let acceptEmbed = new MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('New Beginnings')
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .setThumbnail('attachment://Ghorgon.jpeg')
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Press "/progressmainquest" to continue**`
                                    }
                                ])
                                .setDescription('You wake up in the tiny guild outpost within Aube Town. You were told that the Ghorgon had escaped from a nearby Fragment, but it was killed by the Vice-Master of {x} Guild. He is also the one who saved your life.\n The Vice Master further said that he was impressed by you, and wants to give you a letter of recommendation to receive the “Guild Hunter License”. Usually you would need to pay a big fee to even register as a Guild Ranger (Guild member not belonging to any prominent guild who’s only involved in Defense or Research). One needs to have the Guild Hunter License to secure higher tiers of quests that involve fighting within fragments, explorations and other high-profile quests. All year, people from around the world complete low-tier quests to raise their merit in order to receive a letter of recommendation. With enough merit and a letter of recommendation, the aspiring ranger can take part in the Guild Carnival and join a guild!')
            
                                let rejectEmbed = new MessageEmbed()
                                .setColor('RED')
                                .setTitle('ERROR')
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .setThumbnail('attachment://Ghorgon.jpeg')
                                .setDescription('You cannot run away! Retry by pressing "/ProgressMainQuest"')
                                
                            
                            await interaction.reply({content: null,embeds:[fightEmbed],components:[btnraw],files:[attachment]})
                            let filter = i => i.user.id === authorId
                                let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                        
                                collector.on('collect',async (btn) => {
                                    if(btn.isButton()){
                                        if(btn.customId === "btn_accept"){
                                            await btn.deferUpdate().catch(e => {})
                                            await interaction.editReply({embeds:[acceptEmbed],files:[attachment]})
                            
                                            
                                            await profileModel.updateOne({userID:interaction.user.id},{main_quest_phase:"3"})
                                            
                                       
                                        collector.stop()
                                            
                                        }
                                        else if(btn.customId === "btn_reject"){
                                            await btn.deferUpdate().catch(e => {})
                                            await interaction.editReply({embeds:[rejectEmbed],files:[attachment]})
                                            
        
                                            collector.stop()
                                        }
        
                                        
                                        
                                    }
                                      
                        
                           
                           
                            })
        
                            collector.on('end', () => {
                                interaction.editReply({components: [d_btnraw]})
                            })



                            }

                        else if(foundUser.main_quest_phase == "3"){
                            
                            let fightEmbed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('New Beginnings')
                            .setAuthor({
                                iconURL:interaction.user.displayAvatarURL(),
                                name:interaction.user.tag
                            })
                            .addFields([
                                {
                                    name: `Current Objective:`,
                                    value:`**Use "/explore" command to explore Aube town and complete all the quests.**`
                                }
                            ])
                            
                            
                            .setDescription(`finish all of the quests within Aube Town and meet this “Vice-Master” back in the Guild Outpost.`)
        
                            await interaction.reply({content: null,embeds:[fightEmbed]})
                            await profileModel.updateOne({userID:authorId},{location:"Aube Town Guild Outpost",main_quest_phase:"4"})
                        }
                        else if(foundUser.main_quest_phase == "4"){
                           if(foundUser.location == "Aube Town Guild Outpost"){
                            if(foundUser.completed_quests.includes("KS-TA-SQ1") && foundUser.completed_quests.includes("KS-TA-SQ2") && foundUser.completed_quests.includes("KS-TA-SQ3") && foundUser.completed_quests.includes("KS-TA-SQ4") && foundUser.completed_quests.includes("KS-TA-SQ5")){
                                let fightEmbed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('New Beginnings - COMPLETED')
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Use "/travel" command to travel to Zorya and proceed the main quest**`
                                    },{
                                        name:`Rewards:`,
                                        value:`**Obtained:**Title - "Hero of Aube"`
                                    }
                                ])
                                
                                
                                .setDescription(`You have proved yourself to the people of Aube and earned their praises even ridding them of the leader of Beer Buccaneers which is an outstanding feat in itself which lead to the mayor awarding you a new title!.As you go inside the guild outpost to meet the "vice-Master" who saved your life, to your dismay he is nowehere to be found however, you recieve a letter of recommendation along with a symbol branded into the envelope from the receptionist.\n\nYou try to analyse the symbol as it seems familiar to you but you can't remember.You are now all set to go to Zorya to participate in the Annual Guild Draft!`)
            
                                await interaction.reply({content: null,embeds:[fightEmbed]})
                                foundUser.completed_quests.push("Tutorial")
                                await profileModel.updateOne({userID:authorId},{current_title:"Hero of Aube",titles:foundUser.titles.push("Hero of Aube"),main_quest_phase:"1",completed_quests:foundUser.completed_quests,main_quest:"KS-ZS-MQ1"})
                            }
                            else{
                                interaction.reply({content:`you have not completed all the quests in Aube, please check the Questboard`,ephemeral:true})
                            }
                            
                           }
                           else{
                            interaction.reply({content:`You are not in the guild outpost, please go to the outpost to continue!`,ephemeral:true})
                           }
                            

                        }
                        }
                        else if(foundUser.main_quest == "KS-ZS-MQ1"){
                            if(foundUser.main_quest_phase == "1"){
                                if(foundUser.city_town == "Zorya"){
                                    let questEmbed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('A New Road')
                            .setAuthor({
                                iconURL:interaction.user.displayAvatarURL(),
                                name:interaction.user.tag
                            })
                            .addFields([
                                {
                                    name: `Current Objective:`,
                                    value:`**Go to the Guild District and use "/progressmainquest" command to continue**`
                                }
                            ])
                            
                            
                            .setDescription(`After bidding your farewells, you finally make it to the State of Zorya. You have one goal, to get to the Colosseum in the Guild District and participate in the annual Guild Draft using your letter of recommendation!.`)
                            
                            
                            await interaction.reply({content: null,embeds:[questEmbed]})
                            await profileModel.updateOne({userID:authorId},{main_quest_phase:"2"})

                                }
                                else{
                                    interaction.reply({content:`You are not in Zorya, please travel to Zorya to continue!`,ephemeral:true})
                           
                                }
                            }
                            else if(foundUser.main_quest_phase == "2"){
                                if(foundUser.location == "Guild District"){
                                    let btnraw= new MessageActionRow().addComponents([
                                        new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Proceed")])
                                       
            
                                        let d_btnraw = new MessageActionRow().addComponents([
                                            new MessageButton().setCustomId("dbtn_accept").setStyle("PRIMARY").setLabel("Proceed").setDisabled(true),
                                           
                                        ])
                                    let questEmbed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('A New Road')
                            .setAuthor({
                                iconURL:interaction.user.displayAvatarURL(),
                                name:interaction.user.tag
                            })
                            .addFields([
                                {
                                    name: `Current Objective:`,
                                    value:`**Proceed to Test your might**`
                                }
                            ])
                            
                            
                            .setDescription(`You gaze upon the towering Colosseum above you standing in all it's glory emanating the might of it's long history of legends who reigned in it's Arenas.You approach the guild official at the gate and show him your letter of recommendation, upon looking at it his expression changed to that of surprise before welcoming you politely inside the gates while explaining that the draft will take place in 3 rounds, the nature of which will be revealed on spot.He takes you to the area where the first selection round is scheduled.\n\nThe first round is held in the Colosseum’s courtyard. There are many participants here who have lined up to test their strength in front of the Revealing Tablet, a magical tablet which reacts to one's spyr and glows with an intensity proportional to one's strength.After waiting for a while,you are called upon to keep your hand on the revealing tablet,proceed to test your might.  `)
                            await interaction.reply({content: null,embeds:[questEmbed],components:[btnraw]})
                           
                            let acceptEmbed
                            if(foundUser.level < 5){
                                acceptEmbed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('A New Road')
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Press /progressmainquest to continue to round 2**`
                                    }
                                ])
                                
                                
                                .setDescription(`As you touch the magic stone on the revealing tablet,it begins to glow in a faint light.The crowd looks disappointed,many even mocking you behind your back some outright started laughing seeing your poor performance,“This person sucks, I can’t believe someone like him/her managed to get a letter of recommendation.” was the common consensus.You feel dejected and quitely move back pondering if you are even cut out for it.`)
                            }
                            else if(foundUser.level == 5){
                                acceptEmbed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('A New Road')
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Press /progressmainquest to continue to round 2**`
                                    }
                                ])
                                
                                
                                .setDescription(`As you touch the magic stone on the revealing tablet,it begins to glow in a bright light.The crowd is quite impressed as it an above average glow,. “Not bad at all, that was good.” was the common consensus.You feel confident enough to take on whatever awaits you in next round.`)
                            }
                            else{
                                acceptEmbed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('A New Road')
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Press /progressmainquest to continue to round 2**`
                                    }
                                ])
                                
                                
                                .setDescription(`As you touch the magic stone on the revealing tablet,it begins to glow in a blinding bright light covering the entire courtyard.The crowd is terrified with many having a look of utter surprise and horror on their faces seeing your might.“I can’t believe a person of this caliber is participating this year! I don’t think I have a chance.” was the common consensus.You are surprised by your own strength and feel very confident for the next round.`)
                            
                            }
                           
                            
                            let filter = i => i.user.id === authorId
                                let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                        
                                collector.on('collect',async (btn) => {
                                    if(btn.isButton()){
                                        if(btn.customId === "btn_accept"){
                                            await btn.deferUpdate().catch(e => {})
                                            await interaction.editReply({embeds:[acceptEmbed],components:[]})
                            
                                            
                                            await profileModel.updateOne({userID:interaction.user.id},{main_quest_phase:"3"})
                                            
                                       
                                        collector.stop()
                                            
                                        }
                                       
        
                                        
                                        
                                    }

                                    collector.on('end', () => {
                                        interaction.editReply({components: [d_btnraw]})
                                    })
                                })
                            
                            

                                }
                                else{
                                    interaction.reply({content:`You are not in the Guild District, please go to the Guild District to continue!`,ephemeral:true})
                           
                                }
                            

                        }
                        else if(foundUser.main_quest_phase == "3"){
                            if(foundUser.location == "Guild District"){
                                let btnraw= new MessageActionRow().addComponents([
                                    new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Fight")])
                                   
        
                                    let d_btnraw = new MessageActionRow().addComponents([
                                        new MessageButton().setCustomId("dbtn_accept").setStyle("PRIMARY").setLabel("Fight").setDisabled(true),
                                       
                                    ])

                                    const attachment = new MessageAttachment('assets/Monsters/starhound.jpeg')
                                    
                                let questEmbed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('A New Road')
                        .setAuthor({
                            iconURL:interaction.user.displayAvatarURL(),
                            name:interaction.user.tag
                        })
                        .setImage('attachment://starhound.jpeg')
                        .addFields([
                            {
                                name: `Current Objective:`,
                                value:`**Proceed to fight the Starhound**`
                            }
                        ])
                        
                        
                        .setDescription(`For your second round, you are called into the Colosseum’s inner ring and are asked to fight a Magical Beast, as part of your job as a Guild Ranger will be to fight and subdue Magical Beasts.You look at the cage placed before you hidden with a cover, you can sense the bloodlust radiating from the beast inside the cage. The cover is lifted and the audience burst with excitement at the look of a Starhound, a ferocious hunter from the depths of the forest of Ellior.You ready your weapon as you prepare to fight it.`)
                        await interaction.reply({content: null,embeds:[questEmbed],components:[btnraw],files:[attachment]})
                       
                        
                            
                        
                       
                        
                        let filter = i => i.user.id === authorId
                            let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                    
                            collector.on('collect',async (btn) => {
                                if(btn.isButton()){
                                    if(btn.customId === "btn_accept"){
                                        await btn.deferUpdate().catch(e => {})
                                        await interaction.editReply({files:[]})
                                        
                                        const attacker = Warrior.create(author)
                                        const monster = starHound.create()
                                        
                                        attacker.health=foundUser.health
                                                attacker.mana=foundUser.mana
                                                attacker.armor=foundUser.armour
                                                attacker.magicPower=foundUser.magicPower
                                                attacker.magicResistance = foundUser.magicResistance
                                                attacker.attackDamage=foundUser.attackDamage
                                                attacker.evasion=foundUser.evasion
                                                attacker.element = foundUser.elements[0]
                                                attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                                attacker.passive_skills = foundUser.passiveskills
                                                attacker.maxMana = foundUser.mana
                                                attacker.speed = foundUser.speed
                                                attacker.skills=foundUser.currentskills
                                        if(attacker.speed >= monster.speed){
                                            await new PvEDuel_MQuest({
                                                interaction,
                                                player1: attacker,
                                                player2: monster,
                                                speed:2,
                                            }).start()
                                            
                                        }
                                        else{
                                            await new PvEDuel_MQuest({
                                                interaction,
                                                player1: monster,
                                                player2: attacker,
                                                speed:2
                                            }).start()
                                        }
                                        
                                        await profileModel.updateOne({userID:interaction.user.id},{main_quest_phase:4})
                                        
                                   
                                    collector.stop()
                                        
                                    }
                                   
    
                                    
                                    
                                }

                                collector.on('end', () => {
                                    interaction.editReply({components: [d_btnraw]})
                                })
                            })
                        
                        

                            }
                            else{
                                interaction.reply({content:`You are not in the Guild District, please go to the Guild District to continue!`,ephemeral:true})
                       
                            }
                        

                    }
                    else if(foundUser.main_quest_phase == "4"){
                        if(foundUser.location == "Guild District"){
                            let btnraw= new MessageActionRow().addComponents([
                                new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Fight")])
                               
    
                                let d_btnraw = new MessageActionRow().addComponents([
                                    new MessageButton().setCustomId("dbtn_accept").setStyle("PRIMARY").setLabel("Fight").setDisabled(true),
                                   
                                ])
                                const attachment = new MessageAttachment('assets/NPCs/npcdave.jpeg')
                            
                    let questEmbed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('A New Road')
                    .setAuthor({
                        iconURL:interaction.user.displayAvatarURL(),
                        name:interaction.user.tag
                    })
                    .setImage('attachment://npcdave.jpeg')
                    .addFields([
                        {
                            name: `Current Objective:`,
                            value:`**Proceed to fight your opponent**`
                        }
                    ])
                    
                    
                    .setDescription(`It is time for the final round. The round where you must fight another participant who has made it as far as you. Before the fights start though, there is a short announcement where the Vice-Masters of the many guilds around the world enter the colosseum and take a seat. They would choose the best candidates and offer them a position in their own guild. Of course losers would not get picked.With a loud blow of a horn, your opponent approaches you from the opposite side of the arena.You ready your weapons and brace yourself for the fight `)
                    await interaction.reply({content: null,embeds:[questEmbed],components:[btnraw],files:[attachment]})
                   
                    
                        
                    
                   
                    
                    let filter = i => i.user.id === authorId
                        let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                
                        collector.on('collect',async (btn) => {
                            if(btn.isButton()){
                                if(btn.customId === "btn_accept"){
                                    await btn.deferUpdate().catch(e => {})
                                    await interaction.editReply({files:[]})
                                    const attacker = Warrior.create(author)
                                    const monster = Dave.create()
                                    attacker.health=foundUser.health
                                            attacker.mana=foundUser.mana
                                            attacker.armor=foundUser.armour
                                            attacker.magicPower=foundUser.magicPower
                                            attacker.attackDamage=foundUser.attackDamage
                                            attacker.magicResistance = foundUser.magicResistance
                                            attacker.evasion=foundUser.evasion
                                            attacker.element = foundUser.elements[0]
                                            attacker.maxHealth=getHealth(foundUser.level,foundUser.vitality)
                                            attacker.passive_skills = foundUser.passiveskills
                                            attacker.maxMana = foundUser.mana
                                            attacker.speed = foundUser.speed
                                            attacker.skills=foundUser.currentskills
                                    if(attacker.speed >= monster.speed){
                                        await new PvEDuel_MQuest({
                                            interaction,
                                            player1: attacker,
                                            player2: monster,
                                            speed:2,
                                        }).start()
                                        
                                    }
                                    else{
                                        await new PvEDuel_MQuest({
                                            interaction,
                                            player1: monster,
                                            player2: attacker,
                                            speed:2
                                        }).start()
                                    }
                                    
                                    await profileModel.updateOne({userID:interaction.user.id},{main_quest_phase:5})
                                    
                               
                                collector.stop()
                                    
                                }
                               

                                
                                
                            }

                            collector.on('end', () => {
                                interaction.editReply({components: [d_btnraw]})
                            })
                        })
                    
                    

                        }
                        else{
                            interaction.reply({content:`You are not in the Guild District, please go to the Guild District to continue!`,ephemeral:true})
                   
                        }
                    

                }
                else if(foundUser.main_quest_phase == "5"){
                    if(foundUser.location == "Guild District"){
                        const guild = sample(["Chimaera","Belenus","Tetsuryu","Fenris","Gleipnir","Hammerfaust","Eisenherz","Maledictus","Blackfin","Suncrest"])
                        let questEmbed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('A New Road')
                        .setAuthor({
                            iconURL:interaction.user.displayAvatarURL(),
                            name:interaction.user.tag
                        })
                        .addFields([
                            {
                                name: `Current Objective:`,
                                value:`**Visit your Guild Office to recieve further instructions**`
                            }
                        ])
                        
                        
                        .setDescription(`The crowd is in awe of your fighting prowess and bursts in an encouraging roar that echoed throughout the colosseum.Seeing your performance,${guild} Guild has chosen to recruit you into their ranks.`)
                        await interaction.reply({embeds:[questEmbed]})
                        await profileModel.updateOne({userID:interaction.user.id},{main_quest_phase:6,guild:guild,guild_class:"E",guild_rank:"Ranger"})
                    }
                    else{
                        interaction.reply({content:`You are not in the Guild District, please go to the Guild District to continue!`,ephemeral:true})
                    }
                    
                }
                    }

                       
                        else{
                            interaction.reply({content:"you currently have no ongoing main quest",ephemeral:true})
                        }

                    })


                }
                else{
                    interaction.reply({content:`you have not awakened yet!`,ephemeral:true})
                }
            }
        })


    })
    class PvEDuel_MQuest extends PvEDuel {
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

                         
                         await profileModel.updateOne({userID:authorID},{health:Math.round(0.1*loser.maxHealth),location:foundUser.location,dungeon:foundUser.dungeon,main_quest_phase:foundUser.main_quest_phase-1})
                     
                     }
                     
                         
     
                 }
             })
             await loser.onDeath(this.interaction, winner)
            
        }
    
    }