import { Flora } from "../../classes/flora";

export class SunshadeWood extends Flora{


    static create(){
        return new SunshadeWood({

    id:"sunshade_castellan" ,
    name: "Sunshade Wood",
    description: `A drought-tolerant tree that can thrive in hot, dry weather and can be grown in well-drained soil`,
    spawnRate: 0.45,
    type: "flora",
    cost:30,
    fake_name:"Castellan Sunshade",
    skills:[],
    quantity:5,
    status:[],
    value:[],
    turns:0,
    use_string:""


        })
    }
}