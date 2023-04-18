import { Weapon } from "../classes/weapon";

export const steelSword = new Weapon({
    id: 'weapon__steelSword',
    name: 'Steel Sword',
    description: 'stronger steel sword',
    damage:45,
    type:'melee',
    cost:800,
    skills: [{
        name: 'Deep cut',
        description: 'Apply bleeding for 3 turns',
    }]

})