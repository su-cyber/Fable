import dragoon_tree from "../skills/dragoon_tree";
import buushin_passive from "./buushin_passive";
import dragoon_passive from "./dragoon_passive";
import gladius_passive from "./gladius_passive";
import magus_passive from "./magus_passive";
import noir_passive from "./noir_passive";
import other_passive_skills from "./passive_skills";


const passive_skills = other_passive_skills.concat(buushin_passive,gladius_passive,magus_passive,dragoon_passive,noir_passive)

export default passive_skills