import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import {MessageActionRow} from 'discord.js'
import { MessageButton, MessageEmbed } from 'discord.js'
import { MessageAttachment } from 'discord.js'
import { PvEDuel } from './fight'
import { starHound } from '../src/age/monsters/ellior/Starhound'
import { Warrior } from '../src/age/heroes/warrior'
import getHealth from '../src/utils/getHealth'
import { Fiskille } from '../src/age/npc enemies/guildDraft_Dave'
import sample from 'lodash.sample'
import inventory from '../models/InventorySchema'
import { gilthunder_spear } from '../src/age/weapons/gilthunder_spear'
import { gilthunder_boltgun } from '../src/age/weapons/gilthunder_boltgun'
import { amberRing } from '../src/age/items/amber_ring'
import { Spectraling } from '../src/age/npc enemies/Spectraling'


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
                                .setDescription(`A duo of Beer Buccaneers are approaching you!\n\nPsst, listen here. Don’t worry, I’ve paused the time. Turns out I can do that. Anyway, I see that you’re about to enter into your very first fight. And…you don’t have a weapon equipped. Use the **/inventory** command and see what you’ve got!\n\nOnce you’ve rummaged through your belongings, use the **/equip** command followed by **weapon’s name** in the “object” field.\n\nOnce you’re all equipped, press the **Fight** button. Fights in Fable happen in your PMs. No seriously, that’s the only place where you can do them. Every time you begin a fight, the Fable bot shall text you in PMs.\n\nAlso all fights in Fable are permanently on **“auto mode”**. The bot follows an intelligent decision making system that ends the battle in the most efficient way possible. But hey, if it helps, you can play the entirety of Fable in your PMs.\n\nNow press the **fight** button, and don’t press the **Run** button, unless you’re a weakling.`)
            
                                let acceptEmbed = new MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('FIRST JOB')
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Defeat the Beer Buccaneers**`
                                    }
                                ])
                                .setDescription('You have decided to fight! Check your private messages! Remember: start the fight within the next 5 mins!')
            
                                let rejectEmbed = new MessageEmbed()
                                .setColor('RED')
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .setTitle('ERROR')
                                .setDescription('You cannot run away! Retry by pressing "/Progressmainquest"')
                                
                            
                            await interaction.reply({content: null,embeds:[fightEmbed],components:[btnraw],files:[attachment]})
                            let filter = i => i.user.id === authorId
                                let collector = await interaction.channel.createMessageComponentCollector({filter: filter})
                        
                                collector.on('collect',async (btn) => {
                                    if(btn.isButton()){
                                        if(btn.customId === "btn_accept"){
                                            await btn.deferUpdate().catch(e => {})
                                            await interaction.editReply({embeds:[acceptEmbed],files:[],components:[]})
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
                                const attachment2 = new MessageAttachment('assets/AubeTown/waking.jpeg')
                                let fightEmbed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('A DANGEROUS ENCOUNTER')
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
                                .setDescription(`As the lifeless bodies of the Beer Buccaneers sank to the ground, a fleeting glance revealed the aftermath of the frenzied clash. The Empral Brigade, stirred by your valiant display, had risen to the occasion, joining the chaotic fray. Alas, their numbers paled against the overwhelming horde, sinking ankle-deep into the mire. Even your skill and resolve would falter beneath such a weighty tide. The odds stood grimly stacked against you.\n\nNevertheless, your mind was resolute. Mr. Briggs, the very man who had sought your protection, had entrusted his safety to your capable hands. Determination surged within, urging you onward. Yet, in that critical moment, an icy grip clutched at your heart, paralyzing you with dread. A presence, immense and foreboding, wrapped its tendrils around your trembling form.\n\nYour gaze was drawn upward, fixing upon a shadow dancing in the air, drawing closer with each passing heartbeat. It was a Ghorgon, tainted by the malicious touch of the Nightmares. Its colossal frame pounded mercilessly upon both Beer Buccaneers and Empral Brigade soldiers alike, obliterating all in its path. None stood a chance against such ferocity.\n\nThen, as if guided by a malevolent intelligence, its gaze locked onto you, a hapless target in its sights. Like a primordial force unleashed, it lunged forward with relentless speed. There was no escape, no reprieve from this impending confrontation.\n\nSummoning every ounce of resolve, you readied your arms, accepting the cruel reality that escape was not an option. For in this dark and treacherous moment, all that remained was to confront the nightmarish embodiment of terror hurtling towards you.`)
            
                                let acceptEmbed = new MessageEmbed()
                                .setColor('GREEN')
                                .setTitle('FINALLY AWAKE')
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .setImage('attachment2://waking.jpeg')
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Press "/Progressmainquest" to continue**`
                                    }
                                ])
                                .setDescription(`As consciousness beckoned you from the depths of slumber, the sterile air of the infirmary engulfed your senses. Groggily, your eyes fluttered open, drawn to the weight pressing against your legs. There, in an innocent repose, lay your childhood companion Emyr, his presence a comforting balm amidst the stark clinical surroundings. The nurse's voice, laden with concern, sliced through the haze of your awakening.\n\n“Ah, I see you are awake. You were out for a while there, like four days?" she spoke, her tone heavy with gravity.Your mind strained to piece together the fragments of the puzzle, weaving together the events that had unfolded during your unconscious state. It was Mr. Sebas, the esteemed Butler of the Mayor, who had come to your rescue. He had just returned from his untimely delegation to the Capital. Once a celebrated Ajin in his own right, his absence from Aube Town had left it vulnerable to the marauding Beer Buccaneers. Now, his very presence instilled fear in their hearts.\n\nBut the true testament of Mr. Sebas' power came to light as the Ghorgon, a monstrous embodiment of the Nightmare, clashed with the force of his indomitable will. He held the abomination at bay, a perilous task even for the most esteemed Ajins, until he ultimately felled the beast, ensuring victory in the face of unspeakable darkness.\n\nSuch was the remarkable backdrop against which your own valor shone. Mr. Sebas, impressed by your unwavering defiance in the face of certain doom, awaited your presence. He could be found within the enigmatic confines of the Town Library, a sanctuary teeming with untold secrets and unspoken debts.\n\nWith a reluctant yet understanding nod, you decided to let Emyr continue his well-deserved respite, recouping the sleep lost during his vigil. There would be time to express your gratitude to him later. For now, the path led to Mr. Sebas, a figure enshrouded in enigma and the embodiment of a debt repaid in kind.`)
            
                                let rejectEmbed = new MessageEmbed()
                                .setColor('RED')
                                .setTitle('ERROR')
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .setThumbnail('attachment://Ghorgon.jpeg')
                                .setDescription('You cannot run away! Retry by pressing "/Progressmainquest"')
                                
                            
                            await interaction.reply({content: null,embeds:[fightEmbed],components:[btnraw],files:[attachment]})
                            let filter = i => i.user.id === authorId
                                let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                        
                                collector.on('collect',async (btn) => {
                                    if(btn.isButton()){
                                        if(btn.customId === "btn_accept"){
                                            await btn.deferUpdate().catch(e => {})
                                            await interaction.editReply({embeds:[acceptEmbed],files:[attachment2]})
                            
                                            
                                            await profileModel.updateOne({userID:interaction.user.id},{location:"Town Centre",main_quest_phase:"3"})
                                            
                                       
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
                            if(foundUser.location == "Town Centre"){
                                const attachment = new MessageAttachment('assets/AubeTown/sebas_intro.jpeg')
                            let fightEmbed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('A NEW ROAD')
                            .setImage('attachment://sebas_intro.jpeg')
                            .setAuthor({
                                iconURL:interaction.user.displayAvatarURL(),
                                name:interaction.user.tag
                            })
                            .addFields([
                                {
                                    name: `Current Objective:`,
                                    value:`**Press "/Progressmainquest" to continue**`
                                }
                            ])
                            
                            
                            .setDescription(`In the Town’s Library, an imposing figure stood before you—an elderly man donned in a black suit, his unwavering gaze piercing your very being. This was Mr. Sebas, the enigmatic savior who had plucked you from the clutches of danger.\n\nHis voice resonated with an undertone of urgency and a glimmer of intent. He spoke of a selfish desire to witness something first hand, leaving you to ponder the mysteries that surrounded him.\n\nYou expressed your gratitude for his life-saving intervention, yet he brushed aside such sentiments, delving into the enigma of Spyr—a magical essence that permeated Vearth's air, ground, and all living creatures. Only a select few, known as Ajins, possessed the rare ability to harness this power.\n\nAs Mr. Sebas probed your encounter with the brigands, you denied any knowledge of Spyr manipulation, attributing your strength to years spent toiling on a farm, protecting it from Boaars. However, doubts festered within Mr. Sebas, for no ordinary individual could have dispatched the brigands with such ease.\n\nHis conviction unwavering, Mr. Sebas declared that you were no ordinary boy, but rather an Ajin with untapped potential. He insisted that your current path in the town did not align with your true destiny, offering a proposition fraught with danger and the promise of a life forever altered.\n\nCaught in a whirlwind of amazement and uncertainty, you grappled with the idea of being an Ajin—a realm of power, wealth, and fame. The revelation stirred questions about your past, about Mr. Briggs and Emyr, and the possibility of realizing your true identity. A multitude of inquiries raged within your mind, demanding answers, as the weight of an important decision pressed upon you. Do you really intend to walk this newfound road of an Ajin?\n\n[Read extended interaction with character dialogue](https://docs.google.com/document/d/1chVL2RCsJz47ql3zVwBzBY47dTlIgAM5V-c2b52B5Pk/edit?usp=sharing)📜`)
        
                            await interaction.reply({content: null,embeds:[fightEmbed],files:[attachment]})
                            await profileModel.updateOne({userID:authorId},{main_quest_phase:"4"})
                            }
                            else{
                                interaction.reply({content:`After waking up in the infirmary, you find your childhood friend Emyr by your side, and the nurse informs you that Mr. Sebas, the Mayor's Butler, saved you from the Beer Buccaneers and the Ghorgon. He was impressed by your courage, and awaits your presence at the Town Library. You decide to leave Emyr to rest and head to meet Mr. Sebas to express your gratitude.\n**(Enter /progressmainquest in Town Centre to continue.)**`,ephemeral:true})
                            }
                            
                        }
                        else if(foundUser.main_quest_phase == "4"){
                            if(foundUser.location == "Town Centre"){
                                const attachment = new MessageAttachment('assets/AubeTown/sebas_zeal.jpeg')
                                let fightEmbed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('A NEW ROAD')
                            .setImage('attachment://sebas_zeal.jpeg')
                            .setAuthor({
                                iconURL:interaction.user.displayAvatarURL(),
                                name:interaction.user.tag
                            })
                            .addFields([
                                {
                                    name: `Current Objective:`,
                                    value:`**Press "/Progressmainquest" to continue**`
                                }
                            ])
                            
                            
                            .setDescription(`You stand before Mr. Sebas, your voice heavy with determination. You demand to know the path of the Ajin, your words carrying a weight that cannot be ignored.Sebas acknowledges your decision. He prepares to forcefully unlock the dormant Spyr Cores within you, infusing your body with his own power. Normally, these Cores would awaken gradually through training and maturation, but what is lost can never be fully regained. He leaps backward, assuming a combat stance, ready to demonstrate the technique.\n\nA violent tremor rocks the library, cracking floorboards and thrashing windows. The air thickens with an aura of dread emanating from Mr. Sebas. Fear envelopes you, reaching depths of terror you never thought possible. The weight of impending doom settles upon you, as if Death himself holds you in his grasp. To take another step would mean certain death.\n\nBut Sebas's voice cuts through the suffocating fear, commanding you not to hesitate. His words bear a power that threatens to buckle your knees, his Spyr pulsating with a force that could tear you apart. You struggle to maintain your composure, soaked in perspiration, barely standing.\n\nAgainst all instincts, you muster the courage to step forward, defying the inevitability of your demise. Sebas's excitement surges as he launches his bloodlust-infused fist towards you, poised to strike.\n\nTime slows to a crawl, and memories flash before your eyes. The temptation to surrender, to close your eyes and embrace your fate, is overwhelming. Yet, you resist. Sebas's attack grazes you, but something within you prevents his touch. Your own Spyr surges, mingling with the air and shielding you from harm.\n\nSebas congratulates you on ascending into a new realm. You sink to your knees and ask him about his true identity. He responds cryptically, claiming to be a mere old man who knows how to handle himself.\n\n[Read extended interaction with character dialogue](https://docs.google.com/document/d/1c8ZTDMkJoTW2HLOAKV9sqZL-iqWzOUQIJDotoX4bN4Y/edit?usp=sharing)📜`)
        
                            await interaction.reply({content: null,embeds:[fightEmbed],files:[attachment]})
                            await profileModel.updateOne({userID:authorId},{main_quest_phase:"5"})
                            }
                            else{
                                interaction.reply({content:`In the Town's Library, you meet Mr. Sebas, the mysterious figure who saved you. He introduces the concept of Spyr, a magical essence, and suspects you might be an Ajin. The revelation stirs questions about your past and potential destiny. Faced with an important decision, you must choose whether to embrace the path of an Ajin or stay on your current course.\n**(Enter /progressmainquest in Town Centre to continue.)**`,ephemeral:true})
                            }
                            
                        }
                        else if(foundUser.main_quest_phase == "5"){
                            if(foundUser.location == "Town Centre"){
                                let classText 
                            if(foundUser.class == "Gladius"){
                                classText = `Glaidus - A Category of Ajins who are masters in using all types of Melee Weapons.`
                            }
                            else if(foundUser.class == "Noir"){
                                classText = `Noir - A Category of Ajins that specialise in the use of Dark Arts and stealth`
                            
                            }
                            else if(foundUser.class == "Magus"){
                                classText = `Magus - A Category of Ajins who are experts in Conjuring Spyr`
                            
                            }
                            else if(foundUser.class == "Buushin"){
                                classText = `Buushin - A Category of Ajins who are experts in manifesting Spyr into their physical attacks`
                            
                            }
                            else if(foundUser.class == "Dragoon"){
                                classText = `Dragoon - A Category of Ajins who are experts in the use of Ranged Weapons`
                            
                            }
                            
                            let fightEmbed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('A DIFFERENT ROAD')
                            .setAuthor({
                                iconURL:interaction.user.displayAvatarURL(),
                                name:interaction.user.tag
                            })
                            
                            .addFields([
                                {
                                    name: `Current Objective:`,
                                    value:`**Press "/Progressmainquest" to continue**`
                                },
                                {
                                    name:'**REWARDS:**',
                                    value:`Obtained **Keystone Journal**!\nYou can view your stats by using **/stats** command`
                                }
                            ])
                            
                            
                            .setDescription(`You grab Mr. Sebas’ hand and get up. He tells you that your body has now transformed to a state where it will be able to harness Spyr. And after looking at your aura, he further deduces that you were born with the ${foundUser.elements[0]} Element’s Affinity. Furthermore he determines that you are a ${classText}.\n\nMr. Sebas walks to his desk and picks up a “Keystone Journal”. It is apparently an essential item that is carried by most Ajins in the world. Its speciality is that there is a Spyr Keystone embedded in its center which is capable of determining the Power Level of an Ajin. All you have to do is open the Keystone Journal and place your hand on the Keystone. It will automatically determine your power level, and show you your strengths and weaknesses. The other part of the Journal is a place where you note down your personal details, accomplishments and goals.\n\nMr. Sebas also informs you that there is much to learn about Spyr but there is very little time available. As an Ajin, the right thing for you to do is enroll yourself as a Ranger in one of the many Guilds of the Ranger’s Association. All the best Ajins in the world are there. But it isn’t as easy as simply applying for a job. To get into a Guild, you need to prove yourself worthy by doing Community Services throughout the year i.e helping strangers, protecting the weak, fighting crime and slaying dangerous Spyriths. Doing so will earn you merit and after earning a certain amount of merit, you may be given a “Letter of Recommendation” by one of the Guild’s Scouts.\n\nOnce you receive a Letter of Recommendation, you can partake in the Annual Guild Draft. In this event, hopeful Ajins from all around the country participate in order for them to be chosen as members of the Guilds that are willing to recruit new Ajins. Unfortunately the event is right around the corner and you have 0 merit. But you are in luck because Mr. Sebas is a Guild Scout. He is willing to give you a Letter of Recommendation if you can help everyone in Aube Town.\n\nHe asks you to hurry and make way towards the local Guild Outpost. There you may find few leads about the townspeople who require aid. He also recommends you to visit the bar, and talking to the locals in Aube Town in order to find Quests.\n\nHe knows this is all too sudden and there isn’t a fair amount of time left, but he thinks you can make it. If it helps, you can check out the books in his library to aid you.`)
        
                            await interaction.reply({content: null,embeds:[fightEmbed]})
                            await profileModel.updateOne({userID:authorId},{main_quest_phase:"6"})
                            }
                            else{
                                interaction.reply({content:`Determined to know the path of the Ajin, you face Mr. Sebas. He agrees to unlock your Spyr Cores forcibly, a process that would otherwise occur gradually. The library trembles as Sebas demonstrates his power. Fear grips you, but his command pushes you forward. You withstand his attack, and your own Spyr protects you. Sebas reveals little about himself, leaving you with lingering questions.\n**(Enter /progressmainquest in Town Centre to continue.)**`,ephemeral:true})
                            }
                            
                        
                        }
                        else if(foundUser.main_quest_phase == "6"){
                            let fightEmbed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('TUTORIAL COMPLETE')
                            .setAuthor({
                                iconURL:interaction.user.displayAvatarURL(),
                                name:interaction.user.tag
                            })
                            .addFields([
                                {
                                    name: `Current Objective:`,
                                    value:`**Press "/Progressmainquest" in "Aube Town Guild Outpost" to continue**`
                                }
                            ])
                            
                            
                            .setDescription(`*“Psst, hey! Yeah that’s right. I paused the time again. Just wanted to let you know that the universe is done holding your hand. From here on, it's all you. But…I may have sprinkled a few hints here and there for you yet, so look out. I wish you good luck!”*\n\nYou can now freely explore the world, and that too at your own leisure. Use the /walk command to see available locations you can walk to, in Aube Town. And use the /travel command to see available locations you can travel to, from Aube Town. The locations displayed will often show destinations that are nearby to your current location. In this case, since you are in Aube Town, you will see places to visit inside Aube Town as well as its exteriors.\n\nWhen you visit a location, you can actually explore them. Use the command /explore and it will let you explore the location you are currently in. For interiors, this command simply gives you more information about the place, but when you use it in the outskirts, like Forests, Caves or Mountains - you will actively start exploring it. Let’s say you are in a Forest, entering the /explore command will have you explore the place. This exploration attempt may end up in you finding crafting materials or run into dangerous Spyriths. You can indefinitely explore the outskirts. Just enter /explore repeatedly.\n\nAlso you should talk to the locals in every town and city. They have interesting gossip, knowledge, and items to share with you. You can do this by entering /talktolocals. Just like the explore button, you can enter this command indefinitely until you have talked to everyone new. There are about 10 strangers in every town and city who want to talk to you. Some of these people may be in a Bar/Inn mind you.`)
        
                            await interaction.reply({content: null,embeds:[fightEmbed]})
                            await profileModel.updateOne({userID:authorId},{main_quest_phase:"7"})
                        }
                        else if(foundUser.main_quest_phase == "7"){
                            if(foundUser.location == "Aube Town Guild Outpost"){
                            let fightEmbed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('THE STARTING LINE')
                            .setAuthor({
                                iconURL:interaction.user.displayAvatarURL(),
                                name:interaction.user.tag
                            })
                            .addFields([
                                {
                                    name: `Current Objective:`,
                                    value:`**Press "/Progressmainquest" in "Aube Town Guild Outpost" to continue**`
                                }
                            ])
                            
                            
                            .setDescription(`Upon entering the bustling Ranger Association's Guild Outpost in Aube Town, you are greeted by Eupheme and Andan, the caretakers. Expressing your desire to earn merit and obtain a letter of recommendation, you learn that the crowded outpost is a result of a recent Nightmare occurrence outside the town, and many Challengers are here to capitalize on the situation.\n\nAndan, with a disapproving tone, warns that starting now might be too late. The quests offering the most merit have already been taken, leaving only a few remaining, insufficient to meet your needs. Eupheme, however, believes there might be one involving the Lager Family.\n\nAndan expresses skepticism, stating that high-profile Ajins have already taken that quest, making it a dangerous race he can't entrust to a newcomer. After a moment of tension, he reluctantly agrees to let you take the high-merit quest only after completing all the remaining quests in Aube.\n\nYou agree to his demands, and step towards the Quest Board in order to check the available Quests.`)
        
                            await interaction.reply({content: null,embeds:[fightEmbed]})
                            await profileModel.updateOne({userID:authorId},{main_quest_phase:"8"})
                            }
                            else{
                                interaction.reply({content:`After gaining the ability to harness Spyr and awakening as an Ajin, Mr. Sebas advises you to enroll as a Ranger in a Guild. To earn the "Letter of Recommendation," you must perform Community Services and gain merit. With the Annual Guild Draft approaching, he suggests helping Aube Town's residents to earn the letter. You head to the Guild Outpost to find quests, and Mr. Sebas offers assistance from his library. Ready to prove yourself, you set out on your journey to secure a place among esteemed Ajins in the Guilds.\n**(Enter /progressmainquest in Aube Town Guild Outpost to continue.)**`,ephemeral:true})
                            }
                            
                        }
                        else if(foundUser.main_quest_phase == "8"){
                            if(foundUser.location == "Aube Town Guild Outpost"){
                            let fightEmbed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('THE STARTING LINE')
                            .setAuthor({
                                iconURL:interaction.user.displayAvatarURL(),
                                name:interaction.user.tag
                            })
                            .addFields([
                                {
                                    name: `Current Objective:`,
                                    value:`Complete all available Side Quests in Aube Town and speak to Andan.`
                                }
                            ])
                            
                            
                            .setDescription(`At the Questboard, Eupheme informs you that Ajins who want to become Guild Rangers are referred to as the Challengers. Hence, they can only undertake E Class Quests to gain merit and receive a Letter of Recommendation. However, Guild caretakers like Eupheme and Andan may allow Challengers to take on D Rank Quests if they assess their strength as sufficient.\n\nHowever, the race to merit does not end here. Even as a Ranger, you will take on Quests that are on par with your strength, and only gradually will you be allowed to take on more threatening Quests as you are promoted within your Guild. Your merit in the Guild will be used to measure your strength and capability. As you gain more merit and fame by completing various quests, your power, influence and rank will increase in the Guild.\n\nUse /questboard to access the Guild’s Quest Board when visiting a Guild Outpost. You can view the various quests available to you and can take up any number of quests you like; however you can only focus on completing one quest at a time. There are two kinds of quests - 1) Main Quests 2) Side Quests\n\nYou only ever have a single Main Quest going on. But, you will have taken up several Side Quests too. In the case of Side Quests, you will have to pick one and complete it before you can start another.You can choose which active Side Quest to do using the /choose_sidequest command as long as you don't have an activated SideQuest.This will not impact your Main Quest at all, because you can have 1 Side Quest active at all time alongside your Main Quest.\n\nThere are also "Hunting Contracts" available in Guild Outposts beside the Questboard and can be accessed by /hunting_contract command. These are special contracts either directly issued by the Ranger Association or Personally issued by other relevant authorities, These are bounties for hunting specific Spyriths due to various reasons.Completing Hunting Contracts are a good way to earn merit and coins but remember, only one contract can be taken at a time.\n\nUse /progresssidequest to progress in your Side Quests. If you feel stuck or forget what you’re supposed to be doing, you can use /questinfo. Also ask for help from other Ajins.`)
        
                            await interaction.reply({content: null,embeds:[fightEmbed]})
                            await profileModel.updateOne({userID:authorId},{main_quest_phase:"9"})
                            }
                            else{
                                interaction.reply({content:`You are not in the Guild Outpost, please go to the outpost to continue!`,ephemeral:true})
                            }
                            
                        }
                        else if(foundUser.main_quest_phase == "9"){
                           if(foundUser.location == "Aube Town Guild Outpost"){
                            if(foundUser.completed_quests.includes("KS-TA-SQ1") && foundUser.completed_quests.includes("KS-TA-SQ2") && foundUser.completed_quests.includes("KS-TA-SQ4")){
                                let chosenWeapon
                                let weaponbtn= new MessageActionRow().addComponents([
                                    new MessageButton().setCustomId("spear").setStyle("PRIMARY").setLabel("Spear"),
                                    new MessageButton().setCustomId("boltgun").setStyle("PRIMARY").setLabel("BoltGun"),])
                                    
                                let fightEmbed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle(`AUBE TOWN'S HERO`)
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Choose your preferred Weapon**`
                                    }
                                ])
                                
                                
                                .setDescription(`As you return to the Guild Outpost after helping everyone in Aube Town, the atmosphere is subdued with most Challengers gone. Andan shares a poignant tale of his reckless, brave father who faced danger fearlessly but tragically lost his life. He sees that same spark of bravery in you. Andan presents a grey box containing his father's prized weapons, allowing you to choose one before embarking on the final Quest. The weight of history and destiny rests upon your decision, with the potential to leave a lasting mark on the world. There are two prized weapons in front of you. Which will you pick?\n\n1) Gilthunder's Spear (Melee): +5 Vigour\nElement: Volt | Skill: Thundering Blow | POW: 30,\n\n2) Gilthunder's Boltgun (Ranged): +5 Arcana\nElement: Volt | Skill: Electro Burst | POW: 30.\n\n[Read extended interaction with character dialogue](https://docs.google.com/document/d/1UogBXgr0ugJNRRtH63H6EseVA4n7tSC17okSsghTXxQ/edit?usp=sharing)📜`)

                                              await interaction.reply({content: null,embeds:[fightEmbed],components:[weaponbtn]})
                                let filter = i => i.user.id === authorId
                                let collector = await interaction.channel.createMessageComponentCollector({filter: filter})


                                collector.on('collect',async (btn) => {
                                    if(btn.isButton()){
                                        if(btn.customId === "spear"){
                                            await btn.deferUpdate().catch(e => {})
                                            chosenWeapon = "Gilthunder's Spear"
                                            let proceedembed = new MessageEmbed()
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
                                
                                
                                .setDescription(`**${chosenWeapon} has been added to your inventory!**\n**A new sidequest "AubeTown's Hero" has been added!**\n\nAfter choosing a prized weapon, Andan expresses a mix of nostalgia and concern for its future. He and Eupheme then reveal the details of the Quest you're about to undertake, involving the prestigious Lager Family and a feud with the Tavern owner over missing consignments of the famed drink, Backbreaker. The Guild has taken over the Quest due to its importance, suspecting a third party's involvement. Your mission is to help the Guild resolve the conflict and uncover the truth. Andan advises starting by speaking to the Tavern owner. As you prepare to embark on this enigmatic journey, the weight of the task ahead lingers in the air.\n\n[Read extended interaction with character dialogue](https://docs.google.com/document/d/1UogBXgr0ugJNRRtH63H6EseVA4n7tSC17okSsghTXxQ/edit?usp=sharing)📜`)

                  
                                            inventory.findOne({userID:authorId},async function(err,foundInventory){
                                                const newWeapon = {
                                                    name:gilthunder_spear,
                                                    quantity:Number(1)
                                                }
                                                foundInventory.inventory.weapons.push(newWeapon)
                                                await inventory.updateOne({userID:authorId},foundInventory)
                                                await interaction.editReply({embeds:[proceedembed],components:[]})
                                                foundUser.side_quest.push("KS-TA-SQ5")
                                                await profileModel.updateOne({userID:authorId},{main_quest_phase:"10",side_quest:foundUser.side_quest})
                                            })
                                        }
                                        else if(btn.customId === "boltgun"){
                                            await btn.deferUpdate().catch(e => {})
                                            chosenWeapon = "Gilthunder's Boltgun"

                                            let proceedembed = new MessageEmbed()
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
                                
                                
                                .setDescription(`**${chosenWeapon} has been added to your inventory!**\n**A new sidequest "AubeTown's Hero" has been added!**\n\nAfter choosing a prized weapon, Andan expresses a mix of nostalgia and concern for its future. He and Eupheme then reveal the details of the Quest you're about to undertake, involving the prestigious Lager Family and a feud with the Tavern owner over missing consignments of the famed drink, Backbreaker. The Guild has taken over the Quest due to its importance, suspecting a third party's involvement. Your mission is to help the Guild resolve the conflict and uncover the truth. Andan advises starting by speaking to the Tavern owner. As you prepare to embark on this enigmatic journey, the weight of the task ahead lingers in the air.\n\n[Read extended interaction with character dialogue](https://docs.google.com/document/d/1UogBXgr0ugJNRRtH63H6EseVA4n7tSC17okSsghTXxQ/edit?usp=sharing)📜`)

                  
                                            inventory.findOne({userID:authorId},async function(err,foundInventory){
                                                const newWeapon = {
                                                    name:gilthunder_boltgun,
                                                    quantity:Number(1)
                                                }
                                                foundInventory.inventory.weapons.push(newWeapon)
                                                await inventory.updateOne({userID:authorId},foundInventory)
                                                await interaction.editReply({embeds:[proceedembed],components:[]})
                                                foundUser.side_quest.push("KS-TA-SQ5")
                                                await profileModel.updateOne({userID:authorId},{main_quest_phase:"10",side_quest:foundUser.side_quest})
                                            })
                                        }
                                    }
                                })
                                
                                
                            }
                            else{
                                interaction.reply({content:`you have not completed all the quests in Aube, please check the Questboard`,ephemeral:true})
                            }
                            
                           }
                           else{
                            interaction.reply({content:`In the bustling Ranger Association's Guild Outpost, you meet Eupheme and Andan, the caretakers. They inform you that many Challengers have flocked to Aube Town due to a recent Nightmare occurrence outside the town, resulting in limited available quests for merit. Andan is skeptical about your chances, but Eupheme suggests a quest involving the Lager Family. After tense negotiations, Andan agrees to let you take a high-merit quest, but only after completing all remaining quests in Aube. Determined, you accept the challenge and head to the Quest Board to check the available quests.\n**(Enter /progressmainquest to continue when you have completed all the side quests available in Aube Town, when in the Guild Outpost.)**`,ephemeral:true})
                           }
                            

                        }
                        else if(foundUser.main_quest_phase == "10"){
                            if(foundUser.location == "Aube Town Guild Outpost"){
                                if(foundUser.completed_quests.includes("KS-TA-SQ5")){
                                    let fightEmbed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle(`A HERO'S LEGACY`)
                            .setAuthor({
                                iconURL:interaction.user.displayAvatarURL(),
                                name:interaction.user.tag
                            })
                            .addFields([
                                {
                                    name: `Current Objective:`,
                                    value:`**Press /progressmainquest in Castellan Fields to say goodbye to Mr.Briggs**`
                                },
                                {
                                    name: `Rewards`,
                                    value:`**Obtained a new title: "Hero of Aube"\nYou recieved 15 Merit**`
                                  
                                }
                            ])
                            
                            
                            .setDescription(`In the aftermath of a harrowing battle against the nefarious Beer Buccaneers and their leader, Captain Crook, you bring them bound and guilty to the stunned Guild Outpost. Andan and Eupheme are left speechless, their disbelief etched upon their faces like a haunting specter. As the Mayor and Mr. Sebas appear, it becomes evident that the enigmatic Ajin had foreseen this outcome, orchestrating the Mayor's presence in this fateful moment.\n\n With unwavering resolve, you lay bare all your chilling findings before the Mayor, leaving him largely impressed and indebted to your valorous actions. The dark specter of raids from the Beer Buccaneers will haunt Aube Town no more, and the feud between the Tavern owner and the Lager Family meets its resolution.\n\nAs the Mayor publicly bestows upon you the illustrious title of "Hero of Aube Town," your heart swells with pride, a testament to your courage in the face of unimaginable darkness. A jubilant triumph amid the shadows, symbolizing the beginning of a new era for Aube Town.\n\nWith the Letter of Recommendation now in your possession, Mr. Sebas' guidance points you toward the Stateship of Zorya, where the Annual Guild Draft awaits. The urgency leaves no time for fond recollections, urging you to bid farewell to your companions, Mr. Briggs and Emyr, with a sense of bittersweet finality.\n\nAs you embark on this new chapter, your heart weighs heavy with the echoes of your recent trials, and a faint premonition lingers within—the haunting sense that your journey is far from over, and that darker secrets yet await you in the realms beyond. The path to Zorya beckons, its mysteries shrouded in uncertainty and enigma, while the legacy of the Hero of Aube Town begins to take root, leaving an indelible mark upon the shadows of Aube's history.`)
        
                            await interaction.reply({content: null,embeds:[fightEmbed]})
                            
                            foundUser.titles.push("Hero of Aube")
                            await profileModel.updateOne({userID:authorId},{current_title:"Hero of Aube",titles:foundUser.titles,main_quest_phase:"11",merit:foundUser.merit+15})
                                }
                                else{
                                    interaction.reply({content:`You have not completed the quest "Aube Town's Hero" yet, complete it to continue!`,ephemeral:true})
                                }
                            }
                            else{
                                interaction.reply({content:`Armed with newfound knowledge of harnessing Spyr and unlocking dormant abilities, you stand before the rusted steel gates of the Abandoned Castle, clutching the key in your arms. An undeniable sense of trepidation fills your heart as you brace yourself for the daunting challenges that await within.After defeating the Beer Buccaneers and Captain Crook, you must present them as captives at the Guild Outpost.\n**(Press /progressmainquest in Aube Town Guild Outpost to continue)**`,ephemeral:true})
                            }

                        }
                        else if(foundUser.main_quest_phase == "11"){
                            if(foundUser.city_town == "Castellan Fields"){
                                let fightEmbed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle(`GOODBYES`)
                            .setAuthor({
                                iconURL:interaction.user.displayAvatarURL(),
                                name:interaction.user.tag
                            })
                            .addFields([
                                {
                                    name: `Current Objective:`,
                                    value:`**Find where Emyr is and Press /progressmainquest to say goodbye to Emyr**`
                                }
                            ])
                            
                            
                            .setDescription(`In the solitude of Castellan Fields, you encounter Mr. Briggs, a man who once owned great lands and farms in the South but lost everything to a Nightmare. He reflects on his past and how he supported and mentored you, treating you like a son, even when you chose a different path. You confide in him about your journey to become a true Ajin through the Annual Guild Draft, vowing to protect others from suffering and loss.\n\nTouched by your determination, Mr. Briggs reveals he always knew you were an Ajin but promised your uncle to protect you. Now recognizing your strength, he expresses pride in your growth and wishes you well, hoping you become an Ajin he can proudly speak of to others. As the sun sets over Castellan Fields, a bond of mentorship and love connects you both, setting the stage for a new chapter in your intertwined destinies.\n\n**Received 500C!**\n\n[Read extended interaction with character dialogue](https://docs.google.com/document/d/1ifxvXec4g57yA-8WC7gBVSQZak-WTATyj_p8MdzlBvc/edit?usp=sharing)📜`)
                            
                            await interaction.reply({content: null,embeds:[fightEmbed]})
                            foundUser.coins+=500
                            await profileModel.updateOne({userID:authorId},{coins:foundUser.coins,main_quest_phase:"12"})
                            
                            }
                            else{
                                interaction.reply({content:`After defeating the Beer Buccaneers and Captain Crook, you present them as captives at the Guild Outpost, stunning Andan and Eupheme. The Mayor and Mr. Sebas, who had foreseen the outcome, are present as well. You reveal your discoveries to the Mayor, leaving him impressed and grateful. With the threat of raids now eliminated, the feud between the Tavern owner and the Lager Family finds resolution. The Mayor publicly declares you the "Hero of Aube Town'' and grants you the Letter of Recommendation. Mr. Sebas advises you to head to the Stateship of Zorya for the Annual Guild Draft. Amid the celebration, you feel compelled to bid farewell to Mr. Briggs and Emyr before embarking on the next leg of your journey. The shadows of uncertainty and darker secrets loom, as you take the path that awaits you beyond Aube Town.\n**(Press progressmainquest in Castellan Fields to continue)**`,ephemeral:true})
                            }
                        }
                        else if(foundUser.main_quest_phase == "12"){
                            if(foundUser.location == "Town Centre"){
                                let fightEmbed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle(`GOODBYES`)
                            .setAuthor({
                                iconURL:interaction.user.displayAvatarURL(),
                                name:interaction.user.tag
                            })
                            .addFields([
                                {
                                    name: `Current Objective:`,
                                    value:`**Use "/travel" and choose the Stateship of Zorya to continue..**`
                                }
                            ])
                            
                            
                            .setDescription(`You encounter Emyr atop a building at the Town Centre's entrance. He expresses concern and gratitude for your past actions, and you reveal your decision to participate in the Annual Guild Draft to become a Guild Ranger. Emyr shares his own aspirations, aiming to join the Coalition of Fargon to pursue intriguing projects. Both friends encourage and support each other, and Emyr gifts you an Amber Ring for your journey. With a warm farewell, you set off to Zorya, knowing that the bond between friends will guide you through the challenges ahead.\n\n**Received Amber Ring x1!**\n\n[Read extended interaction with character dialogue](https://docs.google.com/document/d/1RLJQmWycqXClKdKsRIrv0QFm1_jd3Up9L2E_79iHW8o/edit?usp=sharing)📜`)
        
                            await interaction.reply({content: null,embeds:[fightEmbed]})
                            inventory.findOne({userID:authorId},async function(err,userProfile){

                                const foundring = userProfile.inventory.items.find(object => object.name.name.toLowerCase() === "amber ring")
                                if(foundring){
                                    foundring.quantity+=1
                                }
                                else{
                                    const reward = {
                                        name:amberRing,
                                        quantity:1
                                    }
                                    userProfile.inventory.items.push(reward)
                                }
                                await inventory.updateOne({userID:authorId},userProfile)
                            
                            })
                           
                            foundUser.completed_quests.push("Tutorial")
                            await profileModel.updateOne({userID:authorId},{main_quest_phase:"1",completed_quests:foundUser.completed_quests,main_quest:"KS-ZS-MQ1"})
                            }
                            else{
                                interaction.reply({content:`You looked everywhere but couldn't find Emyr, perhaps he is somewhere else.You must find him to bid him farewell.\n**(Press /progressmainquest in various locations to search for him)**`,ephemeral:true})
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
                                    value:`**Enter /progressmainquest at the Guild District.**`
                                }
                            ])
                            
                            
                            .setDescription(`As you bid your farewells, the road to the Stateship of Zorya stretches ahead, leading you to the grand Colosseum in the heart of the Guild District. Your singular goal, to partake in the Annual Guild Draft, fueled by the weight of your coveted letter of recommendation. The bustling city of Zorya unfolds before you, a spectacle of vibrant life and spirited energy, all in anticipation of the forthcoming Guild Draft.\n\nAs you traverse through the throngs of people, the air crackles with excitement, each heartbeat in harmony with the electric atmosphere. The streets pulsate with a fervent energy, and the festival-like ambiance casts a kaleidoscope of colors and sounds, washing over you with both awe and trepidation.\n\nBut within this kaleidoscope, a current of destiny courses through your veins, guiding you toward the Colosseum. Each step resonates with purpose, aligning your path with the grand event that awaits. A sense of anticipation surges within, mingling with the city's fervor, as if the collective heartbeat of Zorya beats in unison with your own.`)
                            
                            
                            await interaction.reply({content: null,embeds:[questEmbed]})
                            await profileModel.updateOne({userID:authorId},{main_quest_phase:"2"})

                                }
                                else{
                                    interaction.reply({content:`After bidding your farewells, you must make it to the State of Zorya. You have one goal, to get to the Colosseum in the Guild District and participate in the annual Guild Draft using your letter of recommendation!\n**(Press progressmainquest in Zorya to continue)**`,ephemeral:true})
                           
                                }
                            }
                            else if(foundUser.main_quest_phase == "2"){
                                if(foundUser.location == "Guild District"){
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
                                    value:`**Enter /progressmainquest to continue.**`
                                }
                            ])
                            
                            
                            .setDescription(`As you draw nearer to the Guild District, the crowds grow denser, and the scent of excitement intensifies. The Colosseum looms large, its ancient stones whispering tales of battles past and glories yet to be witnessed.\n\nThe Guild Draft, a pivotal moment where dreams crystallize into reality, promises an opportunity for you to forge your path as an Ajin. It's a journey that began with humble origins in Aube Town, emboldened by friendship, and the revelation of hidden strengths.\n\nAs you step into the grand arena, a new chapter begins, marked by the triumphs and tribulations that await you in the Guild Draft. Zorya's fervor whirls around you, and your journey into the unknown commences, set against the backdrop of destiny's design.`)
                            
                            await interaction.reply({content: null,embeds:[questEmbed]})
                            await profileModel.updateOne({userID:authorId},{main_quest_phase:"3"})
                        
                        }
                                else{
                                    interaction.reply({content:`You are not in the Guild District, please go to the Guild District to continue!`,ephemeral:true})
                                }
                            }
                            else if(foundUser.main_quest_phase == "3"){
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
                                    value:`**Proceed to reveal your power**`
                                }
                            ])
                            
                            
                            .setDescription(`As you step into the Colosseum's courtyard, uncertainty taints each hesitant footfall. The serene beauty of the place, with its colorful flowers and stone fountains, seems at odds with the tension that hangs heavy in the air. Many Challengers surround you, each one adorned with unique outfits and formidable weapons, all gathered here today to prove themselves in the eyes of the entire Kingdom. Amid their strict gazes and pitiful stares, you find yourself drawn to the center of the room, a strangely isolated spot dominated by a perfectly cut stone tablet adorned with intricate circular patterns, mirroring the ones etched onto your Keystone Grimoire.\n\nA voice breaks the stillness from behind, belonging to a lady in a white jacket and a long ponytail, the one tasked with verifying the candidates for the Guild Draft. She demands to see your Letter of Recommendation. Despite her doubts, you assure her that Mr. Sebas, in fact, gave you the Letter of Recommendation. She seems to come to terms with it, though her lingering suspicion remains evident.\n\nHer attention shifts to the Revealing Tablet in front of you, a stone of great significance, embedded with a Keystone similar to the one you possess. She urges you to place your arm on the Tablet, claiming that it will reveal your true potential as an Ajin.\nTrepidation intertwines with curiosity as you approach the stone, apprehensive of what awaits you. As your arm makes contact, an unprecedented and violent absorption of your aura into the Tablet startles you. The force is overwhelming, nearly unbearable, and then, abruptly, it halts, leaving you suspended in an eerie stillness.\n\nBefore you, the revelation of your Power Level materializes, an unsettling display of your inner strength exposed for all to see. In this enigmatic moment, the Colosseum's aura takes on a darker hue, its grandeur tinged with an unshakable sense of mystery.`)
                            await interaction.reply({content: null,embeds:[questEmbed],components:[btnraw]})
                           
                            let acceptEmbed
                            if(foundUser.level < 4){
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
                                        value:`**Press /Progressmainquest to continue**`
                                    }
                                ])
                                
                                
                                .setDescription(`## Power Level: ${foundUser.level}\n\nAs your Power Level is revealed, the suffocating silence that engulfed you shatters into an unsettling murmur of uncertainty.The crowd looks disappointed,many even mocking you behind your back some outright started laughing seeing your poor performance,“This person sucks, I can’t believe someone like him/her managed to get a letter of recommendation.” was the common consensus.You feel dejected and quitely move back pondering if you are even cut out for it.\n\nLocke, the Ranger Association's representative, informs you about passing the first round of the Annual Guild Draft by a thin margin, determined by the Revealing Tablet. He hands you a badge marked "Challenger #405" and instructs you to wait in the courtyard.\n\nAs you put on the badge, a sense of anticipation grips you. Outside, the Colosseum gates slam shut, sealing the fate of those inside. The atmosphere electrifies, and loud thumps reverberate through the air. The gates open, unleashing a wave of cheers that send shivers down your spine.\n\nThe announcer's voice booms, heralding the arrival of the Ajins. People surge forward, eager to face the unknown challenges beyond the gate, while uncertainty lurks in the shadows, poised to test the mettle of every soul in the Colosseum.`)
                            }
                            else if(foundUser.level == 4){
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
                                        value:`**Press /Progressmainquest to continue**`
                                    }
                                ])
                                
                                
                                .setDescription(`## Power Level: ${foundUser.level}\n\nAs your Power Level is revealed, the suffocating silence that engulfed you shatters into an unsettling murmur of uncertainty.The crowd is quite impressed as it is an above average glow, “Not bad at all, that was good.” was the common consensus.You feel confident enough to take on whatever awaits you in next round.\n\nLocke, the Ranger Association's representative, informs you about passing the first round of the Annual Guild Draft, determined by the Revealing Tablet. He hands you a badge marked "Challenger #405" and instructs you to wait in the courtyard.\n\nAs you put on the badge, a sense of anticipation grips you. Outside, the Colosseum gates slam shut, sealing the fate of those inside. The atmosphere electrifies, and loud thumps reverberate through the air. The gates open, unleashing a wave of cheers that send shivers down your spine.\n\nThe announcer's voice booms, heralding the arrival of the Ajins. People surge forward, eager to face the unknown challenges beyond the gate, while uncertainty lurks in the shadows, poised to test the mettle of every soul in the Colosseum.`)
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
                                        value:`**Press /Progressmainquest to continue**`
                                    }
                                ])
                                
                                
                                .setDescription(`## Power Level: ${foundUser.level}\n\nAs your Power Level is revealed, the suffocating silence that engulfed you shatters into an unsettling murmur of uncertainty.The crowd is terrified with many having a look of utter surprise and horror on their faces seeing your might.“I can’t believe a person of this caliber is participating this year! I don’t think I have a chance.” was the common consensus.You are surprised by your own strength and feel very confident for the next round.\n\nLocke, the Ranger Association's representative, informs you about passing the first round of the Annual Guild Draft, determined by the Revealing Tablet. He hands you a badge marked "Challenger #405" and instructs you to wait in the courtyard.\n\nAs you put on the badge, a sense of anticipation grips you. Outside, the Colosseum gates slam shut, sealing the fate of those inside. The atmosphere electrifies, and loud thumps reverberate through the air. The gates open, unleashing a wave of cheers that send shivers down your spine.\n\nThe announcer's voice booms, heralding the arrival of the Ajins. People surge forward, eager to face the unknown challenges beyond the gate, while uncertainty lurks in the shadows, poised to test the mettle of every soul in the Colosseum.`)
                            
                            }
                           
                            
                            let filter = i => i.user.id === authorId
                                let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                        
                                collector.on('collect',async (btn) => {
                                    if(btn.isButton()){
                                        if(btn.customId === "btn_accept"){
                                            await btn.deferUpdate().catch(e => {})
                                            await interaction.editReply({embeds:[acceptEmbed],components:[]})
                            
                                            
                                            await profileModel.updateOne({userID:interaction.user.id},{main_quest_phase:"4"})
                                            
                                       
                                        collector.stop()
                                            
                                        }
                                       
        
                                        
                                        
                                    }

                                    collector.on('end', () => {
                                        interaction.editReply({components: [d_btnraw]})
                                    })
                                })
                            
                            

                                }
                                else{
                                    interaction.reply({content:`Amidst the bustling crowds and palpable excitement, you approach the imposing Guild District. The Colosseum stands as a storied monument, its ancient stones echoing tales of battles and untold glories.\n**(Press /progressmainquest in Guild District)**`,ephemeral:true})
                           
                                }
                            

                        }
                        else if(foundUser.main_quest_phase == "4"){
                            if(foundUser.location == "Guild District"){
                                let btnraw= new MessageActionRow().addComponents([
                                    new MessageButton().setCustomId("btn_accept").setStyle("PRIMARY").setLabel("Fight")])
                                   
        
                                    let d_btnraw = new MessageActionRow().addComponents([
                                        new MessageButton().setCustomId("dbtn_accept").setStyle("PRIMARY").setLabel("Fight").setDisabled(true),
                                       
                                    ])

                                    const attachment = new MessageAttachment('assets/Monsters/spectraling.jpeg')
                                    
                                let questEmbed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('A New Road')
                        .setAuthor({
                            iconURL:interaction.user.displayAvatarURL(),
                            name:interaction.user.tag
                        })
                        .setImage('attachment://spectraling.jpeg')
                        .addFields([
                            {
                                name: `Current Objective:`,
                                value:`**Proceed to fight the Spectraling**`
                            }
                        ])
                        
                        
                        .setDescription(`As you step into the Colosseum's main arena, the thunderous applause from the crowd shakes the very ground beneath your feet. The sky bursts into a dazzling display of fireworks, heralding the commencement of the Annual Guild Draft. Surrounded by fellow Ajins, the atmosphere crackles with excitement and anticipation. The experience was unlike anything you had come across. But what else were you expecting anyway, if not to see civilians cheering to their hearts' capacity in the presence of those who would soon be taking an oath to protect their futures.\n\n"Ladies and gentlemen! Welcome to Solarstrio's Annual Guild Draft!" boomed the announcer's voice, infused with both enthusiasm and a dark undercurrent of seriousness. "Behold these talented Ajins, ready to put on a show of power and earn their place within the esteemed Guilds of the Ranger's Association. Give them the applause they deserve!"\n\n“And now, we will reveal the test that these Challengers have to overcome!” The announcer says as the Colosseum's towering gates slowly swing open, unveiling a horde of Spyriths that spills forth like a relentless tide. Their varied forms, each more formidable than the last, promise a trial that will test the mettle of every Ajin present. A subtle twist further enhances the stakes – a Points System that rewards those who dare to challenge the most potent adversaries. Amidst the fray, each Challenger selects their opponent, an embodiment of their own confidence and skill.\n\nBut fate, it seems, has its own designs. As you sprint towards a colossal Starhound, its fierce roar reverberating through the air, an unexpected force arrests your movement. The ground seems to clutch at your feet, an invisible grasp that halts your advance. It's a Spectraling, a creature of ethereal power, an entity woven of shadows and binding magic.\n\nThe world around you narrows, focusing solely on the looming figure of the Spectraling, its presence an intimidating testament to the trials that await. The crowd's frenzied cheers dim into a distant hum as your senses hone in on the imminent confrontation. In this instant, destiny hangs on a precipice, and your journey as an Ajin stands poised to take a monumental leap forward. There isn’t time, this will be the Spyrith you’re going to fight!`)
                        await interaction.reply({content: null,embeds:[questEmbed],components:[btnraw],files:[attachment]})
                       
                        
                            
                        
                       
                        
                        let filter = i => i.user.id === authorId
                            let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                    
                            collector.on('collect',async (btn) => {
                                if(btn.isButton()){
                                    if(btn.customId === "btn_accept"){
                                        await btn.deferUpdate().catch(e => {})
                                        await interaction.editReply({files:[]})
                                        
                                        const attacker = Warrior.create(author)
                                        const monster = Spectraling.create()
                                        
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
                                        
                                        await profileModel.updateOne({userID:interaction.user.id},{main_quest_phase:"5"})
                                        
                                   
                                    collector.stop()
                                        
                                    }
                                   
    
                                    
                                    
                                }

                                collector.on('end', () => {
                                    interaction.editReply({components: [d_btnraw]})
                                })
                            })
                        
                        

                            }
                            else{
                                interaction.reply({content:`In Solarstrio's Annual Guild Draft at the Colosseum, Ajins gather to join prestigious Guilds. Amidst applause and fireworks, you prepare to face powerful Spyrith opponents with a Points System. You are halted by a formidable Spectraling, symbolizing impending trials. As destiny hangs in the balance, their journey takes a pivotal leap forward.\n**(Press /progressmainquest to continue)**`,ephemeral:true})
                       
                            }
                        

                    }
                    else if(foundUser.main_quest_phase == "5"){
                        if(foundUser.location == "Guild District"){
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
                                    value:`**Enter /progressmainquest to continue.**`
                                }
                            ])
                            
                            
                            .setDescription(`As the lifeless body of the Spectraling lies before you, its blood staining your skin, you look up at the darkened sky. The screams of the Colosseum crowd echo in your ears, but they seem distant, drowned out by the thunderous pounding of your own heart. Your pulse races, a primal drumbeat in the face of the surreal events unfolding.\n\nYet, as you wipe the blood from your face, you notice something peculiar. Despite your victory over the formidable Spyrith, the gazes of the spectators are not fixed on you. Instead, they are transfixed by a figure standing tall amidst the chaos - Rammir.\n\n“By the Sun’s grace! I had heard stories about him, but it really is Rammir of the Demon Fist. What is such a dangerous prisoner like him doing here?”\n\n“I heard Guildmaster Baeyu released him recently under his responsibility. I think they want to recruit him in the Megalos Guild if he passes!”\n\nSuddenly, the Colosseum is filled with the stench of rumors and rain of judgements. And in the center of it all, stood Rammir. Clearly he wasn’t your ordinary Challenger. In fact, he would quite easily kill every Challenger on the floor if he so chose to.\n\nAnd with that revelation, the curtains closed for the second test of the Annual Guild Draft. You now await for the next test.`)
                            
                            
                            await interaction.reply({content: null,embeds:[questEmbed]})
                            await profileModel.updateOne({userID:authorId},{main_quest_phase:"6"})
                        }
                        else{
                            interaction.reply({content:`Upon having your Power Level revealed during the Guild Draft, the room erupts with a mix of awe and apprehension from the onlookers. Locke, the Ranger Association's representative, congratulates you on passing the first round and hands you badge #405. As you prepare to enter the Colosseum, the gates close behind you, sealing the fate of those inside.\n**(press /progressmainquest to continue)**`,ephemeral:true})
                        }
                    }
                    else if(foundUser.main_quest_phase == "6"){
                        if(foundUser.location == "Guild District"){
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
                                    value:`**Enter /progressmainquest to continue.**`
                                }
                            ])
                            
                            
                            .setDescription(`“What an absolute show  of power we have on our hands! This year’s Challengers are simply on a different level! Buuuuuuuuut, we know that’s not always enough! There is still one final test left! And now, before I reveal the points from the previous test, and the nature of the following test itself, I want to bring to your attention the Vice-Masters!!” The Announcer's voice resonated through the Colosseum, carrying a blend of excitement and gravity.\n\nAmidst the hushed anticipation, a procession of figures emerged from the depths of the Colosseum's corridors. These were no ordinary individuals – they were the Vice-Masters, the storied icons of the Guilds. Accompanied by their loyal Executives, they ascended to their designated seats atop the arena, where their presence commanded respect and reverence. The crowd erupted in a chorus of cheers, their voices carrying gratitude and admiration for these legendary figures.\n\nThe Guild Draft is held 3 times a year. It is only referred to as the Annual Guild Draft because it occurs only once for an entire continent to see and partake. The Kingdom of Solarstrio has been one of its 3 venues since the Ranger Association’s inception of the idea. Thus, the majority of Vice Masters present during the Guild Draft belonged to Guilds who operated mainly in the Continent of Gabalt, which Solarstrio is a part of. But there were some Vice-Masters present from larger Guilds whose network spanned over multiple Continents.\n\nFor those who aspired to become Rangers, these Vice-Masters held the keys to destiny. Impressions, skills, and tenacity were the currencies in this arena, each Challenger seeking the approval of at least one Vice-Master to pave their path towards ascension.\n\n"But now, divert your gaze to the heavens, where an Airship gracefully approaches, bearing the coveted Scoreboard we've awaited!" The Announcer's voice infused with a magnetic fervor. As the Scoreboard materialized in the sky, its presence cast a shadow over the throngs of watchers and the expectant Vice-Masters.\n\nIn the tapestry of names and scores, the spectrum was vibrant and telling. Greyed names revealed the disappointed, those who faltered on their journey. Negative scores betrayed those who had encountered their limits, the gravity of their endeavor evident in their struggles against the formidable Spyriths. It meant they failed to move onto the next round, and must try again next year.\n\nYet, amidst this sea of outcomes, your name shone with significance. You had secured passage to the next round, your prowess acknowledged in the numbers before you. The air quivered with anticipation as you stood on the threshold of the final test. The watchful eyes of Vice-Masters bore upon you, their assessments waiting to shape your destiny.`)
                            
                            
                            await interaction.reply({content: null,embeds:[questEmbed]})
                            await profileModel.updateOne({userID:authorId},{main_quest_phase:"7"})
                        }
                        else{
                            interaction.reply({content:`After defeating the Spectraling, your heart races amid the distant screams of the crowd. Amidst wiping the blood off your face, you realize attention has shifted to Rammir, a notorious figure. Spectators discuss his release by Guildmaster Baeyu for possible recruitment into the Megalos Guild. Amidst rumors, the formidable Rammir emerges as a unique Challenger, capable of great power. The second test of the Annual Guild Draft ends with this revelation, leaving you anticipating the next challenge.\n**(press /progressmainquest to continue)**`,ephemeral:true})
                        }
                    }
                    else if(foundUser.main_quest_phase == "7"){
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
                            value:`**Proceed to fight Fiskille**`
                        }
                    ])
                    
                    
                    .setDescription(`"Incredible, truly incredible! Behold the magnificent display of power we are privileged to witness today! Our Challengers, my friends, are something extraordinary, operating on a realm beyond the ordinary! But remember, power is not the sole factor that determines fate. There's a final challenge that lies ahead, and it's here that legends are truly forged!" The voice of the Announcer reverberated through the Colosseum, laden with a mix of awe and anticipation.\n\nAs you regrouped among the Challengers that managed to hold on until the final test, you saw many who had left dejected. But your thoughts quickly transformed into a grin which was now displaying excitement and courage. The Ranger’s License was only one step away.\n\n“And now, we make our way to the final test of this evening. It is as you guessed it, a brawl!\n\n“Brawl! Brawl! Brawl! Brawl!” began chanting the crowd, as the scoreboard now displayed a bracket where all remaining Challengers were pitted against each other. This was the final test, for you to go against another Challenger.\n\nSuddenly, the ground below your feet began shaking, and revealed several smaller arena stages. These were the ones you needed to fight on. It was also said that stepping out of these arenas would mean immediate forfeit. The two fighters could use all means necessary to claim victory by defeating their opponents, pushing them outside the arena or even force them to forfeit the test. The Executives were on standby, so as to stop the Challengers before things could go out of hand.\n\nYou step into your designated arena, and there he was, your opponent - Fiskille.`)
                    await interaction.reply({content: null,embeds:[questEmbed],components:[btnraw],files:[attachment]})
                   
                    
                        
                    
                   
                    
                    let filter = i => i.user.id === authorId
                        let collector = await interaction.channel.createMessageComponentCollector({filter: filter,time : 1000 * 120})
                
                        collector.on('collect',async (btn) => {
                            if(btn.isButton()){
                                if(btn.customId === "btn_accept"){
                                    await btn.deferUpdate().catch(e => {})
                                    await interaction.editReply({files:[]})
                                    const attacker = Warrior.create(author)
                                    const monster = Fiskille.create()
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
                                    
                                    await profileModel.updateOne({userID:interaction.user.id},{main_quest_phase:"8"})
                                    
                               
                                collector.stop()
                                    
                                }
                               

                                
                                
                            }

                            collector.on('end', () => {
                                interaction.editReply({components: [d_btnraw]})
                            })
                        })
                    
                    

                        }
                        else{
                            interaction.reply({content:`In the Colosseum, after the intense display of power from Challengers, the Announcer introduces the Vice-Masters, revered icons of Guilds. An approaching Airship reveals the Scoreboard displaying Challenger names and scores, reflecting their journeys. Amidst disappointment and struggle, your name shines as you secure passage to the next round, standing at the brink of the final test under the watchful eyes of Vice-Masters.\n**(press /progressmainquest to continue)*`,ephemeral:true})
                   
                        }
                    

                }
                else if(foundUser.main_quest_phase == "8"){
                    if(foundUser.location == "Guild District"){
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
                                value:`**Enter /progressmainquest to continue.**`
                            }
                        ])
                        
                        
                        .setDescription(`In the crucible of combat, as you overpower Fiskille, a fellow Ajin, a realization dawns upon you – battling your own kind is a paradoxical experience. Though you had previously vanquished Captain Crook, another Ajin, in Aube Town, the absence of resentment in your heart lends this confrontation a distinct complexity.The tests are now but echoes of a journey behind you, leaving only the outcome ahead.\n\nAmidst the clangor of the organizing staff reclaiming the arena, you find solace amidst a cluster of Challengers, united by the shared anticipation of results. While pockets of skirmishes continue, your focus remains singularly tethered to the impending judgment.\n\nAfter a brief interlude, as the dust settles and the arena regains its serenity, the Announcer's voice resounds with renewed vigor.\n\n"Remarkable! The feats witnessed today leave me at a loss for words! This year's Challengers have transcended all expectations, their exploits etched as indelible tales in the annals of this grand event. Having held you in suspense, I am now honored to summon forth the denouement of this year's Annual Guild Draft! Esteemed Vice-Masters, I beseech your attention as I present to you each Challenger in turn. Lift your hands if you deem them worthy of your tutelage!"\n\nWith a sweep of his hand, Challengers begin to form a procession, stepping forth, one by one, into the spotlight, their heartbeats entwined with the rhythm of destiny.\n\n"Behold our next contender, Challenger #405! Their valor has ignited the arena, leaving an indelible mark upon this day's saga. Vice-Masters, extend your judgment to this worthy soul!" The Announcer's words soar like an invocation, piercing the air with electrifying anticipation.`)
                        
                        
                        await interaction.reply({content: null,embeds:[questEmbed]})
                        await profileModel.updateOne({userID:authorId},{main_quest_phase:"9"})
                    }
                    else{
                        interaction.reply({content:`Amidst the Announcer's awe-filled words, the final test looms as Challengers regroup with anticipation. The Ranger's License is within reach. The crowd chants for a brawl, and a bracket emerges on the scoreboard, pairing remaining Challengers against each other. The ground shakes, revealing smaller arenas, where you face your opponent, Fiskille, in a battle where victory demands strategy and skill, within the watchful gaze of Vice-Masters & Executives.\n**(press /progressmainquest to continue)**`,ephemeral:true})
                    }
                }
                else if(foundUser.main_quest_phase == "9"){
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
                                value:`**Enter /progressmainquest in Your Guild Office to continue.**`
                            }
                        ])
                        
                        
                        .setDescription(`As seconds metamorphose into eternities, your heart quickens its tempo, the tendrils of anxiety spiraling tighter around your consciousness. Doubt's shadows loom, whispering feeble queries, casting aspersions on your worthiness.\n\n“Why is no one lifting their arms up? Am I not good enough?” Yet amidst the tumult of your thoughts, a solitary arm rises. In that fleeting instant, as the Vice-Master's hand pierces the veil of doubt, a beacon of validation amidst the sea of uncertainty. It is the Vice-Master from the ${guild} Guild, offering a testament to your potential.\n\nCongratulations, you’ve been picked up as a Rookie Ranger by the ${guild} Guild!\n\nAs the event came to a close, you were approached by an attendant and asked to visit your Guild’s Office`)
                        await interaction.reply({embeds:[questEmbed]})
                        foundUser.completed_quests.push("KS-ZS-MQ1")
                        await profileModel.updateOne({userID:interaction.user.id},{main_quest_phase:1,main_quest:"KS-ZS-MQ2",completed_quests:foundUser.completed_quests,guild:guild,guild_rank:"Rookie",ranger_grade:"E"})
                    }
                    else{
                        interaction.reply({content:`In the midst of combat with fellow Ajin Fiskille, a complex realization emerges about battling one's own kind despite previous victories. The tests become echoes of the past, leaving only the imminent outcome. Amidst the settling dust and shared anticipation, the Announcer's voice heralds the conclusion of the Annual Guild Draft, as Challengers await judgment from Vice-Masters, their destinies entwined with the momentous event.\n**(press /progressmainquest in your Guild Office to continue)**`,ephemeral:true})
                    }
                    
                }
                
                
                    }
                    else if(foundUser.main_quest == "KS-ZS-MQ2"){

                        if(foundUser.main_quest_phase == "1"){
                            if(foundUser.location == "Guild District"){
                                const guild = foundUser.guild
                                let questEmbed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('New Home')
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Enter /progressmainquest in Your Guild Office to continue.**`
                                    }
                                ])
                                
                                
                                .setDescription(`Behind the Colosseum was the Ranger Street most popularly known for housing the offices of many esteemed Guilds. Hopeful Challengers and the common-folk often loitered around this area in the hopes of meeting their favorite Ajins. But for you today, it was quite different. You took a stroll with purpose, the purpose of locating your Guild’s Office. It was about time you visited it.\n\nAfter having finally been chosen as a Rookie Ranger by the ${guild} Guild, you would officially be part of an esteemed Guild of the Ranger Association. You would get to meet your superiors and greet your colleagues.\n\nWith a new determination, you found yourself in front of the Guild Office of ${guild} Guild. You walked into the building and met up with an attendant at the reception.\n\n"Greetings and welcome to ${guild} Guild!. I deduce you must be one of our latest recruits, an auspicious addition indeed. Allow me to offer you this," she said, presenting the Ranger Rulebook, a tome that held the essence of a Ranger's path\n\nYou received the Ranger Rulebook.\n\n"Guard it as you would your very soul, for within its pages lies the compass to your excellence here.\n\n“You should also take this, to make it official.”\n\n**You received the Ranger’s License.**\n\n“Don’t lose it, because there won’t be another one. Also, feel free to acquaint yourself with the guild's ambience, and engage with the members who frequent our halls. Be mindful that not all spirits dwell here simultaneously, the Guild ebbs and flows like the tides. And when you're ready, find your way to the back. The Vice-Master has left you with a Mission. An extraordinary privilege, for rookies. Fortune smiles upon you," her voice resonated, gently guiding you toward the beckoning corridors.\n\n**You can talk to other members in your Guild using /talktolocals**`)
                                await interaction.reply({embeds:[questEmbed]})
                                await profileModel.updateOne({userID:interaction.user.id},{main_quest_phase:2})
                            }
                            else{
                                interaction.reply({content:`**(press /progressmainquest in your Guild Office to continue)**`,ephemeral:true})
                            }
                            
                        }
                        else if(foundUser.main_quest_phase == "2"){
                            if(foundUser.location == "Guild District"){
                                
                                let questEmbed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('New Home')
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Travel to Werfall to continue.**`
                                    }
                                ])
                                
                                
                                .setDescription(`After following the Attendant to one of the back rooms, you find yourself in a briefing room. This is where Guild Rangers are briefed on their upcoming Missions.\n\n“Welcome to the Briefing Room.” The Attendant's voice resonated, imbued with the solemnity of the room. “Please look at the Dossier in front of you. The details of your mission are in it. As far as I understand, you need to head to the Township of Werfall. You may not know this because you just joined us as a Rookie, but our Guild is not so well known, nor is it wealthy when compared to some of the top-level Guilds in Gabalt. This is because the most important tasks are always handled by the most important Guilds. Thus, they make a lot of money and are very popular among the citizens.” She elaborated on the divide that separated the Guilds, the hierarchy of tasks that dictated the flow of power and wealth.\n\n“However, for smaller Guilds such as ours, it is really difficult to make a name for ourselves and even get hold of important missions that pay handsomely. Thus, we resort to carrying out riskier missions that give us decent rewards. This is the only way for Guilds like ours to even have any chance at rivaling the best Guilds on the Continent. Thus, your mission.”\n\nShe further mentioned that the existence of Werfall was like a black-mark on the Kingdom of Solarstrio. It was the most dangerous place on the Continent. She couldn’t explain in detail but you were to visit Werfall and meet up with Rangers from your guild. Their goal was to field-test the “Abyssalure” item which was a prototype for an invention that could emit negative waves that attracted the Abyssals. The Shipment had arrived a day ago. You took it, and left for Werfall. “Even though Werfall is the most dangerous place in Solarstrio, your task would be much safer, and I think the Vice-Master would not give it to you, if he didn’t believe in you.” said the attendant.\n\n**Received the Abyssalure.**`)
                                await interaction.reply({embeds:[questEmbed]})
                                
                                await profileModel.updateOne({userID:interaction.user.id},{main_quest_phase:3})
                            }
                            else{
                                interaction.reply({content:`**(press /progressmainquest in your Guild Office to continue)**`,ephemeral:true})
                            }
                            
                        }
                        else if(foundUser.main_quest_phase == "3"){
                            if(foundUser.city_town == "Werfall"){
                                let questEmbed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('New Home')
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Enter /progressmainquest to continue.**`
                                    }
                                ])
                                
                                
                                .setDescription(`As you reach closer to the Township of Werfall, you recall how easy it was to catch a Stagecoach from Zorya. After hearing the Guild’s attendant, you thought for sure nobody would be willing to take you to Werfall. However, you did notice that the Stagecoach that was taking you to Werfall felt sturdier and more guarded than the regular ones in Solarstrio. Even the passengers were all Ajins, though their numbers were quite scarce.\n\nThrough the empty Stagecoach’s stained windows, you see that the skies are pitch black, and distant clanging noises can be heard. Just as you begin to piece it all together, the Stagecoach comes to a halt.\n\n“This is as close as we can get. Get out of the Stagecoach quickly.” Said the driver rather impolitely as if he did you a favor. Wait. He did do you a favor.\n\nYou walk out of the Stagecoach and experience quite a shock. There are tents everywhere. The wind is chilly and there is humidity in the air, with the occasional thundering.\n\n“Halt! Only Rangers of Grade-D or above may enter. This is a very dangerous zone. Show me your Ranger’s License.” Shouted one of the Guards demanding to see your credentials.\n\nSince you were still a Grade-E Rookie Ranger, the Guards refused to let you in. Getting yourself to Grade D was close to impossible at this juncture, nor was it plausible to force your way in. It would seem you were quickly running out of options\n\n“I have come here to deliver this prototype item to other Rangers who belong to my Guild. I was told this task was quite urgent and vital.” You spoke.\n\n“This area is now Empral Brigade jurisdiction. Since you Rangers dropped the ball so heavily that one time, Werfall came to this sorry state. You Rangers may still be helping us, but this is as far as you go, Rookie.” Said the Guard with a condescending tone.\n\nAt that time, you overheard gallops approaching behind you.`)
                                await interaction.reply({embeds:[questEmbed]})
                                
                                await profileModel.updateOne({userID:interaction.user.id},{main_quest_phase:4})
                            }
                            else{
                                interaction.reply({content:`With your new Mission in hand, you are to depart to Werfall immediately.\n**(press /progressmainquest in Werfall to continue)**`,ephemeral:true})
                            }
                        }
                        else if(foundUser.main_quest_phase == "4"){
                            if(foundUser.city_town == "Werfall"){
                                let questEmbed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('New Home')
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**Enter /progressmainquest in Ranger Tents to continue.**`
                                    }
                                ])
                                
                                
                                .setDescription(`You turn around to find that a Royal Escort had just arrived in Werfall. It was armed to the teeth and surrounded by Guards from the Empral Brigade.\n\n“That sigil…there’s no mistaking it! It’s a delegation from the Storm Citadel!” Said the Guard with a fearful look.\n\n“This can’t be good.” You heard the Guard murmur.\n\nThe doors of the carriage opened swiftly, revealing a figure clad in a rather unique outfit. He was wearing three pieces of clothing, one above each other. They called it a “Suit”, only prepared for those who held great importance to the Kingdom. Not even a well of money could buy you a suit in Solarstrio. It had to be earned, one piece at a time.\n\nThe figure had silver hair, and carried around a large ornamental lantern. His skin burnt stygian in places. There was a certain glow in his eyes, as if he’d seen things. He was slowly walking towards you and the Guard. You could see the Guard getting paler and paler as this stranger got close.\n\n“I come bearing news.” The stranger spoke. His tone was soft, yet his words felt heavy.\n\n“Is this about a Nightmare?” the Guard questioned hesitatingly.\n\n“I am afraid it is on course for a Category 2. Please show me to the tent of whoever’s in charge here. I wish to speak with them.” The Stranger replied.\n\nThe Guard, after having heard what the Stranger had to say, stood in place, as if in a coma.\n\n“Get it together you lowly Guard! You must escort Master Connas Cherman this instant! Fail to do so and I will chop your head off right here!” Shouted a man on the mount. He seemed to be an executive of the Empral Brigade.\n\n“A-At once! Master Connas Cherman, please follow me!” replied the Guard as he bowed and showed his guest to the person in-charge. It seemed something sinister was about, but at least, it allowed you to sneak in when nobody was looking.`)
                                await interaction.reply({embeds:[questEmbed]})
                                
                                await profileModel.updateOne({userID:interaction.user.id},{main_quest_phase:5,location:"Ranger Tents"})
                            }
                            else{
                                interaction.reply({content:`You reach Werfall with the Abyssalure but was stopped by the guards, you must find a way to enter the Ranger Tents\n**(press /progressmainquest in Werfall to continue)**`,ephemeral:true})
                            }
                        }
                        else if(foundUser.main_quest_phase == "5"){
                            if(foundUser.location == "Ranger Tents"){
                                let questEmbed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('New Home')
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                .addFields([
                                    {
                                        name: `Current Objective:`,
                                        value:`**ERROR: CANNOT PROCEED FURTHER**`
                                    }
                                ])
                                
                                
                                .setDescription(`You enter the basecamp to find its tents filled to the brim with Rangers, some who were prepared and those caught unprepared. You encountered a few merchants and infirmaries every 100 steps. At one place, Rangers required healing, and in another place, Rangers were being armed. It was quite brutal, but perhaps you could find something of value here as you wait for your colleagues.\n\nYou can now walk to the base camp tents and use **/talktolocals.**\n\nYou sense an eerie feeling throughout your time in the basecamp. It only kept getting worse as you continued. It sort of scared you for what was about to come. Whatever this feeling was, it was part of you for now.\n\nAs you slowly make your way towards the Werfall Ranger Center, you begin to notice that the crowd kept getting denser and angrier as you got closer. It felt like you were drowning in a protest. Perhaps it had to do something with the Storm Seer who had just come? Regardless, you began looking around to locate Rangers from your Guild. Among the crowd, you caught the eye of a hooded figure who seemed to stare directly at you with his piercing gaze, unfazed by the crowd. The figure stood out so much, yet only you seemed to notice them.\n\nBefore you knew it, this figure started to close the gap between the two of you. Seeing them, your heart starts pounding rapidly and you remember the eerie feeling you felt earlier. When you blinked, the figure had vanished, no trace of him left. You looked to the left, then to the right but they were not to be found anywhere.\n\nJust then, your eyes widen, your heart slows down, and blood begins to drip down to the ground from your mouth. You look down, and find an arm impaling your stomach. This arm…it belonged to the Hooded Figure who now stood in front of you.\n\n**To Be Continued…**`)
                                await interaction.reply({embeds:[questEmbed]})
                                await profileModel.updateOne({userID:interaction.user.id},{main_quest_phase:6})
                            }
                            else{
                                interaction.reply({content:`You somehow manage to sneak inside the Ranger Tents\n**(press /progressmainquest in Ranger Tents to continue)**`,ephemeral:true})
                            }
                        }
                        else{
                            let questEmbed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle('ERROR')
                                .setAuthor({
                                    iconURL:interaction.user.displayAvatarURL(),
                                    name:interaction.user.tag
                                })
                                
                                
                                
                                .setDescription(`Attempting to connect to Vearth...**OK**\n\nAttempting to connect Player...**OK**\n\nAttempting to Bypass Alpha Firewall...**ERROR!!**\n\nIt seems Further content is blocked, Please contact the Architects!`)
                                await interaction.reply({embeds:[questEmbed]})
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