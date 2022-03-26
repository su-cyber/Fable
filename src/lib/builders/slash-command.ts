import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'
import { notIn } from '../../utils/notIn'


type Options = {
    name: string
    description: string
}

export class MyCommandSlashBuilder extends SlashCommandBuilder {
    constructor({ name, description }: Options) {
        super()
        this.setName(name)
        this.setDescription(description)
    }

    setDo(doFn: (interaction: CommandInteraction) => Promise<void>) {
        this.do = doFn
        return this
    }

    async do(interaction: CommandInteraction) {
        throw new Error('Not implemented')
    }

    toJSON(): any {
        return Object.fromEntries(Object.entries(this).filter(notIn(['do', 'setDo'])))
    }
}
