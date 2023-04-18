import { Flora } from "../../classes/flora";

export class RayleighFlower extends Flora{


    static create(){
        return new RayleighFlower({

    id:"rayleigh_castellan" ,
    name: "Rayleigh Flower",
    description: "a flower in castellan fields",
    spawnRate: 0.5,
    type: "regular",
    cost:500,
    fake_name:"Rayleigh Flower",
    skills:[],
    quantity:2

        })
    }
}