type TypeFlora = {
    id: string
    name: string
    description: string
    spawnRate: number
    type: string
    cost:number
    
}

class Flora {
    id:string
    name: string
    description: string
    spawnRate: number
    type: string
    cost: number

    constructor(props: TypeFlora) {
        Object.assign(this, props)
    }

}

export { Flora }