import { Weapon } from "../classes/weapon";

export const gilthunder_boltgun = new Weapon({
    id: 'weapon__gilthunder_boltgun',
    name: `Gilthunder's Boltgun`,
    description: `A weapon owned by Gilthunder.`,
    damage:4,
    type:'ranged',
    cost:1000,
    skills: [{name: 'Electro Burst',
    description: 'A lightning burst of bolts'}]

})