type TypeItem = {
    id: string
    name: string
    description: string
    emoji: string
    cost: number
}

class Item {
    id: string
    name: string
    description: string
    emoji: string
    cost: number

    constructor(props: TypeItem) {
        Object.assign(this, props)
    }
}

export { Item }
