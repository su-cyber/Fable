type TypePotion = {
    id: string
    name: string
    description: string
    type: string
    cost:number
}

class Potion {
    id:string
    name: string
    description: string
    type: string
    cost:number

    constructor(props: TypePotion) {
        Object.assign(this, props)
    }
}

export { Potion }

