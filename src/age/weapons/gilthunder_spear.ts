import { Weapon } from "../classes/weapon";

export const gilthunder_spear = new Weapon({
    id: 'weapon__gilthunder_spear',
    name: `Rusted Spear`,
    description: `+4 Vigour|A weapon owned by Gilthunder in his prime but has since lost it's glory.`,
    damage:4,
    type:'melee',
    cost:1000,
    skills: [{name: 'Thundering Blow',
    description: 'A lightning imbued spear thrust'}]

})