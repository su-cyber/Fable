import { Entity } from './entity'

export type Skill = {
    name: string
    description: string
    cooldown: number
    canEvade: boolean
    type: string
    mana_cost: number
    damage: number
    use: (attacker: Entity, defender: Entity) => string | string[] | void
}
