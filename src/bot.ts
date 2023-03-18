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
                                
                                for(let i =1;i<1000;i++){
                                    if(foundUser.xp>=xpFormulate(i) && foundUser.level<i){
                                        let sp
                                        if(i===2){
                                            sp = 5
                                        }
                                        else{
                                            sp = 3
                                        }
                                        foundUser.health = getHealth(i,foundUser.vitality+1)
                                        let levelupEmbed= new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LEVEL UP!')
                                                        .setDescription(`you have levelled up to level ${i}!\nyou recieved ${sp} skill points!\nyour health has increased to ${foundUser.health}HP`)
                                            
                                        if(i%3==0){
                                            foundUser.skill_tree.status+=1
                                            levelupEmbed= new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LEVEL UP!')
                                                        .setDescription(`you have levelled up to level ${i}!\nyou recieved ${sp} skill points!\nyour health has increased to ${foundUser.health}HP\n\nYou can now learn a new skill! use /learnskill`)
                                            
                                        }
                                        else{
                                            levelupEmbed= new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LEVEL UP!')
                                                        .setDescription(`you have levelled up to level ${i}!\nyou recieved ${sp} skill points!\nyour health has increased to ${foundUser.health}HP`)
                                            
                                        
                                        }
                                       
                                        await sleep(2)
                                        await interaction.channel.send({embeds:[levelupEmbed]})
                                        foundUser.level=foundUser.level+1
                                        foundUser.vitality=foundUser.vitality+1
                                        if(foundUser.level === 2){
                                            foundUser.skill_points += 5
                                        }
                                        else{
                                            foundUser.skill_points += 3
                                        }
                                        
                                        
                                   }
                                   
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
