import { Flora } from "../../classes/flora";

export class Embervine extends Flora{


    static create(){
        return new Embervine({

    id:"Embervine_ellior" ,
    name: "Embervine leaves",
    description: "These rare, iridescent crystals found all over in the cave are the manifestation of the dragon's condensed latent magic. When held up to the light, the crystals refract colors in mesmerizing patterns. These are great source of spyr and can be commercially used for various purposes including brewing potions, magic rituals and powering machines run by spyr.",
    spawnRate: 0.6,
    type: "regular",
    cost:200,
    fake_name:"Embervines",
    skills:[],
    quantity:3,
    status:[],
    value:[],
    turns:0,
    use_string:""

        })
    }
}