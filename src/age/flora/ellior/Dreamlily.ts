import { Flora } from "../../classes/flora";

export class Dreamlily extends Flora{


    static create(){
        return new Dreamlily({

    id:"Dreamlily_ellior" ,
    name: "Dreamlily",
    description: "These rare flowers only bloom during the full moon. Their petals release a fragrant mist that induces vivid dreams in nearby creatures. Legends say that some dreams hold prophecies or hidden messages from the forest itself. These rare flowers are sought after by many because of their rarity and their use in brewing potent dream potions that can induce sweet dreams or nightmares alike.",
    spawnRate: 0.6,
    type: "regular",
    cost:2000,
    fake_name:"Dreamlily",
    skills:[],
    quantity:1,
    status:[],
    value:[],
    turns:0,
    use_string:""

        })
    }
}