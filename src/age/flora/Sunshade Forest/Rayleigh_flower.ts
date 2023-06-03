import { Flora } from "../../classes/flora";

export class Rayleigh extends Flora{


    static create(){
        return new Rayleigh({

    id:"rayleigh_castellan" ,
    name: "Rayleigh Flower",
    description: "flower in castellan fields",
    spawnRate: 0.5,
    type: "regular",
    cost:500,
    fake_name:"Rayleigh Flower",
    skills:[],
    quantity:2,
    status:[],
    value:[],
    turns:0,
    use_string:""

        })
    }
}