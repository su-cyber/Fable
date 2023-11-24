import { emoji } from "../lib/utils/emoji"

const hunting_contracts = [{
    name: "Contract - Thornbacks",
    description:"The Solarii farms are suffering from an onslaught of Ravens",
    quest_id:"KS-TA-HC1",
    quantity:5,
    target:`Thornback ${emoji.BLOOM}`,
    rewards:{
        coins:500,
        merit:35
    },
    info:"The Ranger Association has put up a contract to eliminate 5 Thornbacks due to their recent hostile nature"
},{
    name: "Contract - Mudcrawlers",
    description:"The Solarii farms are suffering from an onslaught of Ravens",
    quest_id:"KS-TA-HC2",
    quantity:3,
    target:`Mud Crawler ${emoji.WAVE}`,
    rewards:{
        coins:150,
        merit:35
    },
    info:"The Ranger Association has put up a contract to eliminate 3 Mudcrawlers as crofters are having difficulties in farming the Castellan Fields due to an onslaught of Mudcrawlers"

},{
    name: "Contract - Gloomroots",
    description:"The Solarii farms are suffering from an onslaught of Ravens",
    quest_id:"KS-ZS-HC1",
    quantity:3,
    target:`Gloomroot ${emoji.BLOOM}`,
    rewards:{
        coins:200,
        merit:45
    },
    info:"The Ranger Association has put up a contract to eliminate 3 Gloomroots residing in the Forest of Ellior. Their rapidly growing population is affecting travel of citizens from and around Zorya. Even though Gloomroots aren’t the most threatening Spyriths, they can prove to be a challenge for many Rookies. Proceed with caution."

},{
    name: "Contract - Emberbeasts",
    description:"The Solarii farms are suffering from an onslaught of Ravens",
    quest_id:"KS-ZS-HC2",
    quantity:5,
    target:`Emberbeast ${emoji.FLAME}`,
    rewards:{
        coins:200,
        merit:45
    },
    info:"The Ranger Association has put up a contract to eliminate 5 Emberbeasts residing in the Dragon’s Den. Due to their flame affinity, the meat of the Emberbeasts is very popular among the residents of Solarstrio. The meat has amazing taste due to it being cooked twice. Due to its high demand, the Association has put up this request."

},{
    name: "Contract - Gilded Wyverns",
    description:"The Solarii farms are suffering from an onslaught of Ravens",
    quest_id:"KS-ZS-HC3",
    quantity:1,
    target:`Gilded Wyvern ${emoji.FLAME}`,
    rewards:{
        coins:500,
        merit:55
    },
    info:"The Ranger Association has put up a contract to eliminate 1 Gilded Wyvern residing in the Dragon’s Den. Their recent emergence and scavenging nature has disturbed the entire ecosystem of the place. Since they hunt in packs, the Association requests you to hunt down a Gilded Wyvern that is not part of a pack. Trying to hunt large numbers may be fatal."

}]

export default hunting_contracts