
import { Item } from '../item'

export const bottleWine = new Item({
    id: 'item__bottleWine',
    name: `Bottle of Wine`,
    description: 'A bottle of some cheap Red Wine that increases your health on consumption',
    emoji: "",
    cost:1000,
    type:"usable",
    skills:[],
    status:["Heal"],
    value:[120],
    turns:0,
    use_string:"You gulp down the bottle of wine restoring your vitality and health"
})
