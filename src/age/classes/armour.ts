

 type TypeArmour = {
    id: string
    name: string
    description: string
    armour: number
    magicResistance: number
    vitality: number
    speed: number
    cost:number
    skills: object[]
}

class Armour {
    id:string
    name: string
    description: string
    armour: number
    magicResistance: number
    vitality: number
    speed: number
    cost:number
    skills: object[]

    constructor(props: TypeArmour) {
        Object.assign(this, props)
    }
}

export { Armour }


