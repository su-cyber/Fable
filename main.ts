import { Client, Intents, PartialDMChannel } from 'discord.js'
import { Bot } from './src/bot'


new Bot({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS],partials: ['CHANNEL'] }).run()


