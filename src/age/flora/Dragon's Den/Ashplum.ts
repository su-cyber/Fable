import { Flora } from "../../classes/flora";

export class Ashplum extends Flora{


    static create(){
        return new Ashplum({

    id:"Ashplum_ellior" ,
    name: "Ash Plum",
    description: "The Ashplum is roughly the size of a small apple, with a smooth, charcoal-gray skin that shimmers with subtle hints of iridescence, reminiscent of smoldering embers. Its exterior is adorned with intricate, faint patterns resembling the scales of a dragon, as if paying homage to the mighty creature that once inhabited the den.",
    spawnRate: 0.05,
    type: "regular",
    cost:600,
    fake_name:"Ashroot Tree",
    skills:[],
    quantity:2,
    status:[],
    value:[],
    turns:0,
    use_string:""

        })
    }
}