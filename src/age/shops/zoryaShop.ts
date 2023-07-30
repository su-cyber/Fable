import { chainMail } from "../armour/chainmail"
import { plateArmour } from "../armour/plateArmour"
import { bottleWine } from "../items/BottleWine"
import { shadowViel } from "../items/shadowViel"
import { smokeBomb } from "../items/smokeBomb"
import { solBracelet } from "../items/solBracelet"
import { steamedBread } from "../items/steamedBread"
import { soldierSpear } from "../weapons/Soldier_spear"
import { brass_pistol } from "../weapons/brassPistol"
import { longSword } from "../weapons/longSword"





const zoryaShop = {
    vulkunPier: [longSword,soldierSpear,brass_pistol,plateArmour,chainMail],
    arcturusPier: [shadowViel,smokeBomb,solBracelet],
    hexosPier: [steamedBread,bottleWine],
    Total: [longSword,soldierSpear,brass_pistol,plateArmour,chainMail,shadowViel,smokeBomb,solBracelet,steamedBread,bottleWine]
}

export default zoryaShop