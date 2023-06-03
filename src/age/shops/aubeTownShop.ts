import { Sword } from "../weapons/sword";
import { steelArmour } from "../armour/steel_armour";
import { steelSword } from "../weapons/steelSword";
import { Spear } from "../weapons/spear";
import { healthPotion } from "../potions/healthPotion";
import { adrenalineShot } from "../potions/adrenalineShot";
import { shadowViel } from "../items/shadowViel";


const aubeTownShop = {
    weapons: [Sword,steelSword,Spear],
    armour: [steelArmour],
    items: [shadowViel],
    potions: [healthPotion,adrenalineShot]
}

export default aubeTownShop