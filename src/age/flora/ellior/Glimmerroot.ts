import { Flora } from "../../classes/flora";

export class Glimmerroot extends Flora{


    static create(){
        return new Glimmerroot({

    id:"Glimmerroot_ellior" ,
    name: "Glimmerroot Piece",
    description: "These underground plants send out long, phosphorescent roots that twine and illuminate subterranean chambers. The glowing roots guide lost travelers through the labyrinthine depths of the forest, acting as a natural compass. Pieces of Glimmerroots are sold for their luminous property and their ability to grow from their pieces which can be used as decor and lighting.",
    spawnRate: 0.45,
    type: "flora",
    cost:60,
    fake_name:"Glimmerroot",
    skills:[],
    quantity:1,
    status:[],
    value:[],
    turns:0,
    use_string:""

        })
    }
}