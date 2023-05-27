import { Client, Intents, PartialDMChannel,Options } from 'discord.js'
import { Bot } from './src/bot'
import profileModel from './models/profileSchema'

 

setInterval(give_energy,1000*3600);

new Bot({ intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES, 
    Intents.FLAGS.DIRECT_MESSAGES, 
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS],

    partials: ['CHANNEL'],

    sweepers: {
        messages: {
          // check every 5 minutes
          interval: 5 * 60,
          // delete messages older than 10 minutes
          filter: () => msg => Date.now() - msg.createdTimestamp > 10 * 60 * 1_000,
        },
        threads: {
          // check every 5 minutes
          interval: 5 * 60,
          // delete archived threads
          filter: () => thread => thread.archived,
        },
        reactions: {
          // check every 5 minutes
          interval: 5 * 60,
          // delete reactions older than 10 minutes
          filter: () => reaction => reaction.message.createdTimestamp > 10 * 60 * 1_000,
        },
      },
      makeCache: Options.cacheWithLimits({
        ...Options.defaultMakeCacheSettings,
        // store 20 messages per channel
        MessageManager: 20,
        GuildMemberManager: 20,
        GuildInviteManager: 10,
        VoiceStateManager: 10,
        ReactionManager: 0,
        GuildEmojiManager: 10,
        ReactionUserManager: 0,
      }),





}).run()

async function give_energy(){
    await profileModel.updateMany({energy:{$lt:25}},{$inc:{energy:1}})
}
