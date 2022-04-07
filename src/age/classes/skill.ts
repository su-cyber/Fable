import { Entity } from './entity'

export type Skill = {
    name: string
    description: string
    cooldown: number
    canEvade: boolean
    use: (attacker: Entity, defender: Entity) => string | string[] | void
}
