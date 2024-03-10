import { Flora } from "../../classes/flora";

export class Briarweb extends Flora{


    static create(){
        return new Briarweb({

    id:"Briarweb_Stellaris" ,
    name: "Briarweb Orchid",
    description: "Sporting intricate, spiderweb-like petals, this orchid captures tiny dewdrops, creating glistening cocoons. Local artisans collect these orchids to craft delicate jewelry said to bring luck and protection.",
    spawnRate: 0.7,
    type: "flora",
    cost:200,
    fake_name:"Briarweb Orchids",
    skills:[],
    quantity:1,
    status:[],
    value:[],
    turns:0,
    use_string:""

        })
    }
}