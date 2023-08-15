import { Flora } from "../../classes/flora";

export class RayleighFlower extends Flora{


    static create(){
        return new RayleighFlower({

    id:"rayleigh_castellan" ,
    name: "Rayleigh Flower",
    description: "A flower that grows as a weed in castellan fields",
    spawnRate: 1,
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