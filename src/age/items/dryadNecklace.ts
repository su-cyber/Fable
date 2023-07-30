
import { Item } from '../item'

export const dryadNecklace = new Item({
    id: 'item__dryadNecklace',
    name: `Dryad's Necklace`,
    description: `A rare necklace obtained from a dryad,it contains the skill "Nature's Authority"`,
    emoji:"",
    cost:10000,
    type:"equippable",
    skills:[{
        name: `Nature's Authority`,
        description: `10% attack boost against Bloom type enemies`
    }],
    status:[],
    value:[],
    turns:0,
    use_string:""
})
