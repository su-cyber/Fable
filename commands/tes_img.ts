import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import { Collector, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, MessageComponentInteraction,CacheType, MessageAttachment} from 'discord.js'
import { loadImage,Canvas, } from 'canvas-constructor/skia'


export default new MyCommandSlashBuilder({ name: 'img', description: 'testing img' })

.setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id
        const guildID = interaction.guildId;

    let img = await loadImage("assets/AubeTown/Ghorgon.jpeg")
    const buffer = await new Canvas(300, 400)
    .printImage(img, 0, 0, 300, 400)
    .setColor('#FFAE23')
    .setTextFont('28px Impact')
    .setTextAlign('center')
    .printText('Kitten!', 150, 370)
    .pngAsync();

    const attachment = new MessageAttachment(buffer)
    interaction.reply({files:[attachment]})

        
        
        
        
    })