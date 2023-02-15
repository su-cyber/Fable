type TypeFlora = {
    id: string
    name: string
    description: string
    spawnRate: number
    type: string
    cost:number
    fake_name: string
    skills: object[]
    quantity:number
    
}

class Flora {
    id:string
    name: string
    description: string
    spawnRate: number
    type: string
    cost: number
    fake_name: string
    skills: object[]
    quantity:number

    constructor(props: TypeFlora) {
        Object.assign(this, props)
    }

}

export { Flora }