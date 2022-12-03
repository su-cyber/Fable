import mongoose from "mongoose";

const specialSchema = new mongoose.Schema({
    userID: {type: String, require: true, unique: false},
    serverID: {type: String, require: true},
    Spren: {type: String, require: true},
    owner: {type: String, require: true}
});

const model = mongoose.model('Special',specialSchema);

export default model;