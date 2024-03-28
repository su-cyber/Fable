import { Flora } from "../../classes/flora";

export class LeafPouch extends Flora {
    static create() {
        return new LeafPouch({
            id: "LeafPouch_id",
            name: "Leaf Pouch",
            description: "A delicate plant with vibrant green leaves that form small pouches, perfect for storing water in the arid climate of Spezia Cliffs.",
            spawnRate: 0.05,
            type: "flora",
            cost: 500,
            fake_name: "Leaf Pouch",
            skills: [],
            quantity: 1,
            status: [],
            value: [],
            turns: 0,
            use_string: ""
        });
    }
}
