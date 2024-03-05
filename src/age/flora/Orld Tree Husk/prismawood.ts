import { Flora } from "../../classes/flora";

export class Bleedroot extends Flora{


    static create(){
        return new Bleedroot({

    id:"Prismashade_OrldTreeHusk" ,
    name: "Prismawood",
    description: "Wood obtained from Prismashade trees that has grown through decades of spyr rich soil resulting in a glass-like wood that refracts light.These trees look like prisms in the sunny region and are obsidian black in the shady parts.",
    spawnRate: 0.7,
    type: "flora",
    cost:200,
    fake_name:"Prismashade",
    skills:[],
    quantity:1,
    status:[],
    value:[],
    turns:0,
    use_string:""

        })
    }
}