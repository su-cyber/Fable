import { Sword } from "../weapons/sword";
import { steelArmour } from "../armour/steel_armour";
import { steelSword } from "../weapons/steelSword";
import { Spear } from "../weapons/spear";
import { goblinPouch } from "../items";
import { direwolfClaw } from "../items";
import { healthPotion } from "../potions/healthPotion";
import { manaPotion } from "../potions/manaPotion";

const aubeTownShop = {
    weapons: [Sword,steelSword,Spear],
    armour: [steelArmour],
    items: [goblinPouch,direwolfClaw],
    potions: [healthPotion,manaPotion]
}

export default aubeTownShop