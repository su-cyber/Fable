import { Potion } from "../classes/potion";

export const adrenalineShot = new Potion({
    id:"Adrenaline_shot",
    name:"Adrenaline Shot",
    description:"Few drops of a special essence which boosts the adrenaline in your body increasing attack power and speed for 3 fights",
    status:["Attack","Speed"],
    value:[10,10],
    cost:200,
    turns:3,
    use_string:`You Drink the colorless essence in the vial and your body starts to get pumped up,you feel intense energy rushing into you increasing your vigour and agility by 10`

})