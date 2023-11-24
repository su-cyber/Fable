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
                            if(foundUser.main_quest == "Tutorial" && Number(foundUser.main_quest_phase)<7){
                                interaction.reply({content:`You cannot use this command right now! please complete the tutorial`,ephemeral:true})
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
                                                    `Bernard: “Argh! I work at the Lager Brewery and those Beer Buccaneers are constantly raiding us to steal crates full of Backbreaker. It is really affecting our business. You look reliable, maybe you want to give us a hand? Visit the Guild Outpost, we have sent a request there.”`,
                                                    `Thaddeus: Ever seen a Radiantura stranger? They are just amazing, especially their hooves which glow in the dark! Makes traveling at night a lot easier for both me…and the bandits. Ugh.`,
                                                    `Livilla: My house is at the edge of the town, and due to the constant dust storms in the area, it is never clean. Everyday I clean it, only for it to get dirty all over again.`,
                                                    `Marcoh: I often come here to chat with Guild Rangers. That is because it is law that Tavern Owners must provide free food and lodging to Rangers who are passing by. Rangers use Taverns to rest up and heal. I mean, look at yourself, don’t you feel refreshed already?\n**[You can visit Taverns to heal yourself fully, You can visit them indefinitely.]**`
                                                ])
                                                dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated')
                                                    .setDescription(`${dialogue}`)
                                                
                                                
                                                }
                                            else{
                                                dialogue = sample([
                                                    `Nestor: “Did you know that the name ‘Aube’ means Dawn? This name was bestowed to us because our township experiences the first sunrise on the entire continent!”`,
                                                    `August: “Welcome to Aube Town soldier! Have you checked out our famous Solarcorn yet? They’re very flavourful and their stalks are so strong, they repel the small sand storms that come from the Badlands! These boys basically grow themselves!”`,
                                                    `Silas: “Feeling tired after all that ruckus from the other day? Get yourself a Backbreaker at the local tavern. That ought to fix ya up!”`,
                                                    `Cole: “Everyone in Aube Town is just one big family. If one of us is hurt, the others are ready to hurt back. However the rising viciousness of the magical beasts these days is really tearing our family apart. I pray to King Helios to show us the light.”`,
                                                    `Elijah: “You wanna get to Zorya? Well, it's a long way towards the west. I recommend taking a ride on one of the Stagecoaches that drives you there. Beware of the bandits though. I recommend keeping a weapon on yourself at all times.”`,
                                                    `Nell: “People have stopped chopping down Castellan Sunshades ever since those Treemics decided to make their home in the forest clearing.”`,
                                                    `Madeline: “Have you made your prayers to King Helios today?`,
                                                    `Almyra: “Did you know that each State in Solarstrio has their own Earl? If you are going to the State of Zorya, you might just encounter Earl Auriga. He is a truly remarkable Earl.”`,
                                                    `Latimer: “The invention of Steam-Powered tools has really increased the efficiency of us Crofters. They’re just plain better than our old equipment. You should test them on your adventures when you get a chance.`,
                                                    `Lafe: “The “Backbreaker” is the most famous choice of drink in all of Solarstrio, with its name originating from the fact that it takes away the ability to walk straight of even the sturdiest of Crofters and has at times, even knocked them out completely.”`,
                                                    `Jesse: “The Castellan Fields are well known for their farming of Solarcorn. It is a type of golden-hued corn that is known for its high yield and its ability to thrive in hot and dry climates. The kernels of Solarcorn are large and plump, and they have a sweet and nutty flavor that makes them a popular ingredient in many local dishes. The stalks of Solarcorn are also tall and sturdy, making them well-suited for use as feed for livestock such as Radiantura. Additionally, the stalks of Solarcorn can be used to make a variety of products such as rope, baskets, and even paper. The Solarcorn is a hardy crop that requires little water and can withstand the dust clouds that sweep through the area from time to time, it is a staple for the crofters of Aube Town and the Castellan Fields. You could say I am somewhat of a Solarcorn connoisseur.”`,
                                                    `Hecuba: “Did you know that the Radiantura’s hooves glow in the dark? This allows the Radiantura to navigate through the dark, making it a popular animal among the people here in Aube Town, who often use them for transportation at night.`
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
                                                dialogueembed = new MessageEmbed()
                                                    .setColor('RANDOM')
                                                    .setTitle('Dialogue Initiated!')
                                                    .setDescription(`${dialogue}\n`)
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
                                                    .setDescription(`${dialogue}\n`)
                                                
                                            }
                                            
                                        }
                                        else if(foundUser.city_town == "Dragon's Den"){
                                            dialogueembed = new MessageEmbed()
                                            .setColor('RANDOM')
                                            .setTitle('Dialogue Failed')
                                            .setDescription(`No one could be found to talk in the proximity!`)
                                        }
                                        else if(foundUser.city_town == "Sunstone Mines"){
                                            dialogueembed = new MessageEmbed()
                                            .setColor('RANDOM')
                                            .setTitle('Dialogue Failed')
                                            .setDescription(`No one could be found to talk in the proximity!`)
                                        }
                                        else if(foundUser.city_town == "Zephyr Mountain"){
                                            dialogueembed = new MessageEmbed()
                                            .setColor('RANDOM')
                                            .setTitle('Dialogue Failed')
                                            .setDescription(`No one could be found to talk in the proximity!`)
                                        }
                                        else if(foundUser.city_town == "Zephyr Mountain"){
                                            dialogueembed = new MessageEmbed()
                                            .setColor('RANDOM')
                                            .setTitle('Dialogue Failed')
                                            .setDescription(`No one could be found to talk in the proximity!`)
                                        }
                                        else if(foundUser.city_town == "Werfall"){
                                            dialogue = sample([
                                                `Sowyer: Looking for Rangers in your Guild? Are you sure they aren’t dead already? But if they aren’t, they should eventually show up at the Werfall Ranger Center.`,
                                                `Gannon: I have been stationed here for a year now. There’s nothing I haven’t seen. Most of my friends are either dead or have gone insane. But I hear there are some Rangers here who have been in this shithole even longer than me. Since the incident happened. I just wish I could find them and cause them the pain they have caused me.`,
                                                `Amyra: It is believed that when a C2 Nightmare took over Werfall, the Gatekeeper escaped into our world, leaving his post. Ever since then, we haven’t been able to fully purge the Nightmare.`,
                                                `Colliff: It’s really strange what happened here. Abyssals are not supposed to be intelligent enough to make decisions. They work in patterns that are predictable. This is the reason Werfall has the entire world baffled.`,
                                                
                                            ])
                                            dialogueembed = new MessageEmbed()
                                                .setColor('RANDOM')
                                                .setTitle('Dialogue Initiated')
                                                .setDescription(`${dialogue}`)
                                        }
                                        else if(foundUser.city_town == "Vigia"){
                                            if(foundUser.location == "Ruins of Eldorath"){
                                                dialogue = sample([
                                                    `Endana: "Ah, a visitor! I'm Endana, lead archaeologist for this site. Careful where you step - we've only just uncovered these wonders. What do you make of our find here? Some believe this imagery depicts the three Eldruid tribes merging, perhaps at this very spot."`,
                                                    `Magnus: "Our latest finds suggest Eldorath's fall coincided with a virulent contagion its healers called the 'Iron Death'. Could it be connected to whatever magic now plagues DeathRust?"`,
                                                    `Grace: "Our latest finds beneath the ruins have unearthed strange carvings matching none of the known Eldruid tribes. I fear there remains much about this city's origins still cloaked in mystery. The archives under my museum hold untold histories just waiting to be discovered."`,
 
                                                ])
                                            }
                                            dialogue = sample([
                                                `Zoya: "In desperate times, many come seek solace in Morozh's tears. With DeathRust so near, is it any wonder despair darkens men's hearts? His waters may not slake thirst but can calm our deepest fears. All are welcome within the temple of the God of Despair."`,
                                                `Gaius:  "Some nights when the moon is full, I swear I can still see the shades of the Eldruid chieftains battling upon this hallowed ground. Their alliance holds even in death, Vigia's history is long indeed."`,
                                                `Brock: "My lad Boris did well holding the forest's edge yesterday. Not many can say they've faced the undead and lived to tell. SolGate is the last line against the rust should they ever breach the Gate. The city owes its safety to the Sol Crusaders alone!"`,
                                                `Mica: "Business is booming with travelers - some come simply to marvel at our defenses, others seek relics of the north. But all find comfort within my walls. As long as the Crusaders hold the wall, Vigia remains a safe haven between here and DeathRust."`,
                                                `Grumio: "Earl Arvid pores over battlefield strategies late into the night, determined to bolster our defenses. With DeathRust so near, no precaution is too great. The Crusaders live and die by his word, and Vigia's fate remains tied to the SolGate."`,
                                                `Carlsen[Sol Crusader]: "The Ferromites press ever closer to the wall. For over a thousand years the Crusaders have held firm, all that stands between Vigia and the curse of DeathRust. Our order was forged in those dark woods, and there our watch shall endure until the world's end."`,
                                                `Noah: "The Word is that there are increased movements in the forest - seems the dead march in greater numbers of late. Legend says DeathRust was once a thriving land, before some dark magic turned its populace feral and decaying. Now only rust and ruin remain…"`,
                                                `Ethan: "Have you been to the trinity plateau yet? As long as those swords stand vigil, Eldorath's legacy survives. Its people may be dust, but their deeds of unity against a greater menace live on through the alliance they forged. Perhaps one day the archaeologists will uncover what desperate evil they combined to defeat…"`,
                                                `Mason: "The Sol Crusaders are one of the many knight chapters we have in Solarstrio, the knights serve and live for the people! It is the might of our king and the knights that has made Solarstrio so great, all hail king Helios!"`,
                                                `Olivia: "Hello! Can you please give me the directions to the Esparta Museum? I am a huge enthusiast of history and archaeology, I heard Esparta Museum houses some of the rarest artifacts and relics in existence!"`
                                            ])
                                            dialogueembed = new MessageEmbed()
                                                .setColor('RANDOM')
                                                .setTitle('Dialogue Initiated')
                                                .setDescription(`${dialogue}`)
                                        }
                                        else if(foundUser.city_town == "Vigia"){
                                            if(foundUser.location == "The Guilded Cage"){
                                                dialogue = sample([
                                                    `Leif [Bartender]: "Welcome to The Gilded Cage, Ranger. Care for a drink? Our tavern has been a gathering place for rangers and locals alike for generations. Sit back, relax, and let the tales of Kafig wash over you like the wind through Radohn's wings."`,
                                                    `Nora: "You know, Orin was a true legend around these parts. The stories say he had an uncanny bond with Avian Spyriths, like no other beastmaster. With Radohn's blessings, he commanded the skies and was the founder of our township. His bravery still echoes in our hearts."`,
                                                    `Felix: "Ya ever heard of Basil, the Vice Master of Eterna Guild? They're a force to be reckoned with, even among the S Grades. I've seen him fight…His skills are unmatched, his technique feels like he is the incarnation of Radohn Himself! No wonder they gave him the Ephitet of "Demon Bird".`,
                                                    `Danna [Bard]:\n"In the realm of Vearth, a tale to be told,\nOf a hero named Orin, brave and bold.\nWith Avian Spyriths, he took to the skies,\nProtector of Kafig, where legends arise.\n\nOh, Orin, master of the winged domain,\nWith Radohn's grace, he ruled without restrain.\nThrough battles and storms, he stood tall,\nA beacon of hope for one and all."`
 
                                                ])
                                            }
                                            dialogue = sample([
                                                `Dora: "Welcome to Kafig, traveler! Did you know that our town is famous for its Avian Spyriths? We believe they are descendants of the mighty Radohn, the ruler of skies. It's a sight to behold when they take to the air!"`,
                                                `Evanko: "You seem to be a Ranger, did you try venturing into Asche Peak? The soil there has turned to soot and radiates intense heat.The legend that Radohn slumbers in Asche Peak might as well be true!"`,
                                                `Amelia : "Ah, the Avian Square! It's the heart of our town, where we gather to honor Radohn. We leave offerings at the statue's feet to show our respect. The legend says Radohn's flames turned Asche Peak black, giving it a mystical aura."`,
                                                `Lucas: "Have you visited the Cloud Haven yet? It's a remarkable cylindrical building that resembles a giant bird cage. Many exotic Spyriths find refuge there, coming from Asche Peak or even migrating from distant lands. It's a testament to our town's love for these magnificent creatures."`,
                                                `Sophie: "If you're looking for a thrilling adventure, try forging a spyralink contract in the Cloud Haven! Rangers visit there to bond with the fantastic Avian Spyriths and gain a loyal companion for their travels. But be warned, it's not an easy task and requires great skill."`,
                                                `Bella: "Don't forget to visit the Radohn Roost, the hillside temple above our town. It's a sacred place with small shrines dedicated to Radohn. Climb the steep steps and reach the main altar with an eternal flame, symbolizing Radohn's eternal rule over the skies. The view from there is breathtaking."`,
                                                `Hedge: "We take great pride in our own Basil, the Vice Master of Eterna Guild. Basil is a prodigy and one of the strongest rangers you'll ever meet. Born and raised right here in Kafig, the town cherishes and celebrates their achievements. It's a testament to the strength and spirit of our community."`,
                                                ])
                                            dialogueembed = new MessageEmbed()
                                                .setColor('RANDOM')
                                                .setTitle('Dialogue Initiated')
                                                .setDescription(`${dialogue}`)
                                        }
                                        else{
                                            dialogueembed = new MessageEmbed()
                                            .setColor('RANDOM')
                                            .setTitle('Dialogue Failed')
                                            .setDescription(`No one could be found to talk in the proximity!`)
                                        
                                        }
                                    }
                                    
                                   
                                    await interaction.reply({embeds:[dialogueembed]});
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