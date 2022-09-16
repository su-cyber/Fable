import mongoose from "mongoose";


const profileSchema = new mongoose.Schema({
    userID: {type: String, require: true, unique: true},
    serverID: {type: String, require: true},
    coins: {type: Number, default:100},
    xp:{type:Number,default:0},
    level:{type:Number,default:0},
    health: {type:Number},
    magicPower: {type:Number},
    mana: {type:Number},
    evasion: {type:Number},
    magicResistance: {type:Number},
    armour: {type:Number},
    attackDamage: {type:Number},
    weapon: {type: Array},
    armourSuit: {type: Array},
    items:{type: Array},
    weaponskills: {type:Array},
    magicskills: {type:Array},
    passiveskills:{type: Array}
});

const model = mongoose.model('ProfileModels',profileSchema);

export default model;
