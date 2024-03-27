import { Flora } from "../../classes/flora";

export class Lumifish extends Flora{


    static create(){
        return new Lumifish({

    id:"Lumifish_marvory" ,
    name: "Lumifish",
    description: "Glowing schools of luminescent fish that dance beneath the waves, casting an enchanting glow on the sea.",
    spawnRate: 0.3,
    type: "flora",
    cost:200,
    fake_name:"School of Lumifish",
    skills:[],
    quantity:5,
    status:[],
    value:[],
    turns:0,
    use_string:""

        })
    }
}