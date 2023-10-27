import { Flora } from "../../classes/flora";

export class SunbleachedBones extends Flora{


    static create(){
        return new SunbleachedBones({

    id:"sunbleached_badlands" ,
    name: "Sunbleached Bones",
    description: `The bones of long-deceased creatures that have been bleached by the scorching sun. Valued by collectors or artists, and can be used in crafting bone-based weapons and artifacts.`,
    spawnRate: 0.3,
    type: "flora",
    cost:40,
    fake_name:"Sunbleached Bones",
    skills:[],
    quantity:1,
    status:[],
    value:[],
    turns:0,
    use_string:""


        })
    }
}