import { Weapon } from "../classes/weapon";

export const gilthunder_boltgun = new Weapon({
    id: 'weapon__gilthunder_boltgun',
    name: `Rusted Boltgun`,
    description: `+4 Arcana|A weapon owned by Gilthunder in his prime but has since lost it's glory.`,
    damage:4,
    type:'ranged',
    cost:1000,
    skills: [{name: 'Electro Burst',
    description: 'A lightning burst of bolts'}]

})