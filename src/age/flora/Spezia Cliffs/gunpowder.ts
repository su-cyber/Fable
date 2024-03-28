import { Flora } from "../../classes/flora";

export class RawGunpowder extends Flora {
    static create() {
        return new RawGunpowder({
            id: "RawGunpowder_id",
            name: "Raw Gunpowder",
            description: "A unique plant species known for its explosive properties, found scattered across the rocky landscape of Spezia Cliffs, ready to ignite with a touch.",
            spawnRate: 0.03,
            type: "flora",
            cost: 1000,
            fake_name: "Raw Gunpowder",
            skills: [],
            quantity: 1,
            status: [],
            value: [],
            turns: 0,
            use_string: ""
        });
    }
}
