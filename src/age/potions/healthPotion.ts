import { Potion } from "../classes/potion";

export const healthPotion = new Potion({
    id:"health_potion",
    name:"Health Potion",
    description:"Recovers 20 HP instantly",
    type:"health",
    cost:200

})