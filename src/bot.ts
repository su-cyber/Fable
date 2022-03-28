import { env, cwd } from 'process'

import { config as loadEnvs } from 'dotenv'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { Client, Collection, Interaction, MessageComponentInteraction } from 'discord.js'

import { MyCommandSlashBuilder } from './lib/builders/slash-command'
import { getCommandsFromFolder } from './lib/utils/getCommandsFromFolder'
import { SlashCommandBuilder } from '@discordjs/builders'

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
                await componentCallback()
            } else if (interaction.isCommand()) {
                const command = this.commands.get(interaction.commandName) as MyCommandSlashBuilder

                if (command) {
                    await command.do(this, interaction)
                }
            }
        })

        this.on('ready', () => console.log('Ready'))
    }

    onComponent(customId: string, callback: () => Promise<void>) {
        this.components[customId] = callback
    }

    async startREST() {
        const rest = new REST({ version: '9' }).setToken(env.BOT_TOKEN)
        await rest.put(Routes.applicationGuildCommands(env.BOT_ID, env.DEV_SERVER), {
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
