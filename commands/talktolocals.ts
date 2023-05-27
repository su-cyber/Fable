import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import {MessageEmbed} from 'discord.js'
import sample from 'lodash.sample'

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
                            if(foundUser.dungeon.status){
                                    interaction.reply({content:`You cannot use this command inside a dungeon!`,ephemeral:true})
                                   }
                                   else{
                                    let dialogue
                                    let dialogueembed
                                    if(foundUser.kingdom == "solarstrio"){
                                        if(foundUser.city_town == "aube"){
                                            if(foundUser.location == "The Terrific Troll Tavern"){
                                                dialogue = sample([
                                                    `Silas: Feeling tired after all that ruckus from the other day? Get yourself a Backbreaker at the local tavern. That ought to fix ya up!`,
                                                    `Elijah: You wanna go to Zorya City? Well, it's a long way towards the west. I recommend taking a ride on one of the Stagecoaches that drives you there. Beware of the bandits though. I recommend keeping a weapon on yourself at all times.`,
                                                    `Livilla: My house is at the edge of the town, and due to the constant dust storms in the area, it is never clean. Everyday I clean it, only for it to get dirty all over again.`
                                                ])
                                                dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${dialogue}`)
                                                
                                                
                                                }
                                            else{
                                                dialogue = sample([
                                                    `Nestor: Did you know that the name ‘Aube’ means Dawn? This name was bestowed to us because our township experiences the first sunrise on the entire continent!`,
                                                    `August: Welcome to Aube Town soldier! Have you checked out our famous Solarcorn yet? They’re very flavourful and their stalks are so strong, they repel the small sand storms that come from the Badlands! These boys basically grow themselves!`,
                                                    `Bernard: Argh! I work at the Lager Brewery and those Beer Buccaneers are constantly raiding us to steal crates full of Backbreaker. It is really affecting our business. You look reliable, maybe you want to give us a hand? Visit the Guild Outpost, we have sent a request there.`,
                                                    `Cole: Everyone in Aube Town is just one big family. If one of us is hurt, the others are ready to hurt back. However the rising viciousness of the magical beasts these days is really tearing our family apart. I pray to King Helios to show us the light.`,
                                                    `Thaddeus: Ever seen a Radiantura stranger? They are just amazing, especially their hooves which glow in the dark! Makes traveling at night a lot easier for both me and the bandits…`,
                                                    `Nell: People have stopped chopping down Castellan Sunshades ever since those Treemics decided to make their home in the forest clearing.`,
                                                    `Madeline: Have you made your prayers to King Helios today?`,
                                                    `Almyra: Did you know that each State in Solarstrio has their own Earl? If you are going to the State of Zorya, you might just encounter Earl Auriga. He is a truly remarkable Earl.`
                                                ])
                                                dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${dialogue}`)
                                                
                                                
                                            }
                                        }
                                        else if(foundUser.city_town == "ellior"){
                                            dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Failed')
                                                    .setDescription(`No one could be found to talk in the proximity!`)
                                        }
                                        else if(foundUser.city_town == "Castellan Fields"){
                                            dialogueembed = new MessageEmbed()
                                            .setColor('RANDOM')
                                            .setTitle('Dialogue Failed')
                                            .setDescription(`No one could be found to talk in the proximity!`)
                                        }
                                        else if(foundUser.city_town == "Sunshade Forest"){
                                            dialogueembed = new MessageEmbed()
                                            .setColor('RANDOM')
                                            .setTitle('Dialogue Failed')
                                            .setDescription(`No one could be found to talk in the proximity!`)
                                        }
                                        else if(foundUser.city_town == "The Badlands"){
                                            dialogueembed = new MessageEmbed()
                                            .setColor('RANDOM')
                                            .setTitle('Dialogue Failed')
                                            .setDescription(`No one could be found to talk in the proximity!`)
                                        }
                                        else if(foundUser.city_town == "Zorya"){
                                            if(foundUser.location == "Guild Office"){
                                                if(foundUser.guild == "Chimaera"){
                                                    dialogue = sample([
                                                        `Vash: “Looks to me like they picked a real chump in you. I wonder how long a weakling like you survives haha.”`,
                                                        `Vash: “Once I am done preparing, the Guild’s top brass are going to see how capable I am. I aim for the top!”`,
                                                        `Jaxon: “Hmm? A new recruit? You seem interesting…definitely.”`,
                                                        `Jaxon: “Ugh…it's been days since I have had my fill…that Vice-Master must be afraid I might be coming for his position. What scum.”`
                                                    ])
                                                }
                                                else if(foundUser.guild == "Belenus"){
                                                    dialogue = sample([
                                                        `Gylbart: “Where is my lucky star? Ah, I am holding it.”`,
                                                        `Gylbart: “I will protect you, friend.”`,
                                                        `Zaccheus: “Guild Rangers can often find themselves on dangerous paths. Thus, it is important to be prepared and not shy away from requesting aid.”`,
                                                        `Zaccheus: “There is still hope in the most dire of situations.”`
                                                    ])
                                                }
                                                else if(foundUser.guild == "Tetsuryu"){
                                                    dialogue = sample([
                                                        `Zavyr: “As you are now, shouldn’t you be spending your time training, rather than wasting it on useless chatter?” `,
                                                        `Zavyr: “This is the last you will see of me in your rank.”`,
                                                        `Zuri: “Hello Ranger. I wish you good luck on your travels. Perhaps we can work together some day.”`,
                                                        `Zuri: “I am waiting patiently for my next orders. It has been days.”`
                                                    ])
                                                }
                                                else if(foundUser.guild == "Fenris"){
                                                    dialogue = sample([
                                                        `Ayden: “I just hope I don’t get trampled out there haha, get it? Because I am a bug? No? You’ll get it eventually.”`,
                                                        `Ayden: “Check out my new shoes, with these, I will look even more fantastic when I am out there.”`,
                                                        `Haelee: “If you had taken another step, your head would have started rolling.”`,
                                                        `Haelee: “Stand upright when you talk to me Ranger.”`
                                                    ])
                                                }
                                                else if(foundUser.guild == "Gleipnir"){
                                                    dialogue = sample([
                                                        `Valefor: “Oi Ranger! Since it's a brand new start for both of us, from here on, you’re my rival!”`,
                                                        `Valefor: “I have many whom I want to show my capabilities to, but only after I shed my lineage first.”`,
                                                        `Everest: “So you’re the new recruit? You seem capable and dependable. Do a good job out there!”`,
                                                        `Everest: “It is a dangerous world out there, and you should know when to back down. But all that means nothing if you have someone to protect.”`
                                                    ])
                                                }
                                                else if(foundUser.guild == "Hammerfaust"){
                                                    dialogue = sample([
                                                        `Ashlei: “I am here to prove myself. I sincerely hope you don’t get in my way.”`,
                                                        `Ashlei: “What is a royalty like me doing in this guild? I should ask myself the same thing.”`,
                                                        `Melor: **listening to something from a wired device, does not notice you.**`,
                                                        `Melor: **Grabs their gun as they notice you approaching them. Better back off.**`
                                                    ])
                                                }
                                                else if(foundUser.guild == "Eisenherz"){
                                                    dialogue = sample([
                                                        `Json: “Finally made it here huh, my Dad would be proud.”`,
                                                        `Json: “We will soon be going to leave on our own separate missions but if you ever find me in a bar, we will have a party!”`,
                                                        `Rami: “Hey Ranger! I sure hope you can become a valuable asset to our cause…or me hehe!”`,
                                                        `Rami: “Give your best in every fight, Ranger. There are many among us who have high expectations for you.”`
                                                    ])
                                                }
                                                else if(foundUser.guild == "Maledictus"){
                                                    dialogue = sample([
                                                        `Elbert: **sniff** “Hmm…you don’t smell weak to me. It is a pleasure to be in the same team.”`,
                                                        `Elbert: “Oh hey there, I was just checking if all my potions were packed and weapons were in good condition. Remember, you can never be too prepared.”`,
                                                        `Ian: “Be careful out there Ranger! Evil spirits are lurking in every corner!”`,
                                                        `Ian: “A handshake? I can’t…cause that one time I almost choked a Ranger trying to give them a handshake.”`
                                                    ])
                                                }
                                                else if(foundUser.guild == "Blackfin"){
                                                    dialogue = sample([
                                                        `Yoel: “We have both successfully taken our first steps towards bettering this world! I feel ecstatic!”`,
                                                        `Yoel: “People who try to make this world worse for others should be punishable by death.”`,
                                                        `Barak: “A handshake? I can’t…cause that one time I almost choked a Ranger trying to give them a handshake.”`,
                                                        `Barak: “The only person you can 100% rely on is yourself. But your body may not be as reliable against a powerful enemy. So you should carry explosives with you. They will give your body time to rest and make up for lost opportunities.”`
                                                    ])
                                                }
                                                else if(foundUser.guild == "Suncrest"){
                                                    dialogue = sample([
                                                        `Avani: “Hello fellow Ranger. Let’s work together and watch each other's back from here on shall we?”`,
                                                        `Avani: “The most dangerous enemy you have is the past you cannot overcome.”`,
                                                        `Darcy: “HEY NEW RECRUIT GAHAHAHA! WHAT’S UP WITH THAT PUNY WEAPON OF YOURS GAHAHAHA!”`,
                                                        `Darcy: “I JUST LOOOOOOVE WHEN THE REDNESS OF THE BLOOD MIXES WITH THE BLUE HUE OF THE SEA! IT IS AWESOME GAHAHAHA!”`
                                                    ])
                                                }
                                            }
                                            else{
                                                dialogue = sample([
                                                    `Adira: “Have you bought yourself an Astrolabe yet? We believe they bring good luck, so I think you should buy one while you are visiting! Everyone can use a bit of luck!”`,
                                                    `Leif: “Hey there, I am from the Typhoon Guild, our Headquarters is in the Country of Haganeshiro. I was here on a mission so I figured I would buy some rare items that have come for trade. You never know whom you may meet on your adventures that might need the item! Then again, that might be the reason I never have money for lodging…”`,
                                                    `Emilia: “One of these days I would finally save enough money to buy a ticket to travel on an Airship. My dream to fly in the sky would finally come true!”`,
                                                    `Viktor: “Steam energy is awesome! It makes things happen without the use of any Spyr. Although I have heard that someone on the Continent of Srada has created a new kind of energy called “Electricity”. They say it is far better than our Steam energy. Bogus is what I say.”`,
                                                    `Lysandra: "I hope you're enjoying your stay in Zorya! You should definitely check out the Cloud Garden while you're here. It's a marvel of engineering, with all sorts of unique steam-powered plants."`,
                                                    `Nikolai: "Zorya is a city of innovation and progress. We're always pushing the boundaries of what's possible with steam power, and it's what makes us the envy of the rest of Solarstrio."`,
                                                    `Celia: "The Seven Waves are what make Zorya special. They're the reason we have seven different ports, and why the city is such a bustling hub of trade and commerce."`,
                                                    `Felix: “Don’t you look down on the Earls from Solarstrio. They have been chosen based on merit and skill and thus they are all insanely strong. Each of the Earls is as strong as the Guild Vice-Masters and some are even comparable to some of the top Guild’s Grandmasters. Yes, they are all that strong.”`,
                                                    `Luciana: “There are some people who claim that Earl Auriga used his power as an Earl to amass wealth, but in reality Earl Auriga had always owned Auriga Sails Company and only after making his business a success, did he ever run for the position of Earl. He even passed the ownership of the company to his sister after becoming the Earl. Personally I think Earl Auriga is the reason Zorya has become as it is today, and people with such opinions should just keep their mouths shut.”`,
                                                    `Edgar: “The Castle of Chariots…man what a magnificent work of art. I would love to visit it once and take a tour but it isn’t just open to anyone. That is why I have become an Adventurer. Maybe one day I would be big enough for Earl Auriga to personally request me. What a sight that would be.”`
                                                ])
                                                dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated!')
                                                    .setDescription(`${dialogue}`)
                                                
                                            }
                                        }
                                    }
                                   
                                    await interaction.reply({embeds:[dialogueembed]});
                                   }

                            
                        }
                    })
                }
                else{
                    await interaction.reply({content:"you are not awakened yet!",ephemeral:true})
                }
            }
        })
    })