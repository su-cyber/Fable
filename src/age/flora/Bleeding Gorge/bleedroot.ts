import { Flora } from "../../classes/flora";

export class Bleedroot extends Flora{


    static create(){
        return new Bleedroot({

    id:"Bleedroot_bleedinGorge" ,
    name: "Bleedroot",
    description: "These mushroom are an elusive species found hidden deep within the twisted network of the Ashroot tree's roots. It has a jet-black cap with iridescent blue markings, resembling moonlit shadows. Its gills appear as delicate, silvery threads that shimmer faintly in the darkness. Consuming the Shadowgill mushroom grants temporary night vision and a heightened sense of perception in low-light environments.",
    spawnRate: 0.7,
    type: "flora",
    cost:200,
    fake_name:"Bleedroot",
    skills:[],
    quantity:1,
    status:[],
    value:[],
    turns:0,
    use_string:""

        })
    }
}