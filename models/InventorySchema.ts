import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    userID: {type: String, require: true, unique: true},
    serverID: {type: String, require: true},
    inventory: Object,
});

const model = mongoose.model('Inventory',inventorySchema);

export default model;

/* inventory object schema:-
 weapons:array[{name,quantity,description}]
 items:array[{name,quantity,description}]
 potions:array[{name,quantity,description}]

*/