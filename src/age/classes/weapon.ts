import { Entity } from './entity'
import { Skill } from './skill'

 type TypeWeapon = {
    id: string
    name: string
    description: string
    damage: number
    type: string
    cost:number
    skills: object[]
}

class Weapon {
    id:string
    name: string
    description: string
    damage: number
    type: string
    cost:number
    skills: object[]

    constructor(props: TypeWeapon) {
        Object.assign(this, props)
    }
}

export { Weapon }


