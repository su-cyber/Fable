
import { Item } from '../item'

export const goblinWhistle = new Item({
    id: 'item__goblinWhistle',
    name: 'Goblin Whistle',
    description: `Summon a group of goblins before a battle to do your bidding.`,
    emoji:"",
    cost:200,
    type:"equippable",
    skills:[{
        name: 'Goblin Summon',
        description: 'every turn, goblin gang does some damage'
    }],
    status:[],
    value:[],
    turns:0,
    use_string:""
})
