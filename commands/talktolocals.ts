import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import sample from 'lodash.sample'
import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'

export default new MyCommandSlashBuilder({ name: 'talktolocals', description: 'talk to the locals of the place' }).setDo(
    async (bot, interaction) => {

        const authorId = interaction.user.id;
        const guildID = interaction.guildId;
        const exceptionEmbed = new MessageEmbed()
        .setColor('RED')
        .setTitle('INTERACTION TIMED OUT')
        .setDescription(`Oops! your interaction has been timed out as it has crossed the waiting limit for your action.\n\nHowever, don't worry! simply use the command again to restart.`)
        


        profileModel.exists({userID:authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    profileModel.findOne({userID:authorId},async function(err,foundUser) {
                        if(err){
                            console.log(err);
                            
                        }
                        else{
                            if(foundUser.main_quest == "Tutorial" && Number(foundUser.main_quest_phase)<7){
                                interaction.reply({content:`You cannot use this command right now! please complete the tutorial`,ephemeral:true})
                            }
                            else{
                                if(foundUser.dungeon.status){
                                    interaction.reply({content:`You cannot use this command inside a dungeon!`,ephemeral:true})
                                   }
                                   else{
                                    let btnraw= new MessageActionRow().addComponents([
                                        new MessageButton().setCustomId("backward").setStyle("PRIMARY").setLabel("⏪"),
                                        new MessageButton().setCustomId("stop").setStyle("DANGER").setLabel("stop"),
                                        new MessageButton().setCustomId("forward").setStyle("PRIMARY").setLabel("⏩"),
                                        
                                    ])
                                    let dialogue
                                    let dialogueembed
                                    let totalEmbeds = []
                                    if(foundUser.kingdom == "solarstrio"){
                                        if(foundUser.city_town == "aube"){
                                            if(foundUser.location == "The Terrific Troll Tavern"){
                                                dialogue = [
                                                    `Lafe: “The “Backbreaker” is the most famous choice of drink in all of Solarstrio, with its name originating from the fact that it takes away the ability to walk straight of even the sturdiest of Crofters and has at times, even knocked them out completely.”`,
                                                    `Hecuba: “Did you know that the Radiantura’s hooves glow in the dark? This allows the Radiantura to navigate through the dark, making it a popular animal among the people here in Aube Town, who often use them for transportation at night.`,
                                                    `Marcoh: I often come here to chat with Guild Rangers. That is because it is law that Tavern Owners must provide free food and lodging to Rangers who are passing by. Rangers use Taverns to rest up and heal. I mean, look at yourself, don’t you feel refreshed already?\n**[You can visit Taverns to heal yourself fully, You can visit them indefinitely.]**`
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                                
                                                }
                                            else if (foundUser.location == "The Lager Estate"){
                                                dialogue = [
                                                    `Livilla: My house is at the edge of the town, and due to the constant dust storms in the area, it is never clean. Everyday I clean it, only for it to get dirty all over again.”`,
                                                    `Thaddeus: Ever seen a Radiantura stranger? They are just amazing, especially their hooves which glow in the dark! Makes traveling at night a lot easier for both me…and the bandits. Ugh.”`,
                                                    `Bernard: “Argh! I work at the Lager Brewery and those Beer Buccaneers are constantly raiding us to steal crates full of Backbreaker. It is really affecting our business. You look reliable, maybe you want to give us a hand? Visit the Guild Outpost, we have sent a request there.”`,
                                                    
                                                ] 

                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if (foundUser.location == "Crofter's Market"){
                                                dialogue = [
                                                    `Latimer: “The invention of Steam-Powered tools has really increased the efficiency of us Crofters. They’re just plain better than our old equipment. You should test them on your adventures when you get a chance.”`,
                                                    `August: “Welcome to Aube Town stranger! Have you checked out our famous Solarcorn yet? They’re very flavourful and their stalks are so strong, they repel the small sand storms that emerge from the Badlands! These boys basically grow themselves!”`,
                                                    `Bernard: “Argh! I work at the Lager Brewery and those Beer Buccaneers are constantly raiding us to steal crates full of Backbreaker. It is really affecting our business. You look reliable, maybe you want to give us a hand? Visit the Guild Outpost, we have sent a request there.”`,
                                                    `Jesse: “The Castellan Fields are well known for their farming of Solarcorn. It is a type of golden-hued corn that is known for its high yield and its ability to thrive in hot and dry climates. The kernels of Solarcorn are large and plump, and they have a sweet and nutty flavor that makes them a popular ingredient in many local dishes. The stalks of Solarcorn are also tall and sturdy, making them well-suited for use as feed for livestock such as Radiantura. Additionally, the stalks of Solarcorn can be used to make a variety of products such as rope, baskets, and even paper. The Solarcorn is a hardy crop that requires little water and can withstand the dust clouds that sweep through the area from time to time, it is a staple for the crofters of Aube Town and the Castellan Fields. You could say I am somewhat of a Solarcorn connoisseur.”`
                                                    
                                                ]
                                                
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                                
                                                
                                            }
                                            else if (foundUser.location == "Aube Town Guild Outpost"){
                                                dialogue = [
                                                    `Silas: “Feeling tired after all that ruckus from the other day? Get yourself a Backbreaker at the local tavern. That ought to fix ya up!”`,
                                                    `August: “Welcome to Aube Town stranger! Have you checked out our famous Solarcorn yet? They’re very flavourful and their stalks are so strong, they repel the small sand storms that emerge from the Badlands! These boys basically grow themselves!”`,
                                                    `Elijah: “You wanna get to Zorya? Well, it's a long way towards the west. I recommend taking a ride on one of the Stagecoaches that drives you there. Beware of the bandits though. I recommend keeping a weapon on yourself at all times.”`,
                                                    `Nell: “People have stopped chopping down Castellan Sunshades ever since those Treemics decided to make their home in the forest clearing.”`
                                                    
                                                ]
                                                
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                                
                                            }
                                            else if (foundUser.location == "Town Centre"){
                                                dialogue = [
                                                    `Silas: “Feeling tired after all that ruckus from the other day? Get yourself a Backbreaker at the local tavern. That ought to fix ya up!”`,
                                                    `August: “Welcome to Aube Town stranger! Have you checked out our famous Solarcorn yet? They’re very flavourful and their stalks are so strong, they repel the small sand storms that emerge from the Badlands! These boys basically grow themselves!”`,
                                                    `Elijah: “You wanna get to Zorya? Well, it's a long way towards the west. I recommend taking a ride on one of the Stagecoaches that drives you there. Beware of the bandits though. I recommend keeping a weapon on yourself at all times.”`,
                                                    `Nell: “People have stopped chopping down Castellan Sunshades ever since those Treemics decided to make their home in the forest clearing.”`
                                                    
                                                ]
                                                
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                                
                                            }
                                            else{
                                                dialogue = [`Unfortutanely no one could be found to talk in the proximity!`]

                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            
                                        }
                                        else if(foundUser.city_town == "ellior"){
                                            dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Failed')
                                                    .setDescription(`No one could be found to talk in the proximity!`)

                                                    totalEmbeds.push(dialogueembed)

                                                    
                                        }
                                        else if(foundUser.city_town == "Castellan Fields"){
                                            dialogueembed = new MessageEmbed()
                                            .setColor('RANDOM')
                                            .setTitle('Dialogue Failed')
                                            .setDescription(`No one could be found to talk in the proximity!`)

                                            totalEmbeds.push(dialogueembed)
                                        }
                                        else if(foundUser.city_town == "Sunshade Forest"){
                                            dialogueembed = new MessageEmbed()
                                            .setColor('RANDOM')
                                            .setTitle('Dialogue Failed')
                                            .setDescription(`No one could be found to talk in the proximity!`)

                                            totalEmbeds.push(dialogueembed)
                                        }
                                        else if(foundUser.city_town == "The Badlands"){
                                            dialogueembed = new MessageEmbed()
                                            .setColor('RANDOM')
                                            .setTitle('Dialogue Failed')
                                            .setDescription(`No one could be found to talk in the proximity!`)

                                            totalEmbeds.push(dialogueembed)
                                        }
                                        else if(foundUser.city_town == "Zorya"){
                                            if(foundUser.location == "Guild Office"){
                                                if(foundUser.guild == "Chimaera"){
                                                    dialogue = [
                                                        `Vash: “Looks to me like they picked a real chump in you. I wonder how long a weakling like you survives haha.”`,
                                                        `Vash: “Once I am done preparing, the Guild’s top brass are going to see how capable I am. I aim for the top!”`,
                                                        `Jaxon: “Hmm? A new recruit? You seem interesting…definitely.”`,
                                                        `Jaxon: “Ugh…it's been days since I have had my fill…that Vice-Master must be afraid I might be coming for his position. What scum.”`
                                                    ]

                                                    dialogue.map((diag) => {
                                                        dialogueembed = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('Dialogue Initiated')
                                                        .setDescription(`${diag}`)
                                                        totalEmbeds.push(dialogueembed)
                                                    })
                                                }
                                                else if(foundUser.guild == "Belenus"){
                                                    dialogue = [
                                                        `Gylbart: “Where is my lucky star? Ah, I am holding it.”`,
                                                        `Gylbart: “I will protect you, friend.”`,
                                                        `Zaccheus: “Guild Rangers can often find themselves on dangerous paths. Thus, it is important to be prepared and not shy away from requesting aid.”`,
                                                        `Zaccheus: “There is still hope in the most dire of situations.”`
                                                    ]

                                                    dialogue.map((diag) => {
                                                        dialogueembed = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('Dialogue Initiated')
                                                        .setDescription(`${diag}`)
                                                        totalEmbeds.push(dialogueembed)
                                                    })
                                                }
                                                else if(foundUser.guild == "Tetsuryu"){
                                                    dialogue = [
                                                        `Zavyr: “As you are now, shouldn’t you be spending your time training, rather than wasting it on useless chatter?” `,
                                                        `Zavyr: “This is the last you will see of me in your rank.”`,
                                                        `Zuri: “Hello Ranger. I wish you good luck on your travels. Perhaps we can work together some day.”`,
                                                        `Zuri: “I am waiting patiently for my next orders. It has been days.”`
                                                    ]

                                                    dialogue.map((diag) => {
                                                        dialogueembed = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('Dialogue Initiated')
                                                        .setDescription(`${diag}`)
                                                        totalEmbeds.push(dialogueembed)
                                                    })
                                                }
                                                else if(foundUser.guild == "Fenris"){
                                                    dialogue = [
                                                        `Ayden: “I just hope I don’t get trampled out there haha, get it? Because I am a bug? No? You’ll get it eventually.”`,
                                                        `Ayden: “Check out my new shoes, with these, I will look even more fantastic when I am out there.”`,
                                                        `Haelee: “If you had taken another step, your head would have started rolling.”`,
                                                        `Haelee: “Stand upright when you talk to me Ranger.”`
                                                    ]

                                                    dialogue.map((diag) => {
                                                        dialogueembed = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('Dialogue Initiated')
                                                        .setDescription(`${diag}`)
                                                        totalEmbeds.push(dialogueembed)
                                                    })
                                                }
                                                else if(foundUser.guild == "Gleipnir"){
                                                    dialogue = [
                                                        `Valefor: “Oi Ranger! Since it's a brand new start for both of us, from here on, you’re my rival!”`,
                                                        `Valefor: “I have many whom I want to show my capabilities to, but only after I shed my lineage first.”`,
                                                        `Everest: “So you’re the new recruit? You seem capable and dependable. Do a good job out there!”`,
                                                        `Everest: “It is a dangerous world out there, and you should know when to back down. But all that means nothing if you have someone to protect.”`
                                                    ]
                                                    dialogue.map((diag) => {
                                                        dialogueembed = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('Dialogue Initiated')
                                                        .setDescription(`${diag}`)
                                                        totalEmbeds.push(dialogueembed)
                                                    })
                                                }
                                                else if(foundUser.guild == "Hammerfaust"){
                                                    dialogue = [
                                                        `Ashlei: “I am here to prove myself. I sincerely hope you don’t get in my way.”`,
                                                        `Ashlei: “What is a royalty like me doing in this guild? I should ask myself the same thing.”`,
                                                        `Melor: **listening to something from a wired device, does not notice you.**`,
                                                        `Melor: **Grabs their gun as they notice you approaching them. Better back off.**`
                                                    ]

                                                    dialogue.map((diag) => {
                                                        dialogueembed = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('Dialogue Initiated')
                                                        .setDescription(`${diag}`)
                                                        totalEmbeds.push(dialogueembed)
                                                    })
                                                }
                                                else if(foundUser.guild == "Eisenherz"){
                                                    dialogue = [
                                                        `Json: “Finally made it here huh, my Dad would be proud.”`,
                                                        `Json: “We will soon be going to leave on our own separate missions but if you ever find me in a bar, we will have a party!”`,
                                                        `Rami: “Hey Ranger! I sure hope you can become a valuable asset to our cause…or me hehe!”`,
                                                        `Rami: “Give your best in every fight, Ranger. There are many among us who have high expectations for you.”`
                                                    ]

                                                    dialogue.map((diag) => {
                                                        dialogueembed = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('Dialogue Initiated')
                                                        .setDescription(`${diag}`)
                                                        totalEmbeds.push(dialogueembed)
                                                    })
                                                }
                                                else if(foundUser.guild == "Maledictus"){
                                                    dialogue = [
                                                        `Elbert: **sniff** “Hmm…you don’t smell weak to me. It is a pleasure to be in the same team.”`,
                                                        `Elbert: “Oh hey there, I was just checking if all my potions were packed and weapons were in good condition. Remember, you can never be too prepared.”`,
                                                        `Ian: “Be careful out there Ranger! Evil spirits are lurking in every corner!”`,
                                                        `Ian: “A handshake? I can’t…cause that one time I almost choked a Ranger trying to give them a handshake.”`
                                                    ]

                                                    dialogue.map((diag) => {
                                                        dialogueembed = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('Dialogue Initiated')
                                                        .setDescription(`${diag}`)
                                                        totalEmbeds.push(dialogueembed)
                                                    })
                                                }
                                                else if(foundUser.guild == "Blackfin"){
                                                    dialogue = [
                                                        `Yoel: “We have both successfully taken our first steps towards bettering this world! I feel ecstatic!”`,
                                                        `Yoel: “People who try to make this world worse for others should be punishable by death.”`,
                                                        `Barak: “A handshake? I can’t…cause that one time I almost choked a Ranger trying to give them a handshake.”`,
                                                        `Barak: “The only person you can 100% rely on is yourself. But your body may not be as reliable against a powerful enemy. So you should carry explosives with you. They will give your body time to rest and make up for lost opportunities.”`
                                                    ]

                                                    dialogue.map((diag) => {
                                                        dialogueembed = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('Dialogue Initiated')
                                                        .setDescription(`${diag}`)
                                                        totalEmbeds.push(dialogueembed)
                                                    })
                                                }
                                                else if(foundUser.guild == "Suncrest"){
                                                    dialogue = [
                                                        `Avani: “Hello fellow Ranger. Let’s work together and watch each other's back from here on shall we?”`,
                                                        `Avani: “The most dangerous enemy you have is the past you cannot overcome.”`,
                                                        `Darcy: “HEY NEW RECRUIT GAHAHAHA! WHAT’S UP WITH THAT PUNY WEAPON OF YOURS GAHAHAHA!”`,
                                                        `Darcy: “I JUST LOOOOOOVE WHEN THE REDNESS OF THE BLOOD MIXES WITH THE BLUE HUE OF THE SEA! IT IS AWESOME GAHAHAHA!”`
                                                    ]

                                                    dialogue.map((diag) => {
                                                        dialogueembed = new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('Dialogue Initiated')
                                                        .setDescription(`${diag}`)
                                                        totalEmbeds.push(dialogueembed)
                                                    })
                                                }
                                                
                                            }
                                            else if (foundUser.location == "Auriga Sails Company"){
                                                dialogue = [
                                                    `Archie: “In its center, lies a giant basin where the seven waves of Vearth blend for the last time before each of them dissipate towards different directions.”`,
                                                    `Bowles: “The sheer scale of trade that occurs in Zorya is comparable to some of the best ports in the world. Due to Solarstrio’s famous Golden Dutchman Fleet, trading goods has become extremely easy and quick for both the locals and the foreigners. This is thanks to Earl Auriga’s famous Auriga Sails Company and their highly skilled Shipwrights who were able to make the Golden Fleet of ships.”`,
                                                    
                                                ]

                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if (foundUser.location == "Astro Avenue"){
                                                dialogue = [
                                                    `Adira: “Have you bought yourself an Astrolabe yet? We believe they bring good luck, so I think you should buy one while you are visiting! Everyone can use a bit of luck!”`,
                                                    `Lysandra: "I hope you're enjoying your stay in Zorya! You should definitely check out the Cloud Gardens while you're here. It's a marvel of engineering, with all sorts of unique steam-powered plants."`,
                                                    `Darleston: “The State of Zorya is one of the largest states in the Kingdom of Solarstrio. It is also situated at the center of the Kingdom in terms of its borders. Due to its location, Zorya is a state where Solarii from all over Solarstrio meet and live together. As such, Zorya is a state that is often associated with progress and modernity.”`,
                                                    `Felix: “Don’t you look down on the Earls from Solarstrio. They have been chosen based on merit and skill and thus, they are all insanely strong. Each of the Earls’ is as strong as any Guild Vice-Masters and some of them are even comparable to the Grandmasters of top Guilds. Yes, they are all that strong.”`
                                                ]

                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if (foundUser.location == "Sun Archives"){
                                                dialogue = [
                                                    `Nikolai: "Zorya is a State of innovation and progress. We're always pushing the boundaries of what's possible with steam power, and it's what makes us the envy of the rest of Solarstrio."`,
                                                    `Francis: “In terms of technology, steam energy is really a big influence in Zorya and the Kingdom as a whole. It was first invented and patented in Zorya, and that shows. From the Fleet of Airships to the most basic of tools, everything here uses Steam energy. This means that the Kingdom requires a large amount of Steam energy. Fortunately, there are a few large mines around Zorya where a precious metal known as the “Sunstone” is found. It is extremely hot and easy to transform into Steam. This metal is however not exported as it is a Fossil Fuel that has limited availability. King Helios has banned its export completely. King Helios believes that export of this metal would bring about the kind of greed that would swallow the Kingdom.”`,
                                                    
                                                ]

                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if (foundUser.location == "Cloud Gardens"){
                                                dialogue = [
                                                    `Emilia: “One of these days I would finally save enough money to buy a ticket to travel on an Airship. My dream to fly in the sky would finally come true!”`,
                                                    `Crabb: “How about you stand away, close to the gate from the direction you just walked in. Your poor look is kinda bumming out my entire area. Why don’t you ride a Stagecoach with people you fit in with?”`,
                                                    
                                                ]

                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if (foundUser.location == "Golden Terminal"){
                                                dialogue = [
                                                    `Viktor: “Steam energy is awesome! It makes things happen without the use of any Spyr. Although I have heard that someone on the Continent of Srada has created a new kind of energy called “Electricity”. They say it is far better than our Steam energy. Bogus is what I say.”`,
                                                    `Benajah: “The Steam Trains feel like something out of this world. They’re extremely fast and sturdy. They’re a fairly recent invention by science years but they’re already replacing unsafe domestic travel via Stagecoaches. The only problem I see with them is that you can only ride them to and from other States in Solarstrio.”`,
                                                    
                                                    
                                                ]

                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if (foundUser.location == "Castle Luminar"){
                                                dialogue = [
                                                    `Edgar: “Castle Luminar…man what a magnificent work of art. I would love to visit it once and take a tour but it isn’t just open to anyone. That is why I have become an Adventurer. Maybe one day I would be big enough for Earl Auriga to personally request me. What a sight that would be.”`,
                                                    `Leslie: “Despite the water gushing down regularly from the Zephyr Mountain, somehow, it appears still within the basin. In fact, the water is so clean without impurities and clear without any ripples, the tourists and citizens can spot a giant Dragon carcass on the seabed.”`,
                                                    
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if (foundUser.location == "Siewelle Port"){
                                                dialogue = [
                                                    `Leif: “Hey there, I am from the Typhoon Guild, our Headquarters is in the Country of Haganeshiro. I was here on a mission so I figured I would buy some rare items that have come for trade. You never know whom you may meet on your adventures that might need the item! Then again, that might be the reason I never have money for lodging…”`,
                                                    `Celia: "The Seven Waves are what make Zorya special. They're the reason we have seven different ports, and why the State is such a bustling hub of trade and commerce."`,
                                                    `Ammiras: “Naturally trade is very strong in Zorya as it has 7 Ports all around that are guarded by the Seven Sea Gates that control the flow of water from the Seven Waves that emerge from the Zephyr Mountain in the North.”`
                                                    
                                                    
                                                ]

                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if (foundUser.location == "Black Market"){
                                                dialogue = [
                                                    `Luciana: “There are some people who claim that Earl Auriga used his power as an Earl to amass wealth, but in reality Earl Auriga had always owned Auriga Sails Company and only after making his business a success, did he ever run for the position of Earl. He even passed the ownership of the company to his sister after becoming the Earl. Personally I think Earl Auriga is the reason Zorya has become as it is today, and people with such opinions should just keep their mouths shut.”`,
                                                    
                                                    
                                                ]

                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            
                                            
                                               
                                                
                                            
                                            
                                        }
                                        else if(foundUser.city_town == "Dragon's Den"){
                                            dialogueembed = new MessageEmbed()
                                            .setColor('RANDOM')
                                            .setTitle('Dialogue Failed')
                                            .setDescription(`No one could be found to talk in the proximity!`)

                                            totalEmbeds.push(dialogueembed)
                                        }
                                        else if(foundUser.city_town == "Sunstone Mines"){
                                            dialogueembed = new MessageEmbed()
                                            .setColor('RANDOM')
                                            .setTitle('Dialogue Failed')
                                            .setDescription(`No one could be found to talk in the proximity!`)

                                            totalEmbeds.push(dialogueembed)
                                        }
                                        else if(foundUser.city_town == "Zephyr Mountain"){
                                            dialogueembed = new MessageEmbed()
                                            .setColor('RANDOM')
                                            .setTitle('Dialogue Failed')
                                            .setDescription(`No one could be found to talk in the proximity!`)

                                            totalEmbeds.push(dialogueembed)
                                        }
                                        else if(foundUser.city_town == "Orld Tree Husk"){
                                            dialogueembed = new MessageEmbed()
                                            .setColor('RANDOM')
                                            .setTitle('Dialogue Failed')
                                            .setDescription(`No one could be found to talk in the proximity!`)

                                            totalEmbeds.push(dialogueembed)
                                        }
                                        else if(foundUser.city_town == "Werfall"){
                                            if(foundUser.location == "Ranger Tents"){
                                                dialogue = [
                                                    `Sowyer: Looking for Rangers in your Guild? Are you sure they aren’t dead already? But if they aren’t, they should eventually show up at the Werfall Ranger Center.`,
                                                    `Gannon: I have been stationed here for a year now. There’s nothing I haven’t seen. Most of my friends are either dead or have gone insane. But I hear there are some Rangers here who have been in this shithole even longer than me. Since the incident happened. I just wish I could find them and cause them the pain they have caused me.`,
                                                    `Amyra: It is believed that when a C2 Nightmare took over Werfall, the Gatekeeper escaped into our world, leaving his post. Ever since then, we haven’t been able to fully purge the Nightmare.`,
                                                    `Bracks: I miss my children and my wife. I wonder what they must be up to, right about now.`
                                                    
                                                ]

                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else{
                                                dialogue = [
                                                    `Colliff: It’s really strange what happened here. Abyssals are not supposed to be intelligent enough to make decisions. They work in patterns that are predictable. This is the reason Werfall has the entire world baffled.`,
                                                    `Abner: You didn’t hear this from me but I think King Helios is knowingly letting this Nightmare sit…I mean have you seen how much Grimstone we have mined this year? Sheesh.`,
                                                    `Isham: I’ve heard those Abyssals are very different from the Spyriths we Rangers usually fight with. Nevertheless, I am prepared to face them and contribute greatly to this mission.`
                                                      
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            
                                            
                                        }
                                        else if(foundUser.city_town == "Vigia"){
                                            if(foundUser.location == "Ruins of Eldorath"){
                                                dialogue = [
                                                    `Endana: "Ah, a visitor! I'm Endana, lead archaeologist for this site. Careful where you step - we've only just uncovered these wonders. What do you make of our find here? Some believe this imagery depicts the three Eldruid tribes merging, perhaps at this very spot."`,
                                                    `Magnus: "Our latest finds suggest Eldorath's fall coincided with a virulent contagion its healers called the 'Iron Death'. Could it be connected to whatever magic now plagues DeathRust?"`,
                                                    `Grace: "Our latest finds beneath the ruins have unearthed strange carvings matching none of the known Eldruid tribes. I fear there remains much about this city's origins still cloaked in mystery. The archives under my museum hold untold histories just waiting to be discovered."`,
 
                                                ]

                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "The Guilded Cage"){
                                                dialogue = [
                                                    `Leif [Bartender]: "Welcome to The Gilded Cage, Ranger. Care for a drink? Our tavern has been a gathering place for rangers and locals alike for generations. Sit back, relax, and let the tales of Kafig wash over you like the wind through Radohn's wings."`,
                                                    `Nora: "You know, Orin was a true legend around these parts. The stories say he had an uncanny bond with Avian Spyriths, like no other beastmaster. With Radohn's blessings, he commanded the skies and was the founder of our township. His bravery still echoes in our hearts."`,
                                                    `Felix: "Ya ever heard of Basil, the Vice Master of Eterna Guild? They're a force to be reckoned with, even among the S Grades. I've seen him fight…His skills are unmatched, his technique feels like he is the incarnation of Radohn Himself! No wonder they gave him the Ephitet of "Demon Bird".`,
                                                    `Danna [Bard]:\n"In the realm of Vearth, a tale to be told,\nOf a hero named Orin, brave and bold.\nWith Avian Spyriths, he took to the skies,\nProtector of Kafig, where legends arise.\n\nOh, Orin, master of the winged domain,\nWith Radohn's grace, he ruled without restrain.\nThrough battles and storms, he stood tall,\nA beacon of hope for one and all."`
 
                                                ]

                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Trinity Plateau"){
                                                dialogue = [
                                                    `Gaius:  "Some nights when the moon is full, I swear I can still see the shades of the Eldruid chieftains battling upon this hallowed ground. Their alliance holds even in death, Vigia's history is long indeed."`,
                                                    `Ethan: "Have you been to the trinity plateau yet? As long as those swords stand vigil, Eldorath's legacy survives. Its people may be dust, but their deeds of unity against a greater menace live on through the alliance they forged. Perhaps one day the archaeologists will uncover what desperate evil they combined to defeat…"`,
                                                    
                                                ]

                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Temple of Tears"){
                                                dialogue = [
                                                    `Zoya: "In desperate times, many come seek solace in Morozh's tears. With DeathRust so near, is it any wonder despair darkens men's hearts? His waters may not slake thirst but can calm our deepest fears. All are welcome within the temple of the God of Despair."`,
                                                    
                                                ]

                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Esparta Museum"){
                                                dialogue = [
                                                    `Olivia: "Hello! Can you please give me the directions to the Artifact section of the museum? I am a huge enthusiast of history and archaeology, I heard Esparta Museum houses some of the rarest artifacts and relics in existence!"`,
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Fort Primis"){
                                                dialogue = [
                                                    `Carlsen[Sol Crusader]: "The Ferromites press ever closer to the wall. For over a thousand years the Crusaders have held firm, all that stands between Vigia and the curse of DeathRust. Our order was forged in those dark woods, and there our watch shall endure until the world's end."`,
                                                    `Noah: "The Word is that there are increased movements in the forest - seems the dead march in greater numbers of late. Legend says DeathRust was once a thriving land, before some dark magic turned its populace feral and decaying. Now only rust and ruin remain…"`
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Sol Barracks"){
                                                dialogue = [
                                                    `Brock: "My lad Boris did well holding the forest's edge yesterday. Not many can say they've faced the undead and lived to tell. SolGate is the last line against the rust should they ever breach the Gate. The city owes its safety to the Sol Crusaders alone!"`,
                                                    `Mica: "Business is booming with travelers - some come simply to marvel at our defenses, others seek relics of the north. But all find comfort within our walls. As long as the Crusaders hold the wall, Vigia remains a safe haven between here and DeathRust."`
                                                    
                                                    
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Castle Artemis"){
                                                dialogue = [
                                                    `Grumio: "Earl Arvid pores over battlefield strategies late into the night, determined to bolster our defenses. With DeathRust so near, no precaution is too great. The Crusaders live and die by his word, and Vigia's fate remains tied to the SolGate."`,
                                                    `Mason: "The Sol Crusaders are one of the many knight chapters we have in Solarstrio, the knights serve and live for the people! It is the might of our king and the knights that has made Solarstrio so great, all hail king Helios!"`
 
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Vigia Ranger Centre"){
                                                dialogue = [
                                                    `Ealdor: "In my days, we faced threats from DeathRust like you face a morning breeze. Stay sharp, rookies, and learn from those who've danced with Ferromites."`,
                                                    `Thalassa: "Vigia might have the protection of Earl Arvid and Sol Crusaders but remember, we are Rangers! We are the greatest weapon of humanity and we are the last line of Defense for Vigia. Stay Focussed lads!"`
 
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                           
                                           
                                        }
                                        else if(foundUser.city_town == "Raflese"){
                                            if(foundUser.location == "Vita Street"){
                                                dialogue = [
                                                    `Elysia : "Woah, a Ranger! Are you here for our herbs and potions? Our Vita Street is known for the best concoctions and herbal remedies in all of solarstrio! Make sure to try them out, I'm sure they will help you in your quests."`,
                                                    `Cesile : "My family has been a resident of raflese for generations, The town's devotion to Goddess Rayelle and the Maiden of Purity is deeply rooted in our traditions. We believe in the power of purity and the sacred bond between humans and nature. It's a legacy we carry with pride, for it is what saved our beloved town from desolation. Our current maiden is just the best! She works really hard to make our town flourish and sustain it's purity."`,
                                                    `Gorin : "You see all these channels of water streams running through our entire town? They irrigate our plants and helps all us residents grow as many plants and flowers as we want in our personal gardens! Visit mine when you have time!"`,
                                                    `Genella : "The Apothecaries in our town are known for their generational talent and knowledge of herbs and medicines. You can find many herbalists and clinics in the Vita Street, as we have a saying that you can never get sick in Raflese haha! It's sad that many of our best talents are leaving Raflese to pursue a life of luxury in the bigger states and even other countries."`
 
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Eden Garden"){
                                                dialogue = [
                                                    `Rudy : "Have you met lady Silla yet? She is our current Maiden of Purity, our town has always been governed by not a mayor but our beloved Maidens. Lady Silla's beauty is really otherworldly! However, she lives a cruel fate of remaining a virgin and serving goddess Rayelle for eternity."`,
                                                    `Professor Thorne: “Greetings, traveler! I'm Professor Thorne, a botanist studying the wonders of Eden Garden, The exotic plants, flowers and spices that grow here is nothing short of divine! Legend has it that a saintess named Rafflesia sacrificed herself to invoke the goddess Rayelle, transforming the barren land into this vibrant paradise. The Tree of Life, standing at the garden's heart, symbolizes her selfless act and the town's gratitude. It's truly a testament to the power of nature and the divine."`,
                                                    
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Plantastic Inn"){
                                                dialogue = [
                                                    `Amelia : "You seem to be new around here aren't you? Make sure to try out Our vegetarian cuisine which is renowned for its fusion of flavors and the creative use of plants and herbs. The Plantastic Inn serves dishes like "Herbal Bliss Stew" and "Blossom Salad," tantalizing your taste buds with aromatic spices and unique combinations. Raflese's spices, carefully cultivated in our gardens, add a touch of enchantment to every dish."`,
                                                    `Kasilla : "Ugh! I hate those researchers at the Green Keep, first they invaded our culture, our land and now they are freely using our resources for their selfish research and experiments! Only if they were not backed by the state, lady Silla would have driven them out ages ago!"`
                                                    
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "The Green Keep"){
                                                dialogue = [
                                                    `Guard: "You over there! where do you think you are trespassing? Even if you are a ranger, access to the Green Keep is restricted at this time. Only those with higher ranger rank or clearance from Dr. Rosalie, our head researcher, may enter."`
                                                    
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Raflese Guild Outpost"){
                                                dialogue = [
                                                    `Curie : "Have you heard about the Bleeding Gorge? It's a cursed place located nearby, why cursed you say? The water that flows there is blood red ya know and no one knows the reason! What's worse is that the place is completely infested with carnivorous mangroves and dangerous spyriths. Good thing that the Emperal Brigade has restricted access to the place now, you seem like a ranger…You should be good to go then, be careful though!"`
                                                    
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                        }
                                        else if(foundUser.city_town == "Kafig"){
                                            if(foundUser.location == "Avian Square"){
                                                dialogue = [
                                                    `Dora: "Welcome to Kafig, traveler! Did you know that our town is famous for its Avian Spyriths? We believe they are descendants of the mighty Radohn, the ruler of skies. It's a sight to behold when they take to the air!"`,
                                                    `Evanko: "You seem to be a Ranger, did you try venturing into Asche Peak? The soil there has turned to soot and radiates intense heat.The legend that Radohn slumbers in Asche Peak might as well be true!"`,
                                                    `Amelia : "Ah, the Avian Square! It's the heart of our town, where we gather to honor Radohn. We leave offerings at the statue's feet to show our respect. The legend says Radohn's flames turned Asche Peak black, giving it a mystical aura."`
 
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "The Guilded Cage"){
                                                dialogue = [
                                                    `Leif [Bartender]: "Welcome to The Gilded Cage, Ranger. Care for a drink? Our tavern has been a gathering place for rangers and locals alike for generations. Sit back, relax, and let the tales of Kafig wash over you like the wind through Radohn's wings."`,
                                                    `Nora: "You know, Orin was a true legend around these parts. The stories say he had an uncanny bond with Avian Spyriths, like no other beastmaster. With Radohn's blessings, he commanded the skies and was the founder of our township. His bravery still echoes in our hearts."`,
                                                    `Felix: "Ya ever heard of Basil, the Vice Master of Eterna Guild? They're a force to be reckoned with, even among the S Grades. I've seen him fight…His skills are unmatched, his technique feels like he is the incarnation of Radohn Himself! No wonder they gave him the Ephitet of "Demon Bird".`,
                                                    `Danna [Bard]:\n"In the realm of Vearth, a tale to be told,\nOf a hero named Orin, brave and bold.\nWith Avian Spyriths, he took to the skies,\nProtector of Kafig, where legends arise.\n\nOh, Orin, master of the winged domain,\nWith Radohn's grace, he ruled without restrain.\nThrough battles and storms, he stood tall,\nA beacon of hope for one and all."`
                                                    
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Cloud Haven"){
                                                dialogue = [
                                                    `Lucas: "Are you visiting the Cloud Haven for the first time? It's a remarkable cylindrical building that resembles a giant bird cage. Many exotic Spyriths find refuge there, coming from Asche Peak or even migrating from distant lands. It's a testament to our town's love for these magnificent creatures."`,
                                                    `Sophie: "If you're looking for a thrilling adventure, try forging a spyralink contract in the Cloud Haven! Rangers visit there to bond with the fantastic Avian Spyriths and gain a loyal companion for their travels. But be warned, it's not an easy task and requires great skill."`
                                                    
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Radohn Roost"){
                                                dialogue = [
                                                    `Bella: "Have you come to seek solace in the warm flames of Radohn? this place is a sacred place with small shrines dedicated to Radohn. Climb the steep steps and reach the main altar with an eternal flame, symbolizing Radohn's eternal rule over the skies. The view from there is breathtaking."`
                                                    
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Kafig Guild Outpost"){
                                                dialogue = [
                                                    `Hedge: "We take great pride in our own Basil, the Vice Master of Eterna Guild. Basil is a prodigy and one of the strongest rangers you'll ever meet. Born and raised right here in Kafig, the town cherishes and celebrates their achievements. It's a testament to the strength and spirit of our community."`
                                                    
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                        }
                                        else if(foundUser.city_town == "Dremenlond"){
                                            if(foundUser.location == "Royal District"){
                                                dialogue = [
                                                    `Fernand : "Tch, what is filth such as you doing in this zone!? This is why I don't like you rangers, stepping foot in places you don't belong. I don't understand how common filth even awakens as an Ajin, It's a realm reserved for us of the Noble Bloodline. Now scram!"`,
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Marché Royale"){
                                                dialogue = [
                                                    `Forger: "Yo fellow Ranger! Are you here for the Equipments at Marché Royale? It doesn't seem like you can afford them though, only Ajins belonging to nobility or that of Higher Grades can imagine buying those stuff. Anyways you should definitely stay at the Sapphire Star hotel! It's a premium hotel with the best ambience and food in all of the kingdom, free lodging anywhere is one of the best perks of being a ranger haha."`
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Lumiere Academy"){
                                                dialogue = [
                                                    `Matilda: "Welcome to the Zone of Excellence good mister, Lumiere Academy's huge campus makes up most of the zone from college of Medicine to fine Arts there is a reputed college for every field there is! The facilities and wisdom it possesses far surpasses any of those in the entirety of Vearth, However unranked scholars like me can't even get enough books to study. I will keep working hard and I'm sure I will someday get ranked!"`,
                                                    `Cassandra: "Greetings, fellow seeker of knowledge. Lumiere Academy is the beacon of enlightenment in Dremenlond. Our esteemed scholars delve into Spyr, relics, politics, and more. Oh, and the Infinite Library... it holds the wisdom of ages.If it is wisdom or the lifestyle of your dreams, then you have come to the right place."`,
                                                    `Eza : "Um sorry, I'm just an intern working under lady Lynda, she is the best in all of solarstrio when it comes to Medical knowledge, she is the 5th seat of lumiere! It's not glamorous working as an intern, but uhm… it's a stepping stone to greatness. I hope to contribute to research and gain recognition someday! Now if you'll excuse me, or lady Lynda might get angry."`,
                                                    `Jasper: "Leave me alone, I need to study and research as hard as I can for the coming 'Joint Evaluation'. What? You don't know about it? It is the annual examination of Lumiere Academy which evaluates the full potential of all the students and scholars in the zone of excellence, even the professors are not an exemption. Based on the results the top rankers are given a rank from 1-5000 which is tattoo'd on their face, just you watch I'll become a Ranked Scholar soon!" `
                                                    
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Hotel Sapphire Star"){
                                                dialogue = [
                                                    `Quentin : "Did you hear? The second seat of Lumiere Mr. Felski was recently rewarded with Baronship by the Royal Council for his Unbelievable Contribution to Spyr theory and energy management, he was also the Incharge of the team that built the Storm Collider Tower in Ingenia."`
                                                    
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Reich Auction House"){
                                                dialogue = [
                                                    `Denise: "I heard the Reich Auction House is going to hold another grand auction next week and the sixth heaven of Haganeshiro 'Venom Fang' Akira is coming to attend it. He's one of the richest men on Vearth and the sect leader of one of the Six Great Sects of Haganeshiro, the rumors about him and his sect are….scary, I hope he doesn't brew any trouble over here."`
                                                    
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Dremenlond Ranger Centre"){
                                                dialogue = [
                                                    `Desmond: "New to Dremenlond are we? this place reeks of wealth and power. The state is divided into the 'Zone of Noblesse' and 'Zone of Excellence' commoners like me can't even think of stepping foot inside the gates of Noblesse. However, restrictions such as that don't matter to you rangers do they? I'm so damn envious.Be careful though, those so called Nobles are not fond of foreign blood into their territory."`
                                                    
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "The Royal Council"){
                                                dialogue = [
                                                    `Penelope: "Oi you ranger over there! Where do you think you are heading? It's the Royal Council's palace! Can't you see the statues of the four Earls carved on the walls? It's the council of the great four elders who rule and administer solarstrio on that usur- I mean our king's behalf, their authority is second only to king Helios.The four elders were the former Earls and heads of the four great houses and the pinnacle of all Royalty. Be grateful that you are in presence of me, lady Penelope of the house of Luka, directly affiliated to the House of Noxilus! Now go away and don't sully the statue of our lord Solis."`
   
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                        }
                                        else if(foundUser.city_town == "Vesper"){
                                            if(foundUser.location == "Gaiyo Plaza"){
                                                dialogue = [
                                                    `Godrëk : "You ssseem to be new around here, I am on my way to the ssstarfall well have you heard about it? It's right in the middle of the plaza, we toss a coin in it to make a wish to the nebula. It's said any wish made with the pure of heart comes true, we believe in since the age of our ancestors. I just wish people consumed by greed stop tainting our sssacred town and ssswamp."`,
                                                    `Tomäk : "The old Stellaris Temple was a revered place of worship for our ancestors who used to worship a giant Nebula flower. Today the temple lies in ruins but is plagued by dangerous swamp spyriths due to high Spyr concentration. It is almost like the temple is retaliating in response to our greed."`
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Veinwalk Quarters"){
                                                dialogue = [
                                                    `Krona : "You know there are many tribes of Lizardmen living in Vesper and all the tribes signed a treaty with the humans to allow them to take as many Nebula Flowers they can as long as there is enough to feed Komodo. In exchange we only ask for food and resources as the swamp and lack of sunlight makes it almost impossible for us to grow anything."`,
                                                    `Ojila : "The weather here is so good isn't it? always cold and cozy as it is always night over here. Wanna accompany me to the Starglow Overlook? Looking at the flowers from up there gives a high and makes me stress free! Let's grab a coffee in the Gazer's Lounge over there, the view is just fantastic!"`,
                                                    `Guma : "Ah it's that time of the year again, the shedding season is almost upon us. When these flowers fall, they do a lot of damage to the skybridge and it becomes unusable for a while…good thing our bridge menders can fix them pretty quick or the entire town would be brought to a standstill!"`
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Starglow Overlook"){
                                                dialogue = [
                                                    `Goruk: "You after the Nebula Flowers too? I wouldn't be shocked if you were, they are among the rarest of flowers afterall. Look up, it's pretty isn't it? Those are all Nebula Flowers hanging at the edges of the veins of Gaiyo Shrooms that look like stars in the night sky, don't attempt to pick them up from up there though…You'll get devoured whole by the Shrooms."`,
                                                    `Jakhar : "The Constellation Mirrors in the Starglow Overlook are a marvel! The reflections create mesmerizing patterns from the glimmering nebula flowers in the sky. The local lizardmen have weaved legends and tales around each one of them, they say there are a total of 139 of them! I go there everyday to try to explore a new one."`,
                                                    
                                                    
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Komodo's Rest"){
                                                dialogue = [
                                                    `Dokra : "Human, Your Spyr flow is different…what do they call you people again…Ajin was it? Anyhow, I wouldn't dare wandering over there, it is where Komodo Sleeps. Komodo is an ancient catastrophe that struck us ages ago, A monster so frightening that even the combined efforts of all the lizardmen tribes couldn't fend it off and here we are, living in fear of it's shadow above the swamp."`,
                                                    
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Mudcape Tavern"){
                                                dialogue = [
                                                    `Dogür : "The Swamp of Abyss earned that ephitet because of it's indefinite depth, we live up here on the legs of the Gaiyo shrooms because of the dangers of the swamp, we lizardmen can survive much longer in the swamp compared to you humans but no one who has delved much deeper has ever returned alive to tell the tale."`,
                                                    `Damian : "Hahaha I will be so rich when the shedding season comes, I'm gonna make a haul out of all the flowers mark my words! And don't you dare try to touch them, they are all mine! Even the finest of gold is priceless before these babies. If I can collect them before they sink too deep, I won't even have to risk my life to those swamp spyriths."`
                                                    
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Vesper Guild Outpost"){
                                                dialogue = [
                                                    `Gabriel : "You know the ancient Lizardmen tribes used to worship a spyrith deity out of pure fear. No one knows what it looks like anymore but they refer it as the "King of Abyss", many rangers over the years have claimed to see it deep in the swamps and only few have ever lived to tell the tale. Whoever we have heard it from claimed to have seen different elemental skills, I can't believe it…spyriths don't usually possess so many elemental affinities"`,
                                                    `Yosha : "Yo, fellow Ranger! Are you looking to go into the depths of the swamp too? it's almost like a dungeon there. You know the swamp of Abyss has a deep intricate network of tunnels that have formed due to the nebula flowers falling down and sinking deep due to their heavy weight, although they are small God knows where all that weight comes from.Anyways, good luck! I might try to go to the swamp tomorrow and try my luck on getting my hands on a nebula flower, if I return alive that is haha."`
                                                    
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            
                                        }
                                        else if(foundUser.city_town == "Lucens"){
                                            if(foundUser.location == "Betta Market Square"){
                                                dialogue = [
                                                    `Hawley: “Hey there! Welcome to Lucens! What do you think of our vibrant little town? It's as cool as the seabreeze…ha! Most people think it's paint but it's really not. Most houses, and other structures were made from the Marvory Stone found near Lucens. It is a special stone that gives it a unique outer hue when we lather it with seawater. Each house in Lucens has its own unique look and a unique hue! We lather it every month so if you return in the future, the town may look totally different!”`,
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Lighthouse Plateau"){
                                                dialogue = [
                                                    `Buck: “Did you know that Lucens is at the southernmost tip of the Gabalt Continent? In fact, our famed Lighthouse Plateau is also quite literally known as the “Southern Tip of Gabalt”. Isn’t that awesome?`,
                                                    `Camille: “Blessings. Ranger. I am on my way to pray at the Temple Adhuc Ecclesia. You should visit it at least once while you’re in town. The Temple was built to pay respects to the Goddess of Sea - Calmara, who in myths, would often visit the locals in times of the past, warning them about the arrival of turbulent times. There is a fountain inside the temple that never stops flowing and contains within it the cleanest water in the world, despite drawing in seawater. Another thing of note is that, even during the arrival of violent sea storms, the flow of the water never changes and stays still. It is believed that the still water would begin to show ripples when harsh times are upon us.”`,
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Makun-Ochi Fishing"){
                                                dialogue = [
                                                    `Crusty: “Ahoy Ranger! Are you here for the Fishing Contest as well? You seem like you can handle your sword, but I wouldn’t say the same about the rod you see here in my hands. I would have you know I am quite famous back in my hometown. But this contest isn’t just for skill, I also need to handle some nasty Sea Spyriths before I can have a glorious catch. How about you team up with me and we split the prize 50-50? I’ve posted a request back at the ‘ol Guild Outpost. See ya!”`,
                                                    `Rosalind: “You didn’t hear this from me but the owner of Tideswept Treasures in the Betta Market Square is full of it. My husband recently caught a rare Sea Spyrith and dumped all his earnings in exchange for a watch which was supposedly owned by Captain Basilica’s Chef crewmate’s uncle. I told my husband he got played by the owner but he said I had gone insane. Women be sane, I’ll prove it to him someday. Until then, I will keep warning travelers such as yourself.”`,
                                                    
                                                    
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Seaside Sculpture Garden"){
                                                dialogue = [
                                                    `Gilmer: “Lucens’ most famous attraction is the Lighthouse Plateau standing as the true edge of the south, but most importantly it is held by the giant stone sculpture of the world renowned Captain Basilica who completed several famous voyages around the world and drew the map of the world. Just like how our town has stood the test of time, the statue of Basilica has withheld the beacon of hope of many voyagers - the lighthouse in his arms for several hundred years, despite the violent waves crashing into it. The statue itself resembles Basilica’s determination to face the strongest of waves in his pursuit of new discoveries.”`,
                                                    `Digby: “The Amphitheatre over at the Seabreeze Pavillion on that cliff there is a hotspot for tourists and other travelers! It is a must visit! They enact stories of voyages left behind by Captain Basilica during his days of exploration. We townsfolk actually each have a family member who is an active participant of the play! In fact, our roles are passed down from generation to generation! I inherited the role from my Father who inherited the role from his father. I play the role of Tree 1. It ain’t bad but I wish my predecessor could’ve inherited a more prominent role like the Beach Rock.”`
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Seabreeze Pavilion"){
                                                dialogue = [
                                                    `Cecilia: “I am just so tired of being stuck in a bad role for the play. I am soooo much better than Carrie. Why should she earn more just because her family inherited that role, even though I would be way better for the role? This is outrageous! And I want to change it. I will make a petition and have other families with bad roles sign it. Then the Mayor will have to act! You should help me, please. I have posted a request at the Local Guild Outpost!”`,
                                                    `Yorick: “You there, have you visited the Seaside Sculpture Garden yet? If you ever visit, please drop by the statue that has my face on it! Yeah, there’s a statue with my face on it. I play as one of Captain Basilica’s crewmates! Since I inherited that role, my family looks after the statue and they very recently chiseled my face over my uncle’s who played the same role before I started. We do this because none of us actually know how Captain Basilica’s crewmates or he himself looked like. I think it is a great concept. We have a share in the play’s earnings and we have to maintain the Statue for the role we’re playing. So yeah, you should drop by.”`
                                                    
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Lucens Guild Outpost"){
                                                dialogue = [
                                                    `Ronni: “Hey, aren’t you a Ranger? I guess you’re really enjoying the scenery huh? Unfortunately I cannot say the same. Have you perhaps heard about the Marvory Stone? The locals wouldn’t shut up about it, ugh. But ever since I heard about them, I cannot stop thinking about them. I mean how can houses made from the same stone, lathered with the same seawater show different hues? And why the hell does that giant Statue not even have a hue, even though it is quite literally half-sunk in the sea? Just thinking of a possible reason is making my head hurt. I was planning to research the Marvory Stone closely but the Marvory Cove is dangerous for me to be traveling alone. How about you tag along? I’ve posted a request at the Guild Outpost. So, I’ll see you soon?”`,
                                                    `Gresham: “I came here to meet Jetta cause I heard he had just returned from Zorya but I couldn’t find him anywhere. Then I heard from the attendant at the Outpost that Jetta immediately left for the shore near the shipwreck. Man loves work. So I am sticking around in the hopes of encountering him once. He is a true inspiration for many in Lucens, his hometown.”`
                                                    
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            
                                        }
                                        else if(foundUser.city_town == "Nottfall"){
                                            if(foundUser.location == "Castle Aurum"){
                                                dialogue = [
                                                    `Lucia: "Castle Aurum, where Earl Solis resides, is the heart of our nightly spectacle. I'm Lucia, the fireworks artisan. All the mesmerizing bursts of color and light that paint the sky come from there. If you want a true display of Nottfall's beauty, be sure to catch the nightly show. It's a sight you won't forget."`,
                                                    `James: “Psst. Just walk away, don’t stand here and draw attention. You see I’m a lookout for Banishing Light. Well…it's unofficial and I’ve yet to actually contribute anything but I aspire to join that group one day!”`
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Solis Island Park"){
                                                dialogue = [
                                                    `Leander: “Did you know that Earl Solis is the only female with that position in Solarstrio? Now you may draw some conclusions from that statement but what if I told you that she’s been in that position for the longest period. Now where’s your judgment?”`,
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Charbar"){
                                                dialogue = [
                                                    `Sterling: "Early riser, are you? Nottfall might seem like a ghost town in the morning, but that's when our Earl Solis's Banishing Daylight task force is at work. We raid the night movers, trying to banish Daydream from our streets. Keep an eye out if you're up with the sun; things can get lively in unexpected ways."`,
                                                    `Gil: "Psst... heard about Daydream? The dream-inducing ecstasy that makes this city buzz in the moonlight. Rumor has it Earl Solis is cracking down on it with her Banishing Daylight task force. Keep your ears open and your eyes peeled, adventurer. Things might get interesting around here. Just…don’t get caught having a daydream…"`    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Fire Dragon’s Street"){
                                                dialogue = [
                                                    `Hank: "Ah, you must be new in state! No worries, just make your way to the Saddledome, friend. It's where the heart of Nottfall beats the loudest. We've got rodeo competitions that'll leave you on the edge of your seat. Watch the locals tame wild beasts or try your luck in the Catalan event. A wild thrill for every adventurer!"`,
                                                    `Ada: "Ready to party, stranger? Nottfall truly comes alive at night. The Fire Dragon’s Street is where the locals gather for live music, carnival rides, and, of course, the best views for fireworks. If you're feeling fancy, Druid Hill Hall at Solis Island Park is the place to see and be seen, although not everyone is allowed there. So just follow the lights and let the night take you!"`
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Seafood District"){
                                                dialogue = [
                                                    `Esther: "You've got to try the seafood here, darling! Our river is teeming with exotic fish, and the Gunpowder Spice from Spezia Cliffs adds a zesty kick. Head to Sunk at Sea for a dining experience like no other. Your taste buds will thank you for the explosion of flavors and you shall thank me!"`,
                                                    
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Ekstase Market"){
                                                dialogue = [
                                                    `Harry: "You need to come with me to the Ekstase Market, Ranger! Here in Nottfall, our potions are as diverse as the moons above. Need a healing elixir, a charm to bewitch your troubles away, or something more exotic? Take a seat at the floating table, and I'll show you the wonders of our potioncraft. Just beware, don't mix 'em up unless you're ready for a surprise!"`,
                                                    
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Nottfall Ranger Centre"){
                                                dialogue = [
                                                    `Clem: “Ah, don’t mind me Ranger, I’m just heading to the infirmary due to my drunk friend who entered the rodeo competition and broke his back trying to ride a Thorox. Those things are no joke. But if you’re headed there anyway, just don’t be like my friend! Good luck.”`,
                                                    
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            
                                        }
                                        else if(foundUser.city_town == "Ingenia"){
                                            if(foundUser.location == "Storm Collider Tower"){
                                                dialogue = [
                                                    `Yandalf: “That tower over there looks impressive doesn't it?  What does it do you ask? Well, that's the Storm Collider Tower, a marvel harnessing Spyr energy. Classified tech, but it powers the Voltivores, giant herbivores, who convert it into energy for the Kingdom of Solarstrio. Ingenia's contribution to the world, you could say.”`,
                                                    `Skywalker: “The noise in Ingenia can be overwhelming with all the tinkering and inventing. Fortunately, we’ve got a veil that produces sound waves to help cancel out the chaos, keeping us focused on our work. They might not be the safest, but they get the job done.”`
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Gear-Dream Plaza"){
                                                dialogue = [
                                                    `Lackerman: “Hey there, you. Yeah you. Don’t be staring at people of Ingenia like we’re a bunch of weirdos. Our clothing is what defines us. You people refer to us as odd-dressers but our dresses are inspired from imaginary heroes and villains from various tales and comics. It may be odd to you, but it is the norm of Ingenia.”`,
                                                    `Swenpai: “What's the deal with all these weird-looking warehouses? Oh, those? They are our homes. We believe in constant innovation here. If a home lacks something, we just add it ourselves. Walls? Well, we hate them. Any extra space means more room for our projects!”`,
                                                    `Bluebird: “The marketplace here is unlike any I've seen. You want to know what's the story behind it? This place is Ingenia's heart! The market grew organically around the homes of the first inventors. Each street you see is technically part of the market. The locals prefer selling from stalls right outside their homes, keeping things efficient.”`
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Maker’s Asylum"){
                                                dialogue = [
                                                    `Midori: “At the Maker’s Asylum, we encourage inventors from all walks of life to turn their passion into a vision. We supply our members with state-of-the-art machinery, hold competitions, help them procure grants from the Kingdom and connect them with like-minded individuals.”`,
                                                    `Shatman: “Ingenia Town is a town where ideas come to life. It is filled with mad scientists and engineers who wish to bring about a better world by solving problems of the society in their own way.”`,
                                                    `Birito: “There are no houses in Ingenia, only warehouses. I mean we don’t even think toilets are that important so we have them in the backyard like a normal person. We don’t have any windows or even comfortable beds, as those things take up space for shelves and storage. Although I have heard that the employees working at the Storm Collider Tower sleep in the most comfortable beds imaginable. It made me wonder if that helped them get better results in research but honestly we don’t see them doing much, while the rest of us are making new inventions everyday.”`
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Railpark Nexus"){
                                                dialogue = [
                                                    `Nexus Guardian #1: “The Quarantrain has arrived for inspections and repairs. We can't risk any interference. Outsiders and non-employees aren't allowed access. Security is a top priority.”`,
                                                    `Nexus Guardian #2: “Are you seriously asking me why such a sturdy invention like the Quarantrain needs repairs? Well…the reason it is sturdy is because of these frequent repairs. You see, unlike regular trains, which travel in protected zones, the Quarantrain travels long distances in the wilds, and often through dangerous zones where it is often targeted by agitated Spyriths without being able to retaliate. Thus, it is in constant need of repairs, sometimes which are quickly done, but other times, you wouldn’t be able to believe what Spyrith attacked it to deal such damage. The outdoors are really scary, Ranger, and for making them safer, I respect you guys.”`
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Flavor Forge"){
                                                dialogue = [
                                                    `Darklord: “No bars around here huh? What do we drink you ask? You see, alcohol is not our thing. We're all about Enerjava. It's made from Enerex Beans, grown by the Hiacoons in their burrows. Keeps us energized and hyper-focused on our inventions.”`,
                                                    `Brobocop: “Taverns? Nah, not our style. But fast food ‘straunts? They're booming. People don't like to cook, so eating out is a thing. Slicezza even delivers straight to your doorstep, which is an astounding feat considering there are no named streets or addresses in Ingenia.”`
                                                    
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            else if(foundUser.location == "Ingenia Guild Outpost"){
                                                dialogue = [
                                                    `Windiana Bones: “Hey there, nice to meet you! Not a lot of faces around here in the outpost I must say. Everyday there are less and less of us. I guess most of us Rangers got tired trying to find rare items from the book, but I have been doing it for years now. I am not as strong to go out and fight Spyriths, but I’ve gotten a few promotions by completing the quests here! I may not look like it, but I am quite good!”`,
                                                    `Kamiari: “The richest man in Ingenia who is also our Mayor - Mr. Weller made his immense wealth by creating a book cataloging every invention from Ingenia from large machines down to the smallest screw, and segmented them into “sets” which the locals began collecting. Mr. Weller set lucrative rewards for every set a person completed/owned in its entirety. The book known as “Inventor’s Quest” quickly turned into a game and its popularity rose to the skies and the locals poured a lot of money to partake in this game. They would even barter rare parts of immense value just to complete a set from the game. That is why there aren’t many Rangers in Ingenia, because most requests are to help people with their collecting, haha!”`,
                                                    `Boku: “I accidentally attacked an Hiacoon mistaking them for a wild Spyrith and now I am waiting for my Guild to decide on how long they want me suspended…”`
                                                    
                                                ]
                                                dialogue.map((diag) => {
                                                    dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${diag}`)
                                                    totalEmbeds.push(dialogueembed)
                                                })
                                            }
                                            
                                            
                                        }
                                        
                                        else{
                                            dialogueembed = new MessageEmbed()
                                            .setColor('RANDOM')
                                            .setTitle('Dialogue Failed')
                                            .setDescription(`No one could be found to talk in the proximity!`)
                                            totalEmbeds.push(dialogueembed)
                                        }
                                    }
                                    
                                    let filter = i => i.user.id === authorId
                                    let collector = await interaction.channel.createMessageComponentCollector({filter: filter , time : 1000 * 300})
                                    for(let j =0;j<totalEmbeds.length;j++){
                                        totalEmbeds[j].setFooter({text:`Page: ${j+1}/${totalEmbeds.length}`})
                                    }
                                    await interaction.deferReply()
                                    await interaction.editReply({embeds:[totalEmbeds[0]],components:[btnraw]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                    let count = 0
                                    collector.on('collect', async i => {
                                        if(i.customId === 'forward'){
                                            await i.deferUpdate().catch(e => {})
                                            if(count== totalEmbeds.length-1){
                                                count=0
                                            }
                                            else{
                                                count +=1
                                            }
                                            
                                            await interaction.editReply({content: null,embeds:[totalEmbeds[count]],components:[btnraw]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                        }
                                        else if(i.customId === 'backward'){
                                            await i.deferUpdate().catch(e => {})
                                            if(count== 0){
                                                count=totalEmbeds.length-1
                                            }
                                            else{
                                                count-=1
                                            }
                                            
                                            await interaction.editReply({content: null,embeds:[totalEmbeds[count]],components:[btnraw]}).catch(err => {interaction.channel.send({embeds:[exceptionEmbed]})})
                                
                                        }
                                        else if(i.customId === 'stop'){
                                            collector.stop()
                                            
                                        }
                                        else{
                                
                                        }
                                
                                  
                                    
                                    })
                                
                                collector.on('end', () => {
                                interaction.deleteReply()
                                })
                                   }
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