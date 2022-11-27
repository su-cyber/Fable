type TypeFlora = {
    id: string
    name: string
    description: string
    spawnRate: number
    type: string
    cost:number
    skills: object[]
    
}

class Flora {
    id:string
    name: string
    description: string
    spawnRate: number
    type: string
    cost: number
    skills: object[]

    constructor(props: TypeFlora) {
        Object.assign(this, props)
    }

}

export { Flora }