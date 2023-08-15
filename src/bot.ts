import { env, cwd } from 'process'

import { config as loadEnvs } from 'dotenv'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import {
    Client,
    Collection,
    Interaction,
    MessageComponentInteraction,
    SelectMenuInteraction,
} from 'discord.js'
import profileSchema from '../models/profileSchema'
import xpFormulate from './utils/XPformulate'
import { MessageEmbed } from 'discord.js'
import { MyCommandSlashBuilder } from './lib/builders/slash-command'
import { getCommandsFromFolder } from './lib/utils/getCommandsFromFolder'
import { SlashCommandBuilder } from '@discordjs/builders'
import mongoose from "mongoose"
import { sleep } from './utils'
import getHealth from './utils/getHealth'

type InteractionFn = (interaction: MessageComponentInteraction & { values: string[] }) => Promise<void>

class Bot extends Client {
    commandsPath = `${cwd()}/commands`
    commands: Map<string, SlashCommandBuilder>
    interactions = new Collection<string, InteractionFn>()
    components = {}

    checkEnvs() {
        Array('BOT_TOKEN', 'BOT_ID', 'DEV_SERVER').forEach(i => {
            if (!process.env[i]) throw new Error(`Missing env '${i}'`)
        })
    }

    setupEvents() {
        this.on('interactionCreate', async (interaction: Interaction & { customId: string }) => {
            const componentCallback = this.components[interaction.customId]

            if (componentCallback) {
                await componentCallback(interaction)
            } else if (interaction.isCommand()) {
                const command = this.commands.get(interaction.commandName) as MyCommandSlashBuilder

                if (command) {
                    
                    await command.do(this, interaction)
                    const userID=interaction.user.id
                    profileSchema.exists({userID:userID},async function(err,res){
                        if(res){
                            profileSchema.findOne({userID:userID},async function(err,foundUser){
                                
                                    let i = foundUser.level+1
                                    if(foundUser.xp>=xpFormulate(i) && foundUser.level<i){
                                        let sp=3
                                        foundUser.vitality+=5
                                        let levelupEmbed= new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LEVEL UP!')
                                                        .setDescription(`You have levelled up to Level ${i}!\n\nYou have unlocked ${sp} new spyr cores inside your body!\n\nYour Maximum health has been increased to ${getHealth(i,foundUser.vitality)}HP`)
                                            
                                        if((i==3 || i==9 || i==12 || i==18 || i==26 || i==38 || i==43 || i==54 || i==62 || i==70) && i<=70){
                                            foundUser.skill_tree.status+=1
                                            levelupEmbed= new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LEVEL UP!')
                                                        .setDescription(`You have levelled up to Level ${i}!\n\nYou have unlocked ${sp} new spyr cores inside your body!\n\nYour Maximum health has been increased to ${getHealth(i,foundUser.vitality)}HP\n\nYou can now learn a new skill! use /learnskill`)
                                            
                                        }
                                        else if((i==6 || i==15 || i==23 || i==32 || i==36 || i==48)  && i<=70){
                                            foundUser.skill_tree.class_status+=1
                                            levelupEmbed= new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LEVEL UP!')
                                                        .setDescription(`You have levelled up to Level ${i}!\n\nYou have unlocked ${sp} new spyr cores inside your body!\n\nYour Maximum health has been increased to ${getHealth(i,foundUser.vitality)}HP\n\nYou can now learn a new skill! use /learnskill`)
                                            
                                        }
                                        else{
                                            levelupEmbed= new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LEVEL UP!')
                                                        .setDescription(`You have levelled up to Level ${i}!\n\nYou have unlocked ${sp} new spyr cores inside your body!\n\nYour Maximum health has been increased to ${getHealth(i,foundUser.vitality)}HP`)
                                            foundUser.mana+=1
                                        
                                        }
                                       
                                        await sleep(1)
                                        await interaction.channel.send({embeds:[levelupEmbed]})
                                        foundUser.level=foundUser.level+1
                                        foundUser.skill_points += 3
                                        
                                        
                                   }
                                   
                                
                                await profileSchema.updateOne({userID:userID},foundUser)
                                
                                
                            })
                            
                        }
                       })
     

                     
                    
                    
                 
                }
                
            }
        })

        this.on('ready', async () => {
            console.log('Bot is Ready')
           await mongoose.connect(process.env.MONGO_URL || '',{
                keepAlive:true
            })
            
        }
        )

        
    }

    onComponent(
        customId: string,
        callback: (interaction: SelectMenuInteraction & { values: string[] }) => Promise<void>
    ) {
        this.components[customId] = callback
    }

    async startREST() {
        const rest = new REST({ version: '9' }).setToken(env.BOT_TOKEN)
        await rest.put(Routes.applicationCommands(env.BOT_ID), {
            body: [...this.commands.values()].map(command => command.toJSON()),
        })
    }

    async run() {
        loadEnvs()
        this.checkEnvs()
        this.commands = await getCommandsFromFolder(this.commandsPath)

        this.setupEvents()
        await this.startREST()
        await this.login(env.BOT_TOKEN)
    }
}

export { Bot }
