import { User } from 'discord.js'
import { Entity, EntityProps } from './entity'

type Props = Omit<EntityProps, 'id' | 'name'> & {
    user: User
}

export class ClassEntity extends Entity {
    constructor({ user, ...rest }: Props) {
        super({ id: user.id, name: user.username, ...rest })
    }

    static create(user: User) {
        throw new Error('Not implemented')
    }
}
