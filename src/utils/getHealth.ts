export default function getHealth(level:number,vitality:number){
    let health
    if (level < 35){
        health = 100+(vitality * 100)
    }
           
    else if (level > 125){
        health = 100+(vitality * 100)
    }
            
    else{
        health = 100+(vitality * 100)
        }
            
return health
}