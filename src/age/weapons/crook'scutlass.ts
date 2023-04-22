import { Weapon } from "../classes/weapon";

export const crookcutlass = new Weapon({
    id: 'weapon__crookcutlass',
    name: `capn. Crook's Cutlass`,
    description: 'stronger steel cutlass',
    damage:5,
    type:'blade',
    cost:1500,
    skills: [{name: 'Wave Slash',
    description: 'wave elemental slash'}]

})