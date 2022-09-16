import { Weapon } from "../classes/weapon";

export const Sword = new Weapon({
    id: 'weapon__sword',
    name: 'Sword',
    description: 'simple sword',
    damage:10,
    type:'melee',
    cost:200,
    skills: [{name: 'Deep cut',
    description: 'Apply bleeding for 3 turns'}]

})