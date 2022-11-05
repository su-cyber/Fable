import { Client, Intents } from 'discord.js'
import { Bot } from './src/bot'


new Bot({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MESSAGE_REACTIONS] }).run()


