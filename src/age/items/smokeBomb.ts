
import { Item } from '../item'

export const smokeBomb = new Item({
    id: 'item__smokeBomb',
    name: `Smoke Bomb`,
    description: `Throw a smoke Bomb blocking the vision of your opponent, increasing your evasion by 20% for the next fight you do.`,
    emoji: "",
    cost:500,
    type:"usable",
    skills:[],
    status:["Evasion-percent"],
    value:[0.2],
    turns:1,
    use_string:"You juggle around the smoke bomb in your hands ready to throw it at your enemies in your next fight."
})
