import { Entity } from './entity'

export type Skill = {
    name: string
    description: string
    cooldown: number
    use: (attacker: Entity, defender: Entity) => string | string[] | void
}
