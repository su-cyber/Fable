
import { Item } from '../item'

export const popGreen_Grimoire = new Item({
    id: 'grimoire__popGreens',
    name: 'Pop Grimoire',
    description: `An old grimoire containing the bloom type skill **"Pop Greens"**`,
    emoji:"",
    cost:2000,
    type:"grimoire",
    skills:[{
        name: 'Pop Greens',
        description: 'Shoot special seeds that soaks water and grows up massive vines that attacks the enemy.'
    }],
    status:[],
    value:[],
    turns:0,
    use_string:"You open the grimoire and trace your fingers through the spyr inscriptions engraved on the pages of the grimoire.You see the inscriptions vanish as you continue tracing the symbols, as you finish reading the grimoire a huge amount of information flows into your mind and the skill **Pop Greens** is engraved into your memory.\n\nYou have successfully obtained a new skill **Pop Greens**!"
})
