import mongoose from "mongoose";

const lobbySchema = new mongoose.Schema({
    userID: {type: String, require: true},
    floor:{type: Number, require: true}
});

const model = mongoose.model('Queue',lobbySchema);

export default model;