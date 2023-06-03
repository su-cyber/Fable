import { Potion } from "../classes/potion";

export const steelSkinPotion = new Potion({
    id:"steelSkin_potion",
    name:"Steel Skin Potion",
    description:"Metallic liquid in a small bottle, ingesting which makes your skin as hard as steel raising your Endurance by 20",
    status:["Armour"],
    value:[20],
    cost:200,
    turns:3,
    use_string:`You Drink the metallic liquid in the vial and your skin starts hardening and you feel strong and sturdy,your durability has increased by 20!`

})