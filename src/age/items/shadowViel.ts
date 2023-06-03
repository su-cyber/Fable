
import { Item } from '../item'

export const shadowViel = new Item({
    id: 'item__shadowViel',
    name: `Shadow Viel`,
    description: `Made from the tuft of a shadow cat which grants player the ability to blend in shadows increasing one's evasion by 50% for 3 turns`,
    emoji: "",
    cost:150,
    type:"usable",
    skills:[],
    status:["Evasion-percent"],
    value:[0.5],
    turns:3,
    use_string:"You cover yourself with the Shadow Viel and can feel the shadows calling you, ready to submerge you into them.Your evasion has now increased by 50%"
})
