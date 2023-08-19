import { Weapon } from "../classes/weapon";

export const soldierSpear = new Weapon({
    id: 'weapon__soldierspear',
    name: `Soldier Spear`,
    description: '+4 Vigour|A standard army issued Spear',
    damage:4,
    type:'melee',
    cost:600,
    skills: []

})