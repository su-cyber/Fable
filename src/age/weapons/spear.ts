import { Weapon } from "../classes/weapon";

export const Spear = new Weapon({
    id: 'weapon__spear',
    name: 'Spear',
    description: 'simple spear',
    damage:20,
    type:'melee',
    cost:500,
    skills: [{name: 'Deep cut',
    description: 'Apply bleeding for 3 turns'}]

})