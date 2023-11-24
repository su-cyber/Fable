import { Flora } from "../../classes/flora";

export class Ashroom extends Flora{


    static create(){
        return new Ashroom({

    id:"Ashroom_ellior" ,
    name: "Ashrooms",
    description: "These mushroom are an elusive species found hidden deep within the twisted network of the Ashroot tree's roots. It has a jet-black cap with iridescent blue markings, resembling moonlit shadows. Its gills appear as delicate, silvery threads that shimmer faintly in the darkness. Consuming the Shadowgill mushroom grants temporary night vision and a heightened sense of perception in low-light environments.",
    spawnRate: 0.2,
    type: "flora",
    cost:140,
    fake_name:"Ashroot Tree",
    skills:[],
    quantity:3,
    status:[],
    value:[],
    turns:0,
    use_string:""

        })
    }
}