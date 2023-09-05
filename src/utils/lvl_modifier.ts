export default function lvl_modifier(lvl:number){
    let lvl_mod
    if (lvl >= 1 && lvl < 9) {
        lvl_mod = Math.pow(4 + (lvl * 0.7), 2) / 1.4;
    } else if (lvl >= 9 && lvl < 18) {
        lvl_mod = Math.pow(5 + (lvl * 0.55), 2) / 1.5;
    } else if (lvl >= 18 && lvl < 30) {
        lvl_mod = (Math.pow(7 + (lvl * 0.43), 2) - 20) / 1.5;
    } else if (lvl >= 30 && lvl <= 50) {
        lvl_mod = (Math.pow(10 + (lvl * 0.325), 2) - 25) / 1.5;
    } else {
        lvl_mod = Math.pow(15 + (lvl * 0.215), 2) / 1.5;
    }

    return lvl_mod;

}