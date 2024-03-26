

type TypeSpyralink = {
    id:string
    name: string
    description: string
    image: string
    type: string
    use_text: string
    element: string
    skills: object[]
}

class Spyralink {
    id:string
    name: string
    description: string
    image: string
    type: string
    use_text: string
    element: string
    skills: object[]

    constructor(props: TypeSpyralink) {
        Object.assign(this, props)
    }
}

export { Spyralink }


