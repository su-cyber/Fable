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
    status: string[]
    value: number[]
    turns: number
    use_string: string
    
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
    status: string[]
    value: number[]
    turns: number
    use_string: string

    constructor(props: TypeFlora) {
        Object.assign(this, props)
    }

}

export { Flora }