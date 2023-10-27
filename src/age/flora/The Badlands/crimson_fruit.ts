import { Flora } from "../../classes/flora";

export class CrimsonFruit extends Flora{


    static create(){
        return new CrimsonFruit({

    id:"mirage_badlands" ,
    name: "Crimson Cactus Fruit",
    description: `A fruit from a rare crimson cactus that's both sweet and slightly spicy.Valued by cooks for unique recipes or exchanged with healers for healing elixirs.`,
    spawnRate: 0.15,
    type: "flora",
    cost:80,
    fake_name:"Crimson Cactus",
    skills:[],
    quantity:1,
    status:[],
    value:[],
    turns:0,
    use_string:""


        })
    }
}