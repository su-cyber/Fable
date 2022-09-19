import { Armour } from "../classes/armour";

export const steelArmour = new Armour({
    id: 'armour__steel',
    name: 'Steel Armour',
    description: 'simple steel armour',
    armour:15,
    cost:500,
    skills: [{
        name: 'Regeneration',
        description: '+5HP every turn'
    }]

})