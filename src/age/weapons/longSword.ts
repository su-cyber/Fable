import { Weapon } from "../classes/weapon";

export const longSword = new Weapon({
    id: 'weapon__longSword',
    name: 'Longsword',
    description: '+4 Vigour|A strong long steel sword',
    damage:4,
    type:'melee',
    cost:600,
    skills: []

})