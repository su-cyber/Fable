type TypeItem = {
    id: string
    name: string
    description: string
    emoji: string
    cost: number
    type: string
    skills: object[]
    status: string[]
    value: number[]
    turns: number
    use_string: string
}

class Item {
    id: string
    name: string
    description: string
    emoji: string
    cost: number
    type: string
    skills: object[]
    status: string[]
    value: number[]
    turns: number
    use_string: string

    constructor(props: TypeItem) {
        Object.assign(this, props)
    }
}

export { Item }
