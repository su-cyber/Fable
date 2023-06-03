import { Potion } from "../classes/potion";

export const greaterHealthPotion = new Potion({
    id:"greaterhealth_potion",
    name:"Greater Health Potion",
    description:"Recovers 50 HP instantly",
    status:["Heal"],
    value:[50],
    cost:200,
    turns:0,
    use_string:`You Drink the blood red liquid in the vial and your major wounds and injuries start to close and heal and you feel rejuvenated`

})