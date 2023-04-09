import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import { Collector, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, MessageComponentInteraction,CacheType, MessageAttachment} from 'discord.js'
import { loadImage,Canvas,registerFont } from 'canvas'


export default new MyCommandSlashBuilder({ name: 'img', description: 'testing img' })

.setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id
        const guildID = interaction.guildId;

    let img = await loadImage("assets/Statscreen/paladin_stat.png")
   const name = interaction.user.username
   profileModel.findOne({userID:authorId},async function(err,foundUser){
    const level = foundUser.level
    const sp = foundUser.skill_points
    const vigour = foundUser.attackDamage
    const arcana = foundUser.magicPower
    const faith = foundUser.vitality
    const knowledge = foundUser.magicResistance
    const durability = foundUser.armour
    const agility = foundUser.speed

    registerFont('fonts/DellaRespira.ttf', { family: 'DellaRespira' })
    const src = new Canvas(1300,700)
    let ctx = src.getContext("2d")
    ctx.drawImage(img,0,0)
    ctx.font = '22px "serif"'
    ctx.fillStyle = "yellow"
    ctx.fillText(`${name}'s Diary`, 120, 120);
    ctx.font = '38px "serif"'
    ctx.fillStyle = "brown"
    ctx.fillText(`${level}`, 1046, 118);
    ctx.font = '30px "serif"'
    ctx.fillText(`${sp}`, 893, 151);
    ctx.fillText(`${faith}`, 935, 226);
    const buffer = await src.toBuffer('image/png')
    const attachment = await new MessageAttachment(buffer)
    interaction.reply({files:[attachment]})
    
   })
   

        
        
        
        
    })