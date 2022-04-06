import { AttackType } from '../enums'

export type Attack = {
    damage: number
    type: AttackType
    canEvade?: boolean
}
