import { Flora } from "../../classes/flora";

export class Herbs extends Flora{


    static create(){
        return new Herbs({

    id:"herb_ellior" ,
    name: "Herbs",
    description: "Regular Herbs",
    spawnRate: 0.5,
    type: "regular",
    cost:500,
    fake_name:"",
    skills:[],
    quantity:1

        })
    }
}