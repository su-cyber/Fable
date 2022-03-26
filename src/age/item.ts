type TypeItem = {
    id: string
    name: string
    description: string
    emoji: string
}

class Item {
    id: string
    name: string
    description: string
    emoji: string

    constructor(props: TypeItem) {
        Object.assign(this, props)
    }
}

export { Item }
