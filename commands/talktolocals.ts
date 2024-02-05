import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import sample from 'lodash.sample'
import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'

export default new MyCommandSlashBuilder({ name: 'talktolocals', description: 'talk to the locals of the place' }).setDo(
    async (bot, interaction) => {

        const authorId = interaction.user.id;
        const guildID = interaction.guildId;

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
                                    await interaction.editReply({embeds:[totalEmbeds[0]],components:[btnraw]})
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
                                            
                                            await interaction.editReply({content: null,embeds:[totalEmbeds[count]],components:[btnraw]})
                                        }
                                        else if(i.customId === 'backward'){
                                            await i.deferUpdate().catch(e => {})
                                            if(count== 0){
                                                count=totalEmbeds.length-1
                                            }
                                            else{
                                                count-=1
                                            }
                                            
                                            await interaction.editReply({content: null,embeds:[totalEmbeds[count]],components:[btnraw]})
                                
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