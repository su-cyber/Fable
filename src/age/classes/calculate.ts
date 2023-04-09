import { AttackType } from '../enums'
import { Attack } from './attack'
import { Entity } from './entity'

export const calculate = {
    physicalDamage: (damage: number, armor: number): number => {
        return Math.round((0.5*(damage/armor)) + 1)
    },
    magicDamage: (damage: number, resistance: number): number => {
        return Math.round((0.5*(damage/resistance)) + 1)
    },

    damage: (attack: Attack, defender: Entity): number => {
        return Math.round(
            attack.type === AttackType.PHYSICAL
                ? calculate.physicalDamage(attack.damage, defender.armor)
                : calculate.magicDamage(attack.damage, defender.magicResistance)
        )
    },
}
