import { Weapon } from "../classes/weapon";

export const steelSpear = new Weapon({
    id: 'weapon__steelSpear',
    name: 'Steel Spear',
    description: 'stronger steel spear',
    damage:35,
    type:'melee',
    cost:1000,
    skills: [{name: 'Deep cut',
    description: 'Apply bleeding for 3 turns'}]

})