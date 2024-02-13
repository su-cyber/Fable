import { Flora } from "../../classes/flora";

export class Veinwood extends Flora{


    static create(){
        return new Veinwood({

    id:"Veinwood_bleedinGorge" ,
    name: "Veinwood Bark",
    description: "These mushroom are an elusive species found hidden deep within the twisted network of the Ashroot tree's roots. It has a jet-black cap with iridescent blue markings, resembling moonlit shadows. Its gills appear as delicate, silvery threads that shimmer faintly in the darkness. Consuming the Shadowgill mushroom grants temporary night vision and a heightened sense of perception in low-light environments.",
    spawnRate: 0.3,
    type: "flora",
    cost:800,
    fake_name:"Veinwood Tree",
    skills:[],
    quantity:1,
    status:[],
    value:[],
    turns:0,
    use_string:""

        })
    }
}