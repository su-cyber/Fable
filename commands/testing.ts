import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import { Collector, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, MessageComponentInteraction,CacheType, MessageAttachment} from 'discord.js'
import { loadImage,Canvas,registerFont } from 'canvas'



export default new MyCommandSlashBuilder({ name: 'img', description: 'testing img' })

.setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id
        const guildID = interaction.guildId;

    let img 
   const name = interaction.user.username
   profileModel.findOne({userID:authorId},async function(err,foundUser){
    if(foundUser.class == "Samurai"){
        img = await loadImage("assets/Statscreen/samurai_stat.png")
    }
    else if(foundUser.class == "Assassin"){
        img = await loadImage("assets/Statscreen/assassin_stat.png")
    }
    else if(foundUser.class == "Wanderer"){
        img = await loadImage("assets/Statscreen/wanderer_stat.png")
    }
    else if(foundUser.class == "Sorceror"){
        img = await loadImage("assets/Statscreen/sorceror_stat.png")
    }
    else if(foundUser.class == "Paladin"){
        img = await loadImage("assets/Statscreen/paladin_stat.png")
    }
    else if(foundUser.class == "Crusader"){
        img = await loadImage("assets/Statscreen/crusader_stat.png")
    }
    const level = foundUser.level
    const sp = foundUser.skill_points
    const vigour = foundUser.attackDamage
    const arcana = foundUser.magicPower
    const faith = foundUser.vitality
    const knowledge = foundUser.magicResistance
    const durability = foundUser.armour
    const agility = foundUser.speed
    const health = foundUser.health
    const money = foundUser.coins
    const weapon = foundUser.weapon[0].name
    const armour = foundUser.armourSuit[0].name
    const location = foundUser.location
    const mainquest = foundUser.main_quest
    if(foundUser.side_quest.length == 0){
        const side_quest = "None"
    }
    else{
        const side_quest = foundUser.side_quest[0]
    }
    

    registerFont('fonts/DellaRespira.ttf', { family: 'DellaRespira' })
    const src = new Canvas(1300,700)
    let ctx = src.getContext("2d")
    ctx.drawImage(img,0,0)
    ctx.font = '22px "serif"'
    ctx.fillStyle = "yellow"
    ctx.fillText(`${name}'s Diary`, 120, 110);
    ctx.font = '38px "serif"'
    ctx.fillStyle = "brown"
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