import { Potion } from "../classes/potion";

export const healthPotion = new Potion({
    id:"health_potion",
    name:"Life Essence",
    description:"Recovers 200 HP instantly",
    status:["Heal"],
    value:[200],
    cost:1500,
    turns:0,
    use_string:`You Drink the blood red liquid in the vial and your minor wounds and scratches start to close and heal and you feel rejuvenated`

})