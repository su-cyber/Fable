import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import {MessageAttachment} from 'discord.js'
import { loadImage,Canvas,registerFont } from 'canvas'
import getHealth from '../src/utils/getHealth'
import xpFormulate from '../src/utils/XPformulate'
import allQuests from '../src/utils/allQuests'
import meritFormulate from '../src/utils/meritFormulate'



export default new MyCommandSlashBuilder({ name: 'stats', description: 'see your stats in the Keystone Grimoire' })

.setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id
        const guildID = interaction.guildId;

        profileModel.exists({userID:authorId},async function(err,res){
            if(err){
                console.log(err);
                
            }
            else{
                if(res){
                    
                    let img
                    let path
                    const name = interaction.user.username.toUpperCase()
                    profileModel.findOne({userID:authorId},async function(err,foundUser){
                        path = `assets/Statscreen/${foundUser.class}_stat.jpeg`
                        img = await loadImage(path)
                     
                     const weaponExist = foundUser.weapon.length
                     const armourExist = foundUser.armourSuit.length
                     const itemExist = foundUser.items.length
                     
                     
                 
                 
                     const level = foundUser.level
                     const sp = foundUser.skill_points
                     const vigour = foundUser.attackDamage
                     const arcana = foundUser.magicPower
                     const faith = foundUser.vitality
                     const knowledge = foundUser.magicResistance
                     const durability = foundUser.armour
                     const agility = foundUser.speed
                     const health = `${foundUser.health}/${getHealth(foundUser.level,foundUser.vitality)}`
                     const XP = `${foundUser.xp}/${xpFormulate(foundUser.level+1)}`
                     let location
                     const money = foundUser.coins
                     let merit
                     if(foundUser.ranger_grade == "None"){
                         merit = `${foundUser.merit}/500`
                     }
                     else{
                         merit = `${foundUser.merit}/${meritFormulate(foundUser.ranger_grade)}`
                     }
                      
                     const mainquest = allQuests.find(quest => quest.quest_id == foundUser.main_quest).name
                     const weapon = weaponExist? foundUser.weapon[0].name : "None"
                     const armour = armourExist? foundUser.armourSuit[0].name : "None"
                     const items = itemExist? foundUser.items[0].name : "None"
                     const mount = foundUser.mount.name
                     let grade
                     if(foundUser.ranger_grade == "None"){
                         grade = "         "
                     }
                     else{
                         grade = `${foundUser.ranger_grade} GRADE:`
                     }
                     
                     const guildinfo = `${foundUser.guild_rank}`
                     const title = foundUser.current_title[0]
                     let side_quest
                     let sqx
                     let sqy
                     let sqfont
                     if(foundUser.side_quest.length == 0){
                         sqx = 277
                         sqy = 602
                         side_quest = "None"
                     }
                     else{
                         sqx = 217
                         sqy = 602
                         side_quest = allQuests.find(quest => quest.quest_id == foundUser.side_quest[0]).name

                         const questLength = side_quest.length;
                        if (questLength <= 10) {
                            sqfont = "2rem"; // Adjust this value based on your design requirements
                        } else if (questLength <= 20) {
                            sqfont = "1.5rem"; // Adjust this value based on your design requirements
                        } else {
                            sqfont = "1rem"; // Adjust this value based on your design requirements
                        }
                     }
                     let kingdom
                     if(foundUser.kingdom == "solarstrio"){
                         kingdom = "Kingdom of Solarstrio"
                     }
                     if(foundUser.location == "None"){
                         if(foundUser.city_town == "aube"){
                             location = "Township of Aube"
                         }
                         else if(foundUser.city_town == "ellior"){
                             location = "Ellior Forest"
                         }
                         else if(foundUser.city_town == "Zorya"){
                             location = "Stateship of Zorya"
                         }
                         else if(foundUser.city_town == "Werfall"){
                             location = "Township of Werfall"
                         }
                         else{
                             location = `${foundUser.city_town}`
                         }
                         location = `${kingdom} -> ${location}`
                     }
                     else{
                         let city_town
                         if(foundUser.city_town == "aube"){
                             city_town = "Township of Aube"
                         }
                         else if(foundUser.city_town == "ellior"){
                             city_town = "Ellior Forest"
                         }
                         else if(foundUser.city_town == "Zorya"){
                             city_town = "Stateship of Zorya"
                         }
                         else if(foundUser.city_town == "Werfall"){
                             city_town = "Township of Werfall"
                         }
                         else{
                             city_town = foundUser.city_town
                         }
                         location = `${city_town} -> ${foundUser.location}`
                     }
                     
                 
                     registerFont('fonts/DellaRespira.ttf', { family: 'DellaRespira' })
                     const src = new Canvas(1300,700)
                     let ctx = src.getContext("2d")
                     ctx.drawImage(img,0,0)
                     ctx.font = '24px "serif"'
                     ctx.fillStyle = "yellow"
                     ctx.fillText(`${name}'s GRIMOIRE`, 65, 125);
                     ctx.font = '38px "serif"'
                     ctx.fillStyle = "#2a9df4"
                     ctx.fillText(`${level}`, 1070, 118);
                     ctx.font = '30px "serif"'
                     ctx.fillText(`${sp}`, 904, 159);
                     ctx.fillText(`${faith}`, 935, 226);
                     ctx.fillText(`${vigour}`, 737, 295);
                     ctx.fillText(`${arcana}`, 737, 525);
                     ctx.fillText(`${agility}`, 935, 591);
                     ctx.fillText(`${durability}`, 1125, 294);
                     ctx.fillText(`${knowledge}`, 1125, 525);
                     ctx.font = '16px "serif"'
                     ctx.fillStyle = "#644E41"
                     ctx.fillText(`${title}`, 397, 216);
                     ctx.fillText(`${guildinfo}`, 397, 246);
                     ctx.fillText(`${weapon}`, 375, 275);
                     ctx.fillText(`${armour}`, 375, 305);
                     ctx.fillText(`${mount}`, 361, 335);
                     ctx.fillText(`${items}`, 364, 368);
                     ctx.font = '20px "serif"'
                     ctx.fillText(`${health}`, 136, 408);
                     ctx.fillText(`${money}`, 312, 408);
                     ctx.fillText(`${merit}`, 457, 408);
                     ctx.font = '16px "serif"'
                     ctx.fillText(`${location}`, 205, 461);
                     ctx.fillText(`Energy : ${foundUser.energy}/25`, 485, 118);
                     ctx.fillStyle = "#C4B190"
                     ctx.font = '12px "serif"'
                     ctx.fillText(`CURRENT EXPERIENCE: ${XP}`, 183, 172);
                     ctx.fillText(`${grade} ${foundUser.class.toUpperCase()}`, 125, 373);
                     ctx.fillStyle = "#644E41"
                     ctx.font = '38px "serif"'
                     ctx.fillText(`${mainquest}`, 217, 530);
                     ctx.font = `${sqfont} "serif"`
                     ctx.fillText(`${side_quest}`, sqx, sqy);
                     const buffer = await src.toBuffer('image/jpeg')
                     const attachment = await new MessageAttachment(buffer)
                     interaction.reply({files:[attachment],ephemeral:true})
                     
                    })
                    
                }
                else{
                    await interaction.reply({content:"It seems you are not awakened yet!\n```use /awaken to begin your Fable```",ephemeral:true})
                }
            }
        })
    

        
        
        
        
    })