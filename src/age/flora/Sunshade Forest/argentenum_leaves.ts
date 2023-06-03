import { Flora } from "../../classes/flora";

export class ArgentenumLeaves extends Flora{


    static create(){
        return new ArgentenumLeaves({

    id:"argentenum_castellan" ,
    name: "Argentenum Leaves",
    description: "tree in castellan fields",
    spawnRate: 0.5,
    type: "regular",
    cost:100,
    fake_name:"Castellan Sunshade",
    skills:[],
    quantity:1,
    status:[],
    value:[],
    turns:0,
    use_string:""

        })
    }
}