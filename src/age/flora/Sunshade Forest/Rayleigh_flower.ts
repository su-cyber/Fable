import { Flora } from "../../classes/flora";

export class Rayleigh extends Flora{


    static create(){
        return new Rayleigh({

    id:"rayleigh_castellan" ,
    name: "Rayleigh Flower",
    description: "A flower that grows as a weed in castellan fields",
    spawnRate: 0.3,
    type: "flora",
    cost:20,
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