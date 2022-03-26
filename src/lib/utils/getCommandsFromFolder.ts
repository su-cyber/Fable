import { join } from 'path'
import { readdirSync } from 'fs'

import { SlashCommandBuilder } from '@discordjs/builders'
import { endsWith } from '../../utils/endsWith'

export async function getCommandsFromFolder(path: string) {
    const commands = new Map<string, SlashCommandBuilder>()

    for (const file of readdirSync(path).filter(endsWith('.ts'))) {
        const command = (await import(join(path, file))).default
        commands.set(command.name, command)
    }

    return commands
}
