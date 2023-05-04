import mongoose from "mongoose";


const profileSchema = new mongoose.Schema({
    userID: {type: String, require: true, unique: true},
    serverID: {type: String, require: true},
    coins: {type: Number, default:100},
    xp:{type:Number,default:0},
    level:{type:Number,default:0},
    energy:{type:Number},
    skill_points:{type:Number},
    class:{type:String},
    elements:{type:Array},
    skill_tree:{type:Object},
    vitality:{type:Number},
    health: {type:Number},
    magicPower: {type:Number},
    mana: {type:Number},
    evasion: {type:Number},
    speed: {type:Number},
    magicResistance: {type:Number},
    armour: {type:Number},
    attackDamage: {type:Number},
    weapon: {type: Array},
    armourSuit: {type: Array},
    items:{type: Array},
    currentskills: {type:Array},
    allskills:{type:Array},
    passiveskills:{type: Array},
    quest:{type: Boolean},
    quest_location:{type: String},
    quest_mob:{type: String},
    quest_quantity:{type: Number},
    quest_item:{type: String},
    encounter:{type: Array},
    main_quest:{type: String},
    side_quest:{type: Array},
    completed_quests:{type: Array},
    main_quest_phase:{type: String},
    side_quest_phase:{type: String},
    kingdom:{type: String},
    city_town:{type: String},
    location:{type: String},
    dungeon:{type: Object},
    completed_dungeons:{type: Array}
});

const model = mongoose.model('ProfileModels',profileSchema);

export default model;

