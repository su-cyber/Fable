import { Flora } from "../../classes/flora";

export class Mushroom extends Flora{


    static create(){
        return new Mushroom({

    id:"Mushroom_ellior" ,
    name: "Mushrooms",
    description: "Regular mushrooms",
    spawnRate: 0.6,
    type: "regular",
    cost:200,
    fake_name:"",
    skills:[],
    quantity:2

        })
    }
}