import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import { Collector, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, MessageComponentInteraction,CacheType, MessageAttachment} from 'discord.js'
import { loadImage,Canvas,registerFont } from 'canvas'


export default new MyCommandSlashBuilder({ name: 'img', description: 'testing img' })

.setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id
        const guildID = interaction.guildId;

    let img = await loadImage("assets/AubeTown/statscreen.png")
   
    registerFont('fonts/DellaRespira.ttf', { family: 'DellaRespira' })
        const src = new Canvas(1300,700)
        let ctx = src.getContext("2d")
        ctx.drawImage(img,0,0)
        ctx.font = '12px "serif"'
        ctx.fillText(`${interaction.user.username}`, 50, 90);
        const buffer = await src.toBuffer('image/png')
        const attachment = await new MessageAttachment(buffer)
        interaction.reply({files:[attachment]})
        

        
        
        
        
    })