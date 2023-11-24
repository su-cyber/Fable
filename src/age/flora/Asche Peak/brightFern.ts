import { Flora } from "../../classes/flora";

export class Brightfern extends Flora{


    static create(){
        return new Brightfern({

    id:"Brightfern_aschepeak" ,
    name: "Brightfern Leaf",
    description: "These unique ferns have vibrant, emerald-green fronds with veins that resemble streams of molten lava. They are found in the heart of volcanic calderas and thrive in the hot and soot-like soil",
    spawnRate: 0.4,
    type: "flora",
    cost:50,
    fake_name:"Brightfern",
    skills:[],
    quantity:2,
    status:[],
    value:[],
    turns:0,
    use_string:""

        })
    }
}