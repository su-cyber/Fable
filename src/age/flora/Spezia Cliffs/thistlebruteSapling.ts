import { Flora } from "../../classes/flora";

export class ThistlebruteSapling extends Flora {
    static create() {
        return new ThistlebruteSapling({
            id: "ThistlebruteSapling_id",
            name: "Thistlebrute Sapling",
            description: "A young, thorny plant that grows amidst the rugged terrain of Spezia Cliffs, harboring sharp thistle-covered limbs even in its early stages.",
            spawnRate: 0.07,
            type: "flora",
            cost: 700,
            fake_name: "Thistlebrute Sapling",
            skills: [],
            quantity: 1,
            status: [],
            value: [],
            turns: 0,
            use_string: ""
        });
    }
}
