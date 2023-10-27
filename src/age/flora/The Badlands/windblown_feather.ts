import { Flora } from "../../classes/flora";

export class WindblownFeather extends Flora{


    static create(){
        return new WindblownFeather({

    id:"feather_badlands" ,
    name: "Windblown Feather",
    description: `A feather that's been carried by desert winds, imbued with an airy essence. Valued by airship mechanics for crafting special sails or exchanged with wind magic users.`,
    spawnRate: 0.5,
    type: "flora",
    cost:25,
    fake_name:"Windblown Feather",
    skills:[],
    quantity:2,
    status:[],
    value:[],
    turns:0,
    use_string:""


        })
    }
}