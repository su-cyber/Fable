import mongoose from "mongoose";

const queueSchema = new mongoose.Schema({
    userID: {type: String, require: true},
    floor:{type: Number, require: true}
});

const model = mongoose.model('Queue',queueSchema);

export default model;