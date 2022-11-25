import { Weapon } from "../classes/weapon";

export const Dagger = new Weapon({
    id: 'weapon__dagger',
    name: 'Dagger',
    description: 'simple dagger',
    damage:10,
    type:'melee',
    cost:200,
    skills: []

})