import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import inventory from '../models/InventorySchema'
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
                                            .setTitle('Dialogue Initiated')
                                            .setDescription(`${dialogue}`)
                                        
                                    }
                                }
                            }
                           
                            await interaction.reply({embeds:[dialogueembed]});
                        }
                    })
                }
                else{
                    await interaction.reply({content:"you are not awakened yet!"})
                }
            }
        })
    })