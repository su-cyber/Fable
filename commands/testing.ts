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
        img = await loadImage("assets/Statscreen/gladius_stat.png")
    }
    else if(foundUser.class == "Noir"){
        img = await loadImage("assets/Statscreen/noir_stat.png")
    }
    else if(foundUser.class == "Buushin"){
        img = await loadImage("assets/Statscreen/buushin_stat.png")
    }
    else if(foundUser.class == "Magus"){
        img = await loadImage("assets/Statscreen/magus_stat.png")
    }
    else if(foundUser.class == "Dragoon"){
        img = await loadImage("assets/Statscreen/dragoon_stat.png")
    }
    else if(foundUser.class == "Kastiel"){
        img = await loadImage("assets/Statscreen/kastiel_stat.png")
    }
    const weaponExist = foundUser.weapon.length
    const armourExist = foundUser.armourSuit.length
    const itemExist = foundUser.items.length
    const mappeditems = foundUser.items.map((item) => {
        return `${item.name}`
    }).join(", ")
    


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
    const mainquest = foundUser.main_quest
    const weapon = weaponExist? foundUser.weapon[0].name : "None"
    const armour = armourExist? foundUser.armourSuit[0].name : "None"
    const items = itemExist? mappeditems : "None"
    const mount = foundUser.mount
    const guildinfo = `${foundUser.guild} - ${foundUser.guild_rank} Rank`
    const title = foundUser.current_title[0]
    if(foundUser.side_quest.length == 0){
        const side_quest = "None"
    }
    else{
        const side_quest = foundUser.side_quest[0]
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
    ctx.font = '22px "serif"'
    ctx.fillStyle = "yellow"
    ctx.fillText(`${name}'s Diary`, 120, 110);
    ctx.font = '38px "serif"'
    ctx.fillStyle = "#2a9df4"
    ctx.fillText(`${level}`, 1046, 118);
    ctx.font = '30px "serif"'
    ctx.fillText(`${sp}`, 893, 157);
    ctx.fillText(`${faith}`, 935, 226);
    ctx.fillText(`${vigour}`, 737, 295);
    ctx.fillText(`${arcana}`, 737, 525);
    ctx.fillText(`${agility}`, 935, 591);
    ctx.fillText(`${durability}`, 1125, 294);
    ctx.fillText(`${knowledge}`, 1125, 525);
    const buffer = await src.toBuffer('image/png')
    const attachment = await new MessageAttachment(buffer)
    interaction.reply({files:[attachment]})
    
   })
   

        
        
        
        
    })