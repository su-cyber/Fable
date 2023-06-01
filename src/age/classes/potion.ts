type TypePotion = {
    id: string
    name: string
    description: string
    status: string[]
    value: number[]
    cost: number
    turns: number
    use_string: string
}

class Potion {
    id:string
    name: string
    description: string
    status: string[]
    value: number[]
    cost: number
    turns: number
    use_string: string

    constructor(props: TypePotion) {
        Object.assign(this, props)
    }
}

export { Potion }

