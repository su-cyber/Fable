import { Client, Intents, PartialDMChannel } from 'discord.js'
import { Bot } from './src/bot'
import profileModel from './models/profileSchema'

 

setInterval(give_energy,1000*60);

new Bot({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS],partials: ['CHANNEL'] }).run()

async function give_energy(){
    await profileModel.updateMany({energy:{$lt:25}},{$inc:{energy:1}})
}
