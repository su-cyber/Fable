type TypeItem = {
    id: string
    name: string
    description: string
    emoji: string
    cost: number
    type: string
    skills: object[]
}

class Item {
    id: string
    name: string
    description: string
    emoji: string
    cost: number
    type: string
    skills: object[]

    constructor(props: TypeItem) {
        Object.assign(this, props)
    }
}

export { Item }
