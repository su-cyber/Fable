import { Potion } from "../classes/potion";

export const healthPotion = new Potion({
    id:"health_potion",
    name:"Health Potion",
    description:"Recovers 20 HP instantly",
    status:["Heal"],
    value:[20],
    cost:200,
    turns:0,
    use_string:`You Drink the blood red liquid in the vial and your minor wounds and scratches start to close and heal and you feel rejuvenated`

})