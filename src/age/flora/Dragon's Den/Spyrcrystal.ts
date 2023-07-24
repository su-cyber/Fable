import { Flora } from "../../classes/flora";

export class Spyrcrystal extends Flora{


    static create(){
        return new Spyrcrystal({

    id:"Spyrcrystal_ellior" ,
    name: "Spyr Crystal",
    description: "These rare, iridescent crystals found all over in the cave are the manifestation of the dragon's condensed latent magic. When held up to the light, the crystals refract colors in mesmerizing patterns. These are great source of spyr and can be commercially used for various purposes including brewing potions, magic rituals and powering machines run by spyr.",
    spawnRate: 0.3,
    type: "flora",
    cost:100,
    fake_name:"Spyr Crystal",
    skills:[],
    quantity:1,
    status:[],
    value:[],
    turns:0,
    use_string:""

        })
    }
}