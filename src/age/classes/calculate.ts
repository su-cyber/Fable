import { AttackType } from '../enums'
import { Attack } from './attack'
import { Entity } from './entity'

export const calculate = {
    physicalDamage: (damage: number, armor: number): number => {
        return damage * (100 / (100 + armor))
    },
    magicDamage: (damage: number, resistance: number): number => {
        return damage * (100 / (100 + resistance))
    },

    damage: (attack: Attack, defender: Entity): number => {
        return Math.round(
            attack.type === AttackType.PHYSICAL
                ? calculate.physicalDamage(attack.damage, defender.armor)
                : calculate.magicDamage(attack.damage, defender.magicResistance)
        )
    },
}
