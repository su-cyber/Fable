import { Flora } from "../../classes/flora";

export class marvoryPebbles extends Flora{


    static create(){
        return new marvoryPebbles({

    id:"marvoryPebbles_marvory" ,
    name: "Marvory Pebbles",
    description: "Smooth, ivory-hued stones that shimmer in the sunlight, found along the shores of Lucens.",
    spawnRate: 0.7,
    type: "flora",
    cost:200,
    fake_name:"Marvory Pebbles",
    skills:[],
    quantity:3,
    status:[],
    value:[],
    turns:0,
    use_string:""

        })
    }
}