import { Flora } from "../../classes/flora";

export class Bleedroot extends Flora{


    static create(){
        return new Bleedroot({

    id:"Bleedroot_bleedinGorge" ,
    name: "Bleedroot",
    description: "A root-like vegetable that grows in the marshy lands of the bleeding gorge, the vegetable gives off blood like juices rich in iron and nutrients and a popular vegetarian delicacy.",
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