import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import {MessageAttachment} from 'discord.js'
import { loadImage,Canvas,registerFont } from 'canvas'
import getHealth from '../src/utils/getHealth'
import xpFormulate from '../src/utils/XPformulate'



export default new MyCommandSlashBuilder({ name: 'img', description: 'testing img' })

.setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id
        const guildID = interaction.guildId;

    let img 
   const name = interaction.user.username
   profileModel.findOne({userID:authorId},async function(err,foundUser){
    if(foundUser.class == "Gladius"){
        img = await loadImage("assets/Statscreen/Gladius_stat.jpeg")
    }
    else if(foundUser.class == "Noir"){
        img = await loadImage("assets/Statscreen/Noir_stat.jpeg")
    }
    else if(foundUser.class == "Buushin"){
        img = await loadImage("assets/Statscreen/Buushin_stat.jpeg")
    }
    else if(foundUser.class == "Magus"){
        img = await loadImage("assets/Statscreen/Magus_stat.jpeg")
    }
    else if(foundUser.class == "Dragoon"){
        img = await loadImage("assets/Statscreen/Dragoon_stat.jpeg")
    }
    
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
    const merit = foundUser.merit
    const mainquest = foundUser.main_quest
    const weapon = weaponExist? foundUser.weapon[0].name : "None"
    const armour = armourExist? foundUser.armourSuit[0].name : "None"
    const items = itemExist? foundUser.items[0] : "None"
    const mount = foundUser.mount
    const grade = foundUser.ranger_grade
    const guildinfo = `${foundUser.guild_rank}`
    const title = foundUser.current_title[0]
    let side_quest
    if(foundUser.side_quest.length == 0){
        side_quest = "None"
    }
    else{
        side_quest = foundUser.side_quest[0]
    }
    if(foundUser.location == "None"){
        location = `${foundUser.city_town}`
    }
    else{
        location = `${foundUser.city_town} -> ${foundUser.location}`
    }
    

    registerFont('fonts/DellaRespira.ttf', { family: 'DellaRespira' })
    const src = new Canvas(1300,700)
    let ctx = src.getContext("2d")
    ctx.drawImage(img,0,0)
    ctx.font = '26px "serif"'
    ctx.fillStyle = "yellow"
    ctx.fillText(`${name}'s Grimoire`, 120, 125);
    ctx.font = '38px "serif"'
    ctx.fillStyle = "#2a9df4"
    ctx.fillText(`${level}`, 1070, 118);
    ctx.font = '30px "serif"'
    ctx.fillText(`${sp}`, 906, 157);
    ctx.fillText(`${faith}`, 935, 226);
    ctx.fillText(`${vigour}`, 737, 295);
    ctx.fillText(`${arcana}`, 737, 525);
    ctx.fillText(`${agility}`, 935, 591);
    ctx.fillText(`${durability}`, 1125, 294);
    ctx.fillText(`${knowledge}`, 1125, 525);
    ctx.font = '16px "serif"'
    ctx.fillStyle = "black"
    ctx.fillText(`${title}`, 397, 216);
    ctx.fillText(`${guildinfo}`, 397, 246);
    ctx.fillText(`${weapon}`, 375, 275);
    ctx.fillText(`${armour}`, 375, 305);
    ctx.fillText(`${mount}`, 361, 335);
    ctx.fillText(`${items}`, 364, 368);
    ctx.font = '24px "serif"'
    ctx.fillText(`${health}`, 141, 406);
    ctx.fillText(`${money}`, 297, 406);
    ctx.fillText(`${merit}`, 450, 406);
    const buffer = await src.toBuffer('image/jpeg')
    const attachment = await new MessageAttachment(buffer)
    interaction.reply({files:[attachment]})
    
   })
   

        
        
        
        
    })