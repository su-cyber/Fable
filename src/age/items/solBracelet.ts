
import { Item } from '../item'

export const solBracelet = new Item({
    id: 'item__solBracelet',
    name: 'Sol Bracelet',
    description: 'A wearable bracelet that grants protection against the element of flame',
    emoji:"",
    cost:3000,
    type:"equippable",
    skills:[{
        name: 'Flame Resistance',
        description: 'protection against flame element'
    }],
    status:[],
    value:[],
    turns:0,
    use_string:""
})
