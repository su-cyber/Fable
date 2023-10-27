import { Flora } from "../../classes/flora";

export class MirageCrystal extends Flora{


    static create(){
        return new MirageCrystal({

    id:"mirage_badlands" ,
    name: "Mirage Crystal",
    description: `A crystal that captures and refracts light in intricate patterns. Can be sold to collectors for a high price or used as a component in illusion-related magic.`,
    spawnRate: 0.05,
    type: "flora",
    cost:300,
    fake_name:"Mirage Crystal",
    skills:[],
    quantity:1,
    status:[],
    value:[],
    turns:0,
    use_string:""


        })
    }
}