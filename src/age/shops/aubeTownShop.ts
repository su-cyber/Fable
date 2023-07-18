import { Sword } from "../weapons/sword";
import { steelArmour } from "../armour/steel_armour";
import { steelSword } from "../weapons/steelSword";
import { Spear } from "../weapons/spear";
import { healthPotion } from "../potions/healthPotion";
import { adrenalineShot } from "../potions/adrenalineShot";
import { shadowViel } from "../items/shadowViel";
import { solBracelet } from "../items/solBracelet";
import { greaterHealthPotion } from "../potions/greaterHealthPotion";
import { steelSkinPotion } from "../potions/steelSkinPotion";
import { goblinWhistle } from "../items/goblinWhistle";


const aubeTownShop = {
    weapons: [Sword,steelSword,Spear],
    armour: [steelArmour],
    items: [shadowViel,solBracelet,goblinWhistle],
    potions: [healthPotion,adrenalineShot,greaterHealthPotion,steelSkinPotion],
    Total: [Sword,steelSword,Spear,steelArmour,shadowViel,solBracelet,goblinWhistle,healthPotion,adrenalineShot,greaterHealthPotion,steelSkinPotion]
}

export default aubeTownShop