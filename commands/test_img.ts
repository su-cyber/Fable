import { MyCommandSlashBuilder } from '../src/lib/builders/slash-command'
import profileModel from '../models/profileSchema'
import { Collector, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, MessageComponentInteraction,CacheType, MessageAttachment} from 'discord.js'
import Jimp from "jimp";

export default new MyCommandSlashBuilder({ name: 'img', description: 'testing img' })

.setDo(
    async (bot, interaction) => {
        const authorId = interaction.user.id
        const guildID = interaction.guildId;

        Jimp.read("assets/AubeTown/Ghorgon.jpeg")
        .then((image) => {
    // Do stuff with the image.
        Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then((font) => {
        const clone = image.clone()
        clone.print(font, 10, 10, "Hello world!");
        
        clone.write("assets/AubeTown/test.jpeg");
            const attachment = new MessageAttachment("assets/AubeTown/test.jpeg")
        interaction.reply({files:[attachment]})
       
        
      });
  })
        
    })