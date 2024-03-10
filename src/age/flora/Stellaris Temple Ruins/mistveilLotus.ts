import { Flora } from "../../classes/flora";

export class Mistveil extends Flora{


    static create(){
        return new Mistveil({

    id:"Mistveil_Stellaris" ,
    name: "Mistveil Lotus",
    description: "A large lotus that grows on muddy patches of the swamp that releases a strange mist that covers the swamp. The mist is known to cause nausea to regulars.",
    spawnRate: 0.7,
    type: "flora",
    cost:200,
    fake_name:"Mistveil Lotus",
    skills:[],
    quantity:1,
    status:[],
    value:[],
    turns:0,
    use_string:""

        })
    }
}