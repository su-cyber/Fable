import { Weapon } from "../classes/weapon";

export const Sword = new Weapon({
    id: 'weapon__sword',
    name: 'Sword',
    description: 'simple sword',
    damage:15,
    type:'melee',
    cost:300,
    skills: []

})