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
import { TextChannel } from 'discord.js'
import gladius_passive from './age/heroes/gladius_passive'
import buushin_passive from './age/heroes/buushin_passive'
import noir_passive from './age/heroes/noir_passive'
import magus_passive from './age/heroes/magus_passive'
import dragoon_passive from './age/heroes/dragoon_passive'

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
                                        if(i<8){
                                            foundUser.vitality+=3
                                        }
                                        else if(i == 8){
                                            foundUser.vitality +=4.1
                                        }
                                        else{
                                            foundUser.vitality = foundUser.vitality + (41 + ((i-8)*3))/10
                                        }
                                        
                                        foundUser.health = getHealth(i,foundUser.vitality)
                                        let levelupEmbed= new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LEVEL UP!')
                                                        .setDescription(`You have levelled up to Level ${i}!\n\nYou have unlocked ${sp} new spyr cores inside your body!\n\nYour Maximum health has been increased to ${getHealth(i,foundUser.vitality)}HP`)
                                            
                                        if((i==3 || i==9 || i==12 || i==18 || i==26 || i==38 || i==43 || i==54 || i==62 || i==70) && i<=70){
                                            foundUser.skill_tree.status+=1
                                            levelupEmbed= new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LEVEL UP!')
                                                        .setDescription(`You have levelled up to Level ${i}!\n\nYou have unlocked ${sp} new spyr cores inside your body!\n\nYour Maximum health has been increased to ${getHealth(i,foundUser.vitality)}HP\n\nYou can now learn a new skill! use /learnnewskill`)
                                            
                                        }
                                        else if((i==6 || i==15 || i==23 || i==32 || i==36 || i==48)  && i<=70){
                                            foundUser.skill_tree.class_status+=1
                                            levelupEmbed= new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LEVEL UP!')
                                                        .setDescription(`You have levelled up to Level ${i}!\n\nYou have unlocked ${sp} new spyr cores inside your body!\n\nYour Maximum health has been increased to ${getHealth(i,foundUser.vitality)}HP\n\nYou can now learn a new skill! use /learnnewskill`)
                                            
                                        }
                                        else if(i == 10 || i==20 || i==30 || i==40 || i==50){
                                            let class_passive
                                            if(foundUser.class == "Gladius"){
                                                class_passive = gladius_passive[i/10-1]
                                            }
                                            else if(foundUser.class == "Buushin"){
                                                class_passive = buushin_passive[i/10-1]
                                            }
                                            else if(foundUser.class == "Noir"){
                                                class_passive = noir_passive[i/10-1]
                                            }
                                            else if(foundUser.class == "Magus"){
                                                class_passive = magus_passive[i/10-1]
                                            }
                                            else if(foundUser.class == "Dragoon"){
                                                class_passive = dragoon_passive[i/10-1]
                                            }
                                            const newpassive = {
                                                name:class_passive.name,
                                                description:class_passive.description

                                            }
                                            foundUser.all_passives.push(newpassive)
                                            levelupEmbed= new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LEVEL UP!')
                                                        .setDescription(`You have levelled up to Level ${i}!\n\nYou have unlocked ${sp} new spyr cores inside your body!\n\nYour Maximum health has been increased to ${getHealth(i,foundUser.vitality)}HP\n\nYou have unlocked a new Innate Passive Skill! use **/listskills** to check it out! You can Equip your innate skill with **/equipinnate**.`)
                                        }
                                        else{
                                            levelupEmbed= new MessageEmbed()
                                                        .setColor('RANDOM')
                                                        .setTitle('LEVEL UP!')
                                                        .setDescription(`You have levelled up to Level ${i}!\n\nYou have unlocked ${sp} new spyr cores inside your body!\n\nYour Maximum health has been increased to ${getHealth(i,foundUser.vitality)}HP`)
                                            foundUser.mana+=1
                                        
                                        }
                                        foundUser.level=foundUser.level+1
                                        foundUser.skill_points += 3
                                        await profileSchema.updateOne({userID:userID},{level:foundUser.level,skill_points:foundUser.skill_points,mana:foundUser.mana,skill_tree:foundUser.skill_tree,vitality:foundUser.vitality,health:foundUser.health,all_passives:foundUser.all_passives})
                                        await sleep(1)
                                        await interaction.channel.send({embeds:[levelupEmbed]})
                                        
                                        
                            let fableLog = new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle('FABLE LOG')
                            .setDescription(`${interaction.user.username} has Levelled Up to Level ${i}!`)
                            await (interaction.client.channels.cache.get(`1141991984526012466`) as TextChannel).send({embeds:[fableLog]})

                            
                                   }
                                   
                                
                                
                            
                                
                                
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
