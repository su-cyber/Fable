import { Weapon } from "../classes/weapon";

export const gilthunder_spear = new Weapon({
    id: 'weapon__gilthunder_spear',
    name: `Gilthunder's Spear`,
    description: `A weapon owned by Gilthunder.`,
    damage:4,
    type:'melee',
    cost:1000,
    skills: [{name: 'Thundering Blow',
    description: 'A lightning imbued spear thrust'}]

})