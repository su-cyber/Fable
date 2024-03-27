import { emoji } from "../lib/utils/emoji"
const allQuests = [{
    name: "War with Ravens",
    description:"The Solarii farms are suffering from an onslaught of Ravens",
    quest_id:"KS-TA-SQ1",
    rewards:"Radiantura's Milk x 5",
    info:"The Solarii farms are suffering from an onslaught of Ravens who are out to destroy their hard-earned harvest. You need to help them build 5 Scarecrows. Each Scarecrow requires 5 wood. Wood can be found by chopping down trees in Sunshade Forest.\n\n use **/progresssidequest** to proceed after you collect the Sunshade Wood."
},{
    name:"Feed the Radiantura",
    description:"The Radiantura in Castellan Fields need to be fed",
    quest_id:"KS-TA-SQ2",
    rewards:`300${emoji.CRUS}`,
    info:"The Radiantura in Castellan Fields need to be fed with the Stalks of Solarcorn. However the Crofters have run out. Visit the Lager Estate where you can find the Solarcorn Stalks and bring them back to feed the Radiantura."

},{
    name:"Stumped!",
    description:"wild group of Treemics have mixed themselves among the tree stumps",
    quest_id:"KS-TA-SQ4",
    rewards:"Goblin Whistle(Trinket)",
    info:"The local Solarii are having trouble cutting down Sunshade Trees in Castellan Fields, due to a wild group of Treemics that have mixed themselves among the leftover tree stumps. Whenever a person traverses near the tree stumps’, the Treemics attack them. Hunt Them down. Slay Treemicks and return with x5 Treemick Branch."

},{
    name:"Aube Town's Hero",
    description:"find what is happening to his consignments",
    quest_id:"KS-TA-SQ5",
    rewards:"???",
    info:"The owner of the Terrific Troll Tavern claims that his latest consignment of Backbreaker never reached him, and thus he is losing a lot of business unable to satisfy the Crofters visiting him. The Lager Family refuses to accept any blame so it is up to you to find what is happening to his consignments between the Lager Estate and the Tavern."

},{
    name:"Heirloom Missing",
    description:"find the missing Heirloom",
    quest_id:"KS-ZS-SQ1",
    rewards:`1500${emoji.CRUS}`,
    info:"you are hired by a wealthy citizen of Zorya to find their missing astrolabe. The astrolabe is a family heirloom that is believed to bring good fortune to its owner. You must search the city and interview locals to find out where the astrolabe may have ended up."

},{
    name:"Lost Bussiness",
    description:"investigate the shop owner's troubles",
    quest_id:"KS-ZS-SQ2",
    rewards:"TBD",
    info:""

},{
    name:"A New Beginning",
    description:"The prologue and tutorial",
    quest_id:"Tutorial",
    rewards:"Letter of Recommendation",
    info:`After a Nightmare emerged, you took shelter in Aube Town and decided to stay with Mr. Briggs. At that time, you got involved with the nefarious Beer Buccaneers who were terrorizing Aube. After the incident, you come across Mr. Sebas, a retired Ajin who shows you your true potential and guides you on a new path.`

},{
    name:"A New Road",
    description:"Zorya Arc starts",
    quest_id:"KS-ZS-MQ1",
    rewards:"Ranger Licence",
    info:`After bidding your farewells to Mr. Briggs and Emyr, you now seek out the Guild Colosseum in Zorya to take part in the Annual Guild Draft and become a proud Ranger of the Ranger's Association. The tests it will throw towards you will be perilious, but at the end, it will all be worth it.`

},{
    name:"New Home",
    description:"Werfall Arc",
    quest_id:"KS-ZS-MQ2",
    rewards:"???",
    info:`It is finally time you became a Ranger and met with fellow Rangers from your Guild. Your life has changed forever, but an important task awaits your attention.`

},{
    name:"Aube Town's Water Crisis",
    description:"Aube Town is suffering from a water crisis",
    quest_id:"KS-TA-SQ6",
    rewards:"1500${emoji.CRUS} || 35 Merit",
    info:`The player is asked by the mayor of Aube Town to investigate a recent shortage of water in the town. The player must explore the badlands and find the source of the problem, which could be due to a drought, a blocked aqueduct, or even sabotage.`

},{
    name:"Helping Set Sail",
    description:"Help the shipwrights in Auriga Sails Company",
    quest_id:"KS-ZS-SQ2",
    rewards:`1500${emoji.CRUS} || 35 Merit`,
    info:`The Shipwrights at Auriga Sails Company are running behind schedule in finishing a new ship for the Golden Dutchman Fleet. And to rub salt on the wound, one of their best workers has fallen ill. The Player must fill in for the helper by assisting the shipwrights in various tasks around the Port, and help them in completing the project on time.`

},{
    name:"Mysterious Seagate Malfunction",
    description:"Investigate the seagates",
    quest_id:"KS-ZS-SQ3",
    rewards:"2500${emoji.CRUS} || 45 Merit",
    info:`One of the State's sea-gates has malfunctioned, causing dangerous Sea Spyriths to enter the State at the Aqueduct Canals. If not stopped, they will reach the Siewelle Port very soon. Many Rangers have already responded to the call, and many are still going there to provide aid. If you partake, you must stop the Sea Spyriths from entering the State.`

}]
export default allQuests