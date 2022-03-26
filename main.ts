import { Intents } from 'discord.js'
import { Bot } from './src/bot'

new Bot({ intents: [Intents.FLAGS.GUILDS] }).run()
