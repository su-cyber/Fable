import { Flora } from "../../classes/flora";

export class Chorusbloom extends Flora{


    static create(){
        return new Chorusbloom({

    id:"chorusbloom_ellior" ,
    name: "Chorusbloom",
    description: "This ethereal flower releases gentle whispers carried by the breeze. The whispers are sweet melodies that enchant their surroundings and captivate many who pass by. They sell good in the market as a gift and decoration.",
    spawnRate: 0.45,
    type: "flora",
    cost:80,
    fake_name:"Chorusbloom",
    skills:[],
    quantity:1,
    status:[],
    value:[],
    turns:0,
    use_string:""

        })
    }
}