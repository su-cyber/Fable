import { GuildMember } from 'discord.js'
import { Entity, EntityProps } from './entity'

type Props = Omit<EntityProps, 'id' | 'name'> & {
    user: GuildMember
}

export class ClassEntity extends Entity {
    constructor({ user, ...rest }: Props) {
        super({ id: user.id, name: user.user.username, ...rest })
    }

    static create(user: GuildMember) {
        throw new Error('Not implemented')
    }
}
