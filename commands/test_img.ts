import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import { Collector, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, MessageComponentInteraction,CacheType, MessageAttachment} from 'discord.js'
import * as canvas from 'skia-canvas/lib'


export default new MyCommandSlashBuilder({ name: 'img', description: 'testing img' })

.setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id
        const guildID = interaction.guildId;

        let img = await canvas.loadImage("assets/AubeTown/Ghorgon.jpeg")
        const src = new canvas.Canvas(400,400)
        let ctx = src.getContext("2d")
        ctx.drawImage(img,0,0)
        ctx.font = "50px serif";
        ctx.fillText("Hello world", 50, 90);
        src.saveAs("assets/AubeTown/test.jpeg")
        const attachment = new MessageAttachment("assets/AubeTown/test.jpeg")
        interaction.reply({files:[attachment]})
        
        
        
        
    })