import { Flora } from "../../classes/flora";

export class Veinwood extends Flora{


    static create(){
        return new Veinwood({

    id:"Veinwood_bleedinGorge" ,
    name: "Veinwood Bark",
    description: "The Veinwood Tree is a towering, ancient tree with bark that resembles the texture of human veins. Its leaves are a deep burgundy color, and it draws sustenance from the rich, iron-laden soil of the Bleeding Gorge.",
    spawnRate: 0.3,
    type: "flora",
    cost:800,
    fake_name:"Veinwood Tree",
    skills:[],
    quantity:1,
    status:[],
    value:[],
    turns:0,
    use_string:""

        })
    }
}