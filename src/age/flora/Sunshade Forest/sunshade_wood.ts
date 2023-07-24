import { Flora } from "../../classes/flora";

export class SunshadeWood extends Flora{


    static create(){
        return new SunshadeWood({

    id:"sunshade_castellan" ,
    name: "Sunshade Wood",
    description: "tree in castellan fields",
    spawnRate: 0.35,
    type: "flora",
    cost:30,
    fake_name:"Castellan Sunshade",
    skills:[],
    quantity:5,
    status:[],
    value:[],
    turns:0,
    use_string:""


        })
    }
}