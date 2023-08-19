import { Weapon } from "../classes/weapon";

export const crookcutlass = new Weapon({
    id: 'weapon__crookcutlass',
    name: `Crook Cutlass`,
    description: '+5 Vigour|A stronger steel cutlass owned by Captain Crook',
    damage:5,
    type:'melee',
    cost:1500,
    skills: [{name: 'Wave Slash',
    description: 'wave elemental slash'}]

})