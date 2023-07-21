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
import inventory from '../models/InventorySchema'
import { gilthunder_spear } from '../src/age/weapons/gilthunder_spear'
import { gilthunder_boltgun } from '../src/age/weapons/gilthunder_boltgun'


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
                                .setDescription(`A duo of Beer Buccaneers are approaching you!\n\nPsst, listen here. Don’t worry, I’ve paused the time. Turns out I can do that. Anyway, I see that you’re about to enter into your very first fight. And…you don’t have a weapon equipped. Use the **/inventory** command and see what you’ve got!\n\nOnce you’ve rummaged through your belongings, use the **/equip** command followed by entering **weapon** in “type” field and **weapon’s name** in the “objects” field.\n\nOnce you’re all equipped, press the **Fight** button. Fights in Fable happen in your PMs. No seriously, that’s the only place where you can do them. Every time you begin a fight, the Fable bot shall text you in PMs.\n\nAlso all fights in Fable are permanently on **“auto mode”**. The bot follows an intelligent decision making system that ends the battle in the most efficient way possible. But hey, if it helps, you can play the entirety of Fable in your PMs.\n\nNow press the **fight** button, and don’t press the **Run** button, unless you’re a weakling.`)
            
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
                                .setDescription('You have decided to fight! Check your private messages! Remember: each encounter only lasts for 5 mins! Fight them before the time is up!')
            
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
                                            await interaction.editReply({embeds:[acceptEmbed],files:[]})
                            
                                            
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
                            
                            let fightEmbed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('A NEW ROAD')
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
        
                            await interaction.reply({content: null,embeds:[fightEmbed]})
                            await profileModel.updateOne({userID:authorId},{main_quest_phase:"4"})
                        }
                        else if(foundUser.main_quest_phase == "4"){
                            let fightEmbed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('A NEW ROAD')
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
        
                            await interaction.reply({content: null,embeds:[fightEmbed]})
                            await profileModel.updateOne({userID:authorId},{main_quest_phase:"5"})
                        }
                        else if(foundUser.main_quest_phase == "5"){

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
                            .setTitle('A NEW ROAD')
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
                            
                            
                            .setDescription(`You grab Mr. Sebas’ hand and get up. He tells you that your body has now transformed to a state where it will be able to harness Spyr. And after looking at your aura, he further deduces that you were born with the ${foundUser.elements[0]} Element’s Affinity. Furthermore he determines that you are a ${classText}.\n\nMr. Sebas walks to his desk and picks up a “Keystone Journal”. It is apparently an essential item that is carried by most Ajins in the world. Its speciality is that there is a Spyr Keystone embedded in its center which is capable of determining the Power Level of an Ajin. All you have to do is open the Keystone Journal and place your hand on the Keystone. It will automatically determine your power level, and show you your strengths and weaknesses. The other part of the Journal is a place where you note down your personal details, accomplishments and goals.\n\nMr. Sebas also informs you that there is much to learn about Spyr but there is very little time available. As an Ajin, the right thing for you to do is enroll yourself as a Ranger in one of the many Guilds of the Ranger’s Association. All the best Ajins in the world are there. But it isn’t as easy as simply applying for a job. To get into a Guild, you need to prove yourself worthy by doing Community Services throughout the year i.e helping strangers, protecting the weak, fighting crime and slaying dangerous Magical Beasts. Doing so will earn you merit and after earning a certain amount of merit, you may be given a “Letter of Recommendation” by one of the Guild’s Scouts.\n\nOnce you receive a Letter of Recommendation, you can partake in the Annual Guild Draft. In this event, hopeful Ajins from all around the country participate in order for them to be chosen as members of the Guilds that are willing to recruit new Ajins. Unfortunately the event is right around the corner and you have 0 merit. But you are in luck because Mr. Sebas is a Guild Scout. He is willing to give you a Letter of Recommendation if you can help everyone in Aube Town.\n\nHe asks you to hurry and make way towards the local Guild Outpost. There you may find few leads about the townspeople who require aid. He also recommends you to visit the bar, and talking to the locals in Aube Town in order to find Quests.\n\nHe knows this is all too sudden and there isn’t a fair amount of time left, but he thinks you can make it. If it helps, you can check out the books in his library to aid you.`)
        
                            await interaction.reply({content: null,embeds:[fightEmbed]})
                            await profileModel.updateOne({userID:authorId},{main_quest_phase:"6"})
                        
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
                            
                            
                            .setDescription(`*“Psst, hey! Yeah that’s right. I paused the time again. Just wanted to let you know that the universe is done holding your hand. From here on, it's all you. But…I may have sprinkled a few hints here and there for you yet, so look out. I wish you good luck!”*\n\nYou can now freely explore the world, and that too at your own leisure. Use the /walk command to see available locations you can walk to, in Aube Town. And use the /travel command to see available locations you can travel to, from Aube Town. The locations displayed will often show destinations that are nearby to your current location. In this case, since you are in Aube Town, you will see places to visit inside Aube Town as well as its exteriors.\n\nWhen you visit a location, you can actually explore them. Use the command /explore and it will let you explore the location you are currently in. For interiors, this command simply gives you more information about the place, but when you use it in the outskirts, like Forests, Caves or Mountains - you will actively start exploring it. Let’s say you are in a Forest, entering the /explore command will have you explore the place. This exploration attempt may end up in you finding crafting materials or run into dangerous magical beasts. You can indefinitely explore the outskirts. Just enter /explore repeatedly.\n\nAlso you should talk to the locals in every town and city. They have interesting gossip, knowledge, and items to share with you. You can do this by entering /talktolocals. Just like the explore button, you can enter this command indefinitely until you have talked to everyone new. There are about 10 strangers in every town and city who want to talk to you. Some of these people may be in a Bar/Inn mind you.`)
        
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
                                interaction.reply({content:`You are not in the guild outpost, please go to the outpost to continue!`,ephemeral:true})
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
                            
                            
                            .setDescription(`At the Questboard, Eupheme informs you that Ajins who want to become Guild Rangers are referred to as the Challengers. Hence, they can only undertake E Class Quests to gain merit and receive a Letter of Recommendation. However, Guild caretakers like Eupheme and Andan may allow Challengers to take on D Rank Quests if they assess their strength as sufficient.\n\nHowever, the race to merit does not end here. Even as a Ranger, you will take on Quests that are on par with your strength, and only gradually will you be allowed to take on more threatening Quests as you are promoted within your Guild. Your merit in the Guild will be used to measure your strength and capability. As you gain more merit and fame by completing various quests, your power, influence and rank will increase in the Guild.\n\nUse /questboard to access the Guild’s Quest Board when visiting a Guild Outpost. You can view the various quests available to you and can take up any number of quests you like; however you can only focus on completing one quest at a time. There are two kinds of quests - 1) Main Quests 2) Side Quests\n\nYou only ever have a single Main Quest going on. But, you will have taken up several Side Quests too. In the case of Side Quests, you will have to pick one and complete it before you can start another. But you can change your active Side Quests using the /switchquest. Note that doing so will delete your progress and findings of the previously active quest. This will not impact your Main Quest at all, because you can have 1 Side Quest active at all time alongside your Main Quest.\n\nUse /progresssidequest to progress in your Side Quests. If you feel stuck or forget what you’re supposed to be doing, you can use /questinfo. Also ask for help from other Ajins.`)
        
                            await interaction.reply({content: null,embeds:[fightEmbed]})
                            await profileModel.updateOne({userID:authorId},{main_quest_phase:"9"})
                            }
                            else{
                                interaction.reply({content:`You are not in the guild outpost, please go to the outpost to continue!`,ephemeral:true})
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
                                
                                
                                .setDescription(`**${chosenWeapon} has been added to your inventory!**\n**A new sidequest "AubeTown's Hero" has been added!**\n\nAfter choosing a prized weapon, Andan expresses a mix of nostalgia and concern for its future. He and Eupheme then reveal the details of the Quest you're about to undertake, involving the prestigious Lager Family and a feud with the Tavern owner over missing consignments of the famed drink, Backbreaker. The Guild has taken over the Quest due to its importance, suspecting a third party's involvement. Your mission is to help the Guild resolve the conflict and uncover the truth. Andan advises starting by speaking to the Tavern owner. As you prepare to embark on this enigmatic journey, the weight of the task ahead lingers in the air.\n\n2) Gilthunder's Boltgun (Ranged): +5 Arcana\nElement: Volt | Skill: Electro Burst | POW: 30.\n\n[Read extended interaction with character dialogue](https://docs.google.com/document/d/1UogBXgr0ugJNRRtH63H6EseVA4n7tSC17okSsghTXxQ/edit?usp=sharing)📜`)

                                await interaction.reply({content: null,embeds:[fightEmbed],components:[weaponbtn]})
                                let filter = i => i.user.id === authorId
                                let collector = await interaction.channel.createMessageComponentCollector({filter: filter})


                                collector.on('collect',async (btn) => {
                                    if(btn.isButton()){
                                        if(btn.customId === "spear"){
                                            await btn.deferUpdate().catch(e => {})
                                            chosenWeapon = "Gilthunder's Spear"
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
                            interaction.reply({content:`You are not in the guild outpost, please go to the outpost to continue!`,ephemeral:true})
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
                                    value:`**Press /progressmainquest in Zorya to continue**`
                                }
                            ])
                            
                            
                            .setDescription(`In the aftermath of a harrowing battle against the nefarious Beer Buccaneers and their leader, Captain Crook, you bring them bound and guilty to the stunned Guild Outpost. Andan and Eupheme are left speechless, their disbelief etched upon their faces like a haunting specter. As the Mayor and Mr. Sebas appear, it becomes evident that the enigmatic Ajin had foreseen this outcome, orchestrating the Mayor's presence in this fateful moment.\n\n With unwavering resolve, you lay bare all your chilling findings before the Mayor, leaving him largely impressed and indebted to your valorous actions. The dark specter of raids from the Beer Buccaneers will haunt Aube Town no more, and the feud between the Tavern owner and the Lager Family meets its resolution.\n\nAs the Mayor publicly bestows upon you the illustrious title of "Hero of Aube Town," your heart swells with pride, a testament to your courage in the face of unimaginable darkness. A jubilant triumph amid the shadows, symbolizing the beginning of a new era for Aube Town.\n\nWith the Letter of Recommendation now in your possession, Mr. Sebas' guidance points you toward the Stateship of Zorya, where the Annual Guild Draft awaits. The urgency leaves no time for fond recollections, urging you to bid farewell to your companions, Mr. Briggs and Emyr, with a sense of bittersweet finality.\n\nAs you embark on this new chapter, your heart weighs heavy with the echoes of your recent trials, and a faint premonition lingers within—the haunting sense that your journey is far from over, and that darker secrets yet await you in the realms beyond. The path to Zorya beckons, its mysteries shrouded in uncertainty and enigma, while the legacy of the Hero of Aube Town begins to take root, leaving an indelible mark upon the shadows of Aube's history.`)
        
                            await interaction.reply({content: null,embeds:[fightEmbed]})
                            foundUser.completed_quests.push("Tutorial")
                            await profileModel.updateOne({userID:authorId},{current_title:"Hero of Aube",titles:foundUser.titles.push("Hero of Aube"),main_quest_phase:"1",completed_quests:foundUser.completed_quests,main_quest:"KS-ZS-MQ1"})
                                }
                                else{
                                    interaction.reply({content:`You have not completed the quest "Aube Town's Hero" yet, complete it to continue!`,ephemeral:true})
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
                                    value:`**Go to the Guild District and use "/Progressmainquest" command to continue**`
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
                                        value:`**Press /Progressmainquest to continue to round 2**`
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
                                        value:`**Press /Progressmainquest to continue to round 2**`
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
                                        value:`**Press /Progressmainquest to continue to round 2**`
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
                        await profileModel.updateOne({userID:interaction.user.id},{main_quest_phase:6,guild:guild,guild_rank:"E"})
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