import { Flora } from "../../classes/flora";

export class Embervine extends Flora{


    static create(){
        return new Embervine({

    id:"Embervine_ellior" ,
    name: "Embervine leaves",
    description: "These Vines overrun every corner of the Dragon's Den, the leaves of this vines glow and release heat giving out warmth in the otherwise cold environment.",
    spawnRate: 0.6,
    type: "regular",
    cost:200,
    fake_name:"Embervines",
    skills:[],
    quantity:3,
    status:[],
    value:[],
    turns:0,
    use_string:""

        })
    }
}