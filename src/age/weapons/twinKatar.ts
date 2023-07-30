import { Weapon } from "../classes/weapon";

export const twinKatar = new Weapon({
    id: 'weapon__twinKattar',
    name: 'Twin Katars',
    description: 'A pair of deadly katars',
    damage:8,
    type:'melee',
    cost:5000,
    skills: [{name: 'Mutilate',
    description: 'Mutilate your enemy with fast precise strikes'}]

})