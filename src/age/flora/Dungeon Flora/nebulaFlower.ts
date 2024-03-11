import { Flora } from "../../classes/flora";

export class Nebula extends Flora{


    static create(){
        return new Nebula({

    id:"nebula_swamp" ,
    name: "Nebulua Flower",
    description: "These Vines overrun every corner of the Dragon's Den, the leaves of this vines glow and release heat giving out warmth in the otherwise cold environment.",
    spawnRate: 0.45,
    type: "flora",
    cost:60,
    fake_name:"Nebula Flower",
    skills:[],
    quantity:3,
    status:[],
    value:[],
    turns:0,
    use_string:""

        })
    }
}