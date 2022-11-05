export default function getHealth(level:number,vitality:number){
    let health
    if (level < 35){
        health = ((vitality * 10) + Math.pow(level, 2) * 4);
    }
           
    else if (level > 125){
        health = ((vitality * 100) + Math.pow(level, 2) * 4);
    }
            
    else{
        health = ((vitality * (level - 25)) + Math.pow(level, 2) * 4);
        }
            
return health
}