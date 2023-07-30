
import { Item } from '../item'

export const steamedBread = new Item({
    id: 'item__steamedBread',
    name: `Steamed Bread`,
    description: 'A loaf of some freshly steamed bread that heals you on consumption',
    emoji: "",
    cost:700,
    type:"usable",
    skills:[],
    status:["Heal"],
    value:[80],
    turns:0,
    use_string:"You enjoy the fresh and hot steamed bread, revitalizing you and soothing your hunger."
})
