export default function lvl_modifier(lvl:number){
    let lvl_mod
    if (lvl >= 1 && lvl < 9) {
        lvl_mod = Math.pow(4 + (lvl * 0.7), 2);
    } else if (lvl >= 9 && lvl < 18) {
        lvl_mod = Math.pow(4 + (lvl * 0.43), 2);
    } else if (lvl >= 18 && lvl < 30) {
        lvl_mod = Math.pow(4 + (lvl * 0.33), 2);
    } else if (lvl >= 30 && lvl <= 50) {
        lvl_mod = Math.pow(7 + (lvl * 0.225), 2);
    } else {
        lvl_mod = Math.pow(12 + (lvl * 0.13), 2);
    }
    return lvl_mod
}